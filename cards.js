module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        bindingId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'binding_id'
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expiration_date'
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'is_default'
        },
        maskedPan: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'masked_pan'
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        paymentType: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'payment_type'
        }
    };

    const definition = {
        tableName: 'cards',
        indexes: [{
            unique: true,
            fields: ['binding_id']
        }],
        defaultScope: { where: { archived: false } },
        scopes: {
            id: (id) => ({ where: { id: id } })
        },
    };

    const cards = sequelize.define('cards', fields, definition);
    cards.associate = (db) => {
        cards.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id'
            },
            onDelete: 'CASCADE'
        });
    };

    return cards;
};
