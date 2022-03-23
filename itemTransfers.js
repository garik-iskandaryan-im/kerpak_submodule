const { TRANSFER_STATUS_ALLOWED } = require('../constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        transferDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'transfer_date'
        },
        fromKioskName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'from_kiosk_name'
        },
        toKioskName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'to_kiosk_name'
        },
        SPName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'sp_name'
        },
        userEmail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'user_email'
        },
        userFirstName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'user_first_name'
        },
        userLastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'user_last_name'
        },
        status: {
            type: DataTypes.ENUM(TRANSFER_STATUS_ALLOWED.map(status => status.id)),
            allowNull: true,
            field: 'status'
        }
    };

    const definition = {
        tableName: 'itemTransfers',
        scopes: {
            id: (id) => ({ where: { id } })
        }
    };

    const itemTransfers = sequelize.define('itemTransfers', fields, definition);
    itemTransfers.associate = (db) => {
        itemTransfers.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'fromKioskId',
                field: 'from_kiosk_id'
            }
        });
        itemTransfers.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'toKioskId',
                field: 'to_kiosk_id'
            }
        });
        itemTransfers.belongsTo(db.warehouses, {
            foreignKey: {
                name: 'fromWarehouseId',
                field: 'from_warehouse_id'
            }
        });
        itemTransfers.belongsTo(db.warehouses, {
            foreignKey: {
                name: 'toWarehouseId',
                field: 'to_warehouse_id'
            }
        });
        itemTransfers.belongsTo(db.users, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        itemTransfers.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        itemTransfers.hasMany(db.itemTransfersMenuItems, {
            foreignKey: {
                name: 'itemTransferId',
                field: 'item_transfer_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        itemTransfers.hasMany(db.preOrders, {
            foreignKey: {
                name: 'transferId',
                field: 'transfer_id'
            },
        });
    };

    return itemTransfers;
};