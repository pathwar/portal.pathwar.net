function LevelViewCtrl(
  $stateParams, CurrentUserService, LevelService, LevelHintService,
  LevelValidationService
) {
  var vm = this;

  vm.level = {};
  vm.orgLevel = {};

  vm.validate = validate;
  vm.buyHint = buyHint;

  vm.organizationBoughtLevel = function(orgLevel) {
    return orgLevel && angular.isDefined(orgLevel.level);
  };

  init();

  /** Retrieve level info along side level instances */
  function init() {
    var currentOrg = CurrentUserService.getOrganization();

    // Fetchs level info then decorates with all available level info
    LevelService.getLevel($stateParams.id).then(function(level) {
      vm.level = level;

      // Fetches status of the level for current organization
      LevelService.getOrganizationLevel(currentOrg, vm.level)
        .then(function(orgLevel) {
          vm.orgLevel = orgLevel;
        });

      // Fetches hints for the level
      LevelHintService.getHintsForLevel(vm.level)
        .then(function(hints) {
          vm.level.hints = hints;
        });

      // Fetches running instances of the level
      LevelService.getLevelInstances({
        where: {
          level: vm.level._id
        }
      }).then(function(instances) {
        vm.level.instances = instances;
      });
    });
  }

  /** Validate level with passphrase and validation message */
  function validate(validation) {
    LevelValidationService.validateOrganizationLevel(validation, vm.orgLevel)
      .then(function(data) {
        console.log('TODO: Notification that level is pending validation');
      });

    vm.level.validated = true; //switch to orgLevel
  }

  function buyHint(hint) {
    return LevelHintService.buyHintForLevel(hint, vm.level);
  }

}

angular
  .module('portal.levels')
  .controller('LevelViewCtrl', LevelViewCtrl);
