var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promotion = require('../promotions/promotionModel')



var TriggerSchema = new Schema({
    name: { type: String, required: true },
    type: {type: String, required: true},
    kpis: [{ type: Schema.Types.ObjectId }],
    description: {type: String}
});

// TriggerSchema.post('save', funciton(doc) {
// 	Promotion.findById()
// })

TriggerSchema.post('remove', function(doc) {
	Client.findById(doc.clientId)
		.then(function(client) {
			if(!client) {
				console.log('association not deleted')
			} else {
				update = client
				
				update.triggers.splice(update.triggers.indexOf(doc._id),1);
				_.merge(client, update)

				client.save(function(err, saved) {
					if (err) {
						console.log('not saved')
					} else {
						console.log('association deleted and saved')
					}
				})
			}
		})
})

module.exports = mongoose.model('trigger', TriggerSchema);