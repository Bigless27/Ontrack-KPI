var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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


PromotionSchema.pre('remove', function(next) {
	console.log('deleting associations')
	this.model('client').remove({promotions: this.id}, next)
})
module.exports = mongoose.model('promotion', PromotionSchema)