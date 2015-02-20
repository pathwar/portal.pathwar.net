angular
  .module('portal.levels')
  .controller('LevelViewController', function(
    $scope, $stateParams, LevelsService
  ) {

    LevelsService.getLevel($stateParams.id).then(function(_level) {
      $scope.level = _level;
    });

    LevelsService.getLevelInstances({
      where: {
        level: $stateParams.id
      }
    }).then(function(instances) {
      $scope.instances = instances;
    });

  });
