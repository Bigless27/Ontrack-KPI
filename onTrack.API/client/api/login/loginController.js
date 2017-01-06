(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

			$scope.logUserIn = function(user) {
				$scope.$broadcast('show-errors-check-validity');


				if($scope.userForm.$invalid){return;}

				$scope.err = true

				$http.post('auth/signin', user)
					.then((response) => {

						$scope.err = false
						$window.sessionStorage.jwt = response.data['token']
						$state.go('main')
					})
					.catch((response) => {
						$scope.err = true
						$scope.errMessage = response
					})
			}

	}])
}());