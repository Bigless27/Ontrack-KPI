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

module.exports = mongoose.model('promotion', PromotionSchema)