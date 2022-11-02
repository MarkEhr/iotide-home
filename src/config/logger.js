const winston = require('winston');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const transports = [
    new winston.transports.Console({
        stderrLevels: ['error'],
        timestamp:true
    }),
];

if (config.logFile) {
    transports.push(
        new winston.transports.File({
                filename: config.logFile,
                format: winston.format.uncolorize()
            }
        )
    );
}

const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.timestamp({format: 'isoDateTime'}),
        winston.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`)
    ),
    transports,
});

module.exports = logger;
