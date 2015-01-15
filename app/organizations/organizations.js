var orgs = angular.module('portal.organizations', ['ui.router', 'templates', 'ngAnimate', 'restangular']);

orgs.config(function($stateProvider) {

  $stateProvider.state('organizations', {
    url: '/organizations',
    controller: 'OrganizationsController',
    templateUrl: 'organizations/organizations.tpl.html',
  });

});

orgs.controller('OrganizationsController', function($scope, $http, $sce, $timeout, Restangular) {

  var Orgs = Restangular.service('organizations');

  Orgs.getList().then(function(orgs) {
    $scope.orgs = orgs;
    $scope.loaded = true;
  });

});
