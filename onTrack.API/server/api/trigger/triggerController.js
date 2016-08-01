var Trigger = require('./triggerModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
	Trigger.findById(id)
		.then(function(Trigger) {
			if(!trigger) {
				next(new Error('No Trigger with that ID'));
			} else {
				req.trigger = trigger
				next();
			}
		},function(err) {
			next(err);
		})
};

exports.get = function(req, res, next) {
	Trigger.find({})
		.then(function(trigger) {
			res.json(trigger);
		}, function(err) {
			logger.error(err);
			next(err)
		})
};

exports.getOne = function(req, res, next) {
	Trigger.find({})
		.then(function(trigger) {
			res.json(trigger)
		}, function(trigger){
			logger.error(err);
			next(err);
		})
}

exports.post = function(req, res, next) {
	var newTrigger = req.body;
	Trigger.create(newTrigger)
		.then(function(trigger) {
			res.json(trigger)
		}, function(err) {
			logger.error(err);
			next(err)
		})
}

exports.put = function(req, res, next) {
	var trigger = req.trigger;
	
	var update = req.body;

	_.merge(trigger, update);

	trigger.save(function(err, saved) {
		if(err) {
			next(err);
		} else {
			res.json(saved)
		}
	})
};