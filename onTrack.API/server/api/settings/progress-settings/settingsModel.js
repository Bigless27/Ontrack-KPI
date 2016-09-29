var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../../client/clientModel');
var _ = require('lodash');


var subTypesSchema = new Schema({
	text: {type: String}
})

var SettingsSchema = new Schema({
	type: {type: String},
	subType: {type: String},
	value: {type: String}
	
});


module.exports = mongoose.model('progress-setting', SettingsSchema);