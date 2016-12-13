(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'multipleSelect', 'xeditable', 'ngTagsInput', 'ui.select', 
		'ngSanitize', 'autocomplete'])
	.config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider',
			function($stateProvider, $urlRouterProvider, showErrorsConfigProvider) {

				showErrorsConfigProvider.showSuccess(true)
				
				// States
				$urlRouterProvider.otherwise('login');
				$stateProvider
					.state('login', {
						url: '/login',
						templateUrl: 'client/api/login/login-partial.html',
						controller: 'LoginController'
					})
					.state('signUp', {
						url: '/signup',
						templateUrl: 'client/api/signup/signup-partial.html',
						controller: 'SignupController'
					})
					.state('main', {
						url: '/main',
						templateUrl: 'client/api/main/main-partial.html',
						controller: 'MainController',
						onEnter: ['$state', '$stateParams', '$location', '$window', function( $state, $stateParams, $location, $window){
							if($location.search().access_token){
								$window.sessionStorage.jwt = $location.search().access_token
								$location.url($location.path())
							}
						}]
					})
					.state('main.createTeam', {
						url: '/createTeam',
						templateUrl: 'client/api/team/form/team-form-partial.html',
						controller: 'TeamFormController'
					})
					.state('main.createUser', {
						url: '/createUser',
						templateUrl: 'client/api/users/form/user-form-partial.html',
						controller: 'UserFormController'
					})
					.state('main.promotionCreate', {
						url: '/team/:id',
						templateUrl: 'client/api/team/promotions/form/promotions-form-partial.html',
						controller: 'PromotionFormController'
					})
					.state('team', {
						url: '/team/:id',
						templateUrl: 'client/api/team/team-partial.html',
						controller: 'TeamController'
					})
					// .state('team.promotionCreate', {
					// 	url: '/team/:id',
					// 	templateUrl: 'client/api/team/promotions/form/promotions-form-partial.html',
					// 	controller: 'PromotionFormController'
					// })
					.state('team.addUser', {
						templateUrl:'client/api/team/admin/admin-add-partial.html',
						controller: 'AddUserController'
					})
					.state('team.addAdmin', {
						templateUrl:'client/api/team/admin/admin-add-partial.html',
						controller: 'AdminController'
					})
					.state('team.switchOwner', {
						templateUrl: 'client/api/team/owner/owner-partial.html',
						controller: 'OwnerController'
					})
					.state('promotion', {
						url: '/team/:id/promotions/:promoId',
						templateUrl: 'client/api/team/promotions/promotions-partial.html',
						controller: 'PromotionController'
					})
					.state('user', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UserController'
					})
					.state('setting', {
						url: '/settings',
						templateUrl: 'client/api/settings/settings-partial.html',
						controller: 'MainSettingsController'
					})
					.state('setting.settingTypeCreate',{
						url: '/createType',
						templateUrl: 'client/api/settings/type-setting/type-form/settings-type-form-partial.html',
						controller: 'SettingsTypeFormController'
					})
					.state('setting.settingProgressCreate', {
						url: '/createProgress',
						templateUrl: 'client/api/settings/progress-setting/progress-form/settings-progress-form-partial.html',
						controller: 'SettingsProgressFormController'
					})
					.state('settingProgress', {
						url: '/progressSetting/:id',
						templateUrl: 'client/api/settings/progress-setting/progress-setting-partial.html',
						controller: "ProgressSettingController"
					})
					.state('settingType', {
						url: '/typeSetting/:id', 
						templateUrl: 'client/api/settings/type-setting/type-setting-partial.html',
						controller: 'TypeSettingController'
					})
					.state('progress', {
						url: '/users/:id/progress/:progressId',
						templateUrl: 'client/api/users/progress/progress-partial.html',
						controller: 'ProgressController'
					})
					.state('goals', {
						url: '/goals',
						templateUrl: 'client/api/settings/goals/goals-partial.html',
						controller: 'GoalsController'
					})
					.state('goals.create', {
						url: '/create',
						templateUrl: 'client/api/settings/goals/goals-form/goals-form-partial.html',
						controller: 'GoalsFormController'
					})
					.state('goalsView', {
						url: '/goals/:id',
						templateUrl: 'client/api/settings/goals/goals-view/goals-view-partial.html',
						controller: 'GoalsViewController'
					})

					// .state('activity', {
					// 	url: '/activity',
					// 	templateUrl: 'client/api/activity/activity-partial.html',
					// 	controller: 'ActivityController'
					// })
					// .state('activity.create', {
					// 	url: '/createActivity',
					// 	templateUrl: 'client/api/activity/form/activity-form-partial.html',
					// 	controller: 'ActivityFormController'
					// })
					// // look to rename this state to something a little more Restful
					// .state('activityView', {
					// 	url: '/activity/:id',
					// 	templateUrl: 'client/api/activity/view/activity-view-partial.html',
					// 	controller: 'ActivityViewController'
					// })

			}])
			.run(function(editableOptions) {
			  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
			})
}());
(function() {
  var showErrorsModule;

  showErrorsModule = angular.module('ui.bootstrap.showErrors', []);

  showErrorsModule.directive('showErrors', [
    '$timeout', 'showErrorsConfig', '$interpolate', function($timeout, showErrorsConfig, $interpolate) {
      var getShowSuccess, getTrigger, linkFn;
      getTrigger = function(options) {
        var trigger;
        trigger = showErrorsConfig.trigger;
        if (options && (options.trigger != null)) {
          trigger = options.trigger;
        }
        return trigger;
      };
      getShowSuccess = function(options) {
        var showSuccess;
        showSuccess = showErrorsConfig.showSuccess;
        if (options && (options.showSuccess != null)) {
          showSuccess = options.showSuccess;
        }
        return showSuccess;
      };
      linkFn = function(scope, el, attrs, formCtrl) {
        var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses, trigger;
        blurred = false;
        options = scope.$eval(attrs.showErrors);
        showSuccess = getShowSuccess(options);
        trigger = getTrigger(options);
        inputEl = el[0].querySelector('.form-control[name]');
        inputNgEl = angular.element(inputEl);
        inputName = $interpolate(inputNgEl.attr('name') || '')(scope);
        if (!inputName) {
          throw "show-errors element has no child input elements with a 'name' attribute and a 'form-control' class";
        }
        inputNgEl.bind(trigger, function() {
          blurred = true;
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$watch(function() {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, function(invalid) {
          if (!blurred) {
            return;
          }
          return toggleClasses(invalid);
        });
        scope.$on('show-errors-check-validity', function() {
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$on('show-errors-reset', function() {
          return $timeout(function() {
            el.removeClass('has-error');
            el.removeClass('has-success');
            return blurred = false;
          }, 0, false);
        });
        return toggleClasses = function(invalid) {
          el.toggleClass('has-error', invalid);
          if (showSuccess) {
            return el.toggleClass('has-success', !invalid);
          }
        };
      };
      return {
        restrict: 'A',
        require: '^form',
        compile: function(elem, attrs) {
          if (attrs['showErrors'].indexOf('skipFormGroupCheck') === -1) {
            if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
              throw "show-errors element does not have the 'form-group' or 'input-group' class";
            }
          }
          return linkFn;
        }
      };
    }
  ]);

  showErrorsModule.provider('showErrorsConfig', function() {
    var _showSuccess, _trigger;
    _showSuccess = false;
    _trigger = 'blur';
    this.showSuccess = function(showSuccess) {
      return _showSuccess = showSuccess;
    };
    this.trigger = function(trigger) {
      return _trigger = trigger;
    };
    this.$get = function() {
      return {
        showSuccess: _showSuccess,
        trigger: _trigger
      };
    };
  });

}).call(this);

(function() {
	angular.module('onTrack')
	.directive('showErrors', function() {
		return{
			restrict: 'A',
			require: '^form',
			link: function(scope, el, attrs, formCtrl) {
				var inputEl = el[0].querySelector("[name]");
				//find text box element that has the name
				var inputNgEl = angular.element(inputEl);
				var inputName = inputNgEl.attr('name')
				// all that to get the name of input field
				inputNgEl.bind('blur', function() {
					el.toggleClass('has-error', 
						formCtrl[inputName].$invalid)
				})

				scope.$on('show-errors-check-validity', function() {
					el.toggleClass('has-error', formCtrl[inputName].$invalid)
				})
			}
		}
	})
}());
(function() {
	angular.module('onTrack')
		.factory('arrToObject', function() {
			var service = {};
			service.create = function(values) {
				var obj = {}
				while (values.length) {
					var kv = values.splice(0,2)
					obj[kv[0]] = kv[1]
				}
				return obj
			}
			return service
		})

}());
(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

			$scope.logUserIn = function(user) {
				$scope.$broadcast('show-errors-check-validity');


				if($scope.userForm.$invalid){return;}

				$scope.err = true

				$http.post('auth/signin', user)
					.success(function(data) {
						$scope.err = false
						$window.sessionStorage.jwt = data['token']
						$state.go('main')
					})
					.error(function(error) {
						$scope.err = true
						$scope.errMessage = error
					})
			}

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('MainController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			function getTeams() {
				$http.get('api/teams')
					.success(function(data) {
						$scope.teams = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.success(function(data) {
						$scope.users = data
					})
					.error(function(err) {
						console.log(err)
					})
			}

			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}
		
			getUsers() 
			getTeams()
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('MainSettingsController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.selectAll = function(){
	 		if($scope.user.users.length < $scope.optionsList.length){
		 		$scope.user.users = $scope.optionsList
		 		$('#user-select-button')[0].innerHTML = 'Clear'
	 		}
	 		else{
	 			$scope.user.users = []
	 			$('#user-select-button')[0].innerHTML = 'Select All'
	 		}
	 	}

	 	$scope.optionsList = []

	 	function getUsers(){
			$http.get('/api/users')
				.success(function(users) {
					users.forEach(function(user){
						if(user){
							$scope.optionsList.push(
									{firstName: user.firstName, lastName: user.lastName, 
										email: user.email, fullName: user.firstName + ' ' + user.lastName}
								)
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.error(function(err) {
					console.log(err);
				})
		}

	 	function loadTypeSettings(){
		 	 $http.get('api/type-settings')
		 		.success(function(data) {
		 			$scope.typeSettings = data
		 		})
		 		.error(function(err) {
		 			console.log(err)
		 		})
	 	}

	 	function loadProgressSettings(){
	 		$http.get('api/progress-settings')
	 			.success(function(data) {
	 				$scope.progressSettings = data
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}


	 	getUsers()
	 	loadTypeSettings()
	 	loadProgressSettings()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('SignupController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {
		$scope.signUp = function(user) {
			$scope.$broadcast('show-errors-check-validity')

			if ($scope.userForm.$invalid){return;}
			$scope.err = false
			$http.post('api/users', user)
				.success(function(data) {
					$scope.err = false
					$window.sessionStorage.jwt = data['token']
					$state.go('main')
				})
				.error(function(error) {
					$scope.err = true
					$scope.errMessage = error.message
				})
		}
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('TeamController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
		
			$scope.removeAdmin = function(admin) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams['id'] + '/removeAdmin', admin, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$scope.team = data
				})
				.error(function(err) {
					console.log(err)
				})
			}

			$scope.removeUser = function(user) {
				//this automatically makes two requests. Check to see if you need to. If not then only issue one update
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams.id + '/removeAdmin', user , {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data) {
						$http.put('/api/teams/' + $stateParams.id + '/removeUser', user, {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							})
							.success(function(data) {
								$scope.team = data
							})
							.error(function(err) {
								console.log(err)
						})
					})
					.error(function(err) {
						console.log(err)
				})
			}

			$scope.deleteTeam = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this team!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function(){
					$http.delete('/api/teams/' + $stateParams['id'],
					 {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						$state.go('main')
					})
					.error(function(err) {
						console.log(err)
					})
				}).catch(function(){
					return
				})
			}

			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}

			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is required'
				}
			
				if($scope.nameArr.includes(data)){
					return 'Name is already taken'
				}
				return updateTeam(data, 'name')
			}

			function updateTeam(data, field) {
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.team[field] = data

				$http.put('/api/teams/' + $stateParams['id'], $scope.team,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})

			}



			function getTeam(){
				$http.get('/api/teams/' + $stateParams['id'])
					.success(function(data) {
						$scope.team = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			function getTeams() {
				$http.get('api/teams')
					.success(function(data) {
						$scope.nameArr = []
						data.forEach(function(team){
							$scope.nameArr.push(team.name)
						})

					})
					.error(function(err) {
						console.log(err);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.success(function(data) {
						$scope.users = []
						data.forEach(function(){
							$scope.users.push({name: data.firstName + ' ' + data.lastName})
						})

					})
					.error(function(err) {
						console.log(err)
					})
			}

			getTeams()
			getTeam()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('AddUserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

		$scope.add = function(data){
			var token = $window.sessionStorage['jwt']

			var team = {users:[]}

			// push users active back in
			$scope.team.users.forEach(function(user) {
				team.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
			})

			// check duplicates
			data.users.forEach(function(user){
				if (team.users.filter(function(e){return e.email == user.email}).length === 0) {
				 	team.users.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				}
			})

			$http.put('/api/teams/' + $stateParams['id'], team, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.success(function(data) {
				$state.reload() //look into making this two way bound

			})
			.error(function(err) {
				console.log(err)
			})
		}



		function getTeam() {
			$http.get('/api/teams/' + $stateParams.id)
				.success(function(data) {
					$scope.team = data	
					getUsers()
				})
				.error(function(err) {
					console.log(err)
				})
		}

		function getUsers(){
			$http.get('/api/users')
				.success(function(users) {
					users.forEach(function(user){
						if(user){
							var userEmails = $scope.team.users.map(x => x.email)
							if(!userEmails.includes(user.email)) {
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.error(function(err) {
					console.log(err);
				})
		}

		$scope.optionsList = []

		getTeam()
		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('UserController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			$scope.deleteUser = function() {
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this user!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function() {
					if ($scope.teamOwners.indexOf($scope.user.email) >= 0) {
						swal({
								title: 'User is an owner of a team!',
								text: 'Please transfer ownership of team before deleting user!',
								type: 'error'
							})
						return
					}
					else {
						var token = $window.sessionStorage['jwt']
						$http.delete('/api/users/' + $stateParams.id, {
							headers: {
								'Authorization' : `Bearer ${token}`
							}
						})
						.success(function(data){
							swal({
									title: 'User Deleted',
									type: 'success'
								})
							if (data) {
								$window.sessionStorage.clear()
								$state.go('login')
							}
							else {	
								$state.go('main')
							}
						})
						.error(function(err) {
							console.log(err)
						})
					}
				})
				.catch(function() {
					return
				})
			}


			$(document).on('click','.user-email-edit-button', function(){
				$('#user-email-edit')[0].click()
			})
			.on('click', '.user-dateJoined-edit-button', function() {
				$('#user-dateJoined-edit')[0].click()
			})

			$scope.updateFirstName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateUser(data, 'firstName')
			}

			$scope.updateLastName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateUser(data, 'lastName')
			}

			$scope.updateEmail = function(data) {
				if(data === ''){
					return 'Email is required'
				}
				return updateUser(data, 'email')
			}

			$scope.updateDateJoined = function(data) {
				if (data === '') {
					return 'Date Joined is required'
				}
				return updateUser(data, 'dateJoined')
			}

			$scope.getSettingName = function(id) {
				var matchSetting = $scope.user.settingProgress.filter(function(set) {
					return set._id === id
				})
				return matchSetting[0].name
			}

			$scope.getSettingType = function(id) {
				var matchSetting = $scope.user.settingProgress.filter(function(set) {
					return set._id === id
				})
				return matchSetting[0].type
			}

			function updateUser(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.user[field] = data

				$http.put('/api/users/' + $stateParams['id'], $scope.user,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
			}

			function getUser() {
				$http.get('/api/users/' + $stateParams.id)
					.success(function(data){
						$scope.user = data
						getTeams()
					})
					.error(function(err) {
						console.log(err)
					})
			}

			//ui-select
			function populateTypes() {
				$http.get('api/type-settings')
					.success(function(data) {
						$scope.settings = data
						var unUniqueTypes = $scope.settings.map(function(x){
							return x.type
						})
						$scope.typeList = [...new Set(unUniqueTypes)]
					})
					.error(function(err) {
						console.log(err)
					})
			}

			function getTeams() {
				$http.get('api/teams/findTeams/' + $scope.user.email)
					.success(function(data) {
						if (data.length > 0) {
							var owners = data.map(x => x.owner).reduce((a, b) => a.concat(b))
							$scope.teamOwners = owners.map(x => x.email)
						}
						else {
							$scope.teamOwners = []
						}
						
					})
					.error(function(err) {
						console.log(err)
					})
			}

			populateTypes()
			getUser()
		
	}])
}());
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
(function() {
	angular.module('onTrack')
	.controller('ProgressSettingController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

	 	$scope.deleteSetting = function() {
				var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Setting!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function(){
					$http.delete('/api/progress-settings/'+ $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						$state.go('setting')
					})
					.error(function(err) {
						console.log(err)
					})
				}).catch(function() {
					return
				})
			}

		$scope.updateName = function(name) {
			if (name === ''){
				return 'Name is required'
			}
			updateSetting(name, 'name')
		}

		$scope.updateType = function(data) {
			if (data === ''){
				return 'Type is required'
			}
			else if (($scope.setting.type == data)) {
				return 
			}
			return updateSetting(data, 'type')
		}

		$scope.updateSubtypes = function(data) {
			return updateSetting(data, 'subTypes')
		}

		$scope.updateUsers = function(users) {
			//This can definetly be made better. Needs to update users and delete users promotions
			if($scope.setting.users.length > users.length){
				var editRefs = $scope.setting.users.filter(function(user){
					if (!users.map(x => x.userId).includes(user.userId)) {
						return user
					}
				})
				editRefs.forEach(function(r) {
					var token = $window.sessionStorage['jwt']
					var newUser = $scope.users.find(x => x._id === r.userId) //find the actually user from the subdocument of prog setting
					var delIndex = newUser.settingProgress.indexOf($scope.setting._id)
					newUser.settingProgress.splice(delIndex, 1)
					$http.get('api/users/' + r.userId)
						.success(function(userProgEdit) {
							var progId = userProgEdit.progress.filter(function(prog) {
									if(prog.settingId === $scope.setting._id) {
										return prog
									}
							}).map(x => x._id)

							var delProgIndex = newUser.progress.indexOf(progId[0])
							newUser.progress.splice(delProgIndex, 1)

							$http.put('api/users/' + r.userId, newUser, {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							})
							.success(function(data){
								$http.delete('api/users/' + data._id + '/progress/' + progId[0])
									.success(function(data) {
										$state.reload()
									})
									.error(function(err) {
										console.log(err)
									})
							})
							.error(function(err) {
								console.log(err)
							})
						})
						.error(function(err) {
							console.log(err)
						})
				})
			}
			updateSetting(users, 'users')
		}


		function updateSetting(data, field){
			$scope.setting[field] = data
			$http.put('api/progress-settings/' + $stateParams.id, $scope.setting)
				.success(function(data){
					if (field == 'type') {
						$scope.updateSubtypes([])
					}
					else {
						$state.reload()
					}
				})
				.error(function(err) {
					console.log(err)
				})
		}

		function getUsers() {
			$http.get('api/users')
				.success(function(data) {
					$scope.users = data
					sortUsers(data)
				})
				.error(function(err) {
					console.log(err)
				})
		}

		function sortUsers(users){
			var sub = []
			users.forEach(function(user) {
				sub.push({userId: user._id, fullName: user.firstName + ' ' + user.lastName, email: user.email,
							firstName: user.firstName, lastName: user.lastName})
			})	
			$scope.optionsList = sub 
		}

		function sortInitUsers(set){
			var initMS = []
			set.users.forEach(function(user) {
				initMS.push({userId: user.userId, fullName: user.firstName + ' ' + user.lastName,
							firstName: user.firstName, lastName: user.lastName})
			})
			$scope.initUsers = initMS
		}

		$scope.userTags = false
		$scope.subTags = false

		$scope.toggleEditSubs = function() {
			if ($scope.subTags) {
				$scope.subTags = false
			}
			else {
				$scope.subTags = true
			}
		}

		$scope.toggleEditUsers = function() {
			if ($scope.userTags) {
				$scope.userTags = false
			}
			else {
				$scope.userTags = true
			}
		}

		//have type show on edit click
		$(document).on('click','#progress-type-edit-button', function(){
			$('#progress-type-edit')[0].click()
		} )

	 	function getSetting(){
	 		$http.get('api/progress-settings/' + $stateParams.id)
	 			.success(function(data){
	 				$http.get('api/type-settings')
	 					.success(function(set) {
	 						$scope.noUsers = false
	 						$scope.noSubs = false
			 				$scope.setting = data
			 				if ($scope.setting.users.length === 0){
			 					$scope.noUsers = true
			 				}
			 				else if($scope.setting.subTypes.length === 0){
			 					$scope.noSubs = true
			 				}
			 				$scope.typeSetting = set
			 				getUniqueTypes()
				 			getUniqueSubtypes()
			 				sortInitUsers(data)

	 					})
	 					.error(function(err) {
	 						console.log(err)
	 					})

	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	function getUniqueTypes() {
	 		var typeCopy = $scope.typeSetting
	 		var unUniqueTypes = typeCopy.map(function(x){
				return x.type
			})
			$scope.typeList = [...new Set(unUniqueTypes)]
	 	}

	 	function getUniqueSubtypes() {
	 		var unSetSubtypes = $scope.typeSetting.filter(function(set) {
	 			return set.type === $scope.setting.type
	 		})
	 		var subTypeStrings = $scope.setting.subTypes.map(x => x.name)
	 		var subArr = []
	 		unSetSubtypes[0].subTypes.forEach(function(sub) {
	 				if (!subTypeStrings.includes(sub.text)){
		 				subArr.push({name: sub.text})
	 				}
	 		})
	 		$scope.subTypes = subArr
	 	}

	 	$scope.afterRemoveItem = function(item) {
		 		var subStrings = $scope.subTypes.map(x => x.name)
		 		if (subStrings.includes(item.name)) {
		 			return
		 		}
		 		else{
			 		$scope.subTypes.push({name: item.name})
		 		}
		 }


	 	getSetting()
	 	getUsers()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('TypeSettingController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

	 		$scope.deleteSetting = function() {
				var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Setting!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function(){
					$http.delete('/api/type-settings/'+ $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						$state.go('setting')
					})
					.error(function(err) {
						console.log(err)
					})
				}).catch(function() {
					return
				})
			}

			$scope.userTags = false

			$scope.toggleEdit = function() {
				if($scope.userTags){
					$scope.userTags = false
				}
				else{
					$scope.userTags = true
				}
			}

			$scope.updateType = function(type){
				updateSetting(type, 'type')
			}

			$scope.updateSubtype = function(sub){
				updateSetting(sub, 'subTypes')
			}

			function updateSetting(data, field){
				var token = $window.sessionStorage['jwt']
				$scope.setting[field] = data
				$http.put('api/type-settings/' + $stateParams.id, $scope.setting, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
			}

	 		function getSetting(){
	 			$http.get('api/type-settings/' + $stateParams.id)
	 				.success(function(data) {
	 					$scope.noSubTypes = false
	 					$scope.setting = data
	 					if ($scope.setting.subTypes.length === 0){
	 						$scope.noSubTypes = true
	 					}
	 				})
	 				.error(function(err) {
	 					console.log(err)
	 				})
	 		}

	 		getSetting()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('AdminController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		
		$scope.user = {

		  };

		$scope.uncheckAll = function() {
		    $scope.user.roles = [];
		};


		$scope.add = function(data){
				var token = $window.sessionStorage['jwt']

				var client = {admins:[], users:[]}

				$scope.client.admins.forEach(function(user) {
					client.admins.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				})

				$scope.client.users.forEach(function(user) {
					client.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				})


				data.users.forEach(function(user){
					if (client.admins.filter(function(e){return e.email == user.email}).length === 0) {
					 	client.admins.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
					}
					if(client.users.filter(function(e){return e.email == user.email}).length === 0) {
						client.users.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
					}
				})


				$http.put('/api/clients/' + $stateParams['id'], client, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data) {
					$state.reload() //look into making this two way bound

				})
				.error(function(err) {
					console.log(err)
				})
		}

		function getUsers(){
			$http.get('/api/users')
				.success(function(users) {
					users.forEach(function(user){
						if(user){
							var userEmails = $scope.client.admins.map(x => x.email)
							if(!userEmails.includes(user.email)) {
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.error(function(err) {
					console.log(err);
				})
		}

		$scope.optionsList = []

		getUsers()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('TeamFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createTeam = function(data){
				var token = $window.sessionStorage['jwt']

				var names = $scope.teams.filter(function(team) {
					return team.name == data.name
				})

				if(names.length > 0){
					$scope.errorDisplay = true
					$scope.oops = 'Name is already taken!'
					return
				}
				else {
					$http.post('/api/teams' , data ,{
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var teamId = {'id': data._id + ''}
						$state.go('team',teamId )
					})
					.error(function(err) {
						$scope.errorDisplay = true
						$scope.oops = err.message
					})
				}
			}

			function getAllUsers() {
				$http.get('/api/users')
					.success(function(users){
						users.forEach(function(user){
							if(user){
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
							else{
								$scope.optionsList = [{name: 'No users'}]
							}
						})
					})
					.error(function(err){
						console.log(err)
					})
			}

			getAllUsers()

			$scope.optionsList = [];

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('OwnerController', ['$scope', '$state', '$http', '$window', '$stateParams', 
		function($scope, $state, $http, $window, $stateParams) {

			$scope.optionsList = []
			$scope.success = false

			$scope.transfer = function(data) {
				var token = $window.sessionStorage['jwt']
				$scope.team['owner'] = [data]

				$http.put('api/teams/' + $stateParams.id, $scope.team, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data) {
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				}) 
			}

			// function getUsers() {
			// 	$http.get('api/users')
			// 		.success(function(users) {
			// 			users.forEach(function(user){
			// 				if(user){
			// 					if (user.email !== $scope.team.owner[0].email){
			// 						$scope.optionsList.push(
			// 								{firstName: user.firstName, lastName: user.lastName, userId: user._id, 
			// 									email: user.email, fullName: user.firstName + ' ' + user.lastName}
			// 						)
			// 					}
			// 				}
			// 				else{
			// 					$scope.optionsList = [{name: 'No users'}]
			// 				}
			// 			})
			// 		})
			// 		.error(function(err) {
			// 			console.log(err)
			// 		})
			// }

			function getTeam() {
				$http.get('api/teams/' + $stateParams.id)
					.success(function(data) {
						$scope.team = data

						data.admins.forEach(function(user){
							if(user){
								if (user.email !== $scope.team.owner[0].email){
									$scope.optionsList.push(
											{firstName: user.firstName, lastName: user.lastName, userId: user._id, 
												email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
								}
							}
							else{
								$scope.optionsList = [{fullName: 'No Users, only admins can be owners'}]
							}
						})
						if ($scope.optionsList.length == 0) {
							$scope.optionsList = [{fullName: 'No Users, only admins can be owners'}]	
						}
						// getUsers()
					})
					.error(function(err) {
						console.log(err)
					})
			}

			getTeam()
		}])
} ());
(function() {
	angular.module('onTrack')
	.controller('PromotionController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			//have type show on edit click
			$(document).on('click','.promotion-startDate-edit-button', function(){
				$('#promotion-startDate-edit')[0].click()
			})
			.on('click','.promotion-endDate-edit-button', function(){
				$('#promotion-endDate-edit')[0].click()
			})
			.on('click', '.promotion-edit-type-button', function(){
				$('#promotion-type-edit')[0].click()
			})


			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updatePromotion(data, 'name')
			}


			$scope.updateType = function(data) {
				if (data === ''){
					return 'Type is required'
				}
				else if (($scope.promotion.type == data)) {
					return 
				}
				return updatePromotion(data, 'type')
			}

			$scope.updateSubtypes = function(data) {
				return updatePromotion(data,'subTypes')			
			}

			$scope.updateCompletionValue = function(data) {
				var reg = new RegExp('^\\d+$')

				if (data === ''){
					return 'Value is required'
				}
				else if (!reg.test(data)){
					return 'Value must be an integer'
				}
				data['completionValue'] = parseInt(data['completionValue'])
				return updatePromotion(data, 'completionValue')
			}

			$scope.updateDescription = function(data) {
				if (data === '') {
					return 'Description is required'
				}
				return updatePromotion(data, 'description')
			}

			$scope.updateStartDate = function(data) {
				var today = new Date();
				  if (data < today.toISOString()) {
				  	return "Start Date can't be in the past"
				  }
				  return updatePromotion(data, 'startDate')
			}

			$scope.updateEndDate = function(data) {
				if ($scope.promotion.startDate.toISOString() > data){
					return 'End date must come after start date'
				}
				return updatePromotion(data, 'endDate')
			}

			function updatePromotion(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.promotion[field] = data

				$http.put('/api/teams/' + $stateParams.id
				 + '/promotions/' + $stateParams.promoId, $scope.promotion,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					if (field == 'type') {
						$scope.updateSubtypes([])
					}
					else {
						$state.reload()
					}
				})
				.error(function(err) {
					console.log(err)
				})

			}


			$scope.deletePromotion = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this team!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function(){
					$http.delete('/api/teams/' + $stateParams.id
					 + '/promotions/' + $stateParams.promoId, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var teamId = {'id': $stateParams['id'] + ''}
						$state.go('team',teamId )
					})
					.error(function(err) {
						console.log(err)
					})
				}).catch(function() {
					return
				})
			}

			function getUniqueTypes() {
		 		var typeCopy = $scope.settings
		 		var unUniqueTypes = typeCopy.map(function(x){
					return x.type
				})
				$scope.typeList = [...new Set(unUniqueTypes)]
	 		}

		 	function getUniqueSubtypes() {
		 		var unSetSubtypes = $scope.settings.filter(function(set) {
		 			return set.type === $scope.promotion.type
		 		})
		 		var subTypeStrings = $scope.promotion.subTypes.map(x => x.name)
		 		var subArr = []
		 		unSetSubtypes[0].subTypes.forEach(function(sub) {
		 				if (!subTypeStrings.includes(sub.text)){
			 				subArr.push({name: sub.text})
		 				}
		 		})
		 		$scope.subTypes = subArr
		 	}

		 	$scope.afterRemoveItem = function(item) {
		 		var subStrings = $scope.subTypes.map(x => x.name)
		 		if (subStrings.includes(item.name)) {
		 			return
		 		}
		 		else{
			 		$scope.subTypes.push({name: item.name})
		 		}
		 	}

			$scope.subTags = false

			$scope.toggleEdit = function() {
				if($scope.subTags){
					$scope.subTags = false
				}
				else{
					$scope.subTags = true
				}
			}

			function getPromotions(){
				$http.get('api/teams/' + $stateParams.id 
						+ '/promotions/' + $stateParams.promoId)
							.success(function(data) {
								$scope.promotion = data;
								$scope.promotion['startDate'] = new Date($scope.promotion.startDate) 
								$scope.promotion['endDate'] =  new Date($scope.promotion.endDate)
								getTypes()
							})
							.error(function(err) {
								console.log(err);
							})
			}

			function getTypes(){
				$http.get('api/type-settings')
					.success(function(data){
						$scope.typeList = data.map(x => x.type)
						$scope.noSubtypes = false
						if ($scope.promotion.subTypes.length === 0){
							$scope.noSubtypes = true
						}
						$scope.settings = data
						getProgresses()
						getUniqueTypes()
						getUniqueSubtypes()
					})
					.error(function(err){
						console.log(err)
					})
			}


			//this below needs to be refactored to grab the users from the team!

			function getTeams(matches) {
				//you have the setting Id
				$http.get('api/teams/' + $stateParams.id)
					.success(function(data) {
						var theUsers = []
						data.users.forEach(function(user) {
							//match the user's email to the mathcing progress email
							matches.forEach(function(prog) {
								if (prog.users.map(x => x.email).includes(user.email)) {
									theUsers.push(prog.users)
								}
							})
								
						})
						var usersQuery = theUsers.reduce((x,y) => {x.concat(y)})
					})
					.error(function(err){
						console.log(err)
					})
			}

			function findUsers() {
				$http.get('api/users/findUsers/' + $stateParams.id)
					.success(function(data) {
						$scope.matchingUsers = matchProgressToPromotion(data)
					})
					.error(function(err) {
						console.log(err)
					})
			}

			function getProgresses() {
				$http.get('api/progress-settings')
					.success(function(progs) {
						findUsers()
						
					})
					.error(function(err) {
						console.log(err)
					})
			}

			// This grabs progress of matching types and subtypes. The subtypes are only
			// matched if there is an exact match on them
			function matchProgressToPromotion(users) {

				var subMatchArr = []

				var matchedTypesUsers = users.filter((user) => {return user.settingProgress.filter(prog =>  prog.type == $scope.promotion.type)})
				matchedTypesUsers.forEach(function(user) {
					user['settingProgress'] = user.settingProgress.filter(set => set.type === $scope.promotion.type)
					if (user.settingProgress.length > 0) {
						subMatchArr.push(user)
					}
				})
				
				// var matchedTypesUsers = users.filter((user) => {return user.settingProgress.filter(prog =>  prog.type == $scope.promotion.type)})
				// // The above filters the users the have a progress of a matched type!
				var theProgresses = []

				subMatchArr.forEach(function(user) {
					if (!$scope.noSubtypes) {
						user.settingProgress[0].subTypes.forEach(function(sub){
							if (sub) {
								if ($scope.promotion.subTypes.includes(sub.name)) {
									theProgresses.push(user)
								}
							}
						})
					}
					else {
						var matchedProg = user.progress.filter(prog => prog.settingId === user.settingProgress[0]._id)
						user['progress'] = matchedProg
						theProgresses.push(user)
						
					}
				})
				return theProgresses
			}

			$scope.getPercentage = function(x,y) {
				if (x === 0) {
					return 0
				}
				else {
				return (x/y * 100).toFixed(2)
				}
			}

			getPromotions()		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('UserFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createUser = function(user) {
				
				var duplicate = $scope.users.filter(function(x){
					return x.email == user.email
				})

				if (duplicate.length > 0){
					$scope.oops = 'Email is already taken!'
					$scope.errorDisplay = true
					return
				}
				else{
					$http.post('api/users', user)
						.success(function(data){
							$state.reload()

						})
						.error(function(err) {
							console.log(err)
						})
				}
			}
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('ProgressController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
			
			function getProgress() {
				$http.get('api/users/' + $stateParams.id + '/progress/' + $stateParams.progressId)
					.success(function(data) {
						$scope.progress = data
						$http.get('api/progress-settings/' + data.settingId)
							.success(function(data){
								$scope.setting = data
							})
							.error(function(err) {
								console.log(err)
							})
					})
					.error(function(err) {
						console.log(err)
					})
			}


			$scope.updateValue = function(data) {
				if (data < 0) {
					return "Value can't be negative"
				}
				updateProgress(data)
			}

			function updateProgress(data) {
				$scope.progress['value'] = data

				$http.put('api/users/' + $stateParams.id + '/progress/' + $stateParams.progressId, $scope.progress)
					.error(function(err) {
						console.log(err)
					})

			}

			getProgress()


	}])
}());
var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('MovieRetriever', function($http, $q, $timeout){
  var MovieRetriever = new Object();

  MovieRetriever.getmovies = function(i) {
    var moviedata = $q.defer();
    var movies;

    var someMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel"];

    var moreMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel", "The Way Way Back", "Before Midnight", "Only God Forgives", "I Give It a Year", "The Heat", "Pacific Rim", "Pacific Rim", "Kevin Hart: Let Me Explain", "A Hijacking", "Maniac", "After Earth", "The Purge", "Much Ado About Nothing", "Europa Report", "Stuck in Love", "We Steal Secrets: The Story Of Wikileaks", "The Croods", "This Is the End", "The Frozen Ground", "Turbo", "Blackfish", "Frances Ha", "Prince Avalanche", "The Attack", "Grown Ups 2", "White House Down", "Lovelace", "Girl Most Likely", "Parkland", "Passion", "Monsters University", "R.I.P.D.", "Byzantium", "The Conjuring", "The Internship"]

    if(i && i.indexOf('T')!=-1)
      movies=moreMovies;
    else
      movies=moreMovies;

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

  return MovieRetriever;
});

app.controller('MyCtrl', function($scope, MovieRetriever){

  $scope.movies = MovieRetriever.getmovies("...");
  $scope.movies.then(function(data){
    $scope.movies = data;
  });

  $scope.getmovies = function(){
    return $scope.movies;
  }

  $scope.doSomething = function(typedthings){
    console.log("Do something like reload data with this: " + typedthings );
    $scope.newmovies = MovieRetriever.getmovies(typedthings);
    $scope.newmovies.then(function(data){
      $scope.movies = data;
    });
  }

  $scope.doSomethingElse = function(suggestion){
    console.log("Suggestion selected: " + suggestion );
  }

});

/* --- Made by justgoscha and licensed under MIT license --- */

var app = angular.module('autocomplete', []);

app.directive('autocomplete', function() {
  var index = -1;

  return {
    restrict: 'E',
    scope: {
      searchParam: '=ngModel',
      suggestions: '=data',
      onType: '=onType',
      onSelect: '=onSelect',
      autocompleteRequired: '=',
      noAutoSort: '=noAutoSort'
    },
    controller: ['$scope', function($scope){
      // the index of the suggestions that's currently selected
      $scope.selectedIndex = -1;

      $scope.initLock = true;

      // set new index
      $scope.setIndex = function(i){
        $scope.selectedIndex = parseInt(i);
      };

      this.setIndex = function(i){
        $scope.setIndex(i);
        $scope.$apply();
      };

      $scope.getIndex = function(i){
        return $scope.selectedIndex;
      };

      // watches if the parameter filter should be changed
      var watching = true;

      // autocompleting drop down on/off
      $scope.completing = false;

      // starts autocompleting on typing in something
      $scope.$watch('searchParam', function(newValue, oldValue){

        if (oldValue === newValue || (!oldValue && $scope.initLock)) {
          return;
        }

        if(watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null) {
          $scope.completing = true;
          $scope.searchFilter = $scope.searchParam;
          $scope.selectedIndex = -1;
        }

        // function thats passed to on-type attribute gets executed
        if($scope.onType)
          $scope.onType($scope.searchParam);
      });

      // for hovering over suggestions
      this.preSelect = function(suggestion){

        watching = false;

        // this line determines if it is shown
        // in the input field before it's selected:
        //$scope.searchParam = suggestion;

        $scope.$apply();
        watching = true;

      };

      $scope.preSelect = this.preSelect;

      this.preSelectOff = function(){
        watching = true;
      };

      $scope.preSelectOff = this.preSelectOff;

      // selecting a suggestion with RIGHT ARROW or ENTER
      $scope.select = function(suggestion){
        if(suggestion){
          $scope.searchParam = suggestion;
          $scope.searchFilter = suggestion;
          if($scope.onSelect)
            $scope.onSelect(suggestion);
        }
        watching = false;
        $scope.completing = false;
        setTimeout(function(){watching = true;},1000);
        $scope.setIndex(-1);
      };


    }],
    link: function(scope, element, attrs){
        console.log(scope.noAutoSort)

      setTimeout(function() {
        scope.initLock = false;
        scope.$apply();
      }, 250);

      var attr = '';

      // Default atts
      scope.attrs = {
        "placeholder": "start typing...",
        "class": "",
        "id": "",
        "inputclass": "",
        "inputid": ""
      };

      for (var a in attrs) {
        attr = a.replace('attr', '').toLowerCase();
        // add attribute overriding defaults
        // and preventing duplication
        if (a.indexOf('attr') === 0) {
          scope.attrs[attr] = attrs[a];
        }
      }

      if (attrs.clickActivation) {
        element[0].onclick = function(e){
          if(!scope.searchParam){
            setTimeout(function() {
              scope.completing = true;
              scope.$apply();
            }, 200);
          }
        };
      }

      var key = {left: 37, up: 38, right: 39, down: 40 , enter: 13, esc: 27, tab: 9};

      document.addEventListener("keydown", function(e){
        var keycode = e.keyCode || e.which;

        switch (keycode){
          case key.esc:
            // disable suggestions on escape
            scope.select();
            scope.setIndex(-1);
            scope.$apply();
            e.preventDefault();
        }
      }, true);

      document.addEventListener("blur", function(e){
        // disable suggestions on blur
        // we do a timeout to prevent hiding it before a click event is registered
        setTimeout(function() {
          scope.select();
          scope.setIndex(-1);
          scope.$apply();
        }, 150);
      }, true);

      element[0].addEventListener("keydown",function (e){
        var keycode = e.keyCode || e.which;

        var l = angular.element(this).find('li').length;

        // this allows submitting forms by pressing Enter in the autocompleted field
        if(!scope.completing || l == 0) return;

        // implementation of the up and down movement in the list of suggestions
        switch (keycode){
          case key.up:

            index = scope.getIndex()-1;
            if(index<-1){
              index = l-1;
            } else if (index >= l ){
              index = -1;
              scope.setIndex(index);
              scope.preSelectOff();
              break;
            }
            scope.setIndex(index);

            if(index!==-1)
              scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

            scope.$apply();

            break;
          case key.down:
            index = scope.getIndex()+1;
            if(index<-1){
              index = l-1;
            } else if (index >= l ){
              index = -1;
              scope.setIndex(index);
              scope.preSelectOff();
              scope.$apply();
              break;
            }
            scope.setIndex(index);

            if(index!==-1)
              scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

            break;
          case key.left:
            break;
          case key.right:
          case key.enter:
          case key.tab:

            index = scope.getIndex();
            // scope.preSelectOff();
            if(index !== -1) {
              scope.select(angular.element(angular.element(this).find('li')[index]).text());
              if(keycode == key.enter) {
                e.preventDefault();
              }
            } else {
              if(keycode == key.enter) {
                scope.select();
              }
            }
            scope.setIndex(-1);
            scope.$apply();

            break;
          case key.esc:
            // disable suggestions on escape
            scope.select();
            scope.setIndex(-1);
            scope.$apply();
            e.preventDefault();
            break;
          default:
            return;
        }

      });
    },
    template: '\
        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
          <input\
            type="text"\
            ng-model="searchParam"\
            placeholder="{{ attrs.placeholder }}"\
            class="{{ attrs.inputclass }}"\
            tabindex="{{ attrs.tabindex }}"\
            id="{{ attrs.inputid }}"\
            name="{{ attrs.name }}"\
            ng-required="{{ autocompleteRequired }}" />\
          <ul ng-if="!noAutoSort" ng-show="completing && (suggestions | filter:searchFilter).length > 0">\
            <li\
              suggestion\
              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion | highlight:searchParam"></li>\
          </ul>\
          <ul ng-if="noAutoSort" ng-show="completing && (suggestions | filter:searchFilter).length > 0">\
            <li\
              suggestion\
              ng-repeat="suggestion in suggestions | filter:searchFilter track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion | highlight:searchParam"></li>\
          </ul>\
        </div>'
  };
});

app.filter('highlight', ['$sce', function ($sce) {
  return function (input, searchParam) {
    if (typeof input === 'function') return '';
    if (searchParam) {
      var words = '(' +
            searchParam.split(/\ /).join(' |') + '|' +
            searchParam.split(/\ /).join('|') +
          ')',
          exp = new RegExp(words, 'gi');
      if (words.length) {
        input = input.replace(exp, "<span class=\"highlight\">$1</span>");
      }
    }
    return $sce.trustAsHtml(input);
  };
}]);

app.directive('suggestion', function(){
  return {
    restrict: 'A',
    require: '^autocomplete', // ^look for controller on parents element
    link: function(scope, element, attrs, autoCtrl){
      element.bind('mouseenter', function() {
        autoCtrl.preSelect(attrs.val);
        autoCtrl.setIndex(attrs.index);
      });

      element.bind('mouseleave', function() {
        autoCtrl.preSelectOff();
      });
    }
  };
});

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
					}
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
(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams', 'scopeService', 'arrToObject',
	function($scope, $state, $http, $stateParams, scopeService, arrToObject) {

		$scope.box = false;

		$scope.tracker = 1


		// $scope.dummy = scopeService.getValue()

		// $scope.$watch(function() {return scopeService.getValue()}, function(newValue, oldValue) {
		// 	$scope.dummy = newValue
		// })

		function getGoal() {
			$http.get('api/goals/' + $stateParams.id)
				.success(data => {
					var holder = []

					var keys = Object.keys(data.any)
				    var values = Object.values(data.any)

				    keys.forEach(function(key, i) {
				    	holder.push({'key': key, 'value': values[i]})
				    })
					$scope.goal = holder
				})
				.error(err => {
					console.log(err)
				})
		} 

		getGoal()

		$scope.editGoal = function() {
			$scope.box = true
		}

		$scope.submit = function(goal) {

			var holder = []
			var goalArr = Object.values(goal).filter(x => { return typeof(x) === 'string'})
			var newGoal = {}
			var updateGoal = null
			if (goalArr.length) {
				var nestedObj = goal.filter(x => {return typeof(x) === 'object'})

				nestedObj.forEach(x => {
					newGoal[x.key] = x.value
				})

				updatedGoal = Object.assign(newGoal,arrToObject.create(goalArr))

				// var i = len/2
				// var counter = 2

				// while (i) {
				// 	var key = goal['key' + counter]
				// 	var value = goal['value' + counter]
				// 	console.log(key)
				// 	holder.push({key: value})
				// 	counter++
				// 	i --
				// }
			}
			else{	
				goal.forEach(x => {
					newGoal[x.key] = x.value
				})
			}

			if(updatedGoal) {
				newGoal = updatedGoal
			}
			
			$http.put('api/goals/' + $stateParams.id, newGoal)	
				.success(data => {
					$state.reload()
				})
				.error(err => {	
					console.log(err)
				})
		}

		$scope.cancel = function() {
			$scope.box = false
			$state.reload()
		}

		$scope.deleteGoal = function() {
			swal({
				title: "Are you sure?",
				text: "You will not be able to recover this goal",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				html: false
			}).then(function() {
				$http.delete('api/goals/' + $stateParams.id)
				.success(function(data) {
					$state.go('goals')
				})
				.error(function(err) {
					console.log(err)
				})
			}).catch(e => {})
		}
	}])

	.factory('scopeService', function() {

		var model = {}
		var counter = 0

		return {
			getValue: function() {
				return model.value
			},
			updateValue: function(value) {
				model.value = value;
			}
		}
	})

	.directive('removeGoalRow', function() {
		return {
			restrict: 'E',
			template: "<div class = 'btn btn-default'>Remove a Pair</div>"
		}
	})

	.directive('addGoal', function() {
		return{
			restrict: 'E',
			template: '<div add-fields-table class = "btn btn-default">Click to add key-value pair</div>'
		}
	})


	// .directive('goalFormat', function($stateParams, $http, $compile, scopeService) {
	// 	return {
	// 		restrict: 'A',
	// 		controller: function($scope, $element, $attrs) {
	// 			function getGoal() {
	// 				var tableHtml = []	
	// 				$http.get('api/goals/' + $stateParams.id)
	// 					.success(function(data) {
	// 						scopeService.updateValue(data)
	// 						tableHtml.push(generateTable(data.any))
	// 						$('#goal').append($compile(tableHtml.join(''))($scope))
	// 					})
	// 					.error(function(err) {
	// 						console.log(err)
	// 					})
	// 			}

	// 			function generateTable(goal) {
	// 				var keys = Object.keys(goal)
	// 				var values  = Object.values(goal)

	// 				var tableLayout = "<table class = 'table table-bordered'>" +
	// 				"<tr>" +
	// 						"<th>Key</th>" +
	// 						"<th>Value</th>" +
	// 				"</tr>" +
	// 				rowCreator(keys, values) +
	// 				"</table>"

	// 				return tableLayout
	// 			}

	// 			function rowCreator(keys, values) {
	// 				var formedColumns = []

	// 				keys.forEach(function(key, i) {
	// 					formedColumns.push(
	// 						"<tr>" +  
	// 						"<td class = editable>" + "<span ng-if = '!box'>" + key + "</span>" + "<input ng-if = 'box' ng-model = 'dummy.any[0][key]'>" + "</td>" +
	// 						"<td class = editable>" + "<span ng-if = '!box'>" + values[i] + "</span>" + "<input ng-if = 'box' ng-model = 'dummy.any." + key + "'>" + "</td>" +
	// 						"</tr>")
	// 				})
	// 				return formedColumns.join('')
	// 			}

	// 			getGoal()
	// 		}
	// 	}
	// })
}());
(function() {
	angular.module('onTrack')
	.controller('SettingsProgressFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {


	 	$scope.selectAll = function(){
	 		if($scope.setting.users.length < $scope.optionsList.length){
		 		$scope.setting.users = $scope.optionsList
		 		$('#user-select-button')[0].innerHTML = 'Clear'
	 		}
	 		else{
	 			$scope.setting.users = []
	 			$('#user-select-button')[0].innerHTML = 'Select All'
	 		}
	 	}

	 	$scope.subTypesList = []

	 	$scope.optionsList = []

	 	function getUsers(){
			$http.get('/api/users')
				.success(function(users) {
					users.forEach(function(user){
						if(user){
							$scope.optionsList.push(
									{ fullName: user.firstName + ' ' + user.lastName, email: user.email,
										userId: user._id, firstName: user.firstName,
										lastName: user.lastName
									}
								)
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.error(function(err) {
					console.log(err);
				})
		}

		function getSettings() {
			$http.get('api/type-settings')
				.success(function(data) {
					$scope.typeSettings = data
					setTypes()
				})
				.error(function(err){
					console.log(err)
				})
		}

		//for select button
		function setTypes() {
			var settingsCopy = $scope.typeSettings
			$scope.types = [...new Set(settingsCopy.map(function(set){
				return set.type
			}))]

		}


		getSettings()

		$scope.typeChecker = false

		$scope.checkType = function() {
			if(!$scope.setting.type) {
				$scope.typeChecker = true
			}
		}

		$scope.setSubtypes = function(){
			$scope.subTypesList = []
			if(!$scope.setting.type) return
			else{
					$scope.typeChecker = false
					$scope.typeSettings.forEach(function(set){
					if(set.type === $scope.setting.type){
						set.subTypes.forEach(function(sub){
							$scope.subTypesList.push({name: sub.text})
						})
					}
				})
			}
		}

	 	$scope.submitProgressSetting = function(setting) {
	 		$http.post('/api/progress-settings', setting)
	 			.success(function(data) {
	 				$scope.progressSettings = data
	 				$state.reload()
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	getUsers()
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('SettingsTypeFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.err = false

	 	function getSettings(){
	 		$http.get('api/type-settings')
	 			.success(function(data){
	 				$scope.settings = data
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	$scope.submitSetting = function(setting) {
	 		var allTypes = $scope.settings.map(s => s.type.toLowerCase())
	 		if (allTypes.includes(setting.type.toLowerCase())){
	 			$scope.oops = 'Type is already being used, add a subtype in the view'
	 			$scope.err = true
	 		}
	 		else{
		 		$http.post('api/type-settings', setting)
		 			.success(function(data) {
		 				$scope.typeSettings = data
		 				$state.reload()
		 			})
		 			.error(function(err) {
		 				console.log(err)
		 			})
	 		}
	 	}

	 	getSettings()
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
			
			$scope.teamId = $stateParams['id']

			var today = new Date();
			$scope.minDate = today.toISOString();


			function getSettings(){
				$http.get('api/type-settings')
					.success(function(data){
						$scope.settings = data
						setTypes()
					})
					.error(function(err) {
						console.log(err)
					})
			}

			function setTypes() {
				var unUniqueTypes = $scope.settings.map(function(set){
					return set.type
				})
				$scope.typeList = [...new Set(unUniqueTypes)]
			}

			$scope.subTypesList = [];

			$scope.typeChecker = false

			$scope.checkType = function(){
				if(!$scope.promotion.type) {
					$scope.typeChecker = true
				}
			}

			$scope.setSubtypes = function() {
				$scope.subTypesList = []
				if(!$scope.promotion.type) return
				else{
					$scope.typeChecker = false
					$scope.settings.forEach(function(set){
						if(set.type === $scope.promotion.type){
							set.subTypes.forEach(function(sub){
								$scope.subTypesList.push({name: sub.text})
							})
						}
					})
				}
			}

			getSettings()

			
			$scope.submitPromotion = function(promotion) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.promotionForm.$invalid){return;}
				var token = $window.sessionStorage['jwt']

				$http.post('api/teams/' + $stateParams['id'] + '/promotions', promotion ,{
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
				.success(function(data){
						$state.reload()
				})
				.error(function(err){
					console.log(err)
				})
			}
	}])
}());