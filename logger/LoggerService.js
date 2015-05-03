"use strict";

function LoggerService($q, $timeout, $interval, Restangular, CurrentUserService) {
  var success = function (message, opts) {
    return _log("success", message, opts);
  };

  var error = function (message, opts) {
    return _log("error", message, opts);
  };

  var errorFromResponse = function (response, opts) {
    var message;

    if (response.data == null || response.data._error == undefined) {
      message = "Oops, an error occured on our side.";
    } else {
      message = response.data._error.message;
      if (response.data._issues) {
        console.log(response);
      }
    }
    return _log("error", message, opts);
  };

  var info = function (message, delay) {
    return _log("info", opts, opts);
  };

  var warning = function (message, opts) {
    return _log("warning", message, opts);
  };

  var _log = function (type, message, opts) {
    var opts = opts || {};

    var log = {
      type: type,
      message: message };

    angular.extend(log, opts);
    service.items.push(log);

    $timeout(function () {
      var index = service.items.indexOf(log);
      service.items.splice(index, 1);
    }, opts.delay != undefined ? opts.delay : 5000);

    return log;
  };

  var service = {};

  service.items = [];
  service.success = success;
  service.error = error;
  service.errorFromResponse = errorFromResponse;
  service.info = info;
  service.warning = warning;

  return service;
}

angular.module("portal.logger").factory("LoggerService", LoggerService);