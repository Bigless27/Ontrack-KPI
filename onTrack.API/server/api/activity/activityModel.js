var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var User = require('../users/userModel')
var Team = require('../teams/teamModel')
var Promotion = require('../promotions/promotionModel')
var Goal = require('../settings/goals/goalModel')
var UserProgress = require('../users/progress/progressModel')

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
			.populate('userProgress')
			.exec(function(err, user) {
				if (err) next(err)
				//push acitivty ref in
				user.activity.push(activity._id)
				user.save(function(err, saved) {
					if (err) next(err)
					console.log(saved)

				})

				Promotion.find({'teamId': {$in : [activity.team]}})
					.exec(function(err, promo) {
						if(err) next(err)
						promo.forEach(pro => {
							pro.goals.forEach(goal => {
								Goal.findById(goal)
									.populate('progress')
									.exec(function(err, goal){
										if(err) next(err)
										
										if(!goal.any.kpi) {
											next(new Error('Goal does not have Kpi value'))
										}
										var item = activity.any
										if (!eval(goal.any.kpi)){
											next(new Error('No matches with goal and activity'))
										}

										// Know we know that goal is a match
										user.userProgress.forEach(userProg => {
											if (userProg.progressId.toString() === goal.progress._id.toString()) {
												//check if goal has a value
												if (!activity.any.value) {
													next(new Error('no Value to update specified in activity'))
												}
												UserProgress.findById(userProg._id)
													.exec(function(err, userProg) {
														userProg.value += parseInt(activity.any.value)

														userProg.save(function(err) {
															if(err) next(err)
														})
													})
												next()
											}
										})

									})
							})
						})
					})

			})
	})
	next()
})

ActivitySchema.pre('remove', function(next) {
	var activity = this
	User.find({'activity': {$in : [activity._id]}})
		.exec(function(err, users) {
			if(err) next(err)
			users.forEach(user => {
				var i = user.activity.indexOf(activity._id)
				user.activity.splice(i, 1)
				user.save(function(err) {
					if(err) next(err)
				})
			})
		})
	next()
})


module.exports = mongoose.model('activity', ActivitySchema)