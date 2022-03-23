module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'phone'
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'code'
        },
        countryISO: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'country_ISO',
        },
    };

    const definition = {
        tableName: 'sms',
        timestamps: false,
        scopes: {
            authenticate: (phone, code, regionId) => {
                return {
                    where: { phone: phone, code: code, regionId: regionId }
                };
            },
        },
    };

    const sms = sequelize.define('sms', fields, definition);
    sms.associate = (db) => {
        sms.belongsTo(db.regions, {
            foreignKey: {
                name: 'regionId',
                field: 'region_id'
            },
        });
    };

    return sms;
};