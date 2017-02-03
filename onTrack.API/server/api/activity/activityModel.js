var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var User = require('../users/userModel')
var Team = require('../teams/teamModel')
var Promotion = require('../promotions/promotionModel')
var Goals = require('../settings/goals/goalModel')

var ActivitySchema = new Schema({
	asfName: {type: String, required: true},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	team: {type: Schema.Types.ObjectId, ref: 'team'},
	date: {type: Date, default: Date.now},
	any: {}
})

ActivitySchema.pre('save', function(next) {
	var activity = this

	activity.users.forEach(userId => {
		User.findById(userId)
			.exec(function(err, user) {
				if (err) next(err)
				

				Promotion.find({'teamId': {$in : [activity.team]}})
					.exec(function(err, promo) {
						console.log(promo)
					})

			})
	})


})

module.exports = mongoose.model('activity', ActivitySchema)