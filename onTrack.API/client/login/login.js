(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$http',
	 function($scope, $state, $http) {

			$scope.logUserIn = function(data) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}

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