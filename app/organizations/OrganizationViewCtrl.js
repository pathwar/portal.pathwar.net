angular
  .module('portal.organizations')
  .controller('OrganizationViewCtrl', function(
    $stateParams, OrganizationService, ScoringService
  ) {
    var vm = this;

    vm.organization = undefined;

    init();

    function init() {

      OrganizationService.getOrganizationById($stateParams.id).then(function(organization) {
        vm.organization = organization;

        ScoringService.getStatisticsByOrganizationId(vm.organization._id)
          .then(function(stats) {
            vm.organization.statistics = stats;
          });
      });

    }
  });
