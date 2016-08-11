var Promotion = require('./promotionModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
	Promotion.findById(id)
		.then(function(promotion) {
			if (!promotion) {
				next(new Error('No Promotion with that ID'));
			} else {
				req.promotion = promotion;
				next();
			}
		}, function(err) {
			next(err);
	});
};

exports.get = function(req, res, next) {
	Promotion.find({})
		.then(function(promotion) {
			res.json(promotion);
		}, function(err) {
			next(err);
	});
};


exports.getOne = function(req, res, next) {
	var promotion = req.promotion;
	res.json(promotion)
}

exports.post = function(req, res, next) { //yup

	var newpromotion = req.body;
	// newpromotion.owner = req.user; Talk to todd about this, no user
	newpromotion.clientId = req.client._id

	Promotion.create(newpromotion)
		.then(function(promotion) {
			var updatedClient = req.client
			updatedClient.promotions.push(promotion._id);

			updatedClient.save(function(err, saved) {
				if(err) {
					next(err)
				} else {
					res.json(promotion)
				}
			})
	}, function(err) {
	  next(err);
	});

};

exports.put = function(req, res, next) {// works
	
  
  	var promotion = req.promotion;


	var update = req.body;

	_.merge(promotion, update);

	promotion.save(function(err, saved) {
	if (err) {
	  next(err);
	} else {
	  res.json(saved);
	}
	})
};

exports.delete = function(req, res, next) { //works
	
	req.promotion.remove(function(err, removed) {
		if (err) {
			next(err);
		} else {
			res.json(removed);
		}
	})
}






