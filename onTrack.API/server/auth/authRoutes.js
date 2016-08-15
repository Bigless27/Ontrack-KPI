var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./authController');

// before we send vack a jwt, lets check
// the password and username mathch what is in the DB
router.post('/signin', verifyUser(), controller.signin);

module.exports = router;
