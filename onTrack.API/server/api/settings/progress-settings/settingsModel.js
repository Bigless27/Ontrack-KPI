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
});

SettingsSchema.post('save', function(doc) {
	User.find({
		'_id': { $in: 
				doc.users.map(x => x.userId)
			}
	}, function(err, docs){
		if (err) console.log(err)

		docs.forEach(function(user) {
			if(!user.progress.includes(doc._id)){
				user.progress.push(doc._id)
				user.save(function(err, result) {
					if (err) console.log(err)
					console.log('progress associated with user')
				})
			}
		})
	})

})


module.exports = mongoose.model('progresssetting', SettingsSchema);