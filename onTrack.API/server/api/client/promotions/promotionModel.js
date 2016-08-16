var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../clientModel')

var PromotionSchema = new Schema({
	name: {type: String, required: true, index: true},
	type: {type: String, required: true},
	completionValue: {type: Number, required: true},
	clientId: {type: Schema.Types.ObjectId, ref: 'client'},
	owner: {type: Schema.Types.ObjectId, ref: 'user'},
	description: {type: String},
	triggers: [{type: Schema.Types.ObjectId, ref: 'trigger'}],
	startDate: {type: Date, default: Date.now, required: true},
	endDate: {type: Date, default: Date.now, required: true}
})


PromotionSchema.pre('remove', function(next) {
	console.log('deleting associations')
	this.model('client').remove({promotions: this.id}, next)
})

PromotionSchema.post('save', function(doc) {
	Client.findById(doc.clientId)
		.then(function(client) {

			if(!client) {
				console.log('err')
			}

			user.clientId.push(doc._id)
			client.promotions.push(doc._id)
			user.save(function(err){
				if(err) {
					console.log(err)
				} else {
					console.log('saved')
				}
			})
		}, function(err) {
			return err
	})
})



module.exports = mongoose.model('promotion', PromotionSchema)