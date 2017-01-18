(function() {
	angular.module('onTrack')
	.controller('AdminController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		
		$scope.admins = true

		$scope.user = {

		 };

		$scope.uncheckAll = function() {
		    $scope.user.roles = [];
		};


		$scope.add = function(data){
				var token = $window.sessionStorage['jwt']

				var team = {admins:[], users:[]}

				$scope.team.admins.forEach(function(user) {
					team.admins.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user._id})
				})

				$scope.team.users.forEach(function(user) {
					team.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user._id})
				})


				data.users.forEach(function(user){
					if (team.admins.filter(function(e){return e.email == user.email}).length === 0) {
					 	team.admins.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user.userId})
					}
					if(team.users.filter(function(e){return e.email == user.email}).length === 0) {
						team.users.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user.userId})
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
				.then(response => {
					response.data.forEach(function(user){
						if(user){
							var userEmails = $scope.team.admins.map(x => x.email)
							if(!userEmails.includes(user.email)) {
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName, userId: user._id}
									)
							}
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.catch(response => {
					console.log(response.data);
				})
		}

		$scope.optionsList = []

		getUsers()

	}])
}());