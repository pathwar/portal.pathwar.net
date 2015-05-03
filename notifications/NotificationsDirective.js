"use strict";

function NotificationDirective() {
  var link = function (scope, element, attrs) {};

  var directive = {
    restrict: "EA",
    templateUrl: "notifications/notificationsDirective.tpl.html",
    controller: NotificationDirectiveCtrl,
    controllerAs: "vm",
    bindToController: true,
    link: link };

  return directive;
}

// @ngInject
function NotificationDirectiveCtrl($scope, $state, NotificationService) {
  var init = function () {
    NotificationService.getNotifications();

    $scope.$on("$destroy", function () {
      NotificationService.markAsAllRead();
    });
  };

  var viewNotification = function (notification) {
    var state = NotificationService.resolveState(notification);

    if (state) {
      $state.go(state.name, state.params);
    }
  };

  var vm = this;

  vm.notifications = NotificationService.items;
  vm.viewNotification = viewNotification;

  init();
}

function NotificationCountDirective() {
  var link = function (scope, element, attrs) {};

  var directive = {
    restrict: "EA",
    controller: NotificationCountDirectiveCtrl,
    controllerAs: "vm",
    bindToController: true,
    link: link };

  return directive;
}

// @ngInject
function NotificationCountDirectiveCtrl(NotificationService) {
  var init = function () {
    NotificationService.getUnreadNotifications();
  };

  var vm = this;

  vm.getUnreadNotificationsCount = NotificationService.getUnreadNotificationsCount;

  init();
}

angular.module("portal.notifications").directive("notificationsCount", NotificationCountDirective).directive("notifications", NotificationDirective);
//console.log('linked');
//console.log('linked');