function LevelHintService(Restangular) {
  var service = {};

  service.getHintsForLevel = getHintsForLevel;
  service.getBoughtLevelHints = getBoughtLevelHints;
  service.buyHintForLevel = buyHintForLevel;

  return service;

  function getHintsForLevel(level) {
    return Restangular.all('level-hints')
      .getList({
        where: angular.toJson({
          level: level._id
        })
      })
      .then(function(hints) {
        return hints;
      });
  }

  function getBoughtLevelHints(boughtLevel) {
    return Restangular.all('organization-level-hints')
      .getList({
        where: angular.toJson({
          organization_level: boughtLevel._id
        })
      });
  }

  function buyHintForLevel(hint, boughtLevel) {
    return Restangular.all('organization-level-hints')
      .post({
        organization_level: boughtLevel._id,
        level_hint: hint._id
      });
  }
}

angular
  .module('portal.levels')
  .factory('LevelHintService', LevelHintService);
