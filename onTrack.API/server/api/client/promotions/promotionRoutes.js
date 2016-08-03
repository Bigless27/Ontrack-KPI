var router = require('express').Router({mergeParams: true});
var logger = require('../../../util/logger');
var controller = require('./promotionController');
var auth = require('../../../auth/auth')


var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
	.get(checkUser, controller.get)
	.post(checkUser, controller.post)

router.route('/:id')
	.get(controller.getOne)
	.put(checkUser, controller.put)
	.delete(checkUser, controller.delete)

module.exports = router;