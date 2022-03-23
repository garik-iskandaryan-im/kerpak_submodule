module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        customerId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'customer_id'
        },
    };

    const definition = {
        tableName: 'stripeAccountCustomers',
        indexes: [
            {
                unique: true,
                fields: ['consumer_id', 'service_provider_id']
            }
        ]
    };

    const stripeAccountCustomers = sequelize.define('stripeAccountCustomers', fields, definition);
    stripeAccountCustomers.associate = (db) => {
        stripeAccountCustomers.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id',
                allowNull: false
            },
        });
        stripeAccountCustomers.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: false
            },
        });
    };

    return stripeAccountCustomers;
};
