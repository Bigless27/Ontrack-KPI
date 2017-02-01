(function() {
	angular.module('onTrack')
	.controller('ActivityController', ['$scope', '$state', '$http', '$stateParams',
		function($scope, $state, $http, $stateParams) {

			$scope.filteredTeam = false

			function getRecentActivity() {
				$http.get('api/activity')
					.then(response => {

					})
					.catch(response => {
						console.log(response)
					})
			}

			function getTeams() {
				$http.get('api/teams')
					.then(response => {
						$scope.teams =response.data
					})
					.catch(response => {
						console.log(response)
					})
			}


			$scope.$watch(function() { return $scope.team}, function(newVal, oldVal) {
				if (newVal) {
					$scope.filterdActivityTeam = $scope.activities.filter(a => {return a.team == newVal._id})
					$scope.filteredTeam = true
				}	
			})
			
			function getUsers() {
				$http.get('api/users')
					.then(response => {
						$scope.users = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getActivity() {
				$http.get('api/activity')
					.then(response => {
						$scope.activities = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}


			getActivity()
			getUsers()
			getTeams()

			// getRecentActivity()
		}])
}());