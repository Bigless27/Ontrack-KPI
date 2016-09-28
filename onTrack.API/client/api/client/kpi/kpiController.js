(function() {
	angular.module('onTrack')
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {


			function getKpiSettings() {
		 		var d = $q.defer();
		 		$http.get('api/clients/' + $stateParams.clientId + 
		 			'/kpis/' + $stateParams.kpiId)
		 			.success(function(kpi) {
		 				$http.get('api/settings')
				 			.success(function(set){
				 				$scope.kpi = kpi
				 				$scope.settings = set
				 				getUniqueTypes()
				 				getUniqueSubtypes()
				 				d.resolve()
				 			})
				 			.error(function(err) {
				 				console.log(err)
				 				d.reject()
				 			})
		 			})
		 			.error(function(err) {
		 				console.log(err)
		 				d.reject()
		 			})
		 	}

	 	function getUniqueTypes() {
	 		var typeCopy = $scope.settings
	 		var unUniqueTypes = typeCopy.map(function(x){
				return x.type
			})
			$scope.typeList = [...new Set(unUniqueTypes)]
	 	}

	 	function getUniqueSubtypes() {
	 		var unSetSubtypes = $scope.settings.filter(function(set) {
	 			return set.type === $scope.kpi.type
	 		})
	 		var unUniqueSubtypes = unSetSubtypes.map(function(x){
	 			return x.subTypes.map(function(sub){
	 				return sub.text
	 			})
	 		})
	 		unUniqueSubtypes = unUniqueSubtypes.reduce(function(a,b){return a.concat(b)})
	 		$scope.subTypes = [...new Set(unUniqueSubtypes)]
	 	}


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


			$scope.updateType = function(data) {
				if (data === ''){
					return 'Type is required'
				}
				return updateKpi(data, 'type')
			}

			$scope.updateSubtypes = function(data) {
				return updateKpi(data,'subTypes')			}

			//have type show on edit click
			$(document).on('click','#kpi-type-edit-button', function(){
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

				console.log($scope.kpi)


				$http.put('/api/clients/' + $stateParams.clientId
				 + '/kpis/' + $stateParams.kpiId, $scope.kpi,{
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

			getKpiSettings()
  		

		
	}])
}());