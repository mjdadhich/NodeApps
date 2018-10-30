var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
//changing code below to reflect midterm schema
var userSchema = new Schema({
    Todo: { type: String, require: true },
    Priority: { type: String, require: true, enum: ['Critical', 'High', 'Medium', 'Low'] },
    dateDue: { type: Date, default: Date.now },
});

module.exports =
    Mongoose.model('User', userSchema);

