var router = require('express').Router();
var controller = require('./clientController');
var mock = require('../../middleware/customMiddleware');


//nested
router.use('/:id/settings', require('./settings/settingsRoutes'));
router.use('/:id/promotions', require('./promotions/promotionRoutes'));
router.use('/:id/triggers', require('./trigger/triggerRoutes'));
router.use('/:id/kpis', require('./kpi/kpiRoutes'))
//

router.param('id', controller.params);

router.route('/')
  .get(controller.get) // Tested
  .post(mock.mockUser(), controller.post) // Tested

router.route('/:id')
  .get(controller.getOne)// Tested
  .put(controller.put)// Tested
  .delete(controller.delete)// Tested

module.exports = router;
