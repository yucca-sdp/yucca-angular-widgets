/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetLineChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_line_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetLineChart';
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
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  timeColumn= scope.$eval(attr.timeColumn);
            if(timeColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var serieColumns = scope.$eval(attr.serieColumns);
            if(serieColumns==null)
        		scope.debugMessages.push("Insert serieColumns");
            console.log("linechart - serieColumns", serieColumns);
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: ""};

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
    		
            //var serieStyles = scope.$eval(attr.serieStyles);

        	scope.options = {
    			chart: {
    				type: 'lineChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){ return d.x; },
	                y: function(d){ return d.y; },
	                useInteractiveGuideline: true,
	                valueFormat: function(d){return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);},
	                showValues: attr.showValues==="false"?false:true,
	                yAxis:{
	                	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
    	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
						axisLabel:yAxisAttr.label?yAxisAttr.label:""
					},
	                xAxis:{
	                	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
	    	            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
	                			
					},
					showXAxis:!xAxisAttr.hide,
	    	        showYAxis:!yAxisAttr.hide,
	    	    	reduceXTicks: attr.reduceXTicks == "true",
	     
	            }
	        };
        	// range 0->1

        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		
        		//var legend = {margin:{top: legendAttr.position.top,right: legend.position.right,bottom: legend.position.bottom,left: legend.position.left}};
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		   if(event.eventtype == 'dataset.change.group_by_column'){
	    			   timeColumn = event.data;
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   prepareData();
	    		   }

//		    		   else if(event.eventtype == 'dataset.browse'){
//		    			   console.log("dataset.browse", event.data);
//		    			   filterMap = $yuccaHelpers.event.clearArrayTextFilter(filterMap, event.sourceId);
//
//		    			   if(event.data.browseHistory){
//			    			   for (var i = 0; i < event.data.browseHistory.length; i++) {
//			    				   event.data.browseHistory[i].advanced = 'eq';
//				    			   filterMap[event.sourceId+i] = event.data.browseHistory[i];
//		    				   }
//		    			   }
//		    			   filterMap[event.sourceId] = event.data;
//		    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
//		    			   loadData();
//		    		   }
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
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData).then( function(result) {
		                console.info("linechart:loadData", result);
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
    			console.log("prepareData", odataResult);
    			
  	          	scope.chartData = new Array();
  	          	
    			var allData = new Array();

	    		if(odataResult != null){

	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			
	    			var colors = $yuccaHelpers.render.safeColors(serieColumns.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			console.log("colors", colors);

	    			
	    			scope.isLoading = true;
	    			// [key: "serie 1", values: [{x:1, y:1, series:1}]...
	    			//TODO Optimize
//	    			for (var s = 0; s < serieColumns.length; s++) {
//	        			var dataMap = {};
//
//	    				var serie = angular.copy(serieColumns[s])//{key:serieColumns[s].key, values: new Array()};
//	    				serie.values = new Array();
//		        		if(colors.length>0 && typeof serie.color == 'undefined'){
//		        			serie.color = colors[s];
//		        		}
//		    			
//		    			for(var i=0; i<odataResult.length; i++){
//							for(var j=0; j<odataResult[i].data.d.results.length; j++){
//								if(!dataMap[odataResult[i].data.d.results[j][timeColumn.key]] ){
//									dataMap[odataResult[i].data.d.results[j][timeColumn.key]]  = 0;
//								}
//								if(serieColumns[s].countingMode=='sum')
//									dataMap[odataResult[i].data.d.results[j][timeColumn.key]] += odataResult[i].data.d.results[j][serieColumns[s].key];
//								else
//									dataMap[odataResult[i].data.d.results[j][timeColumn.key]]++;
//								
//							}
//			    	        var sIndex = 0;
//			    	        console.log("linechart dataMap",timeColumn);
//
//					        for (var key in dataMap) {
//					        	if (dataMap.hasOwnProperty(key)) {
//					        		console.log("s",d);
//					        		var d = {"x": parseInt(key), "y": dataMap[key]};
//					        			
//					        	   // if(colors.length>0)
//					        	   // 	d.color=colors[sIndex];
//					        	    serie.values.push(d);
//					        	    sIndex++;
//					        	}
//					        } 
//					        
//					        console.log("linechart serie",serie);
//		    			}
//		    			serie.key = serie.label;
//		    			scope.chartData.push(serie);
//	    			}
	    			scope.chartData = $yuccaHelpers.data.aggregationSeriesXY(allData, timeColumn, serieColumns, colors);

		    			  
	    	         // scope.chartData = [{"key":"first", "values":new Array()}];
	    
	    	        console.log("chartData line",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};

        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesXY(timeColumn.label, scope.chartData);
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
			    			console.log("discrete chartData",scope.chartData);
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
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_line_chart.html",
    '<div class="yucca-widget yucca-dataset-line-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-line-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
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

