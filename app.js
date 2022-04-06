const express = require('express');
const compress = require('compression');
const helmet = require('helmet');
const responseTime = require('response-time');
const rid = require('connect-rid');
const expressValidator = require('express-validator')

const constants = require('./config/constants');
const morgan = require('./middlewares/morgan');
const refId = require('./middlewares/refId');
const xss = require('./middlewares/xss')
const { errorConverter, errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./utils/APIError');


const APIRoutes = require('./routes')
const healthCheck = require('./routes/auth.healthCheck');



const app = express();

app.use(rid()); //to add unique id to response headers
app.use(morgan(constants.morganFormat)); //log Request & response data
app.use(compress()); //compress responses
app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body
// app.use(expressValidator()); // to add validator functions to request cycle
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(responseTime()); // to calculate & add responseTime to response headers
app.use(refId); //to map reference Id
app.use(xss()); // to sanitize xss requests

app.get(constants.healthPath, healthCheck); // container Health check
app.use(global.appConfig.auth2Contextroot, APIRoutes) // mount all routes on app


app.use((req, res, next) => next(new NotFoundError())); // NotFound Router

app.use(errorConverter); // convert any error to APIError, if needed
app.use(errorHandler); // to handle final error


module.exports = app;

