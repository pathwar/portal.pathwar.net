"use strict";

function ChatService($q, Restangular, Organization) {
  var getMessages = function () {
    var since = arguments[0] === undefined ? {} : arguments[0];


    var messages = [{
      from: Organization.build({
        name: "Anal",
        gravatar_hash: "c@42.am"
      }),
      message: "\" OR 1=1 -- ",
      created: new Date()
    }, {
      from: Organization.build({
        name: "Mobylette",
        gravatar_hash: "m@42.am"
      }),
      message: "update come on yeah yeah lolz",
      created: new Date()
    }];

    return $q(function (resolve, reject) {
      resolve(messages);
    });
  };

  var service = {};

  service.getMessages = getMessages;

  return service;

  ;
}

angular.module("portal.chat").factory("ChatService", ChatService);