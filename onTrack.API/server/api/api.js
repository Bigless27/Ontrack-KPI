var router = require('express').Router();

router.use('/teams', require('./teams/teamRoutes'));
router.use('/users', require('./users/userRoutes'));
router.use('/progress-settings', require('./settings/progress-settings/settingsRoutes'))
router.use('/goals', require('./settings/goals/goalRoutes'))
router.use('/rewards', require('./settings/rewards/rewardsRoutes'))
router.use('/promotions', require('./promotions/promotionRoutes'))


module.exports = router;
