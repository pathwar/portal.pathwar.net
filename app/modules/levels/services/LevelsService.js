angular
  .module('portal.levels')
  .factory('LevelsService', function(Restangular) {

    var service = {};

    service.getLevels = function(opts) {
      return Restangular.all('levels').getList(opts || {});
    };

    service.getLevelsByOrganizationId = function(id, opts) {

      opts = opts || {};
      opts.embedded = JSON.stringify({
          level: 1
      });

      return Restangular.all('organization-levels').getList(opts || {}).then(function(orgLevels) {
        var levels = []

        _.forEach(orgLevels, function(orgLevel) {
          levels.push(orgLevel.level);
        });

        return levels;
      });
    };

    service.buyLevelbyOrganizationId = function(levelId, orgId, opts) {
      return Restangular.all('organization-levels').post({
        organization: orgId,
        level: levelId
      });
    };

    return service;

  });
