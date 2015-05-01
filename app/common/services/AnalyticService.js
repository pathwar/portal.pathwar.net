function AnalyticService($window, $location) {
  var service = {};

  service.pageView = dispatchEvent(pageView);
  service.setUser = dispatchEvent(setUser);
  service.setUserProperties = dispatchEvent(setUserProperties);
  service.trackEvent = dispatchEvent(trackEvent);

  if (typeof(_kmq) == "undefined") {
    $window._kmq = [];
  }
  else {
    $window._kmq = _kmq;
  }

  return service;

  function dispatchEvent(callback) {
    if ($location.host() == 'portal.pathwar.net') {
      return callback;
    }
    return function() {}
  }

  function pageView(path) {
    if ($window.ga) {
      $window.ga('send', 'pageview', path);
    }
  }

  function setUser(uuid) {
    $window._kmq.push(['identify', uuid]);
  }

  function setUserProperties(properties) {
    $window._kmq.push(['set', properties]);
  }

  function trackEvent(action, properties) {
    $window._kmq.push(['record', action, properties]);
    $window.ga('send', 'event', action, properties);
  }
}

//@ngInject
function AnalyticServiceRun($rootScope, $location, AnalyticService) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    var path = $location.url();
    AnalyticService.pageView(path);
  });
}

angular
  .module('portal.services')
  .factory('AnalyticService', AnalyticService)
  .run(AnalyticServiceRun);
