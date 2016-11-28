var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var Team = require('../teamModel')


//all these subtypes schemas I believe may be optimized by just holding the name
var subTypesSchema = new Schema({
	name: {type: String}
})


var PromotionSchema = new Schema({
	name: {type: String, required: true, index: true},
	type: {type: String, required: true},
	subTypes: [subTypesSchema],
	completionValue: {type: Number, required: true},
	teamId: {type: Schema.Types.ObjectId, ref: 'team'},
	owner: {type: Schema.Types.ObjectId, ref: 'user'},
	description: {type: String, required: true},
	startDate: {type: Date, default: Date.now, required: true},
	endDate: {type: Date, default: Date.now, required: true}
})


PromotionSchema.post('remove', function(doc) {
	Team.findById(doc.teamId)
		.then(function(team) {
			if(!team) {
				console.log('association not deleted')
			} else {
				var update = team
				
				update.promotions.splice(update.promotions.indexOf(doc._id),1);
				_.merge(team, update)

				team.save(function(err, saved) {
					if (err) {
						console.log('not saved')
					} else {
						console.log('association deleted and saved')
					}
				})
			}
		})

})




module.exports = mongoose.model('promotion', PromotionSchema)