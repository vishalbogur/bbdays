(function() {
  angular.
    module('boardDetails').
    config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
      $routeProvider.
        when('/boarddetails', {
          templateUrl: 'boardDetails/boardDetails.html',
          controller: 'BoardDetailsController'
        });
  };
})();
