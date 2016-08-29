(function() {
	angular.module('onTrack', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider) {

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
		}])
}());