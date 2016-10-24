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

ActivitySchema.post('remove', function(doc) {
	User.findById(doc.userId)
		.then(function(user) {
			if(!user) {
				console.log('association not deleted')
			} else {
				var update = user
				
				update.activity.splice(update.activity.indexOf(doc._id),1);
				_.merge(user, update)

				user.save(function(err, saved) {
					if (err) {
						console.log('not saved')
					} else {
						console.log('association deleted and saved')
					}
				})
			}
		})
})

//add delete route

ActivitySchema.post('save', function(doc) {
	User.findById(doc.userId)
		.then(function(user) {
			if(!user) {
				console.log('err')
			}
			else if(user.activity.indexOf(doc._id) !== -1){
				console.log('ID already associated with user')
			}
			else {
				user.activity.push(doc._id)
				user.save(function(err) {
					if(err) {
						console.log(err)
					} else {
						return
					}
				})

			}
		}, function(err) {
			console.log(err)
	})

	//algorithm.lookUpPromotions(doc)
})

module.exports = mongoose.model('activity', ActivitySchema);