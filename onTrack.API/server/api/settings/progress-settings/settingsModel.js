var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../../client/clientModel');
var _ = require('lodash');


var SettingsSchema = new Schema({
	name: {type: String},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}]	
});


module.exports = mongoose.model('progress-setting', SettingsSchema);