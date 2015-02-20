angular
  .module('portal.users')
  .controller('UserViewCtrl', function(
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
