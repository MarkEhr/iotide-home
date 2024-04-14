const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');

class Event extends Model { }

Event.init({
    // Auto-incrementing primary key
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    // Event type (humidity, temperature, etc.)
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    sequelize,
    modelName: 'Event',
    timestamps: false
});

module.exports = Event;