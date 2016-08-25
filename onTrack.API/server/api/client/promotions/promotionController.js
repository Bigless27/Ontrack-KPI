var Promotion = require('./promotionModel');
var Progress = require('../../userPromoProgress/progressModel')
var Client = require('../clientModel')
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
	
	Client.findById(req.params.id)
			.populate('promotions')
			.exec(function(err, client) {
				if (err) {
					res.status(401).send('Error finding client')
				} else {
					res.json(client.promotions)
			}
		})
};


exports.getOne = function(req, res, next) {
	var promotion = req.promotion;
	res.json(promotion)
}

exports.post = function(req, res, next) { //yup

	var newpromotion = req.body;
	
	newpromotion.clientId = req.client._id

	Promotion.create(newpromotion)
		.then(function(promotion) {
			var updatedClient = req.client
			updatedClient.promotions.push(promotion._id);

			updatedClient.save(function(err, saved) {
				if(err) {
					next(err)
				} else {

					user = req.user
					Progress.create({userId: user._id, promotionId: promotion._id})
						.then(function(progress) {
							res.json(promotion)
						}, function(err) {
							console.log(err);
						})
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






