"use strict";

function LoggerDirective() {
  var link = function (scope, element, attrs) {};

  var directive = {
    restrict: "EA",
    templateUrl: "logger/loggerDirective.tpl.html",
    controller: LoggerDirectiveCtrl,
    controllerAs: "vm",
    bindToController: true,
    link: link };

  return directive;
}

// @ngInject
function LoggerDirectiveCtrl(LoggerService) {
  var init = function () {};

  var dismiss = function (log) {
    var index = vm.logs.indexOf(log);
    vm.logs.splice(index, 1);
  };

  var getClass = function (log) {
    switch (log.type) {
      case "success":
        return ["bg-green", "white"];
      case "error":
        return ["bg-red", "white"];
      default:
        return ["bg-white", "black"];
    }
  };

  var getIconClass = function (log) {
    switch (log.type) {
      case "success":
        return ["fa-check-circle"];
      case "error":
        return ["fa-times-circle"];
      default:
        return ["fa-info-circle"];
    }
  };

  var vm = this;

  vm.logs = LoggerService.items;
  vm.dismiss = dismiss;
  vm.getClass = getClass;
  vm.getIconClass = getIconClass;

  init();
}

angular.module("portal.logger").directive("logger", LoggerDirective);
//console.log('linked');