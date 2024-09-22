const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    data: {
        type: String,
        required: true,
    }
}, {
    timestamps: false
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
