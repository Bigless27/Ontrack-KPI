var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TriggerSchema = new Schema({
    name: { type: String, required: true },
    value: {type: String, required: true}
    kpis: [{ kpiId: { type: Schema.Types.ObjectId } }],
    description: {type: String}
});

module.exports = mongoose.model('trigger', TriggerSchema);