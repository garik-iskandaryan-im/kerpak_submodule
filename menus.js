module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        menuName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'menu_name'
        },
        description: {
            type: DataTypes.STRING(255),
            field: 'description'
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    };

    const definition = {
        tableName: 'menus',
        indexes: [{
            unique: false,
            fields: ['menu_name']
        }],
        defaultScope: { where: { archived: false } },
        scopes: {
            id: (id) => ({ where: { id } })
        }
    };

    const menus = sequelize.define('menus', fields, definition);
    menus.associate = (db) => {
        menus.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        menus.hasMany(db.kiosks, {
            foreignKey: {
                name: 'menuId',
                field: 'menu_id',
                allowNull: true
            },
            onDelete: 'SET NULL'
        });
        menus.belongsToMany(db.menuItems, {
            through: 'menus_menuItems',
            otherKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            foreignKey: {
                name: 'menuId',
                field: 'menu_id'
            },
            timestamps: false
        });
        menus.hasMany(db.menuCategories, {
            foreignKey: {
                name: 'menuId',
                field: 'menu_id'
            },
            onDelete: 'CASCADE'
        });
        menus.belongsToMany(db.menuTags, {
            through: 'menus_menuTags',
            otherKey: {
                name: 'menuTagId',
                field: 'menu_tag_id'
            },
            foreignKey: {
                name: 'menuId',
                field: 'menu_id'
            },
            timestamps: false
        });
    };

    return menus;
};