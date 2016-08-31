(function() {
	angular.module('onTrack')
	.controller('SignupController', ['$scope', '$state', '$http', 
		function($scope, $state, $http) {
		$scope.signUp = function(user) {
			$scope.$broadcast('show-errors-check-validity')

			if ($scope.userForm.$invalid){return;}

			$http.post('api/users', user)
				.success(function(data) {
					$state.go('main')
				})
				.error(function(error) {
					console.log(error)
				})
		}
		
	}])
}());