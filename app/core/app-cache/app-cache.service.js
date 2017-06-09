(function() {
  'use strict';

  angular.
    module('core.appCache').
    factory('appCache', appCache);

  appCache.$inject = ['$cacheFactory'];

  function appCache($cacheFactory) {
    return $cacheFactory('cacheData');
  };
})();
