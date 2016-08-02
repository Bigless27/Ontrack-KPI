var User = require('../userModel');
var Settings = require('./settingsModel');
var  _ = require('lodash');

exports.params = function(req, res, next, id) {
	Settings.findById(id)
		.then(function(setting) {
			if (!setting) {
				next(new Error('No Setting with that id'));
			} else {
				req.settings = setting;
				next();
			}
		}, function(err) {
			next(err);
	});
};

exports.get = function(req, res, next) { // works
	Settings.find({})
		.then(function(settings){
			res.json(settings);
		}, function(err) {
			next(err);
	})
}

exports.getOne = function(req, res, next) {// works
	var settings = req.settings;
	res.json(settings)
}

exports.put = function(req, res, next) {// works
	
  	var settings = req.settings;

	var update = req.body;

	_.merge(settings, update);

	settings.save(function(err, saved) {
	if (err) {
	  next(err);
	} else {
	  res.json(saved);
	}
	})
};

exports.post = function(req, res, next) { //works
	var newSetting = req.body;
	newSetting.userId = req.params.id;

	Settings.create(newSetting)
		.then(function(setting) {
			res.json(setting)
		}, function(err) {
			next(err)
	})
}

exports.delete = function(req, res, next) { //works

	req.settings.remove(function(err, removed) {
		if (err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}