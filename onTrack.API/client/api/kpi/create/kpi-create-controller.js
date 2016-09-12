(function() {
	angular.module('onTrack')
	.controller('KPICreateController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.clientId = $stateParams['id']


			$scope.createKpi = function(kpi) {
				var token = $window.sessionStorage['jwt']

				$http.post('api/clients/' + $stateParams['id'] + '/kpis', kpi ,{
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
				.success(function(data){
						$state.reload()
				})
				.error(function(err){
					console.log(err)
				})

			}

		
	}])
}());