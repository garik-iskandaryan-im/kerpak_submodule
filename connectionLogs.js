module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        connectedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        disconnectedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    };

    const definition = {
        tableName: 'connectionLogs',
        timestamps: false
    };

    const connectionLogs = sequelize.define('connectionLogs', fields, definition);

    connectionLogs.associate = (db) => {
        connectionLogs.belongsTo(db.kiosks, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
    }

    return connectionLogs;
};