const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { initDatabase } = require('./db');
const deviceWsServer = require("./websocket/deviceWsServer");
const controlWsServer = require("./websocket/controlWsServer");

let server;
// ------ Main function -------
(async function() {

    //Database
    await initDatabase();

    // ------ Http server set up -------
    server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });

    // ------ Ws server set up -------
    deviceWsServer.startWebsocketServer(server);
    controlWsServer.startWebsocketServer(server);

    //server.on('connection', (socket) => {
    //    logger.info('Connection event triggered by ' + socket.remoteAddress);
    //});

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
