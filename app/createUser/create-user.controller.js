(function () {
    'use strict';

    angular.
    module('createUser').
    controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$scope', '$location', 'Client', 'usSpinnerService', '$filter', '$timeout', 'appCache', '$http', 'constant'];

    function CreateUserController($scope, $location, Client, usSpinnerService, $filter, $timeout, appCache, $http, constant) {

      $scope.input = {};
      $scope.input.username ='';
      var cache = appCache.get('SearchData');
      usSpinnerService.stop('spinner-1');
      if(null!==cache && !angular.isUndefined(cache)){
          $scope.input.username = cache.username;
      }
      appCache.removeAll();
      $scope.isEmailValid = function(){
          return ($scope.input.username.$pristine);
      }
      $scope.createUser = function () {
        var userDetails = {
            "userid" : ""+$scope.input.username+"",
            "userpin" : ""+$scope.input.password+"",
            "firstName" : ""+$scope.input.fname+"",
            "lastName" : ""+$scope.input.lname+""
        };
        $http.post(constant.restUrl+"user", userDetails)
.success(function(response){
      $location.path('/retrohome').search({
      userid : $scope.input.username,
      userName : $scope.input.fname +' '+ $scope.input.lname
    });
  }).error(function(response){
    $scope.isInvalidUserName = function(){
      return true;
    };
  });
};
      $scope.handleKeypress = function (key) {
          if (key === 13) {
              $scope.search();
          }
      };
      $scope.gotoSearch=function(){
          $location.path('/search');
      }
    };
})();
