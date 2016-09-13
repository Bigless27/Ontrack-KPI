(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'checklist-model'])
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
					.state('client', {
						url: '/client/:id',
						templateUrl: 'client/api/client/client-partial.html',
						controller: 'ClientController'
					})
					.state('kpi', {
						url: '/client/:clientid/kpis/:kpiid',
						templateUrl: 'client/api/kpi/kpi-partial.html',
						controller: 'KPIController'
					})
					.state('kpi.edit', {
						templateUrl: 'client/api/kpi/form/kpi-form-partial.html',
						controller: 'KPIController'

					})
					.state('client.kpiCreate', {
						url: '/kpi/:id',
						templateUrl: 'client/api/kpi/form/kpi-form-partial.html',
						controller: 'KPIFormController'
					})
					.state('promotion', {
						url: '/client/:clientid/promotions/:promoid',
						templateUrl: 'client/api/promotions/promotions-partial.html',
						controller: 'PromotionController'
					})
					.state('client.promotionCreate', {
						url: '/client/:id',
						templateUrl: 'client/api/promotions/form/promotions-form-partial.html',
						controller: 'PromotionFormController'
					})
					.state('setting', {
						url: '/client/:clientid/settings/:settingid',
						templateUrl: 'client/api/settings/settings-partial.html',
						controller: 'SettingController'
					})
					.state('client.settingCreate',{
						url: 'client/:id',
						templateUrl: 'client/api/settings/settings-create-partial.html',
						controller: 'ClientController'
					})
					.state('user', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UsersController'
					})
					.state('client.addAdmin', {
						templateUrl:'client/api/admin/admin-add-partial.html',
						controller: 'AdminController'
					})

			}])
}());