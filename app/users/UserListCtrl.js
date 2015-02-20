function UserListCtrl($scope, Restangular) {
  var vm = this;

  vm.users = [];

  init();

  function init() {
    var Users = Restangular.service('users');

    Users.getList().then(function(users) {
      vm.users = users;
    });
  }
}

angular
  .module('portal.users')
  .controller('UserListCtrl', UserListCtrl);
