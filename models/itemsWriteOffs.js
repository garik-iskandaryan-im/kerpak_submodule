module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        writeOffDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        SPName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'sp_name'
        },
        kioskName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'kiosk_name'
        },
        warehouseName: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'warehouse_name'
        },
        userEmail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'user_email'
        },
        MISku: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'mi_sku'
        },
        MIName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'mi_name'
        },
        MICategory: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'mi_category'
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
    };

    const definition = {
        tableName: 'itemsWriteOffs',
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const itemsWriteOffs = sequelize.define('itemsWriteOffs', fields, definition);
    itemsWriteOffs.associate = (db) => {
        itemsWriteOffs.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: true
            }
        });
        itemsWriteOffs.belongsTo(db.users, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
                allowNull: true
            }
        });
        itemsWriteOffs.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id',
                allowNull: true
            }
        });
        itemsWriteOffs.belongsTo(db.warehouses, {
            foreignKey: {
                name: 'warehouseId',
                field: 'warehouse_id'
            }
        });
        itemsWriteOffs.hasMany(db.productItems, {
            foreignKey: {
                name: 'itemsWriteOffId',
                field: 'items_write_off_id',
                allowNull: true
            }
        });
        itemsWriteOffs.hasMany(db.itemsWriteOffsProducts, {
            foreignKey: {
                name: 'itemsWriteOffId',
                field: 'items_write_off_id',
                allowNull: true
            }
        });
        itemsWriteOffs.belongsTo(db.writeOffReasons, {
            foreignKey: {
                name: 'reasonId',
                field: 'reason_id',
                allowNull: true,
            },
        });
    };

    return itemsWriteOffs;
};
