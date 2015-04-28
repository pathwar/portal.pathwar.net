function LevelStatsDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'levels/statistics/LevelStats.tpl.html',
    scope: {
      level: '='
    },
    controller: LevelStatsCtrl,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

// @ngInject
function LevelStatsCtrl(LevelStatsService) {
  var vm = this;

  init();

  function init() {
    LevelStatsService.getStatsForLevel(vm.level)
      .then(function(stats) {
        vm.level.statistics = stats;
      });
  }
}

angular
  .module('portal.levels')
  .directive('pwLevelStats', LevelStatsDirective);
