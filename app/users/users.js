var users = angular.module('portal.users', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular']);


users.config(function($stateProvider) {

  // CRUD
  $stateProvider.state('users', {
    url: '/users',
    abstract: true,
    templateUrl: 'users/views/main.tpl.html'
  })
  .state('users.list', {
    url: '',
    controller: 'UsersListCtrl',
    templateUrl: 'users/views/list.tpl.html'
  })
  .state('users.view', {
    url: '/:id',
    controller: 'UsersViewCtrl',
    templateUrl: 'users/views/view.tpl.html'
  })
  .state('users.add', {
    url: '/add',
    controller: 'UsersAddCtrl',
    templateUrl: 'users/views/form.tpl.html'
  })
  .state('users.edit', {
    url: '/:id/edit',
    controller: 'UsersEditCtrl',
    templateUrl: 'users/views/form.tpl.html'
  });

  // Other
  $stateProvider.state('login', {
    url: '^/login',
    controller: 'UsersLoginController',
    templateUrl: 'users/views/login.tpl.html'
  });

});


users.controller('UsersListCtrl', function($scope, Restangular) {

  var Users = Restangular.service('users');

  $scope.users = Users.getList().$object;

});


users.controller('UsersLoginController', function(
  $scope, $state, CurrentUserService
) {

  var credentials = {};

  $scope.credentials = credentials;

  $scope.login = function() {
    CurrentUserService.login($scope.credentials).then(function(user) {
      $scope.setCurrentUser(user);
      $state.transitionTo('home');
    });
  };

});


users.controller('UsersViewCtrl', function(
  $scope, $stateParams, UsersService, OrganizationsService
) {

  UsersService.getUserById($stateParams.id).then(function(user) {
    $scope.user = user;
  });

  OrganizationsService
    .getOrganizationsByUserId($stateParams.id)
    .then(function(orgs) {
      $scope.orgs = orgs;
    });

});


users.controller('UsersAddCtrl', function($scope, $state, Restangular) {

  var Users = Restangular.service('users');

  $scope.user = {};

  $scope.save = function() {
    Users.post($scope.user).then(function(response) {
      $state.transitionTo('users.list');
    });
  };

});


users.controller('UsersEditCtrl', function(
  $scope, $state, $stateParams, Restangular
) {

  var Users = Restangular.service('users');
  var user = Users.one($stateParams.id);

  user.get().then(function(response) {
    $scope.user = response.data;
  });

  $scope.save = function() {
    var toSend = _.pick($scope.user, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    user.patch(toSend).then(function(response) {
      $state.transitionTo('users.list');
    });
  };

});
