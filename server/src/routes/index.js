const express = require('express');
const healthRoutes = require('./healthRoutes');
const securityRoutes = require('./securityRoutes');
const deviceRoutes = require('./deviceRoutes');
const eventRoutes = require('./eventRoutes');

const router = express.Router();

const routes = [
    {
        path: '/',
        router: securityRoutes,
    },
    {
        path: '/health',
        router: healthRoutes,
    },
    {
        path: '/devices',
        router: deviceRoutes,
    },
    {
        path: '/events',
        router: eventRoutes,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

module.exports = router;
