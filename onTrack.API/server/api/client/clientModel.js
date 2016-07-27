var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	Name: {type: String, required: true, index: true},
	AccountStatus: {type: String, required: true},
	BillingStatus: {type: String, required: true},
	KPIS: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	Users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	StartDate: {type: Date},
	EndDate: {type: Date}
})

module.exports = mongoose.model('client', ClientSchema)