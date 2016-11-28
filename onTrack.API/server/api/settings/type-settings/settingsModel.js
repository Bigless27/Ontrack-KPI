var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');


var subTypesSchema = new Schema({
	text: {type: String}
})

var SettingsSchema = new Schema({
	type: {type: String},
	subTypes: [subTypesSchema]
});



module.exports = mongoose.model('typesetting', SettingsSchema);