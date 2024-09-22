const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const logger = require('../config/logger');
const User = require('../models/User');
const catchAsync = require("../utils/catchAsync");

const login = catchAsync( async (req, res)=>{
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide a username and password' });
    }

    // Find the user
    const user = await User.findOne({ username });

    if (!user) {
        logger.info('User not found with username: ' + username);
        return res.status(401).json({ error: 'Login failed' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        logger.info('Incorrect password for username: ' + username);
        return res.status(401).json({ error: 'Incorrect password' });
    }

    // User matched. Create JWT Payload
    const payload = { id: user._id, username: user.username };

    // Sign the token
    jwt.sign(payload, config.jwtSecret, { expiresIn: '15D' }, (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
    });
});

const me = catchAsync( async (req, res)=>{
    const user = req.user;
    const data = {
        id: user.id,
        username: user.username,
        name: user.name,
    }
    res.json({data});
});

module.exports = {
    login,
    me
}
