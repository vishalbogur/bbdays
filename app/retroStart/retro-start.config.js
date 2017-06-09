(function() {
  angular.
    module('retroStart').
    config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
      $routeProvider.
        when('/start', {
          templateUrl: 'retroStart/retroStart.html',
          controller: 'startController'
        });
  };
})();
