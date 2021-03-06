/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetBubblesMapChart', ['metadataService','dataService', '$yuccaHelpers', '$http', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_bubbles_map_chart.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaControlMapChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


			var colors = new Array();

            
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
          
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            var areaColor = $yuccaHelpers.attrs.safe(attr.areaColor, "#cccccc");
            
            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
        	var legendAttr= scope.$eval(attr.chartLegend);

            var width = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            var height = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            
            
            var radius = $yuccaHelpers.attrs.num(attr.radius, null, null, 2);
			var svg,g,mapLayer;

            $timeout(function(){
            	//var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId));
            	//console.log("YuccaControlMapChart",chartContentElement)
            	console.log("elem",elem)
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));

            	if(!width)
            		width = chartContentElement[0].offsetWidth; //elem[0].offsetWidth;
//            	if(!height){
//            		height= elem[0].offsetHeight;
//            		if(height<1)
//            			height = 300;
//            	} 
    			svg = d3.select('#' + scope.widgetId+ ' svg').attr('width', width).attr('height', height).on("click", stopped, true);
    			g = svg.append('g');
    			mapLayer = g.append('g').classed('map-layer', true);
    			
    			svg.call(zoom).call(zoom.event);
            	loadGeojson();

    			//loadData();
            });
            
            var valueColumn = scope.$eval(attr.valueColumn);
            var labelColumn = scope.$eval(attr.labelColumn);

            var latColumn = $yuccaHelpers.attrs.safe(attr.latColumn,'lat');
            var lngColumn = $yuccaHelpers.attrs.safe(attr.lngColumn,'lng');

            var borderColor =  $yuccaHelpers.attrs.safe(attr.borderColor, "#fff");
            scope.controlMapMapId = "controlMap"+new Date().getTime();

            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            var geoprojection = $yuccaHelpers.attrs.safe(attr.geoprojection, "mercator");
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	g = $yuccaHelpers.geo.initGeojson(g);
            	
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
//	    			   leafletData.getMap(scope.datasetBubblesMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//			    				 layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
//	    					   }
//	    				   });
//	    			   });
//	    		   }
//	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetBubblesMapMapId).then(function(map) {
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
   
   

			var zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 8]).on("zoom", zoomed);
			var zoomedScale = 1
			function zoomed() {
			  console.log("zoomed", d3.event.scale);
			  zoomedScale = d3.event.scale;
			  g.style("stroke-width", 1.5 / d3.event.scale + "px");
			  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}
			
			function stopped() {
				if (d3.event.defaultPrevented) d3.event.stopPropagation();
			}
			
			var projectionScale, projectionCenter, projectionTranslate;

			var loadGeojson = function(){
				d3.json(geojsons[activeGeojson].url, function(error, mapData) {
					
					var geofit = $yuccaHelpers.geo.fitGeojson(mapData, width, height, geoprojection);

	    			d3.select('#' + scope.widgetId+ ' svg').attr('height', geofit.height);
	    			height = geofit.height;
					var path = geofit.path;
					projectionScale = geofit.projectionScale;
					projectionCenter = geofit.projectionCenter;
					projectionTranslate = geofit.projectionTranslate;

					// Update color scale domain based on data
					console.log("data[0]",data);
					mapLayer.selectAll('path')
					.data(mapData.features)
					.enter().append('path')
					.attr('d', path)
					.attr('vector-effect', 'non-scaling-stroke')
					.style('fill', areaColor)
					.style('stroke', borderColor)
					.on('mouseover', highlightFeature)
					.on('mouseout', resetHighlight)
					.on('click', onAreaClick);
					//.on('dblclick', onAreaDblclick);
					



					//mapLayer.append("rect").attr('width', width).attr('height', height);
					// Draw each province as a path
					loadData()
					scope.isLoading = false;
				});
			};
			
			
			
			//var noDataColor = '#ccc'
//			var getValueColor = function(d){
//				var color = noDataColor;
//				if(d.properties.value){
//					color = colors[0].color(d.properties.value);
//					for (var i = 0; i < colors.length-1; i++) {
//						if(d.properties.value>=colors[i].max && d.properties.value<colors[i+1].max){
//							color = colors[i].color(d.properties.value);
//						}
//					}
//					if(d.properties.value>=colors[colors.length-1].max)
//						color = colors[colors.length-1].color(d.properties.value);
//				}
//				return color;
//			};

//			
//			function fillFn(d){
//				return getValueColor(d);
//			}

			scope.info = {"show": true};
			scope.updateInfo = function(show, content){
				$timeout(function(){
					console.log("updateinfo",show, content);
					scope.info.show= show;
					scope.info.content = content;
				},100);
			}

			
			var highlightBubble = function(d) {
				//var color = $yuccaHelpers.d3color.darker(mainChartColor, 2);
				//d.style('fill', color);
				d.attr("fill-opacity","0.4");
				var label = d.attr("label");
				var value = $yuccaHelpers.render.safeNumber(d.attr("value"), decimalValue, scope.isEuroValue(),formatBigNumber);
				scope.updateInfo(true, label + ": " + value);
			};
			
			var resetHighlightBubble = function(d) {
				d.attr("fill-opacity","0.2");
				scope.updateInfo(false, "");
			};

			var highlightFeature = function(d) {
				var color = $yuccaHelpers.d3color.darker(areaColor, 0.3);
				d3.select(this).style('fill', color);
				scope.updateInfo(true, d.properties[geojsons[activeGeojson].key]);
          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", 
          				{"key": d.properties[geojsons[activeGeojson].key], "color" :color}, eventControlId);
	        	$rootScope.$broadcast ('yucca-widget-event', event);				
			};

			var resetHighlight = function(d) {
				scope.updateInfo(false, "");
				if(d){
					mapLayer.selectAll('path').style('fill', areaColor);
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", 
							{"key": d.properties[geojsons[activeGeojson].key]}, eventControlId);
					$rootScope.$broadcast ('yucca-widget-event', event);					
				}
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
             
             var active = d3.select(null);
             
             function onAreaDblclick(d){
            	 if (active.node() === this) return reset();
            	  active.classed("active", false);
            	  active = d3.select(this).classed("active", true);

            	  var bounds = path.bounds(d),
            	      dx = bounds[1][0] - bounds[0][0],
            	      dy = bounds[1][1] - bounds[0][1],
            	      x = (bounds[0][0] + bounds[1][0]) / 2,
            	      y = (bounds[0][1] + bounds[1][1]) / 2,
            	      scale = Math.max(1, Math.min(8, 0.85 / Math.max(dx / width, dy / height))),
            	      translate = [width / 2 - scale * x, height / 2 - scale * y];

            	  svg.transition()
            	      .duration(750)
            	      .call(zoom.translate(translate).scale(scale).event);
             }
             
             function reset() {
            	  active.classed("active", false);
            	  active = d3.select(null);

            	  svg.transition()
            	      .duration(750)
            	      .call(zoom.translate([0, 0]).scale(1).event);
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
					dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData,apiDataUrl,cache).then( function(result) {
						console.info("bubblesMapChart:loadData", result);
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

			var data = new Array();
			
			//var minValue, maxValue;
			var prepareData  = function(){
				//var dataMap = {};
				data = new Array();

				console.log("prepareData", odataResult);
				//var sliceCount=0;
	
				if(odataResult != null){
					scope.isLoading = true;
					for(var i=0; i<odataResult.length; i++){
						for(var j=0;j<odataResult[i].data.d.results.length; j++){
							data.push(odataResult[i].data.d.results[j]);
							if(minValue == null){
								minValue = odataResult[i].data.d.results[j][valueColumn.key];
								maxValue = odataResult[i].data.d.results[j][valueColumn.key];
							}
							else{
								if(minValue>odataResult[i].data.d.results[j][valueColumn.key])
									minValue = odataResult[i].data.d.results[j][valueColumn.key];
								if(maxValue<odataResult[i].data.d.results[j][valueColumn.key])
									maxValue = odataResult[i].data.d.results[j][valueColumn.key];
							}
								
						}
					}
						//allData = allData.concat(odataResult[i].data.d.results);
						
					//data = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, null,attr.mainChartColor);
					//data = allData;
					console.log("discrete mapData",data);
					
					//color = d3.scale.quantile().range(["#ff00ff", "#ff0000", "#00ffff", "0000ff", "fff000"]);
//					if(rangeColors){
//						var minValue =  d3.min(data[0].values, function(d){ return d.value; });
//	            		for(var c = 0; c<rangeColors.length;c++){ // [4,5,100,300
//	            			var color = {max: rangeColors[c].limit, color: d3.scale.linear().domain([minValue,rangeColors[c].limit])
//	            					.clamp(true).range($yuccaHelpers.d3color.getRange(rangeColors[c].color))}
//	            			minValue = rangeColors[c].limit;
//	            			colors.push(color);
//	            		}
//					}
//					else{
//						var maxValue = d3.max(data[0].values, function(d){ return d.value; });
//						colors.push({max: maxValue, color: d3.scale.linear().domain([ d3.min(data[0].values, function(d){ return d.value; }),maxValue])
//							.clamp(true).range($yuccaHelpers.d3color.getRange(mainChartColor))});
//					}
					//color.domain();
					mapLayer.selectAll('circle').remove();

					console.log("data",data)
					if(data.length>0){
						var rUnit = radius*parseInt(width/100);
						for(var j=0; j<data.length; j++){
						  var d = data[j];
						  //console.debug("d", d);
						  
						  var coordinates = $yuccaHelpers.geo.pointProjection([d[lngColumn],d[latColumn]],projectionScale, projectionCenter, projectionTranslate,geoprojection);
						  var r = parseInt(d[valueColumn.key]*rUnit/maxValue);
						  if(radius>0){							  
							  mapLayer.append('svg:circle')
							  .attr('cx', coordinates[0])
							  .attr('cy', coordinates[1])
							  .attr('r', r)
							  .attr('stroke', mainChartColor)
							  .attr("stroke-width",1)
							  .attr("fill",mainChartColor)
							  .attr("fill-opacity","0.2")
							  .attr("value", d[valueColumn.key])
							  .attr("label", labelColumn?d[labelColumn.key]:"")
							  .attr("vector-effect","non-scaling-stroke")
							  .on('mouseover', function(){highlightBubble(d3.select(this));})
							  .on('mouseout', function(){resetHighlightBubble(d3.select(this));});	
						  }
						}
					}
					console.log("colors", colors);

						scope.isLoading = false;
				}
				  
				  scope.isLoading = false;
			}
	
			loadGeojson();

			//loadData();


             console.log("attrs", attr);
             scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);


yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_bubbles_map_chart.html",
    '<div class="yucca-widget  yucca-bubbles-map-chart" id="{{widgetId}}" >\n' +
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

