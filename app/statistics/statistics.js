angular
  .module('portal.statistics', [
    'ui.router',
    'templates',
    'ngAnimate',
    'restangular',
    'portal.services'
  ])
  .config(function($stateProvider) {

    $stateProvider.state('statistics', {
      url: '/statistics',
      abstract: true,
      templateUrl: 'statistics/views/main.tpl.html'
    })
    .state('statistics.main', {
      url: '',
      controller: 'StatisticsCtrl',
      controllerAs: 'vm',
      templateUrl: 'statistics/views/statistics.tpl.html'
    });

  });
