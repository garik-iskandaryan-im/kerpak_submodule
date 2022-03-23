module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        isPopular: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'isPopular'
        },
        order: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        }
    };

    const definition = {
        tableName: 'menu_categories',
        timestamps: false,
    };

    const menuCategories = sequelize.define('menuCategories', fields, definition);
    menuCategories.associate = (db) => {
        menuCategories.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        menuCategories.hasMany(db.menuCategoriesMenuItems, {
            foreignKey: {
                name: 'menuCategoriesId',
                field: 'menu_categories_id',
                allowNull: false
            }
        });
        menuCategories.belongsTo(db.menus, {
            foreignKey: {
                name: 'menuId',
                field: 'menu_id',
                allowNull: false
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
        menuCategories.belongsTo(db.categories, {
            foreignKey: {
                name: 'categoriesId',
                field: 'categories_id',
                allowNull: true
            }
        });
    };

    return menuCategories;
};