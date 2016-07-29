var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserOwner = require('../user/userModel')


var ClientSchema = new Schema({
	name: {type: String, required: true, index: true},
	// KPIS: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	// promotions: {type: Schema.Types.ObjectId, ref 'promotion'} need to define this
	startDate: {type: Date},
	endDate: {type: Date},
	owner: [UserOwner],
	admins: [{type: Schema.Types.ObjectId, ref: 'user'}]
})

module.exports = mongoose.model('client', ClientSchema)