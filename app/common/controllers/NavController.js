var controllers = angular.module('portal.controllers');

controllers.controller('NavController', function($scope, $state, AuthService) {

  $scope.isAuthentificated = AuthService.isAuthentificated;
  $scope.logout = function() {
    AuthService.logout().then(function() {
      $state.transitionTo('home');
    });
  };

});
