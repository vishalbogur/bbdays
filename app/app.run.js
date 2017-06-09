// blank file
(function () {
    'use strict';

    angular.
    module('retroApp')
    .run(run);

    run.$inject = ['gettextCatalog', '$rootScope'];

    function run (gettextCatalog, $rootScope) {
				gettextCatalog.currentLanguage = 'nl';
				$rootScope.currentLanguage = 'nl';
				gettextCatalog.currentLanguage = $rootScope.currentLanguage;
				gettextCatalog.debug = true;
			};
})();
