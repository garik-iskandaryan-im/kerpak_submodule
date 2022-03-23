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
        userEmail: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: 'user_email'
        },
        consumerPhone: {
            type: DataTypes.STRING(255),
            defaultValue: true,
            allowNull: false,
            field: 'consumer_phone'
        },
        balance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            field: 'balance'
        },
        type: {
            type: DataTypes.ENUM(CONSTANTS.BALANCE_TYPE),
            allowNull: false,
            field: 'type'
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'date'
        },
    };

    const definition = {
        tableName: 'balance_histary',
        timestamps: false,
    };

    const balanceHistary = sequelize.define('balanceHistary', fields, definition);
    balanceHistary.associate = (db) => {
        balanceHistary.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
            onDelete: 'SET NULL',
        });
        balanceHistary.belongsTo(db.users, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
                allowNull: true,
            },
            onDelete: 'SET NULL',
        });
        balanceHistary.belongsTo(db.orders, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id',
                allowNull: true,
            },
            onDelete: 'SET NULL',
        });
        balanceHistary.belongsTo(db.preOrders, {
            foreignKey: {
                name: 'preOrderId',
                field: 'preOrder_id',
            },
            onDelete: 'SET NULL',
        });
    };

    return balanceHistary;
};
