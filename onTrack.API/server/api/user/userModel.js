var mongoose = require('mongoose');
var Schema = mongoose.Schema
var bcrypt = require('bcrypt') 
var logger = require('../../util/logger')


var AddressSchema = new Schema({
    addressType: { type: String },
    streetAddress1: { type: String, required: true },
    streetAddress2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String, required: true }
});

var UserSchema = new Schema({
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    avatarUrl: { type: String },
    dateJoined: { type: Date, default: Date.now },
    state: { type: String },
    addresses: [AddressSchema],
    isAdmin: { type: Boolean, default: false }  //  This is NOT the user's role within the client.  This is the role within our system.  Only Idea42 or special cases should have this as true.
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = this.encryptPassword(this.password);
    next()
})

UserSchema.methods = {
    //check the passwords on sigin
    authenticate: function(plainTextPword) {
        return bcrypt.compareSync(planTextPword, this.password);
    },
    //hash the password
    encryptPassword: function(plainTextPword) {
        if (!plainTextPword) {
            return ''
        } else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword, salt);
        }
    }, 

    toJson: function() {
        var obj = this.toObject()
        delete obj.password;
        return obj;
    }

}


module.exports =  mongoose.model('user', UserSchema);