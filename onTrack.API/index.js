// intro point for our server.
// PRO-TIP: if you have an index.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the index.js on the root

// setup config first before anything by requiring it
var config = require('./server/config/config');
var connection = require('./server/server');
var logger = require('./server/util/logger');
var cluster = require('cluster');
var http = require('http');

var server = connection.app.listen(config.port, function() {
    logger.log('listening on http://localhost:' + config.port);
})


