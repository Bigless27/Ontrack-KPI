var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../clientModel');

var SettingsSchema = new Schema({
	clientId: {type: Schema.Types.ObjectId},
	active: {type: Boolean, default: false},
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true}
});




module.exports = mongoose.model('clientSettings', SettingsSchema);