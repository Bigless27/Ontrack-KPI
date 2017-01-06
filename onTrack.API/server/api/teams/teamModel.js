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

var promotionSchema = new Schema({
	name: {type: String},
	promoId: {type: String}
})


var TeamSchema = new Schema({
	name: {type: String, required: true, unique: true},
	users: [usersSchema],
	startDate: {type: Date},
	endDate: {type: Date},
	promotions: [promotionSchema],
	kpis: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	owner: [ownerSchema],
	admins: [adminSchema],
	settings: [{type: Schema.Types.ObjectId, ref: 'teamSettings'}]
})

TeamSchema.pre('save', function(next) {
	var team = this
	var userEmails = this.users.map(x => x.email)
	User.find({
		'email' : {$in: userEmails}
	}, function(err, docs) {
		if (err) next(err) 
		docs.forEach(function(user) {
			if (!user.teamId.map(x => x.toString()).includes(team._id.toString())) { // if the ID isn't already there then push it in
				user.teamId.push(team._id)
				user.save(function(err, result) {
					if(err) next(err)
					next()
				})
			}
			// since this remove is after the add the team id wont err out when it's first being added
			// console.log(userEmails)
			// console.log(user.email)
			// console.log(!userEmails.includes(user.email))


		})
	})
	next()
})

TeamSchema.pre('remove', function(next){
	//this require here is a patch!!!!! look to refactor better in future from circular dependency
	var Promotions = require('../promotions/promotionModel'),
		promotionIds = this.promotions.map(p => p._id),
		teamId = this.teamId,
		userEmails = this.users.map(x => x.email)

	User.find({
		'email':  {$in: userEmails} 
	}, function(err,docs) {
		docs.forEach(function(user) {
			var i = user.teamId.indexOf(teamId)
			user.teamId.splice(i, 1)
			user.save(function(err) {
				if (err) next(err)
			})
		})
	})

	Promotions.remove({ _id: {$in: promotionIds}}, function(err) {
		if(err) next(err)
	})
	next()
})

TeamSchema.methods = {
	checkAdmin: function(user) {
		return  _.includes(this.admins.toString(), user._id)
 	},

 	reduceEmailArray: function(field, param) {
        return this[field].map(x => x[param])
    }
}


module.exports = mongoose.model('team', TeamSchema)