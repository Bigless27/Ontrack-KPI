(function() {
	angular.module('onTrack')
	.controller('SignupController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {
		$scope.signUp = function(user) {
			$scope.$broadcast('show-errors-check-validity')

			if ($scope.userForm.$invalid){return;}
			$scope.err = false
			$http.post('api/users', user)
				.then(function(response) {
					$scope.err = false
					$window.sessionStorage.jwt = response.data['token']
					$state.go('main')
				})
				.catch(function(reponse) {
					$scope.err = true
					$scope.errMessage = response.data.message
				})
		}
	}])
}());