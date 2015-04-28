function LoggerDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'logger/loggerDirective.tpl.html',
    controller: LoggerDirectiveCtrl,
    controllerAs: 'vm',
    bindToController: true,
    link: link,
  };

  return directive;

  function link(scope, element, attrs) {
    //console.log('linked');
  }
}

// @ngInject
function LoggerDirectiveCtrl(LoggerService) {
  var vm = this;

  vm.logs = LoggerService.items;
  vm.dismiss = dismiss;
  vm.getClass = getClass;
  vm.getIconClass = getIconClass;

  init();

  function init() {
  }

  function dismiss(log) {
    var index = vm.logs.indexOf(log);
    vm.logs.splice(index, 1);
  }

  function getClass(log) {
    switch (log.type) {
        case 'success':
          return ['bg-green', 'white'];
        case 'error':
          return ['bg-red', 'white'];
        default:
          return ['bg-white', 'black'];
    }
  }

  function getIconClass(log) {
    switch (log.type) {
        case 'success':
          return ['fa-check-circle'];
        case 'error':
          return ['fa-times-circle'];
        default:
          return ['fa-info-circle'];
    }
  }
}

angular
  .module('portal.logger')
  .directive('logger', LoggerDirective);
