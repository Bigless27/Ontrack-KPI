var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TriggerSchema = new Schema({
    name: { type: String, required: true },
    type: {type: String, required: true},
    kpis: [{ type: Schema.Types.ObjectId }],
    description: {type: String}
});

TriggerSchema.pre('remove', function(next) {
	console.log('deleting associations')
	this.model('client').remove({triggers: this.id}, next)
})

module.exports = mongoose.model('trigger', TriggerSchema);