var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subData = require('./clientSubDatasets')


var ClientSchema = new Schema({
	name: {type: String, required: true, index: true},
	accountStatus: {type: String, required: true},
	billingStatus: {type: String, required: true},
	// KPIS: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	clientPhone: [subData.Phone],
	contactEmail: [subData.Email],
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	promotions: {type: Schema.Types.ObjectId, ref 'promotion'}
	startDate: {type: Date},
	endDate: {type: Date},
})

module.exports = mongoose.model('client', ClientSchema)