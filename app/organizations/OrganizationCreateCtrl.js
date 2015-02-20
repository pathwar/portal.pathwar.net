angular
  .module('portal.organizations')
  .controller('OrganizationCreateCtrl', function(
    $scope, $state, SessionService, OrganizationService, Restangular
  ) {

    SessionService.getSessions().then(function(sessions) {
      $scope.sessions = sessions;
    });

    $scope.formData = {};

    $scope.create = function() {
      var org = angular.copy($scope.formData);
      org.session = org.session._id;

      OrganizationService.create(org).then(function(response) {
        $state.transitionTo('crud.list');
      });
    };

  });
