const CONSTANTS = require('app/constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        weekDay: {
            type: DataTypes.ENUM(CONSTANTS.WEEK_DAYS.map(marker => marker.id)),
            allowNull: true,
            field: 'week_day'
        },
        value: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        timeFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'time_from',
        },
        timeTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'time_to',
        },
    };

    const definition = {
        tableName: 'hoursOfOperations',
    };

    const hoursOfOperations = sequelize.define('hoursOfOperations', fields, definition);

    hoursOfOperations.associate = (db) => {
        hoursOfOperations.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            },
            targetKey: 'id',
            onDelete: 'CASCADE',
        });
    };

    return hoursOfOperations;
};