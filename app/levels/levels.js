angular
  .module('portal.levels', [
    'ui.router',
    'templates',
    'ngAnimate',
    'restangular'
  ])
  .config(function($stateProvider) {

    $stateProvider.state('levels', {
      url: '/levels',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('levels.list', {
      url: '',
      controller: 'LevelListViewController',
      templateUrl: 'levels/views/list.tpl.html'
    })
    .state('levels.view', {
      url: '/:id',
      controller: 'LevelViewController',
      templateUrl: 'levels/views/view.tpl.html'
    });

  });
