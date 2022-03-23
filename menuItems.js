const { Op } = require('sequelize');
const CONSTANTS = require('app/constants');

const listFields = [
    'id',
    'sku',
    'barcode',
    'name',
    'image',
    'category',
    'price',
    'service_provider_id'
];

const getFields = [
    'id',
    'sku',
    'barcode',
    'name',
    'description',
    'image',
    'caloriesCount',
    'price',
    'weight',
    'ingredients',
    'category',
    'category1',
    'category2',
    'service_provider_id'
];

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        sku: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'sku'
        },
        // TODO: Add validation for AEN13 standard
        barcode: {
            type: DataTypes.STRING(13),
            allowNull: false,
            validate: {
                len: {
                    args: [8,13],
                    msg: "String length is not in this range"
                }
            },
            field: 'barcode'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'name'
        },
        description: {
            type: DataTypes.STRING(1024),
            field: 'description',
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            field: 'image'
        },
        caloriesCount: {
            type: DataTypes.INTEGER(11),
            field: 'calories_count',
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            field: 'price'
        },
        weight: {
            type: DataTypes.DECIMAL(10,3),
            field: 'weight',
            allowNull: true,
        },
        ingredients: {
            type: DataTypes.STRING(2000),
            field: 'ingredients',
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'category'
        },
        category1: {
            type: DataTypes.STRING(255),
            field: 'category_1',
            allowNull: true,
        },
        category2: {
            type: DataTypes.STRING(255),
            field: 'category_2',
            allowNull: true,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        duration: {
            type: DataTypes.INTEGER(11),
            field: 'duration',
            allowNull: true,
        },
        durationType:  {
            type: DataTypes.ENUM(CONSTANTS.DURATION_TYPES),
            field: 'duration_type'
        },
        serviceProviderId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'service_provider_id'
        },
        isGenerateUniqueEAN5: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_generate_unique_EAN5'
        },
        itemAvailability: {
            type: DataTypes.ENUM(CONSTANTS.ITEM_AVAILABILITY.options),
            defaultValue: CONSTANTS.ITEM_AVAILABILITY.defaultValue,
            allowNull: false,
            field: 'item_availability'
        },
        imageMedium: {
            type: DataTypes.STRING(255),
            field: 'imageMedium'
        },
        imageSmall: {
            type: DataTypes.STRING(255),
            field: 'imageSmall'
        },
    };

    const definition = {
        tableName: 'menuItems',
        indexes: [{
            unique: false,
            fields: ['sku']
        }, {
            unique: false,
            fields: ['barcode']
        }, {
            unique: false,
            fields: ['name']
        }],
        scopes: {
            id: (id) => ({ where: { id }, attributes: getFields }),
            list: () => ({ attributes: listFields, where: { archived: { [Op.not]: true } } })
        }
    };

    const menuItems = sequelize.define('menuItems', fields, definition);
    menuItems.associate = (db) => {
        menuItems.belongsToMany(db.menus, {
            through: 'menus_menuItems',
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            otherKey: {
                name: 'menuId',
                field: 'menu_id'
            },
            onDelete: 'CASCADE',
            timestamps: false
        });
        menuItems.belongsTo(db.serviceProviders, {
            foreignKey: 'service_provider_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        menuItems.hasMany(db.nutritionFacts, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        menuItems.hasMany(db.dietaryMarkers, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        menuItems.hasMany(db.allergens, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            onDelete: 'CASCADE'
        });
        menuItems.hasMany(db.productItems, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            onDelete: 'SET NULL'
        });
        menuItems.hasMany(db.menuCategoriesMenuItems, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            onDelete: 'CASCADE'
        });
        menuItems.belongsTo(db.categories, {
            foreignKey: {
                name: 'categoriesId',
                field: 'categories_id',
            },
            as: 'categories',
            onDelete: 'SET NULL',
        });
        menuItems.belongsTo(db.foodProviders, {
            foreignKey: {
                name: 'foodProviderId',
                field: 'food_provider_id',
            },
            onDelete: 'SET NULL',
        });
    };

    return menuItems;
};
