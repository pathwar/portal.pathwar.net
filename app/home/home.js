angular.module('portal.home', [
  'ui.router',
  'templates',
  'ngAnimate',
  'portal.news'
])
.config(function($stateProvider) {

  $stateProvider
    .state('home', {
      url: '',
      abstract: true,
      templateUrl: 'home/views/main.tpl.html'
    })
    .state('home.welcome', {
      url: '/',
      controller: 'HomeCtrl',
      controllerAs: 'vm',
      templateUrl: 'home/views/welcome.tpl.html'
    })
    .state('home.leaderboard', {
      url: '/leaderboard',
      templateUrl: 'home/views/leaderboard.tpl.html'
    })
    .state('home.fun', {
      url: '/fun',
      templateUrl: 'home/views/fun.tpl.html'
    });

})
.controller('HomeCtrl', function(NewsService) {
  var vm = this;

  vm.news = NewsService.news;

  NewsService.getNews().then(function(news) {
    console.log(news);
  });
});
