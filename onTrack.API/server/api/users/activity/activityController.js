var Activity = require('./activityModel');
var _ = require('lodash');
var algorithm = require('../../algorithm')

exports.params = function(req, res, next, id) {
	Activity.findById(id)
		.then(function(activity) {
			if (!activity) {
				next(new Error('No userActivity with that id'));
			} else {
				req.activity = activity;
				next();
			}
		}, function(err) {
			next(err);
	});
}


exports.get = function(req, res, next) {
	Activity.find({})
		.then(function(activity){
			res.json(activity);
		}, function(err) {
			next(err);
	})
}

exports.getOne = function(req, res, next) {
	var activity = req.activity;
	res.json(activity)
}

exports.put = function(req, res, next) {
  var activity = req.activity;

  var update = req.body;

  _.mergeWith(activity, update, customizer);

  activity.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {//check
  var newActivity = req.body;
  Activity.create(newActivity)
    .then(function(activity) {
      res.json(activity)
    }, function(err) {
      console.log(err)
      next(err);
    });
};


exports.delete = function(req, res, next) {
  req.activity.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

function customizer(objValue, srcValue){
  if(Array.isArray(objValue)){
    if(objValue.length > srcValue.length){
      return objValue = srcValue
    }
  }
}






