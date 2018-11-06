var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
//kept port as 3300 and changed app names to Forum
//changed the below db to pet (db sections)
var config = {
    development: {
        root: rootPath,
        app: { name: 'foo' },
        port: 3300,
        db: 'mongodb://127.0.0.1/foobar-dev'
    },
    test: {
        root: rootPath,
        app: { name: 'footest' },
        port: 80,
        db: 'mongodb://127.0.0.1/foobar-test'
    }
    //changed the port above to 80
};

module.exports = config[env];
