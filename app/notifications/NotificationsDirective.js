function NotificationDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'notifications/notificationsDirective.tpl.html',
    controller: NotificationDirectiveCtrl,
    controllerAs: 'vm',
    bindToController: true,
    link: link,
  };

  return directive;

  function link(scope, element, attrs) {
    //console.log('linked');
  }
}

function NotificationDirectiveCtrl(NotificationService) {
  var vm = this;

  vm.notifications = NotificationService.items;

  init();

  function init() {
    NotificationService.getNotifications();
  }
}

angular
  .module('portal.notifications')
  .directive('notifications', NotificationDirective);
