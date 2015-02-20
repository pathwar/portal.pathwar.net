angular
  .module('portal.users')
  .controller('UserViewCtrl', function(
    $scope, $stateParams, UserService, OrganizationService
  ) {

    UserService.getUserById($stateParams.id).then(function(user) {
      $scope.user = user;
    });

    OrganizationService
      .getOrganizationsByUserId($stateParams.id)
      .then(function(orgs) {
        $scope.orgs = orgs;
      });

  });
