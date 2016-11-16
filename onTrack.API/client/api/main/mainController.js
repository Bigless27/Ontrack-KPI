(function() {
	angular.module('onTrack')
	.controller('MainController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			function getClients() {
				$http.get('api/clients')
					.success(function(data) {
						$scope.clients = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.success(function(data) {
						$scope.users = data
					})
					.error(function(err) {
						console.log(err)
					})
			}


			$scope.optionsList = [
			  {id: 1,  name : "Java"},
			  {id: 2,  name : "C"},
			  {id: 3,  name : "C++"},
			  {id: 4,  name : "AngularJs"},
			  {id: 5,  name : "JavaScript"}
			];

			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}
		
			getUsers() 
			getClients()
	}])
}());