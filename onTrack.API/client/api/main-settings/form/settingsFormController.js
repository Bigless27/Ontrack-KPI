(function() {
	angular.module('onTrack')
	.controller('MainSettingsFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.submitSetting = function(setting) {
	 		console.log(setting)
	 	}



	}])
}());