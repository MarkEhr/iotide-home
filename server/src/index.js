const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { initDatabase } = require('./db');
const {startWebsocketServer} = require("./websocket/wsServer");

// ------ Main function -------
(async function() {

    //Database
    await initDatabase();

    // ------ Http server set up -------
    const server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });

    // ------ Ws server set up -------
    startWebsocketServer(server);

})();

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
