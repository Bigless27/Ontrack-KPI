var router = require('express').Router({mergeParams: true});
var controller = require('./triggerController');
var client = require('../../../middleware/customMiddleware')

router.param('id', controller.params);

router.route('/')
	.get(controller.get) //Tested
	.post(client.getClient(),controller.post) //Tested

router.route('/:triggerId')
	.get(controller.getOne) // Tested
	.put(client.getClient(), controller.put) //Tested
	.delete(client.getClient(),controller.delete) 
 
module.exports = router

