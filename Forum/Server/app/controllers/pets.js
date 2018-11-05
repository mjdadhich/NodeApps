//extra practice for midterm exam
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Pet = mongoose.model('Pet'),
    asyncHandler = require('express-async-handler');
//changed mongoose.model House to Pet
//also changed House in 6 spots to Pet

module.exports = function (app, config) {
    app.use('/api', router);
    //changed houses to pets
    router.get('/pets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all pets');
        let query = Pet.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
//changed houses to pets
    router.get('/pets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get a specific pet %s', req.params.id);
        await Pet.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    //changed below code to pets
    router.post('/pets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating a record of a pet');
        var user = new Pet(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })
    }));
    //changed below to pets
    router.put('/pets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating the record of a pet');
        await Pet.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));
    //changed below to pets again
    router.delete('/pets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting the record of a pet %s', req.params.id);
        await Pet.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

};