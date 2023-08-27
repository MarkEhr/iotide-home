const sequelize = require('./sequelize');
const Device = require('../models/Device');
const logger = require("../config/logger"); // Update the path accordingly

const db = {
    sequelize,
    Sequelize: sequelize.Sequelize,
    models: {
        Device
    }
};

// Sync all models that aren't already in the database
const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection established successfully.');
        await sequelize.sync();
        logger.info('Database synchronized successfully.');
    } catch (error) {
        logger.error('Unable to connect or synchronize the database:', error);
    }
}

module.exports = {
    db,
    initDatabase
};
