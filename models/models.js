const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');

const {sequelize: dbSettings} = require('../settings');
const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(
    dbSettings.database,
    dbSettings.username,
    dbSettings.password,
    {
        host: dbSettings.host,
        dialect: dbSettings.dialect,
        dialectOptions: {
            decimalNumbers: true
        }
    }
);

/**
 * Find all model files
 */
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

/**
 * Create a db instance of all models
 */
Object.keys(db).forEach(function(modelName) {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;