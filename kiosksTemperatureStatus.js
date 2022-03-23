module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        isTemperatureAlert: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_temperature_alert'
        },
        isTemperatureCriticalAlert: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_temperature_critical_alert'
        },
        isTemperatureRecovered: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_temperature_recovered'
        },
        lastActionDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_action_date'
        },

    };

    const definition = {
        tableName: 'kiosks_temperatureStatus',
        timestamps: false,
        indexes: [{ unique: true, fields: ['kiosk_id'] }]
    };

    const kiosksTemperatureStatus = sequelize.define('kiosksTemperatureStatus', fields, definition);

    kiosksTemperatureStatus.associate = (db) => {
        kiosksTemperatureStatus.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id',
                allowNull: false,
            },
        });
    };

    return kiosksTemperatureStatus;
};
