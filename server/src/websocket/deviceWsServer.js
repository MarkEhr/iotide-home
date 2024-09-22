/**
 * wsServer.js
 * Main websocket server
 */
const WebSocket = require('ws');
const deviceManager = require('../services/deviceManager');
const logger = require('../config/logger');
const Device = require("../models/Device");
const Event = require("../models/Event");

const startWebsocketServer = ( app , controlWsServer) => {

    //Create ws server
    const wsServer = new WebSocket.Server({
        noServer: true,
        path: '/ws',
    });

    //Handle ws connection with express app
    app.on("upgrade", (request, socket, head) => {

        if(request.url !== '/ws') {
            return;
        }

        wsServer.handleUpgrade(request, socket, head, (websocket) => {
            wsServer.emit("connection", websocket, request);
        });
    });

    //Handle ws connection
    wsServer.on( "connection", (wsConnection, connectionRequest) => connectionHandler(wsConnection, connectionRequest, controlWsServer));

    //Handle ws server errors
    wsServer.on('error', (error) => {
        logger.error('WebSocket server error:', error);
    });

    return wsServer;

}

const connectionHandler = async (wsConnection, connectionRequest, controlWsServer) => {

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
        wsConnection.ping();  // Send a ping frame
    }, 10000);


    // ----- Handle the authentication -----

    const deviceId = connectionRequest.headers['x-device-id'];
    const apiKey = connectionRequest.headers['x-api-key'];

    if (!deviceId || !apiKey) {
        logger.error("Device ID or API Key missing");
        wsConnection.close(1008, "Device ID or API Key missing");
        return;
    }

    try {
        const device = await Device.findOne({
            deviceId: deviceId,
            apiKey: apiKey
        });

        if (!device) {
            logger.error(`Invalid Device ID or API Key. (${deviceId})`);
            wsConnection.close(1008, "Invalid Device ID or API Key");
            return;
        }

        // ----- Register with the device manager -----

        logger.info('New connection for device ' + deviceId);

        deviceManager.addDevice(deviceId, wsConnection);

        wsConnection.on("message", async (message) => {
            logger.info(`Message received from ${deviceId}: ${message}`);

            // assuming event with the format
            // {
            //     type: 'event',
            //     data: {
            //             type: 'temperature',
            //             time: '2021-07-01T12:00:00Z',
            //             data: '10'
            //            }
            // }

            let parsedMessage;
            try {
                parsedMessage = JSON.parse(message);
            } catch (error) {
                logger.error('Invalid JSON format');
                wsConnection.send(JSON.stringify({ error: 'Invalid JSON format' }));
                return;
            }

            if (!parsedMessage.hasOwnProperty('type')) {
                logger.error('Message does not have a type field');
                wsConnection.send(JSON.stringify({ error: 'Message does not have a type field' }));
                return;
            }

            switch (parsedMessage.type) {
                case 'event':
                    if (!parsedMessage.hasOwnProperty('data')) {
                        logger.error('Event message is missing required fields');
                        wsConnection.send(JSON.stringify({ error: 'Event message is missing required fields' }));
                        return;
                    }
                    if (!parsedMessage.data.hasOwnProperty('type') || !parsedMessage.data.hasOwnProperty('time') || !parsedMessage.data.hasOwnProperty('data')) {
                        logger.error('Event message is missing required fields');
                        wsConnection.send(JSON.stringify({ error: 'Event message is missing required fields' }));
                        return;
                    }
                    console.log((new Date()).toISOString())
                    await Event.create({
                        deviceId: deviceId,
                        type: parsedMessage.data.type,
                        time: new Date().toISOString(),
                        data: parsedMessage.data.data
                    });
                    logger.info(`Stored ${parsedMessage.data.type} event for device ${deviceId}`);
                    break;
                case 'connection':
                    logger.info('Connection message received from device ' + deviceId);
                    if (parsedMessage.hasOwnProperty('ip')) {
                        // set the device ip in the database
                        await Device.updateOne({ deviceId: deviceId }, { ip: parsedMessage.ip });
                    }
                    break;
                default:
                    logger.error('Unknown message type: '+ parsedMessage.type);
                    wsConnection.send(JSON.stringify({ error: 'Unknown message type' }));
                    return;
            }

            // Create a new object that includes the deviceId and the parsed message
            const broadcastMessage = {
                deviceId: deviceId,
                message: parsedMessage
            };

            controlWsServer.to(deviceId).emit('message', broadcastMessage);
        });

        wsConnection.on("close", () => {
            logger.info('Connection closed for device ' + deviceId);
            deviceManager.removeDevice(deviceId);
        });
    } catch (error) {
        logger.error("Error during WebSocket authentication:", error);
        wsConnection.close(1011, "Internal server error");
    }

}

module.exports = {
    startWebsocketServer,
};
