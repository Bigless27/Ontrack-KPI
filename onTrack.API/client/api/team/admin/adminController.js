(function() {
	angular.module('onTrack')
	.controller('AdminController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		
		$scope.user = {

		  };

		$scope.uncheckAll = function() {
		    $scope.user.roles = [];
		};


		$scope.add = function(data){
				var token = $window.sessionStorage['jwt']

				var team = {admins:[], users:[]}

				$scope.team.admins.forEach(function(user) {
					team.admins.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				})

				$scope.team.users.forEach(function(user) {
					team.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				})


				data.users.forEach(function(user){
					if (team.admins.filter(function(e){return e.email == user.email}).length === 0) {
					 	team.admins.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
					}
					if(team.users.filter(function(e){return e.email == user.email}).length === 0) {
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

		function getUsers(){
			$http.get('/api/users')
				.then(function(users) {
					users.forEach(function(user){
						if(user){
							var userEmails = $scope.team.admins.map(x => x.email)
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
				.catch(function(err) {
					console.log(err);
				})
		}

		$scope.optionsList = []

		getUsers()

	}])
}());