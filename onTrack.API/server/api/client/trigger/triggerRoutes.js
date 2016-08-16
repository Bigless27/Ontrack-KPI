var router = require('express').Router({mergeParams: true});
var controller = require('./triggerController');
var client = require('../../../middleware/customMiddleware')


router.param('triggerID', controller.params);


router.route('/')
	.get(controller.get) 
	.post(client.getClient(),controller.post) 

router.route('/:triggerId')
	.get(controller.getOne) 
	.put(client.getClient(),controller.put) 
	.delete(client.getClient(), controller.delete) 
 
module.exports = router

