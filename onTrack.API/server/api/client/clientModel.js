var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')


var ClientSchema = new Schema({
	name: {type: String, required: true},
	users: [{type: Schema.Types.ObjectId, ref: 'user'}],
	startDate: {type: Date},
	endDate: {type: Date},
	owner: [{type: Schema.Types.ObjectId, ref: 'user'}],
	admins: [{type: Schema.Types.ObjectId, ref: 'user'}],
	settings: [{type: Schema.Types.ObjectId, ref: 'clientSettings'}]
})
cl
ClientSchema.methods = {

	checkAdmin: function(user) {
		return  _.includes(this.admins.toString(), user._id)
 		}
}


module.exports = mongoose.model('client', ClientSchema)