const { ALLERGENS } = require('../constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        name: {
            type: DataTypes.ENUM(ALLERGENS.map(allergen => allergen.id)),
            allowNull: true,
            field: 'name1',
        }
    };

    const definition = {
        tableName: 'allergens',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['name', 'menu_item_id']
        }]
    };

    const allergens = sequelize.define('allergens', fields, definition);

    allergens.associate = (db) => {
        allergens.belongsTo(db.menuItems, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id',
                allowNull: false,
            },
            onDelete: 'CASCADE'
        });
    };

    return allergens;
};
