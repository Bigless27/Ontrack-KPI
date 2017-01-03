var Rewards = require('./rewardsModel')
var _ = require('lodash')
var cutsomizer = require('../../updateCustomizer')

exports.params = function(req, res, next, id) {
	Rewards.findById(id)
		.populate('users')
		.exec(function(err, rewards){
			if (err) return next(err);
			req.rewards = rewards
			next()
	})
};

exports.get = function(req, res, next) { // works
	Rewards.find({})
		.then(function(rewards){
			res.json(rewards);
		}, function(err) {
			next(err);
	})
}

exports.getOne = function(req, res, next) {// works
	var rewards = req.rewards;
	res.json(rewards)
}

exports.put = function(req, res, next) {// works
  	var rewards = req.rewards;

	var update = req.body;

	_.mergeWith(rewards, update, customizer.custom);

	rewards.save(function(err, saved) {
	if (err) {
	  next(err);
	} else {
	  res.json(saved);
	}
	})
};

exports.post = function(req, res, next) { //works
	var newReward = req.body;

	Rewards.create(newReward)
		.then(function(reward) {
			res.json(reward)
		}, function(err) {
			next(err)
	})
}

exports.delete = function(req, res, next) { //works
	req.rewards.remove(function(err, removed) {
		if (err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}