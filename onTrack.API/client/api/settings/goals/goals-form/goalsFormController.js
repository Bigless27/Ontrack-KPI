(function() {
	angular.module('onTrack')
	.controller('GoalsFormController', ['$scope', '$state', '$window', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {

		$scope.tracker = 0

		$scope.submit = function(data) {
			console.log(data)
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

	.directive('removeOne', function() {
		return {
			restrict: 'E',
			template: '<div class = "btn btn-default">remove a pair</div>',
			link: function(scope, element, attrs) {
				element.bind('click', function() {
					$('#space-for-buttons').children().last().remove()
				})
			}
		}
	})

	.directive('addFields', function($compile) {
		return function(scope, element, attrs) {

			function goalFormField(i) {
				return "<div class = 'fieldForm'>"+
				"<hr>" +
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
				"</div>" +
			"</div>"
			}

			if(scope.tracker < 1) {
				angular.element(document.getElementById('space-for-buttons'))
					.append($compile(goalFormField(scope.tracker))(scope))
			}

			element.bind("click", function(){
				scope.tracker++;
				angular.element(document.getElementById('space-for-buttons'))
					.append($compile(goalFormField(scope.tracker))(scope))
			})
		}
	})

}());