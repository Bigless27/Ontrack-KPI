(function() {
	angular.module('onTrack')
	.controller('ActivityViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject', 'submitFormat',
		function($scope, $state, $http, $stateParams, arrToObject, submitFormat) {

			$scope.box = false;

			$scope.tracker = 1

			$scope.editActivity = function() {
				$scope.box = true
			}

			$scope.cancel = function() {
				$scope.box = false
				$state.reload()
			}




			function getActivity(){
				$http.get('api/activity/' + $stateParams.id)
					.then(response => {

						var kvObj = submitFormat.generateKVObj(response.data.any)
				
						var combinedFormatted = Object.assign(kvObj, {'asfName': response.data.asfName, 'team': response.data.team, 'users': response.data.users})

						$scope.activity = combinedFormatted

						$scope.activity.users.forEach(x => {x.fullName = `${x.firstName} ${x.lastName}`})
					})	
					.catch(response => {
						console.log(response)
					})
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
						response.data.forEach(x => {x.fullName = `${x.firstName} ${x.lastName}`})
					})
					.catch(response => {
						console.log(response)
					})
			}

			getUsers()
			getTeams()
			getActivity()
		}])
}());