module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        refundBalance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        refundBank: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        }
    };

    const definition = {
        tableName: 'orders_refund',
        timestamps: true,
        updatedAt: false,
    };

    const ordersRefund = sequelize.define('ordersRefund', fields, definition);
    ordersRefund.associate = (db) => {
        ordersRefund.belongsTo(db.orders, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        ordersRefund.belongsTo(db.users, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
                allowNull: true
            },
            onDelete: 'CASCADE'
        });
    };

    return ordersRefund;
};
