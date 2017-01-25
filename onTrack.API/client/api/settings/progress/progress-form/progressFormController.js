(function() {
	angular.module('onTrack')
	.controller('ProgressFormController', ['$scope', '$http', '$stateParams', '$window', '$state',
		function($scope, $http, $stateParams, $window, $state) {

			$scope.submit = function(data) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.progressForm.$invalid){return;}
				var token = $window.sessionStorage['jwt']
				

				var progress = Object.assign({}, data)
				
				$http.post('api/progress-settings', progress) 
				 .then(response => {
				 	$state.reload()
				 })
				 .catch(response => {
				 	console.log(response)
				 })
			}
	}])
}());