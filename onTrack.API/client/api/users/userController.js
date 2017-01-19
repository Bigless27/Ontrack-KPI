(function() {
	angular.module('onTrack')
	.controller('UserController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						$scope.users = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getUsers()
		
	}])
}());