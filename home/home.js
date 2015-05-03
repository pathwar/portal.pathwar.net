"use strict";

angular.module("portal.home", ["ui.router", "templates", "ngAnimate", "portal.news"]).config(function ($stateProvider) {
  $stateProvider.state("home", {
    url: "",
    abstract: true,
    templateUrl: "home/views/main.tpl.html"
  }).state("home.welcome", {
    url: "/",
    controller: "HomeCtrl",
    controllerAs: "vm",
    templateUrl: "home/views/welcome.tpl.html"
  });
}).controller("HomeCtrl", function (CurrentUserService, NewsService, Restangular) {
  var translateActivities = function (activities) {
    angular.forEach(activities, function (activity) {
      activity.message = activityMessages[activity.action] || activity.action;
    });
    return activities;
  };

  var vm = this;

  vm.organization = CurrentUserService.getOrganization();
  vm.activities = {};

  NewsService.getNews().then(function (news) {
    vm.news = NewsService.news;
  });

  var activityMessages = {
    "user-tokens-create": "A user logged in",
    "users-create": "A user registered",
    "organizations-create": "An organization has been created",
    "organization-levels-create": "An organization bought a level",
    "organization-achievement-create": "An organization earned an achievement"
  };

  Restangular.all("user-activities").getList({
    sort: "-_created"
  }).then(function (activities) {
    vm.activities["private"] = translateActivities(activities);
  });

  Restangular.all("activities").getList({
    sort: "-_created"
  }).then(function (activities) {
    vm.activities["public"] = translateActivities(activities);
  });
});