function UserAccountCtrl(
  $state, CurrentUserService, User, Restangular
) {
  var vm = this;

  vm.user = {};
  vm.save = save;

  init();

  function init() {

    var user = CurrentUserService.getUser();

    Restangular.one('accounts', user._id).get()
    .then(function(response) {
      vm.user = User.build(response.data);
    });
  }

  function save(user) {
    var toSend = _.pick(user, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    user.patch(toSend).then(function(response) {
      LoggerService.success('Changes saved');
    })
    .catch(function(response) {
      LoggerService.errorFromResponse(response);
    });
  };

}

angular
  .module('portal.users')
  .controller('UserAccountCtrl', UserAccountCtrl);
