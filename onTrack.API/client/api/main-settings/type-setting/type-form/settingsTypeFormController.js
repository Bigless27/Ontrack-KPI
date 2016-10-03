(function() {
	angular.module('onTrack')
	.controller('SettingsTypeFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.submitSetting = function(setting) {
	 		$http.post('/api/type-settings', setting)
	 			.success(function(data) {
	 				$scope.typeSettings = data
	 				$state.reload()
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}
	}])
}());