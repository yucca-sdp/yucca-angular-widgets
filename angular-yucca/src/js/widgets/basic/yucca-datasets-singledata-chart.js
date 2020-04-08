/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetSingledata', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_singledata_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetSingledataChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());

            scope.widgetTitle=  $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetSubtitle=  $yuccaHelpers.attrs.safe(attr.widgetSubtitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.usertoken;
            var filter  = attr.filter;
            var orderby = attr.orderby;

            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.skip, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");

            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            var valueColumn =scope.$eval(attr.valueColumn);
            scope.hideLabel = attr.hideLabel && attr.hideLabel  == 'true';
            console.log("hideLabel ",scope.hideLabel );
            scope.textafter = $yuccaHelpers.attrs.safe(attr.textAfter, null);
            
            console.log("singledata valuecolumn", valueColumn);
            var growAnimation  = scope.$eval(attr.growAnimation);
            

            var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	


            
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       $timeout(function() {
			       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
			    	   if(!event.data.datasetcode || event.data.datasetcode == datasetcode){
			    		   if(event.eventtype == 'dataset.filter.text'){
			    			   filterMap[event.sourceId] = event.data;
			    			   filter = $yuccaHelpers.event.updateTextFilter(attr.Filter, filterMap, columnDataTypeMap);
			    			   loadData();
			    		   }
			    		   else if(event.eventtype == 'dataset.filter.odata'){
			    			   filter = "";
			    			   if(!event.data.filter || event.data.filter == "")
			    				   filter = attr.filter;
			    			   else{
			    				   if(attr.filter && !event.data.override){
			    					   filter = "("+ attr.filter + ") and "; 
			    				   }
			    				   filter += "(" + event.data.filter + ")";
			    				   
			    			   }
			    			   loadData();
			    		   }
				       }
			       }
		       });
		       
       		});
       		
       		scope.label  = valueColumn.label;
       		scope.value  = "";
       		
       		var delta = 1;
       		var v0 = 0;
       		var growloop = function() {
       			$timeout(function () {
       				v0 += delta;
       				scope.value = $yuccaHelpers.render.safeNumber(v0, decimalValue, euroValue,formatBigNumber);
       				
       				if ((delta>0 && v0<v)||(delta<0 && v0>v)) {
       					growloop();
       				}
       				else
       					scope.value = $yuccaHelpers.render.safeNumber(v, decimalValue, euroValue,formatBigNumber);
       			},1);
       		};
       		
       		var v;
        	var loadData = function(){
        		scope.tableData = [];
    			scope.isLoading = true;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
        			console.log("loadData", firstData);
        			v = firstData.data.d.results[0][valueColumn.key];
        			v = 1*v;
        			if(!isNaN(parseFloat(v))){
        				if(growAnimation){
        					delta = parseInt(v/100);
        					scope.value = 0;
        					growloop();
        				}
        				else
        					scope.value =  $yuccaHelpers.render.safeNumber(v, decimalValue, euroValue,formatBigNumber);
        			}
        			else
        				scope.value = v;
	   				scope.isLoading = false;
	           },function(result){
	   				scope.isLoading = false;
	   				console.error("Load data error",result);
	   				scope.debugMessages.push("Load data error " +result );
	           });
        		
        		
        	};

        	loadData();
            console.log("attrs", attr);
        }
        

    };
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_singledata_chart.html",
    '<div class="yucca-widget yucca-dataset-singledata" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-content">\n' +
    '       <section>\n' +
    '         <div ng-if="isLoading" class="yucca-dataset-dataexplorer-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' +
    '         <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '           <p>{{infoMessage}}</p>\n' +
    '         </div>\n' +
    '		  <div ng-if="!isLoading"  class="yucca-widget-singledata-content" ng-if="!isLoading">\n'+
    '             <div ng-if="!hideLabel" class="yucca-widget-singledata-label" >{{label}}</div>\n' +
    '             <div class="yucca-widget-singledata-value" >{{value}}</div>\n' +
    '             <div class="yucca-widget-singledata-textafter" >{{textafter}}</div>\n' +
    '         </div>\n' +
    '       </section>\n' +
    '   	 <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '   	 </section>\n' +
    '    </div>\n' +
    '<div>\n' +
    '</div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);

	