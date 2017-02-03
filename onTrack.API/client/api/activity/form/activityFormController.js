(function() {
	angular.module('onTrack')
	.controller('ActivityFormController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject',
		function($scope, $state, $http, $stateParams, arrToObject) {

			$scope.teamChecker = false

			$scope.tracker = 0;

			$scope.submit = function(data) {
				$scope.$broadcast('show-errors-check-validity');

				//not working for some reason
				// if($scope.activityForm.$invalid){return;}

				var props = {'asfName': data.name, 'team': data.team, 
					'users': data.users}
				delete data.name
				delete data.team
				delete data.users

				var data = arrToObject.create(Object.values(data))
			
				var dataJson = Object.assign(data, props)


				$http.post('api/activity', dataJson)
				.then(function onSuccess(response) {
					$state.reload()
				})
				.catch(function onError(response) {
					console.log(response)
				})
			}

			$scope.setUsers = function() {
				if(!$scope.activity.team) return
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