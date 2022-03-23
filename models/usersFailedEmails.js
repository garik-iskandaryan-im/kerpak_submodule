module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        email: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: 'email'
        }
    };

    const definition = {
        tableName: 'usersFailedEmails',
    };

    return sequelize.define('usersFailedEmails', fields, definition);
};