var express = require('express');
var app = express();
var api = require('./api/api');
var auth = require('./auth/authRoutes')
var config = require('./config/config');
var logger = require('./util/logger');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport')



require('./auth/oauth/passport')(passport)

// db.url is different depending on NODE_ENV
mongoose.Promise = global.Promise 
mongoose.connect(config.db.url, function(err) {
	if(err) throw err;
});
// mongoose.connection.on('open', function() {
// 	console.log('db opened')
// })




if (config.seed) {
  require('./util/seed');
}
// setup the app middlware
require('./middleware/appMiddleware')(app);

// passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


// setup the api
app.use('/api', api)
app.use('/auth', auth)
app.use('/build', express.static(path.join(__dirname, '../build')))
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))
app.use('/client', express.static(path.join(__dirname, '../client')))
// set up global error handling
app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Oops');
});

//set up index route
app.get('/', function (req, res) {
    //require path
    res.sendFile(path.join(__dirname, '../index.html'));
})


// export the app for testing
module.exports = {app: app, config: config, mongoose: mongoose};