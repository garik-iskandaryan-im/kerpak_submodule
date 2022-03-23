module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        isConnectionUnstableAlert: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_connection_unstable_alert'
        },
        isConnectionUnstableCriticalAlert: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_connection_unstable_critical_alert'
        },
        isConnectionRecovered: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_connection_recovered'
        },
        lastActionDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_action_date'
        },

    };

    const definition = {
        tableName: 'kiosks_unstableConnectionStatus',
        timestamps: false,
        indexes: [{ unique: true, fields: ['kiosk_id'] }]
    };

    const kiosksUnstableConnectionStatus = sequelize.define('kiosksUnstableConnectionStatus', fields, definition);

    kiosksUnstableConnectionStatus.associate = (db) => {
        kiosksUnstableConnectionStatus.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id',
                allowNull: false,
            },
        });
    };

    return kiosksUnstableConnectionStatus;
};
