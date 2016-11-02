(function() {
	angular.module('onTrack')
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {


			function getKpiSettings() {
		 		var d = $q.defer();
		 		$http.get('api/clients/' + $stateParams.id + 
		 			'/kpis/' + $stateParams.kpiId)
		 			.success(function(kpi) {
		 				$http.get('api/type-settings')
				 			.success(function(set){
				 				$scope.kpi = kpi
				 				$scope.noSubtypes = false
				 				if (kpi.subTypes.length === 0){
				 					$scope.noSubtypes = true
				 				}
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
	 		var subTypeStrings = $scope.kpi.subTypes.map(x => x.name)
	 		var subArr = []
	 		unSetSubtypes[0].subTypes.forEach(function(sub) {
	 				if (!subTypeStrings.includes(sub.text)){
		 				subArr.push({name: sub.text})
	 				}
	 		})
	 		$scope.subTypes = subArr
	 	}

	 	$scope.userTags = false

		$scope.toggleEdit = function() {
			if($scope.userTags){
				$scope.userTags = false
			}
			else{
				$scope.userTags = true
			}
		}

		$scope.afterRemoveItem = function(item) {
			var subStrings = $scope.subTypes.map(x => x.name)
	 		if (subStrings.includes(item.name)) {
	 			return
	 		}
	 		else{
		 		$scope.subTypes.push({name: item.name})
	 		}
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
			  html: false
			}).then(function(){
				$http.delete('/api/clients/' + $stateParams['id']
				 + '/kpis/' + $stateParams['kpiId'], {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					var clientId = {'id': $stateParams['id'] + ''}
					$state.go('client',clientId )
				})
				.error(function(err) {
					console.log(err)
				})
			}).done(function() {
				return
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
				else if (($scope.kpi.type == data)) {
					return 
				}
				return updateKpi(data, 'type')
			}

			$scope.updateSubtypes = function(data) {
				return updateKpi(data,'subTypes')			
			}

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

				$http.put('/api/clients/' + $stateParams.id
				 + '/kpis/' + $stateParams.kpiId, $scope.kpi,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					if (field == 'type') {
						$scope.updateSubtypes([])
					}
					else {
						$state.reload()
					}
				})
				.error(function(err) {
					console.log(err)
				})
			}

			getKpiSettings()	
	}])
}());