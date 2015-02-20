angular
  .module('portal.users')
  .controller('UserListCtrl', function($scope, Restangular) {

    var Users = Restangular.service('users');

    $scope.users = Users.getList().$object;

  });
