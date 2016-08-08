var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
var mongoose = require('mongoose');
// db.url is different depending on NODE_ENV
mongoose.Promise = global.Promise
mongoose.connect(config.db.url);

if (config.seed) {
  require('./util/seed');
}
// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);


// set up global error handling
app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Oops');
});


// export the app for testing
module.exports = app;