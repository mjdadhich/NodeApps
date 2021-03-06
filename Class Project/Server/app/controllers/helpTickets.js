//taking these top lines from user.js-assuming it is needed
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    HelpTicket = mongoose.model('helpTicket'), //changed this from User to HelpTicket to match below code
    HelpTicketContent = mongoose.model('helpTicketContent'),
    //added above line after getting error HelpTicketContent is not defined when i tried to add content to a helpticket in postman
    multer = require('multer'),
    mkdirp = require('mkdirp')
asyncHandler = require('express-async-handler');

//will need to add a route  which allows certain users to get all help tickets vs their own...12/3
module.exports = function (app, config) {
    app.use('/api', router);
    //ATTEMPTED TO FIX CODE HERE on 12/10 PER EMAIL 
    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();//took out {personId: req.params.id}
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
    //ADDING ROUTE HERE PER EMAIL 12/10
    router.get('/helpTickets/user/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find({ personId: req.params.id });
        query
            .sort(req.query.order)
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
    //not sure i need this route
    router.get('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get HelpTicket %s', req.params.id);
        await HelpTicket.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));
    //this is a new put per help tickets ppt updated 12/3
    router.put('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating HelpTicket');
        await HelpTicket.findOneAndUpdate({ _id: req.body.helpTicket._id }, req.body.helpTicket, { new: true })
            .then(result => {
                if (req.body.content) {
                    req.body.content.helpTicketId = result._id;//issue with helpTicketId?
                    var helpTicketContent = new HelpTicketContent(req.body.content);
                    helpTicketContent.save()
                        .then(content => {
                            res.status(201).json({ contentID: content._id });
                            res.status(201).json(result);
                        })
                } else {
                    res.status(200).json(result);
                }
            })
    }));
    //this is a new post per HelpTickets slides updated 12/3
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating HelpTicket');
        var helpTicket = new HelpTicket(req.body.helpTicket);
        await helpTicket.save()
            .then(result => {
                req.body.content.helpTicketId = result._id;//issue with helpTicketId?
                var helpTicketContent = new HelpTicketContent(req.body.content);
                helpTicketContent.save()
                    .then(content => {
                        res.status(201).json({ contentID: content._id });
                        res.status(201).json(result);
                    })
            })
    }));
    router.delete('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting HelpTicket %s', req.params.id);
        await HelpTicket.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })//going to need to add something here to delete content 
    }));
    //thinking may need to review this GET later
    router.get('/helpTicketContents', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting HelpTicket Content');
        let query = HelpTicketContent.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
    //updates made to code below on 12/9
    router.get('/helpTicketContents/helpTicket/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting a HelpTickets Content', req.params.id);
        let query = HelpTicketContent.find({ helpTicketId: req.params.id })
            .sort('-dateCreated')
            .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var path = config.uploads + '/helpTickets';
            mkdirp(path, function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            file.fileName = file.originalname;
            cb(null, file.fieldname + '-' + Date.now());
        }
    });

    var upload = multer({ storage: storage });

    router.post('/helpTicketContents/upload/:id', upload.any(), asyncHandler(async (req, res) => {
        logger.log('info', 'Uploading files');
        await HelpTicketContent.findById(req.params.id).then(result => {
            for (var i = 0, x = req.files.length; i < x; i++) {
                var file = {
                    originalFileName: req.files[i].originalname,
                    fileName: req.files[i].filename
                };
                result.file = file;
            }
            result.save().then(result => {
                res.status(200).json(result);
            });
        })
    }));

};
