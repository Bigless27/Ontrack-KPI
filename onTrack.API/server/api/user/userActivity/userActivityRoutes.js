var router = require('express').Router();
var controller = require('./userActivityController');
var auth = require('../../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];


router.param('id', controller.params);

router.router('/')
	.get(controller.get)
	.post(checkUser, controller.post)

router.route('/:id')
	.get(controller.getOne);
	.put(checkUser, controller.put)
	.delete(checkUser, controller.delete)