function OrganizationListCtrl(
  Restangular
) {
  var vm = this;

  vm.organizations = [];

  init();

  /** Retrieve all organizations */
  /** TODO: only current session */
  function init() {
    Restangular.service('organizations')
      .getList().then(function(orgs) {
        vm.organizations = orgs;
      });
  }
}

angular
  .module('portal.organizations')
  .controller('OrganizationListCtrl', OrganizationListCtrl);
