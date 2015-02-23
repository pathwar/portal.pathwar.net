function NotificationService(Restangular) {
  var service = {};

  service.items = [];

  service.getNotifications = getNotifications;

  return service;

  function getNotifications() {
    angular.copy([
      {
        message: "Yo bienvenue",
      },
      {
        message: "T'es beau"
      }
    ], service.items);

    return service.items;
  }
}

angular
  .module('portal.notifications')
  .factory('NotificationService', NotificationService);
