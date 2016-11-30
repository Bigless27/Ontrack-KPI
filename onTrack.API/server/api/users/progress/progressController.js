var Progress = require('./progressModel');
var _ = require('lodash');
var customizer = require('../../updateCustomizer')

exports.params = function(req, res, next, id) {
	Progress.findById(id)
    .exec()
		.then(function(progress) {
			if (!progress) {
				next(new Error('no promoProgress with that id'));
			} else {
				req.progress = progress;
				next();
			}
		}, function(err) {
			next(err);
	});
}

exports.get = function(req, res, next) {
	Progress.find({})
		.then(function(progress) {
			res.json(progress);
		}, function(err) {
			next(err);
		})
}

exports.getOne = function(req, res, next) {
	var progress = req.progress;
	res.json(progress)
}

exports.put = function(req, res, next) {
  var progress = req.progress;

  var update = req.body;

  _.mergeWith(progress, update, customizer.custom);

  progress.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {//check
  var newProgress = req.body;

  Progress.create(newProgress)
    .then(function(progress) {
      res.json(progress);
    }, function(err) {
      next(err);
    });
};



exports.delete = function(req, res, next) {
  req.progress.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};