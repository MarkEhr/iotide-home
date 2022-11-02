const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
        env: process.env.NODE_ENV || 'development',
        NODE_ENV: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 4000,
        //If LOG_FILE is "false" we do not log, if it's not set, use the default, otherwise use the specified name
        logFile: process.env.LOG_FILE? ( process.env.LOG_FILE === 'false'? false : process.env.LOG_FILE ): 'logs/app.log',
};
