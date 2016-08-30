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
(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$http',
	 function($scope, $state, $http) {

			$scope.logUserIn = function(data) {
				console.log(data);

				$http.post('auth/signin', data)
					.success(function(data) {
						console.log(data)
					})
					.error(function(error) {
						console.log(error)
					})
			}

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('SignupController', ['$scope', '$state', function($scope, $state) {

		
	}])
}());