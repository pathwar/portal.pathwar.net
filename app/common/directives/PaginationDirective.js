function PaginationDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'common/directives/PaginationDirective.tpl.html',
    controller: PaginationDirectiveCtrl,
    controllerAs: 'd',
    bindToController: true,
    scope: {
      pagination: '=details',
      onPageChange: '&',
    }
  };

  return directive;

}

// @ngInject
function PaginationDirectiveCtrl($scope) {
  var d = this;
  this.setCurrent = function(page) {
    d.onPageChange({page: page})
  }
}

angular
  .module('portal.directives')
  .directive('pagination', PaginationDirective);
