(function() {
	angular.module('onTrack')
	.controller('UserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			function getUser() {
				$http.get('/api/users/' + $stateParams.id)
					.success(function(data){
						$scope.user = data
					})
					.error(function(err) {
						console.log(err)
					})
			}


			getUser()
		
	}])
}());