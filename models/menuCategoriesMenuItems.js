module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        order: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        }
    };

    const definition = {
        tableName: 'menu_categories_menuItems',
        timestamps: false,
    };

    const menuCategoriesMenuItems = sequelize.define('menuCategoriesMenuItems', fields, definition);
    menuCategoriesMenuItems.associate = (db) => {
        menuCategoriesMenuItems.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        menuCategoriesMenuItems.belongsTo(db.menuItems, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
        menuCategoriesMenuItems.belongsTo(db.menuCategories, {
            foreignKey: {
                name: 'menuCategoriesId',
                field: 'menu_categories_id'
            },
            onDelete: 'SET NULL',
        });
    };

    return menuCategoriesMenuItems;
};