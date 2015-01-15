var portal = angular.module('portal', [
  'ngAnimate',
  'ngRoute',
  'templates',
  'restangular',
  'portal.home',
  'portal.levels',
  'portal.organizations'
  ]);

portal.config(function($locationProvider, $urlRouterProvider, RestangularProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  RestangularProvider.setBaseUrl('//'+document.domain+':5000');

  RestangularProvider.setRestangularFields({
    id: "_id"
  });

  RestangularProvider.setDefaultHeaders({
    Authorization: 'Basic cm9vdC10b2tlbjo='
  });

  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {

    if (operation == 'getList') return data._items;
    return response;

  });

  RestangularProvider.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {

    if (operation == 'patch') {
      headers['If-Match'] = element._etag;
      delete element._etag;
    }

    return {
      element: element,
      headers: headers,
      params: params,
      httpConfig: httpConfig
    };

  });

});

portal.run(function ($rootScope, $location) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    $rootScope.state = toState.name;
  });
});
