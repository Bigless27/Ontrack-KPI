var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../clientModel');
var lodash = require('lodash');

var SettingsSchema = new Schema({
	clientId: {type: Schema.Types.ObjectId},
	active: {type: Boolean, default: false},
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true}
});

SettingsSchema.post('remove', function(next) {
	Client.findById(doc.clientId)
		.then(function(client) {
			if(!client) {
				console.log('association not deleted')
			} else {
				update = client
				
				update.settings.splice(update.settings.indexOf(doc._id),1);
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


module.exports = mongoose.model('clientSettings', SettingsSchema);