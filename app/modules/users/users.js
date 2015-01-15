var users = angular.module('portal.users', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular']);

users.config(function($stateProvider) {

  $stateProvider.state('users', {
    url: '/users',
    abstract: true,
    templateUrl: 'modules/users/views/main.tpl.html'
  })
  .state('users.list', {
    url: '',
    controller: 'UsersListCtrl',
    templateUrl: 'modules/users/views/list.tpl.html',
  })
  .state('users.view', {
    url: '/:id',
    controller: 'UsersViewCtrl',
    templateUrl: 'modules/users/views/view.tpl.html',
  })
  .state('users.add', {
    url: '/add',
    controller: 'UsersAddCtrl',
    templateUrl: 'modules/users/views/form.tpl.html',
  })
  .state('users.edit', {
    url: '/:id/edit',
    controller: 'UsersEditCtrl',
    templateUrl: 'modules/users/views/form.tpl.html',
  });

});

users.controller('UsersListCtrl', function($scope, Restangular) {

  var Users = Restangular.service('users');

  $scope.users = Users.getList().$object;

});

users.controller('UsersViewCtrl', function($scope, $stateParams, Restangular) {

  var Users = Restangular.service('users');

  Users.one($stateParams.id).get().then(function(response) {
    $scope.user = response.data;
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

users.controller('UsersEditCtrl', function($scope, $state, $stateParams, Restangular) {

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
