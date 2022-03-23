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
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'email'
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'code'
        },
        sendingDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'sending_date'
        }
    };

    const definition = {
        tableName: 'emails',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['email']
        }]
    };

    const emails = sequelize.define('emails', fields, definition);

    emails.associate = (db) => {
        emails.belongsTo(db.consumers, {
            foreignKey: {
                name: 'consumerId',
                field: 'consumer_id',
            },
        });
    };

    return emails;
};