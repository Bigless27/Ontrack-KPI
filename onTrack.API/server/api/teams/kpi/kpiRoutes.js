var router = require('express').Router({mergeParams: true});
var controller = require('./kpiController');
var team = require('../../../middleware/customMiddleware')


router.param('kpiId', controller.params);

router.route('/')
	.get(controller.get)
	.post(team.getTeam(), controller.post)

router.route('/:kpiId')
	.get(controller.getOne)
	.put(team.getTeam(), controller.put)
	.delete(controller.delete);


module.exports = router;