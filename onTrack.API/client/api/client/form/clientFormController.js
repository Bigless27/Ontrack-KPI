(function() {
	angular.module('onTrack')
	.controller('ClientFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.hey = function(){
				console.log('hey')
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