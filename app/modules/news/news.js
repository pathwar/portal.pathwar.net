var levels = angular.module('portal.news', [
  'ui.router', 'templates', 'ngAnimate', 'restangular'
]);


levels.config(function($stateProvider) {

  $stateProvider.state('news', {
    url: '/news',
    abstract: true,
    template: '<div ui-view></div>'
  })
  .state('news.list', {
    url: '',
    controller: 'NewsController',
    templateUrl: 'modules/news/views/list.tpl.html'
  })
  .state('news.view', {
    url: '/:id',
    controller: 'NewsPostController',
    templateUrl: 'modules/news/views/view.tpl.html'
  });

});


levels.controller('NewsController', function(
  $q, $scope, CurrentUserService
) {
  // pass
});


levels.controller('NewsPostController', function(
  $scope, $stateParams
) {
  // pass
});
