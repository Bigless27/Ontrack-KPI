var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingsSchema = new Schema({
	clientId: {type: Schema.Types.ObjectId},
	value: {type: Schema.Types.ObjectId},
	description: {type: String, required: true}
});

module.exports = mongoose.model('settings', SettingsSchema);