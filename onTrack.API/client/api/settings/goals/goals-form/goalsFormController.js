(function() {
	angular.module('onTrack')
	.controller('GoalsFormController', ['$scope', '$state', '$window', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {

		$scope.tracker = 0

		$scope.addField = function() {
			$scope.tracker += 1
			$("<hr>" +
				"<div class = 'form-group'>" +
					"<lable for = 'key' class = 'control-label'>Key</label>" +
					"<div class = 'input-group'>" +
						"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
						"<input name = 'key' type = 'text' ng-model = goal.key" + $scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a key'>" +
					"</div>"+
				"</div>" +
				"<div class = form-group'>" +
					"<lable for = 'value' class = control-label'>Value</label>" +
					"<div class = 'input-group'>" +
						"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
						"<input name = 'value' type = 'text' ng-model = goal.value" + $scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a value'" + 
					"</div>" +
				"</div>"
			).insertBefore('#add-button')
		}

		$scope.submit = function(data) {
			console.log(data)
			console.log($scope.goal)
		}
	}])
}());