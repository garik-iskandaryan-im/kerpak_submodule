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
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'phone'
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'code'
        },
        type: {
            type: DataTypes.ENUM(CONSTANTS.SMS_TYPES),
            allowNull: false,
            field: 'type'
        },
        countryISO: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'country_ISO',
        },
    };

    const definition = {
        tableName: 'smsLog',
        timestamps: true,
    };

    const smsLog = sequelize.define('smsLog', fields, definition);

    smsLog.associate = (db) => {
        smsLog.belongsTo(db.regions, {
            foreignKey: {
                name: 'regionId',
                field: 'region_id'
            },
        });
    };

    return smsLog;
};
