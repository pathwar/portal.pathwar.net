function LevelValidationDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'levels/validations/LevelValidation.tpl.html',
    scope: {
      level: '=',
      buyHint: '='
    },
    controller: LevelValidationCtrl,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

function LevelValidationCtrl(LevelValidationService) {
  var vm = this;

  // Fetches hints for the level
  LevelHintService.getHintsForLevel(vm.level)
    .then(function(hints) {
      vm.level.hints = hints;
    });

}

angular
  .module('portal.levels')
  .directive('pwLevelValidation', LevelValidationDirective);
