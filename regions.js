module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        isoCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'iso_code',
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'is_default'
        },
        initialPositionLatitude: {
            type: DataTypes.FLOAT(20),
            allowNull: true,
            field: 'initial_position_latitude',
        },
        initialPositionLongitude: {
            type: DataTypes.FLOAT(20),
            allowNull: true,
            field: 'initial_position_longitude',
        },
        initialPositionLatitudeDelta: {
            type: DataTypes.FLOAT(20),
            allowNull: true,
            field: 'initial_position_latitude_delta',
        },
        initialPositionLongitudeDelta: {
            type: DataTypes.FLOAT(20),
            allowNull: true,
            field: 'initial_position_longitude_delta',
        },
        currencyName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'currency_name',
        },
        currencySymbol: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'currency_symbol',
        },
        currencyCode: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'currency_code',
        },
        language: {
            type: DataTypes.STRING(10),
            allowNull: true,
            field: 'language',
        },
        weightName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'weight_name',
        },
        weightSymbol: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'weight_symbol',
        },
        temperatureName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'temperature_name',
        },
        temperatureSymbol: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'temperature_symbol',
        },
        paymentMethod: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'payment_method'
        },
        timezone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'timezone'
        },
        image: {
            type: DataTypes.STRING(255),
            field: 'image'
        },
    };

    const definition = {
        tableName: 'regions',
        indexes: [{ unique: true, fields: ['iso_code'] }]
    };
    const regions = sequelize.define('regions', fields, definition);
    regions.associate = (db) => {
        regions.hasMany(db.consumers, {
            foreignKey: {
                name: 'regionId',
                field: 'region_id'
            },
        });
        regions.hasMany(db.sms, {
            foreignKey: {
                name: 'regionId',
                field: 'region_id'
            },
        });
        regions.hasMany(db.smsLog, {
            foreignKey: {
                name: 'regionId',
                field: 'region_id'
            },
        });
    };

    return regions;
};
