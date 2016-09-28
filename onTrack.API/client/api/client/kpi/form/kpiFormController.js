(function() {
	angular.module('onTrack')
	.controller('KPIFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
			$scope.create = true
			$scope.err = false
			$scope.clientId = $stateParams['id']

			function getSettings() {
			$http.get('api/settings')
				.success(function(data) {
					$scope.settings = data
					setTypes()
					setSubtype()
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

			function setSubtype() {
				var subTypeHoler = []
				var set = $scope.settings.map(function(set) {
					return set.subTypes
				})

				var flatSet = set.reduce(function(a,b) {
					return a.concat(b)
				}).map(function(s){
					return s.text
				})
				$scope.subTypes = [...new Set(flatSet)]

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