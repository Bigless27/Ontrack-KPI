var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'user'},
	type: {type: String, required: true},
	value: {type: Number, required: true},
	Date: {type: Date}
})

module.exports = mongoose.model('activity', ActivitySchema);