const express = require('express');
const deviceController = require('../controllers/deviceController');
const passport = require('passport');

const router = express.Router();

// This will make the endpoint accessible as /devices for authenticated users
router.get('/', passport.authenticate('jwt', { session: false }), deviceController.listDevices);
router.post('/command', passport.authenticate('jwt', { session: false }), deviceController.sendCommand);
router.get('/update', passport.authenticate('headerapikey', { session: false }), deviceController.updateDevice);
router.get('/update/:versionReq', passport.authenticate('headerapikey', { session: false }), deviceController.updateDevice);
// ... other routes

module.exports = router;
