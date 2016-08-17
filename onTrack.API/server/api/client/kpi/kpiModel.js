var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../clientModel')

var KpiSchema = new Schema({
    name: { type: String, unique: true, required: true, index: true },
    type: { type: String },
    value: { type: String },
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
		})
})



module.exports = mongoose.model('kpi', KpiSchema);