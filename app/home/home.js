angular.module('portal.home', [
  'ui.router',
  'templates',
  'ngAnimate'
])
.config(function($stateProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: 'home/views/main.tpl.html'
  });

})
.controller('HomeController', function($scope) {
  $scope.loaded = true;
});
