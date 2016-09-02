var mongoose = require('mongoose');
var Schema = mongoose.Schema
var bcrypt = require('bcrypt') 
var jwt = require('express-jwt');

var UserSchema = new Schema({
    email: { type: String, unique: true, required: true, index: true },
    clientId: [{type: Schema.Types.ObjectId, ref: 'client'}],
    password: { type: String},
    firstName: { type: String },
    lastName: { type: String },
    avatarUrl: { type: String },
    dateJoined: { type: Date, default: Date.now },
    state: { type: String },
    activity: [{type: Schema.Types.ObjectId, ref: 'useractivity'}],
    progress: [{type: Schema.Types.ObjectId, ref: 'userpromoprogress'}],
    facebook: {
        id: String,
        token: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = this.encryptPassword(this.password);
    next()
})

UserSchema.methods = {
    //check the passwords on sigin
    authenticate: function(plainTextPword, cb) {
        return bcrypt.compare(plainTextPword, this.password, function(err, isMatch){
            if(err) return cb(err)
            cb(err, isMatch)
        })
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