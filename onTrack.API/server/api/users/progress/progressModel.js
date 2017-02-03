var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
var _ = require('lodash')
var User = require('../userModel')

var UserProgressSchema = new Schema({
	value: {type: Number, default: 0},
	userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
	progressId: {type: Schema.Types.ObjectId, ref: 'progress', required: true}
});



UserProgressSchema.pre('save', function(next) {
	var prog = this;
	
	User.findById(prog.userId)
		.then(function(user) {
			if(!user) {
				next(new Error('err no user found'))
			}
			else if(user.userProgress.indexOf(prog._id) !== -1){
				next(new Error('ID already associated with user'))
			}
			else{
				user.userProgress.push(prog._id)
				user.save(function(err, saved) {
					if(err) {
						next(err);
					}
					else {
						console.log('progress set up')
						next()
				}
			})
		}
	}, function(err) {
		next(err);
	})
	next()
})

UserProgressSchema.pre('remove', function(next) {
	var prog = this
	User.findById(prog.userId)
		.exec(function(err, user) {
			if(err) next(err)
			var i = user.progress.indexOf(prog._id)
			var ii = user.userProgress.indexOf(prog._id)

			user.progress.splice(i,1)
			user.userProgress.splice(ii,1)

			user.save(function(err) {
				next(err)
			})
			next()
		})
	next()
})

module.exports = mongoose.model('userprogress', UserProgressSchema)