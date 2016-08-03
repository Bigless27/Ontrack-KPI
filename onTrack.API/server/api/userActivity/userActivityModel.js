var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserActivitySchema = new Schema({
	userId: {type: Schema.Type.ObjectId, ref: 'user', required: true},
	clientId: {type: Schema.Type.ObjectId, ref: 'client', required: true},
	creator: {type: SChema.Type.ObjectId, ref 'user', required: true},
	value: {type: Number},
	type: {type: String},
	name: {type: String, required: true}
});

module.exports = mongoose.model('useractivity', UserActivitySchema);