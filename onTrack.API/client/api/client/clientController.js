(function() {
	angular.module('onTrack')
	.controller('ClientController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		
			$scope.removeAdmin = function(admin) {
				var token = $window.sessionStorage['jwt']

				$.each($scope.client.admins, function(i) {
					if ($scope.client.admins[i].email === admin.email) {
						$scope.client.admins.splice(i,1);
						return false
					}
				})
				$http.put('/api/clients/' + $stateParams['id'] + '/updateAdmin', $scope.client, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){

				})
				.error(function(err) {
					console.log(err)
				})
			}


			function getClient(){
				$http.get('/api/clients/' + $stateParams['id'])
					.success(function(data) {
						$scope.client = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			getClient()

		
	}])
}());