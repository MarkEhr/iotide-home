const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config');
const User = require('../models/User');  // adjust the path as necessary

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

const JWTStrategy = new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findByPk(jwtPayload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

module.exports = (passport) => {
    passport.use(JWTStrategy);
};
