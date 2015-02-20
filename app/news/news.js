angular
  .module('portal.news', [
    'ui.router',
    'templates',
    'ngAnimate',
    'restangular'
  ])
  .config(function($stateProvider) {

    $stateProvider.state('news', {
      url: '/news',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('news.list', {
      url: '',
      controller: 'NewsController',
      templateUrl: 'news/views/list.tpl.html'
    })
    .state('news.view', {
      url: '/:id',
      controller: 'NewsPostController',
      templateUrl: 'news/views/view.tpl.html'
    });

  })

  .controller('NewsController', function(
    $q, $scope, CurrentUserService
  ) {
    // pass
  })

  .controller('NewsPostController', function(
    $scope, $stateParams
  ) {
    // pass
  });
