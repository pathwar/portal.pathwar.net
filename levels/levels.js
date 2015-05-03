"use strict";

angular.module("portal.levels", ["ui.router", "templates", "ngAnimate", "restangular"]).config(function ($stateProvider) {
  $stateProvider.state("levels", {
    url: "/levels",
    abstract: true,
    template: "<div ui-view></div>"
  }).state("levels.list", {
    url: "",
    controller: "LevelListViewCtrl",
    controllerAs: "vm",
    templateUrl: "levels/views/list.tpl.html"
  }).state("levels.view", {
    url: "/:id",
    controller: "LevelViewCtrl",
    controllerAs: "vm",
    templateUrl: "levels/views/view.tpl.html"
  });
});