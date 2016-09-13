(function() {
	angular.module('onTrack')
	.controller('PromotionController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.create = false
			
			function getPromotions(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/promotions/' + $stateParams['promoid'])
							.success(function(data) {
								$scope.promotion = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getPromotions()

		
	}])
}());