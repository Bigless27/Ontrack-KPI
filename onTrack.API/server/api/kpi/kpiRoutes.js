var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./kpiController');
var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
	.get(controller.get);

router.route('/:id')
	.get(controller.getOne);


module.exports = router;
