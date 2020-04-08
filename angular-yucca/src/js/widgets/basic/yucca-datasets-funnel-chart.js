/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetFunnelChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_funnel_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetFunnelChart';
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
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");
            
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
			var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
			
			var showValues =  $yuccaHelpers.attrs.safe(attr.showValues, false);
			scope.mouth =  $yuccaHelpers.attrs.safe(attr.mouth, false);
			

            scope.isEuroValue = function(){
            	return euroValue == "true";
            };

			
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	if(! scope.chartWidth)
            		 scope.chartWidth = elem[0].offsetWidth;
        		if(scope.chartWidth<1)
        			scope.chartWidth = 300;
            	if(!scope.chartHeight){
            		scope.chartHeight= elem[0].offsetHeight;
            		if(scope.chartHeight<1)
            			scope.chartHeight = 300;
            		

            	} 
            	//scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");

            
        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		var legend = {margin: legendAttr.position};
        	}

			scope.chartData = new Array();
			scope.colors  = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		   if(event.eventtype == 'dataset.change.group_by_column'){
	    			   groupByColumn = event.data;
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   prepareData();
	    			   
	    		   }
	    		   else if(event.eventtype == 'dataset.change.value_column'){
	    			   valueColumn.key = event.data.key;
	    			   valueColumn.label = event.data.label;
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   prepareData();
	    		   }
	    		   else if(event.eventtype == 'dataset.filter.text'){
	    			   filterMap[event.sourceId] = event.data;
	    			   filter = $yuccaHelpers.event.updateTextFilter(attr.Filter, filterMap, columnDataTypeMap);
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
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
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   loadData();
				   }		       
				}
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
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
	    			var sliceCount=0;
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData).then( function(result) {
	                  console.info("funnelchart:loadData", result);
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
        	
        	var prepareData = function(){
    			console.log("prepareData", odataResult);

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			scope.chartData = $yuccaHelpers.data.aggregationKeyValue(allData, valueColumn, groupByColumn.key, scope.$eval(attr.chartColors),attr.mainChartColor);
							for(var i=0; i<scope.chartData.length; i++){
								if(showValues){
									scope.chartData[i].label = scope.chartData[i].label + " - " + $yuccaHelpers.render.safeNumber(scope.chartData[i].value, decimalValue, scope.isEuroValue(),formatBigNumber);
								}
							}

					scope.chartData = scope.chartData.sort(function(a,b) {
						return a.value < b.value ? 1 : a.value > b.value ? -1 : 0;
					});
					console.log("funnel chartData",scope.chartData);
					scope.colors = $yuccaHelpers.render.safeColors(scope.chartData.length, chartColors,mainChartColor,.3);
					console.log("funnel colors ",scope.colors);

	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareKeyValue(groupByColumn.label, valueColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
        	var loadDataGrouped = function(){
    			scope.isLoading = true;
           		odataResult = null;
           		var group_by=groupByColumn.key;
           		var group_operators= valueColumn.countingMode + "," + valueColumn.key;
        		dataService.getDataEntitiesStats(attr.datasetcode,user_token, group_by,group_operators,filter,  0, 1000, null).then(function(result){
        			console.log("loadDataGrouped", result);
		            
		                if(result != null){
			    			scope.isLoading = true;
			    			var valueColumn4GroupBy = {"key":valueColumn.key + '_sts', "label":valueColumn.label, "countingMode":valueColumn.countingMode};
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
							console.log("funnel chartData",scope.chartData);
							for(var i=0; i<scope.chartData.length; i++){
								if(showValues){
									scope.chartData[i].label = scope.chartData[i].label + " " + $yuccaHelpers.render.safeNumber(scope.chartData[i].value, decimalValue, scope.isEuroValue(),formatBigNumber);
								}
							}
							scope.colors = $yuccaHelpers.render.safeColors(scope.chartData.length, chartColors,mainChartColor,.3);
							console.log("funnel colors ",scope.colors);

			    			scope.isLoading = false;
		                }
	                },function(result){
		   				scope.isLoading = false;
		   				console.error("loadDataGrouped error",result);
		   				scope.debugMessages.push("Load data error " +result );
	                }
	            );        		
			};
			
        	if(groupedQuery)
				loadDataGrouped();
        	else
				loadData();
			/*
				scope.chartData  =  [{"label":"Leads","value":"70"},
				{"label":"Phone Calls","value":"61"},
				{"label":"Pitches","value":"46"},
				{"label":"Negotiations","value":"29"},
				{"label":"Final Closure","value":"15"}
			];
			*/


			console.log("scope.colors", scope.colors);
			console.log("attrs", attr);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_funnel_chart.html",
    '<div class="yucca-widget yucca-dataset-funnel-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-funnel-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><funnel-chart data="chartData" colors="colors" mouth="mouth" width="{{chartWidth}}" height="{{chartHeight}}"></funnel-chart></div>\n' +
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

