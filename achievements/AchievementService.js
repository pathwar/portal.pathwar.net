"use strict";

function AchievementService(Restangular) {
  var service = {};

  service.getAchievementsByOrganizationId = function (orgId) {
    return Restangular.all("organization-achievements").getList({
      where: JSON.stringify({
        organization: orgId
      }),
      embedded: JSON.stringify({
        achievement: 1
      })
    });
  };

  return service;
}

angular.module("portal.achievements").factory("AchievementService", AchievementService);