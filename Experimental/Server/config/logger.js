//if you an encounter an error, it may be due to below (need to install)
var winston = require('winston');
require('winston-daily-rotate-file');
//install above ^^^^
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
//took out transports that were here
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.splat(), 
            winston.format.simple()
        )
    }));
}

module.exports = logger;