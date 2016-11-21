var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')
var User = require('../users/userModel')

var adminSchema = new Schema({
	email: {type: String},
	firstName: {type: String},
	lastName: {type: String},
	userId: {type: String}
})

var usersSchema = new Schema({
	email: {type: String},
	firstName: {type: String},
	lastName: {type: String},
	userId: {type: String}
})

var ownerSchema = new Schema({
	email: {type: String},
	firstName: {type: String},
	lastName: {type: String},
	userId: {type: String}
})


var ClientSchema = new Schema({
	name: {type: String, required: true, unique: true},
	users: [usersSchema],
	startDate: {type: Date},
	endDate: {type: Date},
	promotions: [{type: Schema.Types.ObjectId, ref: 'promotion'}],
	kpis: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	owner: [ownerSchema],
	admins: [adminSchema],
	settings: [{type: Schema.Types.ObjectId, ref: 'clientSettings'}]
})

ClientSchema.pre('save', function(next) {
	var client = this
	var userEmails = this.users.map(x => x.email)
	User.find({
		'email' : {$in: userEmails}
	}, function(err, docs) {
		if (err) next(err) 
		docs.forEach(function(user) {
			if (!user.clientId.map(x => x.toString()).includes(client._id.toString())) { // if the ID isn't already there then push it in
				user.clientId.push(client._id)
				user.save(function(err, result) {
					if(err) next(err)
					next()
				})
			}
			// since this remove is after the add the client id wont err out when it's first being added
			// console.log(userEmails)
			// console.log(user.email)
			// console.log(!userEmails.includes(user.email))


		})
	})
	next()
})

ClientSchema.pre('remove', function(next){
	//this require here is a patch!!!!! look to refactor better in future from circular dependency
	var Kpis = require('./kpi/kpiModel'),
		Promotions = require('./promotions/promotionModel'),
		kpiIds = this.kpis.map(k => k._id),
		promotionIds = this.promotions.map(p => p._id),
		clientId = this.clientId,
		userEmails = this.users.map(x => x.email)

	User.find({
		'email':  {$in: userEmails} 
	}, function(err,docs) {
		docs.forEach(function(user) {
			var i = user.clientId.indexOf(clientId)
			user.clientId.splice(i, 1)
			user.save(function(err) {
				if (err) next(err)
			})
		})
	})

	Kpis.remove({ _id: {$in: kpiIds}}, function(err) {
		if(err) next(err)
	})

	Promotions.remove({ _id: {$in: promotionIds}}, function(err) {
		if(err) next(err)
	})
	next()
})

ClientSchema.methods = {
	checkAdmin: function(user) {
		return  _.includes(this.admins.toString(), user._id)
 	},

 	reduceEmailArray: function(field, param) {
        return this[field].map(x => x[param])
    }
}


module.exports = mongoose.model('client', ClientSchema)