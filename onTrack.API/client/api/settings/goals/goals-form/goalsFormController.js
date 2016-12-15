(function() {
	angular.module('onTrack')
	.controller('GoalsFormController', ['$scope', '$state', '$window', '$http', 'arrToObject',
	function($scope, $state, $window, $http, arrToObject) {

		$scope.tracker = 0;

		$scope.submit = function(data) {
			$scope.$broadcast('show-errors-check-validity');

			if($scope.goalForm.$invalid){return;}

			var named = {'gsfName': data.name}
			delete data.name

			var data = arrToObject.create(Object.values(data))
			
			var dataJson = Object.assign(data, named)

			$http.post('api/goals', dataJson)
				.success(function(data) {
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})

		}
	}])

}());