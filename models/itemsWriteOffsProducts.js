module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        productID: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'product_id'
        },
        productionDate: {
            type: DataTypes.DATE,
            field: 'production_date'
        },
        expirationDate: {
            type: DataTypes.DATE,
            field: 'expiration_date'
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            field: 'price'
        },
    };

    const definition = {
        timestamps: false,
        tableName: 'itemsWriteOffs_Products',
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const itemsWriteOffsProducts = sequelize.define('itemsWriteOffsProducts', fields, definition);
    itemsWriteOffsProducts.associate = (db) => {
        itemsWriteOffsProducts.belongsTo(db.itemsWriteOffs, {
            foreignKey: {
                name: 'itemsWriteOffId',
                field: 'items_write_off_id',
                allowNull: true,
            },
            onDelete: 'CASCADE'
        });
    };

    return itemsWriteOffsProducts;
};
