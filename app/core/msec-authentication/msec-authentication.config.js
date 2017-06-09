(function() {
  angular.
    module('core.msecAuthentication').
    config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
      $routeProvider.
        when('/authentication', {
          templateUrl: 'core/msec-authentication/msec-authentication.template.html',
          controller: 'MsecAuthenticationController'
        });
  };
})();
