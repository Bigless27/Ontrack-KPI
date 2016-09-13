(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.create = true
			$scope.clientId = $stateParams['id']

			$scope.myList = [{
				    listValue: "sale"
			      }, {
			        listValue: "attendance"
			      }, {
			        listValue: "calls"
			      }, {
			        listValue: "referals"
			 }]
			
			$scope.submitPromotion = function(promotion) {
				var token = $window.sessionStorage['jwt']

				$http.post('api/clients/' + $stateParams['id'] + '/promotions', promotion ,{
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

		
	}])
}());