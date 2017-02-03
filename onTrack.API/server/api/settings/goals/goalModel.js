var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var Promotion = require('../../promotions/promotionModel');
var Progress = require('../progress-settings/settingsModel')

// you can pass any string into the goal schema
var GoalSchema = new Schema({
	//we use gsfName here and in activity to make sure there are no clahes with the any field
	gsfName: {type: String, required: true},
	any: {},
	progress: {type: Schema.Types.ObjectId, ref: 'progress'}
})

GoalSchema.pre('save', function(next) {
	var goal = this;

	if (!goal.progress) {
		var prog = {name: goal.gsfName, type: 'edit me!', description: 'edit me!'}
		Progress.create(prog), function(err, progress) {
			if (err) next(err)
		}
	}
	next()
})

GoalSchema.pre('remove', function(next) {
	var goal = this;
	Promotion.find({})
		.then(promos => {
			var holder = promos;
			promos.forEach(function(promo, i) {
				if (!promo.goals.includes(goal._id)) {
					holder.splice(i,1)
				}
			})
			holder.forEach(g => {
				g.goals = g.goals.filter(x => {return x != goal._id})
				g.save(function(err, saved) {
					if (err) next(err)
				})
			})
			next()
		}, function(err) {
			next(err)
		})
})

module.exports = mongoose.model('goal', GoalSchema)