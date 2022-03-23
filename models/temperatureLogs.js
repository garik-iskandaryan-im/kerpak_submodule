module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        temperature: {
            type: DataTypes.DECIMAL(10,2),
        },
        error: {
            type: DataTypes.BOOLEAN,
        },
        errorMessage: {
            type: DataTypes.STRING(255),
        }
    };

    const definition = {
        tableName: 'temperatureLogs',
        scopes: {
            id: (id) => ({ where: { id } })
        },
    };

    const temperatureLogs = sequelize.define('temperatureLogs', fields, definition);
    temperatureLogs.associate = (db) => {
        temperatureLogs.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            },
            targetKey: 'id'
        });
    };

    return temperatureLogs;
};