var controllers = angular.module('portal.controllers');

controllers.controller('NavController', function($scope, $state, CurrentUserService) {

  $scope.isAuthentificated = CurrentUserService.isAuthentificated;
  $scope.logout = function() {
    CurrentUserService.logout().then(function() {
      $state.transitionTo('home');
    });
  };

});
