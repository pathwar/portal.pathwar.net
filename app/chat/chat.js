angular
  .module('portal.chat', [
    'ui.router',
    'templates',
    'ngAnimate',
    'restangular'
  ])
  .config(function($stateProvider) {

    $stateProvider.state('chat', {
      url: '/chat',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('chat.room', {
      url: '',
      controller: 'ChatRoomCtrl',
      controllerAs: 'vm',
      templateUrl: 'chat/views/main.tpl.html'
    });
  })

  .controller('ChatRoomCtrl', function(
    ChatService
  ) {
    var vm = this;

    vm.sendMessage = sendMessage;

    init();

    function init() {
      ChatService.getMessages()
        .then(function(messages) {
          console.log(messages);
          vm.messages = messages;
        });
    }

    function sendMessage(message) {
      vm.messages.push(message);
    }

  });
