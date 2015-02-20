function OrganizationCreateCtrl(
  $scope, $state, SessionService, OrganizationService, Restangular
) {
  var vm = this;

  vm.sessions = [];
  vm.formData = {};

  vm.create = create;

  init();

  /** Retrieve user sessions */
  function init() {
    SessionService.getSessions().then(function(sessions) {
      vm.sessions = sessions;
    });
  }

  /** Create the organization */
  function create(formData) {
    var org = angular.copy(formData);
    org.session = org.session._id;

    OrganizationService.create(org).then(function(response) {
      //TODO: Switch to newly created organization
      $state.transitionTo('organizations.list');
    });
  };

}

angular
  .module('portal.organizations')
  .controller('OrganizationCreateCtrl', OrganizationCreateCtrl);
