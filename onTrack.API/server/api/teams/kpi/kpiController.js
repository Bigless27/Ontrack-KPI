var KPI = require('./kpiModel');
var _ = require('lodash');
var customizer = require('../../updateCustomizer')

exports.params = function(req, res, next, id) {
	KPI.findById(id)
		.then(function(kpi) {
			if (!kpi) {
				next(new Error('No KPI with that id'));
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
  var kpi = req.kpi;
  res.json(kpi);
};

exports.post = function(req, res, next) {
	var newkpi = req.body;
	newkpi.teamId = req.team._id

	KPI.create(newkpi)
		.then(function(kpi) {
			var updatedTeam = req.team
			updatedTeam.kpis.push(kpi._id)

			updatedTeam.save(function(err, saved) {
				if(err) {
					next(err);
				} else {
					res.json(kpi)
				}
			})	
		}, function(err) {
			console.log(err)
			next(err);
		})
}

exports.put = function(req, res, next) {

	var kpi = req.kpi;

	var update = req.body;

	_.mergeWith(kpi, update, customizer.custom);

	kpi.save(function(err, saved) {
		if (err) {
			next(err);
		} else {
			res.json(saved);
		}
	})
}

exports.delete = function(req, res, next) {

	req.kpi.remove(function(err, removed) {
		if(err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}

