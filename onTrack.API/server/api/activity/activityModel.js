var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var ActivitySchema = new Schema({
	asfName: {type: String, required: true},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	team: {type: Schema.Types.ObjectId, ref: 'team'},
	date: {type: Date, default: Date.now},
	any: {}
})

module.exports = mongoose.model('activity', ActivitySchema)