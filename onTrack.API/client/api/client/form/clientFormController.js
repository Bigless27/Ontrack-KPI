(function() {
	angular.module('onTrack')
	.controller('ClientFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createClient = function(data){
				var token = $window.sessionStorage['jwt']


				var names = $scope.clients.filter(function(client) {
					return client.name == data.name
				})

				if(names.length > 0){
					$scope.errorDisplay = true
					$scope.oops = 'Name is already taken!'
					return
				}
				else{
					$http.post('/api/clients' , data ,{
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var clientId = {'id': data._id + ''}
						$state.go('client',clientId )
					})
					.error(function(err) {
						$scope.errorDisplay = true
						$scope.oops = err.message
					})
				}

			}

			function getAllUsers() {
				$http.get('/api/users')
					.success(function(users){
						users.forEach(function(user){
							if(user){
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
							else{
								$scope.optionsList = [{name: 'No users'}]
							}
						})
					})
					.error(function(err){
						console.log(err)
					})
			}

			getAllUsers()

			$scope.optionsList = [];

	}])
}());