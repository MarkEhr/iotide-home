const express = require('express');
const healthRoutes = require('./healthRoutes');
const securityRoutes = require('./securityRoutes');
const deviceRoutes = require('./deviceRoutes');

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
    }
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

module.exports = router;
