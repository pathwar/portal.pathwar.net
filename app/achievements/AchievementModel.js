function AchievementModel() {

  function Achievement() {}

  Organization.build = function(data) {
    var org = new Achievement();
    angular.extend(org, data);
    return org;
  };

  return Organization;
}

angular
  .module('portal.achievements')
  .factory('Achievement', AchievementModel);
