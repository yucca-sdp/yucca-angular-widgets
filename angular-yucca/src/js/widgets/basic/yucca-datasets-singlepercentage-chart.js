/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetSinglepercentageChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile','$http', '$sce','$location',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $http,$sce,$location) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_singlepercentage_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem ok", elem);
        	//console.log("document.currentScript.src",document.currentScript.src);
        	// https://github.com/encharm/Font-Awesome-SVG-PNG
        	var scripts = document.getElementsByTagName("script");
        	var svgBaseUrl  =  $location.absUrl().split('#')[0] + "lib/yucca-angular-widgets/dist/img/svg/";
        	for (var i = 0; i < scripts.length; i++) {
				if(scripts[i].src.indexOf("yucca-angular-widgets")>0){
					svgBaseUrl =scripts[i].src.substring(0, scripts[i].src.indexOf("yucca-angular-widgets")) + "yucca-angular-widgets/dist/img/svg/";
					break;
				}
			}
        	console.log("svgBaseUrl",svgBaseUrl);
        	var shapes = {'rectangle': {type: 'basic', tag: 'rect', attrs:{'x':'1', 'y':'1', 'stroke-width':'1'}},
					'ellipse': {type: 'basic', tag: 'ellipse', attrs:{'x':'1', 'y':'1', 'stroke-width':'1'}},
					'circle': {type: 'basic', tag: 'circle', attrs:{'x':'1', 'y':'1', 'stroke-width':'1'}},
					'star': {type: 'polygon', tag: 'polygon', attrs:{'x':'1', 'y':'1', 'stroke-width':'1', 'points':"119,0 148,86 238,86 166,140 192,226 119,175 46,226 72,140 0,86 90,86"}},
					'hexagon': {type: 'polygon', tag: 'polygon', attrs:{'x':'1', 'y':'1', 'stroke-width':'1', 'points':"108,1 216,62.5 216,187.5 108,250 1,187.6 1,62.5"}},
					//'heart': {type: 'polygon', tag: 'polygon', attrs:{'x':'1', 'y':'1', 'stroke-width':'1', 'points':"100 100, 150 150, 200 100, 200 75, 185 60, 165 60, 150 75, 135 60, 115 60, 100 75, 100 100"}},
					'yucca_domain_agriculture':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/AGRICULTURE.svg', attrs:{}},
					'yucca_domain_culture':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/CULTURE.svg', attrs:{}},
					'yucca_domain_economy':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/ECONOMY.svg', attrs:{}},
					'yucca_domain_employment_training':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/EMPLOYMENT_TRAINING.svg', attrs:{}},
					'yucca_domain_energy':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/ENERGY.svg', attrs:{}},
					'yucca_domain_environment':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/ENVIRONMENT.svg', attrs:{}},
					'yucca_domain_government':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/GOVERNMENT.svg', attrs:{}},
					'yucca_domain_health':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/HEALTH.svg', attrs:{}},
					'yucca_domain_population':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/POPULATION.svg', attrs:{}},
					'yucca_domain_production':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/PRODUCTION.svg', attrs:{}},
					'yucca_domain_school':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SCHOOL.svg', attrs:{}},
					'yucca_domain_science_technology':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SCIENCE_TECHNOLOGY.svg', attrs:{}},
					'yucca_domain_security':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SECURITY.svg', attrs:{}},
					'yucca_domain_smart_community':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SMART_COMMUNITY.svg', attrs:{}},
					'yucca_domain_territory':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TERRITORY.svg', attrs:{}},
					'yucca_domain_tourism_sport':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TOURISM_SPORT.svg', attrs:{}},
					'yucca_domain_transport':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TRANSPORT.svg', attrs:{}},
					'yucca_domain_trade':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TRADE.svg', attrs:{}},					
					'common_cloud':{type: 'custom', 'url':svgBaseUrl +'common/cloud.svg', attrs:{"stroke-width":20}},
					'common_comment':{type: 'custom', 'url':svgBaseUrl +'common/comment.svg', attrs:{"stroke-width":20}},
					'common_female':{type: 'custom', 'url':svgBaseUrl +'common/female.svg', attrs:{"stroke-width":20}},
//					'common_pasta':{type: 'custom', 'url':svgBaseUrl +'common/pasta.svg', attrs:{}},
					'common_industry':{type: 'custom', 'url':svgBaseUrl +'common/industry.svg', attrs:{"stroke-width":20}},
//					'common_internet':{type: 'custom', 'url':svgBaseUrl +'common/internet.svg', attrs:{}},
					'common_leaf':{type: 'custom', 'url':svgBaseUrl +'common/leaf.svg', attrs:{"stroke-width":20}},
					'common_male':{type: 'custom', 'url':svgBaseUrl +'common/male.svg', attrs:{"stroke-width":20}},
					'common_mars':{type: 'custom', 'url':svgBaseUrl +'common/mars.svg', attrs:{"stroke-width":20}},
					'common_pagelines':{type: 'custom', 'url':svgBaseUrl +'common/pagelines.svg', attrs:{"stroke-width":20}},
					'common_paw':{type: 'custom', 'url':svgBaseUrl +'common/paw.svg', attrs:{"stroke-width":20}},
					'common_subway':{type: 'custom', 'url':svgBaseUrl +'common/subway.svg', attrs:{"stroke-width":20}},
					'common_train':{type: 'custom', 'url':svgBaseUrl +'common/train.svg', attrs:{"stroke-width":20}},
					'common_tree':{type: 'custom', 'url':svgBaseUrl +'common/tree.svg', attrs:{"stroke-width":20}},
					'common_trophy':{type: 'custom', 'url':svgBaseUrl +'common/trophy.svg', attrs:{"stroke-width":20}},
					'common_truck':{type: 'custom', 'url':svgBaseUrl +'common/truck.svg', attrs:{"stroke-width":20}},
					'common_umbrella':{type: 'custom', 'url':svgBaseUrl +'common/umbrella.svg', attrs:{"stroke-width":20}},
					'common_plane':{type: 'custom', 'url':svgBaseUrl +'common/plane.svg', attrs:{"stroke-width":20}},
					'common_rocket':{type: 'custom', 'url':svgBaseUrl +'common/rocket.svg', attrs:{"stroke-width":20}},
					'common_heart':{type: 'custom', 'url':svgBaseUrl +'common/heart.svg', attrs:{"stroke-width":20}},
					'common_child':{type: 'custom', 'url':svgBaseUrl +'common/child.svg', attrs:{"stroke-width":20}},
					'common_venus':{type: 'custom', 'url':svgBaseUrl +'common/venus.svg', attrs:{"stroke-width":20}},	
					'meteo_cloud':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud.svg', attrs:{}},
					'meteo_cloud_flash':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_flash.svg', attrs:{}},
					'meteo_cloud_flash_alt':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_flash_alt.svg', attrs:{}},
					'meteo_cloud_flash_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_flash_inv.svg', attrs:{}},
					'meteo_cloud_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_inv.svg', attrs:{}},
					'meteo_cloud_moon':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_moon.svg', attrs:{}},
					'meteo_cloud_moon_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_moon_inv.svg', attrs:{}},
					'meteo_clouds':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds.svg', attrs:{}},
					'meteo_clouds_flash':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_flash.svg', attrs:{}},
					'meteo_clouds_flash_alt':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_flash_alt.svg', attrs:{}},
					'meteo_clouds_flash_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_flash_inv.svg', attrs:{}},
					'meteo_clouds_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_inv.svg', attrs:{}},
					'meteo_cloud_sun':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_sun.svg', attrs:{}},
					'meteo_cloud_sun_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_sun_inv.svg', attrs:{}},
					'meteo_compass':{type: 'custom', 'url':svgBaseUrl +'meteo/compass.svg', attrs:{}},
					'meteo_drizzle':{type: 'custom', 'url':svgBaseUrl +'meteo/drizzle.svg', attrs:{}},
					'meteo_drizzle_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/drizzle_inv.svg', attrs:{}},
					'meteo_eclipse':{type: 'custom', 'url':svgBaseUrl +'meteo/eclipse.svg', attrs:{}},
					'meteo_fog':{type: 'custom', 'url':svgBaseUrl +'meteo/fog.svg', attrs:{}},
					'meteo_fog_cloud':{type: 'custom', 'url':svgBaseUrl +'meteo/fog_cloud.svg', attrs:{}},
					'meteo_fog_moon':{type: 'custom', 'url':svgBaseUrl +'meteo/fog_moon.svg', attrs:{}},
					'meteo_fog_sun':{type: 'custom', 'url':svgBaseUrl +'meteo/fog_sun.svg', attrs:{}},
					'meteo_hail':{type: 'custom', 'url':svgBaseUrl +'meteo/hail.svg', attrs:{}},
					'meteo_hail_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/hail_inv.svg', attrs:{}},
					'meteo_mist':{type: 'custom', 'url':svgBaseUrl +'meteo/mist.svg', attrs:{}},
					'meteo_moon':{type: 'custom', 'url':svgBaseUrl +'meteo/moon.svg', attrs:{}},
					'meteo_moon_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/moon_inv.svg', attrs:{}},
					'meteo_rain':{type: 'custom', 'url':svgBaseUrl +'meteo/rain.svg', attrs:{}},
					'meteo_rain_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/rain_inv.svg', attrs:{}},
					'meteo_snow':{type: 'custom', 'url':svgBaseUrl +'meteo/snow.svg', attrs:{}},
					'meteo_snow_alt':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_alt.svg', attrs:{}},
					'meteo_snowflake':{type: 'custom', 'url':svgBaseUrl +'meteo/snowflake.svg', attrs:{}},
					'meteo_snow_heavy':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_heavy.svg', attrs:{}},
					'meteo_snow_heavy_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_heavy_inv.svg', attrs:{}},
					'meteo_snow_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_inv.svg', attrs:{}},
					'meteo_sun':{type: 'custom', 'url':svgBaseUrl +'meteo/sun.svg', attrs:{}},
					'meteo_sun_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/sun_inv.svg', attrs:{}},
					'meteo_sunrise':{type: 'custom', 'url':svgBaseUrl +'meteo/sunrise.svg', attrs:{}},
					'meteo_temperature':{type: 'custom', 'url':svgBaseUrl +'meteo/temperature.svg', attrs:{}},
					'meteo_wind':{type: 'custom', 'url':svgBaseUrl +'meteo/wind.svg', attrs:{}},
					'meteo_windy':{type: 'custom', 'url':svgBaseUrl +'meteo/windy.svg', attrs:{}},
					'meteo_windy_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/windy_inv.svg', attrs:{}},
					'meteo_windy_rain':{type: 'custom', 'url':svgBaseUrl +'meteo/windy_rain.svg', attrs:{}},
					'meteo_windy_rain_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/windy_rain_inv.svg', attrs:{}}
			};

					
            var widgetType = 'YuccaBasicDatasetSinglepercentageChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());

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
            var skip  = $yuccaHelpers.attrs.num(attr.skip, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");

            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
			var labelColumn = scope.$eval(attr.labelColumn);
			var valueColumn = scope.$eval(attr.valueColumn);
			
			var maxValueLabelColumn = scope.$eval(attr.maxValueLabelColumn);
			var maxValueColumn = scope.$eval(attr.maxValueColumn);

			var targetLabelColumn = scope.$eval(attr.targetLabelColumn);
			var targetValueColumn = scope.$eval(attr.targetValueColumn);
			var rows = $yuccaHelpers.attrs.safe(attr.numRows, 1);

			scope.showLabel = !attr.showLabel || attr.showLabel  == 'true';
			scope.showValue = !attr.showValue || attr.showValue  == 'true';
			scope.showMaxValueLabel = !attr.showMaxValueLabel || attr.showMaxValueLabel == 'true';
			scope.showMaxValue = !attr.showMaxValue || attr.showMaxValue == 'true';
			
			console.log("hideLabel ",scope.hideLabel );
			
			var maxValue = $yuccaHelpers.attrs.safe(attr.maxValue, 100);
			var targetValue = $yuccaHelpers.attrs.safe(attr.targetValue, 100);
            scope.textAfter = $yuccaHelpers.attrs.safe(attr.textAfter, null);
            
            
            console.log("singlepercentage valuecolumn", valueColumn);
            var growAnimation  = scope.$eval(attr.growAnimation);
			

			var shape = $yuccaHelpers.attrs.safe(attr.shape, 'rectangle');
			var orientation= $yuccaHelpers.attrs.safe(attr.orientation, 'horizontal');

			var fullColor =  $yuccaHelpers.attrs.safe(attr.fullColor, "#bbb");
			var emptyColor =  $yuccaHelpers.attrs.safe(attr.emptyColor, "#fff");
			var strokeColor = $yuccaHelpers.attrs.safe(attr.strokeColor, fullColor);
			var fontSize =  $yuccaHelpers.attrs.safe(attr.fontSize, 24);

			$timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-content" ));
            	console.log("width",chartContentElement[0].offsetWidth);
            	var parentWidth = chartContentElement[0].offsetWidth;
            	var height = shape=='rectangle' && !attr.externalShapeUrl?parentWidth/10:parentWidth;
            	scope.width = parseInt($yuccaHelpers.attrs.num(attr.widgetWidth, null, null, parentWidth));
            	scope.height = parseInt($yuccaHelpers.attrs.num(attr.widgetHeight, null, null, height));
            });
			

			
            var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	

       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       $timeout(function() {
			       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
			    	   if(!event.data.datasetcode || event.data.datasetcode == datasetcode){
			    		   if(event.eventtype == 'dataset.filter.text'){
			    			   filterMap[event.sourceId] = event.data;
			    			   filter = $yuccaHelpers.event.updateTextFilter(attr.Filter, filterMap, columnDataTypeMap);
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
			    			   loadData();
			    		   }
				       }
			       }
		       });
		       
       		});
       		
       		scope.label  = valueColumn.label;
       		//scope.values  = new Array();
       		scope.charts = new Array();
			var v, label, maxValueLabel,targetLabel;

			var xmlSerializer = new XMLSerializer();

        	var loadData = function(){
        		scope.tableData = [];
    			scope.isLoading = true;
           		scope.charts = new Array();

        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, rows, orderby).then(function(result){
					console.log("loadData", result);
					$timeout(function(){
						if(rows>result.data.d.__count)
							rows=result.data.d.__count;
						for(var valueIndex=0; valueIndex<rows;valueIndex++){
							
				            var svgId = "svg_"+valueIndex+"_" + +new Date().getTime();


							v = result.data.d.results[valueIndex][valueColumn.key];
							v = 1*v;
							if(labelColumn)
								label = result.data.d.results[valueIndex][labelColumn.key];
							else
								label = $yuccaHelpers.attrs.safe(attr.label, "");
							
							if(maxValueLabelColumn)
								maxValueLabel = result.data.d.results[valueIndex][maxValueLabelColumn.key];
							else
								maxValueLabel = $yuccaHelpers.attrs.safe(attr.maxValueLabel, "");
							if(targetLabelColumn)
								targetLabel = result.data.d.results[valueIndex][targetLabelColumn.key];
							else
								targetLabelColumn = $yuccaHelpers.attrs.safe(attr.targetLabel, "");
							
							if(maxValueColumn)
								maxValue = result.data.d.results[valueIndex][maxValueColumn.key];
							if(targetValueColumn)
								targetValue = result.data.d.results[valueIndex][targetValueColumn.key];
							var percentage = v/maxValue;
							console.log("percentage",v, maxValue, percentage);
							//scope.values.push(percentage);
							var defs = $yuccaHelpers.svg.createPercentage(svgId, percentage, fullColor, emptyColor, strokeColor, orientation);

							var currentShape = angular.copy(shapes[shape]);
							if(attr.externalShapeUrl)
								currentShape =  {type: 'custom', 'url':attr.externalShapeUrl, attrs:{}};
							else if(!currentShape)
								currentShape = angular.copy(shapes['rectangle']);
								
							

							console.log(currentShape);
							var svg;
							currentShape.attrs["fill"] ="url(#" + svgId +"bg)";
							currentShape.attrs["stroke"] ="url(#" + svgId +"stroke)";
							
							//var textAttrs = {'x':'50%', 'y':'50%', 'dominant-baseline':'middle',  'text-anchor':'middle',
							//		'fill': emptyColor, 'stroke': strokeColor};
							//if(fontSize)
							//	textAttrs['font-size'] = fontSize;

							if(currentShape.type == 'basic' || currentShape.type== 'polygon'){
								
								var svgAttrs = {'width':scope.width+2, 'height':scope.height+2};
								if(currentShape.type == 'polygon'){
									var size = $yuccaHelpers.svg.baseSize(currentShape.attrs.points);
									var viewBox = "1 1 " + size[0] + " " + size[1];
									var strokeW = scope.width/size[0];
									var strokeH = scope.height/size[1];
									
									currentShape.attrs["stroke-width"] = 1/(strokeW>strokeH?strokeH:strokeW);
									svgAttrs['viewBox'] = viewBox;
									
									//currentShape.attrs["viewBox"] = scope.viewBox; 
								}
								var sizeAttrs = $yuccaHelpers.svg.sizeAttrs(currentShape.tag, scope.width, scope.height);
								for (var attrKey in sizeAttrs) {
									if (sizeAttrs.hasOwnProperty(attrKey)) {
										currentShape.attrs[attrKey] = sizeAttrs[attrKey];
									}
								}
								console.log("currentShape",currentShape);
								
								svg = $yuccaHelpers.svg.createSvg(svgAttrs, currentShape.tag, currentShape.attrs, defs);
								scope.charts.push({"svg":$sce.trustAsHtml(xmlSerializer.serializeToString(svg)), 
									"label":label, 
									"value": $yuccaHelpers.render.safeNumber(v, decimalValue, scope.isEuroValue(),formatBigNumber), 
									"maxValueLabel":maxValueLabel, 
									"maxValue":$yuccaHelpers.render.safeNumber(maxValue, decimalValue, scope.isEuroValue(),formatBigNumber)
								});
								//scope.ssvg  =  $sce.trustAsHtml(xmlSerializer.serializeToString(svg));
								//angular.element(document.getElementById('svg-wrapper' + valueIndex)).append(svg);
						}
						else{
							$http.get(currentShape.url).then(function(svgString) {
								//console.log("data", data);
								//var svgAttrs = {'width':scope.width+2, 'height':scope.height+2};
								var svgAttrs = {'width': "100%", 'height': scope.height};
								//var viewBox = "1 1 " + scope.width + " " + scope.height;
								//svgAttrs['viewBox'] = viewBox;

								svg = $yuccaHelpers.svg.updateSvg(svgString.data, svgAttrs, currentShape.attrs,defs);
								console.log("svg", svg);
								scope.charts.push({"svg":$sce.trustAsHtml(xmlSerializer.serializeToString(svg)), 
									"label":label, 
									"value": $yuccaHelpers.render.safeNumber(v, decimalValue, scope.isEuroValue(),formatBigNumber), 
									"maxValueLabel":maxValueLabel, 
									"maxValue":$yuccaHelpers.render.safeNumber(maxValue, decimalValue, scope.isEuroValue(),formatBigNumber)								});
								//angular.element(document.getElementById('svg-wrapper'+ valueIndex)).append(svg);
							},function(result){
								console.error("Load svg error",result);
								scope.debugMessages.push("Load svg error " +result );
						});
						}
						/*
						if(!isNaN(parseFloat(v))){
							if(growAnimation){
							}
							else
								scope.values.push($yuccaHelpers.render.safeNumber(v, decimalValue, euroValue,formatBigNumber));
						}
						else
							scope.values.push(v);*/
					}
					console.log("charts", scope.charts);
					scope.isLoading = false;
				});

	           },function(result){
	   				scope.isLoading = false;
	   				console.error("Load data error",result);
	   				scope.debugMessages.push("Load data error " +result );
	           });
        		
        		
        	};

        	loadData();
            console.log("attrs", attr);
			
        }
		
	};
	
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_singlepercentage_chart.html",
    '<div class="yucca-widget yucca-dataset-singlepercentage" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-content">\n' +
    '       <section>\n' +
    '         <div ng-if="isLoading" class="yucca-dataset-dataexplorer-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' +
    '         <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '           <p>{{infoMessage}}</p>\n' +
    '         </div>\n' +
	'		  <div ng-if="!isLoading">\n'+
	'             <div ng-repeat="chart in charts track by $index"  class="yucca-widget-singlepercentage-content">'+
    //'             	<div ng-if="!hideLabel" class="yucca-widget-singlepercentage-label" >{{label}}</div>\n' +
	'				<div class="yucca-widget-singlepercentage-label-content"><span class="yucca-widget-label" ng-if="showLabel">{{chart.label}}</span>'+ 
	'					<span class="yucca-widget-value" ng-if="showValue">{{chart.value}}</span>' +
	'					<span class="yucca-widget-max-value-label" ng-if="showMaxValueLabel">{{chart.maxValueLabel}}</span>' +
	'					<span class="yucca-widget-max-value" ng-if="showMaxValue">{{chart.maxValue}}</span>' +
	'					<span class="yucca-widget-text-after-value" >{{textAfter}}</span>' +
	
	'				</div>'+
	'             	<div ng-bind-html="chart.svg" class="yucca-widget-singlepercentage-chart-content"></div>'+			
    '         	  </div>\n' +
    '         </div>\n' +
    '       </section>\n' +
    '   	 <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '   	 </section>\n' +
    '    </div>\n' +
    '<div>\n' +
    '</div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);

	