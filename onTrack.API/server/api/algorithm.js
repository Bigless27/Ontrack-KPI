// var ClientCtrl = require('./client/clientController');
// var UserCtrl = require('./users/userController');
// var math = require('mathjs');
// var _ = require('lodash');
// var parser = math.parser();
// var Progress = require('./users/progress/progressModel')


// exports.lookUpPromotions = function(doc) {
// 	query = UserCtrl.FindUser(doc.userId);
// 	query.populate('progress')
// 	query.exec(function(err, user) {
// 		if(err) {
// 			return console.log(err);
// 		} else {
// 			//evaluate for each client
// 			user.clientId.forEach(function(id) {
			
// 				query = ClientCtrl.FindClient(id);
// 				query.populate('promotions')
// 				query.populate('kpis')
// 				query.exec(function(err, client) {
// 					if(err){
// 						return console.log(err);
// 					} else {
						
// 						var matchingKpis = getKpis(client.kpis, doc.items[0].type)

// 						var evaluatedValue = parseKpisValue(matchingKpis, doc)

// 						var activePromos = getActivePromotions(doc.date, client.promotions)

// 						var promos = getMatchingPromotions(activePromos, doc.items[0].type)

// 						updatePromoProgress(evaluatedValue, user.progress, promos);
// 					}
// 				})
// 			})
// 		}
// 	})
// }

// function getKpis(kpis, activityType) {
// 	var kpiArray = [];

// 	kpis.forEach(function(kpi) {
// 		if(kpi.type === activityType) {
// 			kpiArray.push(kpi)
// 		}
// 	})

// 	return kpiArray;
// }

// function getActivePromotions(current, promotions) {
	
// 	var activeArray = []

// 	promotions.forEach(function(promo) {
// 		if (promo.startDate < current < promo.endDate){
// 			activeArray.push(promo);
// 		}
// 	})

// 	return activeArray;
// }

// function getMatchingPromotions(promotions, type) {
// 	var solution = [];

// 	promotions.forEach(function(promos) {
// 		if (promos.type === type){
// 			solution.push(promos)
// 		}
// 	})
// 	return solution
// }

// function parseKpisValue(kpis, activity) {
// 	var solution = 0
// 	kpis.forEach(function(kpi) {
// 		var formulas = activity.items[0].value[0].toObject()
		
// 		//set all variables
// 		_.forIn(formulas, function(value, key) {
// 			parser.set(key + '', value)
// 		})

// 		solution += parser.eval(kpi.value);

// 	})
// 	return solution
// }

// function updatePromoProgress(value, progress, promos) {
// 	promos.forEach(function(promo) {

// 		progress.forEach(function(prog) {
// 			if(promo._id.toString() === prog['promotionId'].toString()){
// 				prog['value'] += value
// 				prog.save(function(err, saved){
// 					if(err){
// 						console.log(err);
// 					} 
// 				})
// 			} 
// 		})
// 	})
// 	return
// }








