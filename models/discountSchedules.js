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
        tableName: 'discountSchedules'
    };

    const discountSchedules = sequelize.define('discountSchedules', fields, definition);

    discountSchedules.associate = (db) => {
        discountSchedules.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            },
            targetKey: 'id',
            onDelete: 'CASCADE'
        });
    };

    return discountSchedules;
};