var ClientCtrl = require('./client/clientController');
var UserCtrl = require('./user/userController');


exports.lookUpPromotions = function(doc) {
	query = UserCtrl.FindUser(doc.userId);
	query.exec(function(err, user) {
		if(err) {
			return console.log(err);
		} else {

			user.clientId.forEach(function(id) {
			
				query = ClientCtrl.FindClient(id);
				query.populate('promotions')
				query.exec(function(err, client) {
					if(err){
						return console.log(err);
					} else {
						//you have promotions populated on client
						//check useractivity creation date and see if it falls 
						//between promotions active date
						console.log(activePromotions(doc.date, client.promotions))

					}
				})
			})
		}
	})
}

function activePromotions(current, promotions) {
	
	var activeArray = []

	promotions.forEach(function(promo) {

		if (promo.startDate < current < promo.endDate){
			activeArray.push(promo);
		}
	})

	return activeArray;

}

