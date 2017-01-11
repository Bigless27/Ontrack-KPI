var Promotion = require('./promotionModel');
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
var Progress = require('../users/progress/progressModel')
var Team = require('../teams/teamModel')
var _ = require('lodash');
var customizer = require('../updateCustomizer')

exports.params = function(req, res, next, id) {
	Promotion.findById(id)
		.populate('goals')
		.populate('rewards')
		.exec(function(err, promotion) {
			if(err) return next(err);
			req.promotion = promotion
			next()
		})
};

exports.get = function(req, res, next) {
	Promotion.find({})
			.then(function(promo) {
				res.json(promo)
			}, function(err) {
				console.log(err)
				next(err)
			})
};


exports.getOne = function(req, res, next) {
	var promotion = req.promotion;
	res.json(promotion)
}

exports.post = function(req, res, next) { //yup

	var newpromotion = req.body;
	
	Promotion.create(newpromotion)
		.then(function(team) {
			res.json(team)
		}, function(err) {
			next(err);
		})
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

exports.updateRefs = function(req, res, next) {
	var promotion = req.promotion;

	var update = req.body;

	promotion.goals = update.goals.map(x => new ObjectId(x))
	promotion.rewards = update.rewards.map(x => new ObjectId(x))

	promotion.save(function(err, saved) {
		if(err) {
			next(err);
		} else {
			res.json(saved)
		}
	})
}

exports.delete = function(req, res, next) { //works
	
	req.promotion.remove(function(err, removed) {
		if (err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}
