var config = require('../server/config/config');
var express = require('express');
var app = express();
var logger = require('../server/util/logger');
var cluster = require('cluster');
var mongoose = require('mongoose');

module.exports = {app: app, config: config}