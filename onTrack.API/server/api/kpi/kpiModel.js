var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KpiSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'client'}, // what is this?
    name: { type: String, unique: true, required: true, index: true },
    type: { type: String },
    value: { type: String }
});

module.exports = mongoose.model('kpi', KpiSchema);