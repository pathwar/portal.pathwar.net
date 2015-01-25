var portal = angular.module('portal', [
  'ngAnimate',
  'ngRoute',
  'templates',
  'restangular',
  'portal.config',
  'portal.services',
  'portal.directives',
  'portal.controllers',
  'portal.home',
  'portal.levels',
  'portal.organizations',
  'portal.users',
  'portal.crud'
  ]);

portal.config(function($locationProvider, $urlRouterProvider, RestangularProvider, ApiConfig) {

  $locationProvider.html5Mode(ApiConfig.html5Mode);
  $urlRouterProvider.otherwise('/');

  if (ApiConfig.port)
    ApiConfig.endpoint = '//'+document.domain+':'+ApiConfig.port;

  RestangularProvider.setBaseUrl(ApiConfig.endpoint);

  RestangularProvider.setRestangularFields({
    id: "_id"
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

portal.run(function ($rootScope, $location, CurrentUserService, Restangular) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    $rootScope.state = toState.name;
  });

  CurrentUserService.restore();

  if (CurrentUserService.isAuthentificated()) {
    var token = CurrentUserService.getAuthToken();
    var basic = 'Basic '+window.btoa(token+':');

    console.log('logged in');

    Restangular.setDefaultHeaders({ Authorization: basic });
  }

});
