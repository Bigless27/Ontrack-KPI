var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var PromotionSchema = new Schema({
	name: {type: String, required: true, index: true},
	type: {type: String, required: true},
	completionValue: {type: Number, required: true},
	clientId: {type: Schema.Types.ObjectId, ref: 'client'},
	owner: {type: Schema.Types.ObjectId, ref: 'user'},
	description: {type: String},
	triggers: [{type: Schema.Types.ObjectId, ref: 'trigger'}],
	startDate: {type: Date, default: Date.now, required: true},
	endDate: {type: Date, default: Date.now, required: true}
})


PromotionSchema.post('remove', function(doc) {
	Client.findById(doc.clientId)
		.then(function(client) {
			if(!client) {
				console.log('association not deleted')
			} else {
				update = client
				
				update.promotions.splice(update.promotions.indexOf(doc._id),1);
				_.merge(client, update)

				client.save(function(err, saved) {
					if (err) {
						console.log('not saved')
					} else {
						console.log('association deleted and saved')
					}
				})
			}
		})
})

// PromotionSchema.post('save', function(doc) {
// })



module.exports = mongoose.model('promotion', PromotionSchema)