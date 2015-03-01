function LevelValidationDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'levels/validations/LevelValidation.tpl.html',
    scope: {
      boughtLevel: '=',
      validate: '='
    },
    controller: LevelValidationCtrl,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

function LevelValidationCtrl(LevelValidationService) {
  var vm = this;
}

angular
  .module('portal.levels')
  .directive('pwLevelValidation', LevelValidationDirective);
