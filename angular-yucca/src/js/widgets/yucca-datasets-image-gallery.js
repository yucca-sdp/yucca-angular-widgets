/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetImageGallery', ['metadataService','dataService', '$yuccaHelpers', '$interval', 'leafletData', '$compile', '$timeout',
    function (metadataService, dataService,$yuccaHelpers, $interval, leafletData, $compile, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_image_gallery.html',
        link: function(scope, elem, attr) {
            
            var user_token =  attr.userToken;
            scope.debug = attr.debug==="true"?true:false;
            
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'slideshow');
            scope.datasetImageGalleryMapId = "map"+new Date().getTime();

            var filter  = attr.filter;
            var skip  = attr.skip;
            var top  = attr.top;
            if(isNaN(top) || top<1)
            	top  =10;
            else if(top>50)
            	top=50;
            	
            var interval  =attr.interval;
            if(isNaN(interval) || interval<500)
            	interval  =2000;
            var imageColumns = scope.$eval(attr.imageColumns);
            scope.hasMap = false;
            var positionColumns = null;
            if(typeof attr.positionColumns != undefined && attr.positionColumns!=null){
            	positionColumns =  scope.$eval(attr.positionColumns);
            	scope.hasMap = true;
            }
            
            var imageTitleColumn = attr.imageTitleColumn;

            var markerAsImage = attr.markerAsImage==="true"?true:false;
            var	markerUrl = attr.markerUrl;
            scope.showTitle = attr.showTitle==="false"?false:true;
            
            var	markerColor = attr.markerUrl;
            if(typeof markerColor == 'undefined' || markerColor ==null)
            	markerColor = "#00bbf0";
            

            scope.allData = [];

            scope.currentImageIndex = 0;
            scope.nexImage = function(imageIndex){
            	if(imageIndex!=null && imageIndex<scope.allData.length){
            		scope.currentImageIndex = imageIndex;
                    $interval.cancel(slideshowInterval);
            	}
            	else {
            		if(scope.currentImageIndex>= scope.allData.length-1){
            			scope.currentImageIndex = 0;
            		}
            		else
            			scope.currentImageIndex++;
            	}

            };
            
            var slideshowInterval = $interval(function(){scope.nexImage();}, interval);
            
            
            scope.mapData = {"markers": {},"markerstyles": []};
            var bounds = {};
            bounds[scope.datasetImageGalleryMapId] = [];
            

            var createMarker = function(iconUrl, lat, lng){
            	var marker = {};
				marker.lat = parseFloat(lat);
				marker.lng = parseFloat(lng);
				if(markerAsImage){
					marker.icon = {	 iconUrl: iconUrl,
			                         iconSize:     [48, 48]
						 		  };
				}
				else{
					if(markerUrl!=null && markerUrl!=''){
						marker.icon = {	
							iconUrl: markerUrl,
				 		 };
					}
					else{
						marker.icon = {	
							markerColor: markerColor,
				 		};
					}
				}
				
				
				marker.message = "<img src='" + iconUrl +  "'  class='yucca-dataset-image-gallery-popup-img'> </img>";

				bounds[scope.datasetImageGalleryMapId].push([L.latLng(marker.lat, marker.lng)]);
				return marker;
            };
            
          /*  
            metadataService.getDatasetMetadata(attr.tenantCode, attr.datasetCode).success(
                function(metadata) {
                	console.log("metadata",metadata);
                    scope.metadata = metadata;
                    
                }
            );
            */

            scope.totalCount = "-";
            scope.imgUrl = null;
            scope.debugMessages = [];
        	scope.datasetImageGalleryMaxBounds = {southWest: {lat: 38.700247900602726, lng: -9.165430068969727},northEast: {lat: 38.72703673982525,lng: -9.110498428344725}};

        	dataService.getDataEntities(attr.datasetCode, user_token, filter,  skip, top, 'internalId%20desc').success( function(data) {

            		if(data!=null && data.d!=null){
            			 scope.totalCount = data.d.__count;
            			 var validIdBinaries = [];
            			 var idBinaryPosiytionsMap = [];
            			 var idBinaryLabelMap = [];
            			 
            			 for (var i = 0; i < data.d.results.length; i++) {
            				var d  =data.d.results[i];
            				
							var binariesUrl = d.Binaries.__deferred.uri.replace("http://","https://");
							for(var colsIndex = 0; colsIndex <imageColumns.length; colsIndex++){
								if(d[imageColumns[colsIndex]]!=null){
									validIdBinaries.push(d[imageColumns[colsIndex]].idBinary); 
									idBinaryPosiytionsMap[d[imageColumns[colsIndex]].idBinary] = [d[positionColumns[0]],d[positionColumns[1]]];
									if(typeof imageTitleColumn != 'undefined' &&  imageTitleColumn !=null)
										idBinaryLabelMap[d[imageColumns[colsIndex]].idBinary] = d[imageTitleColumn];
								}
							}
							for(var colsIndex = 0; colsIndex <imageColumns.length; colsIndex++){
								if(d[imageColumns[colsIndex]]!=null){
									dataService.getBinariesData(binariesUrl).success( function(binariesData) {
										console.log("idBinary, binariesData",binariesData);
										for(var j = 0; j < binariesData.d.results.length;j++){
											//if(binariesData.d.results[j].idBinary == idBinary){
											var idBinary = binariesData.d.results[j].idBinary;
											if(validIdBinaries.indexOf(idBinary) > -1){
												var urlDownloadBinary  = binariesData.d.results[j].urlDownloadBinary;
												var labelBinary  = binariesData.d.results[j].aliasNameBinary;
												console.log("urlDownloadBinary",urlDownloadBinary);
												var data = {};
												data["url"] = Constants.API_DATA_URL + urlDownloadBinary.substring(5);
												data["label"] = labelBinary;
												if(typeof idBinaryLabelMap[idBinary] !='undefined' && idBinaryLabelMap[idBinary]!=null  && idBinaryLabelMap[idBinary]!= '')
													data["label"] = idBinaryLabelMap[idBinary];
												scope.allData.push(data);
												
												if(scope.hasMap && idBinaryPosiytionsMap[idBinary]!=null ){ 
													scope.mapData.markers[idBinary.replace('.', '_')] = createMarker('http:'+data["url"], idBinaryPosiytionsMap[idBinary][0], idBinaryPosiytionsMap[idBinary][1]);
												}
												
												console.log(scope.mapData.markers);

												
											};
										};
										
										//leafletData.getMap(scope.mapId).then(function (map) {
										//	console.info("map", map);
										//	console.log("bounds",bounds);
											 //map.invalidateSize();
						                //     map.fitBounds(bounds);
						                //});

									});
								}
								else{
									scope.debugMessages.push("Invalid column name: " + imageColumns[colsIndex]);
								}
							}
						};
            		}
            		else{
						scope.debugMessages.push("No data found with dataset code " +attr.datasetCode);
            		};
	        	}
	        );


        	scope.viewMap = function(){
        		scope.panel = 'map';
        		
        		$timeout(function(){
            		var mapTemplate = '<leaflet width="100%" height="300px" markers="mapData.markers" maxbounds="datasetImageGalleryMaxBounds"></leaflet>';
            		angular.element(document.getElementById(scope.datasetImageGalleryMapId)).empty().append($compile(mapTemplate)(scope));
        			var bb = new L.latLngBounds(bounds[scope.datasetImageGalleryMapId]);
            		scope.datasetImageGalleryMaxBounds = {southWest: bb.getSouthWest(), northEast: bb.getNorthEast()};
            		console.info("scope.datasetImageGalleryMaxBounds",scope.datasetImageGalleryMaxBounds);
        		}, 100);
        		
        	};
           
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_image_gallery.html",
    '<div class="yucca-widget yucca-dataset-image-gallery">\n' +
    '    <header class="yucca-dataset-image-gallery-header">\n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-image-gallery-content">\n' +
    '        <section class="yucca-dataset-image-gallery-map" ng-show="panel==\'map\'">\n' +
    //'           <leaflet width="100%" height="300px" markers="mapData.markers" maxbounds="datasetImageGalleryMaxBounds"></leaflet>\n' +
    '             <div ng-attr-id="{{datasetImageGalleryMapId}}"></div>\n'+
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-slideshow" ng-show="panel==\'slideshow\'" >\n' +
    '        	<div>\n' +
    '              <img ng-src="{{data.url}}" ng-repeat="data in allData track by $index" ng-show="$index==currentImageIndex"/>\n' +
    '              <div class="yucca-dataset-image-gallery-slide-title" ng-show="showTitle">{{allData[currentImageIndex].label}}</div>\n' +
    '              <div class="yucca-dataset-image-gallery-bullets-panel">\n' +
    '                  <a ng-repeat="image in allData track by $index" href ng-click="nexImage($index)" class="yucca-dataset-image-gallery-bullet" ng-class="{active: $index == currentImageIndex}"></a>\n' +
    '        	   </div>\n' +
    '        	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-data" ng-hide="allData!=null">\n' +
    '           No data\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-total-count">\n' +
    '            Total: {{totalCount}}\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-toolbar" ng-show="hasMap">\n' +
    '            <a href ng-click="viewMap()"  ng-class="{active: panel == \'map\'}">Map</a> | <a href ng-click="panel=\'slideshow\'"  ng-class="{active: panel == \'slideshow\'}">Slideshow</a> \n' +
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

