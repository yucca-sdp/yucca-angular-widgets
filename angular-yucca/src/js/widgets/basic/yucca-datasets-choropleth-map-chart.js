/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetChoroplethMapChart', ['metadataService','dataService', '$yuccaHelpers', '$http', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_choropleth_map_chart.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaControlMapChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


			var centered;
			var colors = new Array();

            
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
          
            var rangeColors = scope.$eval(attr.rangeColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            
            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
        	var legendAttr= scope.$eval(attr.chartLegend);

            var width = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            var height = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            
            
			var svg,g,mapLayer;

            $timeout(function(){
            	//var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId));
            	//console.log("YuccaControlMapChart",chartContentElement)
            	console.log("elem",elem)
            	if(!width)
            		width = elem[0].offsetWidth;
            	if(!height){
            		height= elem[0].offsetHeight;
            		if(height<1)
            			height = 300;
            	} 
    			svg = d3.select('#' + scope.widgetId+ ' svg').attr('width', width).attr('height', height);
    			g = svg.append('g');
    			mapLayer = g.append('g').classed('map-layer', true);
            	
            	loadData();
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            

            
            

            var borderColor =  $yuccaHelpers.attrs.safe(attr.borderColor, "#fff");
            var noDataColor = $yuccaHelpers.attrs.safe(attr.noDataColor, "#eee");
            scope.controlMapMapId = "controlMap"+new Date().getTime();

            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            var geoprojection = $yuccaHelpers.attrs.safe(attr.geoprojection, "mercator");
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	if(!g.url)
            		g.url="lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json";
            	if(!g.key)
            		g.key = "code";
            	if(!g.render)
            		g.render = {};
            	if(!g.render.line)
            		g.render.line = {}
            	if(!g.render.line.weight)
            		g.render.line.weight = 1;
            	if(!g.render.line.opacity)
            		g.render.line.opacity = 1;
            	if(!g.render.line.dashcolor)
            		g.render.line.dashcolor = '#0e232e';
            	if(!g.render.line.dasharray)
            		g.render.line.dasharray = 1;
            	if(!g.render.areas)
            		g.render.areas = {}
            	if(!g.render.areas.fillopacity)
            		g.render.areas.fillopacity = .7;
            	
			}
            var geojson_data = null;
            

            
            scope.geojson= null;
            var mapLatLngs = null;
			scope.isLoading = true;

			var activeGeojson = 0;

			var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		  if(event.eventtype == 'dataset.change.value_column'){
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
//	    		   else if(event.eventtype == 'dataset.highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//			    				 layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
//	    					   }
//	    				   });
//	    			   });
//	    		   }
//	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//	    			               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
//	    			            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
//	    					   }
//	    				   });
//	    			   });
//	    		   }		    	   
		       }
		       
       		});

			var maxValue = null;
			var minValue = null;
			scope.geojson= null;
			var mapLatLngs = null;
			scope.tableData = [];
			scope.isLoading = true;
   
   

			
			

			var loadGeojson = function(){
				d3.json(geojsons[activeGeojson].url, function(error, mapData) {
					// create a first guess for the projection
					for (var k in mapData.features) {
						mapData.features[k].properties.selected=false;
					}
					/*
					var center = d3.geo.centroid(mapData);
					console.log("offset center", center);
					var scale  = 60;
					var offset = [width/2, height/2];
					console.log("offset", offset);
					var projection = getProjection(scale,center,offset);

					// create the path
					var path = d3.geo.path().projection(projection);

					// using the path determine the bounds of the current map and use 
					// these to determine better values for the scale and translation
					var bounds  = path.bounds(mapData);
					console.log("offset bounds", bounds);
					//scale = 1 / Math.max((bounds[1][0]-bounds[0][0])*1./width, (bounds[1][1]-bounds[0][1])*1./height);
					//console.log("scale", scale);
					//offset  = [width - (bounds[0][0] + bounds[1][0])/2,height*1.-(bounds[0][1] + bounds[1][1])/2];
					//console.log("offset", offset);
					//var offset = [width/2, height/2];
					// new projection
					
				    var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
				    var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
				    var scale   = (hscale < vscale) ? hscale : vscale;
				    console.log("offset scale", scale);
					var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
				                        height - (bounds[0][1] + bounds[1][1])/2];
					console.log("offset", offset);

					projection = getProjection(scale,center,offset);
					path = path.projection(projection);				
					
					console.log("offset s c o ",scale,center,offset);*/

					var path = $yuccaHelpers.geo.fitGeojson(mapData, width, height, geoprojection);
					var path = $yuccaHelpers.geo.fitGeojson(mapData, width, height, geoprojection);

					// Update color scale domain based on data
					//color.domain([0, d3.max(features, nameLength)]);
					if(data[0].values.length>0){
						console.log("data[0]",data[0]);
						for(var j=0; j<data[0].values.length; j++){
						  var d = data[0].values[j];
						  console.debug("d", d);
						  for(var k=0; k<mapData.features.length;k++){
							  if(d.key.toUpperCase() == mapData.features[k].properties[geojsons[activeGeojson].key].toUpperCase()){
								mapData.features[k].properties.label = data[0].label; 
								mapData.features[k].properties.value = d.value;
								//geojson_data.features[k].properties.color = d.color;
							}
						  }
						}
					}



					//mapLayer.append("rect").attr('width', width).attr('height', height);
					// Draw each province as a path
					mapLayer.selectAll('path')
						.data(mapData.features)
						.enter().append('path')
						.attr('d', path)
						.attr('vector-effect', 'non-scaling-stroke')
						.style('fill', fillFn)
						.style('stroke', borderColor)
						.on('mouseover', highlightFeature)
						.on('mouseout', resetHighlight)
						.on('click', onAreaClick);
					
					scope.isLoading = false;
				});
			};
			
//			var fitGeojson = function(geojson){
//				
//				var c = d3.geo.centroid(geojson);
//				
//				// Create a unit projection.
//				var projection = getProjection(1,c ,[0,0]);
//				// Create a path generator.
//				var path = d3.geo.path().projection(projection);
//				// Compute the bounds of a feature of interest, then derive scale & translate.
//				var b = path.bounds(geojson),
//				    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
//				    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
//
//				// Update the projection to use computed scale & translate.
//				console.log("offset s c t ",s,c,t);
//				return d3.geo.path().projection(getProjection(s,c,t));
//
//			}
			
			// https://github.com/d3/d3-geo#geoProjection
//			var getProjection = function(scale, center, offset){
//				if(geoprojection == 'azimuthalEqualArea')
//					return d3.geo.azimuthalEqualArea().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'azimuthalEquidistant')
//					return d3.geo.azimuthalEquidistant().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'conicConformal')
//					return d3.geo.conicConformal().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'conicEqualArea')
//					return d3.geo.conicEqualArea().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'conicEquidistant')
//					return d3.geo.conicEquidistant().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'equirectangular')
//					return d3.geo.equirectangular().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'gnomonic')
//					return d3.geo.gnomonic().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'orthographic')
//					return d3.geo.orthographic().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'stereographic')
//					return d3.geo.stereographic().scale(scale).center(center).translate(offset);
//				else
//					return d3.geo.mercator().scale(scale).center(center).translate(offset);
//				
//			}
			
			
			
			
			var getValueColor = function(d){
				var color = noDataColor;
				if(d.properties.value){
					color = colors[0].color(d.properties.value);
					for (var i = 0; i < colors.length-1; i++) {
						if(d.properties.value>=colors[i].max && d.properties.value<colors[i+1].max){
							color = colors[i].color(d.properties.value);
						}
					}
					if(d.properties.value>=colors[colors.length-1].max)
						color = colors[colors.length-1].color(d.properties.value);
				}
				return color;
			};

			
			function fillFn(d){
				return getValueColor(d);
			}

			scope.info = {"show": true};
			scope.updateInfo = function(show, content){
				$timeout(function(){
					scope.info.show= show;
					scope.info.content = content;
				},100);
			}

			
			var highlightFeature = function(d) {
				var color = $yuccaHelpers.d3color.darker(getValueColor(d), 0.3);
				d3.select(this).style('fill', color);
				scope.updateInfo(true, d.properties.name  + (d.properties.label?" - " + d.properties.label:"") +
						(d.properties.value?
						": " + $yuccaHelpers.render.safeNumber(d.properties.value, decimalValue, scope.isEuroValue(),formatBigNumber):": no data"));
          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", 
          				{"key": d.properties[geojsons[activeGeojson].key], "color" :color}, eventControlId);
	        	$rootScope.$broadcast ('yucca-widget-event', event);				
			};

			var resetHighlight = function(d) {
        	  	mapLayer.selectAll('path').style('fill', function(d){return getValueColor(d);});
        	  	scope.updateInfo(false, "");
          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", 
          				{"key": d.properties[geojsons[activeGeojson].key]}, eventControlId);
	        	$rootScope.$broadcast ('yucca-widget-event', event);
			};
             
             scope.filter = {};
             var currentSelected = null;
             function onAreaClick(d){
             	console.log("onAreaClick", d);
            	console.log("groupByColumn", groupByColumn);
            	
            	if(currentSelected!=null){
            		 currentSelected.properties.selected = false;
            	}
            	d.properties.selected = !d.properties.selected;
            	currentSelected = d;
            	if($yuccaHelpers.utils.isTouchDevice)
            		highlightFeature(d);
            	else
            		resetHighlight();

          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", {"column": groupByColumn.key, "value" :d.properties[geojsons[activeGeojson].key]}, eventControlId);
				event.eventControlId = eventControlId;
         		$rootScope.$broadcast ('yucca-widget-event', event); 
			 }

			 var odataResult = null;
			 var columnDataTypeMap = {};
			   var loadData = function(){
				console.log("map - loadData", datasetcode);
				scope.isLoading = true;
				   odataResult = null;
				dataService.getDataEntities(datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
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
						console.info("discretebarchart:loadData", result);
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

			var data;
			
			var prepareData  = function(){
				//var dataMap = {};
				console.log("prepareData", odataResult);
				//var sliceCount=0;
	
				if(odataResult != null){
					scope.isLoading = true;
					var allData = new Array();
					for(var i=0; i<odataResult.length; i++)
						allData = allData.concat(odataResult[i].data.d.results);
						
					data = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, null,attr.mainChartColor);
	
					console.log("discrete mapData",data);
					
					//color = d3.scale.quantile().range(["#ff00ff", "#ff0000", "#00ffff", "0000ff", "fff000"]);
					//var mainRangeColor = d3.scale.linear().domain([1,10]).range(["white", mainChartColor,"black"]);
					if(rangeColors){
						var minValue =  d3.min(data[0].values, function(d){ return d.value; });
	            		for(var c = 0; c<rangeColors.length;c++){ // [4,5,100,300
	            			var color = {max: rangeColors[c].limit, color: d3.scale.linear().domain([minValue,rangeColors[c].limit])
	            					.clamp(true).range($yuccaHelpers.d3color.getRange(rangeColors[c].color))}
	            			minValue = rangeColors[c].limit;
	            			colors.push(color);
	            		}
					}
					else{
						var maxValue = d3.max(data[0].values, function(d){ return d.value; });
						colors.push({max: maxValue, color: d3.scale.linear().domain([ d3.min(data[0].values, function(d){ return d.value; }),maxValue])
							.clamp(true).range($yuccaHelpers.d3color.getRange(mainChartColor))});
					}
					//color.domain();
					
					loadGeojson();
					console.log("colors", colors);
					/*
					if(data[0].values.length>0){
						for(var j=0; j<data[0].values.length; j++){
						  var d = data[0].values[j];
						  console.log("d", d);
						  for(var k=0; k<geojson_data.features.length;k++){
							  if(d.key.toUpperCase() == geojson_data.features[k].properties[geojsons[activeGeojson].key].toUpperCase()){
								
								geojson_data.features[k].properties.value = d.value;
								geojson_data.features[k].properties.color = d.color;
							}
						  }
						}
						// compute statistic
						for(var m=0; m<geojson_data.features.length; m++){
							//scope.tableData.push({"key": geojson_data.features[m].properties[geojsonAreasKey], "value": geojson_data.features[m].properties.value});
							if(geojson_data.features[m].properties.value!=0){
							  if(maxValue==null || geojson_data.features[m].properties.value>maxValue)
								maxValue = geojson_data.features[m].properties.value;
							  if(minValue==null || geojson_data.features[m].properties.value<minValue)
								minValue = geojson_data.features[m].properties.value;
							}
						}
	
						scope.geojson= {};
						console.info("geojson_data",geojson_data);
						scope.geojson.data = geojson_data;
						scope.geojson.style = styleChoroplethMap;
						scope.geojson.onEachFeature = onEachChoroplethMapFeature;
						leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
							map.fitBounds(mapLatLngs);
						});
						if(legendAttr && legendAttr.show)
							createLegend();
					  } */
						scope.isLoading = false;
				}
				  
				  scope.isLoading = false;
			}
	
			//loadData();


             console.log("attrs", attr);
             scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);


yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_choropleth_map_chart.html",
    '<div class="yucca-widget  yucca-control-map-chart" id="{{widgetId}}" >\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <svg ng-show="!isLoading"></svg>\n' + 
    '           <div class="info-panel" ng-show="info.show"><span>{{info.content}}</span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);

