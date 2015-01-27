var levels = angular.module('portal.levels', ['ui.router', 'templates', 'ngAnimate', 'restangular']);

levels.config(function($stateProvider) {

  $stateProvider.state('levels', {
    url: '/levels',
    controller: 'LevelsController',
    templateUrl: 'modules/levels/views/list.tpl.html',
  });

});

levels.controller('LevelsController', function($scope, LevelsService) {

  LevelsService.getLevels().then(function(levels) {
    $scope.levels = levels;
  });

});
