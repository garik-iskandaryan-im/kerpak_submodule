
const { DIETARY_MARKERS } = require('../constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        name: {
            type: DataTypes.ENUM(DIETARY_MARKERS.map(marker => marker.id)),
            allowNull: true,
            field: 'name',
        }
    };

    const definition = {
        tableName: 'dietaryMarkers',
        timestamps: false,
        indexes: [{
            primaryKey: true,
            unique: true,
            fields: ['name', 'menu_item_id']
        }]
    };

    const dietaryMarkers = sequelize.define('dietaryMarkers', fields, definition);

    dietaryMarkers.associate = (db) => {
        dietaryMarkers.belongsTo(db.menuItems, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id',
                allowNull: false,
            },
            onDelete: 'CASCADE'
        });
    };

    return dietaryMarkers;
};