"use strict";

function LevelHintsDirective() {
  var directive = {
    restrict: "EA",
    templateUrl: "levels/hints/LevelHints.tpl.html",
    scope: {
      level: "=",
      boughtLevel: "="
    },
    controller: LevelHintsCtrl,
    controllerAs: "vm",
    bindToController: true
  };

  return directive;
}

function LevelHintsCtrl($q, LevelHintService) {
  var init = function () {
    $q.all([
    // Fetches hints for the level
    LevelHintService.getHintsForLevel(vm.level), LevelHintService.getBoughtLevelHints(vm.boughtLevel || {})]).then(function (results) {
      vm.level.hints = results[0];
      var boughtHints = results[1];

      _.each(vm.level.hints, function (hint) {
        var isAlreadyBought = _.find(boughtHints, function (boughtHint) {
          return hint._id == boughtHint.level_hint;
        });

        hint.bought = isAlreadyBought ? true : false;
      });
    });
  };

  var buyHint = function (hint) {
    LevelHintService.buyHintForLevel(hint, vm.boughtLevel).then(function (result) {
      console.log(result);
    });
  };

  var vm = this;

  vm.buyHint = buyHint;

  init();
}

angular.module("portal.levels").directive("pwLevelHints", LevelHintsDirective);