(function() {
	angular.module('onTrack')
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {


			$scope.deleteKpi = function() {
				var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this kpi!",
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

			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateKpi(data, 'name')
			}

			$scope.types = [
				{value: 1, text: 'sale'},
				{value: 2, text: 'attendance'},
				{vale: 3, text: 'refferals'},
				{value: 4, text: 'calls'}

			]

			$scope.updateType = function(data) {
				if (data === ''){
					return 'Type is required'
				}
				return updateKpi(data, 'type')
			}

			//have type show on edit click
			$(document).on('click','.kpi-edit-button', function(){
				$('#kpi-type-edit')[0].click()
			} )
			


			$scope.updateValue = function(data) {
				if (data === ''){
					return 'Value is required'
				}
				return updateKpi(data, 'value')
			}


			function updateKpi(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.kpi[field] = data


				$http.put('/api/clients/' + $stateParams['clientid']
				 + '/kpis/' + $stateParams['kpiid'], $scope.kpi,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})

			}
  		
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