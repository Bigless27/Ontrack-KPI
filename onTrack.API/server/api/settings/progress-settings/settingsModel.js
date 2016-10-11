var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../../client/clientModel');
var _ = require('lodash');
var User = require('../../users/userModel')

var usersSchema = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	userId: {type: String}
})

var SettingsSchema = new Schema({
	name: {type: String},
	users: [usersSchema]	
})

SettingsSchema.post('save', function(doc, next) {
	if(doc.users.length === 0){
		next()
	}
	else{
		User.find({
			'_id': { $in: 
					doc.users.map(x => x.userId)
				}
		}, function(err, docs){
			if (err) next(err)
			docs.forEach(function(user) {
				if(!user.progress.map(x => x.toString()).includes(doc._id.toString())){
					user.progress.push(doc._id)
					user.save(function(err, result) {
						if (err) return next(err)
						next()
					})
				}
				next()
			})
		})
	}
})


module.exports = mongoose.model('progresssetting', SettingsSchema);