var mongoose = requrie('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

// you can pass any string into the goal schema
var GoalSchema = new Schema({
	any: {}
})

GoalScheam.pre('save', function(next) {
	var goal = this
	console.log(this)
})

module.exports = mongoose.model('goal', GoalSchema)