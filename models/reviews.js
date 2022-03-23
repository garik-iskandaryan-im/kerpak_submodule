module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
            field: "rating",
        },
        message: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: "message",
        },
    };

    const definition = {
        tableName: "reviews",
        indexes: [{ unique: true, fields: ['order_id'] }]
    };

    const reviews = sequelize.define("reviews", fields, definition);

    reviews.associate = (db) => {
        reviews.belongsTo(db.kiosks, {
            foreignKey: {
                name: "kioskId",
                field: "kiosk_id",
                allowNull: false,
            },
        });
        reviews.belongsTo(db.orders, {
            foreignKey: {
                name: "orderId",
                field: "order_id",
                allowNull: false,
            },
        });
        reviews.belongsTo(db.consumers, {
            foreignKey: {
                name: "consumerId",
                field: "consumer_id",
                allowNull: false,
            },
        });
        reviews.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: false,
            }
        });
    };

    return reviews;
};
