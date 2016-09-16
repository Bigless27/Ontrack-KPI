(function() {
	angular.module('onTrack')
	.controller('AddUserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

		$scope.highlight = function(x) {
			if ($(`span:contains(${x.email})`).hasClass('check')){

				$(`span:contains(${x.email})`).parent().parent().css({"background-color":"transparent"})
				$(`span:contains(${x.email})`).removeClass('check')
			}
			else{
				$(`span:contains(${x.email})`).parent().parent().css({"background-color":"#a8a8a8"})
				$(`span:contains(${x.email})`).addClass('check')
			}

		}

		$scope.user = {

		  };

		$scope.uncheckAll = function() {
		$scope.user.roles = [];
		};


		$scope.add = function(data){
			var token = $window.sessionStorage['jwt']

			var client = {usersClient:[]}

			// push users active back in
			$scope.client.usersClient.forEach(function(user) {
				client.usersClient.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
			})

			// check duplicates
			data.users.forEach(function(user){
				if (client.usersClient.filter(function(e){return e.email == user.email}).length === 0) {
				 	client.usersClient.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
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
			$http.get('/api/users')
				.success(function(users) {
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
				.error(function(err) {
					console.log(err);
				})
		}

		$scope.optionsList = []

		getUsers()



		
	}])
}());