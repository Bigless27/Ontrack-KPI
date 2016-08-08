// intro point for our server.
// PRO-TIP: if you have an index.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the index.js on the root

// setup config first before anything by requiring it
var config = require('./server/config/config');
var app = require('./server/server');
var logger = require('./server/util/logger');
var cluster = require('cluster');
var http = require('http');

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    logger.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        logger.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        logger.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        logger.log('Starting a new worker');
        cluster.fork();
    });
} else {
    var app = require('express')();
    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

    var server = app.listen(config.port, function() {
        logger.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}


// app.listen(config.port);
// logger.log('listening on http://localhost:' + config.port);
