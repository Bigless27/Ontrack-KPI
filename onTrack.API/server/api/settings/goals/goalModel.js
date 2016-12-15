var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

// you can pass any string into the goal schema
var GoalSchema = new Schema({
	gsfName: {type: String, required: true},
	any: {}
})


module.exports = mongoose.model('goal', GoalSchema)