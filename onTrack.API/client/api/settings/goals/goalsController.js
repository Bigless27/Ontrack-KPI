(function() {
	angular.module('onTrack')
	.controller('GoalsController', ['$scope', '$state', '$window', '$http', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {
		
	

	}])

	.directive('goalsFormat', function($compile, $http) {
		return {
			restrict: 'A',
			controller: function($scope, $element, $attrs, $stateParams) {
				function getGoals() {
					var tableHtml = []

					$http.get('api/goals')
						.success(function(data) {
							$scope.ids = data.map(x => x._id)
							$scope.idCounter = 0
							$scope.goals = data.map(x => x.any)
							$scope.goals.forEach(goal => {
								tableHtml.push(generateTable(goal))
							})
							$('#goal').append($compile(tableHtml.join(''))($scope))

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
							"<th>Value<div style ='margin: 0px 5px' ui-sref = 'goalsView({id: ids[" + $scope.idCounter+ "]})' class = 'btn btn-default'>View</div></th>" +
					"</tr>" +
					rowCreator(keys, values) +
					"</table>"

					$scope.idCounter ++
					return tableLayout
				}

				function rowCreator(keys, values) {
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