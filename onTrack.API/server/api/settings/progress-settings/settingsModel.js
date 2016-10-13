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
	type: {type: String, required: true},
	subTypes: [{type: String}],
	users: [usersSchema]	
})

SettingsSchema.pre('save', function(next) {
	var progSetting = this
	if(this.users.length === 0){
		next()
	}
	else{
		User.find({
			'_id': { $in: 
					this.users.map(x => x.userId)
				}
		}, function(err, docs){
			if (err) next(err)
			docs.forEach(function(user) {//this only creates a progress if the settingsId isn't already associated witht the user
				if(!user.settingProgress.map(x => x.toString()).includes(progSetting._id.toString())) { //check if the user is already associated with the progsetting
					user.settingProgress.push(progSetting._id)
					user.save(function(err, result) {
						if (err) return next(err)
						var prog = new Progress({userId: result._id, name: progSetting.name, type: progSetting.type, subTypes: progSetting.subTypes, settingId: progSetting._id})
						prog.save(function(err, result){
							if (err) next(err)
							next()
						})
						})
				}
			next()
			}
		)}
	)}
})


SettingsSchema.pre('remove', function(next){
	var progSetting = this
	if(this.users.length === 0){
		next()
	}
	else{
		User.find({
			'_id': { $in: 
					this.users.map(x => x.userId)
					}
				}, function(err, docs) {
					if (err) next(err)
					docs.forEach(function(user){
						var setIndex = user.settingProgress.indexOf(progSetting._id)
						user.settingProgress.splice(setIndex,1)
						var progIndex = user.progress.indexOf(progSetting._id)
						user.progress.splice(progIndex, 1)
						next()
						user.save(function(err, saved){
							if(err) next(err)
							next()
						})
					})
				})
		}
})


module.exports = mongoose.model('progresssetting', SettingsSchema);