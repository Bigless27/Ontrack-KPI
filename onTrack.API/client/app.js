(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'multipleSelect', 'xeditable', 'ngTagsInput', 'ui.select', 
		'ngSanitize', 'autocomplete'])
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
					.state('main.promotionCreate', {
						url: '/team/:id',
						templateUrl: 'client/api/team/promotions/form/promotions-form-partial.html',
						controller: 'PromotionFormController'
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
					.state('team.switchOwner', {
						templateUrl: 'client/api/team/owner/owner-partial.html',
						controller: 'OwnerController'
					})
					.state('promotion', {
						url: '/team/:id/promotions/:promoId',
						templateUrl: 'client/api/team/promotions/promotions-partial.html',
						controller: 'PromotionController'
					})
					.state('user', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UserController'
					})
					.state('setting', {
						url: '/settings',
						templateUrl: 'client/api/settings/settings-partial.html',
						controller: 'MainSettingsController'
					})
					.state('setting.createGoal', {
						url: '/createGoal',
						templateUrl: 'client/api/settings/goals/goals-form/goals-form-partial.html',
						controller: 'GoalsFromController'
					})
					.state('setting.settingTypeCreate',{
						url: '/createType',
						templateUrl: 'client/api/settings/type-setting/type-form/settings-type-form-partial.html',
						controller: 'SettingsTypeFormController'
					})
					.state('setting.settingProgressCreate', {
						url: '/createProgress',
						templateUrl: 'client/api/settings/progress-setting/progress-form/settings-progress-form-partial.html',
						controller: 'SettingsProgressFormController'
					})
					.state('settingProgress', {
						url: '/progressSetting/:id',
						templateUrl: 'client/api/settings/progress-setting/progress-setting-partial.html',
						controller: "ProgressSettingController"
					})
					.state('settingType', {
						url: '/typeSetting/:id', 
						templateUrl: 'client/api/settings/type-setting/type-setting-partial.html',
						controller: 'TypeSettingController'
					})
					.state('progress', {
						url: '/users/:id/progress/:progressId',
						templateUrl: 'client/api/users/progress/progress-partial.html',
						controller: 'ProgressController'
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