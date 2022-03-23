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

        legalName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'legal_name',
        },
        brandName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'brand_name',
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address1: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address2: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'zip_code',
        },
        regionalSettings: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'regional_settings',
        },
        contactPhone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'contact_phone',
        },
        webSite: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'web_site',
        },
        facebookAccount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'facebook_account',
        },
        yelpAccount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'yelp_account',
        },
        instagramAccount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'instagram_account',
        },
        logo: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        secondaryLogo: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        catalogueImage: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'catalogue_image',
        },
        termsConditions: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'terms_conditions',
        },
        splashLoader: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'splash_loader',
        },
        privacyPolicy: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'privacy_policy',
        },
        bankAccountType: {
            type: DataTypes.ENUM(CONSTANTS.BANK_ACCOUNT_TYPES.map(marker => marker.id)),
            allowNull: true,
            field: 'bank_account_type',
        },
        bankCountry: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'bank_country',
        },
        bankCurrency: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'bank_currency',
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'bank_name',
        },
        bankAccountName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'bank_account_name',
        },
        bankAccountNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'bank_account_number',
        },
        swiftBic: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'swift_bic',
        },
        bankRoutingNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'bank_routing_number',
        },
        bankRegistrationNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'bank_registration_number',
        },
        taxpayerIdentificationNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'taxpayer_identification_number',
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        timezone: {
          type: DataTypes.STRING(255),
          field: 'timezone'
        },
        isTesting: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_testing'
        },
        isGg: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_gg'
        },
        multiTenantSupport: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'multi_tenant_support'
        },
        allowPaymentByCredit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'allowPaymentByCredit'
        },
        creditAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            field: 'creditAmount'
        },
        isCoffeemania: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_coffeemania'
        },
        isSpAllowDelivery: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_sp_allow_delivery'
        },
        havePreOrder: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'have_preOrder'
        },
        pinIcon: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'pinIcon'
        },
        labelMonochrome: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'label_monochrome'
        },
        primaryLogo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'primary_logo'
        },
        primaryMonochrome: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'primary_monochrome'
        },
        stripeId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'stripe_id'
        }
    };

    const definition = {
        tableName: 'serviceProviders',
        indexes: [
            { unique: true, fields: ['legal_name'] },
            { unique: true, fields: ['brand_name'] }
        ],
        defaultScope: {
            where: { archived: false }
        },
        createdAt: 'created_at'
    };

    const serviceProviders = sequelize.define('serviceProviders', fields, definition);
    serviceProviders.associate = (db) => {
        serviceProviders.hasMany(db.users, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        serviceProviders.hasMany(db.kiosks, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        serviceProviders.hasMany(db.menus, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        serviceProviders.hasMany(db.menuItems, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        serviceProviders.hasMany(db.reviews, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        serviceProviders.hasMany(db.preOrders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
        });
        serviceProviders.hasMany(db.foodProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            }
        });
        serviceProviders.hasMany(db.stripeAccountCustomers, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: false
            },
        });
        serviceProviders.belongsTo(db.regions, {
            foreignKey: {
                name: 'regionId',
                field: 'region_id'
            },
        });
    };

    return serviceProviders;
};
