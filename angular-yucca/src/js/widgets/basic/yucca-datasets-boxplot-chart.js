/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetBoxplotChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_boxplot_chart.html',
        link: function(scope, elem, attr) {
        	console.debug("elem", elem);

            var widgetType = 'YuccaBasicDatasetBoxplotChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


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
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: ""};

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
    		
            
            
            var boxplotColumns=scope.$eval(attr.boxplotColumns);
            var isDataAggregate = $yuccaHelpers.attrs.safe(attr.isDataAggregate, false);
        	scope.options = {
    			chart: {
    				type: 'boxPlotChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){return d.label;},
	                y: function(d){return d.value;},
	                valueFormat: function(d){return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);},	         
	                showValues: attr.showValues==="false"?false:true,
//	                yAxis:{
//	                	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
//    	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
//						axisLabel:yAxisAttr.label?yAxisAttr.label:""
//					},
//	                xAxis:{
//	   				axisLabel:xAxisAttr.label?xAxisAttr.label:"",
//	    	            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
//
//					},
//					showXAxis:!xAxisAttr.hide,
//	    	        showYAxis:!yAxisAttr.hide,
	    	    	reduceXTicks: attr.reduceXTicks == "true",
	        		boxplot: {
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
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				}
	        			}
	        		}
    			},
	        };
        	// range 0->1
			
			if(!yAxisAttr.hide){
				scope.options.chart.showYAxis=true;
				scope.options.chart.yAxis = {
	            	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
	    			axisLabel:yAxisAttr.label?yAxisAttr.label:"",
	    			staggerLabels: yAxisAttr.staggerLabels?true:false
				};
			}
			else
				scope.options.chart.showYAxis=false;

			if(!xAxisAttr.hide){
				scope.options.chart.showXAxis=true;
				scope.options.chart.reduceXTicks= attr.reduceXTicks == "true",
			
			
				scope.options.chart.xAxis = {
	            	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
		            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
					staggerLabels: xAxisAttr.staggerLabels?true:false
				};
			}
			else
				scope.options.chart.showXAxis=false;
        	console.log("yAxisAttr", yAxisAttr);
        	console.log("scope.options",scope.options);

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
	    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
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
       		
       		// caricamento dei dati?
       		
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
		                console.info("boxplotchart:loadData", result);
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
        	// aggregazione dei dati?
        	
        	
        	var prepareData  = function(){
    			//var dataMap = {};
    			console.log("prepareData", odataResult);
    			//var sliceCount=0;
	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			console.log("boxplotColumns", boxplotColumns);
	    			for(var i=0; i<odataResult.length; i++){
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			}

//	    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, chartColors,attr.mainChartColor);
	    			if (!isDataAggregate){
	    				scope.chartData = $yuccaHelpers.data.aggregationBoxplotValueKey(allData, [valueColumn], groupByColumn.key, chartColors,attr.mainChartColor);
	    			}else{
	    				
	    				var outliers_separator = boxplotColumns['outliers_separator']?boxplotColumns['outliers_separator']:";";

						for(var i=0; i<allData.length; i++){

		    				var obj = {};
		    				var dataMapBoxplot = {};
		    				console.log("ilmiolog",allData[i]);
		    				console.log("test",allData[i][boxplotColumns['Q1']]);
		    				obj['Q1'] = allData[i][boxplotColumns['Q1']];
							obj['Q2'] = allData[i][boxplotColumns['Q2']];
							obj['Q3'] = allData[i][boxplotColumns['Q3']];
							obj['whisker_low']=allData[i][boxplotColumns['whisker_low']]
							obj['whisker_high'] = allData[i][boxplotColumns['whisker_high']];
							var outliers = allData[i][boxplotColumns['outliers']].split(outliers_separator).map( Number );
							obj['outliers'] = outliers ;
							console.log("objvalue",obj);
							dataMapBoxplot['values']=obj;
							dataMapBoxplot['label']= allData[i].course;
						
							scope.chartData.push(dataMapBoxplot);
						}
	    			}
					var colors = $yuccaHelpers.render.safeColors(scope.chartData.length, chartColors,mainChartColor);
					scope.options.chart.color = colors;

	    	        console.log("discrete chartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesKeyValue(groupByColumn.label, scope.chartData);
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
  $templateCache.put("template/dataset_boxplot_chart.html",
    '<div class="yucca-widget yucca-dataset-boxplot-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-boxplot-chart-loading" >\n' +
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

