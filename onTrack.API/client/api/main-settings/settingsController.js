(function() {
	angular.module('onTrack')
	.controller('MainSettingsController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	function loadSettings(){
		 	 $http.get('api/settings')
		 		.success(function(data) {
		 			$scope.settings = data
		 		})
		 		.error(function(err) {
		 			console.log(err)
		 		})
	 	}

	 	$scope.deleteSetting = function(set){
	 		var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this setting!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/settings/' + set._id, {
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
				})
	 	}

	 	loadSettings()

	}])
}());