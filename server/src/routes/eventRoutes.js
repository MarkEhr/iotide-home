const express = require('express');
const eventController = require('../controllers/eventController');
const passport = require('passport');

const router = express.Router();

// Define your event routes here
router.get('/events',eventController.getEventsByDeviceId);

module.exports = router;