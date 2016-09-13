var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')
var User = require('../user/userModel')

var adminSchema = new Schema({
	email: {type: String},
	firstName: {type: String},
	lastName: {type: String}
})

var clientUsersSchema = new Schema({
	email: {type: String},
	firstName: {type: String},
	lastName: {type: String}
})


var ClientSchema = new Schema({
	name: {type: String, required: true},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	usersClient: [clientUsersSchema],
	startDate: {type: Date},
	endDate: {type: Date},
	type: {type: String},
	promotions: [{type: Schema.Types.ObjectId, ref: 'promotion'}],
	kpis: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	owner: [{type: Schema.Types.ObjectId, ref: 'user'}],
	admins: [adminSchema],
	settings: [{type: Schema.Types.ObjectId, ref: 'clientSettings'}]
})



ClientSchema.post('save', function(doc) {
	User.findById(doc.owner[0])
		.then(function(user) {
			if(!user) {
				console.log('err')
			}
			else if(user.clientId.indexOf(doc._id) !== -1) {
				console.log('id already associated with user') //don't push id in twice
			} else{
				user.clientId.push(doc._id)
				user.save(function(err){
					if(err) {
						console.log(err)
					} else {
						console.log('saved')
					}
				})
			}

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