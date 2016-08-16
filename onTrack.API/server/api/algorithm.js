var Client = require('./client/clientModel');
var UserCtrl = require('./user/userController');
var User = require('./user/userModel');

exports.lookUpPromotions = function(id) {
	return UserCtrl.FindUser(id);
}

exports.testLog = function() {
	return 'boom';
}