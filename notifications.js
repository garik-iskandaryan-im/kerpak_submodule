module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        campaign: {
            type: DataTypes.STRING(240),
            allowNull: false,
            field: 'campaign',
        },
        title: {
            type: DataTypes.STRING(560),
            field: 'title',
        },
        text: {
            type: DataTypes.STRING(560),
            allowNull: false,
            field: 'text',
        },
        isIOS: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_ios',
        },
        isAndroid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_android',
        },
        earliestOrderDate: {
            type: DataTypes.DATE,
            field: 'earliest_order_date',
        },
        latestOrderDate: {
            type: DataTypes.DATE,
            field: 'latest_order_date',
        },
        numberOfOrdersMin: {
            type: DataTypes.INTEGER,
            field: 'number_of_orders_min',
        },
        numberOfOrdersMax: {
            type: DataTypes.INTEGER,
            field: 'number_of_orders_max',
        },
        kioskOfLastOrder: {
            type: DataTypes.STRING(1024),
            field: 'kiosk_of_last_order',
        },
        consumerIds: {
            type: DataTypes.STRING(1024),
            field: 'consumer_ids',
        },
        registredConsumersCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'registred_counsumers_count',
        },
        receivedConsumersCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'received_counsumers_count',
        }
    };

    const definition = {
        tableName: 'notifications',
    };

    const notifications = sequelize.define('notifications', fields, definition);

    return notifications;
};
