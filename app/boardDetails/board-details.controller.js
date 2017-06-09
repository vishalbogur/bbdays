(function () {
    'use strict';

    angular.
    module('boardDetails').
    controller('BoardDetailsController', BoardDetailsController);

    BoardDetailsController.$inject = ['$scope', '$location', 'Client', 'usSpinnerService', '$filter', '$timeout', 'appCache', '$http', 'constant', '$window'];

    function BoardDetailsController($scope, $location, Client, usSpinnerService, $filter, $timeout, appCache, $http, constant, $window) {

      usSpinnerService.stop('spinner-1');
          //initializing to default
          var pagechanged = false;
          var boardId, userId;
          $scope.wentWellComments = [];
          $scope.improvements = [];
          $scope.actionItems = [];
          $scope.retroTypeOptions = [{"name" : "WENT WELL", "value" : "W"},{"name" : "IMPROVEMENT", "value" : "I"},{"name" : "ACTION ITEM", "value" : "A"}];
          $scope.statusOptions = [{"name" : "TO DO", "value" : "T"},{"name" : "IN PROGRESS", "value" : "I"},{"name" : "DONE", "value" : "D"}];

          var searchObject = $location.search();
          //initializing with values passed from the reports screen
          if(null !== searchObject && !angular.isUndefined(searchObject)){
            userId = searchObject.userid;
            $scope.boardname = searchObject.boardname;
            $scope.sprintid = searchObject.sprintid;
            $scope.teamName = searchObject.teamName;
            $scope.userName = searchObject.userName;
            boardId = searchObject.boardid;
          }
          loadComments();
          function loadComments(){
            $http.get(constant.restUrl+"getRetroSpective?boardId="+boardId)
            .success(function(response){
              $scope.comments = response;
              angular.forEach($scope.comments, function(value, key) {
                  switch (value.retType) {
                    case 'W': $scope.wentWellComments.push(value);
                              break;
                    case 'I': $scope.improvements.push(value);
                              break;
                    case 'A': $scope.actionItems.push(value);
                              break;
                    default: $scope.noComments = true;
                  }
                });
                if(null != $scope.wentWellComments && $scope.wentWellComments.length > 0){
                  $scope.wentWell = true;
                }else if(null != $scope.improvements && $scope.improvements.length > 0){
                  $scope.improve = true;
                }else if(null != $scope.actionItems && $scope.actionItems.length > 0){
                  $scope.action = true;
                }
          }).error(function(response){
            //$window.alert('ERROR IN RETRIEVAL OF COMMENTS: ');
          });
          }

          $scope.addComment = function addComment(){
            var retroStatusValue = "";
            if(null !== $scope.status && !angular.isUndefined($scope.status)){
               retroStatusValue = $scope.status.value;
            }
            var retrospective = {
                "retroDescription" : ""+$scope.description+"",
                "userId" : ""+userId+"",
                "status" : ""+retroStatusValue+"",
                "retType" : ""+$scope.retrotype.value+"",
                "boardId" : boardId
            };
            $http.post(constant.restUrl+"retrospective", retrospective)
    .success(function(response){
        $window.location.reload();
      }).error(function(response){
        //$window.alert('ERROR..!!!!');
      });
          }

          $scope.gotoReports = function () {
             $location.path('/retrohome').search({
               userName : $scope.userName
             });

          };

          $scope.logOut = function () {
             $location.path('/search');
          };

          $scope.updateDescription = function(desc, commentId, status){
            if(null !== desc && !angular.isUndefined(desc)){
              var retrospectiveUpdate = {
                  "retroDescription" : ""+desc+"",
                  "userId" : ""+userId+"",
                  "retroId" : ""+commentId+"",
                  "status" : ""+status
              };
              $http.post(constant.restUrl+"updateRetrospective", retrospectiveUpdate)
      .success(function(response){
          //$window.location.reload();
        }).error(function(response){
          //$window.alert('ERROR..!!!!');
        });
            }
          }

          $scope.updateCommentStatus = function(status, commentId, desc){
            if(null !== desc && !angular.isUndefined(desc)){
              var retrospectiveUpdate = {
                  "retroDescription" : ""+desc+"",
                  "userId" : ""+userId+"",
                  "retroId" : ""+commentId+"",
                  "status" : ""+status
              };
            $http.post(constant.restUrl+"updateRetrospective", retrospectiveUpdate)
      .success(function(response){
        //  $window.location.reload();
        }).error(function(response){
          //$window.alert('ERROR..!!!!');
        });
            }
          }


  $scope.getExcel = function () {
      //window.location.href = '/investmentcosts/export?view=EXPORT&portfolioNumber='+$scope.portfolio+'&month='+$scope.month+'&year='+$scope.year+'&reportBlockNumber='+$scope.blockNumber+'&reportGroupNumber='+$scope.groupNumber;
  };

  $scope.checkNull = function(val) {
      if(angular.isUndefined(val) || val==null){
          return '';
      }else{
          return val;
      }
  };

    }
})();
