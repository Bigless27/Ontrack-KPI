(function() {
	angular.module('onTrack')
	.controller('ProgressSettingController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

	 	function getSetting(){
	 		$http.get('api/progress-settings/' + $stateParams.id)
	 			.success(function(data){
	 				console.log(data)
	 				$scope.setting = data
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	getSetting()

	}])
}());