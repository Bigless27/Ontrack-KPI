var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromotionSchema = new Schema({
	name: {type: String, required: true, index: true},
	type: {type: String, required: true},
	description: {type: String}

})