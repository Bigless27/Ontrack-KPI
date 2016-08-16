var router = require('express').Router({mergeParams: true});
var controller = require('./promotionController');
var client = require('../../../middleware/customMiddleware')

router.param('promotionId', controller.params);

router.route('/')
	.get(controller.get)
	.post(client.getClient(),controller.post)

router.route('/:promotionId')
	.get(controller.getOne)
	.put(client.getClient(),controller.put)
	.delete(client.getClient(),controller.delete)

module.exports = router;