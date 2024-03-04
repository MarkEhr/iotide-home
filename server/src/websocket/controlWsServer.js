/**
 * controlWsServer.js
 * Main websocket server
 */
const WebSocket = require('ws');
const logger = require('../config/logger');

const startWebsocketServer = ( app ) => {

    //Create ws server
    const wsServer = new WebSocket.Server({
        noServer: true,
        path: '/ws-control',
    });

    //Handle ws connection with express app
    app.on("upgrade", (request, socket, head) => {

        if(request.url !== '/ws-control') {
            return;
        }

        wsServer.handleUpgrade(request, socket, head, (websocket) => {
            wsServer.emit("connection", websocket, request);
        });
    });

    //Handle ws connection
    wsServer.on( "connection", connectionHandler);

    //Handle ws server errors
    wsServer.on('error', (error) => {
        logger.error('WebSocket server error:', error);
    });

    return wsServer;

}

const connectionHandler = async (wsConnection) => {

    // ----- Monitor the connection status -----

    let isAlive = true;
    wsConnection.on('pong', () => {
        isAlive = true;
    });
    // Regularly check the connection
    const interval = setInterval(() => {
        if (isAlive === false) {
            clearInterval(interval);
            wsConnection.terminate();  // Close connection if not alive
            return;
        }
        isAlive = false;
        wsConnection.ping(() => {});  // Send a ping frame
    }, 10000);


    // ----- Handle the authentication -----

    try {

        // ----- Register with the device manager -----

        logger.info('New ws control connection');

        wsConnection.on("message", (message) => {
            logger.info("Control message received: " + message.toString());
            wsConnection.send(JSON.stringify({message: 'Message received.'}));
        });

        wsConnection.on("close", () => {
            logger.info('Control connection closed');
        });
    } catch (error) {
        logger.error("Error during WebSocket authentication:", error);
        wsConnection.close(1011, "Internal server error");
    }

}

module.exports = {
    startWebsocketServer,
};
