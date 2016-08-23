var config = require('../server/config/config');
var app = require('../server/server');
var logger = require('../server/util/logger');
var cluster = require('cluster');
var http = require('http');


module.exports = [app, config]