(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'multipleSelect', 'xeditable', 'ngTagsInput'])
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
					.state('main.createClient', {
						url: '/createClient',
						templateUrl: 'client/api/client/form/client-form-partial.html',
						controller: 'ClientFormController'
					})
					.state('main.createUser', {
						url: '/createUser',
						templateUrl: 'client/api/users/form/user-form-partial.html',
						controller: 'UserFormController'
					})
					.state('client', {
						url: '/client/:id',
						templateUrl: 'client/api/client/client-partial.html',
						controller: 'ClientController'
					})
					.state('client.kpiCreate', {
						url: '/kpi/:id',
						templateUrl: 'client/api/client/kpi/form/kpi-form-partial.html',
						controller: 'KPIFormController'
					})
					.state('client.promotionCreate', {
						url: '/client/:id',
						templateUrl: 'client/api/client/promotions/form/promotions-form-partial.html',
						controller: 'PromotionFormController'
					})
					.state('client.settingCreate',{
						url: 'client/:id',
						templateUrl: 'client/api/client/settings/settings-create-partial.html',
						controller: 'ClientController'
					})
					.state('client.addUser', {
						templateUrl:'client/api/client/admin/admin-add-partial.html',
						controller: 'AddUserController'
					})
					.state('client.addAdmin', {
						templateUrl:'client/api/client/admin/admin-add-partial.html',
						controller: 'AdminController'
					})
					.state('clientSetting', {
						url: '/client/:clientid/settings/:settingid',
						templateUrl: 'client/api/client/settings/settings-partial.html',
						controller: 'ClientSettingController'
					})
					.state('kpi', {
						url: '/client/:clientid/kpis/:kpiid',
						templateUrl: 'client/api/client/kpi/kpi-partial.html',
						controller: 'KPIController'
					})
					.state('promotion', {
						url: '/client/:clientid/promotions/:promoid',
						templateUrl: 'client/api/client/promotions/promotions-partial.html',
						controller: 'PromotionController'
					})
					.state('user', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UserController'
					})
					.state('user.activityCreate', {
						templateUrl: 'client/api/users/activity/form/activity-form-partial.html',
						controller: 'ActivityFormController'
					})
					.state('setting', {
						templateUrl: 'client/api/main-settings/settings-partial.html',
						controller: 'MainSettingsController',
						url: '/settings'
					})
					.state('setting.settingCreate',{
						templateUrl: 'client/api/main-settings/form/settings-form-partial.html',
						controller: 'MainSettingsFormController',
						url: '/create'
					})

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
	.controller('ClientController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
		
			$scope.removeAdmin = function(admin) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/clients/' + $stateParams['id'] + '/updateAdmin', admin, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$scope.client = data
				})
				.error(function(err) {
					console.log(err)
				})
			}

			$scope.removeUser = function(user) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/clients/' + $stateParams['id'] + '/updateUser', user, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$scope.client = data
				})
				.error(function(err) {
					console.log(err)
				})
			}

			$scope.deleteClient = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this client!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/clients/' + $stateParams['id'],
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
				return updateClient(data, 'name')
			}

			function updateClient(data, field) {
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.client[field] = data

				$http.put('/api/clients/' + $stateParams['id'], $scope.client,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					var params = {clientid: $stateParams['clientid'], kpiid: $stateParams['kpiid'] }
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})

			}



			function getClient(){
				$http.get('/api/clients/' + $stateParams['id'])
					.success(function(data) {
						$scope.client = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			function getClients() {
				$http.get('api/clients')
					.success(function(data) {
						$scope.nameArr = []
						data.forEach(function(client){
							$scope.nameArr.push(client.name)
						})

					})
					.error(function(err) {
						console.log(err);
					})
			}

			getClients()

			getClient()

		
	}])
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

			function getClients() {
				$http.get('api/clients')
					.success(function(data) {
						$scope.clients = data
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

			getUsers() 
			getClients()

			$scope.optionsList = [
			  {id: 1,  name : "Java"},
			  {id: 2,  name : "C"},
			  {id: 3,  name : "C++"},
			  {id: 4,  name : "AngularJs"},
			  {id: 5,  name : "JavaScript"}
			];




			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}
		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('MainSettingsController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	function loadSettings(){
		 	 $http.get('api/settings')
		 		.success(function(data) {
		 			$scope.settings = data
		 		})
		 		.error(function(err) {
		 			console.log(err)
		 		})
	 	}

	 	$scope.deleteSetting = function(set){
	 		var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this setting!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/settings/' + set._id, {
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
				})
	 	}

	 	loadSettings()

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
	.controller('AddUserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

		$scope.add = function(data){
			var token = $window.sessionStorage['jwt']

			var client = {usersClient:[]}

			// push users active back in
			$scope.client.usersClient.forEach(function(user) {
				client.usersClient.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
			})

			// check duplicates
			data.users.forEach(function(user){
				if (client.usersClient.filter(function(e){return e.email == user.email}).length === 0) {
				 	client.usersClient.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
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

		$scope.optionsList = []

		getUsers()



		
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
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/users/' + $stateParams.id)
					.success(function(data){
						$state.go('main' )
					})
					.error(function(err) {
						console.log(err)
					})
				})
			}

			$scope.deleteActivity = function(activity) {
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this activity!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/users/' + $stateParams.id
					 + '/activity/' + activity._id  )
					.success(function(data){
						$state.reload()
					})
					.error(function(err) {
						console.log(err)
					})
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
					})
					.error(function(err) {
						console.log(err)
					})
			}


			getUser()
		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('AdminController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		


		$scope.highlight = function(x) {
			if ($(`span:contains(${x.email})`).hasClass('check')){

				$(`span:contains(${x.email})`).parent().parent().css({"background-color":"transparent"})
				$(`span:contains(${x.email})`).removeClass('check')
			}
			else{
				$(`span:contains(${x.email})`).parent().parent().css({"background-color":"#a8a8a8"})
				$(`span:contains(${x.email})`).addClass('check')
			}

		}

		$scope.user = {

		  };

		$scope.uncheckAll = function() {
		    $scope.user.roles = [];
		};


		$scope.add = function(data){
				var token = $window.sessionStorage['jwt']

				var client = {admins:[]}


				$scope.client.admins.forEach(function(user) {
					client.admins.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				})


				data.users.forEach(function(user){
					if (client.admins.filter(function(e){return e.email == user.email}).length === 0) {
					 	client.admins.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
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

		$scope.optionsList = []

		getUsers()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('ClientFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createClient = function(data){
				var token = $window.sessionStorage['jwt']


				var names = $scope.clients.filter(function(client) {
					return client.name == data.name
				})

				if(names.length > 0){
					$scope.errorDisplay = true
					$scope.oops = 'Name is already taken!'
					return
				}
				else{
					$http.post('/api/clients' , data ,{
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var clientId = {'id': data._id + ''}
						$state.go('client',clientId )
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
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			 $scope.showStatus = function() {
			    var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
			    return ($scope.user.status && selected.length) ? selected[0].text : 'Not set'
			}

			$scope.deleteKpi = function() {
				var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this kpi!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/clients/' + $stateParams['clientid']
					 + '/kpis/' + $stateParams['kpiid'], {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var clientId = {'id': $stateParams['clientid'] + ''}
						$state.go('client',clientId )
					})
					.error(function(err) {
						console.log(err)
					})
				})
			}

			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateKpi(data, 'name')
			}

			$scope.types = [
				{value: 1, text: 'sale'},
				{value: 2, text: 'attendance'},
				{vale: 3, text: 'refferals'},
				{value: 4, text: 'calls'}

			]

			$scope.updateType = function(data) {
				if (data === ''){
					return 'Type is required'
				}
				return updateKpi(data, 'type')
			}

			//have type show on edit click
			$(document).on('click','.kpi-edit-button', function(){
				$('#kpi-type-edit')[0].click()
			} )
			


			$scope.updateValue = function(data) {
				if (data === ''){
					return 'Value is required'
				}
				return updateKpi(data, 'value')
			}


			function updateKpi(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.kpi[field] = data


				$http.put('/api/clients/' + $stateParams['clientid']
				 + '/kpis/' + $stateParams['kpiid'], $scope.kpi,{
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
  		
			function getKpi(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/kpis/' + $stateParams['kpiid'])
							.success(function(data) {
								$scope.kpi = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getKpi()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('PromotionController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {


			$scope.types = [
				{value: 1, text: 'sale'},
				{value: 2, text: 'attendance'},
				{vale: 3, text: 'refferals'},
				{value: 4, text: 'calls'}

			]

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
				return updatePromotion(data, 'type')
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

				$http.put('/api/clients/' + $stateParams['clientid']
				 + '/promotions/' + $stateParams['promoid'], $scope.promotion,{
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






			$scope.deletePromotion = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this client!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/clients/' + $stateParams['clientid']
					 + '/promotions/' + $stateParams['promoid'], {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var clientId = {'id': $stateParams['clientid'] + ''}
						$state.go('client',clientId )
					})
					.error(function(err) {
						console.log(err)
					})
				})

			}

			function getPromotions(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/promotions/' + $stateParams['promoid'])
							.success(function(data) {
								$scope.promotion = data;
								$scope.promotion['startDate'] = new Date($scope.promotion.startDate) 
								$scope.promotion['endDate'] =  new Date($scope.promotion.endDate)
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getPromotions()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('MainSettingsFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.submitSetting = function(setting) {
	 		$http.post('/api/settings', setting)
	 			.success(function(data) {
	 				$scope.settings = data
	 				$state.reload()
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('ActivityController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {



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
					$http.post('/api/users', user)
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
	.controller('KPIFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
			$scope.create = true
			$scope.err = false
			$scope.clientId = $stateParams['id']

			//for select button
			$scope.myList = [{
				    listValue: "sale"
			      }, {
			        listValue: "attendance"
			      }, {
			        listValue: "calls"
			      }, {
			        listValue: "refferals"
			 }]


			$scope.submitKpi = function(kpi) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}

				kpi['type'] = kpi['type']['listValue']
				var token = $window.sessionStorage['jwt']

				var names = $scope.client.kpis.filter(function(x) {
					return x.name == kpi.name
				})

				if(names.length > 0){
					$scope.err = true
					$scope.oops = 'Name is already taken!'
					return
				}
				else{
					$http.post('api/clients/' + $stateParams['id'] + '/kpis', kpi ,{
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
			}
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.create = true
			$scope.clientId = $stateParams['id']

			var today = new Date();
			$scope.minDate = today.toISOString();


			$scope.myList = [{
				    listValue: "sale"
			      }, {
			        listValue: "attendance"
			      }, {
			        listValue: "calls"
			      }, {
			        listValue: "referals"
			 }]
			
			$scope.submitPromotion = function(promotion) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}

				promotion['type'] = promotion['type']['listValue']
				var token = $window.sessionStorage['jwt']

				$http.post('api/clients/' + $stateParams['id'] + '/promotions', promotion ,{
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
(function() {
	angular.module('onTrack')
	.controller('ActivityFormController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

			$scope.userId = $stateParams['id']


			function getTypes() {
				$http.get('/api/settings')
					.success(function(data) {
						$scope.settings = data
						populateLists(data)
					})
					.error(function(data) {
						console.log(data)
					})
			}

			function populateLists(data){
				data.forEach(function(set) {
					$scope.typeList.push({listValue: set.type})			
				})
			}

			$scope.setSubtypes = function(){
				$scope.settings.forEach(function(set){
					if(set.type === $scope.activity.type.listValue){
						set.subTypes.forEach(function(sub){
							$scope.subList.push({listValue: sub.text})	
						})
					}
				})
			}


			$scope.typeList = []

			$scope.subList = []

			 $scope.nameList = [{
			 	listValue: "retail sale",
			 },{
			 	listValue: ""
			 }]

			 getTypes()

			 $scope.submitActivity = function(activity){
			 	var token = $window.sessionStorage['jwt']
			 	activity.userId = []
			 	activity.userId.push($stateParams['id'])
			 	activity['type'] = $scope.activity.type.listValue
			 	activity['subType'] = $scope.activity.subType.listValue

				$http.post('/api/users/' + $stateParams.id + '/activity', activity,{
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

	}])
}());