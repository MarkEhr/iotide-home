const Event = require('../models/Event');
const logger = require("../config/logger");
const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');

// Controller function to get events by device id, event type, and timeframe
const getEventsByDeviceId = catchAsync(async (req, res) => {
    const { deviceId, eventType, startTime, endTime } = req.query;
    try {
        const events = await Event.findAll({
            attributes: ['time', 'data'],
            where: {
                deviceId: deviceId,
                type: eventType,
                time: {
                    [Op.between]: [startTime, endTime]
                }
            }
        });
        res.status(200).json(events);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    getEventsByDeviceId,
};