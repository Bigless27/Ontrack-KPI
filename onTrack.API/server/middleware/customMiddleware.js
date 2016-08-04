var config = require('../config/config');
var Client = require('../api/client/clientModel')
var _ = require('lodash')

exports.getClient = function() {
	return function(req, res, next) {
	
	 	Client.findById(req.params.id)
	 		.then(function(client) {
	 			if (!client) {
	 				res.status(401).send('Unauthorized');
	 				next();
	 			} else {
	 				req.client = client;
	 				next();
	 			}
	 		},function(err) {
	 			next(err);
			})
	}
}