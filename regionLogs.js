module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        countryCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'country_code'
        },
        extraData: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            field: 'extra_data'
        },
    };

    const definition = {
        tableName: 'regionLogs',
        timestamps: true,
    };

    const regionLogs = sequelize.define('regionLogs', fields, definition);

    return regionLogs;
};