var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Bcrypt = require('bcryptjs');
//added below line when i saw it on auth video 
var roles = ['admin', 'user', 'staff'];

var userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'user', 'staff'] },
    dateRegistered: { type: Date, default: Date.now },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

userSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) { 
       Bcrypt.genSalt(10, function (err, salt) {
            if (err) { 
               return next(err); 
           }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else { 
       return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
//something else goes here too (start of auth video) wow, caught this on 12/4
//UserSchema.virtual('fullName')
//.get(function () {
//return this.firstName + ' ' + this.lastName;
//});

module.exports =
    Mongoose.model('User', userSchema);

