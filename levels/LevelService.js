"use strict";

function LevelService(Restangular) {
  var service = {};

  service.getLevelsBySessionId = function (sessionId) {
    var opts = arguments[1] === undefined ? {} : arguments[1];


    opts.where = angular.toJson({
      "availability.sessions": sessionId
    });

    opts.embedded = angular.toJson({
      statistics: 1
    });

    return Restangular.all("levels").getList(opts || {});
  };

  service.getOrganizationLevel = function (organization, level) {
    return Restangular.all("organization-levels").getList({
      where: angular.toJson({
        organization: organization._id,
        level: level._id
      })
    }).then(function (orgLevels) {
      return orgLevels[0] || {};
    });
  };

  service.getLevelsByOrganizationId = function (orgId, opts) {
    opts = opts || {};
    opts.embedded = JSON.stringify({
      level: 1
    });
    opts.where = opts.where || {};
    opts.where.organization = orgId;

    return Restangular.all("organization-levels").getList(opts || {});
  };

  // takes an object with a level attribute containing the level ID
  service.getLevelInstances = function (opts) {
    opts = opts || {};
    opts.embedded = JSON.stringify({
      server: 1
    });

    return Restangular.all("level-instances").getList(opts);
  };

  service.buyLevelbyOrganizationId = function (levelId, orgId, opts) {
    return Restangular.all("organization-levels").post({
      organization: orgId,
      level: levelId
    });
  };

  service.getLevel = function (levelId) {
    return Restangular.one("levels", levelId).get({
      embedded: angular.toJson({
        statistics: 1
      })
    }).then(function (response) {
      return response.data;
    });
  };

  return service;
}

angular.module("portal.levels").factory("LevelService", LevelService);