var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../../client/clientModel');
var _ = require('lodash');


var subTypesSchema = new Schema({
	text: {type: String}
})

var SettingsSchema = new Schema({
	type: {type: String},
	subTypes: [subTypesSchema]
});



module.exports = mongoose.model('typeSetting', SettingsSchema);