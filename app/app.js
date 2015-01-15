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

});

portal.run(function ($rootScope, $location) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    $rootScope.state = toState.name;
  });
});
