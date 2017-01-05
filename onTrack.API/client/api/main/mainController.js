(function() {
	angular.module('onTrack')
	.controller('MainController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			function getTeams() {
				$http.get('api/teams')
					.then(function onSuccess(response) {
						$scope.teams = response.data
					})
					.catch(function onError(err) {
						console.log(err);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.then(function onSuccess(response) {
						$scope.users = response.data
					})
					.catch(function onError(response) {
						console.log(response.data)
					})
			}

			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}
		
			getUsers() 
			getTeams()
	}])
}());