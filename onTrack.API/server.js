var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var authController = require('./controllers/auth');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());

var router = express.Router();






app.use('/api', router);
app.listen(433242);