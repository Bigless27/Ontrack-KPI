(function() {
	angular.module('onTrack')
	.controller('UserFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createUser = function(user) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}
				
				var duplicate = $scope.users.filter(function(x){
					return x.email == user.email
				})

				if (duplicate.length > 0){
					$scope.oops = 'Email is already taken!'
					$scope.errorDisplay = true
					return
				}
				else{
					$http.post('api/users', user)
						.then(response => {
							$state.reload()

						})
						.catch(response => {
							console.log(response.data)
						})
				}
			}
	}])
}());