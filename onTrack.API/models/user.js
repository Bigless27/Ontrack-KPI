var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true, index: true},
    password: {type: String},
    
});

module.exports = mongoose.model('UserInfo', UserSchema);