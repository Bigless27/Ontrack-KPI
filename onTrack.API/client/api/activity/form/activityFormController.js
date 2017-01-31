(function() {
	angular.module('onTrack')
	.controller('ActivityFormController', ['$scope', '$state', '$http', '$stateParams',
		function($scope, $state, $http, $stateParams) {

			$scope.teamChecker = false

			$scope.setUsers = function() {
				if(!$scope.teams) return
				else {
					$scope.teamChecker = false
					var usersFiltered = $scope.users.filter( x => {return x.teamId.includes($scope.activity.team._id)})
					usersFiltered.forEach(x => {x.fullName = `${x.firstName} ${x.lastName}`})
					$scope.filteredUsers = usersFiltered
				}
			}

			$scope.checkTeam = function() {
				if (!$scope.teams) {
					$scope.teamChecker = true
				}
			}

			function getTeams() {
				$http.get('api/teams')
					.then(response => {
						$scope.teams = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

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
			getTeams()
		}])
}());