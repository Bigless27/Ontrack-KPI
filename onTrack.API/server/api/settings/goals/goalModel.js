var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var Promotion = require('../../promotions/promotionModel');

// you can pass any string into the goal schema
var GoalSchema = new Schema({
	gsfName: {type: String, required: true},
	any: {}
})

GoalSchema.pre('remove', function(next) {
	var goal = this;
	Promotion.find({})
		.then(promos => {
			var holder = promos;
			promos.forEach(function(promo, i) {
				var ids = promo.goals.map(x => x._id)
				if (!ids.includes(goal._id)) {
					holder.splice(i,1)
				}
			})
			console.log(holder)
			return
		})

})

module.exports = mongoose.model('goal', GoalSchema)