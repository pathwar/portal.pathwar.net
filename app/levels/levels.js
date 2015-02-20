var levels = angular.module('portal.levels', [
  'ui.router', 'templates', 'ngAnimate', 'restangular'
]);


levels.config(function($stateProvider) {

  $stateProvider.state('levels', {
    url: '/levels',
    abstract: true,
    template: '<div ui-view></div>'
  })
  .state('levels.list', {
    url: '',
    controller: 'LevelsController',
    templateUrl: 'levels/views/list.tpl.html'
  })
  .state('levels.view', {
    url: '/:id',
    controller: 'LevelController',
    templateUrl: 'levels/views/view.tpl.html'
  });

});


levels.controller('LevelsController', function(
  $q, $scope, LevelsService, CurrentUserService
) {

  var currentOrg = CurrentUserService.getOrganization();
  // FIXME: Can be outdated (see app.run) ...

  var levels = [];

  $q.all([
    LevelsService.getLevels(),
    LevelsService.getLevelsByOrganizationId(currentOrg._id)
  ])
  .then(function(results) {

    levels = results[0];

    var _boughtLevels = results[1];
    var boughtLevels = [];

    _.each(levels, function(level) {
      var isAlreadyBought = _.find(_boughtLevels, function(boughtLevel) {
        return level._id == boughtLevel._id;
      });

      if (isAlreadyBought)
        level.bought = true;
      else
        level.bought = false;
    });

    $scope.levels = levels;
  });

  $scope.buyLevel = function(level) {
    LevelsService.buyLevelbyOrganizationId(
      level._id, $scope.currentUser.organization._id
    ).then(function() {
      level.bought = true;
      console.log('level '+level._id+' successfully bought !');
      CurrentUserService.loadOrganizationStatistics();
    });
  };

});


levels.controller('LevelController', function(
  $scope, $stateParams, LevelsService
) {

  LevelsService.getLevel($stateParams.id).then(function(_level) {
    console.log(_level);
    $scope.level = _level;
  });

  LevelsService.getLevelInstances({
    where: {
      level: $stateParams.id
    }
  }).then(function(instances) {
    console.log(instances[0].server);
    $scope.instances = instances;
  });

});
