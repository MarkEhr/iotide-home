const Device = require('../models/Device'); // Assuming your Device model is named "Device"
const deviceManager = require('../services/deviceManager'); // Path to your DeviceManager module

const catchAsync = require("../utils/catchAsync");

const listDevices = catchAsync(async (req, res) => {
    const devices = await Device.findAll();

    const devicesWithStatus = devices.map(device => {
        const isConnected = !!deviceManager.getDevice(device.deviceId);
        return {
            ...device.toJSON(),  // Convert Sequelize instance to a plain object
            isConnected
        };
    });

    res.json({data: devicesWithStatus});
});

const sendCommand = catchAsync(async (req, res) => {

    const {deviceId, command} = req.body;
    if (!deviceId || !command) {
        res.status(400).json({error: "Missing deviceId or command"});
        return;
    }

    if(!deviceManager.getDevice(deviceId)) {
        res.status(400).json({error: "Device not connected"});
        return;
    }

    deviceManager.sendToDevice(deviceId, command);

    res.json({data: { success: true }});
});



module.exports = {
    // ... other exports,
    listDevices,
    sendCommand,
};
