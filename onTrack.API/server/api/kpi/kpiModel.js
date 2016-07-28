var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KpiSchema = new Schema({
    name: { type: String, unique: true, required: true, index: true },
    type: { type: String },
    value: { type: String },
    basedOn: {type: String},
    ordinal: {type: Number, required: true}
});

module.exports = mongoose.model('kpi', KpiSchema);