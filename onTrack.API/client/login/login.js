(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$http',
	 function($scope, $state, $http) {

			$scope.logUserIn = function(user) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}

				$http.post('auth/signin', user)
					.success(function(data) {
						$state.go('main')
					})
					.error(function(error) {
						console.log(error)
					})
			}

	}])
}());