var router = require('express').Router({mergeParams: true});
var controller = require('./promotionController');
var team = require('../../../middleware/customMiddleware')
var auth = require('../../../auth/auth')
var checkUser = [auth.decodeToken(), auth.getFreshUser()];


router.param('promoId', controller.params);

router.route('/')
	.get(team.getTeamPromo(),  controller.get)
	.post(team.getTeam(), checkUser ,controller.post)

router.route('/:promoId')
	.get(controller.getOne)
	.put(team.getTeam(),controller.put)
	.delete(team.getTeam(),controller.delete)

module.exports = router;