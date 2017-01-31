var router = require('express').Router();

router.use('/teams', require('./teams/teamRoutes'));
router.use('/users', require('./users/userRoutes'));
router.use('/progress-settings', require('./settings/progress-settings/settingsRoutes'))
router.use('/user-progress', require('./users/progress/progressRoutes')),
router.use('/goals', require('./settings/goals/goalRoutes'))
router.use('/rewards', require('./settings/rewards/rewardsRoutes'))
router.use('/promotions', require('./promotions/promotionRoutes'))
router.use('/activity', require('./activity/activityRoutes'))


module.exports = router;
