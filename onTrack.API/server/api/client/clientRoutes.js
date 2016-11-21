var router = require('express').Router();
var controller = require('./clientController');
var auth = require('../../auth/auth')
var checkUser = [auth.decodeToken(), auth.getFreshUser()];


//nested
// router.use('/:id/settings', require('./settings/settingsRoutes'));
router.use('/:id/promotions', require('./promotions/promotionRoutes'));
router.use('/:id/kpis', require('./kpi/kpiRoutes'))
//

router.param('id', controller.params);

router.route('/')
  .get(controller.get) // Tested
  .post(checkUser, controller.post) // Tested

router.route('/findClients/:email')
	.get(controller.findClients)

router.route('/:id/removeAdmin')
	.put(checkUser, controller.removeAdmin)

router.route('/:id/removeUser')
	.put(checkUser, controller.removeUsersClient)

router.route('/:id')
  .get(controller.getOne)// Tested
  .put(checkUser,controller.put)// Tested
  .delete(controller.delete)// Tested

module.exports = router;
