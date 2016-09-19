(function() {
	angular.module('onTrack')
	.controller('UserFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.createUser = function(user) {
				$http.post('/api/users', user)
					.success(function(data){
						$state.go('main')
					})
					.error(function(err) {
						console.log(err)
					})
			}
	}])
}());