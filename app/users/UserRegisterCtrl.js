function UserRegisterCtrl(
  $scope, $state, UserService,
) {
  var vm = this;

  vm.register = register;

  function register(user) {
    console.log(user);
    UserService.register(user).then(function(result) {
      console.log(result);
      console.log('user created');
    });
  };

}

angular
  .module('portal.users')
  .controller('UserRegisterCtrl', UserRegisterCtrl);
