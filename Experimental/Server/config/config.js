var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
//changed port below to 3200 and changed app name to Experimental
//changed the below db to house (db sections)
var config = {
    development: {
        root: rootPath,
        app: { name: 'Experimental' },
        port: 3300,
        db: 'mongodb://127.0.0.1/house-dev'
    },
    test: {
        root: rootPath,
        app: { name: 'Experimental' },
        port: 4000,
        db: 'mongodb://127.0.0.1/house-test'
    }
    //took out production path as it's prob not needed
};

module.exports = config[env];
