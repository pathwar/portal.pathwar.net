var orgs = angular.module('portal.organizations', ['ui.router', 'templates', 'ngAnimate']);

orgs.config(function($stateProvider) {

  $stateProvider.state('organizations', {
    url: '/organizations',
    controller: 'OrganizationsController',
    templateUrl: 'organizations/organizations.tpl.html',
  });

});

orgs.controller('OrganizationsController', function($scope, $http, $sce, $timeout) {
  $scope.loaded = true
});
