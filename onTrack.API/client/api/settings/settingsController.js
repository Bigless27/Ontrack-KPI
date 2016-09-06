(function() {
	angular.module('onTrack')
	.controller('SettingController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			function getSettings(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/settings/' + $stateParams['settingid'])
							.success(function(data) {
								$scope.setting = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getSettings()

		
	}])
}());