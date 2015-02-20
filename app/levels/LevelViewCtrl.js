function LevelViewCtrl(
  $stateParams, LevelService
) {
  var vm = this;

  vm.level = {};
  vm.instances = [];

  init();
  
  /** Retrieve level info along side level instances */
  function init() {
    LevelService.getLevel($stateParams.id).then(function(level) {
      vm.level = level;
    });

    LevelService.getLevelInstances({
      where: {
        level: $stateParams.id
      }
    }).then(function(instances) {
      vm.instances = instances;
    });
  }
}

angular
  .module('portal.levels')
  .controller('LevelViewCtrl', LevelViewCtrl);
