var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TriggerSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    kpis: [{ kpiId: { type: Schema.Types.ObjectId } }],
    description: {type: String}
});

module.exports = mongoose.model('trigger', TriggerSchema);