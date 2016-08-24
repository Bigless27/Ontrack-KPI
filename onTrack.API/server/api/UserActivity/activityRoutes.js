var router = require('express').Router();
var controller = require('./activityController');
var algorithm = require('../algorithm')
var auth = require('../../auth/auth')
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
	.get(controller.get)
	.post(checkUser, controller.post)

router.route('/:id')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)


module.exports = router;