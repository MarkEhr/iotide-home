const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy;
const config = require('./config');
const User = require('../models/User');  // adjust the path as necessary
const Device = require('../models/Device');
const logger = require('../config/logger');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

const JWTStrategy = new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findOne({_id: jwtPayload.id});
        if (user) {
            return done(null, user);
        } else {
            logger.error("User not found with jwt id: " + jwtPayload.id);
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

const APIKeyStrategy = new HeaderAPIKeyStrategy(
    { header: 'Authorization', prefix: 'Basic ' },
    false,
    async function(apikey, done) {
        try {
          const device = await Device.findOne({ apiKey: apikey });
          if (!device) {
            return done(null, false);
          }
          return done(null, device);
        } catch (error) {
          return done(error);
        }
      }
  )

module.exports = (passport) => {
    passport.use(JWTStrategy);
    passport.use(APIKeyStrategy);
};
