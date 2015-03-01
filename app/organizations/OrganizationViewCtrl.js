angular
  .module('portal.organizations')
  .controller('OrganizationViewCtrl', function(
    $stateParams, Restangular, User, Organization
  ) {
    var vm = this;

    vm.organization = {};

    init();

    function init() {

      var Orgs = Restangular.service('organizations');

      Orgs.one($stateParams.id).get().then(function(response) {
        vm.organization = Organization.build(response.data);
      });

    }
  });
