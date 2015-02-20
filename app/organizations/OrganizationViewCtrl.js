angular
  .module('portal.organizations')
  .controller('OrganizationViewCtrl', function(
    $stateParams, Restangular
  ) {
    var vm = this;

    vm.organization = {};

    init();

    function init() {

      var Orgs = Restangular.service('organizations');

      Orgs.one($stateParams.id).get().then(function(response) {
        vm.organization = response.data;
      });
    }
  });
