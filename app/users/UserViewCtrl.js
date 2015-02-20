function UserViewCtrl(
  $scope, $stateParams, UserService, OrganizationService
) {
  var vm = this;

  vm.user = {};
  vm.orgs = [];

  init();

  function init() {
    UserService.getUserById($stateParams.id).then(function(user) {
      vm.user = user;
    });

    OrganizationService
      .getOrganizationsByUserId($stateParams.id)
      .then(function(orgs) {
        vm.orgs = orgs;
      });
  }
}

angular
  .module('portal.users')
  .controller('UserViewCtrl', UserViewCtrl);
