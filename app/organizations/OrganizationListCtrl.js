angular
  .module('portal.organizations')
  .controller('OrganizationListCtrl', function(
    $scope, Restangular
  ) {

    var Orgs = Restangular.service('organizations');

    $scope.organizations = Orgs.getList().$object;

  });
