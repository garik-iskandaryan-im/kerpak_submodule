module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        count: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        sku: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        menuItemId: {
            type: DataTypes.INTEGER(11),
            field: 'menuItemId'
        },
        barcode: {
            type: DataTypes.STRING(255),
            field: 'barcode'
        },
        productionDate: {
            type: DataTypes.DATE,
            field: 'productionDate'
        },
        expirationDate: {
            type: DataTypes.DATE,
            field: 'expirationDate'
        },
        hasEAN5: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'hasEAN5'
        },
    };

    const definition = {
        tableName: 'itemTransfers_menuItems',
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const itemTransfersMenuItems = sequelize.define('itemTransfersMenuItems', fields, definition);
    itemTransfersMenuItems.associate = (db) => {
        itemTransfersMenuItems.belongsTo(db.itemTransfers, {
            foreignKey: {
                name: 'itemTransferId',
                field: 'item_transfer_id',
                allowNull: false
            }
        });
    };

    return itemTransfersMenuItems;
};
