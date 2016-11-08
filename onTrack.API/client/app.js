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
					.state('client.switchOwner', {
						templateUrl: 'client/api/client/owner/owner-partial.html',
						controller: 'OwnerController'
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
					.state('setting', {
						url: '/settings',
						templateUrl: 'client/api/settings/settings-partial.html',
						controller: 'MainSettingsController'
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
					// look to rename this state to something a little more Restful
					.state('activityView', {
						url: '/activity/:id',
						templateUrl: 'client/api/activity/view/activity-view-partial.html',
						controller: 'ActivityViewController'
					})

			}])
			.run(function(editableOptions) {
			  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
			})
}());