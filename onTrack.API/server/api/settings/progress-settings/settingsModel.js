var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../../client/clientModel');
var _ = require('lodash');
var User = require('../../users/userModel')



var SettingsSchema = new Schema({
	name: {type: String},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}]
});


// SettingsSchema.post('save', function(doc, next) {
// 	User.find({
// 		'_id': { $in: 
// 				doc.users
// 			}
// 	}, function(err, docs){
// 		if (err) next(err)
// 		docs.forEach(function(user) {
// 			if(!user.progress.includes(doc._id)){
// 				user.progress.push(doc._id)
// 				user.save(function(err, result) {
// 					if (err) return next(err)
// 					return console.log('progress associated with user')
// 				})
// 			}
// 		})
// 	})
// })


module.exports = mongoose.model('progresssetting', SettingsSchema);