var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../userModel');

var SettingsSchema = new Schema({
	userId: {type: Schema.Types.ObjectId},
	active: {type: Boolean},
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true}
});




module.exports = mongoose.model('userSettings', SettingsSchema);