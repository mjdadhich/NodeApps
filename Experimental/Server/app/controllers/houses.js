//extra practice for midterm exam
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    House = mongoose.model('House'),
    asyncHandler = require('express-async-handler');
//changed mongoose.model('User') to House
//also changed User in 6 spots to House

module.exports = function (app, config) {
    app.use('/api', router);
    //changed todos to houses
    router.get('/houses', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all houses');
        let query = House.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
//changed todos to houses
    router.get('/houses/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get a specific house %s', req.params.id);
        await House.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    //changed below code to houses
    router.post('/houses', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating a house listing');
        var user = new House(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })
    }));
    //changed below to houses
    router.put('/houses', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating a house listing');
        await House.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));
    //changed below to houses again
    router.delete('/houses/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting a house listing %s', req.params.id);
        await House.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

};