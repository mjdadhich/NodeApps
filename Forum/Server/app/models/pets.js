var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
//changing code below to reflect this extra midterm practice
var petSchema = new Schema({
    fname: { type: String, require: true },
    lname: { type: String, require: true },
    age: { type: Number, require: true },
    email: { type: String, require: true, unique: true}
});

module.exports =
    Mongoose.model('Pet', petSchema);
    //switched House to Pet and...
    //houseSchema houseSchema to petSchema