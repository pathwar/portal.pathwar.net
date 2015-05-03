"use strict";

angular.module("portal.services").factory("SessionService", function (Restangular) {
  var Sessions = Restangular.all("sessions");

  var service = {};

  service.getSessions = function (opts) {
    return Sessions.getList();
  };

  service.getPublicSessions = function (opts) {
    return Sessions.getList({
      where: angular.toJson({
        "public": true
      })
    });
  };

  return service;
});