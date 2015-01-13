var portal = angular.module('portal', [
  'ngAnimate',
  'ngRoute',
  'templates',
  'portal.home',
  'portal.levels',
  'portal.organizations'
  ]);

portal.config(function($locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

});

portal.run(function ($rootScope, $location) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    $rootScope.state = toState.name;
  });
});
