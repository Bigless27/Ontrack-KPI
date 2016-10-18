var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')
var User = require('../users/userModel')

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

var ownerSchema = new Schema({
	email: {type: String},
	firstName: {type: String},
	lastName: {type: String}
})


var ClientSchema = new Schema({
	name: {type: String, required: true, unique: true},
	usersClient: [clientUsersSchema],
	startDate: {type: Date},
	endDate: {type: Date},
	promotions: [{type: Schema.Types.ObjectId, ref: 'promotion'}],
	kpis: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	owner: [ownerSchema],
	admins: [adminSchema],
	settings: [{type: Schema.Types.ObjectId, ref: 'clientSettings'}]
})




ClientSchema.post('save', function(doc) {
	User.findById(doc.owner[0]._id)
		.then(function(user) {
			if(!user) {
				console.log('err')
			}
			else if(user.clientId.indexOf(doc._id) !== -1) {
				return console.log('id already associated with user') //don't push id in twice
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

ClientSchema.post('remove', function(doc){
	//this require here is a patch!!!!! look to refactor better in future
	var Kpis = require('./kpi/kpiModel'),
		Promotions = require('./promotions/promotionModel'),
		kpiIds = doc.kpis.map(k => k._id),
		promotionIds = doc.promotions.map(p => p._id)

	Kpis.remove({ _id: {$in: kpiIds}}, function(err) {
		if(err) console.log(err)

	})

	Promotions.remove({ _id: {$in: promotionIds}}, function(err) {
		if(err) console.log(err)
	})
})

ClientSchema.methods = {
	checkAdmin: function(user) {
		return  _.includes(this.admins.toString(), user._id)
 	}
}


module.exports = mongoose.model('client', ClientSchema)