"use strict";

function AnalyticService($window, $location) {
  var dispatchEvent = function (callback) {
    if ($location.host() == "portal.pathwar.net") {
      return callback;
    }
    return function () {};
  };

  var pageView = function (path) {
    if ($window.ga) {
      $window.ga("send", "pageview", path);
    }
  };

  var setUser = function (uuid) {
    $window._kmq.push(["identify", uuid]);
  };

  var setUserProperties = function (properties) {
    $window._kmq.push(["set", properties]);
  };

  var trackEvent = function (action, properties) {
    $window._kmq.push(["record", action, properties]);
    $window.ga("send", "event", action, properties);
  };

  var service = {};

  service.pageView = dispatchEvent(pageView);
  service.setUser = dispatchEvent(setUser);
  service.setUserProperties = dispatchEvent(setUserProperties);
  service.trackEvent = dispatchEvent(trackEvent);

  if (typeof _kmq == "undefined") {
    $window._kmq = [];
  } else {
    $window._kmq = _kmq;
  }

  return service;
}

//@ngInject
function AnalyticServiceRun($rootScope, $location, AnalyticService) {
  $rootScope.$on("$stateChangeSuccess", function (event, toState) {
    var path = $location.url();
    AnalyticService.pageView(path);
  });
}

angular.module("portal.services").factory("AnalyticService", AnalyticService).run(AnalyticServiceRun);