var mongoose = require('mongoose');

var TriggerSchema = new mongoose.Schema({
    clientId: { type: ObjectId },
    name: { type: String },
    kpis: [{ kpiId: { type: ObjectId } }]
});

module.exports = mongoose.model('TriggerInfo', TriggerSchema);