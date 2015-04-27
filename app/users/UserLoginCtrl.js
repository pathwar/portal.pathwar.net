function UserLoginCtrl(
  $scope, $state, CurrentUserService
) {
  var vm = this;

  vm.credentials = {};
  vm.login = login;

  function login(credentials) {
    CurrentUserService.login(credentials).then(
      function success(user) {
        $state.transitionTo('home.welcome');
      },
      function error(response) {
        alert(response.data._error.message);
      }
    );
  };

}

angular
  .module('portal.users')
  .controller('UserLoginCtrl', UserLoginCtrl);
