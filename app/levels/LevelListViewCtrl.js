angular
  .module('portal.levels')
  .controller('LevelsListViewController', function(
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
