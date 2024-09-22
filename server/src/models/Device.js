const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    config: {
        type: Object,
        required: true
    },
    ip: {
        type: String,
    },
}, {
    timestamps: true
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
