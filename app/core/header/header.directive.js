(function() {
  'use strict';

  angular.
    module('core.header').
    directive('aabHeader', aabHeader);

  function aabHeader() {
      var directive =  {
        restrict: 'EA',
        templateUrl: 'core/header/header.template.html',
        controller: headerController,
        controllerAs: 'vm'
      };

      return directive;
  };

      headerController.$inject = ['gettextCatalog', 'currentLang'];

      function headerController (gettextCatalog, currentLang) {
        var vm = this;
        vm.changeLocale = function (lang) {
            currentLang = lang;
            gettextCatalog.setCurrentLanguage(lang);
        };

        vm.currentLocale = function(lang) {
            if(lang === currentLang) {
                return 'active';
            }
        };
      };
})();
