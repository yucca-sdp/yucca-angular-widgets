/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMultistreamStats', ['metadataService','dataService', '$yuccaHelpers', 'leafletData',
    function (metadataService, dataService, $yuccaHelpers, leafletData) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_multistream_stats.html',
        link: function(scope, elem, attr) {

        	scope.xAxisTickFormatFunction = function(){
                return function(d) {
                    return  d3.time.format("%H:%M:%S")(new Date(d));
                  };
            };
            
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'map');
        	var valueFormatFunction = function(d){
   				return parseInt(d);
    	    };
            
            var createTimeKey = function(data){
                return data.hour;
            }

            var minData = null;
            var maxData = null;
            var minMarkerWidth = 40;
            var maxMarkerWidth  = 80;

            scope.mapId = "map"+new Date().getTime();
            var computeStatistics = function(){
                for(var k in scope.allData){
                    if(scope.allData[k].hasOwnProperty('tableData')){
                        var data =  scope.allData[k].tableData[1];
                        if(minData==null || data<minData)
                            minData = data;
                        if(maxData==null || data>maxData)
                            maxData = data;
                    }
                    
                }
                console.log("min max", minData, maxData);
            };

            scope.refreshMarker = function(){

                console.log("scope.allData", scope.allData);
                scope.mapData.markerstyles = [];
                var dataAtTime = scope.allData[scope.currentTimeStats];
                console.log("allData",scope.allData);
                if(!$yuccaHelpers.utils.isEmpty(dataAtTime)){
                    console.log("dataAtTime",dataAtTime);
                    for (var i = 0; i < scope.allData.datasetsCode.length; i++) {
                        var data = parseFloat(dataAtTime.tableData[i+1]).toFixed(1);
                        data = (data === "NaN") ? 0 : data;
                        console.log("data", data);
                        var percent = (data-minData)/(maxData-minData);
                        var size = parseInt(minMarkerWidth + (maxMarkerWidth-minMarkerWidth)*percent);
                        var datasetCode = scope.allData.datasetsCode[i];
                        scope.mapData.markerstyles.push(".marker"+datasetCode+
                            "{font-size: "+(size/2.2)+"px; line-height:"+(size)+"px; " + 
                            "border-color:"+computeColor(data, 1)+"; background-color:"+computeColor(data, .5)+";}");
                        var icon = {type: 'div',
                                    iconSize: [size, size],
                                    className: "marker marker"+datasetCode,
                                    popupAnchor:  [0, 0],
                                    html: data
                        };

                        scope.mapData.markers["m_"+ datasetCode].icon = icon;
                    }
                }
//                leafletData.getMap().then(function (map) {
//                	console.warn("bounds", bounds);
//                    map.fitBounds(bounds);
//                });
            };
            
            var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, 300);
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'lineChart');
            var chartColors =  scope.$eval(attr.chartColors);
            
        	var toolTipContentFunction = function(key, x, y, e, graph) {
        			console.log("key", key);
        			var dataIndex  = key.index;
        			var tooltip="";
        			if(chartType == 'lineChart')
        				tooltip=key.point.tooltip;
        			else
        				tooltip=key.data.tooltip;
        	    	return  tooltip;
        		};
            //id="nvDataChart2"  height="300" xAxisTickFormat="xAxisTickFormatFunction()" showXAxis="true" showYAxis="true" tooltips="true" interactive="true" objectEquality="true"
        	
        	scope.options = {
    			chart: {
    				type: chartType,
    	            height: chartHeight,
    	            margin : {
	                    top: 24,
	                    right: 24,
	                    bottom: 24,
	                    left: 36
    	            },
    	            interpolate: 'basis',
    	            x: function(d){return d.x;},
    	            y: function(d){return d.y;},
    	            showValues: true,
    	            showLegend: false,
	                valueFormat: valueFormatFunction,
	                duration: 500,
	                showXAxis: true,
	                xAxis: {
	                    axisLabel: 'Time' + $yuccaHelpers.odata.timeGroup2resultKey(timeGroupBy),
	                },
	                yAxis: {
	                    axisLabel: '',
	                    axisLabelDistance:-10
	                },
	                tooltip:{
	                	contentGenerator: toolTipContentFunction
	                }
	            }
	        };
            
            scope.maxStats = 23;
            scope.allData = {};
            scope.mapData = {"markers": {},"markerstyles": []};
            var bounds = [];

            scope.currentTimeStats=5;

            var tableData = [];
            scope.allData.tableHeader = ["Time"];
            scope.allData.datasetsCode = [];
           
            var markerColor = ["#009100","#9ade00", "#edd400", "#f57900", "#cc0000"];
            var computeColor = function(value, alpha){
                var result = markerColor[2];
                if(maxData-minData!=0){
                    var percent = (value-minData)/(maxData-minData);
                    var colorIndex = parseInt(percent*markerColor.length);
                    if(colorIndex>=markerColor.length)
                        colorIndex = markerColor.length-1;
                    result = markerColor[colorIndex];
                }
                if(typeof result == 'undefined')
                    result = markerColor[2];
                return "rgba(" + $yuccaHelpers.utils.hex2Rgb(result) + "," + alpha + ")";
            };

            var addData  = function(metadata, dataset){
                scope.allData.datasetsCode.push(metadata.code);
                scope.allData.tableHeader.push(metadata.code);
                for (var i = 0; i < dataset.data.length; i++) {
                    var data = dataset.data[i];
                
                    // table
                    var timeKey = createTimeKey(dataset.data[i]);
                    if(!scope.allData[timeKey] || scope.allData[timeKey]==null){
                        scope.allData[timeKey]= {};
                        scope.allData[timeKey].tableData = [];
                        scope.allData[timeKey].tableData.push(data.hour);
                    }
                    scope.allData[timeKey].tableData.push(data.value_sts);
                }

                // map
                if(!$yuccaHelpers.utils.isEmpty(metadata.stream) && !$yuccaHelpers.utils.isEmpty(metadata.stream.smartobject.latitude)){

                	var marker = { lat: parseFloat(metadata.stream.smartobject.latitude),
                    			   lng: parseFloat(metadata.stream.smartobject.longitude), 
                    			   message: metadata.code};

                    var icon = {type: 'div',
                        className: "marker marker"+metadata.code,
                        popupAnchor:  [0, 0],
                        html: '-'
                    };

                    marker.icon = icon;

                    scope.mapData.markers["m_"+ metadata.code] = marker;
                    scope.mapData.markerstyles.push(".marker"+metadata.code+"{border-radius: 100%;width:30px; height:30px;border:solid 2px red}");

                    bounds.push([marker.lat, marker.lng]);
                    
                    leafletData.getMap().then(function (map) {
                    	map.invalidateSize();
                    	map.fitBounds(bounds, {padding: [32, 32]});
                    });
                }
            };
            
            var decodedDateFilter = $yuccaHelpers.odata.decodeDateFilter(attr);
            var timeFilter = decodedDateFilter.timeFilter;
            var timeGroupBy = $yuccaHelpers.attrs.safe(attr.timeGroupBy, $yuccaHelpers.odata.extractTimeGroupFilter(decodedDateFilter.minDateMillis, decodedDateFilter.maxDateMillis));
            

            //scope.widgetTitle = attr.widgettitle;
            var datasetsKey = scope.$eval(attr.datasets);
        	var user_token =  attr.userToken;

            if(datasetsKey && datasetsKey!=null && datasetsKey.length>0){
                for (var i = 0; i < datasetsKey.length; i++) {
                	
                	var tenant_code = datasetsKey[i][0];
        			var dataset_code = datasetsKey[i][1];

                    metadataService.getDatasetMetadata(tenant_code, dataset_code).success(
                        function(result) {
                            var metadata = result; //result.d.results[0];

                        	var size = Object.keys(result).length;
                            
                            if (size>0){
                            	if (metadata && metadata!=null) {
                            	
	                    			dataService.getMeasuresStats(metadata.dataset.code, user_token, timeGroupBy, 'avg,value', timeFilter,  null, null, "year,month,dayofmonth,hour").success( function(response) {
	                                    console.log('response', response);
	                                    var dataRow = {"key":metadata.code, 
	                                                   "metadata": metadata, 
	                                                   "data":response.d.results};
	
	                                    addData(metadata, dataRow);
	                                    computeStatistics();
	                                    scope.refreshMarker();
	                                })
	                                .error(function(response) {
	                                    console.error('getDatasetMetadata: error', response);
	                                });
                            	}
                            }
                        }       
                    );
                }
            }
            
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
    	}
    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_multistream_stats.html",
		'<div class="yucca-widget yucca-stream-multistream-stats">\n' +
	    '    <header class="yucca-stream-multistream-stats-header">\n' +
	    '        {{widgetTitle}}\n' +
	    '    </header>\n' +
	    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
	    '    <div class="yucca-stream-multistream-stats-content">\n' +
	    '        <section class="yucca-stream-multistream-stats-map" ng-show="panel==\'map\'">\n' +
	    '           <style>.marker{border-radius: 100%;border:solid 4px;background-color: white; text-align: center;padding-top: -8px;}</style>\n' +
	    '           <style ng-repeat="style in mapData.markerstyles track by $index">{{style}}</style>\n' +
	    '           <leaflet id="{{mapId}}" width="100%" height="300px" markers="mapData.markers"></leaflet>\n' +
	    '           <div class="range-panel"><div class="range-min">0</div><div class="range-container">\n' +
	    '                <div class="range-value">{{currentTimeStats}} h</div>\n' +
	    '                <input type="range" name="points" min="0" max="{{maxStats}}" '+
	    '                    ng-model="currentTimeStats" ng-change="refreshMarker()" class="range-input"></div>\n' +
	    '               <div class="range-max">{{maxStats}}</div>\n'+
	    '           </div> \n' +
	    '        </section>\n' +
//	    '        <section class="yucca-stream-multistream-stats-chart" ng-show="panel==\'chart\'">\n' +
//	    '            <nvd3 options="options" data="chartData"></nvd3>\n' +
//	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-data" ng-show="panel==\'data\'" >\n' +
	    '           <table class="yucca-stream-multistream-stats-table">\n'+
	    '               <thead>\n' +
	    '                   <tr><th ng-repeat="titles in allData.tableHeader track by $index">{{titles}}</th></tr>\n' +
	    '               </thead>\n' +
	    '               <tbody>\n' +
	    '                   <tr ng-repeat="(key, value) in allData track by $index">\n' +
	    '                     <td ng-repeat="data in value.tableData track by $index">{{data}}</td>\n' +
	    '                   </tr>\n' + 
	    '               </tbody>\n' +
	    '           </table>\n' +
	    '           <div class="yucca-stream-multistream-stats-component" ng-repeat="(key, value) in lastMessage.values[0].components">' +
	    '               <div class="yucca-stream-multistream-stats-component-key">{{key}}</div>\n' +
	    '               <div class="yucca-stream-multistream-stats-component-value">{{value}}</div>\n' +
	    '               <div class="yucca-stream-multistream-stats-component-measure-unit">{{componentsMap[key].measureUnit}}</div>\n' +
	    '           </div>\n' +
	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-data" ng-hide="allData!=null">\n' +
	    '           No data\n' +
	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-total-count">\n' +
	    '            Total: {{totalCount}}\n' +
	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-toolbar">\n' +
	    '            <a href ng-click="panel=\'map\'" ng-class="{active: panel == \'map\'}">Map</a> | <a href ng-click="panel=\'data\'" ng-class="{active: panel == \'data\'}">Data</a> \n' +
	    '        </section>\n' +
	    '    </div>\n' +
	    '    <footer>\n' +
	    '        <div class="credits-intro">powered by</div>\n' +
	    '        <a href="http://www.smartdataplatform.it/" target="_blank">\n' +
	    '          <i>SmartDataNet.it</i>\n' +
	    '        </a>\n' +
	    '    </footer>\n' +
	    '</div>\n'
    );
}]);

