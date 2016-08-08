var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserPromoProgressSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
	promotionId: {type: Schema.Types.ObjectId, ref: 'promotion', required: true},
	value: {type: Number}
})

module.exports = mongoose.model('userpromoprogress', UserPromoProgressSchema)