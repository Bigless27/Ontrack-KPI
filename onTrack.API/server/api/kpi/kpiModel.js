var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KpiSchema = new Schema({
    name: { type: String, unique: true, required: true, index: true },
    type: { type: String },
    value: { type: String }
});

KPISchema.pre('remove', function(next) {
	console.log('deleting associations')
	this.model('trigger').remove({kpis: this.id}, next)
})



module.exports = mongoose.model('kpi', KpiSchema);