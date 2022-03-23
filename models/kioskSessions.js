const { INTEGRATION_TYPES } = require('app/constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        startDate: {
            type: DataTypes.DATE,
            field: 'start_date'
        },
        isSessionOpen: {
            type: DataTypes.BOOLEAN,
            field: 'is_session_open'
        },
        videoId: {
            type: DataTypes.STRING(255),
            field: 'video_id'
        },
        clip: {
            type: DataTypes.STRING(1024),
            field: 'clip'
        },
        kioskName: {
            type: DataTypes.STRING(1024),
            field: 'kiosk_name'
        },
        integration: {
            type: DataTypes.ENUM(INTEGRATION_TYPES.map(integration => integration.id)),
            allowNull: true,
            field: 'integration'
        },
    };

    const definition = {
        tableName: 'kioskSessions',
        timestamps: false,
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const kioskSessions = sequelize.define('kioskSessions', fields, definition);
    kioskSessions.associate = (db) => {
        kioskSessions.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id',
                allowNull: true
            }
        });
        kioskSessions.belongsTo(db.users, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
                allowNull: true
            }
        });
        kioskSessions.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        kioskSessions.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        kioskSessions.belongsTo(db.orders, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id'
            }
        });
    };

    return kioskSessions;
};