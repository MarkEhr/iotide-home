const express = require('express');
const securityController = require('../controllers/securityController');
const passport = require("passport");

const router = express.Router();

router
    .route('/login_check')
    .post(securityController.login);

router
    .route('/me')
    .get(passport.authenticate('jwt', { session: false }), securityController.me);

module.exports = router;
