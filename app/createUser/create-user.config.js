(function() {
  angular.
    module('createUser').
    config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
      $routeProvider.
        when('/createuser', {
          templateUrl: 'createUser/createUser.html',
          controller: 'CreateUserController'
        });
  };
})();
