var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../../client/clientModel');
var _ = require('lodash');
var User = require('../../users/userModel')
var Progress = require('../../users/progress/progressModel')

var usersSchema = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	userId: {type: String}
})

var SettingsSchema = new Schema({
	name: {type: String, required: true},
	types: {type: String, required: true},
	subTypes: {type: String},
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
				if(!user.settingProgress.map(x => x.toString()).includes(doc._id.toString())){

					user.settingProgress.push(doc._id)
					user.save(function(err, result) {
						if (err) return next(err)

						var prog = new Progress({userId: result._id, name: doc.name, type: doc.type, subTypes: doc.subTypes})
						prog.save(function(err, result){
							if (err) return next(err)
							next()
						})
						})
					}
					next()
				})
				next()
			})
		}
})


module.exports = mongoose.model('progresssetting', SettingsSchema);