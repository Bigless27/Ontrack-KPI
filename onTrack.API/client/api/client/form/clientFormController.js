(function() {
	angular.module('onTrack')
	.controller('ClientFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createClient = function(user){
				var token = $window.sessionStorage['jwt']

				$http.post('/api/clients' , user ,{
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