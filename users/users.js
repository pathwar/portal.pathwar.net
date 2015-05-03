"use strict";

angular.module("portal.users", ["ui.router", "templates", "ngAnimate", "restangular"]).config(function ($stateProvider) {
  // CRUD
  $stateProvider.state("users", {
    url: "/users",
    abstract: true,
    templateUrl: "users/views/main.tpl.html"
  }).state("users.list", {
    url: "",
    controller: "UserListCtrl",
    controllerAs: "vm",
    templateUrl: "users/views/list.tpl.html"
  }).state("users.view", {
    url: "/:id",
    controller: "UserViewCtrl",
    controllerAs: "vm",
    templateUrl: "users/views/view.tpl.html"
  }).state("users.edit", {
    url: "/:id/edit",
    controller: "UserEditCtrl",
    controllerAs: "vm",
    templateUrl: "users/views/form.tpl.html"
  }).state("users.invitations", {
    url: "/:id/invitations",
    controller: "UserInvitationsCtrl",
    controllerAs: "vm",
    templateUrl: "users/views/invitations.tpl.html"
  });

  // Other
  $stateProvider.state("login", {
    url: "^/login",
    controller: "UserLoginCtrl",
    controllerAs: "vm",
    templateUrl: "users/views/login.tpl.html"
  }).state("reset", {
    url: "^/reset",
    controller: "UserResetPasswordCtrl",
    controllerAs: "vm",
    templateUrl: "users/views/reset.tpl.html"
  }).state("register", {
    url: "^/register",
    controller: "UserRegisterCtrl",
    controllerAs: "vm",
    templateUrl: "users/views/register.tpl.html"
  });
});