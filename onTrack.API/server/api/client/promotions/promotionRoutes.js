var router = require('express').Router({mergeParams: true});
var controller = require('./promotionController');
var client = require('../../../middleware/customMiddleware')

router.param('promotionId', controller.params);

router.route('/')
	.get(client.getClientPromo(),  controller.get)
	.post(client.getClient(), client.mockUser(),controller.post)

router.route('/:promotionId')
	.get(controller.getOne)
	.put(client.getClient(),controller.put)
	.delete(client.getClient(),controller.delete)

module.exports = router;