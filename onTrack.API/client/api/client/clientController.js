(function() {
	angular.module('onTrack')
	.controller('ClientController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		
			$scope.removeAdmin = function(admin) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/clients/' + $stateParams['id'] + '/updateAdmin', admin, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$scope.client = data
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