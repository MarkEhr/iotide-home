const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const projectRoot = path.join(__dirname, '../../..');

module.exports = {
        env: process.env.NODE_ENV || 'development',
        NODE_ENV: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 4000,
        wsPort: process.env.WS_PORT || 4001,
        //If LOG_FILE is "false" we do not log, if it's not set, use the default, otherwise use the specified name
        logFile: process.env.LOG_FILE? ( process.env.LOG_FILE === 'false'? false : process.env.LOG_FILE ): 'logs/app.log',
        projectRoot,
        jwtSecret: process.env.SECRET_KEY,

        mysql: {
                host: process.env.MYSQL_HOST,
                database: process.env.MYSQL_DATABASE,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                port: process.env.MYSQL_PORT || 3306,
                dialect: 'mysql',
                logging: false, // Disable SQL query logging, set to `console.log` for logging
        },
};
