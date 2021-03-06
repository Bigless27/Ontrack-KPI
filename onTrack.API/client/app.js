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
						controller: 'PromotionViewController'
					})
					.state('promotionViewTeam', {
						url: '/promotions/:id/:teamId',
						templateUrl: 'client/api/promotions/promotion-view/promotion-view-partial.html',
						controller: 'PromotionViewController'
					})
					.state('user', {
						url: '/user',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UserController'
					})
					.state('user.createUser', {
						url: '/createUser',
						templateUrl: 'client/api/users/form/user-form-partial.html',
						controller: 'UserFormController'
					})
					.state('user.assignProgress', {
						url: '/progress',
						templateUrl: 'client/api/settings/progress/assign-progress/assign-progress-partial.html',
						controller: 'AssignProgressController'
					})
					.state('userView', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-view/user-view-partial.html',
						controller: 'UserViewController'
					})
					.state('userViewTeam', {
						url: '/user/:id/:teamId',
						templateUrl: 'client/api/users/user-view/user-view-partial.html',
						controller: 'UserViewController'
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
					.state('progressViewUser', {
						url: '/progress/:id/:userId',
						templateUrl: 'client/api/settings/progress/progress-view/progress-view-partial.html',
						controller: 'ProgressViewController',
					})
					.state('activity', {
						url: '/activity',
						templateUrl: 'client/api/activity/activity-partial.html',
						controller: 'ActivityController'
					})
					.state('activity.create', {
						url: '/createActivity',
						templateUrl: 'client/api/activity/form/activity-form-partial.html',
						controller: 'ActivityFormController'
					})
					.state('activityView', {
						url: '/activity/:id',
						templateUrl: 'client/api/activity/activityView/activity-view-partial.html',
						controller: 'ActivityViewController'
					})
					// // look to rename this state to something a little more Restful
					// .state('activityView', {
					// 	url: '/activity/:id',
					// 	templateUrl: 'client/api/activity/view/activity-view-partial.html',
					// 	controller: 'ActivityViewController'
					// })

			}])
			.run(function(editableOptions, $rootScope, $state, $stateParams) {
			  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

			})
		// 	.factory('scopeService', function() {

		// 	var model = {}

		// 	return {
		// 		getValue: function() {
		// 			return model.value
		// 		},
		// 		updateValue: function(value) {
		// 			model.value = value;
		// 		}
		// 	}
		// })
}());