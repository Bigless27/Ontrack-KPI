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
		}])
}());
(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', function($scope, $state) {

		
	}])
}());