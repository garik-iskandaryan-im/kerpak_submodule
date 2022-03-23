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
        accessToken: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'access_token'
        },
        refreshToken: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'refresh_token'
        },
        criticalError: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'critical_error'
        }
    };

    const definition = {
        tableName: 'integrations',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['id']
        }]
    };

    const integrations = sequelize.define('integrations', fields, definition);

    return integrations;
};