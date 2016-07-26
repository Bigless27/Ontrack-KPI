var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema({
    addressType: { type: String },
    streetAddress1: { type: String, required: true },
    streetAddress2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String, required: true }
});

var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    avatarUrl: { type: String },
    dateJoined: { type: Date, default: Date.now },
    state: { type: String },
    addresses: [AddressSchema],
    isAdmin: { type: Boolean }  //  This is NOT the user's role within the client.  This is the role within our system.  Only Idea42 or special cases should have this as true.
});



module.exports =  mongoose.model('UserInfo', UserSchema);