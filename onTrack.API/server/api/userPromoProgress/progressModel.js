var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')
var User = require('../user/userModel')

var UserPromoProgressSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
	promotionId: {type: Schema.Types.ObjectId, ref: 'promotion', required: true},
	value: {type: Number, default: 0}
});

UserPromoProgressSchema.post('save', function(doc) {
	User.findById(doc.userId)
		.then(function(user) {
			if(!user) {
				console.log('err')
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
	})
})

module.exports = mongoose.model('userpromoprogress', UserPromoProgressSchema)