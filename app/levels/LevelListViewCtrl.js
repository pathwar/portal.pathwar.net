function LevelListViewCtrl($q, LevelService, CurrentUserService, LoggerService) {

  var vm = this;
  var currentOrg = CurrentUserService.getOrganization();

  vm.page = 1;
  vm.levels = [];
  vm.loadLevels = loadLevels;
  vm.buyLevel = buyLevel;

  init();

  /** Get levels and mark the ones already bought */
  // TODO: Should be in a service
  function init() {

    vm.loadLevels(vm.page)

  }

  function loadLevels(page) {
    vm.page = page;

    var currentOrg = CurrentUserService.getOrganization();
    var sessionId = currentOrg.session;

    var opts = { page: vm.page }

    $q.all([
      LevelService.getLevelsBySessionId(sessionId, opts),
      LevelService.getLevelsByOrganizationId(currentOrg._id)
    ])
    .then(function (results) {
      vm.levels = results[0];
      var boughtLevels = results[1];

      vm.pagination = {
        current: page,
        last: Math.ceil(vm.levels.meta.total / vm.levels.meta.max_results)
      }

      _.each(vm.levels, function(level) {
        var boughtLevel = _.find(boughtLevels, function(boughtLevel) {
          return level._id == boughtLevel.level._id;
        });

        if (boughtLevel) {
          level.bought = true;

          // TODO: BEtter way of doing this
          if (boughtLevel.status == 'pending validation'
          ||  boughtLevel.status == 'validated') {
            level.status = 'validated';
          }
          else {
            level.status = boughtLevel.status;
          }
        }
        else {
          level.bought = false;
        }

      });
    });
  }

  /** Buys a level and reload organization info */
  // TODO: Should be in a service
  function buyLevel(level) {

    var currentOrg = CurrentUserService.getOrganization();

    if (currentOrg.statistics.cash - level.price < 0) {
      LoggerService.error('You do not have enough cash to buy this level');
      return false;
    }

    return LevelService.buyLevelbyOrganizationId(
      level._id, currentOrg._id
    )
    .then(buyLevelSuccess)
    .catch(function(response) {
      LoggerService.errorFromResponse(response);
    });

    function buyLevelSuccess() {
      level.bought = true;

      LoggerService.success("Level "+level.name+" succesfully bought !");
      CurrentUserService.loadOrganizationStatistics();
    }
  }

}

angular
  .module('portal.levels')
  .controller('LevelListViewCtrl', LevelListViewCtrl);
