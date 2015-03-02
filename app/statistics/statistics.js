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
      templateUrl: 'statistics/views/statistics.tpl.html'
    })
    .state('statistics.hall', {
      url: '/hall/:hall',
      controller: function($stateParams) {
        var vm = this;

        vm.hall = $stateParams.hall;
      },
      controllerAs: 'vm',
      templateUrl: 'statistics/views/hall.tpl.html'
    });

  });
