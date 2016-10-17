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

			$scope.subTypesList = [];

			$scope.typeChecker = false

			$scope.checkType = function(){
				if(!$scope.kpi.type) {
					$scope.typeChecker = true
				}
			}


			$scope.setSubtypes = function() {
				$scope.subTypesList = []
				if(!$scope.kpi.type) return
				else{
					$scope.typeChecker = false
					$scope.settings.forEach(function(set){
						if(set.type === $scope.kpi.type){
							set.subTypes.forEach(function(sub){
								$scope.subTypesList.push({name: sub.text})
							})
						}
				})
			}


			}
			getSettings()


			$scope.submitKpi = function(kpi) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.kpiForm.$invalid){return;}

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