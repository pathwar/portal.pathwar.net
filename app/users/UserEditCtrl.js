function UserEditCtrl(
  $scope, $state, $stateParams, Restangular
) {
  var vm = this;

  vm.user = {};
  vm.save = save;

  init();

  function init() {
    var Users = Restangular.service('users');
    var user = Users.one($stateParams.id);

    user.get().then(function(response) {
      vm.user = response.data;
    });
  }

  function save(user) {
    var toSend = _.pick(user, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    user.patch(toSend).then(function(response) {
      $state.transitionTo('users.list');
    });
  };

}

angular
  .module('portal.users')
  .controller('UserEditCtrl', UserEditCtrl);
