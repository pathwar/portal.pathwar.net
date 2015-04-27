function LevelListViewCtrl($q, LevelService, CurrentUserService) {

  var vm = this;
  var currentOrg = CurrentUserService.getOrganization();

  vm.levels = [];
  vm.buyLevel = buyLevel;

  init();

  /** Get levels and mark the ones already bought */
  // TODO: Should be in a service
  function init() {
    $q.all([
      LevelService.getLevels(),
      LevelService.getLevelsByOrganizationId(currentOrg._id)
    ])
    .then(function (results) {
      vm.levels = results[0];
      var boughtLevels = results[1];

      _.each(vm.levels, function(level) {
        var isAlreadyBought = _.find(boughtLevels, function(boughtLevel) {
          return level._id == boughtLevel._id;
        });

        if (isAlreadyBought)
          level.bought = true;
        else
          level.bought = false;
      });
    });
  }

  /** Buys a level and reload organization info */
  // TODO: Should be in a service
  function buyLevel(level) {

    var currentOrg = CurrentUserService.getOrganization();

    if (currentOrg.statistics.cash - level.price < 0) {
      alert('You do not have enough cash to buy this level')
      console.log('not_enough_cash');
      return false;
    }

    return LevelService.buyLevelbyOrganizationId(
      level._id, currentOrg._id
    )
    .then(buyLevelSuccess)
    .catch(function(response) {
      alert(response.data._error.message);
    });

    function buyLevelSuccess() {
      console.log('level '+level._id+' successfully bought !');
      level.bought = true;

      CurrentUserService.loadOrganizationStatistics();
    }
  }

}

angular
  .module('portal.levels')
  .controller('LevelListViewCtrl', LevelListViewCtrl);
