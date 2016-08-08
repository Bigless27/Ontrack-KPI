var router = require('express').Router({mergeParams: true});
var controller = require('./triggerController');
var client = require('../../../middleware/customMiddleware')

router.param('id', controller.params);

router.route('/')
	.get(controller.get) //Tested
	.post(checkUser, client.getClient(),controller.post) //Tested

router.route('/:triggerId')
	.get(controller.getOne) // Tested
	.put(checkUser, client.getClient(), controller.put) //Tested
	.delete(checkUser, client.getClient(),controller.delete) 
 
module.exports = router

