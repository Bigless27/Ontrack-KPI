var router = require('express').Router({mergeParams: true});
var controller = require('./triggerController');
var auth = require('../../../auth/auth');
var client = require('../../../middleware/customMiddleware')

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
	.get(controller.get) //Tested
	.post(checkUser, client.getClient(),controller.post) //Tested

router.route('/:triggerId')
	.get(controller.getOne) // Tested
	.put(checkUser, client.getClient(), controller.put) //Tested
	.delete(checkUser, client.getClient(),controller.delete) 
 
module.exports = router
