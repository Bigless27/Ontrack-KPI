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

ClientSchema.post('save', function(doc) {
	User.findById(doc.owner[0]._id)
		.then(function(user) {
			if(!user) {
				console.log('err')
			}
			else if(user.clientId.indexOf(doc._id) !== -1) {
				return 
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

ClientSchema.pre('remove', function(next){
	//this require here is a patch!!!!! look to refactor better in future from circular dependency
	var Kpis = require('./kpi/kpiModel'),
		Promotions = require('./promotions/promotionModel'),
		kpiIds = this.kpis.map(k => k._id),
		promotionIds = this.promotions.map(p => p._id)

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