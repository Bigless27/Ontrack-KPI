(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams', 
	function($scope, $state, $http, $stateParams) {

		// function getUser() {
		// 	$http.get('api/goals/' + $stateParams.id)
		// 		.success(function(data) {
		// 			goalTable.create(data)
		// 		})
		// 		.error(function(err) {
		// 			console.log(err)
		// 		})
		// }
		// getUser()
	}])

	.directive('goalFormat', function($stateParams, $http, $compile) {
		return {
			restrict: 'A',
			controller: function($scope, $element, $attrs) {
				function getGoal() {
					var tableHtml = []	
					$http.get('api/goals/' + $stateParams.id)
						.success(function(data) {
							tableHtml.push(generateTable(data.any))
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
							"<th>Value</th>" +
					"</tr>" +
					rowCreator(keys, values) +
					"</table>"

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

				getGoal()
			}
		}
	})
}());