angular
  .module('portal.users')
  .config(function($stateProvider) {
    $stateProvider.state('users.account', {
      url: '^/account',
      controller: 'UserAccountCtrl',
      controllerAs: 'vm',
      templateUrl: 'users/account/views/account.tpl.html'
    });
  });
