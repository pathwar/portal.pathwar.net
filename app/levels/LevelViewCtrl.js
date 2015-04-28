function LevelViewCtrl(
  $state, $stateParams, CurrentUserService, LevelService, LevelHintService,
  LevelValidationService, LoggerService
) {
  var vm = this;

  // Init to undefined to avoid Bind Once not listening to future changes
  vm.level = undefined;
  vm.orgLevel = undefined;

  vm.validate = validate;
  vm.buyLevel = buyLevel;

  var currentOrg = CurrentUserService.getOrganization();

  vm.organizationBoughtLevel = function(orgLevel) {
    return orgLevel && angular.isDefined(orgLevel.level);
  };

  init();

  /** Retrieve level info along side level instances */
  function init() {
    // Fetchs level info then decorates with all available level info
    LevelService.getLevel($stateParams.id).then(function(level) {
      vm.level = level
      loadBoughtLevel();
    });
  }

  function loadBoughtLevel() {
    // Fetches status of the level for current organization
    LevelService.getOrganizationLevel(currentOrg, vm.level)
      .then(function(orgLevel) {
        if (orgLevel._id) {
          vm.orgLevel = orgLevel;
          vm.level.bought = true;

          // Fetches running instances of the level
          LevelService.getLevelInstances({
            where: {
              level: vm.level._id
            }
          }).then(function(instances) {
            if (instances) {
              vm.level.instances = instances;
            }
          });
        }
      });
  }

  /** Validate level with passphrase and validation message */
  function validate(validation) {
    LevelValidationService.validateOrganizationLevel(validation, vm.orgLevel)
      .then(
        //SUCCESS
        function(data) {
          vm.orgLevel.has_access = false; //switch to orgLevel
          LoggerService.success('Congratulations, your validation is pending validation !');
          $state.reload();
        },
        // ERROR
        function(response) {
          LoggerService.errorFromResponse(response);
        }
      );

  }

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

      LoggerService.error("Level "+level.name+" succesfully bought !");
      CurrentUserService.loadOrganizationStatistics();
      loadBoughtLevel(); //use object in 201 instead of researching
    }
  }

}

angular
  .module('portal.levels')
  .controller('LevelViewCtrl', LevelViewCtrl);
