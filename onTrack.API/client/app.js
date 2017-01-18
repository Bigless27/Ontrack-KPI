(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'multipleSelect', 'multipleSelectCustomized', 'xeditable', 'ngTagsInput', 'ui.select', 
		'ngSanitize'])
	.config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider',
			function($stateProvider, $urlRouterProvider, showErrorsConfigProvider) {

				showErrorsConfigProvider.showSuccess(true)
				
				// States
				$urlRouterProvider.otherwise('login');
				$stateProvider
					.state('login', {
						url: '/login',
						templateUrl: 'client/api/login/login-partial.html',
						controller: 'LoginController'
					})
					.state('signUp', {
						url: '/signup',
						templateUrl: 'client/api/signup/signup-partial.html',
						controller: 'SignupController'
					})
					.state('main', {
						url: '/main',
						templateUrl: 'client/api/main/main-partial.html',
						controller: 'MainController',
						onEnter: ['$state', '$stateParams', '$location', '$window', function( $state, $stateParams, $location, $window){
							if($location.search().access_token){
								$window.sessionStorage.jwt = $location.search().access_token
								$location.url($location.path())
							}
						}]
					})
					.state('main.createTeam', {
						url: '/createTeam',
						templateUrl: 'client/api/team/form/team-form-partial.html',
						controller: 'TeamFormController'
					})
					.state('main.createUser', {
						url: '/createUser',
						templateUrl: 'client/api/users/form/user-form-partial.html',
						controller: 'UserFormController'
					})
					.state('promotionCreate', {
						url: '/team/promotionCreate',
						templateUrl: 'client/api/promotions/form/promotions-form-partial.html',
						controller: 'PromotionFormController'
					})
					.state('promotionCreate.goalPreview', {
						url: '/team/promotionCreate/goalView',
						templateUrl: 'client/api/promotions/goalPreviewView/goal-preview-view.html',
						controller: 'GoalPreviewController'
					})
					.state('team', {
						url: '/team/:id',
						templateUrl: 'client/api/team/team-partial.html',
						controller: 'TeamController'
					})
					// .state('team.promotionCreate', {
					// 	url: '/team/:id',
					// 	templateUrl: 'client/api/team/promotions/form/promotions-form-partial.html',
					// 	controller: 'PromotionFormController'
					// })
					.state('team.addUser', {
						templateUrl:'client/api/team/admin/admin-add-partial.html',
						controller: 'AddUserController'
					})
					.state('team.addAdmin', {
						templateUrl:'client/api/team/admin/admin-add-partial.html',
						controller: 'AdminController'
					})
					.state('team.addPromotion', {
						templateUrl: 'client/api/promotions/promotions-add/promotions-add-partial.html',
						controller: 'PromotionAddController'
					})
					.state('team.switchOwner', {
						templateUrl: 'client/api/team/owner/owner-partial.html',
						controller: 'OwnerController'
					})
					.state('promotion', {
						url: '/promotions',
						templateUrl: 'client/api/promotions/promotions-partial.html',
						controller: 'PromotionsController'
					})
					.state('promotionView', {
						url: '/promotions/:id',
						templateUrl: 'client/api/promotions/promotion-view/promotion-view-partial.html',
						controller: 'PromotionViewController',
						params: {
							teamId: null
						}
					})
					.state('user', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UserController',
						params: {
							teamId: null
						}
					})
					.state('setting', {
						url: '/settings',
						templateUrl: 'client/api/settings/settings-partial.html',
						controller: 'MainSettingsController'
					})
					.state('goals', {
						url: '/goals',
						templateUrl: 'client/api/settings/goals/goals-partial.html',
						controller: 'GoalsController'
					})
					.state('goals.create', {
						url: '/create',
						templateUrl: 'client/api/settings/goals/goals-form/goals-form-partial.html',
						controller: 'GoalsFormController'
					})
					.state('goalsView', {
						url: '/goals/:id',
						templateUrl: 'client/api/settings/goals/goals-view/goals-view-partial.html',
						controller: 'GoalsViewController'
					})
					.state('rewards', {
						url: '/rewards',
						templateUrl: 'client/api/settings/rewards/rewards-partial.html',
						controller: 'RewardsController'
					})
					.state('rewards.create', {
						url: '/create',
						templateUrl: 'client/api/settings/rewards/rewards-form/rewards-form-partial.html',
						controller: 'RewardsFormController'
					})
					.state('rewardsView', {
						url: '/rewards/:id',
						templateUrl: 'client/api/settings/rewards/rewards-view/rewards-view-partial.html',
						controller: 'RewardsViewController'
					})
					.state('progress', {
						url: '/progress',
						templateUrl: 'client/api/settings/progress/progress-partial.html',
						controller: 'ProgressController'
					})
					.state('progress.create', {
						url: '/create', 
						templateUrl: 'client/api/settings/progress/progress-form/progress-form-partial.html',
						controller: 'ProgressFormController'
					})
					.state('progressView', {
						url: '/progress/:id',
						templateUrl: 'client/api/settings/progress/progress-view/progress-view-partial.html',
						controller: 'ProgressViewController'
					})
					// .state('activity', {
					// 	url: '/activity',
					// 	templateUrl: 'client/api/activity/activity-partial.html',
					// 	controller: 'ActivityController'
					// })
					// .state('activity.create', {
					// 	url: '/createActivity',
					// 	templateUrl: 'client/api/activity/form/activity-form-partial.html',
					// 	controller: 'ActivityFormController'
					// })
					// // look to rename this state to something a little more Restful
					// .state('activityView', {
					// 	url: '/activity/:id',
					// 	templateUrl: 'client/api/activity/view/activity-view-partial.html',
					// 	controller: 'ActivityViewController'
					// })

			}])
			.run(function(editableOptions) {
			  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
			})
}());