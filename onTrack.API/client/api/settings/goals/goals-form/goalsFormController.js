(function() {
	angular.module('onTrack')
	.controller('GoalsFormController', ['$scope', '$state', '$window', '$http', 'arrToObject',
	function($scope, $state, $window, $http, arrToObject) {

		$scope.tracker = 0;

		$scope.submit = function(data) {
			if (!data) {
				return
			}
			var dataJson = arrToObject.create(Object.values(data))

			$http.post('api/goals', dataJson)
				.success(function(data) {
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})

		}
	}])


	.directive('addButton', function() {
			return{
				restrict: 'E',
				template: '<div add-fields class = "btn btn-default">Click to add key-value pair</div>'
			}
	})

	.directive('removeOne', function() {
		return {
			restrict: 'E',
			template: '<div class = "btn btn-default">remove a pair</div>',
			link: function(scope, element, attrs) {
				element.bind('click', function() {
					if (!$('#space-for-buttons').children().length) {
						$('.table-removable').last().remove()
						if(scope.goal) {
							scope.goal.pop()
						}
					}
					$('#space-for-buttons').children().last().remove()
				})
			}
		}
	})

	.service('removeModelAssociation', function() {

	})

	.directive('addFields', function($compile) {
		return function(scope, element, attrs) {

			function goalFormField(i) {
				return "<div class = 'fieldForm'>"+
				"<hr>" +
				"<form id = 'edit' name = 'goalForm' role = 'form' data-toggle = 'validator'>" +
					"<div class = 'form-group' show-errors>" +
						"<lable for = 'key' class = 'control-label'>Key</label>" +
						"<div class = 'input-group'>" +
							"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
							"<input name = 'key' type = 'text' ng-model = goal.key" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a key' required>" +
						"</div>"+
						"<p class= 'help-block' ng-if = 'goalForm.key.$error.required'>Key is required</p>" +
					"</div>" +
					"<div class = 'form-group' show-errors>" +
						"<lable for = 'value' class = control-label'>Value</label>" +
						"<div class = 'input-group'>" +
							"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
							"<input name = 'value' type = 'text' ng-model = goal.value" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a value' required>" + 
						"</div>" +
						"<p class = 'help-block' ng-if = 'goalForm.value.$error.required'>Value is required</p>" +
					"</div>" +
				"</form>" +
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