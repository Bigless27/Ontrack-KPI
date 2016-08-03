var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromotionSchema = new Schema({
	name: {type: String, required: true, index: true},
	type: {type: String, required: true},
	clientId: {type: Schema.Types.ObjectId, ref: 'client'},
	owner: {type: Schema.Types.ObjectId, ref: 'user'},
	description: {type: String}
})

module.exports = mongoose.model('promotion', PromotionSchema)