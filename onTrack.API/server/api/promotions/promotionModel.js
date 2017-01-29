var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var Team = require('../teams/teamModel')


var PromotionSchema = new Schema({
	name: {type: String, required: true, index: true},
	rewards: [{type: Schema.Types.ObjectId, ref: 'reward'}],
	achievementRule: {type: String, default: 'inclusive'},
	goals: [{type: Schema.Types.ObjectId, ref: 'goal'}],
	teamId: {type: Schema.Types.ObjectId, ref: 'team'},
	owner: {type: Schema.Types.ObjectId, ref: 'user'},
	description: {type: String, required: true},
	startDate: {type: Date, default: Date.now, required: true},
	endDate: {type: Date, default: Date.now, required: true}
})


PromotionSchema.pre('remove', function(next) {
	var promo = this;
	Team.find({})
		.then(teams => {
			var holder = teams
			teams.forEach(function(team, i) {
				var ids = team.promotions.map(x => x.promoId)
				if (!ids.includes(promo._id)) {
					holder.splice(i,1)
				}
			})
			holder.forEach(p => {
				p.promotions = p.promotions.filter(x => {return x.promoId != promo._id})
				p.save(function(err, saved) {
					if (err) next(err)
				})
			})
			next()
		}, function(err) {
		 next(err)
		})
})

module.exports = mongoose.model('promotion', PromotionSchema)