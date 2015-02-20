angular.module('portal.users', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular'
])
.config(function($stateProvider) {

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
