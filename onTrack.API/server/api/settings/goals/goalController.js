var Goal = require('./goalModel')
var _ = require('lodash');
var customizer = require('../../updateCustomizer')

exports.params = function(req, res, next, id) {
	Goal.findById(id)
		.then(function(goal) {
			if (!goal) {
				next(new Error('No Goal with that ID'));
			} else {
				req.goal = goal;
				next();
			}
		}, function(err) {
			next(err);
	});
};

exports.get = function(req, res, next) {
	Goal.find({})
		.then(function(goals) {
			res.json(goals)
		},function(err) {
			next(err)
		})
};


exports.getOne = function(req, res, next) {
	var goal = req.goal;
	res.json(goal)
}

exports.post = function(req, res, next) { //yup

	var newGoal = req.body;

	var name = {'gsfName': newGoal.gsfName}
	delete newGoal.gsfName

	var data = Object.assign({any: newGoal}, name)

	Goal.create(data) 
		.then(function(goal) {
			res.json(goal)
		}, function(err) {
			next(err)
		})

};

exports.put = function(req, res, next) {// works

	var goal = req.goal

	goal.gsfName = req.body.gsfName
	delete req.body.gsfName

	goal.any = req.body

	goal.save(function(err, saved) {
	if (err) {
	  next(err);
	} else {
	  res.json(saved);
	}
	})
};

exports.delete = function(req, res, next) { //works
	req.goal.remove(function(err, removed) {
		if (err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}
