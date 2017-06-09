(function () {
    'use strict';

    angular.
    module('retroStart').
    controller('startController', startController);

    startController.$inject = ['$scope', '$location'];

      function startController($scope, $location) {
        $(document).ready(function(){
            $('.panel-body').click(function(){
            $('.img-responsive').fadeOut(3000);
          });
        });

        $scope.gotoLogin = function(){
          $location.path('/search');
      };
      }
})();
