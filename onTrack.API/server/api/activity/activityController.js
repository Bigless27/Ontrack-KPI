var Activity = require('./activityModel');
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
var Progress = require('../users/progress/progressModel')
var Team = require('../teams/teamModel')
var _ = require('lodash');
var customizer = require('../updateCustomizer')

exports.params = function(req, res, next, id) {
	Activity.findById(id)
		.exec(function(err, activity) {
			if(err) return next(err);
			req.activity = activity
			next()
		})
};

exports.get = function(req, res, next) {
	activity.find({})
			.then(function(act) {
				res.json(act)
			}, function(err) {
				console.log(err)
				next(err)
			})
};


exports.getOne = function(req, res, next) {
	var activity = req.activity;
	res.json(activity)
}

exports.post = function(req, res, next) { //yup

	var newactivity= req.body;
	
	Activity.create(newactivity)
		.then(function(activity) {
			res.json(activity)
		}, function(err) {
			next(err);
		})
};

exports.put = function(req, res, next) {// works
  	var activity = req.activity;

	var update = req.body;

	_.mergeWith(activity, update, customizer.custom);

	activity.save(function(err, saved) {
	if (err) {
	  next(err);
	} else {
	  res.json(saved);
	}
	})
};


exports.delete = function(req, res, next) { //works
	
	req.activity.remove(function(err, removed) {
		if (err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}
