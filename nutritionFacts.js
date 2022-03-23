
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
            field: 'name',
        },
        value: {
            type: DataTypes.STRING(255),
            field: 'value',
        }
    };

    const definition = {
        tableName: 'nutritionFacts',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['name', 'value', 'menu_item_id']
        }]
    };

    const nutritionFacts = sequelize.define('nutritionFacts', fields, definition);

    nutritionFacts.associate = (db) => {
        nutritionFacts.belongsTo(db.menuItems, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return nutritionFacts;
};