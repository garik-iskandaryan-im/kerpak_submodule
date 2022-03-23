const { Op } = require('sequelize');
const { PRODUCT_ITEM_STATUS_ALLOWED } = require('app/constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        rfId: {
            type: DataTypes.STRING(7),
            validate: {
                min: { args: [7] },
            },
            field: 'rf_id'
        },
        productionDate: {
            type: DataTypes.DATE,
            field: 'production_date'
        },
        expirationDate: {
            type: DataTypes.DATE,
            field: 'expiration_date'
        },
        status: {
            type: DataTypes.ENUM(PRODUCT_ITEM_STATUS_ALLOWED.map(status => status.id)),
            allowNull: false
        },
        place: {
            type: DataTypes.STRING(255)
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isReturnedItem: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        returnedKioskId: {
          type: DataTypes.INTEGER(11),
          defaultValue: null
        },
        returnedKioskName: {
          type: DataTypes.STRING(255),
          defaultValue: null
        },
        itemTransferId: {
            type: DataTypes.INTEGER(11),
            defaultValue: null
        },
        EAN5: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: null
        },
    };

    const definition = {
        tableName: 'productItems',
        indexes: [{
            unique: true,
            fields: ['rf_id']
        }, {
            unique: false,
            fields: ['production_date']
        }, {
            unique: false,
            fields: ['expiration_date']
        }],
        defaultScope: { where: { archived: false } },
        scopes: {
            id: (id) => ({ where: { id, archived: false } }),
            all: (ids) => ({
                where: {
                    id: { [Op.in]: ids },
                    archived: false
                }
            })
        },
    };

    const productItems = sequelize.define('productItems', fields, definition);
    productItems.associate = (db) => {
        productItems.belongsTo(db.menuItems, {
            foreignKey: {
                name: 'menuItemId',
                field: 'menu_item_id',
                allowNull: false,
            },
            onDelete: 'CASCADE'
        });
        productItems.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        productItems.belongsTo(db.warehouses, {
            foreignKey: {
                name: 'warehouseId',
                field: 'warehouse_id'
            }
        });
        productItems.belongsTo(db.orders, {
            foreignKey: {
                name: 'orderId',
                field: 'order_id'
            }
        });
        productItems.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        productItems.belongsTo(db.itemTransfers, {
            foreignKey: {
                name: 'itemTransferId',
                field: 'itemTransferId'
            }
        });
    };

    return productItems;
};