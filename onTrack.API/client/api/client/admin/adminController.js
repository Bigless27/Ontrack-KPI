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

				var client = {admins:[]}


				$scope.client.admins.forEach(function(user) {
					client.admins.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				})


				data.users.forEach(function(user){
					if (client.admins.filter(function(e){return e.email == user.email}).length === 0) {
					 	client.admins.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
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

		function getUsers(){
			console.log($scope.client)
			var userEmails = $scope.client.admins.map(x => x.email)
			$http.get('/api/users')
				.success(function(users) {
					users.forEach(function(user){
						if(user){
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

		getUsers()

	}])
}());