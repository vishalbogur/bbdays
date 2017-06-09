(function() {
  'use strict';

  var showMessage = function(content, key) {
    var html = '<div class="alert alert-warning"><span class="glyphicon glyphicon-warning-sign" id="errorImage"></span><h3>';
    $('#http-error-block').empty();
    $('#http-error-block').html( html + content + '</h3></div>');
    $('#errorImage').attr('title',key);
    $('#http-error-block').show();
  };

  /**
   * liwidHttpErrorResponseInterceptor acts as an HTTPresponseinterceptor, for now it has only reponseError interception
   */

  angular.
    module('core.httpErrorHandling').
    factory('httpErrorResponseInterceptor', httpErrorResponseInterceptor);

  httpErrorResponseInterceptor.$inject = ['$timeout', '$q', '$location', 'gettextCatalog'];

  function httpErrorResponseInterceptor($timeout, $q, $location, gettextCatalog) {
    /**
      * responseErrorInterceptor in case of error from backend- message thrown from backend is displayed,
      * message key is displayed on mouseover on error icon
      */
      var responseErrorInterceptor = {
        'responseError': function(rejection)
        {
          if(rejection.data!==null && angular.isDefined(rejection.data.messages) && rejection.data.messages[0]!==null) {
           showMessage(rejection.data.messages[0].messageText,rejection.data.messages[0].messageKey);
           if(rejection.data.messages.length > 0) {
            for(var i = 0; i < rejection.data.messages.length; i++) {
              showMessage(rejection.data.messages[i].messageText, rejection.data.messages[0].messageKey);
            }
          }
        }

        else if (rejection.status === 403 || rejection.status === 401) {
          $location.path('/authentication');
        }

        else if (rejection.status !== 404) {
          showMessage(gettextCatalog.getString('LABEL_HTTP_ERROR_TEXT'));
        }

        return $q.reject(rejection);
      },
      // optional method
   'request': function(config) {
     // do something on success
     config.headers['Accept-Language'] = gettextCatalog.getCurrentLanguage();

     return config;
   }
    };

    return responseErrorInterceptor;
  };
})();
