var mongoose = require('mongoose');

var AuthSchema = new mongoose.Schema({
    authenticationID: {
        type: String,
        unique: true,
    },
    authenticationService: {
        type: String
    },
    authenticationToken: {
        type: String
    },
    authenticationEmail: {
        type: String
    }
});

module.exports = mongoose.model('AuthInfo', AuthSchema);