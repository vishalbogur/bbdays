(function() {
  'use strict';

  angular.
    module('core.client').
    factory('Client', clientService);

  clientService.$inject = ['$resource'];

  function clientService($resource) {
    return $resource('/operationalbuffers/v1/:clientId/:table/:tableId', {});
  };
})();
