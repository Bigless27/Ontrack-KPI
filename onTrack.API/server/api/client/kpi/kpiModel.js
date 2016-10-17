var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../clientModel')
var _ = require('lodash')

var subTypesSchema = new Schema({
	name: {type: String}
})

var KpiSchema = new Schema({
    name: { type: String, unique: true, required: true, index: true },
    type: { type: String, required: true },
    subTypes: [subTypesSchema],
    value: { type: String, required: true },
    clientId: {type: Schema.Types.ObjectId, ref: 'client'}
});



KpiSchema.post('remove', function(doc) {
	Client.findById(doc.clientId)
		.then(function(client) {
			if(!client) {
				console.log('association not deleted')
			} else {
				update = client
				

				update.kpis.splice(update.kpis.indexOf(doc._id),1);

				_.merge(client, update)


				client.save(function(err, saved) {
					if (err) {
						console.log('not saved')
					} else {
						console.log('association deleted and saved')
					}
				})
			}
		}, function(err) {
			console.log(err)
		})
})






module.exports = mongoose.model('kpi', KpiSchema);