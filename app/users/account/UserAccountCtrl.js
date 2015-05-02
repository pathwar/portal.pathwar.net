function UserAccountCtrl(
  $state, CurrentUserService, User, Restangular, LoggerService
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

    var resource = Restangular.one('accounts', user._id);

    var toSend = _.pick(user, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    resource.patch(toSend).then(function(response) {
      LoggerService.success('Changes saved');
      user._etag = response.data._etag;
      user.last_login = true; //TODO: Fix me, reload has too much cache
    })
    .catch(function(response) {
      LoggerService.errorFromResponse(response);
    });
  };

}

angular
  .module('portal.users')
  .controller('UserAccountCtrl', UserAccountCtrl);
