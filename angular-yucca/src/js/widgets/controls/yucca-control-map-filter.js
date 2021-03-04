/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaControlMapFilter', ['metadataService','dataService', '$yuccaHelpers', '$http',  '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/control_map_filter.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaControlMapFilter';
            var widgetId = widgetType+new Date().getTime();
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

            scope.label =  $yuccaHelpers.attrs.safe(attr.label, null);
            scope.hint =  $yuccaHelpers.attrs.safe(attr.hint, null);
            
            var width = $yuccaHelpers.attrs.num(attr.width, null, null, 300);
            var height = $yuccaHelpers.attrs.num(attr.height, null, null, 400);

            var centered;
            
        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

            var borderColor =  $yuccaHelpers.attrs.safe(attr.borderColor, "#fff");
            var selectedColor =  $yuccaHelpers.attrs.safe(attr.selectedColor, "#aaa");
            var unselectedColor =  $yuccaHelpers.attrs.safe(attr.unselectedColor, "#ddd");

            scope.controlMapMapId = "controlMap"+new Date().getTime();

            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	if(!g.url)
            		g.url="lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json";
            	if(!g.key)
            		g.key = "name";
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
			
			
			var svg = d3.select('svg').attr('width', width).attr('height', height);
			var g = svg.append('g');
			var mapLayer = g.append('g').classed('map-layer', true);

			d3.json(geojsons[activeGeojson].url, function(error, mapData) {
				// create a first guess for the projection
				 for (var k in mapData.features) {
					 mapData.features[k].properties.selected=false;
            	 }
			     var center = d3.geo.centroid(mapData)
			     var scale  = 1;
			     var offset = [width/2, height/2];
			     var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);

			     // create the path
			     var path = d3.geo.path().projection(projection);

			      // using the path determine the bounds of the current map and use 
			      // these to determine better values for the scale and translation
			     var bounds  = path.bounds(mapData);
			     console.log("bounds", bounds);
			     scale = 1 / Math.max((bounds[1][0]-bounds[0][0])*1.1/width, (bounds[1][1]-bounds[0][1])*1.1/height);
			     offset  = [width - (bounds[0][0] + bounds[1][0])/2,height*1.1-(bounds[0][1] + bounds[1][1])/2];
			      // new projection
			     projection = d3.geo.mercator().center(center).scale(scale).translate(offset);
			     path = path.projection(projection);				
				 // Update color scale domain based on data
				 //color.domain([0, d3.max(features, nameLength)]);

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

			function fillFn(d){return unselectedColor;}
			
			scope.info = {"show": true};
			scope.updateInfo = function(show, content){
				$timeout(function(){
					scope.info.show= show;
					scope.info.content = content;
				},100);
			}
			var resetAllSelection = function(){
        	   console.log("reset",scope.geojson);
        	   for (var k in scope.geojson.data.features) {
        		   scope.geojson.data.features[k].properties.selected=false;
        	   }
			};

			var highlightFeature = function(d) {
        	   d3.select(this).style('fill', selectedColor);
        	   scope.updateInfo(true, d.properties.code + " " + d.properties.name);
			};

			var resetHighlight = function(d) {
        	  	mapLayer.selectAll('path').style('fill', function(d){return d.properties.selected?selectedColor: unselectedColor;});
        	  	scope.updateInfo(false, "");
			};
             
             var switchOnLayer = function(layer){
            	 layer.setStyle({weight: 1, dashArray: '', fillOpacity: 0.7, fillColor: selectedColor});
             }

             var switchOffLayer = function(layer){
            	 layer.setStyle({weight: 1, dashArray: '', fillOpacity: 0.7, fillColor: unselectedColor});
             }

             
             scope.filter = {};
             var currentSelected = null;
             function onAreaClick(d){
            	 console.log("onAreaClick", d);
            	 if(currentSelected!=null){
            		 currentSelected.properties.selected = false;
            	 }
            	 d.properties.selected = !d.properties.selected;
            	 currentSelected = d;
            	 resetHighlight();
//            	 if(selectedLayer){
//            		 selectedLayer.feature.properties.selected = false;
//            		 switchOffLayer(selectedLayer);
//            	 }
//            	 e.target.feature.properties.selected = true;
            	
//                selectedLayer = e.target;
//                switchOnLayer(e.target);

          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", {"column": attr.column, "value" :d.properties[geojsons[activeGeojson].key]}, eventControlId);
         		$rootScope.$broadcast ('yucca-widget-event', event);
            	 
             }
             console.log("attrs", attr);
             scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);


yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/control_map_filter.html",
    '<div class="yucca-widget  yucca-control-map-filter">\n' +
	'    <div class="yucca-control-main-label" for""yucca-filter-text-{{widgetId}}"">{{label}}</div>' + 
	'    <div class="yucca-control-main-hint">{{hint}}</div>' + 
    '    <div class="yucca-widget-control-content">\n' +
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

