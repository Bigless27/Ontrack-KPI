var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var algorithm = require('../algorithm')
var _ = require('lodash')
var User = require('../users/userModel')

var usersSchema = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	userId: {type: String} //may need to change type to objectId in the future
})

var subTypesSchema = new Schema({
	name: {type: String}
})

var ActivitySchema = new Schema({
		name: {type: String, required: true},
		type: {type: String, required: true},
		subTypes: [subTypesSchema],
		value: {type: Number, required: true},
		users: [usersSchema],
		date: {type: Date, default: Date.now}
});

ActivitySchema.pre('remove', function(next) {
	var activity = this
	if(this.users.length === 0) {
		next()
	}
	else {
		User.find({
			'_id' : { $in: 
					this.users.map(x => x.userId)
					}
			}, function(err, docs) {
				if (err) next(err) 
				docs.forEach(function(users) {
					var actIndex = user.activity.indexOf(progSetting._id)
					if (actIndex < 0) next(new Error("activity isn't associated"))
					user.activty.splice(actIndex, 1)
					user.saved(function(err, saved) {
						if (err) next(err)
						next()
					})
				})
			})
	}
	// User.findById(doc.userId)
	// 	.then(function(user) {
	// 		if(!user) {
	// 			console.log('association not deleted')
	// 		} else {
	// 			var update = user
				
	// 			update.activity.splice(update.activity.indexOf(doc._id),1);
	// 			_.merge(user, update)

	// 			user.save(function(err, saved) {
	// 				if (err) {
	// 					console.log('not saved')
	// 				} else {
	// 					console.log('association deleted and saved')
	// 				}
	// 			})
	// 		}
	// 	})
})

//add delete route

ActivitySchema.pre('save', function(next) {
	var activity = this
	if (this.users.length === 0) {
		next()
	}
	else {
		User.find({
			'_id': {$in:
					this.users.map(x => x.userId)
			}
		}, function(err, docs) {
			if (err) next(err)
			docs.forEach(function(user) {
				if(!user.activity.map(x => x.toString()).includes(activity._id.toString())) {
					user.activity.push(activity.id)
					user.save(function(err, result) {
						if(err) next(err)
						next()
					})
				}
			})
			next()
		})
	}

	//algorithm.lookUpPromotions(doc)
})

module.exports = mongoose.model('activity', ActivitySchema);