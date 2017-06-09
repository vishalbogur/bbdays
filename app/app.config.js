(function () {
    'use strict';

    angular.
    module('retroApp').
    config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/start'});
    };

})();
