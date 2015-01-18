var portal = angular.module('portal', [
  'ngAnimate',
  'ngRoute',
  'templates',
  'restangular',
  'portal.config',
  'portal.home',
  'portal.levels',
  'portal.organizations',
  'portal.users',
  'portal.crud'
  ]);

portal.config(function($locationProvider, $urlRouterProvider, RestangularProvider, ApiConfig) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  if (ApiConfig.port)
    ApiConfig.endpoint = '//'+document.domain+':'+ApiConfig.port;

  RestangularProvider.setBaseUrl(ApiConfig.endpoint);

  RestangularProvider.setRestangularFields({
    id: "_id"
  });

  RestangularProvider.setDefaultHeaders({
    Authorization: 'Basic cm9vdC10b2tlbjo='
  });

  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {

    if (operation == 'getList') {
      if (what == '/')
        data._items = data._links.child;
      data._items.meta = data._meta;
      return data._items;
    }
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
