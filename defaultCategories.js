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
            unique: true,
            field: 'name',
        }
    };

    const definition = {
        tableName: 'defaultCategories',
        timestamps: false,
    };

    const defaultCategories = sequelize.define('defaultCategories', fields, definition);

    defaultCategories.associate = (db) => {
        defaultCategories.hasMany(db.categories, {
            foreignKey: {
                name: 'defaultCategoriesId',
                field: 'defaultCategories_id'
            }
        });
    }

    return defaultCategories;
};