angular
  .module('portal.levels')
  .controller('LevelViewCtrl', function(
    $scope, $stateParams, LevelService
  ) {

    LevelService.getLevel($stateParams.id).then(function(_level) {
      $scope.level = _level;
    });

    LevelService.getLevelInstances({
      where: {
        level: $stateParams.id
      }
    }).then(function(instances) {
      $scope.instances = instances;
    });

  });
