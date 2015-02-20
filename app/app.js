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
  'portal.news',
  'portal.crud'
  ]);


portal.config(function(
  $locationProvider, $urlRouterProvider, RestangularProvider, ApiConfig
) {

  $locationProvider.html5Mode(ApiConfig.html5Mode);
  $urlRouterProvider.otherwise('/');

  if (ApiConfig.port)
    ApiConfig.endpoint = '//'+document.domain+':'+ApiConfig.port;

  RestangularProvider.setBaseUrl(ApiConfig.endpoint);

  RestangularProvider.setRestangularFields({
    id: "_id"
  });

  RestangularProvider.addResponseInterceptor(function(
    data, operation, what, url, response, deferred
  ) {

    if (operation == 'getList') {
      if (what == '/')
        data._items = data._links.child;
      data._items.meta = data._meta;
      return data._items;
    }
    return response;

  });

  RestangularProvider.addFullRequestInterceptor(function(
    element, operation, route, url, headers, params, httpConfig
  ) {

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


portal.run(function (
  $rootScope, $location, $state, CurrentUserService, Restangular
) {

  $rootScope.setCurrentUser = function(user) {
    $rootScope.currentUser = user;
  };

  Restangular.setErrorInterceptor(function(
    response, deffered, responseHandler
  ) {
    if (response.status == 401) {
      $state.go('login');
    }
  });

  console.log('restore');
  CurrentUserService.restore();

  if (CurrentUserService.isAuthentificated()) {
    var token = CurrentUserService.getAuthToken();
    var basic = 'Basic '+window.btoa(token+':');

    console.log('set auth');
    Restangular.setDefaultHeaders({ Authorization: basic });

    CurrentUserService.loadUserInfo().then(function(user) {
      $rootScope.setCurrentUser(user);
    });
  }

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    $rootScope.state = toState.name;

    // TODO: State Based access definition
    if (toState.name != 'login' && !CurrentUserService.isAuthentificated()) {
      event.preventDefault();
      $state.go('login');
    }
  });

});
