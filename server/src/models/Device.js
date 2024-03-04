const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

class Device extends Model {}

Device.init({
    // Device chip identifier
    deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    // API key for authentication
    apiKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    // Human-readable name for the device
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // Device type
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    sequelize,
    modelName: 'Device',
    timestamps: true,  // By default Sequelize will add the `createdAt` and `updatedAt` fields
    paranoid: true     // Enables "soft deletion" with a `deletedAt` field
});

module.exports = Device;
