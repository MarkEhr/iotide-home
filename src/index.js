const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

// ------ Http server set up -------
const server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
});

// ------ General node process handlers  -------
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
