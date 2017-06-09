(function() {
  angular.
    module('retroLogin').
    config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
      $routeProvider.
        when('/search', {
          templateUrl: 'retroLogin/retroLogin.html',
          controller: 'loginController'
        });
  };
})();
