var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./triggerController');
var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
	.get(controller.get) //Tested
	.post(checkUser, controller.post) //Tested

router.route('/:id')
	.get(controller.getOne) // Tested
	.put(checkUser, controller.put); //Tested 

module.exports = router
