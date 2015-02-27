function LevelHintsDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'levels/hints/LevelHints.tpl.html',
    scope: {
      level: '=',
      buyHint: '='
    },
    controller: LevelHintsCtrl,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

function LevelHintsCtrl(LevelHintService) {
  var vm = this;

  // Fetches hints for the level
  LevelHintService.getHintsForLevel(vm.level)
    .then(function(hints) {
      vm.level.hints = hints;
    });

}

angular
  .module('portal.levels')
  .directive('pwLevelHints', LevelHintsDirective);
