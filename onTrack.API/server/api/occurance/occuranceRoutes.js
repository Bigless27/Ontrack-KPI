var router = requrie("express").Router();
var controller = require('./occuranceController');

router.param('id', controller.params)

router.router('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:id')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)

module.exports = router