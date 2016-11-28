var mogoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	any:{}
})

var OccuranceSchema = new Schema({
	teamId: {type: String, required: true},
	userId: {type: String, required: true},
	activityData: {type: Schema.Types.Mixed},
	occuranceDate: {type: Date, required: true},
	insertDate: {type: Date, default: Date.now, required: true}

})

module.exports = mongoose.model('occurance', OccuranceSchema)

