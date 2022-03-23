const { PRE_ORDER_STATUS, NOTIFICATION_SENT_TYPES } = require('app/constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        expectedDeliveryDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expected_delivery_date'
        },
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'delivery_date'
        },
        declineReason: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'decline_reason'
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'order_date'
        },
        productionDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            field: 'production_date'
        },
        status: {
            type: DataTypes.ENUM(PRE_ORDER_STATUS.options),
            allowNull: false,
            defaultValue: PRE_ORDER_STATUS.default,
            field: 'status'
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            field: 'total_price'
        },
        itemsWithCount: {
            type: DataTypes.STRING(10000),
            allowNull: true,
            field: 'items_with_count'
        },
        bankOrderId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'bank_order_id'
        },
        notificationStatus: {
            type: DataTypes.ENUM(NOTIFICATION_SENT_TYPES.options),
            allowNull: false,
            defaultValue: NOTIFICATION_SENT_TYPES.default,
            field: 'notification_status',
        },
        kioskDeliveryTransferTimeFrom: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'kiosk_delivery_transfer_time_from'
        },
        usedBalance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0,
            field: 'used_balance'
        },
        discountAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            field: 'discount_amount',
            defaultValue: 0,
        },
        discountSum: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            field: 'discount_sum',
            defaultValue: 0,
        },
        storedConsumerName: {
            type: DataTypes.STRING(255),
            field: 'stored_consumer_name',
        },
    };

    const definition = {
        tableName: 'preOrders',
        timestamps: false,
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const preOrders = sequelize.define('preOrders', fields, definition);
    preOrders.associate = (db) => {
        preOrders.belongsTo(db.itemTransfers, {
            foreignKey: {
                name: 'transferId',
                field: 'transfer_id',
                allowNull: true,
                defaultValue: null
            }
        });
        preOrders.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id',
            }
        });
        preOrders.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        preOrders.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        preOrders.hasOne(db.preOrdersDetails, {
            foreignKey: {
                name: 'preOrderId',
                field: 'preOrder_id',
                allowNull: false,
            }
        });
    };

    return preOrders;
};
