(function() {
	angular.module('onTrack')
	.controller('KPIFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
			$scope.create = true
			$scope.err = false
			$scope.clientId = $stateParams['id']

			//for select button
			$scope.myList = [{
				    listValue: "sale"
			      }, {
			        listValue: "attendance"
			      }, {
			        listValue: "calls"
			      }, {
			        listValue: "refferals"
			 }]


			$scope.submitKpi = function(kpi) {
				kpi['type'] = kpi['type']['listValue']
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