var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
})