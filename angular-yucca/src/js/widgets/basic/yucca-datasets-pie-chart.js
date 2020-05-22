/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetPieChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_pie_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetPieChart';
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
            var labelType =  $yuccaHelpers.attrs.safe(attr.labelType, "key");
            if(attr.showValues && attr.showValues==="false")
            	labelType = 'none';
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
            

            
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	console.log("height",chartContentElement[0].offsetHeight);
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            	scope.options.chart.width = chartContentElement[0].offsetWidth;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");

            
        	scope.options = {
    			chart: {
    				type: 'pieChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){return d.key;},
	                y: function(d){return d.value;},
	                showLegend: attr.showLegend==="false"?false:true,
	                showLabels: attr.showLabels==="false"?false:true,
	                labelType: labelType,
	                labelSunbeamLayout: attr.labelSunbeamLayout==="false"?false:true,
	                valueFormat: function(n){
	                	if(labelType=='value'){
	                		return  $yuccaHelpers.render.safeNumber(n, decimalValue, scope.isEuroValue(),formatBigNumber);	
	                	}else{
	                		return n;
	                	}
	                },
					tooltip: {
						valueFormatter: function(d){return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}
					},
	                		
	                // donut: attr.donut==="true"?true:false,
	        		pie: {
	        			dispatch: {
	        				//chartClick: function(e) {console.log("! chart Click !")},
	        				//elementClick: function(e) {},
	        				//elementDblClick: function(e) {console.log("! element Double Click !")},
	        				elementMouseout: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				},
	        				elementMouseover: function(e) {
	        					console.log("e", e);
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					eventData.color = $yuccaHelpers.utils.rgb2Hex(e.color);
	        					console.log("rgb",eventData.color);
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				}
	        			}
	        		}
	            }
	        };
        	// range 0->1
        	
        	
        	if(attr.labelThreshold) scope.options.chart.labelThreshold =  attr.labelThreshold;
        	
        	console.log("attr.render", attr.render)

        	var render = scope.$eval(attr.render);
        	console.log("render", render)
        	if(render){
        		// donut
        		if(render.donut === true){
        			scope.options.chart.donut = true;
        			if(typeof render.donutRatio != 'undefined')
        				scope.options.chart.donutRatio = render.donutRatio;
        			else
        				delete scope.options.chart.donutRatio;
        		}
        		else{
    				delete scope.options.chart.donut;
    				delete scope.options.chart.donutRatio;
        		}
        		
        		// angles
        		if(render.halfPie){
        			if(!render.rotation)
        				render.rotation = 1;
        			scope.options.chart.startAngle = function(d) { return d.startAngle/2 -  render.rotation*Math.PI/2};
        			scope.options.chart.endAngle = function(d) { return d.endAngle/2 -  render.rotation*Math.PI/2};
        		}
        		else if(render.section || render.rotation){
        			if(typeof render.section == 'undefined')
        				render.section = 1;
        			if(typeof render.rotation== 'undefined')
        				render.rotation = 0;
        			scope.options.chart.startAngle = function(d) { return d.startAngle/render.section -  render.rotation*Math.PI/10};
        			scope.options.chart.endAngle = function(d) { return d.endAngle/render.section -  render.rotation*Math.PI/10};
        		}
        		
        		if(typeof render.cornerRadius!= 'undefined')
        			scope.options.chart.cornerRadius = render.cornerRadius;
        		else
        			delete scope.options.chart.cornerRadius;
        			
        		
        	}
        	
//        	if(attr.donutRatio) scope.options.chart.donutRatio =  attr.donutRatio;
//        	if(attr.startAngle && attr.endAngle){
//        		scope.options.chart.startAngle =function(d) { return d.startAngle/2 - attr.startAngle };
//        		scope.options.chart.endAngle =  function(d) { return d.endAngle/2 -attr.endAngle };
//        	}
//        	else if(attr.halfPie==="true"){
//        		scope.options.chart.startAngle =function(d) { return d.startAngle/2 - Math.PI/2 };
//        		scope.options.chart.endAngle =  function(d) { return d.endAngle/2 -Math.PI/2  };
//        	}
        	
        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
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
	    			var sliceCount=0;
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData,apiDataUrl,cache).then( function(result) {
	                  console.info("piechart:loadData", result);
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

	    	        console.log("pie chartData",scope.chartData);
	    	        
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
        		dataService.getDataEntitiesStats(attr.datasetcode,user_token, group_by,group_operators,filter,  0, 1000, null,apiDataUrl,cache).then(function(result){
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
  $templateCache.put("template/dataset_pie_chart.html",
    '<div class="yucca-widget yucca-dataset-pie-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-pie-chart-loading" >\n' +
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

