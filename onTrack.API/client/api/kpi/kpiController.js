(function() {
	angular.module('onTrack')
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			function getKPI(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/kpis/' + $stateParams['kpiid'])
							.success(function(data) {
								console.log(data)
								$scope.kpi = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getKPI()

		
	}])
}());