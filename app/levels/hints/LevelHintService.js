function LevelHintService(Restangular) {
  var service = {};

  service.getHintsForLevel = getHintsForLevel;
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

  function buyHintForLevel(hint, level) {
    console.log(hint);
  }
}

angular
  .module('portal.levels')
  .factory('LevelHintService', LevelHintService);
