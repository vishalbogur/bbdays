(function() {
  angular.
    module('retroHome').
    config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
      $routeProvider.
        when('/retrohome', {
          templateUrl: 'retroHome/retroHome.html',
          controller: 'RetroHomeController'
        });
  };
})();
