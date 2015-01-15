var levels = angular.module('portal.levels', ['ui.router', 'templates', 'ngAnimate', 'restangular']);

levels.config(function($stateProvider) {

  $stateProvider.state('levels', {
    url: '/levels',
    controller: 'LevelsController',
    templateUrl: 'modules/levels/views/list.tpl.html',
  });

});

levels.controller('LevelsController', function($scope, $http, $sce, $timeout, Restangular) {

  var Level = Restangular.service('levels');

  Level.getList().then(function(levels) {
    $scope.levels = levels;
    $scope.loaded = true;
  });

});
