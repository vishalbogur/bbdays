(function () {
    'use strict';

    angular.
    module('retroHome').
    controller('RetroHomeController', RetroHomeController);

    RetroHomeController.$inject = ['$scope', '$location', 'Client', 'usSpinnerService', '$filter', '$timeout', 'appCache', '$http', 'constant'];

    function RetroHomeController($scope, $location, Client, usSpinnerService, $filter, $timeout, appCache, $http, constant) {
      usSpinnerService.stop('spinner-1');

        var teamDetails;
        $scope.loadBoardNames = function(){
          teamDetails = ($scope.teamnameSearch).split('$');
        $http.get(constant.restUrl+"getBoard?teamId="+teamDetails[1])
  .success(function(response){
        $scope.boardNames = response;
        $scope.emptyBoardNames = function(){
          return false;
        };
    }).error(function(response){
      $scope.boardNames = null;
      $scope.emptyBoardNames = function(){
        return true;
      };
    });
      }

      $scope.loadTeamNames = function(){
        $http.get(constant.restUrl+"getTeam")
.success(function(response){
      $scope.teamNames = response;
  }).error(function(response){
    $scope.emptyTeamNames = function(){
      return true;
    };
  });
    }
        var userId;
        var searchObject = $location.search();
        if(null !== searchObject && !angular.isUndefined(searchObject)){
          userId = searchObject.userid;
          $scope.userName = searchObject.userName;
        }

        var session_data = {};
        var cache = appCache.get('SearchData');

        $scope.gotoSearch=function(){
            $location.path('/search');
        }

        $scope.searchBoard = function searchBoard(){

          var details = ($scope.retronameSearch).split('$');

          $location.path('/boarddetails').search({
              view : "DETAILS",
              userid : userId,
              boardname : details[1],
              boardid : details[0],
              sprintid : details[2],
              teamName : teamDetails[0],
              userName : $scope.userName
          });
        }

        $scope.createBoard = function createBoard(){
          var teamInfo = $scope.teamName.split('$');
          var retroBoard = {
              "boardName" : ""+$scope.retroname+"",
              "userId" : ""+userId+"",
              "sprintId" : ""+$scope.sprintid+"",
              "teamName" : ""+teamInfo[0]+"",
              "teamid" : ""+teamInfo[1]+""
          };

          $http.post(constant.restUrl+"retroboard", retroBoard)
  .success(function(response){
      $location.path('/boarddetails').search({
          view : "DETAILS",
          userid : userId,
          boardname : $scope.retroname,
          sprintid : $scope.sprintid,
          boardid : response.boardId,
          teamName : teamInfo[0],
          userName : $scope.userName
      });

    }).error(function(response){
      $window.alert('ERROR..!!!!');
    });
        }

    }
})();
