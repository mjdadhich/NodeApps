//taking these top lines from user.js-assuming it is needed
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    HelpTicket = mongoose.model('helpTicket'), //changed this from User to HelpTicket to match below code
    HelpTicketContent = mongoose.model('helpTicketContent'),
    //added above line after getting error HelpTicketContent is not defined when i tried to add content to a helpticket in postman
    asyncHandler = require('express-async-handler');


module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
            .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })
            .populate({ path: 'ownerId', model: 'User', select: 'lastName firstName fullName' });

        if (req.query.status) {
            if (req.query.status[0] == '-') {
                query.where('status').ne(req.query.status.substring(1));
            } else {
                query.where('status').eq(req.query.status);
            }
        }
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
    router.get('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get HelpTicket %s', req.params.id);
        await HelpTicket.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));
    router.put('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating HelpTicket');
        await HelpTicket.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating HelpTicket');
        // req.body.content = [req.body.content]; he took out this in the video@3:27
        var helpTicket = new HelpTicket(req.body);//changed user and User here respectively
        const result = await helpTicket.save() //changed this from user to helpTicket
        //  .then(result => {
        res.status(201).json(result);
    }));

    router.delete('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting HelpTicket %s', req.params.id);
        await HelpTicket.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })//going to need to add something here to delete content 
    }));
    //content section
    router.get('/helpTicketContents', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting HelpTicket Content');
        let query = HelpTicketContent.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
    router.get('/helpTicketContent/helpTicket/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting a HelpTickets content %s', req.params.id);
        let query = HelpTicketContent.find({ helpTicketId: req.params.id })
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
    router.post('/helpTicketContents', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating HelpTicket Content');
        var helpTicketContent = new HelpTicketContent(req.body);
        const result = await helpTicketContent.save()
        res.status(201).json(result);
    }));
    //goign to need to add something here to...upload contents
};
