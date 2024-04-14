const Device = require('./Device');
const Event = require('./Event');

Device.hasMany(Event, {
    foreignKey: {
        allowNull: false,
        name: 'deviceId'
    }
});

Event.belongsTo(Device, {
    foreignKey: {
        allowNull: false,
        name: 'deviceId'
    }
});