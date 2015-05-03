"use strict";

angular.module("portal.chat", ["ui.router", "templates", "ngAnimate", "restangular"]).config(function ($stateProvider) {
  $stateProvider.state("chat", {
    url: "/chat",
    abstract: true,
    template: "<div ui-view></div>"
  }).state("chat.room", {
    url: "",
    controller: "ChatRoomCtrl",
    controllerAs: "vm",
    templateUrl: "chat/views/main.tpl.html"
  });
}).controller("ChatRoomCtrl", function (ChatService, Organization) {
  var init = function () {
    ChatService.getMessages().then(function (messages) {
      console.log(messages);
      vm.messages = messages;
    });
  };

  var sendMessage = function (message) {
    vm.messages.push({
      message: message.value,
      created: new Date(),
      from: Organization.build({
        name: "Mobylette",
        gravatar_hash: "c@42.am"
      })
    });

    message.value = "";
  };

  var vm = this;

  vm.sendMessage = sendMessage;

  init();
});