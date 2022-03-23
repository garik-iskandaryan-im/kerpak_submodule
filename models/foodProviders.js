module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        name: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'name',
        },
    };

    const definition = {
        tableName: 'foodProviders',
        timestamps: false,
    };

    const foodProviders = sequelize.define('foodProviders', fields, definition);

    foodProviders.associate = (db) => {
        foodProviders.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: false,
            }
        });
        foodProviders.hasMany(db.menuItems, {
            foreignKey: {
                name: 'foodProviderId',
                field: 'food_provider_id'
            },
        });
    };

    return foodProviders;
};
