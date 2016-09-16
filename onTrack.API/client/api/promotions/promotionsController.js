(function() {
	angular.module('onTrack')
	.controller('PromotionController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.create = false

			$scope.myList = [{
				    listValue: "sale"
			      }, {
			        listValue: "attendance"
			      }, {
			        listValue: "calls"
			      }, {
			        listValue: "referals"
			 }]

			$scope.deletePromotion = function() {
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
					 + '/promotions/' + $stateParams['promoid'], {
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

			$scope.submitPromotion = function(promotion) {
				promotion['type'] = promotion['type']['listValue']
				var token = $window.sessionStorage['jwt']

				$http.put('/api/clients/' + $stateParams['clientid']
				 + '/promotions/' + $stateParams['promoid'], promotion,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					var params = {clientid: $stateParams['clientid'], promoid: $stateParams['promoid'] }
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
			}

			function getPromotions(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/promotions/' + $stateParams['promoid'])
							.success(function(data) {
								$scope.promotion = data;
								$scope.promotion['startDate'] = new Date($scope.promotion.startDate) 
								$scope.promotion['endDate'] =  new Date($scope.promotion.endDate)
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getPromotions()

		
	}])
}());