var router = require('express').Router({mergeParams: true});
var controller = require('./settingsController');
var client = require('../../middleware/customMiddleware')



router.param('settingsId', controller.params);

router.route('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:settingsId')
	.get(controller.getOne)
	.put(client.getClient(), controller.put)
	.delete(client.getClient(), controller.delete)

module.exports = router;