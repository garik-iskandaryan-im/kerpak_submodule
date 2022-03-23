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
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'name',
        },
    };

    const definition = {
        tableName: 'organizations',
        timestamps: false,
        indexes: [{ unique: true, fields: ['name'] }]
    };

    const organizations = sequelize.define('organizations', fields, definition);
    organizations.associate = (db) => {
        organizations.hasMany(db.consumers, {
            foreignKey: {
                name: 'organizationId',
                field: 'organization_id'
            }
        });
    };

    return organizations;
};
