var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserOwner = require('../user/userModel')
var _ = require('lodash')


var ClientSchema = new Schema({
	name: {type: String, required: true},
	// KPIS: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	// promotions: {type: Schema.Types.ObjectId, ref 'promotion'} need to define this
	startDate: {type: Date},
	endDate: {type: Date},
	owner: [{type: Schema.Types.ObjectId, ref: 'user'}],
	admins: [{type: Schema.Types.ObjectId, ref: 'user'}]
})

ClientSchema.methods = {

	checkOwner: function(user) {
		return  _.includes(this.owner, user._id)
 		}
}


module.exports = mongoose.model('client', ClientSchema)