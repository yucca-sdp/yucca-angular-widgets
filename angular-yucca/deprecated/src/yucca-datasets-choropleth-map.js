/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
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
            var widgetId = widgetType+new Date().getTime();

        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.userToken;
            var filter  = attr.filter;
            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            var datasetCode = $yuccaHelpers.attrs.safe(attr.datasetCode, null);
            if(datasetCode==null ){
        		scope.debugMessages.push("Invalid dataset code");
            }
            
            scope.datasetChoroplethMapMapId = "map"+new Date().getTime();

            
            var geojsonAreasKey =  $yuccaHelpers.attrs.safe(attr.geojsonAreasKey, "name");
            var datasetAreasKeyColumn = $yuccaHelpers.attrs.safe(attr.datasetAreasKeyColumn, null);
            var datasetAreasKeyLabel = $yuccaHelpers.attrs.safe(attr.datasetAreasKeyLabel, datasetAreasKeyColumn);
            var datasetAreasValueColumn = $yuccaHelpers.attrs.safe(attr.datasetAreasValueColumn, null);
            var datasetAreasValueLabel = $yuccaHelpers.attrs.safe(attr.datasetAreasValueLabel, datasetAreasValueColumn);
            scope.dataKey = datasetAreasKeyColumn;
            scope.dataValue = datasetAreasValueColumn;
            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");

            
            if(datasetAreasKeyColumn==null ||datasetAreasValueColumn==null){
        		scope.debugMessages.push("Invalid dataset area indicators: specify the column of the key to match with the geojson, and the column for the value in to use");
            }
            
            
            var mapLineWeight =  $yuccaHelpers.attrs.safe(attr.mapLineWeight, 1);
            var mapLineOpacity =  $yuccaHelpers.attrs.safe(attr.mapLineOpacity, 1);
            var mapLineDashColor =  $yuccaHelpers.attrs.safe(attr.mapLineDashColor, '#0e232e');
            var mapLineDashArray =  $yuccaHelpers.attrs.safe(attr.mapLineDashArray, 1);
            var mapAreasFillOpacity =  $yuccaHelpers.attrs.safe(attr.mapAreasFillOpacity, .7);

            var areaBaseColor =  $yuccaHelpers.attrs.safe(attr.areaBaseColor, "#00bbf0");
            
            var geojsonUrl = $yuccaHelpers.attrs.safe(attr.geojsonUrl, "lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json");
            
            var mapTilesUrl = $yuccaHelpers.attrs.safe(attr.mapTilesUrl, Constants.MAP_TILES_CARTO_DB_POSITRON_URL);
            scope.mapTiles = {url: mapTilesUrl};
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            scope.decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };

            
            var geojson_data = null;
            
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            var showLegend =  attr.showLegend==="false"?false:true;
            var legendPosition =  $yuccaHelpers.attrs.safe(attr.legendPosition, 'bottomleft');
           
            var zoomControl = attr.zoomControl==="false"?false:true;
            var scrollWheelZoom = attr.scrollWheelZoom==="false"?false:true;
            //scope.mapControls = {"zoomControl": showZoomControl}
            scope.defaults = {
            		zoomControl: zoomControl,
            		scrollWheelZoom: scrollWheelZoom
            }
            
            var maxValue = null;
            var minValue = null;
            scope.geojson= null;
            var mapLatLngs = null;
            scope.tableData = [];
			scope.isLoading = true;

            $http.get(geojsonUrl).success(function(data) {
            	geojson_data = data;
            	mapLatLngs = computeBound(geojson_data.features);
            	
	    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).success(function(firstData){
	    			var maxData = firstData.d.__count>10000?10000:firstData.d.__count;
	    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,  null /*'internalId%20desc'*/, maxData).then( function(result) {
	                  console.debug("choropleth:loadData", result);
	    			  var data = [];
	    			  var total = 0;
	    			  for(var i=0; i<result.length; i++){
    					total = result[i].data.d.__count;
    					for(var j=0; j<result[i].data.d.results.length; j++){
    						data.push(result[i].data.d.results[j]);
    					}
	    			  }

	                  if(data.length>0){
	                    for(var j=0; j<data.length; j++){
	                      var d = data[j];
	                      for(var k=0; k<geojson_data.features.length;k++){
	                        if(d[datasetAreasKeyColumn].toUpperCase() == geojson_data.features[k].properties[geojsonAreasKey].toUpperCase()){
	                        	if(typeof geojson_data.features[k].properties.value == 'undefined')
	                        		geojson_data.features[k].properties.value = 0;
	                        	if(countingMode == "count")
	                        		geojson_data.features[k].properties.value++;
	                        	else
	                        		geojson_data.features[k].properties.value += parseFloat(d[datasetAreasValueColumn]);
	                        }
	                      }
	                    }
	                    // compute statistic
	                    for(var m=0; m<geojson_data.features.length; m++){
		                    scope.tableData.push({"key": geojson_data.features[m].properties[geojsonAreasKey], "value": geojson_data.features[m].properties.value});
		                    if(geojson_data.features[m].properties.value!=0){
		                      if(maxValue==null || geojson_data.features[m].properties.value>maxValue)
		                        maxValue = geojson_data.features[m].properties.value;
		                      if(minValue==null || geojson_data.features[m].properties.value<minValue)
		                        minValue = geojson_data.features[m].properties.value;
		                    }
	                    }
	
	                    scope.geojson= {};
	                    console.debug("geojson_data",geojson_data);
	                    scope.geojson.data = geojson_data;
	                    scope.geojson.style = styleChoroplethMap;
	                    scope.geojson.onEachFeature = onEachChoroplethMapFeature;
	                    leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
	                    	map.fitBounds(mapLatLngs);
	                    });
	                    if(showLegend)
	                    	createLegend();
	                    
	                  }
	      			  scope.isLoading = false;
	
	                }, function(result){
		    			scope.isLoading = false;
		    			console.error("Load data error",result);
		    			scope.debugMessages.push("Load data error " +result );
		    		});

	           }).error(function(result){
	   				scope.isLoading = false;
	   				console.error("Load data error",result);
	   				scope.debugMessages.push("Load data error " +result );
	           });
            }).error(function(result){
   				scope.isLoading = false;
   				console.error("Load geojson error",result);
   				scope.debugMessages.push("Load geojson error " +result );
           });
            
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
           
           var styleChoroplethMap = function(feature) {
              return {fillColor: getChoropletColor(feature.properties.value),weight: mapLineWeight, opacity: mapLineOpacity, color: mapLineDashColor, dashArray: mapLineDashArray,fillOpacity:  mapAreasFillOpacity};
           };

           var getChoropletColor = function(d) {
               if(skipZeroValues &&  d==0){
                   return "#ddd";
               }
               else {
                 var percent = -1*((d-minValue)/(maxValue - minValue)-0.5)*1.8;
                 return $yuccaHelpers.render.colorLuminance(areaBaseColor, percent);
               }
               
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
           function highlightFeature(e) {
               var layer = e.target;
               layer.setStyle({weight: 5, dashArray: '', fillOpacity: 0.7});
               if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) 
            	   layer.bringToFront();
               scope.info.top = e.layerPoint.y;
               scope.info.left = e.layerPoint.x;
               var val = $yuccaHelpers.render.safeNumber(layer.feature.properties.value, scope.decimalValue, scope.isEuroValue());
          
               scope.info.content = "<strong>" + datasetAreasKeyLabel + "</strong>: " + layer.feature.properties[geojsonAreasKey] + " <br><strong>" + datasetAreasValueLabel  +"</strong>: " + val;
               
               scope.info.show = true;
             };

             function resetHighlight(e) {
            	 var layer = e.target;
               layer.setStyle({weight: mapLineWeight, opacity: mapLineOpacity, color: mapLineDashColor, dashArray: mapLineDashArray,fillOpacity:  mapAreasFillOpacity});
               scope.info.show = false;
               //$scope.selected= null;
             };
             
             
             function onAreaClick(e){
            	 console.log("onAreaClick", e);
            	 if(datasetCode){
	            	 var event = $yuccaHelpers.event.createEvent(widgetId,
	            			 widgetType,
	            			 "dataset.filter.column", 
	            			 {"datasetcode": datasetCode, "column": datasetAreasKeyColumn, "value": e.target.feature.properties[geojsonAreasKey]});
	            	 console.log("event",event);
	            	 $rootScope.$broadcast ('yucca-widget-event', event);
            	 }
            	 
             }
             
             var createLegend = function(){
            	 var legendColors = [];
            	 var legendLabels = [];
       
            	 var step = (maxValue - minValue)/5;
            	 for(var i=0;i<5; i++){
                	 var percent = -0.9*(i-2);
                    
	            	 legendColors.push($yuccaHelpers.render.colorLuminance(areaBaseColor, percent));
	            	 if(i==0)
	            		 legendLabels.push("<" + $yuccaHelpers.render.safeNumber(step+minValue, scope.decimalValue, scope.isEuroValue()));
	            	 else if(i==5-1)
	            		 legendLabels.push(">" + $yuccaHelpers.render.safeNumber(maxValue-step, scope.decimalValue, scope.isEuroValue()));
	            	 else
	            		 legendLabels.push("" + $yuccaHelpers.render.safeNumber(minValue + step*i, scope.decimalValue, scope.isEuroValue()) + " - " + $yuccaHelpers.render.safeNumber(minValue + step*(i+1), scope.decimalValue, scope.isEuroValue()));

            		 
            	 }
                 scope.legend =  {
                         position: legendPosition,
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
    '<div class="yucca-widget yucca-dataset-choropleth-map">\n' +
    '    <header class="yucca-dataset-choropleth-map-header">\n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-choropleth-map-content" ng-init="panel=\'map\'">\n' +
    '      <section class="yucca-dataset-choropleth-map-section" ng-show="panel==\'map\'" >\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-choropleth-map-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <leaflet ng-attr-id="{{datasetChoroplethMapMapId}}"  defaults="defaults" tiles="mapTiles" bounds="mapBounds" geojson="geojson" class="yucca-dataset-choropleth-map-map" ng-if="geojson!=null" legend="legend" controls="mapControls"></leaflet>\n' + 
    '           <div class="info-panel" ng-show="info.show" style="top:{{info.top}}px; left:{{info.left}}px"><span ng-bind-html="info.content"></span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-dataset-choropleth-map-data" ng-show="panel==\'data\'">\n' +
    '           <table class="yucca-dataset-choropleth-map-table">\n'+
    '               <thead><tr><th>{{dataKey}}</th><th>{{dataValue}}</th></tr>\n' +
    '               </thead>\n' +
    '               <tbody ng-repeat="row in tableData track by $index" >\n' +
    '                   <tr>\n' +
    '                     <td class="yucca-dataset-choropleth-map-data-key">{{row.key}}</td>\n' +
    '                     <td class="yucca-dataset-choropleth-map-data-value">{{row.value|safeNumber:decimalValue:isEuroValue()}}</td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '        <div class="yucca-dataset-choropleth-map-toolbar">\n' +
    '            <a href ng-click="panel=\'map\'" ng-class="{active: panel == \'chart\'}">Map</a> | <a href ng-click="panel=\'data\'" ng-class="{active: panel == \'data\'}">Data</a> \n' +
    '        </div>\n' + 
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

