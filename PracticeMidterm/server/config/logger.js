//not sure if this is needed--seems like it is not...
var winston = require('winston');
require('winston-daily-rotate-file');

//going to try taking out the transports below...

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