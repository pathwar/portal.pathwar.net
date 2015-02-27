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

function LevelStatsCtrl() {
  var vm = this;

}

angular
  .module('portal.levels')
  .directive('pwLevelStats', LevelStatsDirective);
