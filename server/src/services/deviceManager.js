// DeviceManager.js
class DeviceManager {
    constructor() {
        this.devices = {};
    }

    addDevice(id, socket) {
        this.devices[id] = socket;
    }

    removeDevice(id) {
        delete this.devices[id];
    }

    getDevice(id) {
        return this.devices[id];
    }

    sendToDevice(id, message) {
        const device = this.getDevice(id);
        if (device) {
            device.send(message);
        }
    }
}

const deviceManager = new DeviceManager();
module.exports = deviceManager;
