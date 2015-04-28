angular
  .module('portal.organizations')
  .controller('OrganizationViewCtrl', function(
    $stateParams, OrganizationService, ScoringService, AchievementService,
  ) {
    var vm = this;

    vm.organization = undefined;

    init();

    function init() {

      OrganizationService.getOrganizationById($stateParams.id).then(function(organization) {
        vm.organization = organization;

        ScoringService.getStatisticsByOrganizationId($stateParams.id)
          .then(function(stats) {
            vm.organization.statistics = stats;
          });


        AchievementService.getAchievementsByOrganizationId($stateParams.id)
        .then(function(achievements) {
          vm.organization.achievements = achievements;
        });
      });

    }
  });
