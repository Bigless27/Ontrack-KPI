(function() {
	angular.module('onTrack')
	.controller('AddUserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

		$scope.add = function(data){
			var token = $window.sessionStorage['jwt']

			var client = {users:[]}

			// push users active back in
			$scope.client.users.forEach(function(user) {
				client.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
			})

			// check duplicates
			data.users.forEach(function(user){
				if (client.users.filter(function(e){return e.email == user.email}).length === 0) {
				 	client.users.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				}
			})

			$http.put('/api/clients/' + $stateParams['id'], client, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.success(function(data) {
				$state.reload() //look into making this two way bound

			})
			.error(function(err) {
				console.log(err)
			})
		}



		function getClient() {
			$http.get('/api/clients/' + $stateParams.id)
				.success(function(data) {
					$scope.client = data	
					getUsers()
				})
				.error(function(err) {
					console.log(err)
				})
		}

		function getUsers(){
			$http.get('/api/users')
				.success(function(users) {
					users.forEach(function(user){
						if(user){
							var userEmails = $scope.client.users.map(x => x.email)
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
				.error(function(err) {
					console.log(err);
				})
		}

		$scope.optionsList = []

		getClient()
		
	}])
}());