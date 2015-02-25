function NotificationService(Restangular, CurrentUserService) {
  var service = {};

  service.items = [];

  service.getNotifications = getNotifications;

  return service;

  function getNotifications() {
    return Restangular.all('user-notifications')
      .getList({
        where: JSON.stringify({
          user: CurrentUserService.getUser()._id
        }),
        sort: '-created'
      })
      .then(
        function(items) {
          angular.copy(items, service.items);
          return service.items;
        }
      );
  }
}

angular
  .module('portal.notifications')
  .factory('NotificationService', NotificationService);
