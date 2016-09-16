(function() {
	angular.module('onTrack')
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.create = false

			$scope.deleteKpi = function() {
				var token = $window.sessionStorage['jwt']


				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this client!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
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
				})
			}

			$scope.submitKpi = function(kpi) {
				kpi['type'] = kpi['type']['listValue']
				var token = $window.sessionStorage['jwt']

				$http.put('/api/clients/' + $stateParams['clientid']
				 + '/kpis/' + $stateParams['kpiid'], kpi,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					var params = {clientid: $stateParams['clientid'], kpiid: $stateParams['kpiid'] }
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
			}

// Where to store all the list options
			$scope.myList = [{
				    listValue: "sale"
			      }, {
			        listValue: "attendance"
			      }, {
			        listValue: "calls"
			      }, {
			        listValue: "refferals"
			 }]
  		
			

			function getKpi(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/kpis/' + $stateParams['kpiid'])
							.success(function(data) {
								$scope.kpi = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getKpi()

		
	}])
}());