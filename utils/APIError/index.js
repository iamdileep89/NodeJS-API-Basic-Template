const httpStatus = require("http-status");

class APIError extends Error {
    constructor(statusCode, code, message, detail, type = "I", stack = '') {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.type = type;
        this.code = code
        this.detail = detail;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor.name);
        }
    }
};

class NotFoundError extends Error {
    constructor(message='Route Not Found in App!', stack='') {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = httpStatus.NOT_FOUND;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor.name);
        }
    }
}
  
module.exports.APIError = APIError;
module.exports.NotFoundError = NotFoundError;