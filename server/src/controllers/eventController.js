const Event = require('../models/Event');
const logger = require("../config/logger");
const catchAsync = require("../utils/catchAsync");

// Controller function to get events by device id, event type, and timeframe
const getEventsByDeviceId = catchAsync(async (req, res) => {
    const { deviceId, eventType, startTime, endTime } = req.query;
    try {
        const events = await Event.find({
            deviceId: deviceId,
            type: eventType,
            time: {
                $gte: startTime,
                $lte: endTime
            }
        }).select('time data');
        res.status(200).json(events);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    getEventsByDeviceId,
};
