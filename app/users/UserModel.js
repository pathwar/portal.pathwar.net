function UserModel() {

  function User() {}

  User.prototype.getAvatarUrl = function(size=32) {
    return 'https://www.gravatar.com/avatar/'+this.gravatar_hash+'?s='+size+'&d=mm';
  };

  User.build = function(data) {
    var user = new User();
    angular.extend(user, data);
    return user;
  };

  return User;
}

angular
  .module('portal.users')
  .factory('User', UserModel);
