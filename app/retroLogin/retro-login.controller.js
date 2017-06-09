(function () {
    'use strict';

    angular.
    module('retroLogin').
    controller('loginController', loginController);

    loginController.$inject = ['$scope', '$location', 'currentLang', 'Client', 'usSpinnerService', 'appCache', '$filter', '$http', 'constant', '$window'];

      function loginController($scope, $location, currentLang, Client, usSpinnerService, appCache, $filter, $http, constant, $window) {
        $scope.input = {};
        $scope.input.username ='';
        var cache = appCache.get('SearchData');
        usSpinnerService.stop('spinner-1');
        if(null!==cache && !angular.isUndefined(cache)){
            $scope.input.username = cache.username;
        }
        appCache.removeAll();

        $scope.search = function () {
          $http.get(constant.restUrl+$scope.input.username+"?userpin="+$scope.input.password)
  .success(function(response){
        $location.path('/retrohome').search({
        userid : $scope.input.username,
        userName : response.firstName +' '+ response.lastName
      });
    }).error(function(response){
      $scope.isInvalidLogin = function(){
        return true;
      };
    });
};

  $scope.createUser = function(){
    $location.path('/createuser');
  }
        $scope.handleKeypress = function (key) {
            if (key === 13) {
                $scope.search();
            }
        };
}
})();
