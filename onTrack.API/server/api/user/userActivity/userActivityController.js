var userActivity = require('./userModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
	userActivity.findById(id)
		.then(function(userActivity) {
			if (!userActivity) {
				next(new Error('No userActivity with that id'));
			} else {
				req.userActivity = userActivity;
				next();
			}
		}, function(err) {
			next(err);
	});
}


exports.get = function(req, res, next) {
	userActivity.find({})
		.then(function(userActivity){
			res.json(userActivity);
		}, function(err) {
			next(err);
	})
}

exports.getOne = function(req, res, next) {
	var userActivity = req.userActivity;
	res.json(userActivity)
}

exports.put = function(req, res, next) {
  var userActivity = req.userActivity;

  var update = req.body;

  _.merge(userActivity, update);

  userActivity.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newuserActivity = req.body;

  userActivity.create(newuserActivity)
    .then(function(userActivity) {
      res.json(userActivity);
    }, function(err) {
      next(err);
    });
};


exports.delete = function(req, res, next) {
  req.userActivity.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};







