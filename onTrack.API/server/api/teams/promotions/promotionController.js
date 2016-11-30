var Promotion = require('./promotionModel');
var Progress = require('../../users/progress/progressModel')
var Team = require('../teamModel')
var _ = require('lodash');
var customizer = require('../../updateCustomizer')

exports.params = function(req, res, next, id) {
	Promotion.findById(id)
		.then(function(promotion) {
			if (!promotion) {
				next(new Error('No Promotion with that ID'));
			} else {
				req.promotion = promotion;
				next();
			}
		}, function(err) {
			next(err);
	});
};

exports.get = function(req, res, next) {
	
	Team.findById(req.params.id)
			.populate('promotions')
			.exec(function(err, team) {
				if (err) {
					res.status(401).send('Error finding team')
				} else {
					res.json(team.promotions)
			}
		})
};


exports.getOne = function(req, res, next) {
	var promotion = req.promotion;
	res.json(promotion)
}

exports.post = function(req, res, next) { //yup

	var newpromotion = req.body;
	
	newpromotion.teamId = req.team._id

	Promotion.create(newpromotion)
		.then(function(promotion) {
			var updatedTeam = req.team
			updatedTeam.promotions.push(promotion._id);

			updatedTeam.save(function(err, saved) {
				if(err) {
					next(err)
				} else {
					res.json(promotion)
				}
			})
	}, function(err) {
	  next(err);
	});

};

exports.put = function(req, res, next) {// works
	
  
  	var promotion = req.promotion;

	var update = req.body;

	_.mergeWith(promotion, update, customizer.custom);

	promotion.save(function(err, saved) {
	if (err) {
	  next(err);
	} else {
	  res.json(saved);
	}
	})
};

exports.delete = function(req, res, next) { //works
	
	req.promotion.remove(function(err, removed) {
		if (err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}
