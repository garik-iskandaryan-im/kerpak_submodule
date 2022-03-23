module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expiration_date'
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'is_default'
        },
        maskedPan: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'masked_pan'
        },
        paymentMethodId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'payment_method_id'
        },
        paymentType: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'payment_type'
        }
    };

    const definition = {
        tableName: 'stripeCards',
        indexes: [
            {
                unique: true,
                fields: ['payment_method_id', 'consumer_id']
            }
        ],
    };

    const stripeCards = sequelize.define('stripeCards', fields, definition);
    stripeCards.associate = (db) => {
        stripeCards.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
        });
    };

    return stripeCards;
};
