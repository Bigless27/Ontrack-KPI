var router = require('express').Router();
var controller = require('./activityController');
var auth = require('../../auth/auth')

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
	.get(controller.get)//Tested
	.post(checkUser, controller.post)// Tested

router.route('/:id')
	.get(controller.getOne); //Tested


module.exports = router;
