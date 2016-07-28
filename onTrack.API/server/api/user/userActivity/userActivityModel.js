var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserActivitySchema = new Schema({
	userId: {type: Schema.Type.ObjectId, ref: 'user', required: true},
	activityId: {type: Schema.Type.ObjectId, ref 'user', required: true }
	value: {type: Number},
	name: {type: String}
});

module.exports = mongoose.model('useractivity', UserActivitySchema);