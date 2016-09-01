(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

			$scope.logUserIn = function(user) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}

				$http.post('auth/signin', user)
					.success(function(data) {
						console.log(data)
						$window.sessionStorage.jwt = data['token']
						$state.go('main')
					})
					.error(function(error) {
						console.log(error)
					})
			}

	}])
}());