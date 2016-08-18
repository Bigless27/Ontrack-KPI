var config = require('../config/config');
var Client = require('../api/client/clientModel')
var User = require('../api/user/userModel')
var _ = require('lodash')

exports.getClient = function() {
	return function(req, res, next) {
	
	 	Client.findById(req.params.id)
	 		.then(function(client) {
	 			if (!client) {
	 				res.status(401).send('No Client');
	 			} else {
	 				req.client = client;
	 				next();
	 			}
	 		},function(err) {
	 			next(err);
			})
	}
}

exports.getClientPromo = function() {
	return function(req, res, next) {

		Client.findById(req.params.id)
			.populate('promotions')
			.exec(function(err, client) {
				if (err) {
					res.status(401).send('Error finding client')
				} else {
					console.log(client)
					res.client = client
					next();
				}
			})
	}
}

exports.mockUser = function() {
	return function(req, res, next) {
		
		User.findById('57b621f8aeae67b49af4c397')
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