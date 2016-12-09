(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {

	}])
	.directive('goalFormat', function($compile, $http) {
		return {
			restrict: 'A',
			controller: function($scope, $element, $attrs) {
				
			}
		}
	})
}());