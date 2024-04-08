/**
 * controlWsServer.js
 * Websocket server for the frontend app to control the devices
 */
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../config/logger');

const startWebsocketServer = ( httpServer ) => {

    //Create ws server
    const io = socketIo(httpServer, {
        path: '/ws-control/',
        serveClient: false,
        cookie: false,
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // Socket.IO connection handler
    io.on('connection', connectionHandler);

    return io;
}

const connectionHandler = async (socket) => {
    console.log('ws-control client connected');

    const authTimeout = setTimeout(() => {
        logger.warn('Client did not authenticate in time, disconnecting');
        socket.disconnect();
    }, 5000);


    // Handle a custom event from the client
    socket.on('auth', (data) => {

        clearTimeout(authTimeout);
        jwt.verify(data.token, config.jwtSecret, (err, decoded) => {
            if (err) {
                logger.warn('Invalid token');
                socket.disconnect();
            } else {
                logger.info('Client authenticated: ' + JSON.stringify(decoded));
            }
        });

    });

    // Stream request event
    socket.on('stream', (data) => {
        if (!data.deviceId) {
            logger.error('DeviceId not provided in stream request!');
            return;
        }

        if(socket.adapter.rooms.get(data.deviceId)?.has(socket.id)) {
            logger.info('Frontend leaving room for device: ' + data.deviceId);
            socket.leave(data.deviceId);
        } else {
            logger.info('Frontend joining room for device: ' + data.deviceId);
            socket.join(data.deviceId);
        }
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
        clearTimeout(authTimeout);
    });

}

module.exports = {
    startWebsocketServer
};
