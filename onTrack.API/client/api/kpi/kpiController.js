(function() {
	angular.module('onTrack')
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.deleteKpi = function() {
				var token = $window.sessionStorage['jwt']

				$http.delete('/api/clients/' + $stateParams['clientid']
				 + '/kpis/' + $stateParams['kpiid'], {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					var clientId = {'id': $stateParams['clientid'] + ''}
					$state.go('client',clientId )
				})
				.error(function(err) {
					console.log(err)
				})
			}

			function getKpi(){
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

			getKpi()

		
	}])
}());