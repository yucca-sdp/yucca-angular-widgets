/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamLastValue', ['metadataService','dataService', '$yuccaHelpers', '$interval', '$window',
    function (metadataService, dataService,$yuccaHelpers,$interval,$window) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_last_value.html',
        link: function(scope, elem, attr) {
        	var windowActive = true;
        	$window.onblur = function() {console.log('>onblur'); windowActive = false;};
        	$window.onfocus  = function() {console.log('>onfocus'); windowActive = true;};

            
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
        	scope.debugMessages = [];
        	scope.showLastUpdate= $yuccaHelpers.attrs.safe(attr.showLastUpdate, false) === "true"?true:false;
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'lineChart');
        	var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, null, null, 60);
        	var chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, null, null, 200);
        	var chartColor = $yuccaHelpers.attrs.safe(attr.chartColor, '#0050ef');
        	console.log("chartColor", chartColor);
        	

        	var labels =  scope.$eval(attr.labels);
            if(typeof labels == 'undefined' || labels == null ||labels.length==0){
            	labels = null;
            }        	

            var activeComponents =  scope.$eval(attr.components );
            if(typeof activeComponents == 'undefined' || activeComponents == null ||activeComponents.length==0){
            	activeComponents = null;
            }

        	var toolTipContentFunction = function(key, x, y, e, graph) {
    			var dataIndex  = key.index;
    			var tooltip="";
    			if(chartType == 'lineChart')
    				tooltip=key.point.tooltip;
    			else
    				tooltip=key.data.tooltip;
    	    	return  tooltip;
    		};
            
        	scope.stream  = {};
        	var components = new Array();
         	scope.lastupdate =  new Date();
         	
         	scope.options = {
    			chart: {
    				type: chartType,
    				width: chartWidth,
    	            height: chartHeight,
    	            interpolate: 'basis',
    	            showXAxis: false,
    	            showYAxis: false,
    	            showLegend: false, 
    	            margin : {
	                    top: 0,
	                    right: 6,
	                    bottom: 25,
	                    left: 6
    	            },
    	            x: function(d){return d.x;},
	                tooltip:{contentGenerator: toolTipContentFunction},
	                duration: 250
	            }
    	    };
         	
         	var createChartElement  = function(xValue, yValue){
    		 //  var tooltipText =  "<h3 class='yucca-stream-tweet-stats-tooltip-header'>";
    		 //  tooltipText += $yuccaHelpers.utils.formatData(xValue.getTime());
    		 //  tooltipText +=  "</h3>";
    		 //  tooltipText +=  "<p>Value :<strong>"+yValue+"</strong></p>";
        		
     		   //var element = {x:parseFloat(xValue.getTime()), y:parseFloat(yValue), "tooltip": "<h3 class='yucca-stream-tweet-stats-tooltip-header'>" + $yuccaHelpers.utils.formatData(xValue.getTime()) +
     			//	   "</h3><p>Value :<strong>"+yValue+"</strong></p>"};
    		   //var element = {x:parseFloat(xValue.getTime()), y:parseFloat(yValue)};
    		   return {x:parseFloat(xValue.getTime()), y:parseFloat(yValue), "tooltip": "<h3 class='yucca-stream-tweet-stats-tooltip-header'>" + $yuccaHelpers.utils.formatStreamDate(xValue.getTime(), true) +
 				   "</h3><p>Value :<strong>"+yValue+"</strong></p>"};;
         	};
         	         	
         	var callbackInvoked = false;
        	
    	    var dataCallback = function(message) {
    	    	callbackInvoked = true;
    	       var messageBody = JSON.parse(message.body);
               var newValues = messageBody.values[0];
               scope.lastupdate = newValues.time;
               for(var j = 0; j<scope.stream.components.length; j++){
            	   var component  = scope.stream.components[j];
            	   for (var componentKey in newValues.components) {
            		    if (newValues.components.hasOwnProperty(componentKey) && componentKey == component.name) {
            		    	//scope.$apply(function(){ 
	            		    	scope.stream.components[j].lastValue = newValues.components[componentKey];
	            		    	scope.stream.components[j].lastUpdate = newValues.time;
	            		    	scope.stream.components[j].chartData[0]["values"].push(createChartElement(new Date(newValues.time), newValues.components[componentKey]));
		            			 if(scope.stream.components[j].chartData[0]["values"].length>50){
		            				 scope.stream.components[j].chartData[0]["values"].shift();
		            			 }

				            	var maxMinValue = findMinMaxValue(scope.stream.components[j].chartData[0]["values"]);
				            	scope.stream.components[j].minXValue = maxMinValue[0];
				            	scope.stream.components[j].maxXValue = maxMinValue[1];
				            	scope.stream.components[j].delta = findDelta(scope.stream.components[j].chartData[0]["values"]);			
            		    //	});
            		    }
            	   }
               }
    	    };
    	    
    	    var findMinMaxValue = function(chartDataElementsArray){
    	    	var min  = null;
    	    	var max = null;
    	    	if(typeof chartDataElementsArray!= 'undefined' && chartDataElementsArray!=null && chartDataElementsArray.length>0){
	    	    	for (var i = 0; i < chartDataElementsArray.length; i++) {
	    	    		if(min == null || min>chartDataElementsArray[i].x)
	    	    			min = chartDataElementsArray[i].x;
	    	    		if(max == null || max<chartDataElementsArray[i].x)
	    	    			max = chartDataElementsArray[i].x;
					}
    	    	}
    	    	return [min, max];
    	    };
    	    var findDelta= function(chartDataElementsArray){
    	    	var delta  = null;
    	    	if(typeof chartDataElementsArray!= 'undefined' && chartDataElementsArray!=null){
    	    		if(chartDataElementsArray.length>1)
    	    			delta = parseFloat(chartDataElementsArray[chartDataElementsArray.length-1].y) - parseFloat(chartDataElementsArray[chartDataElementsArray.length-2].y); 
    	    		else
    	    			delta = 0;
    	    		delta  = delta.toPrecision(2);
    	    	}
    	    	return delta;
    	    };
    	    
    	    
    	    if(typeof attr.tenantCode!=undefined && attr.tenantCode!=null &&
    	    	typeof attr.streamCode!=undefined && attr.streamCode!=null &&
    	    	typeof attr.smartobjectCode!=undefined && attr.smartobjectCode!=null){
				metadataService.getStreamMetadata (attr.tenantCode, attr.streamCode, attr.smartobjectCode, user_token).success(function(metadata){
					scope.stream.name = metadata.name;
					if(activeComponents == null){
						scope.stream.components = metadata.stream.components;
						components = metadata.stream.components;
					}
					else{
						scope.stream.components = [];
						for(var k = 0; k< metadata.stream.components.length; k++){
							for(var m = 0; m< activeComponents.length; m++){
								if(activeComponents[m] == metadata.stream.components[k].name){
									scope.stream.components.push(metadata.stream.components[k]);
									components.push(metadata.stream.components[k]);
									break;
								}
							}
						}
					}
					for(var k = 0; k<scope.stream.components.length; k++){
						scope.stream.components[k].chartData = [{"key":"data","values":[], "color": chartColor}];
		            	if(labels!=null){
		            		try {
		            			scope.stream.components[k].label = labels[k];
							} catch (e) {
								scope.stream.components[k].label = scope.stream.components[k].name;
								console.error("Component's label not valid");
							}
		            	}
		            	else
		            		scope.stream.components[k].label = scope.stream.components[k].name;

					}
					
					if(typeof metadata["dataset"]!='undefined' && metadata["dataset"]!=null && typeof metadata["dataset"].code!='undefined' && metadata["dataset"].code!=null){
						dataService.getMeasures(metadata["dataset"].code,user_token,null,  0, 20, 'time%20desc').success((function(dataCallbackIndex){ 
							return function(data) {
								console.debug("getMeasures" , dataCallbackIndex, data);

								if(data.d.results!=null && data.d.results.length>0){
									data.d.results.reverse();
									for(var j = 0; j<scope.stream.components.length; j++){
					            	   var component  = scope.stream.components[j];
					            	   //var chartDataValues = new Array();
					            	   components[j].chartDataValues =  new Array();
					            	   for(var k=0; k<data.d.results.length; k++){
						            	   if(data.d.results[k][component.name] !=null){
						            		   if(k==0){
						            			   scope.stream.components[j].lastValue = data.d.results[k][component.name];
						            			   scope.stream.components[j].lastUpdate = $yuccaHelpers.utils.mongoDate2string(data.d.results[k]["time"]);
						            		   }
						            	
						            		   components[j].chartDataValues.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.d.results[k]["time"]),  data.d.results[k][component.name]));
						            		   //chartDataValues.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.d.results[k]["time"]),  data.d.results[k][component.name]));
						            	   }
					            	   }
					            	   //scope.stream.components[j].chartData[0]["values"] = chartDataValues;
					            	   var maxMinValue = findMinMaxValue(components[j].chartDataValues);
					            	   scope.stream.components[j].minXValue = maxMinValue[0];
					            	   scope.stream.components[j].maxXValue = maxMinValue[1];
					            	   scope.stream.components[j].delta = findDelta(components[j].chartDataValues);
					               }
					               dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
					               callbackInvoked = true;
								}
							};
						})(metadata.code));
					}
					//else
						dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
					
					
					
				}).error(function(e){
					console.log("error", e);
					scope.debugMessages.push("Stream not found: " + scope.stream);
					
				});
					
					
        	}
        	else{
        		scope.debugMessages.push("Invalid stream definition: tenantCode: " + attr.tenantCode+ " - streamCode: "+ attr.streamCode + " - smartobjectCode: " + attr.smartobjectCode);
        	}
        	
            console.debug("attrs", attr);
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


            $interval(function(){
            	if(callbackInvoked && windowActive){
            		//console.warn("in", windowActive,  (new Date().getTime() - start));
            		callbackInvoked = false;
            		for(var m=0; m<components.length; m++){
	            		if(typeof components[m].chartDataValues != 'undefined'){
	            			scope.stream.components[m].chartData[0]["values"] = components[m].chartDataValues.slice();
	            		}
	            	}
            	}
            }, 1000);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_last_value.html",
    '<div class="yucca-widget yucca-stream-last-value">\n' +
    '    <header class="yucca-stream-last-value-header" ng-show="widgetTitle!=null"> \n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-last-value-content">\n' +
    '        <section class="yucca-stream-last-value-data">\n' +
    '           <div class="yucca-stream-last-value-panel " ng-repeat-start="component in stream.components track by $index"> \n' +
    '               <div class="yucca-stream-last-value-component-name"><span title="Phenomenon: {{component.phenomenon}}">{{component.label}}</span></div>\n' +
    '               <div class="yucca-stream-last-value-component-panel"> \n' +
    '                   <div class="yucca-stream-last-value-component-value" title="Exact value: {{component.lastValue}} - Updated at: {{component.lastUpdate|date:\'dd/MM/yyyy  H:mm\'}}">{{component.lastValue|format_big_number}}</div>\n' + 
    '                   <div class="yucca-stream-last-value-component-value-info"> \n' +
    '                       <div class="yucca-stream-last-value-component-trend" ng-show="component.delta!=null" title="Value trend">\n' +
    '					        <span class="trend-up" ng-show="component.delta>0">&plus;</span>\n'+
    '					        <span class="trend-down" ng-show="component.delta<0"></span>\n' +
    '					        <span class="trend-stable" ng-show="component.delta==0"></span>\n' +
    '					        {{component.delta}}\n'+
    '                       </div>\n' +
    '                       <div class="yucca-stream-last-component-measureunit">{{component.measureunit}}</span> </div>\n' +
    '                   </div>\n' +
    '               </div>\n' +
    '               <div class="yucca-stream-last-value-component-chart" ng-show="component.chartData[0].values.length>1"><nvd3 options="options" data="component.chartData"></nvd3></div>\n' +
    '               <div class="yucca-stream-last-value-component-chart-x-xAxis" ng-show="component.chartData[0].values.length>1">\n'+
    '                   <div class="min-value"><span class="value-hour">{{component.minXValue|date:"H:mm"}}</span><span class="value-date">{{component.minXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '                   <div class="max-value"><span class="value-hour">{{component.maxXValue|date:"H:mm"}}</span><span class="value-date">{{component.maxXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '               </div>\n' +
    '           </div>\n' +
    '           <div class="yucca-stream-last-value-panel-separator " ng-repeat-end ng-hide="$index<stream.components.length"></div>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-last-value-lastupdate-bar" ng-show="showLastUpdate">\n' +
    '            Updated at: {{lastupdate|date:"dd/MM/yyyy  H:mm"}}\n' + 
    '        </section>\n' + 
    '    </div>\n' +
    '    <footer>\n' +
    '        <a href="http://www.smartdatanet.it/" target="_blank" title="Powered by smartdatanet.it">\n' +
    '          <i>SmartDataNet.it</i>\n' +
    '        </a>\n' +
    '    </footer>\n' +
    '</div>\n'
    );
}]);

