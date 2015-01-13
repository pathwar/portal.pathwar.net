var home = angular.module('portal.home', ['ui.router', 'templates', 'ngAnimate']);

home.config(function($stateProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: 'home/home.tpl.html',
  });

});

home.controller('HomeController', function($scope, $http, $sce, $timeout) {
  $scope.loaded = true
});
