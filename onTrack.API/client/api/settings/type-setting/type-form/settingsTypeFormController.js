(function() {
	angular.module('onTrack')
	.controller('SettingsTypeFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.err = false

	 	function getSettings(){
	 		$http.get('api/type-settings')
	 			.success(function(data){
	 				$scope.settings = data
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	$scope.submitSetting = function(setting) {
	 		var allTypes = $scope.settings.map(s => s.type.toLowerCase())
	 		if (allTypes.includes(setting.type.toLowerCase())){
	 			$scope.oops = 'Type is already being used, add a subtype in the view'
	 			$scope.err = true
	 		}
	 		else{
		 		$http.post('api/type-settings', setting)
		 			.success(function(data) {
		 				$scope.typeSettings = data
		 				$state.reload()
		 			})
		 			.error(function(err) {
		 				console.log(err)
		 			})
	 		}
	 	}

	 	getSettings()
	}])
}());