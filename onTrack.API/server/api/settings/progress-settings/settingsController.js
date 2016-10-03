var Settings = require('./settingsModel');
var  _ = require('lodash');



exports.params = function(req, res, next, id) {
	
	Settings.findById(id)
		.populate('users')
		.exec(function(err, setting){
			if (err) return next(err);
			req.settings = setting
			next()
	})
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

	_.mergeWith(settings, update, customizer);

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

function customizer(objValue, srcValue){
	if(Array.isArray(objValue)){
		if(objValue.length > srcValue.length){
			return objValue = srcValue
		}
	}
}




