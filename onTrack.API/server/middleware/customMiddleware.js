var config = require('../config/config');
var Client = require('../api/client/clientModel')
var User = require('../api/user/userModel')
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

exports.mockUser = function() {
	return function(req, res, next) {
		
		User.findById('57b1e942d043814d391fb926')
			.then(function(user) {
				if(!user) {
					res.status(401).send('Unauthorized');
					next();
				} else {
					req.user = user;
					next();
				}
			}, function(err) {
				next(err);
			})
	}
}