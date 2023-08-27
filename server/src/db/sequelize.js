const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: config.mysql.dialect,
        port: config.mysql.port,
        logging: config.mysql.logging,
    }
);

module.exports = sequelize;
