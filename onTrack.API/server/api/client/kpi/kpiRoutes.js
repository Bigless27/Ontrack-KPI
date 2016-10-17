var router = require('express').Router({mergeParams: true});
var controller = require('./kpiController');
var client = require('../../../middleware/customMiddleware')


router.param('kpiId', controller.params);

router.route('/')
	.get(controller.get)
	.post(client.getClient(), controller.post)

router.route('/:kpiId')
	.get(controller.getOne)
	.put(client.getClient(), controller.put)
	.delete(controller.delete);


module.exports = router;