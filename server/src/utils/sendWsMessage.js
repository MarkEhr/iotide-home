const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/ws', {
    headers: {
        'x-device-id': '001630EC',
        'x-api-key': '+d!k~XB9yp-crxAn=cCGr$-o'
    }
});

ws.on('open', function open() {
    setTimeout(() => {
        let message = {};
        message.type = 'event';
        message.data = {};
        message.data.type = 'temperature';
        message.data.time = '2021-07-01T12:03:00';
        message.data.data = '14';
        ws.send(JSON.stringify(message));
    }, 1000);
});

ws.on('error', function error(err) {
    console.log('WebSocket error:', err);
});