module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        transactionId: {
            type: DataTypes.STRING(255),
            field: 'transaction_id',
            unique: true,
            allowNull: false,
        },
        paymentType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'payment_type'
        },
        paymentProvider: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'payment_provider'
        },
        providerStatus: {
            type: DataTypes.INTEGER(11),
            field: 'provider_status'
        },
        providerOrderId: {
            type: DataTypes.STRING(255),
            field: 'provider_order_id'
        },
        description: {
            type: DataTypes.STRING(255)
        },
        amount: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER(11),
        },
        errorCode: {
            type: DataTypes.INTEGER(11),
            field: 'error_code'
        },
        error: {
            type: DataTypes.STRING(255),
        },
        mdOrder: {
            type: DataTypes.STRING(255),
            field: 'md_order'
        },
        approvalCode: {
            type: DataTypes.STRING(255),
            field: 'approval_code'
        },
        authCode: {
            type: DataTypes.STRING(255),
            field: 'auth_code'
        },
        authRefNum: {
            type: DataTypes.STRING(255),
            field: 'auth_ref_num'
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    };

    const definition = {
        tableName: 'transactions',
        defaultScope: { where: { archived: false } },
        scopes: {
            id: (id) => ({ where: { id: id } })
        },
    };

    const transactions = sequelize.define('transactions', fields, definition);
    transactions.associate = (db) => {
        transactions.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id'
            },
            onDelete: 'CASCADE'
        });
    };

    return transactions;
};
