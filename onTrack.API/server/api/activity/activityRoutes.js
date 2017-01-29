var router = require('express').Router({mergeParams: true});
var controller = require('./activityController');
var team = require('../../middleware/customMiddleware')
var auth = require('../../auth/auth')
var checkUser = [auth.decodeToken(), auth.getFreshUser()];


router.param('id', controller.params);

router.route('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:id')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)

module.exports = router;