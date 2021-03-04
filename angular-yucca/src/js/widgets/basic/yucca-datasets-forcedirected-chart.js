/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetForcedirectedChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_forcedirected_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetForcedirectedChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

            scope.widgetTitle=  $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetSubtitle=  $yuccaHelpers.attrs.safe(attr.widgetSubtitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.usertoken;
        	var apiDataUrl = attr.apiDataUrl;
        	var cache = attr.cache==="true"?true:false;
            var filter  = attr.filter;
            var orderby = attr.orderby;
            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");
            
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            
            $timeout(function(){
            	scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            	scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            	console.log("chartWidth",scope.chartWidth);
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-dataset-forcedirected-chart-chart" ));
            	console.log("width",chartContentElement[0].offsetWidth);
            	scope.forcedirectedWidth = chartContentElement[0].offsetWidth;
            	scope.forcedirectedHeight = scope.chartHeight;
            });
           
            scope.nodeTypes =  scope.$eval(attr.nodeTypes);
            scope.linkLine = $yuccaHelpers.attrs.safe(attr.linkLine, null);
            var relations = scope.$eval(attr.relations);
            
            //var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");

            //scope.columns = scope.$eval(attr.columns);
            //var render = scope.$eval(attr.render);

            //if(typeof scope.treeColumns != 'Array' )
        	//	scope.debugMessages.push("Invalid columns");
            
           // var valueColumn = $yuccaHelpers.attrs.safe(attr.valueColumn, null);
           // if(valueColumn==null &&  countingMode=='sum')
           //		scope.debugMessages.push("To sum value you must enter a valid valueColum");

        	var filterMap = {};
        	
//        	scope.$on('yucca-forcedirected-event', function(e, event) {  
// 		       console.log("yucca-forcedirected-event fuori", event);  
// 		       if(event.sourceId == scope.widgetId){
// 		    	  event.data.datasetcode = datasetcode;
// 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
// 	        	  console.log("event",event);
// 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
// 		       }
//        	});
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);

       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
		    	   if(!event.data.datasetcode || event.data.datasetcode == datasetcode){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data.value;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
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
		    	   
		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null,apiDataUrl,cache).then(function(firstData){
        			console.log("loadData", firstData);
	    			var maxData = firstData.data.d.__count>10000?10000:firstData.data.d.__count;
	    			if(maxData>0){
	    				var d = firstData.data.d.results[0];
	    				for (var k in d) {
	    				    if (d.hasOwnProperty(k) && k!='__metadata'){
	    				    	columnDataTypeMap[k] = typeof d[k];
	    				    } 
	    				}
	    				console.log("columnDataTypeMap ", columnDataTypeMap);
	    			}
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData,apiDataUrl,cache).then( function(result) {
		                console.info("forcedirectedchart:loadData", result);
		                odataResult = result;
		                prepareData();
	                }, function(result){
		    			scope.isLoading = false;
		    			console.error("Load data error",result);
		    			scope.debugMessages.push("Load data error " +result );
		    		});

	           },function(result){
	   				scope.isLoading = false;
	   				console.error("Load data error",result);
	   				scope.debugMessages.push("Load data error " +result );
	           });
        		
        		
        	};
        	
        	var prepareData  = function(){
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			var colors = $yuccaHelpers.render.safeColors(relations.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			
	    			//scope.forcedirectedData = $yuccaHelpers.data.aggregationNodesLinks(allData, scope.columns, valueColumn, countingMode, render, mainChartColor,colors);
	    			scope.forcedirectedLinks = $yuccaHelpers.data.aggregationForcedirected(allData, relations, colors);
	    			
	    			console.log("forcedirected fuori", scope.forcedirectedLinks);

	    			  
//	    			for (var i = 0; i < scope.forcedirectedLinks.children.length; i++) {
//	    				scope.forcedirectedLinks.children[i].color = colors[i];
//					}
	    			
	    	        console.log("chartData",scope.forcedirectedLinks);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_forcedirected_chart.html",
    '<div class="yucca-widget yucca-dataset-forcedirected-chart" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-forcedirected-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-forcedirected-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-forcedirected-chart-chart" >\n' +
    '        	    <forcedirected-chart links="forcedirectedLinks" node_types={{nodeTypes}} width="{{chartWidth}}" link_line="{{linkLine}}" height="{{chartHeight}}"  widgetId="{{widgetId}}" />' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);

