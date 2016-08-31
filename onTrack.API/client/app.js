(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors'])
	.config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider',
		function($stateProvider, $urlRouterProvider, showErrorsConfigProvider) {

			showErrorsConfigProvider.showSuccess(true)
			
			// States
			$urlRouterProvider.otherwise('login');
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'client/login/login-partial.html',
					controller: 'LoginController'
				})
				
				.state('signUp', {
					url: '/signup',
					templateUrl: 'client/signup/signup-partial.html',
					controller: 'SignupController'
				})
				.state('main', {
					url: '/main',
					templateUrl: 'client/main/main-partial.html',
					controller: 'MainController'
				})
		}])
}());