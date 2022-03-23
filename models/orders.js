const { PURCHASE_STATUS, ORDER_STATUS, INTEGRATION_TYPES } = require('app/constants');
const KioskSessions = require('./kioskSessions');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'order_date'
        },
        purchaseStatus: {
            type: DataTypes.ENUM(PURCHASE_STATUS.map(status => status.id)),
            allowNull: false,
            field: 'purchase_status'
        },
        orderStatus: {
            type: DataTypes.ENUM(ORDER_STATUS.map(status => status.id)),
            allowNull: false,
            field: 'order_status',
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        firstPurchaseDiscount: {
            type: DataTypes.DECIMAL(10,2),
            field: 'first_purchase_discount',
            allowNull: true
        },
        timeDiscountAmount: {
            type: DataTypes.DECIMAL(10,2),
            field: 'time_discount_amount',
            allowNull: true
        },
        deliveryDiscountAmount: {
            type: DataTypes.DECIMAL(10,2),
            field: 'delivery_discount_amount',
            allowNull: false,
            defaultValue: 0,
        },
        discount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        discountSum: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            field: 'discount_sum'
        },
        kioskName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'kiosk_name'
        },
        kioskAddress: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'kiosk_address'
        },
        SPName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'sp_name'
        },
        maskedPan: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'masked_pan'
        },
        cardHolderName: {
            type: DataTypes.STRING(255),
            field: 'card_holder_name'
        },
        productsCount: {
            type: DataTypes.INTEGER(11),
            field: 'products_count'
        },
        storedKioskId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'stored_kiosk_id'
        },
        storedConsumerId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'stored_consumer_id'
        },
        storedSPId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'stored_sp_id'
        },
        bankOrderId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'bank_order_id'
        },
        hasDoubleSold: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'has_double_sold'
        },
        usedBalance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0,
            field: 'used_balance'
        },
        refund: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0,
            field: 'refund'
        },
        isRegisterTimeout: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'isRegisterTimeout'
        },
        isPayTimeout: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'isPayTimeout'
        },
        isStatusTimeout: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'isStatusTimeout'
        },
        integration: {
            type: DataTypes.ENUM(INTEGRATION_TYPES.map(integration => integration.id)),
            allowNull: true,
            field: 'integration'
        },
        paymentMethod: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'payment_method'
        },
        paymentType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'payment_type'
        }
    };

    const definition = {
        tableName: 'orders',
        timestamps: false,
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const orders = sequelize.define('orders', fields, definition);
    orders.associate = (db) => {
        orders.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        orders.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            }
        });
        orders.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        orders.hasOne(db.reviews, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id',
            },
        });
        orders.hasMany(db.ordersProductItems, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id'
            }
        });
        orders.hasMany(db.transactions, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id'
            }
        });
        orders.hasMany(db.ordersRefund, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id',
                allowNull: false
            }
        });
    };

    return orders;
};
