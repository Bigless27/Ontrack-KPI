var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

// you can pass any string into the goal schema
var GoalSchema = new Schema({
	any: {}
})

GoalSchema.pre('save', function(next) {
	console.log(this)
})

module.exports = mongoose.model('goal', GoalSchema)