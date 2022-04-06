const { APIError } = require('../utils/APIError')
const httpStatus = require('http-status');
const { appLogger } = require('../config/appLogger')

const errorConverter = (err, req, res, next) => {
    res.locals.isError = true;
    let error = err;
    if(!(error instanceof APIError)){ 
        const statusCode = error.statusCode || (error instanceof SyntaxError ? httpStatus.BAD_REQUEST : ((error instanceof ReferenceError || error instanceof TypeError) ? httpStatus.INTERNAL_SERVER_ERROR : httpStatus.INTERNAL_SERVER_ERROR));
        const code = statusCode;
        const message = error.name;
        const detail = error.message;
        // const message = error.message || httpStatus[statusCode];
        const type = 'E';
        error = new APIError(statusCode, code, message, detail, type);
    }
    next(error); 
};

const errorHandler = (err, req, res, next) => {
    const refId = res.locals.refId;
    const path = req.route ? req.route.path : req.url;
    const method = req.method;
    const response = {exceptions: [{
        type: err.type,
        code: err.code.toString(),
        message: (err.message).toUpperCase(),
        detail: method+' - '+path+' - '+err.detail+' - RefId: '+refId,
        }]};
    res.locals.error = response;
    return res.status(err.statusCode|| 500)
    .json(response);
};

module.exports = {
    errorConverter,
    errorHandler,
  };