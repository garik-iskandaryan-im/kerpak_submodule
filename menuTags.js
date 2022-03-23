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
            allowNull: false,
            field: 'name'
        },
    };

    const definition = {
        tableName: 'menu_tags',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['name']
        }],
    };

    const menuTags = sequelize.define('menuTags', fields, definition);
    menuTags.associate = (db) => {
        menuTags.belongsToMany(db.menus, {
            through: 'menus_menuTags',
            foreignKey: {
                name: 'menuId',
                field: 'menu_id'
            },
            otherKey: {
                name: 'menuItemId',
                field: 'menu_item_id'
            },
            onDelete: 'CASCADE',
            timestamps: false
        });
    };

    return menuTags;
};