const CONSTANTS = require('app/constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        displayName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'display_name'
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address1: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'zip_code'
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        hostName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'host_name'
        },
        hostContact: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'local_contact'
        },
        hostContactPhoneNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'local_contact_number'
        },
        archived: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
    };

    const definition = {
        tableName: 'warehouses',
        defaultScope: { where: { archived: false } },
    };

    const warehouses = sequelize.define('warehouses', fields, definition);
    warehouses.associate = (db) => {
        warehouses.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: true
            }
        });
        warehouses.hasMany(db.productItems, {
            foreignKey: {
                name: 'warehouseId',
                field: 'warehouse_id'
            }
        });
    };
    return warehouses;
};