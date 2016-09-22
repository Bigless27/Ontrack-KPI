(function() {
	angular.module('onTrack')
	.controller('MainSettingsController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$http.get('api/settings')
	 		.success(function(data) {
	 			$scope.settings = data
	 		})
	 		.error(function(err) {
	 			console.log(err)
	 		})


	}])
}());