(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'multipleSelect', 'xeditable', 'ngTagsInput'])
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
					.state('client.settingCreate',{
						url: 'client/:id',
						templateUrl: 'client/api/client/settings/settings-create-partial.html',
						controller: 'ClientController'
					})
					.state('client.addUser', {
						templateUrl:'client/api/client/admin/admin-add-partial.html',
						controller: 'AddUserController'
					})
					.state('client.addAdmin', {
						templateUrl:'client/api/client/admin/admin-add-partial.html',
						controller: 'AdminController'
					})
					.state('clientSetting', {
						url: '/client/:clientid/settings/:settingid',
						templateUrl: 'client/api/client/settings/settings-partial.html',
						controller: 'ClientSettingController'
					})
					.state('kpi', {
						url: '/client/:clientid/kpis/:kpiid',
						templateUrl: 'client/api/client/kpi/kpi-partial.html',
						controller: 'KPIController'
					})
					.state('promotion', {
						url: '/client/:clientid/promotions/:promoid',
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
						templateUrl: 'client/api/main-settings/settings-partial.html',
						controller: 'MainSettingsController',
						url: '/settings'
					})
					.state('setting.settingCreate',{
						templateUrl: 'client/api/main-settings/form/settings-form-partial.html',
						controller: 'MainSettingsFormController',
						url: '/create'
					})
					.state('activity', {
						url: '/users/:id/activity/:activityId',
						templateUrl: 'client/api/users/activity/activity-partial.html',
						controller: 'ActivityController'
					})


			}])
			.run(function(editableOptions) {
			  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
			})
}());