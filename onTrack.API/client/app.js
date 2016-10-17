(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'multipleSelect', 'xeditable', 'ngTagsInput', 'ui.select', 
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
					.state('main.createClient', {
						url: '/createClient',
						templateUrl: 'client/api/client/form/client-form-partial.html',
						controller: 'ClientFormController'
					})
					.state('main.createUser', {
						url: '/createUser',
						templateUrl: 'client/api/users/form/user-form-partial.html',
						controller: 'UserFormController'
					})
					.state('client', {
						url: '/client/:id',
						templateUrl: 'client/api/client/client-partial.html',
						controller: 'ClientController'
					})
					.state('client.kpiCreate', {
						url: '/kpi/:id',
						templateUrl: 'client/api/client/kpi/form/kpi-form-partial.html',
						controller: 'KPIFormController'
					})
					.state('client.promotionCreate', {
						url: '/client/:id',
						templateUrl: 'client/api/client/promotions/form/promotions-form-partial.html',
						controller: 'PromotionFormController'
					})
					.state('client.addUser', {
						templateUrl:'client/api/client/admin/admin-add-partial.html',
						controller: 'AddUserController'
					})
					.state('client.addAdmin', {
						templateUrl:'client/api/client/admin/admin-add-partial.html',
						controller: 'AdminController'
					})
					.state('kpi', {
						url: '/client/:id/kpis/:kpiId',
						templateUrl: 'client/api/client/kpi/kpi-partial.html',
						controller: 'KPIController as ctrl'
					})
					.state('promotion', {
						url: '/client/:id/promotions/:promoId',
						templateUrl: 'client/api/client/promotions/promotions-partial.html',
						controller: 'PromotionController'
					})
					.state('user', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UserController'
					})
					.state('user.activityCreate', {
						templateUrl: 'client/api/users/activity/form/activity-form-partial.html',
						controller: 'ActivityFormController'
					})
					.state('setting', {
						url: '/settings',
						templateUrl: 'client/api/main-settings/settings-partial.html',
						controller: 'MainSettingsController'
					})
					.state('setting.settingTypeCreate',{
						url: '/createType',
						templateUrl: 'client/api/main-settings/type-setting/type-form/settings-type-form-partial.html',
						controller: 'SettingsTypeFormController'
					})
					.state('setting.settingProgressCreate', {
						url: '/createProgress',
						templateUrl: 'client/api/main-settings/progress-setting/progress-form/settings-progress-form-partial.html',
						controller: 'SettingsProgressFormController'
					})
					.state('settingProgress', {
						url: '/progressSetting/:id',
						templateUrl: 'client/api/main-settings/progress-setting/progress-setting-partial.html',
						controller: "ProgressSettingController"
					})
					.state('settingType', {
						url: '/typeSetting/:id', 
						templateUrl: 'client/api/main-settings/type-setting/type-setting-partial.html',
						controller: 'TypeSettingController'
					})
					.state('activity', {
						url: '/users/:id/activity/:activityId',
						templateUrl: 'client/api/users/activity/activity-partial.html',
						controller: 'ActivityController'
					})
					.state('progress', {
						url: '/users/:id/progress/:progressId',
						templateUrl: 'client/api/users/progress/progress-partial.html',
						controller: 'ProgressController'
					})

			}])
			.run(function(editableOptions) {
			  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
			})
}());