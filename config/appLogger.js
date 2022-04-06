const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const level = process.env.LOG_LEVEL || 'info';

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const transport = {
    console: new transports.Console({ level: level }),
};

const appLogger = createLogger({
    level: level,
    format: combine(
        colorize(),
        timestamp(),
        myFormat
    ),
    transports: [
        transport.console
    ]
});



module.exports = { transport, appLogger }