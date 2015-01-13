var levels = angular.module('portal.levels', ['ui.router', 'templates', 'ngAnimate']);

levels.config(function($stateProvider) {

  $stateProvider.state('levels', {
    url: '/levels',
    controller: 'LevelsController',
    templateUrl: 'levels/levels.tpl.html',
  });

});

levels.controller('LevelsController', function($scope, $http, $sce, $timeout) {
  $scope.loaded = true
});
