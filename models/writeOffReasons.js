module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'name',
        }
    };

    const definition = {
        tableName: 'writeOffReasons',
        indexes: [{
            unique: true,
            fields: ['name', 'service_provider_id']
        }],
        timestamps: false,
    };

    const writeOffReasons = sequelize.define('writeOffReasons', fields, definition);

    writeOffReasons.associate = (db) => {
        writeOffReasons.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: true
            }
        });
        writeOffReasons.hasMany(db.itemsWriteOffs, {
            foreignKey: {
                name: 'reasonId',
                field: 'reason_id',
                allowNull: true
            },
        });

    };
    return writeOffReasons;
};