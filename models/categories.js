module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'name',
        },
        isDefaultCategory: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_default_category'
        }
    };

    const definition = {
        tableName: 'categories',
        timestamps: false,
    };

    const categories = sequelize.define('categories', fields, definition);

    categories.associate = (db) => {
        categories.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: true
            }
        });
        categories.belongsTo(db.defaultCategories, {
            foreignKey: {
                name: 'defaultCategoriesId',
                field: 'defaultCategories_id',
                allowNull: true
            }
        });
        categories.hasMany(db.menuCategories, {
            foreignKey: {
                name: 'categoriesId',
                field: 'categories_id',
                allowNull: true
            },
        });
        categories.hasMany(db.menuItems, {
            foreignKey: {
                name: 'categoriesId',
                field: 'categories_id'
            },
        });
    };

    return categories;
};