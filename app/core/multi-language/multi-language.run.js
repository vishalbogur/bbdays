(function() {
  'use strict';

  angular.
    module('core.multiLanguage').
    run(run);

  run.$inject = ['$http', 'gettextCatalog', 'currentLang', 'LOCALE', '$location'];

  function run($http, gettextCatalog, currentLang, LOCALE, $location) {

    var appHost = $location.host();
    var translationPath = '/nl/widgetdelivery/apps/opbwidget/translations';

    currentLang = LOCALE.nl;
    gettextCatalog.setCurrentLanguage(currentLang);
    gettextCatalog.debug = true;

    if (appHost === 'localhost') {
      translationPath = '/app/core/multi-language/translations';
    }

    $http.get('/nl/widgetcontent/ib2/opb/opb.json').
      success(function (data) {
        gettextCatalog.setStrings('nl', data);
      }).
      error(function () {
        $http.get(translationPath +'/nl.json').
          success(function (data) {
            gettextCatalog.setStrings('nl', data);
          }).
          error(function () {

        });
    });

    $http.get('/en/widgetcontent/ib2/opb/opb.json').
      success(function (data) {
        gettextCatalog.setStrings('en', data);
      }).
      error(function () {
        $http.get(translationPath +'/en.json').
          success(function (data) {
            gettextCatalog.setStrings('en', data);
          }).
          error(function () {

        });
    });

  };
})();
