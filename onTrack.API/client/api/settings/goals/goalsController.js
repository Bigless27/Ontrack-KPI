(function() {
	angular.module('onTrack')
	.controller('GoalsController', ['$scope', '$state', '$window', '$http', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {
		
	

	}])

	.directive('goalFormat', function($compile, $http) {
		return {
			restrict: 'A',
			controller: function($scope, $element, $attrs) {
				function getGoals() {
					var tableHtml = []

					$http.get('api/goals')
						.success(function(data) {
							$scope.goals = data.map(x => x.any)
							var solution = []
							$scope.goals.forEach(goal => {
								tableHtml.push(generateTable(goal))
							})
							$('#goal').append(tableHtml.join(''))
						})
						.error(function(err) {
							console.log(err)
						})
				}

				function generateTable(goal) {
					var keys = Object.keys(goal)
					var values  = Object.values(goal)

					var tableLayout = "<table class = 'table table-bordered'>" +
					"<tr>" +
							"<th>Key</th>" +
							"<th>Value<div style ='margin: 0px 5px' class = 'btn btn-default'>View</div></th>" +
					"</tr>" +
					tableCreator(keys, values) +
					"</table>"

					return tableLayout

				}

				function tableCreator(keys, values) {
					var formedColumns = []

					keys.forEach(function(key, i) {
						formedColumns.push(
							"<tr>" +  
							"<td>" + key + "</td>" +
							"<td>" + values[i] + "</td>" +
							"</tr>")
					})

					return formedColumns.join('')
				}

				getGoals()
			}
		}
	})

}());