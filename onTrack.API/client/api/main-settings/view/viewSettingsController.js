(function() {
	angular.module('onTrack')
	.controller('ViewSettingsController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

	 		$scope.deleteSetting = function() {
				var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Setting!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/settings/'+ $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						$state.go('setting')
					})
					.error(function(err) {
						console.log(err)
					})
				})
			}

	 		function getSetting(){
	 			$http.get('api/settings/' + $stateParams.id)
	 				.success(function(data) {
	 					$scope.setting = data
	 					console.log($scope.setting)
	 				})
	 				.error(function(err) {
	 					console.log(err)
	 				})
	 		}

	 		getSetting()

	}])
}());