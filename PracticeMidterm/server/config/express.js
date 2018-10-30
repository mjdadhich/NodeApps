var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');
//experimental code for test
var mocha = require('mocha');
var chai = require('chai');
//added this also
chaiHttp = require('chai-http');

chai.use(chaiHttp);
//exp code above for testing

module.exports = function (app, config) {

    logger.log('info', "Loading Mongoose functionality");
    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));

        mongoose.set('debug', true);
        mongoose.connection.once('open', function callback() {
            logger.log('info', 'Mongoose connected to the database');
        });

        app.use(function (req, res, next) {
            logger.log('Request from ' + req.connection.remoteAddress, 'info');
            next();
        });
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(express.static(config.root + '/public'));

    //replaced a require line with parts to connect to models and controllers on 10.24
    require('../app/models/users');
    require('../app/controllers/users')(app, config);

    //experiment CODE MAY NEED TO BE TAKEN OUT testing
    var users = [	{todo: 'exam', priority: 'high'},
    {todo: 'sleep', priority: 'low'}
];

app.get('/api/', function (req, res) {
res.status(200).json(users);
});

//EXPerRMENTal CODE ABOVE FOR TESTING from unit testing ppt
    app.use(function (req, res) {
        logger.log('error', 'File not found');
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Server Error');
    });

    logger.log('info', "Starting application");

};