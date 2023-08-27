/**
 * app.js
 * Main express app
 */
const express = require('express');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const passport = require('passport');
const passportConfig = require('./config/passport');
const cors = require('cors');
const path = require("path");


const app = express();

if(config.env === 'development') {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
}

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}


// passport authentication
passportConfig(passport);
app.use(passport.initialize());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/api/v1', routes);

// serve frontend
const frontPath = path.join( config.projectRoot, 'frontend/build');
app.use(express.static( frontPath ));
// Single page application fallback
app.get('*', function (request, response) {
    response.sendFile(path.join(frontPath, 'index.html'));
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found: ' + req.originalUrl));
});


// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);

module.exports = app;
