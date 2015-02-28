angular.module('portal.home', [
  'ui.router',
  'templates',
  'ngAnimate'
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
      templateUrl: 'home/views/welcome.tpl.html'
    })
    .state('home.leaderboard', {
      url: '/leaderboard',
      templateUrl: 'home/views/leaderboard.tpl.html'
    })
    .state('home.fun', {
      url: '/',
      templateUrl: 'home/views/fun.tpl.html'
    });

})
.controller('HomeController', function($scope) {
  $scope.loaded = true;
});
