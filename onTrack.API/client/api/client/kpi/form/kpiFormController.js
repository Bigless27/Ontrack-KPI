(function() {
	angular.module('onTrack')
	.controller('KPIFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
			$scope.create = true
			$scope.err = false
			$scope.clientId = $stateParams['id']

			function getSettings() {
			$http.get('api/type-settings')
				.success(function(data) {
					$scope.settings = data
					setTypes()
				})
				.error(function(err){
					console.log(err)
				})
			}
			//for select button
			function setTypes() {
				var settingsCopy = $scope.settings
				$scope.types = [...new Set(settingsCopy.map(function(set){
					return set.type
				}))]

			}

			$scope.itemArray = [];

    		$scope.selected = { value: $scope.itemArray[0] };

			$scope.setSubtypes = function() {
				if(!$scope.ctrl.kpi.type) return
				else{
					var id = 1
					$scope.subList = []
					$scope.settings.forEach(function(set){
						if(set.type === $scope.ctrl.kpi.type){
							set.subTypes.forEach(function(sub){
								$scope.itemArray.push({id: id, name: sub.text})
								id++	
							})
						}
				})
			}


			}
			getSettings()


			$scope.submitKpi = function(kpi) {
				console.log(kpi)
				$scope.$broadcast('show-errors-check-validity');

				if($scope.kpiForm.$invalid){return;}
				console.log(kpi)
				if(kpi.subTypes){
		 			kpi['subTypes'] = kpi.subTypes.map(x => {text:x.name})
		 		}

		 		console.log(kpi)
				var token = $window.sessionStorage['jwt']

				var names = $scope.client.kpis.filter(function(x) {
					return x.name == kpi.name
				})

				if(names.length > 0){
					$scope.err = true
					$scope.oops = 'Name is already taken!'
					return
				}
				else{
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
			}
	}])
}());