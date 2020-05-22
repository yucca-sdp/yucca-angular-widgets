/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetBulletChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_bullet_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);
        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.userToken;
            var filter  = attr.filter;
            
            var currentValueColumn =  $yuccaHelpers.attrs.safe(attr.currentValueColumn, null);
            var previousValueColumn =  $yuccaHelpers.attrs.safe(attr.previousValueColumn, null);
            
            var barColors =  scope.$eval(attr.barColors);
            if(typeof barColors == 'undefined' || barColors == null ||barColors==''){
            	barColors = Constants.LINE_CHART_COLORS;
            }
            
            var ranges = scope.$eval(attr.rangeValues, null);
            if(ranges !=null){
            	if(ranges.length!=3){
            		scope.debugMessages.push("Invalid range values: range values must be an array with 3 elements: Min, Mean, Max");
            		ranges = null;
                }
            }

            var rangeColumnValues = scope.$eval(attr.rangeColumnValues, null);
            if(rangeColumnValues !=null){
            	if(rangeColumnValues.length!=3){
            		scope.debugMessages.push("Invalid range column values: range column values must be an array with 3 elements: Column with Min, Column with Mean, Column with Max");
            		rangeColumnValues = null;
                }
            }
            
            var averageValues =  attr.averageValues==="true"?true:false;

            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            
            var internalIds =  scope.$eval(attr.internalIds);
            var filterIds = $yuccaHelpers.attrs.safe(attr.filterIds, null);

            var barTitleColumn=  $yuccaHelpers.attrs.safe(attr.barTitleColumn, null);
            var barSubtitleColumn=  $yuccaHelpers.attrs.safe(attr.barSubtitleColumn, null);

            var barTitleLabel=  $yuccaHelpers.attrs.safe(attr.barTitleLabel, null);
            var barSubtitleLabel=  $yuccaHelpers.attrs.safe(attr.barSubtitleLabel, null);

            
            var rangeLabels =  scope.$eval(attr.rangeLabels);
            var measureLabels =  scope.$eval(attr.measureLabels);
            var customMarkers =  scope.$eval(attr.customMarkers);
            var customMarkerColumns =  scope.$eval(attr.customMarkerColumns);
            var markerLabels =  scope.$eval(attr.markerLabels);
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            
            scope.chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, 100, null, elem[0].offsetWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, elem[0].offsetHeight);



        	var toolTipContentFunction = function(key, x, y, e, graph) {
        		//console.log("too",key, x, y, e, graph)
        		var dataIndex  = key.index;
        			
        		
        		
    			var tooltip="";
    			tooltip += "  <span class='yucca-dataset-bullet-chart-tooltip'>";
    			tooltip += "    <i class='glyphicon glyphicon-stop' style='color:"+key.color+"'></i> " + key.label+ " <strong>"+$yuccaHelpers.render.safeNumber(key.value, decimalValue, scope.isEuroValue())+"</strong></span>";
    			tooltip += "  </span>";
				
    			
    	    	return  tooltip;
    		};
    		
        	

    		var computeRanges = function(){
	    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).success(function(firstData){
	    			var maxData = firstData.d.__count>10000?10000:firstData.d.__count;
	    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,  null /*'internalId%20desc'*/, maxData).then( function(result) {
	    				var sum= 0;
	    				var total = 0;
	    				var min = null;
	    				var max = null;

	    				for(var i=0; i<result.length; i++){
	    					//console.log("  "+result[i]);
	    					//console.log("       " + result[i].data.d.results);
	    					for(var j=0; j<result[i].data.d.results.length; j++){
		    					var value = parseFloat(result[i].data.d.results[j][currentValueColumn]);
		    					if(min == null || value<min) min = value;
		    					if(max == null || value>max) max = value;
		    					sum += value;
		    					total++;
		    				}
	    				}
	    	
	    				ranges.push(min);
	    				ranges.push(sum/total);
	    				ranges.push(max);
	    				console.log("ranges",ranges);
	    				loadIds();
	    				
	
	    			});
	    		});
        	};
        	
        	scope.options = {
    			chart: {
    				type: 'bulletChart',
	                duration: 500,
	                tooltip:{
	                	contentGenerator: toolTipContentFunction
	                },
	                tickFormat:(function (d) { return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue());}),
	                ticks: 2
	            }
	        };
        	
			var colorIndex = 0;

        	var createBulletChart = function(data, chartIndex){
        		console.log("createBulletChart", data);

        		var measures = [];
        		
        		if(rangeColumnValues!=null){
        			ranges =  [parseFloat(data[rangeColumnValues[0]]),parseFloat(data[rangeColumnValues[1]]),parseFloat(data[rangeColumnValues[2]])];
        		}
        		if(data[currentValueColumn]!=null)
        			measures.push(parseFloat(data[currentValueColumn].replace(",",".")));
    			
    			var title = barTitleLabel;
    			if(typeof barTitleColumn != 'undefined' && barTitleColumn!=null && barTitleColumn!=''){
    				title =data[barTitleColumn];
    			}
    			
      			var subtitle = barSubtitleLabel;
    			if(typeof barSubtitleColumn != 'undefined' && barSubtitleColumn!=null && barSubtitleColumn!=''){
    				subtitle =data[barSubtitleColumn];
    			}
    			
                var datasetBulletChartChartId = "bullet_"+chartIndex+"_"+new Date().getTime();


    			var chartData={
    				"chartId": datasetBulletChartChartId,
	        		"title":title,
		            "subtitle": subtitle,
		            "ranges": ranges,
		            "measures": measures,
		            "color": barColors[colorIndex],
    				"markers" : [],
    				"markerLabels":[],
    				"markersControl": []
        		};

    			if(previousValueColumn!=null ){
    				chartData.markers.push(data[previousValueColumn]);
    				chartData.markerLabels.push("Previous");
    			}

    			if(typeof customMarkerColumns != 'undefined' && customMarkerColumns!=null){
    				for (var k = 0; k < customMarkerColumns.length; k++) {
    					chartData.markersControl.push({"marker":customMarkerColumns[k], "show": true});
					}
    			}
    			
    			if(typeof customMarkerColumns != 'undefined' && customMarkerColumns!=null){
    				for (var k = 0; k < customMarkerColumns.length; k++) {
    					chartData.markers.push(data[customMarkerColumns[k]]);
					}
    			}

    			if(typeof rangeLabels != 'undefined' && rangeLabels!=null){
    				chartData.rangeLabels = rangeLabels;
    			}

    			if(typeof measureLabels != 'undefined' && measureLabels!=null){
    				chartData.measureLabels = measureLabels;
    			}

    			if(typeof markerLabels != 'undefined' && markerLabels!=null){
    				for (var k = 0; k < markerLabels.length; k++) {
    					chartData.markerLabels.push(markerLabels[k]);
    					if(typeof chartData.markersControl[k]!= 'undefined')
    						chartData.markersControl[k].label = markerLabels[k];
					}
    			}

    			
    			scope.chartDataArray.push(chartData);
				colorIndex++;
        		if(colorIndex == barColors.length)
        			colorIndex = 0;
        		
        		console.debug("chartData", chartData);

    			scope.isLoading = false;

        	};
        	
        	var loadedData = null;
        	
        	var loadIds = function(){
        		if(internalIds!=null){
        			loadData();
        		}
        		else{
		    		dataService.getDataEntities(attr.datasetCode,user_token,filterIds,  0, 50, null).success(function(result){
		    			console.debug("loadIds",result);
		    			loadedData = result.d.results;
		    			if(result.d.results!=null && result.d.__count>0){
		    				internalIds = [];
		    				for(var i = 0; i<result.d.results.length; i++){
		    					internalIds.push(result.d.results[i].internalId);
		    				}
			    			loadData();
		    			}
		    			else{
		    				scope.infoMessage = "No data found";
			    			scope.isLoading = false;
		    			}
		    		}).error(function(result){
		    			scope.isLoading = false;
		    			console.error("loadIds error",result);
		    			scope.debugMessages.push("Load ids error " +result );
		    		});
        		}
        	};
        	
        	var loadData = function(){
	        	scope.chartDataArray = [];
	        	console.log("loadData",internalIds);
    			var colorIndex = 0;
	        	if(loadedData!=null && loadedData.length>0){
	        		if(averageValues){
	        			var summedData = loadedData[0];
	        			for(var ii=1; ii<loadedData.length; ii++){
	        				summedData[currentValueColumn] = parseFloat(summedData[currentValueColumn]) + parseFloat(loadedData[ii][currentValueColumn]);
	        			}
	        			summedData[currentValueColumn] = summedData[currentValueColumn]/loadedData.length;
	        			createBulletChart(summedData,0);
	        		}
	        		else{
	        			for(var ii=0; ii<loadedData.length; ii++){
	        				createBulletChart(loadedData[ii],ii);

	        			}
	        		}	        		
	        	}
	        	else{
		        	for(var ii=0; ii<internalIds.length; ii++){
		        		dataService.getSingleDataEntities(attr.datasetCode,user_token, internalIds[ii]).then( function(result) {
		        			createBulletChart(result.data.d, ii);
		        		});
		        		
		        	}
	        	}
        	};
        	
        
			scope.isLoading = true;

        	if(ranges!=null || rangeColumnValues!=null){
        		loadIds();
        	}
        	else{
        		ranges = [];
        		computeRanges();
        	}
        	
        	/*
        	scope.toggleMarker = function(chartId, m){
        		console.log("toggleMarker", m);
        		
        		scope.chartDataArray[0].markers.splice(0, 1);
        		console.log("scope.chartDataArray", scope.chartDataArray);
        		//var content = angular.element(document.getElementById(chartId)).contents();
        	   // $timeout(function() {$compile(content)(scope);}, 200);
        	};
        	
        	*/
        	
        	
        	//loadIds();
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_bullet_chart.html",
    '<div class="yucca-widget yucca-dataset-bullet-chart">\n' +
    '    <header class="yucca-dataset-bullet-chart-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-bullet-chart-content">\n' +
    '        <section >\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-bullet-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-show="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-show="!isLoading" ng-repeat="chartData in chartDataArray track by $index" class="yucca-dataset-bullet-chart-chart" >\n' +
    '        		<!--<div class="yucca-dataset-bullet-chart-marker-controls">\n' +
    '        		  <div class="check-control" ng-repeat="m in chartData.markersControl track by $index">\n' +
    '        		    <div class="check-bullet" ng-click="toggleMarker(chartData.chartId, m)"></div>{{m.label}}\n' +
    '        		  </div>\n' +
    '        		</div>\n' +
    '				<div id="{{chartData.chartId}}"><nvd3 options="options" data="chartData" ></nvd3></div>-->\n' +
    '				<nvd3 options="options" data="chartData" ></nvd3>\n' +
    '				<!--<bullet-chart options="options" data="chartData" width="{{chartWidth}}" height="{{chartHeight}}" ></bullet-chart>-->\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <footer>\n' +
    '        <div class="yucca-credits-intro">powered by</div>\n' +
    '        <a href="http://www.smartdatanet.it/" target="_blank">\n' +
    '          <i>SmartDataNet.it</i>\n' +
    '        </a>\n' +
    '    </footer>\n' +
    '</div>\n'
    );
}]);

