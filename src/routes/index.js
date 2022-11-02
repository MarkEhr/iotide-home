const express = require('express');
const healthRoutes = require('./healthRoutes');
const config = require('../config/config');

const router = express.Router();

const routes = [
    {
        path: '/health',
        router: healthRoutes,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

module.exports = router;
