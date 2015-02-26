function LevelViewCtrl(
  $stateParams, CurrentUserService, LevelService, LevelHintService,
  LevelValidationService
) {
  var vm = this;

  vm.level = {};

  vm.validate = validate;
  vm.buyHint = buyHint;

  init();

  /** Retrieve level info along side level instances */
  function init() {
    LevelService.getLevel($stateParams.id).then(function(level) {
      vm.level = level;

      LevelHintService.getHintsForLevel(vm.level).then(function(hints) {
        vm.level.hints = hints;
      });
    });

    LevelService.getLevelInstances({
      where: {
        level: $stateParams.id
      }
    }).then(function(instances) {
      vm.level.instances = instances;
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
