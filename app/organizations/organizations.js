angular.module('portal.organizations', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular',
  'portal.services'
])
.config(function($stateProvider) {

  $stateProvider.state('organizations', {
    url: '/organizations',
    abstract: true,
    templateUrl: 'organizations/views/main.tpl.html'
  })
  .state('organizations.list', {
    url: '',
    controller: 'OrganizationListCtrl',
    controllerAs: 'vm',
    templateUrl: 'organizations/views/list.tpl.html'
  })
  .state('organizations.view', {
    url: '/:id',
    controller: 'OrganizationViewCtrl',
    controllerAs: 'vm',
    templateUrl: 'organizations/views/view.tpl.html'
  })
  .state('organizations.admin', {
    url: '/:id/admin',
    abstract: true,
    templateUrl: 'organizations/views/admin.tpl.html'
  })
    .state('organizations.admin.settings', {
      url: '/settings',
      controller: 'OrganizationSettingsCtrl',
      controllerAs: 'vm',
      templateUrl: 'organizations/views/settings.tpl.html'
    })
    .state('organizations.admin.members', {
      url: '/members',
      controller: 'OrganizationMembersCtrl',
      controllerAs: 'vm',
      templateUrl: 'organizations/views/members.tpl.html'
    })
    .state('organizations.admin.invites', {
      url: '/invites',
      controller: 'OrganizationInvitesCtrl',
      controllerAs: 'vm',
      templateUrl: 'organizations/views/invites.tpl.html'
    })
    .state('organizations.admin.invite', {
      url: '/invite',
      controller: 'OrganizationInviteCtrl',
      controllerAs: 'vm',
      templateUrl: 'organizations/views/invite.tpl.html'
    })
  .state('createOrganization', {
    url: '/organization/create',
    controller: 'OrganizationCreateCtrl',
    controllerAs: 'vm',
    templateUrl: 'organizations/views/create.tpl.html'
  });

});
