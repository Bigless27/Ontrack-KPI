var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./controller');

// before we send vack a jwt, lets check
// the password and username mathch what is in the DB
router.post('/authenticate', verifyUser(), controller.signin)



// var authRouter = require('express').Router();
// var webToken = require('jsonwebtoken');
// var authController = require('../controllers/auth');

// authRouter.post('/api/authenticate', function(req, res) {
//     var username = req.body.email;
//     var password = req.body.password;
//     var token = webToken.sign(user, app.get('tokenSecret'), { expiresInMinutes: 1440 });

//     res.json({
//         success: true,
//         message: 'this is not secure',
//         token: token
//     });
// });


// module.exports = authRouter;