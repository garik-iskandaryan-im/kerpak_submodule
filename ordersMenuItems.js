module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        barcode: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        discount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            field: 'total_price',
        },
        weight: {
            type: DataTypes.DECIMAL(10,3),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(255),
            field: 'image'
        },
        sku: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        EAN5: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: null,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            field: 'expiration_date'
        },
        productionDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            field: 'production_date'
        },
        doubleSold: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'double_sold'
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
            field: 'category',
        },
        isPreOrder: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'is_pre_order'
        },
        foodProvider: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
            field: 'foodProvider',
        },
    };

    const definition = {
        tableName: 'orders_productItems',
        timestamps: false,
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const ordersProductItems = sequelize.define('ordersProductItems', fields, definition);
    ordersProductItems.associate = (db) => {
        ordersProductItems.belongsTo(db.orders, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return ordersProductItems;
};
