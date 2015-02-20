angular
  .module('portal.organizations')
  .controller('OrganizationEditCtrl', function(
    $scope, $state, $stateParams, Restangular
  ) {

    var Orgs = Restangular.service('organizations');
    var organization = Orgs.one($stateParams.id);

    organization.get().then(function(response) {
      $scope.organization = response.data;
    });

    $scope.save = function() {
      var toSend = _.pick($scope.organization, function(value, key) {
        return key.charAt(0) != '_' || key == '_etag';
      });

      organization.patch(toSend).then(function(response) {
        $state.transitionTo('organizations.list');
      });
    };

  });
