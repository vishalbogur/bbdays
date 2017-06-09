(function () {
    'use strict';

    angular.
    module('core.msecAuthentication').
    controller('MsecAuthenticationController', MsecAuthenticationController);

    MsecAuthenticationController.$inject = ['$scope', '$location', '$http', 'usSpinnerService', 'currentLang', '$rootScope'];

    function MsecAuthenticationController($scope, $location, $http, usSpinnerService, currentLang, $rootScope) {

      usSpinnerService.spin('spinner-1');

      $scope.authorized = false;

      $http({
        method: 'GET',
        url: '/operationalbuffers/v1/authorize',
        headers: {'Accept-Language': currentLang}
      }).then(function (response) {
          if (response.status === 204) {
            usSpinnerService.stop('spinner-1');
            $scope.unauthorized = false;
            $scope.authorized = true;
            $location.path('/search');
          }
        }, function (response) {
          if (response.status === 401 || response.status === 403) {
            $scope.unauthorized = true;
          }
          usSpinnerService.stop('spinner-1');
        });

      $rootScope.$on('$routeChangeStart', function() {
        if (!$scope.authorized) {
          $location.path('/authentication');
        }
      });
    };
})();
