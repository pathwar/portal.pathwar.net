function LoggerService($q, $timeout, $interval, Restangular, CurrentUserService) {
  var service = {};

  service.items = [];
  service.success = success;
  service.error = error;
  service.errorFromResponse = errorFromResponse;
  service.info = info;
  service.warning = warning;

  return service;

  function success(message, opts) {
    return _log('success', message, opts);
  }

  function error(message, opts) {
    return _log('error', message, opts);
  }

  function errorFromResponse(response, opts) {
    var message;

    if (response.data == null
    || response.data._error == undefined) {
      message = 'Oops, an error occured on our side.';
    }
    else {
      message = response.data._error.message;
      if (response.data._issues) {
        console.log(response);
      }
    }
    return _log('error', message, opts);
  }

  function info(message, delay) {
    return _log('info', opts, opts);
  }

  function warning(message, opts) {
    return _log('warning', message, opts);
  }

  function _log(type, message, opts) {
    var opts = opts || {};

    var log = {
      type: type,
      message: message,
    };

    angular.extend(log, opts);
    service.items.push(log);

    $timeout(function() {
        var index = service.items.indexOf(log);
        service.items.splice(index, 1);
    }, opts.delay != undefined ? opts.delay : 5000);

    return log;
  }

}

angular
  .module('portal.logger')
  .factory('LoggerService', LoggerService);
