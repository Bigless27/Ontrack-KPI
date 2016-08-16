var ClientCtrl = require('./client/clientController');
var UserCtrl = require('./user/userController');

exports.lookUpPromotions = function(id) {
	query = UserCtrl.FindUser(id);
	query.exec(function(err, user) {
		if(err) {
			return console.log(err);
		} else {
			console.log(user)
			
			user.clientId.forEach(function(id) {
				query = ClientCtrl.FindClient(id);
				// query.populate('promotions')
				query.exec(function(err, client) {
					if(err){
						return console.log(err);
					} else {
						console.log(client);
					}
				})
			})
		}
	})
}

exports.testLog = function() {
	return 'boom';
}