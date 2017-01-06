(function() {
	angular.module('onTrack')
	.controller('AddUserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

		$scope.add = function(data){
			var token = $window.sessionStorage['jwt']

			var team = {users:[]}

			// push users active back in
			$scope.team.users.forEach(function(user) {
				team.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
			})

			// check duplicates
			data.users.forEach(function(user){
				if (team.users.filter(function(e){return e.email == user.email}).length === 0) {
				 	team.users.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				}
			})

			$http.put('/api/teams/' + $stateParams['id'], team, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(function(response) {
				$state.reload() //look into making this two way bound

			})
			.catch(function(response) {
				console.log(response.data)
			})
		}



		function getTeam() {
			$http.get('/api/teams/' + $stateParams.id)
				.then(function onSuccess(response) {
					$scope.team = response.data	
					getUsers()
				})
				.catch(function onError(reponse) {
					console.log(response.data)
				})
		}

		function getUsers(){
			$http.get('/api/users')
				.then(function onSuccess(response) {
					response.data.forEach(function(user){
						if(user){
							var userEmails = $scope.team.users.map(x => x.email)
							if(!userEmails.includes(user.email)) {
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.catch(function onError(response) {
					console.log(respose.data);
				})
		}

		$scope.optionsList = []

		getTeam()
		
	}])
}());