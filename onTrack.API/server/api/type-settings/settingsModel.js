var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../client/clientModel');
var _ = require('lodash');


var subTypesSchema = new Schema({
	text: {type: String}
})

var progressSchema = new Schema({
	
})

var SettingsSchema = new Schema({
	type: {type: String},
	subTypes: [subTypesSchema],
	progress: [progressSchema]
});

// SettingsSchema.post('remove', function(doc) {
// 	Client.findById(doc.clientId)
// 		.then(function(client) {
// 			if(!client) {
// 				console.log('association not deleted')
// 			} else {
// 				update = client
				
// 				update.settings.splice(update.settings.indexOf(doc._id),1);


// 				_.merge(client, update)

// 				client.save(function(err, saved) {
// 					if (err) {
// 						console.log('not saved')
// 					} else {
// 						console.log('association deleted and saved')
// 					}
// 				})
// 			}
// 		}, function(err) {
// 			console.log(err);
// 		})
// })


module.exports = mongoose.model('settings', SettingsSchema);