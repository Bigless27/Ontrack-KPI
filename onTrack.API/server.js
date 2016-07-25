//
//  Required Packages
//
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var webToken = require('jsonwebtoken');

//
//  Project Files
//
var config = require('./config');

//
//  Controllers
//
var authController = require('./controllers/auth');

//
//  Configuration
//
var app = express();
var port = process.env.PORT || 433242;
mongoose.connect(config.database);

app.set('tokenSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
//  Start Server
//
app.use(router);
app.listen(port);