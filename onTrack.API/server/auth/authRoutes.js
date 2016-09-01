var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./authController');
var passport = require('passport')

// before we send vack a jwt, lets check
// the password and username mathch what is in the DB
router.post('/signin', verifyUser(), controller.signin);


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/#/main');
  });


router.get('logout', function(req, res) {
	req.logout();
	res.redirect('/')
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}

module.exports = router;
