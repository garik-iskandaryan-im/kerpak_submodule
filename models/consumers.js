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
        registerCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'register_completed'
        },
        registerByEmailCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'register_by_email_completed'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'email'
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'last_name'
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'country'
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'zip_code'
        },
        bankClientId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'bank_client_id'
        },
        OS: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'OS'
        },
        firebaseRegistrationToken: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'firebase_registration_token'
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lastOrderDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_order_date'
        },
        kioskIdOfLastOrder: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'kiosk_id_of_last_order'
        },
        hasCardAttached: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'has_card_attached'
        },
        balance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            field: 'balance'
        },
        stripeCustomerId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'stripe_customer_id'
        },
        countryISO: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'country_ISO',
        },
    };

    const definition = {
        tableName: 'consumers',
        defaultScope: { where: { archived: false } },
        scopes: {
            consumer: (phone) => ({ where: { phone: phone } }),
            consumerByRegion: (phone, regionId) => ({ where: { phone: phone, regionId: regionId } }),
            id: (id) => ({ where: { id: id } })
        },
    };

    const consumer = sequelize.define('consumers', fields, definition);
    consumer.associate = (db) => {
        consumer.hasMany(db.cards, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        consumer.hasMany(db.orders, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        consumer.hasMany(db.reviews, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
        });
        consumer.belongsTo(db.organizations, {
            foreignKey: {
                name: 'organizationId',
                field: 'organization_id',
                allowNull: true
            }
        });
        consumer.hasMany(db.preOrders, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
        });
        consumer.hasMany(db.stripeCards, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
        });
        consumer.hasMany(db.stripeAccountCustomers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id',
                allowNull: false
            },
        });
        consumer.hasOne(db.emails, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
            as: 'emails',
        });
        consumer.belongsTo(db.regions, {
            foreignKey: {
                name: 'regionId',
                field: 'region_id'
            },
        });
    };

    return consumer;
};
