angular
  .module('portal.organizations')
  .controller('OrganizationViewCtrl', function(
    $scope, $stateParams, Restangular
  ) {

    var Orgs = Restangular.service('organizations');

    Orgs.one($stateParams.id).get().then(function(response) {
      $scope.organization = response.data;
    });

  });
