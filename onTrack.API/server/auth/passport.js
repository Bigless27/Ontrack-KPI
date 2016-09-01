var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var ClientJWTBearerStrategy = require("passport-oauth2-jwt-bearer").Strategy
var User = require('../api/user/userModel')
var configAuth = require('./oauth');

module.exports = function(passport) {

	passport.use(new ClientJWTBearerStrategy(
		  function(claimSetIss, done) {
		    Clients.findOne({ clientId: claimSetIss }, function (err, client) {
		      if (err) { return done(err); }
		      if (!client) { return done(null, false); }
		      return done(null, client);
		    });
		  }
	));

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'google.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				newUser.google.id = profile.id;
	    				newUser.google.token = accessToken;
	    				newUser.google.name = profile.displayName;
	    				newUser.google.email = profile.emails[0].value;
	    				newUser.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    			}
	    		});
	    	});
	    }

	));
}