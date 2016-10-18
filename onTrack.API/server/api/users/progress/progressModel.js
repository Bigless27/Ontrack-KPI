var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')
var User = require('../userModel')

var UserProgressSchema = new Schema({
	value: {type: Number, default: 0},
	userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
	settingId: {type: Schema.Types.ObjectId, ref: 'progresssetting', required: true}
});

UserProgressSchema.post('save', function(doc) {
	User.findById(doc.userId)
		.then(function(user) {
			if(!user) {
				console.log('err no user found!')
			}
			else if(user.progress.indexOf(doc._id) !== -1){
				console.log('ID already associated with user')
			}
			else{
				user.progress.push(doc._id)
				user.save(function(err, saved) {
					if(err) {
						console.log(err);
					}
					else {
						console.log('progress set up')
				}
			})
		}
	}, function(err) {
		console.log(err);
	})
})

module.exports = mongoose.model('userprogress', UserProgressSchema)