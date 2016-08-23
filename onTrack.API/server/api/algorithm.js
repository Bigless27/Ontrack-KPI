var ClientCtrl = require('./client/clientController');
var UserCtrl = require('./user/userController');
var TriggerCtrl = require('./client/trigger/triggerModel');
var math = require('mathjs');
var _ = require('lodash');
var parser = math.parser();
var Progress = require('./userPromoProgress/progressModel')


exports.lookUpPromotions = function(doc) {
	query = UserCtrl.FindUser(doc.userId);
	query.populate('progress')
	query.exec(function(err, user) {
		if(err) {
			return console.log(err);
		} else {
			//evaluate for each client
			user.clientId.forEach(function(id) {
			
				query = ClientCtrl.FindClient(id);
				query.populate('promotions')
				query.populate('kpis')
				query.exec(function(err, client) {
					if(err){
						return console.log(err);
					} else {

						var matchingKpis = getKpis(client.kpis, doc.items[0].type)

						var evaluatedValue = parseKpisValue(matchingKpis, doc)

						var activePromos = getActivePromotions(doc.date, client.promotions)

						updatePromoProgress(evaluatedValue, user, activePromos);
					}
				})
			})
		}
	})
}

function getActivePromotions(current, promotions) {
	
	var activeArray = []

	promotions.forEach(function(promo) {

		if (promo.startDate < current < promo.endDate){
			activeArray.push(promo);
		}
	})

	return activeArray;
}

function getKpis(kpis, activityType) {
	var kpiArray = [];

	kpis.forEach(function(kpi) {
		if(kpi.type === activityType) {
			kpiArray.push(kpi)
		}
	})

	return kpiArray;
}

function parseKpisValue(kpis, activity) {
	var solution = 0
	kpis.forEach(function(kpi) {

		var formulas = activity.items[0].value[0].toObject()
		//set all variables
		_.forIn(formulas, function(value, key) {
			parser.set(key + '', value)


		})

		solution += parser.eval(kpi.value);

	})

	return solution
}

function updatePromoProgress(value, user, activePromos) {

	activePromos.forEach(function(promo) {

		user.progress.forEach(function(prog) {
			
			if(promo._id.toString() === prog['promotionId'].toString()){
				console.log(value)
				prog['value'] += value
				console.log(prog);
				prog.save(function(err){
					if(err){
						console.log(err);
					} 
				})
			} 
		})
	return 
	})

}








