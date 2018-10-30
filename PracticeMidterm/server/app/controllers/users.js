//practice exam
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    asyncHandler = require('express-async-handler');


module.exports = function (app, config) {
    app.use('/api', router);
    //changed /users to todos below
    router.get('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all todos');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
//changed users...to todos/:id
    router.get('/todos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get a specific todo %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    //changed below code from users to /todos *might need to change more?
    router.post('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating a todo');
        var user = new User(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })
    }));
    //changed below from users to todos
    router.put('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating a todo');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));
    //changed below from users to todos again
    router.delete('/todos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting a todo %s', req.params.id);
        await User.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

};