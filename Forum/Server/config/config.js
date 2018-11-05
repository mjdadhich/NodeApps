var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
//kept port as 3300 and changed app names to Forum
//changed the below db to pet (db sections)
var config = {
    development: {
        root: rootPath,
        app: { name: 'Forum' },
        port: 3300,
        db: 'mongodb://127.0.0.1/pet-dev'
    },
    test: {
        root: rootPath,
        app: { name: 'fortest' },
        port: 4000,
        db: 'mongodb://127.0.0.1/pet-test'
    }
    //took out production path as it's prob not needed
};

module.exports = config[env];
