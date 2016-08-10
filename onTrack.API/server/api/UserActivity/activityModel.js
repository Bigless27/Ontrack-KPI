var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserActivitySchema = new Schema({
	items : [{
			type: {type: String, required: true},
			value: [{
						srv: {type: Number, required: true},
						retail: {type: Number},
						quantity: {type: Number, required: true}
					}]
			}],
	userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
	date: {type: Date, required: true},
});

module.exports = mongoose.model('useractivity', UserActivitySchema);