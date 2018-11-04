var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
//changing code below to reflect this extra midterm practice
var houseSchema = new Schema({
    House: { type: String, require: true },
    Price: { type: Number, require: true },
    datePosted: { type: Date, default: Date.now }
});

module.exports =
    Mongoose.model('House', houseSchema);
    //experimental ...swtiching 'User' to House
    //and userSchema to houseSchema and var userSchema to houseSchema 