var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')
var User = require('../user/userModel')


var ClientSchema = new Schema({
	name: {type: String, required: true},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	startDate: {type: Date},
	endDate: {type: Date},
	promotions: [{type: Schema.Types.ObjectId, ref: 'promotion'}],
	triggers: [{type: Schema.Types.ObjectId, ref: 'trigger'}],
	owner: [{type: Schema.Types.ObjectId, ref: 'user'}],
	admins: [{type: Schema.Types.ObjectId, ref: 'user'}],
	settings: [{type: Schema.Types.ObjectId, ref: 'clientSettings'}]
})

ClientSchema.post('save', function(doc) {
	User.findById(doc.owner[0])
		.then(function(user) {

			if(!user) {
				console.log('err')
			}

			user.clientId.push(doc._id)
			user.save(function(err){
				if(err) {
					console.log(err)
				} else {
					console.log('saved')
				}
			})
		}, function(err) {
			return err
		})
})

ClientSchema.methods = {

	checkAdmin: function(user) {
		return  _.includes(this.admins.toString(), user._id)
 		}
}


module.exports = mongoose.model('client', ClientSchema)