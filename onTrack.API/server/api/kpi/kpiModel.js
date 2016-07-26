var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KpiSchema = new Schema({
    ClientId: { type: Schema.Types.ObjectId, ref: 'user'}, // what is this?
    Name: { type: String, unique: true, required: true, index: true },
    Type: { type: String },
    Value: { type: String }
});

module.exports = mongoose.model('kpi', KpiSchema);