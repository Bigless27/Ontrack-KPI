var router = require('express').Router({mergeParams: true});
var controller = require('./promotionController');
var client = require('../../../middleware/customMiddleware')
var auth = require('../../../auth/auth')
var checkUser = [auth.decodeToken(), auth.getFreshUser()];


router.param('promotionId', controller.params);

router.route('/')
	.get(client.getClientPromo(),  controller.get)
	.post(client.getClient(), checkUser ,controller.post)

router.route('/:promotionId')
	.get(controller.getOne)
	.put(client.getClient(),controller.put)
	.delete(client.getClient(),controller.delete)

module.exports = router;