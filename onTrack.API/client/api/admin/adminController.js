(function() {
	angular.module('onTrack')
	.controller('AdminController', ['$scope', '$state', '$http', '$window', '$stateParams',
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


		$scope.add = function(){
			var token = $window.sessionStorage['jwt']

			var client = {admins:[]}

			console.log($scope.client.admins)


			$scope.client.admins.forEach(function(user) {
				client.admins.push({id: user._id, email: user.email})
			})


			$scope.user.roles.forEach(function(user){
				if (client.admins.filter(function(e){return e.email == user.email}).length === 0) {
				 	client.admins.push({id:user._id, email: user.email})
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
					.success(function(data) {
						$scope.roles = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			getUsers()



		
	}])
}());