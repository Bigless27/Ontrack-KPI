var Occurance = require('./occuranceModel');
var _ = require('lodash');
var customizer = require('../../updateCustomizer');

exports.params = function(req, res, next, id) {
	Progress.findById(id)
		.exec()
		.then(function(occurance) {
			if (!occurance) {
				next(new Error('no occurance with that id'))
			} else {
				req.occurance = occurance;
				next()
			}
		}, function(err) {
			next(err);
		});
}

exports.get = function(req, res, next) {
	Occurance.find({})
		.then(function(occurance) {
			res.json(occurance);
		}, function(err) {
			next(err);
		})
}

exports.getOne = function(req, res, next) {
	var occurance = req.occurance;
	res.json(occurance)
}

exports.put = function(req, res, next) {
  var occurance = req.occurance;

  var update = req.body;

  _.mergeWith(occurance, update, customizer.custom);

  occurance.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {//check
  var newOccurance = req.body;

  Occurance.create(newOccurance)
    .then(function(occurance) {
      res.json(occurance);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.occurance.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

