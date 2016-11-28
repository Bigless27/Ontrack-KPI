var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../../users/userModel')
var _ = require('lodash')

var subTypesSchema = new Schema({
	name: {type: String}
})

var KpiSchema = new Schema({
    name: { type: String, unique: true, required: true, index: true },
    type: { type: String, required: true },
    subTypes: [subTypesSchema],
    value: { type: String, required: true },
    teamId: {type: Schema.Types.ObjectId, ref: 'team'}
});

KpiSchema.post('remove', function(doc) {
	//this require here is a patch!!!!! look to refactor better in future
	var Team = require('../teamModel')
	Team.findById(doc.teamId)
		.then(function(team) {
			if(!team) {
				console.log('association not deleted')
			} else {
				update = team

				update.kpis.splice(update.kpis.indexOf(doc._id),1);

				_.merge(team, update)


				team.save(function(err, saved) {
					if (err) {
						console.log('not saved')
					} else {
						console.log('association deleted and saved')
					}
				})
			}
		}, function(err) {
			console.log(err)
		})
})



module.exports = mongoose.model('kpi', KpiSchema);