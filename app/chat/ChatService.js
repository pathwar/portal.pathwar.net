function ChatService($q, Restangular, Organization) {
  var service = {};

  service.getMessages = getMessages;

  return service;

  function getMessages(since = {}) {

    var messages = [{
      from: Organization.build({
        name: 'Anal',
        gravatar_hash: 'c@42.am'
      }),
      message: '" OR 1=1 -- ',
      created: new Date()
    }, {
      from: Organization.build({
        name: 'Mobylette',
        gravatar_hash: 'm@42.am'
      }),
      message: 'update come on yeah yeah lolz',
      created: new Date()
    }];

    return $q(function(resolve, reject) {
      resolve(messages);
    });
  };
}

angular
  .module('portal.chat')
  .factory('ChatService', ChatService);
