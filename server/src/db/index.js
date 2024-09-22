const mongoose = require('mongoose');
const Device = require('../models/Device');
const Event = require('../models/Event');
const User = require('../models/User');
const logger = require("../config/logger"); // Update the path accordingly

const initDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/iotide', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info('Database connection established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    initDatabase,
    models: {
        Device,
        User,
        Event
    }
};
