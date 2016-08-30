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