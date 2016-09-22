(function() {
	angular.module('onTrack')
	.controller('MainSettingsFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.submitSetting = function(setting) {
	 		console.log(setting)
	 		$http.post('/api/settings', setting)
	 			.success(function(data) {
	 				$state.reload()
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}



	}])
}());