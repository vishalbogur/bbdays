!function(){"use strict";angular.module("opbApp",["ngRoute","core.header","clientSearch","clientDetails","core.msecAuthentication"])}(),function(){"use strict";function a(a){a.otherwise({redirectTo:"/authentication"})}angular.module("opbApp").config(a),a.$inject=["$routeProvider"],angular.module("opbApp").config(["$httpProvider",function(a){a.interceptors.push("httpErrorResponseInterceptor")}])}(),function(){"use strict";angular.module("core",["core.client","core.httpErrorHandling","core.appCache"])}(),function(){"use strict";angular.module("core.msecAuthentication",["ngRoute","core.client"])}(),function(){function a(a){a.when("/authentication",{templateUrl:"core/msec-authentication/msec-authentication.template.html",controller:"MsecAuthenticationController"})}angular.module("core.msecAuthentication").config(a),a.$inject=["$routeProvider"]}(),function(){"use strict";function a(a,b,c,d,e,f){d.spin("spinner-1"),a.authorized=!1,c({method:"GET",url:"/operationalbuffers/v1/authorize",headers:{"Accept-Language":e}}).then(function(c){204===c.status&&(d.stop("spinner-1"),a.unauthorized=!1,a.authorized=!0,b.path("/search"))},function(b){401!==b.status&&403!==b.status||(a.unauthorized=!0),d.stop("spinner-1")}),f.$on("$routeChangeStart",function(){a.authorized||b.path("/authentication")})}angular.module("core.msecAuthentication").controller("MsecAuthenticationController",a),a.$inject=["$scope","$location","$http","usSpinnerService","currentLang","$rootScope"]}(),function(){"use strict";angular.module("core.multiLanguage",["gettext"])}(),function(){"use strict";function a(a,b,c,d,e){var f=e.host(),g="/nl/widgetdelivery/apps/opbwidget/translations";c=d.nl,b.setCurrentLanguage(c),b.debug=!0,"localhost"===f&&(g="/app/core/multi-language/translations"),a.get("/nl/widgetcontent/ib2/opb/opb.json").success(function(a){b.setStrings("nl",a)}).error(function(){a.get(g+"/nl.json").success(function(a){b.setStrings("nl",a)}).error(function(){})}),a.get("/en/widgetcontent/ib2/opb/opb.json").success(function(a){b.setStrings("en",a)}).error(function(){a.get(g+"/en.json").success(function(a){b.setStrings("en",a)}).error(function(){})})}angular.module("core.multiLanguage").run(a),a.$inject=["$http","gettextCatalog","currentLang","LOCALE","$location"]}(),function(){"use strict";angular.module("core.multiLanguage").value("currentLang","nl")}(),function(){"use strict";angular.module("core.multiLanguage").constant("LOCALE",{nl:"nl",en:"en"})}(),function(){"use strict";angular.module("core.httpErrorHandling",["gettext"])}(),function(){"use strict";function a(a,c,d,e){var f={responseError:function(a){if(null!==a.data&&angular.isDefined(a.data.messages)&&null!==a.data.messages[0]){if(b(a.data.messages[0].messageText,a.data.messages[0].messageKey),a.data.messages.length>0)for(var f=0;f<a.data.messages.length;f++)b(a.data.messages[f].messageText,a.data.messages[0].messageKey)}else 403===a.status||401===a.status?d.path("/authentication"):404!==a.status&&b(e.getString("LABEL_HTTP_ERROR_TEXT"));return c.reject(a)},request:function(a){return a.headers["Accept-Language"]=e.getCurrentLanguage(),a}};return f}var b=function(a,b){var c='<div class="alert alert-warning"><span class="glyphicon glyphicon-warning-sign" id="errorImage"></span><h3>';$("#http-error-block").empty(),$("#http-error-block").html(c+a+"</h3></div>"),$("#errorImage").attr("title",b),$("#http-error-block").show()};angular.module("core.httpErrorHandling").factory("httpErrorResponseInterceptor",a),a.$inject=["$timeout","$q","$location","gettextCatalog"]}(),function(){"use strict";angular.module("core.appCache",[])}(),function(){"use strict";function a(a){return a("cacheData")}angular.module("core.appCache").factory("appCache",a),a.$inject=["$cacheFactory"]}(),function(){"use strict";angular.module("core.header",["core.multiLanguage"])}(),function(){"use strict";function a(){var a={restrict:"EA",templateUrl:"core/header/header.template.html",controller:b,controllerAs:"vm"};return a}function b(a,b){var c=this;c.changeLocale=function(c){b=c,a.setCurrentLanguage(c)},c.currentLocale=function(a){if(a===b)return"active"}}angular.module("core.header").directive("aabHeader",a),b.$inject=["gettextCatalog","currentLang"]}(),function(){"use strict";angular.module("core.client",["ngResource"])}(),function(){"use strict";function a(a){return a("/operationalbuffers/v1/:clientId/:table/:tableId",{})}angular.module("core.client").factory("Client",a),a.$inject=["$resource"]}(),function(){"use strict";angular.module("clientSearch",["ngRoute","core","ui.bootstrap","angularSpinner"])}(),function(){function a(a){a.when("/search",{templateUrl:"client-search/client-search.template.html",controller:"ClientSearchController"})}angular.module("clientSearch").config(a),a.$inject=["$routeProvider"]}(),function(){"use strict";function a(a,b,c,d,e,f,g){function h(){a.view=o.view,a.searched_klantID=o.klantID,angular.isDefined(a.searched_klantID)&&null!==a.searched_klantID&&angular.isDefined(a.view)&&null!==a.view&&(angular.isDefined(m)&&null!==m?l():i(),a.klantID=a.searched_klantID,a.search_clicked=!0)}function i(){var b;e.spin("spinner-1"),d.get({clientId:a.searched_klantID,view:a.view},function(c){e.stop("spinner-1"),b=c,angular.isDefined(b)&&null!==b?(a.klantRecords=b.tables,a.filteredKlantRecords=a.klantRecords,a.noSearchOutput=!1,j()):a.noSearchOutput=!0},function(){e.stop("spinner-1")})}function j(){a.totalItems=a.filteredKlantRecords.length}function k(){n.view=a.view,n.searched_klantID=a.searched_klantID,n.klantRecords=a.klantRecords,n.filteredKlantRecords=a.filteredKlantRecords,n.noSearchOutput=a.noSearchOutput,n.presentPage=a.presentPage,n.resultsPerPage=a.resultsPerPage,n.filterString=a.filterString,n.sort=a.sort,f.put("appSearchedCache",n)}function l(){a.searched_klantID===m.searched_klantID&&a.view===m.view?(a.view=m.view,a.searched_klantID=m.searched_klantID,a.klantRecords=m.klantRecords,a.filteredKlantRecords=m.filteredKlantRecords,a.noSearchOutput=m.noSearchOutput,a.resultsPerPage=m.resultsPerPage,a.presentPage=m.presentPage,a.filterString=m.filterString,a.sort=m.sort,j()):i()}var m=f.get("appSearchedCache"),n=[],o=b.search();a.klantID=null,a.search_clicked=!1,a.searched_klantID=null,a.maxSize=1,a.options=[10,25,50,100],a.resultsPerPage=10,a.presentPage=1,a.totalItems,a.sort={},h(),a.search=function(c){$("#http-error-block").empty(),!angular.isDefined(a.klantID)||a.view===c&&a.klantID===a.searched_klantID?h():b.path("search").search({view:c,klantID:a.klantID})},a.isKlantIDValid=function(){return a.searchform.klantID.$invalid&&!a.searchform.$pristine},a.filterFn=function(){a.presentPage=1,a.filterString?a.filteredKlantRecords=g("filter")(a.klantRecords,a.filterString):a.filteredKlantRecords=a.klantRecords,j()},a.sortFn=function(b){a.presentPage=1,a.sort.column===b?a.sort.order=!a.sort.order:a.sort.order=!0,a.sort.column=b,a.filteredKlantRecords=g("orderBy")(a.filteredKlantRecords,a.sort.column,a.sort.order)},a.showDetails=function(c){angular.isDefined(a.searched_klantID)&&angular.isDefined(c)&&c.recordCount>0&&(k(),b.path("/details").search({view:a.view,klantID:a.searched_klantID,recordName:c.tableName}))},a.sortClass=function(b){if(b===a.sort.column){if(a.sort.order===!0)return"tablesort-desc";if(a.sort.order===!1)return"tablesort-asc"}}}angular.module("clientSearch").controller("ClientSearchController",a),a.$inject=["$scope","$location","currentLang","Client","usSpinnerService","appCache","$filter"]}(),function(){"use strict";angular.module("clientDetails",["ngRoute","core","ui.bootstrap","angularSpinner"])}(),function(){function a(a){a.when("/details",{templateUrl:"client-details/client-details.template.html",controller:"ClientDetailsController"})}angular.module("clientDetails").config(a),a.$inject=["$routeProvider"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){h(a.klantID)&&h(a.recordName)&&h(a.view)?i():b.path("/")}function h(a){var b=!1;return angular.isDefined(a)&&null!==a&&(b=!0),b}function i(){var b;d.spin("spinner-1"),c.get({clientId:a.klantID,table:"tables",tableId:a.recordName},function(c){d.stop("spinner-1"),b=c,a.filteredRecords=b.tableRecords.records,a.totalItems=a.filteredRecords.length,angular.isDefined(b)&&null!==b?(a.detailRecords=b,k()):a.noSearchOutput=!0},function(){d.stop("spinner-1")})}function j(a,b){if(angular.isDefined(a))return a.split(b)}function k(){a.detailRecords.customerAddressFormatted=j(a.detailRecords.customerAddress,"|")}var l;a.klantID=null,a.recordName=null,a.view=null,l=b.search(),a.view=l.view,a.klantID=l.klantID,a.recordName=l.recordName,a.maxSize=1,a.options=[10,25,50,100],a.resultsPerPage=10,a.presentPage=1,a.totalItems,g(),a.gotoSearch=function(){b.path("/search").search({view:a.view,klantID:a.klantID})},a.filterFn=function(){a.presentPage=1,a.FILTER_STRING?a.filteredRecords=e("filter")(a.detailRecords.tableRecords.records,a.FILTER_STRING):a.filteredRecords=a.detailRecords.tableRecords.records,a.totalItems=a.filteredRecords.length},a.export=function(){a.tempResultsPerPage=a.resultsPerPage,d.spin("spinner-1"),a.resultsPerPage=a.totalItems,f(function(){var b=a.view+"-"+a.klantID+"-"+a.recordName,c=new Blob([$("#export-table-div").html()],{type:"application/xml;charset=utf-8",encoding:"utf-8"});saveAs(c,b+".xls"),a.resultsPerPage=a.tempResultsPerPage,d.stop("spinner-1")},5e10)}}angular.module("clientDetails").controller("ClientDetailsController",a),a.$inject=["$scope","$location","Client","usSpinnerService","$filter","$timeout"]}(),angular.module("opbApp").run(["$templateCache",function(a){"use strict";a.put("client-details/client-details.template.html",'<div class="panel panel-default"><div class="panel-heading"><button print-remove class="btn btn-default ocf-btn-back" ng-click="gotoSearch()" title="back"><span translate>LABEL_BACK</span></button><h2 class="panel-title"><span ng-if="view==\'CallReport\'" translate>LABEL_CALLREPORT_SEARCH_DETAILS_PANEL_TITLE</span> <span ng-if="view==\'OperationalBuffer\'" translate>LABEL_OPERATIONALBUFFER_SEARCH_DETAILS_PANEL_TITLE</span></h2><span print-remove class="glyphicon ocf-icon-large glyphicon-download-save pointer margin-right-10 float-right" title="export" ng-click="export()"></span></div><div class="panel-body" ng-cloak><div id="http-error-block"></div><div id="result-block" ng-if="detailRecords"><div class="well"><div class="row"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_KLANT_ID</p></div><div class="col-xs-6">{{detailRecords.bcNumber}}</div></div><div class="row" ng-if="detailRecords.boNumber"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_BO_NO</p></div><div class="col-xs-6">{{detailRecords.boNumber}}</div></div><div class="row" ng-if="detailRecords.customerName"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_KLANT_NAME</p></div><div class="col-xs-6">{{detailRecords.customerName}}</div></div><div class="row" ng-if="detailRecords.gender"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_GENDER</p></div><div class="col-xs-6">{{detailRecords.gender | translate}}</div></div><div class="row" ng-if="detailRecords.birthDate"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_BIRTHDATE</p></div><div class="col-xs-6">{{detailRecords.birthDate}}</div></div><div class="row" ng-if="detailRecords.customerAddress"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_ADDRESS</p></div><div class="col-xs-6"><span>{{detailRecords.customerAddressFormatted[0]}}</span>&nbsp;<span>{{detailRecords.customerAddressFormatted[1]}}</span></div></div><div class="row" ng-if="detailRecords.customerAddress"><div class="col-xs-6 ocf-label-static"><p>&nbsp;</p></div><div class="col-xs-6"><span>{{detailRecords.customerAddressFormatted[2]}}</span>&nbsp;<span>{{detailRecords.customerAddressFormatted[3]}}</span></div></div><div class="row"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_RECORD_NAME</p></div><div class="col-xs-6">{{detailRecords.tableRecords.tableName}}</div></div></div><div id="filter"><div class=""><div class="col-sm-4 col-md-3 col-sm-offset-8 col-md-offset-9" style="padding-right:0px"><div class="form-group has-feedback"><input type="search" class="form-control" placeholder="{{\'LABEL_FILTER\' | translate}}" ng-model="$parent.FILTER_STRING" ng-change="filterFn();"> <span class="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span></div></div></div></div><div class="table-responsive" id="export-table-div"><table class="table table-bordered table-striped responsive-utilities"><thead><tr><th ng-repeat="header in detailRecords.tableRecords.columnDetails">{{header}}</th></tr></thead><tbody><tr ng-repeat="record in filteredRecords | limitTo: resultsPerPage : (presentPage-1)*resultsPerPage track by $index"><td ng-repeat="recordDetail in record.recordDetails track by $index">{{recordDetail}}</td></tr></tbody></table><table class="table table-bordered table-striped" ng-if="!totalItems"><tr><td style="height:50px; width:100%; text-align:center" colspan="{{detailRecords.tableRecords.columnDetails.length}}" translate>LABEL_NO_DATA_TEXT</td></tr></table></div><div id="pagination"><div class="panel-footer pagination-div" style="padding-top:20px;padding-left:0px; padding-right:0px"><div class="row"><div ng-if="!FILTER_STRING" class="col-sm-3" style="vertical-align: middle;margin:auto"><span translate>LABEL_RECORDS</span> {{(presentPage-1)*resultsPerPage}} - {{totalItems>presentPage*resultsPerPage? presentPage*resultsPerPage: totalItems}} <span translate>LABEL_OF</span> {{totalItems}}</div><div ng-if="FILTER_STRING" class="col-sm-3" style="vertical-align: middle;margin:auto">{{totalItems | number}} <span translate>LABEL_RECORDS</span> (<span translate>LABEL_FILTERED_FROM</span> {{detailRecords.tableRecords.records.length | number}})</div><div class="col-sm-4 col-sm-offset-1" style="text-align: center"><uib-pagination boundary-links="true" ng-hide="totalItems<=resultsPerPage" style="vertical-align:top; margin-top:0" max-size="maxSize" total-items="totalItems" ng-model="presentPage" previous-text="{{\'LABEL_PAGE_PREVIOUS\'|translate}}" next-text="{{\'LABEL_PAGE_NEXT\'|translate}}" first-text="&laquo;" last-text="&raquo;" items-per-page="resultsPerPage"></uib-pagination></div><div class="col-sm-3 col-sm-offset-1" style="vertical-align: middle;text-align: right" ng-hide="totalItems<=10"><span translate>LABEL_PAGE_RESULTS</span><div class="form-group" style="display:inline-block"><select class="form-control" ng-model="resultsPerPage" ng-options="option as option for option in options" ng-change="presentPage=1" style="color:#595959"></select></div></div></div></div></div></div></div></div>'),a.put("client-search/client-search.template.html",'<div class="panel panel-default"><div class="panel-heading"><h2 class="panel-title"><span translate>LABEL_CLIENT_SEARCH_PANEL_TITLE</span></h2></div><div class="panel-body" ng-cloak><div id="http-error-block"></div><div><form class="form-horizontal ng-pristine ng-valid" name="searchform" ng-cloak><div id="btnBlock"><div class="bs-component ng-scope ng-isolate-scope"><fieldset class="ng-scope"><div class="form-group-first"><div class="form-group" ng-class="{\'has-warning has-feedback\' : isKlantIDValid()}"><label for="klantID" class="col-sm-6 col-xs-6 control-label" translate>LABEL_KLANT_ID</label><div class="col-sm-4 col-xs-4"><input class="w120 form-control" name="klantID" type="text" ng-required="true" ng-pattern="/^[0-9]{1,15}$/" placeholder="{{\'LABEL_KLANT_ID\' | translate}}" ng-model="klantID" id="klantID" autofocus> <span class="glyphicon glyphicon-warning-sign form-control-feedback" ng-if="isKlantIDValid()"></span> <span class="help-block" ng-show="isKlantIDValid()" translate>LABEL_KLANT_ID_INVALID</span></div></div></div></fieldset></div><button class="btn btn-primary" ng-click="search(\'CallReport\')" ng-disabled="searchform.$invalid" style="margin-left: 20px"><span translate>LABEL_CALLREPORT_SEARCH_BUTTON</span></button> <button id="OperationalBuffer" class="btn btn-primary" ng-click="search(\'OperationalBuffer\')" ng-disabled="searchform.$invalid"><span translate>LABEL_OPERATIONALBUFFER_SEARCH_BUTTON</span></button></div></form></div></div></div><div id="results_table" ng-show="search_clicked == true && noSearchOutput == false"><div class="panel panel-default"><div class="panel-heading"><h2 class="panel-title"><span ng-if="view==\'CallReport\'" translate>LABEL_CALLREPORT_SEARCH_RESULTS_PANEL_TITLE</span> <span ng-if="view==\'OperationalBuffer\'" translate>LABEL_OPERATIONALBUFFER_SEARCH_RESULTS_PANEL_TITLE</span></h2></div><div class="panel-body" ng-cloak><div class="well"><div class="row"><div class="col-xs-6 ocf-label-static"><p translate>LABEL_KLANT_ID</p></div><div class="col-xs-6">{{searched_klantID}}</div></div></div><div id="filter"><div class=""><div class="col-sm-4 col-md-3 col-sm-offset-8 col-md-offset-9" style="padding-right:0px"><div class="form-group has-feedback"><input type="search" class="form-control" placeholder="{{\'LABEL_FILTER\' | translate}}" ng-model="filterString" ng-change="filterFn();"> <span class="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span></div></div></div></div><div class="table-responsive"><table class="table table-bordered table-striped responsive-utilities"><col width="85%"><col width="15%"><thead><tr><th class="tablesort-sortable" ng-class="sortClass(\'tableName\')" ng-click="sortFn(\'tableName\')"><span translate>LABEL_RECORD_NAME</span></th><th class="tablesort-sortable" ng-class="sortClass(\'recordCount\')" ng-click="sortFn(\'recordCount\')"><span translate>LABEL_RECORD_COUNT</span></th></tr></thead><tbody><tr ng-repeat="record in filteredKlantRecords | limitTo: resultsPerPage : (presentPage-1)*resultsPerPage track by $index" ng-click="showDetails(record)" ng-class="{\'row-selection-imp\': record.recordCount}"><td class="">{{record.tableName}}</td><td class="" align="right">{{record.recordCount}}</td></tr></tbody></table></div><div id="pagination"><div class="panel-footer pagination-div" style="padding-top:20px;padding-left:0px; padding-right:0px"><div class="row"><div ng-if="!filterString" class="col-sm-3" style="vertical-align: middle;margin:auto"><span translate>LABEL_RECORDS</span> {{(presentPage-1)*resultsPerPage}} - {{totalItems>presentPage*resultsPerPage? presentPage*resultsPerPage: totalItems}} <span translate>LABEL_OF</span> {{totalItems}}</div><div ng-if="filterString" class="col-sm-3" style="vertical-align: middle;margin:auto">{{totalItems | number}} <span translate>LABEL_RECORDS</span> (<span translate>LABEL_FILTERED_FROM</span> {{detailRecords.tableRecords.records.length | number}})</div><div class="col-sm-4 col-sm-offset-1" style="text-align: center"><uib-pagination boundary-links="true" ng-hide="totalItems<=resultsPerPage" style="vertical-align:top; margin-top:0" max-size="maxSize" total-items="totalItems" ng-model="presentPage" previous-text="{{\'LABEL_PAGE_PREVIOUS\'|translate}}" next-text="{{\'LABEL_PAGE_NEXT\'|translate}}" first-text="&laquo;" last-text="&raquo;" items-per-page="resultsPerPage"></uib-pagination></div><div class="col-sm-3 col-sm-offset-1" style="vertical-align: middle;text-align: right" ng-hide="totalItems<=10"><span translate>LABEL_PAGE_RESULTS</span><div class="form-group" style="display:inline-block"><select class="form-control" ng-model="resultsPerPage" ng-options="option as option for option in options" ng-change="presentPage=1" style="color:#595959"></select></div></div></div></div></div></div></div></div><script>document.getElementById(\'klantID\').addEventListener(\'keypress\', function(event) {\r\n        if (event.keyCode == 13) {\r\n            event.preventDefault();\r\n            document.getElementById(\'OperationalBuffer\').click();\r\n        }\r\n    });</script>'),a.put("core/header/header.template.html",'<!--    Header with language change functionality starts--><header id="header" class="ng-scope"><!-- start abn amro header --><div class="container-fluid-nomax ocf-header ng-scope"><div print-remove class="container-fluid" style="padding-bottom:4px"><a ui-sref="about"><span class="ocf-brand ocf-cutout"></span></a><div class="ocf-header-right"><div class="btn-group hidden-xs hidden-xxs"><button class="btn btn-default" ng-class="vm.currentLocale(\'nl\')" ng-click="vm.changeLocale(\'nl\')">NL</button> <button class="btn btn-default" ng-class="vm.currentLocale(\'en\')" ng-click="vm.changeLocale(\'en\')">EN</button></div></div></div><!-- begin navigation --><div class="navbar-container"><nav class="navbar navbar-default navbar-main"><div class="container-fluid" style="height: auto"><!-- The actual items --><!-- The actual items --><ul class="nav navbar-nav"></ul></div></nav><!-- end navigation --></div></div><!-- end abn amro header --></header><!--    Header with language change functionality ends-->'),a.put("core/msec-authentication/msec-authentication.template.html",'<div id="http-error-block"><div ng-if="unauthorized" class="alert alert-warning"><span class="glyphicon glyphicon-warning-sign" id="errorImage"></span><h3><span>{{ "LABEL_UNAUTHORIZED_ACCESS" | translate}}</span></h3></div></div>')}]);