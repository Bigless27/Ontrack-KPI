var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new googleStrategy({
//     clientID: process.env.clientID,
//     clientSecret: process.env.clientSecret,
//     callbackURL: 'http://localhost:433242/auth/google/callback'
// },
// function(accessToken, refreshToken, profile, cb) {
//     return cb(null, profile);
// }))

exports.isAuthenticated = true;