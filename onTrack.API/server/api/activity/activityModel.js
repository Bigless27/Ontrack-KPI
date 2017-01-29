var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var ActivitySchema = new Schema({
	asfName: {type: String, required: true},
	users: {type: Schema.Types.ObjectId, ref: 'user'},
	any: {}
})

module.exports = mongoose.model('acitivty', ActivitySchema)