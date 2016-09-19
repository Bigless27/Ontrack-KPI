var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var algorithm = require('../../algorithm')
var _ = require('lodash')
var User = require('../../user/userModel')

var UserActivitySchema = new Schema({
	items: [{
			type: {type: String, required: true},
			value: [{
						srv: {type: Number, required: true},
						retail: {type: Number, required: true},
						quantity: {type: Number, required: true}
					}]
			}],
	userId: {type: Schema.Types.ObjectId, ref: 'user'},
	date: {type: Date, default: Date.now}
});

UserActivitySchema.post('remove', function(doc) {
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

UserActivitySchema.post('save', function(doc) {
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
						console.log('saved')
					}
				})

			}
		}, function(err) {
			console.log(err)
	})
	algorithm.lookUpPromotions(doc)
})

module.exports = mongoose.model('useractivity', UserActivitySchema);