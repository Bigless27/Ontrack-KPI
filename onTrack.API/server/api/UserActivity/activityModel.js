var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var algorithm = require('../algorithm')

var UserActivitySchema = new Schema({
	items: [{
			type: {type: String, required: true},
			value: [{
						srv: {type: Number, required: true},
						retail: {type: Number},
						quantity: {type: Number, required: true}
					}]
			}],
	userId: {type: Schema.Types.ObjectId, ref: 'user'},
	date: {type: Date, default: Date.now},
});

UserActivitySchema.post('save', function(doc) {
	console.log(algorithm.saySomething())
})

module.exports = mongoose.model('useractivity', UserActivitySchema);