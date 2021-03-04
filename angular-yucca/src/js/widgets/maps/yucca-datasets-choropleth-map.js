/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetChoroplethMap', ['metadataService','dataService', '$yuccaHelpers', '$http', 'leafletData', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,leafletData,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_choropleth_map.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaDatasetChoroplethMap';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

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
          
            var rangeColors = scope.$eval(attr.rangeColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
        	var legendAttr= scope.$eval(attr.chartLegend);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
//            $timeout(function(){
//            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
//            	scope.options.chart.height = chartContentElement[0].offsetHeight;
//            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            
            
            scope.datasetChoroplethMapMapId = "map"+new Date().getTime();

            
            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
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
//            if(!geojsons){
//            	geojsons = [{url:"lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json", 
//            				 key:"name",
//            				 render: {line:{weight:1,opacity:1, dashcolor: '#0e232e',dasharray:1},areas:{fillopacity:.7}}
//            			   }];
//            }
//            
//            
            //var geojsonAreasKey =  $yuccaHelpers.attrs.safe(attr.geojsonAreasKey, "name");
            //var geojsonUrl = $yuccaHelpers.attrs.safe(attr.geojsonUrl, "lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json");
            
//            var mapRender = scope.$eval(attr.mapRender);
//            if(!mapRender)
//            	mapRender = {};
//            if(!mapRender.line)
//            	mapRender.line={weight:1,opacity:1, dashcolor: '#0e232e',dasharray:1}
//            else{
//            	if(!mapRender.line.weigth) mapRender.line.weigth = 1;
//            	if(!mapRender.line.opacity) mapRender.line.opacity = 1;
//            	if(!mapRender.line.dashcolor) mapRender.line.dashcolor = '#0e232e';
//            	if(!mapRender.line.dasharray) mapRender.line.dasharray = 1;
//            }
//            
//            if(!mapRender.areas || !mapRender.areas.fillopacity)
//            	mapRender.areas={fillopacity:.7}

            //var mapLineWeight =  $yuccaHelpers.attrs.safe(attr.mapLineWeight, 1);
            //var mapLineOpacity =  $yuccaHelpers.attrs.safe(attr.mapLineOpacity, 1);
            //var mapLineDashColor =  $yuccaHelpers.attrs.safe(attr.mapLineDashColor, '#0e232e');
            //var mapLineDashArray =  $yuccaHelpers.attrs.safe(attr.mapLineDashArray, 1);
            //var mapAreasFillOpacity =  $yuccaHelpers.attrs.safe(attr.mapAreasFillOpacity, .7);

            //var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            
            
            var mapTilesUrl = $yuccaHelpers.attrs.safe(attr.mapTilesUrl, Constants.MAP_TILES_CARTO_DB_POSITRON_URL);
            scope.mapTiles = {url: mapTilesUrl};
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
                        
            var geojson_data = null;
            
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            var zoomControl = attr.zoomControl==="false"?false:true;
            var scrollWheelZoom = attr.scrollWheelZoom==="false"?false:true;
            //scope.mapControls = {"zoomControl": showZoomControl}
            scope.defaults = {
            		zoomControl: zoomControl,
            		scrollWheelZoom: scrollWheelZoom
            }
            
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
	    		   else if(event.eventtype == 'dataset.highlight.group_by_column'){
	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
	    				   map.eachLayer(function(layer){
	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
			    				 layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
	    					   }
	    				   });
	    			   });
	    		   }
	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
	    				   map.eachLayer(function(layer){
	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
	    			               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
	    			            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
	    					   }
	    				   });
	    			   });
	    		   }		    	   
		       }
		       
       		});

            
            var maxValue = null;
            var minValue = null;
            scope.geojson= null;
            var mapLatLngs = null;
            scope.tableData = [];
			scope.isLoading = true;

			var activeGeojson = 0
            $http.get(geojsons[activeGeojson].url).then(function(data) {
            	geojson_data = data.data;
            	mapLatLngs = computeBound(geojson_data.features);
            	loadData();
            },function(result){
   				scope.isLoading = false;
   				console.error("Load geojson error",result);
   				scope.debugMessages.push("Load geojson error " +result );
           });
			
			
			
            
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
    	
    	var prepareData  = function(){
			//var dataMap = {};
			console.log("prepareData", odataResult);
			//var sliceCount=0;

    		if(odataResult != null){
    			scope.isLoading = true;
    			var allData = new Array();
    			for(var i=0; i<odataResult.length; i++)
    				allData = allData.concat(odataResult[i].data.d.results);
    				
    			var data = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, null,attr.mainChartColor);

    	        console.log("discrete mapData",data);
    	        if(data[0].values.length>0){
                    for(var j=0; j<data[0].values.length; j++){
                      var d = data[0].values[j];
                      console.log("d", d);
                      for(var k=0; k<geojson_data.features.length;k++){
                    	  if(d.key.toUpperCase() == geojson_data.features[k].properties[geojsons[activeGeojson].key].toUpperCase()){
                        	
                        	geojson_data.features[k].properties.value = d.value;
                        	geojson_data.features[k].properties.color = d.color;
//                        	if(typeof geojson_data.features[k].properties.value == 'undefined')
//                        		geojson_data.features[k].properties.value = 0;
//                        	if(countingMode == "count")
//                        		geojson_data.features[k].properties.value++;
//                        	else
//                        		geojson_data.features[k].properties.value += parseFloat(d[datasetAreasValueColumn]);
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
                  }
      			  scope.isLoading = false;
    		}
			  
  			scope.isLoading = false;
    	}
            
           var computeBound = function(features){
               var latlngs = [];
               for (var k in features) {
                  if(features[k].geometry.type=="MultiPolygon"){
                	  for(var m in features[k].geometry.coordinates)
                		  for (var i in features[k].geometry.coordinates[m]){
                			  var coord = features[k].geometry.coordinates[m][i];
                			  for (var j in coord) 
                     			latlngs.push(L.GeoJSON.coordsToLatLng(coord[j]));
                		  }
                  }
                  else{
   	               	for (var i in features[k].geometry.coordinates) {
   	               		var coord = features[k].geometry.coordinates[i];
   	               		for (var j in coord) 
                  			latlngs.push(L.GeoJSON.coordsToLatLng(coord[j]));
   	               	}
                	  
                  }
               }
               return latlngs;

           };
           
           
           var refreshStyleMap = function(){
        	   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
				   map.eachLayer(function(layer){
					   if(layer.feature){
						   	 //var color = getChoropletColor(  layer.feature.properties[geojsons[activeGeojson].key]
		    				 layer.setStyle({fillColor: getChoropletColor(layer.feature.properties.value),
		    		         	  weight: geojsons[activeGeojson].render.line.weight, 
		    		         	  opacity: geojsons[activeGeojson].render.line.opacity, 
		    		         	  color: geojsons[activeGeojson].render.line.dashcolor, 
		    		         	  dashArray: geojsons[activeGeojson].render.line.dasharray,
		    		         	  fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity
		    		         });
  					   }
				   });
        	   });
           }
           
           var styleChoroplethMap = function(feature) {
              return {fillColor: getChoropletColor(feature.properties.value),
            	  weight: geojsons[activeGeojson].render.line.weight, 
            	  opacity: geojsons[activeGeojson].render.line.opacity, 
            	  color: geojsons[activeGeojson].render.line.dashcolor, 
            	  dashArray: geojsons[activeGeojson].render.line.dasharray,
            	  fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity};
           };

           var getChoropletColor = function(d) {
               var result = "#ddd";
        	   if(skipZeroValues &&  d==0){
               }
               else {
            	 if(rangeColors){
            		for(var c = 0; c<rangeColors.length;c++){ // [4,5,100,300
            			result = rangeColors[c].color;
            			if(d<=rangeColors[c].limit)
            				break;
            		}
            	 }  
            	 else{
	                 var percent = -1*((d-minValue)/(maxValue - minValue)-0.5)*1.8;
	                 result =  $yuccaHelpers.render.colorLuminance(mainChartColor, percent);
            	 }
               }
        	   return result;
           };
           
           
           
           var onEachChoroplethMapFeature = function(feature, layer) {
        	   console.log(feature, layer);
               layer.on({
                   mouseover: highlightFeature,
                   mouseout: resetHighlight,
                   click: onAreaClick,
              });
           };
                      
           scope.info = {"show": false}
           var highlightFeature = function(e) {
        	   console.log("e.target", e.target);
               var layer = e.target;
               layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
               if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) 
            	   layer.bringToFront();
               scope.info.top = e.layerPoint.y+30;
               scope.info.left = e.layerPoint.x+20;
               var val = $yuccaHelpers.render.safeNumber(layer.feature.properties.value, scope.decimalValue, scope.isEuroValue());
               //console.log("layer.feature.properties",layer.feature.properties);
               scope.info.content = "<strong>" + groupByColumn.label + "</strong>: " + layer.feature.properties[geojsons[activeGeojson].key] + " <br>" +
               "<strong>" + valueColumn.label  +"</strong>: " + val;
               scope.info.show = true;
               if(!$yuccaHelpers.event.ignoreEvent({eventtype: "evtHighlightGroupbycolumn"}, eventConfig)){ 
	   				var eventData = {};
					eventData.key = layer.feature.properties[geojsons[activeGeojson].key];
					eventData.value = layer.feature.properties.value;
					eventData.color = getChoropletColor(layer.feature.properties.value);
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
					event.eventControlId = eventControlId;
		        	$rootScope.$broadcast ('yucca-widget-event', event);
               }
             };

             function resetHighlight(e) {
            	 var layer = e.target;
               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
               scope.info.show = false;
               if(!$yuccaHelpers.event.ignoreEvent({eventtype: "evtHighlightGroupbycolumn"}, eventConfig)){ 
	   				var eventData = {};
					eventData.key = layer.feature.properties[geojsons[activeGeojson].key];
					eventData.value = layer.feature.properties.value;
					eventData.color = getChoropletColor(layer.feature.properties.value);
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
					event.eventControlId = eventControlId;
		        	$rootScope.$broadcast ('yucca-widget-event', event);
              }
             };
             
             
             function onAreaClick(e){
            	 console.log("onAreaClick", e);
            	 if(datasetcode){
	            	 //var event = $yuccaHelpers.event.createEvent(widgetId,
	            	//		 widgetType,
	            	//		 "dataset.filter.column", 
	            	//		 {"datasetcode": datasetcode, "column": groupByColumn.key, "value": e.target.feature.properties[geojsons[activeGeojson].key]});
            		 var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", 
            				 {"datasetcode": datasetcode,"column": groupByColumn.key, "value" :e.target.feature.properties[geojsons[activeGeojson].key]});
 					event.eventControlId = eventControlId;
              		 $rootScope.$broadcast ('yucca-widget-event', event);
            		 console.log("event",event);
	            	 $rootScope.$broadcast ('yucca-widget-event', event);
            	 }
            	 
             }
             
             var createLegend = function(){
            	 var legendColors = [];
            	 var legendLabels = [];
       
            	 if(rangeColors){
            		 legendColors.push(rangeColors[0].color);
            		 legendLabels.push("<" + $yuccaHelpers.render.safeNumber(rangeColors[0].limit, scope.decimalValue, scope.isEuroValue()));
	            	 for(var i=1;i<rangeColors.length-1; i++){
		            	 legendColors.push(rangeColors[i].color);
		            	 legendLabels.push("" + $yuccaHelpers.render.safeNumber(rangeColors[i-1].limit, scope.decimalValue, scope.isEuroValue()) + " - " 
		            			 + $yuccaHelpers.render.safeNumber(rangeColors[i].limit, scope.decimalValue, scope.isEuroValue()));
	            	 }
            		 legendColors.push(rangeColors[rangeColors.length-1].color);
            		 legendLabels.push(">" + $yuccaHelpers.render.safeNumber(rangeColors[rangeColors.length-1].limit, scope.decimalValue, scope.isEuroValue()));
	        	 }
            	 else{
	            	 var step = (maxValue - minValue)/5;
	            	 for(var i=0;i<5; i++){
	                	 var percent = -0.9*(i-2);
	                    
		            	 legendColors.push($yuccaHelpers.render.colorLuminance(mainChartColor, percent));
		            	 if(i==0)
		            		 legendLabels.push("<" + $yuccaHelpers.render.safeNumber(step+minValue, scope.decimalValue, scope.isEuroValue()));
		            	 else if(i==5-1)
		            		 legendLabels.push(">" + $yuccaHelpers.render.safeNumber(maxValue-step, scope.decimalValue, scope.isEuroValue()));
		            	 else
		            		 legendLabels.push("" + $yuccaHelpers.render.safeNumber(minValue + step*i, scope.decimalValue, scope.isEuroValue()) + " - " + $yuccaHelpers.render.safeNumber(minValue + step*(i+1), scope.decimalValue, scope.isEuroValue()));
	
	            		 
	            	 }
            	 }
                 scope.legend =  {
                         position: legendAttr.position,
                         colors: legendColors,
                         labels: legendLabels
                     };
            	 
             };
             

        	//loadIds();
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
        	scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_choropleth_map.html",
    '<div class="yucca-widget yucca-dataset-choropleth-map" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <leaflet ng-attr-id="{{datasetChoroplethMapMapId}}"  defaults="defaults" tiles="mapTiles" bounds="mapBounds" geojson="geojson" class="yucca-dataset-choropleth-map-map" ng-if="geojson!=null" legend="legend" controls="mapControls"></leaflet>\n' + 
    '           <div class="info-panel" ng-show="info.show" style="top:{{info.top}}px; left:{{info.left}}px"><span ng-bind-html="info.content"></span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);

