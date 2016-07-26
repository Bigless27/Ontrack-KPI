var mongoose = require('mongoose');

var KpiSchema = new mongoose.Schema({
    ClientId: { type: ObjectId },
    Name: { type: String, unique: true, required: true, index: true },
    Type: { type: String },
    Value: { type: String }
});

module.exports = mongoose.model('KpiInfo', KpiSchema);