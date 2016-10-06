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
	console.log(doc)
	if(doc.users.length === 0){
		next()
	}
	User.find({
		'_id': { $in: 
				doc.users.map(x => x.userId)
			}
	}, function(err, docs){
		if (err) next(err)
		docs.forEach(function(user) {
			if(!user.progress.includes(doc._id)){
				user.progress.push(doc._id)
				user.save(function(err, result) {
					if (err) return next(err)
					next()
				})
			}
			next()
		})
	})
})


module.exports = mongoose.model('progresssetting', SettingsSchema);