/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetMultibarChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';
    

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_multibar_chart.html',
        link: function(scope, elem, attr) {
        	console.debug("elemmulti", elem);

            var widgetType = 'YuccaBasicMultibarChart';
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
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            
            var chartType = attr.chartDirection=='horizontal'?'multiBarHorizontalChart':'multiBarChart';
            


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
			
			var seriesDescriptionColumn = scope.$eval(attr.seriesDescriptionColumn);

            //var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: "", };
            
            console.log("xAxisAttr",xAxisAttr);

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
            
//            var serieStyles = scope.$eval(attr.serieStyles);
//            
//            console.log("serieStyles",serieStyles);
//            
            var serieColumns = scope.$eval(attr.serieColumns);
            if(serieColumns==null)
        		scope.debugMessages.push("Insert serieColumns");
            //var groupBySeries =  attr.groupBySeries==="true"?true:false;
            var seriesFromValues =  attr.seriesFromValues==="true"?true:false;
            
            console.log("serieColumns",serieColumns);
            var tooltipGenerator = function (d) {
                var tooltipTitle = d.data.description?d.data.description:d.value ;
                var tooltip = "";

                tooltip += "<table>";
                tooltip += "<thead>";
                tooltip += "<tr><td colspan='3'><strong class='x-value'>" + tooltipTitle + "</strong></td></tr>";
                tooltip += "</thead>";
                tooltip += "<tbody>";
                
                var textAfter = "";
                var isEuro = scope.isEuroValue();
                var decimal = decimalValue;
                var bigNumber = formatBigNumber;
                if(!seriesFromValues && serieColumns[d.index]){
                	console.log("serieColumns[d.index]", serieColumns[d.index]);
                	if(serieColumns[d.index].text_after)
                		textAfter = " " + serieColumns[d.index].text_after + " ";
                	if(serieColumns[d.index].euro_value)
                		isEuro = serieColumns[d.index].euro_value;
                	if(serieColumns[d.index].decimal_value)
                		decimal = serieColumns[d.index].decimal_value;
                	if(serieColumns[d.index].format_big_number)
                		bigNumber = serieColumns[d.index].format_big_number;
                	console.log("isEuro", isEuro);
                	console.log("decimal", decimal);
                	console.log("bigNumber", bigNumber);
                }
                
                for(var i in d.series) {
                	
                	var currentSeries = d.series[i];
                	var color = currentSeries.color;
                    var key = currentSeries.key;
                    var value = currentSeries.value;
                    

                    tooltip += "<tr>";
                    tooltip += "   <td class='legend-color-guide'>";
                    tooltip += "      <div style='background-color: " + color + ";'></div>";
                    tooltip += "   </td>";
                    tooltip += "   <td class='key'>" + key + "</td>";
                    tooltip += "   <td class='value'>" + $yuccaHelpers.render.safeNumber(value, decimal, isEuro,bigNumber) + textAfter + "</td>";
                    tooltip += "</tr>";
                }

                tooltip += "</tbody>";
                tooltip += "</table>";

                return tooltip;
            }
            
            scope.options = {
                    chart: {
                        type: chartType,
						duration: 500,
						//margin: {left:10},
    	                //height: scope.chartHeight(),
    	                //margin: {top: 20,right:20,bottom: 45,left:245},
    	                x: function(d){return d.label;},
    	                y: function(d){return d.value;},
//    	                valueFormat: function(d){
//    	                	return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);
//    	                },	         
						showValues: attr.showValues==="false"?false:true,
						wrapLabels: true,
		                tooltip:{
		                	contentGenerator: tooltipGenerator
		                },
//						tooltip: {
//							contentGenerator: tooltipGenerator,
//							//valueFormatter: function(d, i, e){console.log("DDD",d);return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber) + "ciao" + e;}
//						},
						yAxis:{
    	                	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
    						axisLabel:yAxisAttr.label?yAxisAttr.label:"",
        	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
        	    			staggerLabels: yAxisAttr.staggerLabels?true:false
    					},
    	                xAxis:{
    	                	//tickFormat: function(d){return wrapFn(d);},
    	                	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
    	                	rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
    	        			staggerLabels: xAxisAttr.staggerLabels?true:false

    					},
    					showXAxis:!xAxisAttr.hide,
    	    	        showYAxis:!yAxisAttr.hide,
    	    	        reduceXTicks: attr.reduceXTicks == "true",
    	        		multibar1: {
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
    	        					console.log(e.data);
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
            
          

			if(attr.stacked == 'true')
				scope.options.chart.stacked = true;

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
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, orderby).then(function(firstData){
        			console.log("loadData multichart", firstData);
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
		                console.info("multichart:loadData", result);
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
    			//var dataMap = {};
    			console.log("prepareData", odataResult);
    			//var sliceCount=0;

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			
	    			console.log("allData multichart",allData);
	    				
	    			//scope.chartData = $yuccaHelpers.data.multibarChartSeriesKeyValue(allData,serieStyles,serieColumns,groupByColumn.key);
	    			//var colors = $yuccaHelpers.render.safeColors(serieColumns.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			//scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, serieColumns, groupByColumn.key,chartColors,attr.mainChartColor);
					var preparedData; 
					if(!seriesFromValues)
						preparedData = $yuccaHelpers.data.aggregationSeriesValueKey(allData, serieColumns, groupByColumn.key,chartColors,attr.mainChartColor);
	    			else
						preparedData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, serieColumns, groupByColumn.key,chartColors,attr.mainChartColor,seriesDescriptionColumn);
					
					if(chartType == 'multiBarHorizontalChart'){
						var maxLabel = maxYLabel(preparedData[0].values);
						var fakeText = d3.select("#"+ scope.widgetId + "-fake").insert("svg").append("text").text(maxLabel);
						if(!scope.options.chart.margin)
							scope.options.chart.margin = {};
						scope.options.chart.margin.left = fakeText.node().getComputedTextLength()+6;
						console.log("maxLabel",maxLabel, fakeText.node().getComputedTextLength());
						d3.select("#"+ scope.widgetId + "-fake").remove();
					}	
					
					scope.chartData = preparedData;


					//$timeout(function(){fixYAxisTick();});	
					console.log("multibarchartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}

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

			var maxYLabel = function(labels){
				var maxLabel = "";
				if(labels){
					for(var i=0; i<labels.length; i++){
						if(labels[i].label.length>maxLabel.length)
							maxLabel = labels[i].label;
					}
				}
				return maxLabel;
			}
			/*

			var fixYAxisTick = function(){
				//scope.options.chart.margin.left = 300;

				var maxTextLength = 0;
				d3.selectAll(".nv-x.nv-axis .tick text").each(function(i, e) {
					console.log("tttt",i,e, scope.chartData[0].values.length-1);
					var text = d3.select(this);
					if(text.node().getComputedTextLength() > maxTextLength)
						maxTextLength = text.node().getComputedTextLength();

					if(e==scope.chartData[0].values.length-1){
						var marginLeft = parseInt(maxTextLength);
						console.log("tttt",marginLeft);
						scope.options.chart.margin.left = marginLeft;
						console.log("tttt",maxTextLength, scope.options);
					}
				});
			};
			var fixYAxisTick = function(){
				d3.selectAll(".nv-x.nv-axis .tick text").each(function(i, e) {
					var text = d3.select(this),
					  words = text.text().split(/\s+/).reverse(),
					  word, line = [],
					  lineNumber = 0,
					  lineHeight = 1.1, // ems
					  y = text.attr("y"),
					  dy = parseFloat(text.attr("dy")),
					  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
				  
					while (word = words.pop()) {
					  line.push(word);
					  tspan.text(line.join(" "));
					  // TDOD : Make 80 a dynamic value based on the bar width/height
					  if (tspan.node().getComputedTextLength() > 80) {
						line.pop();
						tspan.text(line.join(" "));
						line = [word];
						tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					  }
					}
				  });
			};*/
			


        	if(groupedQuery)
        		loadDataGrouped();
        	else
        		loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_multibar_chart.html",
    '<div class="yucca-widget yucca-dataset-discretebar-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
	'           </div>\n' +
	'           <div id="{{widgetId}}-fake" class="nvd3"></div>' + 
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

