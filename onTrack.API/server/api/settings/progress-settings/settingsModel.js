var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var User = require('../../users/userModel')
var Progress = require('../../users/progress/progressModel')

var usersSchema = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	email: {type: String},
	userId: {type: String} //may need to change type to objectId in the future
})

var subTypesSchema = new Schema({
	name: {type: String}
})

var SettingsSchema = new Schema({
	name: {type: String, required: true},
	type: {type: String, required: true},
	description: {type: String}
})

// SettingsSchema.pre('save', function(next) {
// 	var progSetting = this
// 	if (this.users.length === 0) {
// 		next()
// 	}
// 	else{
// 		User.find({
// 			'_id': { $in: 
// 					this.users.map(x => x.userId)
// 				}
// 		}, function(err, docs) {
// 			if (err) next(err)			// below works because there is only one city being pushed in at a time
// 			docs.forEach(function(user) {//this only creates a progress if the settingsId isn't already associated witht the user
// 				if(!user.settingProgress.map(x => x.toString()).includes(progSetting._id.toString())) { //check if the user is already associated with the progsetting
// 					user.settingProgress.push(progSetting._id)
// 					user.save(function(err, result) {
// 						if (err) return next(err)
// 						var prog = new Progress({userId: result._id, settingId: progSetting._id})
// 						prog.save(function(err, result){
// 							if (err) next(err)
// 							next()
// 						})
// 					})
// 				}
// 			})
// 			next()
// 		}
// 	)}
// })


// SettingsSchema.pre('remove', function(next){
// 	var progSetting = this
// 	if(this.users.length === 0){
// 		next()
// 	}
// 	else {
// 		User.find({
// 			'_id': { $in: 
// 					progSetting.users.map(x => x.userId)
// 					}
// 				}, function(err, docs) {
// 					if (err) next(err)
// 					if (docs.length < 1) next(new Error("The user associate was deleted but the ref wasn't"))
// 					docs.forEach(function(user){
// 						var setIndex = user.settingProgress.indexOf(progSetting._id)
// 						if (setIndex < 0) next(new Error("Setting isn't associated"))
// 						user.settingProgress.splice(setIndex,1)
// 						var progIndex = user.progress.indexOf(progSetting._id)
// 						user.progress.splice(progIndex, 1)
// 						user.save(function(err, saved){
// 							if(err) next(err)
// 							next()
// 						})
// 					})
// 				})
// 		}
// })


module.exports = mongoose.model('progresssetting', SettingsSchema);