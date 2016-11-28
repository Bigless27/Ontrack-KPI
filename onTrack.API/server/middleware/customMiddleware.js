var config = require('../config/config');
var Team = require('../api/teams/teamModel')
var User = require('../api/users/userModel')
var _ = require('lodash')

exports.getTeam = function() {
	return function(req, res, next) {
	
	 	Team.findById(req.params.id)
	 		.then(function(team) {
	 			if (!team) {
	 				res.status(401).send('No Team');
	 			} else {
	 				req.team = team;
	 				next();
	 			}
	 		},function(err) {
	 			next(err);
			})
	}
}

exports.getTeamPromo = function() {
	return function(req, res, next) {

		Team.findById(req.params.id)
			.populate('promotions')
			.exec(function(err, team) {
				if (err) {
					res.status(401).send('Error finding team')
				} else {
					console.log(team)
					res.team = team
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