/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetControlFilter', ['$yuccaHelpers','$rootScope',
    function ($yuccaHelpers,$rootScope) {
    'use strict';

    return {
        restrict: 'AE',
        scope: {},
        templateUrl:'template/dataset_control_filter.html',
        link: function(scope, elem, attr) {
        	
        	
            var widgetType = 'YuccaDatasetControlFilter';
            var widgetId = widgetType+new Date().getTime();
        	scope.inputForm = {value:null};
        	scope.debug = attr.debug==="true"?true:false;
        	scope.controlType = $yuccaHelpers.attrs.safe(attr.controlType,null);
        	//scope.actionType = $yuccaHelpers.attrs.safe(attr.actionType,null);
            scope.textPlaceholder = $yuccaHelpers.attrs.safe(attr.textPlaceholder,"");
            scope.textApplyButton = $yuccaHelpers.attrs.safe(attr.textApplyButton,"Ok");
            scope.multipleValues = scope.$eval(attr.multipleValues);
            if(attr.multipleLabels)
            	scope.multipleLabels =scope.$eval(attr.multipleLabels);
            else
            	scope.multipleLabels = scope.$eval(attr.multipleValues);
            
            scope.applyFilter = function(input){
            	console.log("applyFilter",scope.inputForm.value, attr.datasetCode);

            	if(input)
            		scope.inputForm.value = input;
            		
            	console.log("applyFilter",scope.inputForm.value, attr.datasetCode);
            	
            	if(attr.actionType == 'column'){
	            	 var event = $yuccaHelpers.event.createEvent(widgetId,
	            			 widgetType,
	            			 "dataset.change.column", 
	            			 {"datasetcode": attr.datasetCode, "column": scope.inputForm.value});
	            	 console.log("event",event);
	            	 $rootScope.$broadcast ('yucca-widget-event', event);
            	}
            	else if(attr.actionType == 'data') {
	            	 var event = $yuccaHelpers.event.createEvent(widgetId,
	            			 widgetType,
	            			 "dataset.filter.column", 
	            			 {"datasetcode": attr.datasetCode, "column": attr.datasetColumn, "value": scope.inputForm.value});
	            	 console.log("event",event);
	            	 $rootScope.$broadcast ('yucca-widget-event', event);
            	}
            		
            }
            console.log("attrs", attr);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_control_filter.html",
    '<div class="yucca-widget yucca-dataset-control-filter">\n' +
    '    <form class="form yucca-widget yucca-dataset-control-filter-text" ng-if="controlType==\'text\'">\n' +
    '         <input type="text" ng-model="inputForm.value" placeholder="{{textPlaceholder}}"/>\n' +
    '         <a href ng-click="applyFilter()">{{textApplyButton}}</a>\n' +
    '    </form>\n' +
    '    <form class="form yucca-widget yucca-dataset-control-filter-radio" ng-if="controlType==\'radio\'">\n' +
    '         <label ng-repeat="r in multipleValues track by $index"><input type="radio" ng-model="inputForm.value" name="rad" value="{{r}}" ng-change="applyFilter(r)"/>{{multipleLabels[$index]}}</label>\n' +
    '    </form>\n' +
    '</div>\n'
    );
}]);

