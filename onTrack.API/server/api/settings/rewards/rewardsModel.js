var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var Promotion = require('../../promotions/promotionModel');

var RewardsSchema = new Schema({
	name: {type: String},
	type: {type: String},
	description: {type: String}
})

RewardsSchema.pre('remove', function(next) {
	var reward = this;
	Promotion.find({})
		.then(promos => {
			var holder = promos;
			promos.forEach(function(promo, i) {
				if (!promo.rewards.includes(reward._id)) {
					holder.splice(i, 1);
				}
			})
			holder.forEach(r => {
				r.rewards = r.rewards.filter(x => {return x != x._id})
				r.save(function(err, saved) {
					if (err) next(err);
				})
			})
			next()
		}, function(err) {
			next(err)
		})
})

module.exports = mongoose.model('reward', RewardsSchema)