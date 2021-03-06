(function() {
	angular.module('onTrack')
	.controller('ActivityViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject', 'submitFormat', '$window',
		function($scope, $state, $http, $stateParams, arrToObject, submitFormat, $window) {

			$scope.box = false;

			$scope.tracker = 1

			$scope.deleteActivity = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Activity!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(response => {
					$http.delete('/api/activity/' + $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(response => {
						$state.go('activity')
					})
					.catch(response => {
						console.log(response)
					})
				}).catch(response => {
					console.log(response)
				})
			}



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

			$scope.submit = function(activity) {
				var name = {'asfName': activity.asfName, 'team': activity.team, 'users': activity.users}
				delete activity.gsfName
				delete activity.team
				delete activity.asfName


				var newActivity = submitFormat.kvPair(activity)

				var addedActivitys = submitFormat.addGoalFormat(activity)

				updatedActivity = Object.assign(newActivity, arrToObject.create(addedActivitys), name)
				
				$http.put('api/activity/' + $stateParams.id, updatedActivity)	
					.then(response => {
						$state.reload()
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