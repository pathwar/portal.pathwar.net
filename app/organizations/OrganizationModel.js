function OrganizationModel() {

  function Organization() {}

  Organization.prototype.getAvatarUrl = function(size=32) {
    return 'https://www.gravatar.com/avatar/'+this.gravatar_hash+'?s='+size+'&d=mm';
  };

  Organization.build = function(data) {
    var org = new Organization();
    angular.extend(org, data);
    return org;
  };

  return Organization;
}

angular
  .module('portal.organizations')
  .factory('Organization', OrganizationModel);
