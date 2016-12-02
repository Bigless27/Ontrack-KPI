var router = require('express').Router()
var controller = require('./goalController');


router.param('goalId', controller.params);

router.route('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:promoId')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)


module.exports = router