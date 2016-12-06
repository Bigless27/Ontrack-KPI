(function() {
	angular.module('onTrack')
	.controller('GoalsFormController', ['$scope', '$state', '$window', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {

		$scope.tracker = 0


		//the ng-model doesn't bing to the angular scope. look to make directive or compile
		$scope.addField = function() {
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

	.directive('addButton', function() {
			return{
				restrict: 'E',
				template: '<div add-fields class = "btn btn-default">Click to add key-value pair</div>',
				link: function(scope, elem, attrs) {
		
				}
			}

	})

	.directive('addFields', function($compile) {
		return function(scope, element, attrs) {
			var goalFormField = "<hr>" +
				"<div class = 'form-group'>" +
					"<lable for = 'key' class = 'control-label'>Key</label>" +
					"<div class = 'input-group'>" +
						"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
						"<input name = 'key' type = 'text' ng-model = goal.key" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a key'>" +
					"</div>"+
				"</div>" +
				"<div class = form-group'>" +
					"<lable for = 'value' class = control-label'>Value</label>" +
					"<div class = 'input-group'>" +
						"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
						"<input name = 'value' type = 'text' ng-model = goal.value" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a value'" + 
					"</div>" +
				"</div>";
			if(scope.tracker < 1) {
				angular.element(document.getElementById('space-for-buttons'))
					.append($compile(goalFormField)(scope))
			}

			element.bind("click", function(){
				scope.tracker++;
				angular.element(document.getElementById('space-for-buttons'))
					.append($compile(goalFormField)(scope))
			})
		}
	})

}());