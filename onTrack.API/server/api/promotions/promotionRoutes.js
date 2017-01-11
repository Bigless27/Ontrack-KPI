var router = require('express').Router({mergeParams: true});
var controller = require('./promotionController');
var team = require('../../middleware/customMiddleware')
var auth = require('../../auth/auth')
var checkUser = [auth.decodeToken(), auth.getFreshUser()];


router.param('promoId', controller.params);

router.route('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:promoId/updateRefs')
	.put(controller.updateRefs)

router.route('/:promoId')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)

module.exports = router;