var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactPhone = new Schema({
    clientId: {type: Schema.Types.ObjectId, ref: 'client'},
    phoneNumber: {type: String, required: true, unique: true},
    phoneType: {type: String, required: true},
    isPrimary: {type: Boolean, default: true}
});

var ContactEmail: newSchema({
	clientId: {type: Schema.Types.ObjectId, ref: client},
	emailAddress: {type: String, require: true},
	emailType: {type: String, require: true},
	isPrimary: {type: Boolean, default: true}
})


var ClientSchema = new Schema({
	name: {type: String, required: true, index: true},
	accountStatus: {type: String, required: true},
	billingStatus: {type: String, required: true},
	kPIS: [{type: Schema.Types.ObjectId, ref: 'kpi'}],
	contactPhone: [ContactPhone],
	contactEmail: [ContactEmail],
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	startDate: {type: Date},
	endDate: {type: Date}
})

module.exports = mongoose.model('client', ClientSchema)