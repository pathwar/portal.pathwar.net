function LevelStatsService(Restangular) {
  var service = {};

  service.getStatsForLevel = getStatsForLevel;

  return service;

  function getStatsForLevel(level) {
    return Restangular.all('level-statistics')
      .getList({
        where: angular.toJson({
          level: level._id
        })
      })
      .then(function(stats) {
        //TODO: Extend if stats is defined
        level.statistics = stats[0] || undefined;
        return level.statistics;
      });
  }
}

angular
  .module('portal.levels')
  .factory('LevelStatsService', LevelStatsService);
