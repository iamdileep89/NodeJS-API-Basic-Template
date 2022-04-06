const morgan = require('morgan');

morgan.token('Body', (req, res) => JSON.stringify(req.body));
morgan.token('RequestHeaders', (req, res) => JSON.stringify(req.headers));
morgan.token('RefId', (req, res) => res.locals.refId);
morgan.token('IsError', (req, res) => res.statusCode !== 200 ? true : false);
morgan.token('Error', (req, res) => JSON.stringify(res.locals.error) || null);
morgan.token('splitter', (req) => {
    return "\x1b[36m----------------------------------------------------------------------------------------------------------------------\x1b[0m\n";
});
morgan.token('TimeStamp', (req, res, args) => {
    // get the status code if response written
    var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
        ? res.statusCode
        : undefined
    var type = status !== 200 ? 'error' : 'info';
    // get status color
    var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                    : 0; // no color
    var date = new Date().toISOString();
    return '\x1b[' + color + 'm' + date + ' '+type+'\x1b[0m';
});

module.exports = morgan;