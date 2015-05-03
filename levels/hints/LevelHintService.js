"use strict";

function LevelHintService(Restangular) {
  var getHintsForLevel = function (level) {
    return Restangular.all("level-hints").getList({
      where: angular.toJson({
        level: level._id
      })
    }).then(function (hints) {
      return hints;
    });
  };

  var getBoughtLevelHints = function (boughtLevel) {
    return Restangular.all("organization-level-hints").getList({
      where: angular.toJson({
        organization_level: boughtLevel._id
      })
    });
  };

  var buyHintForLevel = function (hint, boughtLevel) {
    return Restangular.all("organization-level-hints").post({
      organization_level: boughtLevel._id,
      level_hint: hint._id
    });
  };

  var service = {};

  service.getHintsForLevel = getHintsForLevel;
  service.getBoughtLevelHints = getBoughtLevelHints;
  service.buyHintForLevel = buyHintForLevel;

  return service;
}

angular.module("portal.levels").factory("LevelHintService", LevelHintService);