module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        orderDetails: {
            type: DataTypes.STRING(10240),
            allowNull: false,
            field: 'order_details'
        },
        items: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            field: 'items'
        },
        comment: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'comment'
        },
    };

    const definition = {
        tableName: 'preOrders_details',
        timestamps: false,
        scopes: {
            id: (id) => ({ where: { id } })
        },
        indexes: [{ unique: true, fields: ['preOrder_id'] }]
    };

    const preOrdersDetails = sequelize.define('preOrdersDetails', fields, definition);
    preOrdersDetails.associate = (db) => {
        preOrdersDetails.belongsTo(db.preOrders, {
            foreignKey: {
                name: 'preOrderId',
                field: 'preOrder_id',
            },
            onDelete: 'CASCADE'
        });
    };

    return preOrdersDetails;
};
