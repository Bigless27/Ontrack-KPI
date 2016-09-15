(function() {
	angular.module('onTrack')
	.controller('SignupController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {
		$scope.signUp = function(user) {
			$scope.$broadcast('show-errors-check-validity')

			if ($scope.userForm.$invalid){return;}
			$scope.err = false
			$http.post('api/users', user)
				.success(function(data) {
					$scope.err = false
					$window.sessionStorage.jwt = data['token']
					$state.go('main')
				})
				.error(function(error) {
					$scope.err = true
					$scope.errMessage = error.message
				})
		}
	}])
}());