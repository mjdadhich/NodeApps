//midterm exam
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Foo = mongoose.model('Foo'),
    asyncHandler = require('express-async-handler');
//changed mongoose.model to Foo
//also changed House in 6 spots to Foo

module.exports = function (app, config) {
    app.use('/api', router);
    //changed to /foos and Foo
    router.get('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all foos');
        let query = Foo.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
//changed to Foo and /foos
    router.get('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get a specific foo %s', req.params.id);
        await Foo.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    //changed below to Foo and /foos
    router.post('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Create a foo');
        var user = new Foo(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })
    }));
    //changed below to Foo and foos
    router.put('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Update a foo');
        await Foo.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));
    //changed below to foo and foos again
    router.delete('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting a foo %s', req.params.id);
        await Foo.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

};