var home = angular.module('portal.home', ['ui.router', 'templates', 'ngAnimate']);

home.config(function($stateProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: 'modules/home/views/main.tpl.html',
  });

});

home.controller('HomeController', function($scope) {
  $scope.loaded = true
});
