var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
//changed port below to 3300 and changed app name from Class Project to PracticeMidterm
//changed the below db to todo
var config = {
    development: {
        root: rootPath,
        app: { name: 'PracticeMidterm' },
        port: 3300,
        db: 'mongodb://127.0.0.1/todo-dev'
    },
    test: {
        root: rootPath,
        app: { name: 'UCCSS' },
        port: 4000,
        db: 'mongodb://127.0.0.1/todo-test'
    }
    //took out production path as it's prob not needed
};

module.exports = config[env];
