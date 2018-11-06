var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
//changing code below to reflect Midterm requirements
//changing schema name and name of mongoose.model***
var fooSchema = new Schema({
    foo: { type: String, require: true },
    woo: { type: Number },
    dateDue: { type: Date, default: Date.now }
});

module.exports =
    Mongoose.model('Foo', fooSchema);
    //'Pet' to 'Foo'
    //petSchema to fooSchema