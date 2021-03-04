/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetTreemapChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_treemap_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetTreemapChart';
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

            scope.numberFormat = {"euro": euroValue, decimal: decimalValue, bigNumber: formatBigNumber};

            var euroValue2 = $yuccaHelpers.attrs.safe(attr.euroValue2, false);
            var decimalValue2 = $yuccaHelpers.attrs.safe(attr.decimalValue2, 2);
            var formatBigNumber2 = $yuccaHelpers.attrs.safe(attr.formatBigNumber2, false);
            scope.isEuroValue2 = function(){
            	return euroValue2 == "true";
            };
            scope.numberFormat2 = {"euro": euroValue2, decimal: decimalValue2, bigNumber: formatBigNumber2};

            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            console.log("wwww", elem[0].parentElement);
            
            var widgetSize = $timeout(function(){
            	var widgetSize = $yuccaHelpers.render.widgetSize(elem[0],$timeout);
            	scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 300, null, widgetSize.w);
            	scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, widgetSize.h);
            	loadData();
            });
            
            //scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].parentElement.clientWidth-parentPaddingWidth);
            //scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].parentElement.clientHeight-parentPaddingHeight);
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");

            var treeColumns = scope.$eval(attr.treeColumns);
//            if(typeof treeColumns != 'Array' )
//        		scope.debugMessages.push("Invalid tree columns");
            
            var valueColumn =scope.$eval(attr.valueColumn);
//            if(valueColumn==null &&  countingMode=='sum')
//        		scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var valueColumn2 =scope.$eval(attr.valueColumn2);

        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};
        	scope.$on('yucca-treemap-event', function(e, event) {  
 		       console.log("yucca-treemap-event fuori", event);  
 		       if(event.sourceId == scope.widgetId){
 		    	  event.data.datasetcode = datasetcode;
 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
				  event.eventControlId = eventControlId;
 	        	  console.log("event",event);
 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
 		       }
        	});
        	
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("treeee yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
	 		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
		    			   filterMap[event.sourceId] = event.data;
		    			   filter = $yuccaHelpers.event.updateTextFilter(attr.Filter, filterMap, columnDataTypeMap);
		    			   loadData();
		    		   }
		    		   else if(event.data.datasetcode == datasetcode && event.eventtype == "dataset.browse"){
			    		   var path = event.data.path;
			    		   $rootScope.$broadcast ('yucca-widget-event-'+scope.widgetId, {"type":"browse", "path":path,"eventControlId":eventControlId});
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
		                console.info("treemapchart:loadData", result);
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
	    				
	    			scope.treemapData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, treeColumns, valueColumn, valueColumn2);
	    			console.log("tree fuori", scope.treemapData);

	    			  
	    			var colors = $yuccaHelpers.render.safeColors(scope.treemapData.children.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			for (var i = 0; i < scope.treemapData.children.length; i++) {
	    				if(attr.mainChartColor && valueColumn2)
	    					scope.treemapData.children[i].color = $yuccaHelpers.d3color.darker(attr.mainChartColor, .2);
	    				else
	    					scope.treemapData.children[i].color = colors[i];
					}
	    			
	    	        console.log("chartData",scope.treemapData);
	    	        $rootScope.$broadcast('yucca-widget-ready', {"widgetId":scope.widgetId, "widgetType":"yucca-treemap", "eventControlId":eventControlId});
	    	        console.log("broadcast yucca-widget-ready");
	    	        
	    		}

      			scope.isLoading = false;
      			
        	};
        	scope.isLoading = true;
            console.log("attrs", attr);
        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_treemap_chart.html",
    '<div class="yucca-widget yucca-dataset-treemap-chart" id="{{widgetId}}" style="min-height: {{chartHeight}}px; min-width: {{chartWidth}}px;">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-treemap-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-treemap-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-treemap-chart-chart" >\n' +
    '        		<div><treemap-chart data="treemapData" width="{{chartWidth}}" height="{{chartHeight}}" widgetId="{{widgetId}}" number_format2="numberFormat2" number_format="numberFormat"></treemap-chart>\n' +

    '				</div>\n' +
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

