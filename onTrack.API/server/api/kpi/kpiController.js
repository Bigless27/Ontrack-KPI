var KPI = require('./kpiModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
	KPI.findById(id)
		.then(function(kpi) {
			if (!kpi) {
				next(new Error('No Category with that id'));
			} else {
				req.kpi = kpi;
				next()
			}
		}, function(err) {
			next(err);
	});
};

exports.get = function(req, res, next) {
  KPI.find({})
    .then(function(kpi){
      res.json(kpi);
    }, function(err){
      next(err);
    });
};


exports.getOne = function(req, res, next) {
  var kpi = req.kpi.toJson();
  res.json(kpi);
};

