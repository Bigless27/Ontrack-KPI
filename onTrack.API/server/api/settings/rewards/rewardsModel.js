var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var RewardsSchema = new Schema({
	name: {type: String},
	type: {type: String},
	description: {type: String}
})

module.exports = mongoose.model('reward', RewardsSchema)