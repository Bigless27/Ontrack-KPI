var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var User = require('../users/userModel')
var Promotion = require('../promotions/promotionModel')

var ActivitySchema = new Schema({
	asfName: {type: String, required: true},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	team: {type: Schema.Types.ObjectId, ref: 'team'},
	date: {type: Date, default: Date.now},
	any: {}
})

ActivitySchema.pre('save', function(next) {
	
	this.users.forEach(userId => {
		User.findById(userId)
			.exec(function(err, user) {
				if (err) next(err)
				console.log(user)
			})
	})


})

module.exports = mongoose.model('activity', ActivitySchema)