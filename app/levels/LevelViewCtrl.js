function LevelViewCtrl(
  $stateParams, LevelService, LevelHintService
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


  }

  /** Validate level with passphrase and validation message */
  function validate(validation) {
    console.log(validation);
    vm.level.validated = true;
  }

  function buyHint(hint) {
    return LevelHintService.buyHintForLevel(hint, vm.level);
  }

}

angular
  .module('portal.levels')
  .controller('LevelViewCtrl', LevelViewCtrl);
