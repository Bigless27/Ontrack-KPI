var router = require('express').Router();
var controller = require('./clientController');
var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];
// setup boilerplate route just to satisfy a request
// for building

//nested routes
router.use('/:id/settings', require('./settings/settingsRoutes'));
router.use('/:id/promotions', require('./promotions/promotionRoutes'));
router.use('/:id/triggers', require('./trigger/triggerRoutes'));
//

router.param('id', controller.params);

router.route('/')
  .get(controller.get) // Tested
  .post(checkUser, controller.post) // Tested

router.route('/:id')
  .get(controller.getOne)// Tested
  .put(checkUser, controller.put)// Tested
  .delete(checkUser,controller.delete)// Tested

module.exports = router;
