var authRouter = require('express').Router();
var webToken = require('jsonwebtoken');
var authController = require('../controllers/auth');

authRouter.post('/api/authenticate', function(req, res) {
    var username = req.body.email;
    var password = req.body.password;
    var token = webToken.sign(user, app.get('tokenSecret'), { expiresInMinutes: 1440 });

    res.json({
        success: true,
        message: 'this is not secure',
        token: token
    });
});


module.exports = authRouter;