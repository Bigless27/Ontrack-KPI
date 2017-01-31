(function() {
	angular.module('onTrack')
		.directive('addActivity', function() {
			return{
				restrict: 'E',
				template: '<div add-fields-table class = "btn btn-default">Click to add key-value pair</div>'
			}
		})

		.directive('addButtonActivity', function() {
				return{
					restrict: 'E',
					template: '<div add-fields-activity class = "btn btn-default">Click to add key-value pair</div>'
				}
		})

		.directive('removeOneActivity', function() {
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

		.directive('addFieldsActivity', function($compile) {
			return function(scope, element, attrs) {

				function activityFormField(i) {
					return "<div class = 'fieldForm'>"+
					"<hr>" +
					"<form id = 'edit' name = 'activityForm' role = 'form' data-toggle = 'validator'>" +
						"<div class = 'form-group' show-errors>" +
							"<lable for = 'key' class = 'control-label'>Key</label>" +
							"<div class = 'input-group'>" +
								"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
								"<input name = 'key' type = 'text' ng-model = activity.key" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a key' required>" +
							"</div>"+
							"<p class= 'help-block' ng-if = 'activityForm.key.$error.required'>Key is required</p>" +
						"</div>" +
						"<div class = 'form-group' show-errors>" +
							"<lable for = 'value' class = control-label'>Value</label>" +
							"<div class = 'input-group'>" +
								"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
								"<input name = 'value' type = 'text' ng-model = activity.value" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a value' required>" + 
							"</div>" +
							"<p class = 'help-block' ng-if = 'activityForm.value.$error.required'>Value is required</p>" +
						"</div>" +
					"</form>" +
					"</div>"
				}
				
				if(scope.tracker < 1) {
					angular.element(document.getElementById('space-for-buttons'))
						.append($compile(activityFormField(scope.tracker))(scope))
				}

				element.bind("click", function(){
					scope.tracker++;
					angular.element(document.getElementById('space-for-buttons'))
						.append($compile(activityFormField(scope.tracker))(scope))
				})
			}
		})
}());