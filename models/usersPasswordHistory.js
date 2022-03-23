const crypt = require('app/helpers/crypt');
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
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            field: 'password_hash'
        },
    };

    const definition = {
        tableName: 'usersPasswordHistory',
        defaultScope: {
            attributes: { exclude: ['passwordHash'] },
        },
    };

    const usersPasswordHistory = sequelize.define('usersPasswordHistory', fields, definition);

    usersPasswordHistory.associate = (db) => {
        usersPasswordHistory.belongsTo(db.users, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
                allowNull: true
            },
            onDelete: 'CASCADE'
        });
    };

    return usersPasswordHistory;
};