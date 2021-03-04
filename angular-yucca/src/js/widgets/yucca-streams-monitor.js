/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMonitor', ['metadataService','dataService', '$yuccaHelpers', '$interval', '$window',
    function (metadataService, dataService,$yuccaHelpers,$interval,  $window) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_monitor.html',
        link: function(scope, elem, attr) {
        	

        	
        	var windowActive = true;
        	$window.onblur = function() {console.log('>onblur'); windowActive = false;};
        	$window.onfocus  = function() {console.log('>onfocus'); windowActive = true;};
        	
            var filter  = attr.filter;

        	
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
        	scope.debugMessages = [];
        	scope.showLastUpdate= $yuccaHelpers.attrs.safe(attr.showLastUpdate, false) === "true"?true:false;
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'lineChart');
        	var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, null, null, 300);
        	var chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, null, null, 400);

        	
        	var chartColors =  scope.$eval(attr.chartColors);
            if(typeof chartColors == 'undefined' || chartColors == null ||chartColors.length==0){
            	chartColors = Constants.LINE_CHART_COLORS;
            }
            
            var labels =  scope.$eval(attr.labels);
            if(typeof labels == 'undefined' || labels == null ||labels.length==0){
            	labels = null;
            }        	

            var labels =  scope.$eval(attr.labels);
            if(typeof labels == 'undefined' || labels == null ||labels.length==0){
            	labels = null;
            }        	

            var activeComponents =  scope.$eval(attr.components);
            if(typeof activeComponents == 'undefined' || activeComponents == null ||activeComponents.length==0){
            	activeComponents = null;
            }        	


        	scope.stream  = {};
         	scope.lastupdate =  new Date();
         	
         	scope.options = {
    			chart: {
    				type: chartType,
    				width: chartWidth,
    	            height: chartHeight,
                    useInteractiveGuideline: true,
    	            margin : {
	                    top: 2,	
	                    right: 2,
	                    bottom: 2,
	                    left: 2
    	            },
    	            x: function(d){return d.x;},
    	            xAxis: {tickFormat:(function (d) { return $yuccaHelpers.utils.formatDateFromMillis(d);})},
	                duration: 250
	            }
    	    };
         	
			scope.stream.tableDataValues = [];
			scope.stream.chartData = [];
			var chartData = new Array();

         	
         	var createChartElement  = function(xValue, yValue){
         	// console.error("createChartElement", measureUnit);
    		//   var tooltipText =  "<h3 class='yucca-stream-tweet-stats-tooltip-header'>";
    		//   tooltipText += $yuccaHelpers.utils.formatData(xValue.getTime());
    		//   tooltipText +=  "</h3>";
    		//   tooltipText +=  "<p>Value :<strong>"+yValue+"</strong> <small>" + measureUnit + "</small></p>";
        		
    		   var element = {x:parseFloat(xValue.getTime()), 
    				   y:parseFloat(yValue)};
    		   return element;
         	};
        	
         	var callbackInvoked = false;

    	    var dataCallback = function(message) {
             	callbackInvoked = true;

               var messageBody = JSON.parse(message.body);
               var newValues = messageBody.values[0];
               scope.lastupdate = newValues.time;
   	    	  // scope.$apply(function(){ 
	               // table data
	               scope.stream.tableDataValues.push([$yuccaHelpers.utils.formatDateFromMillis(new Date(newValues.time))]);
	               // chart data
	               for(var j = 0; j<scope.stream.components.length; j++){
	            	   var component  = scope.stream.components[j];
	            	   for (var componentKey in newValues.components) {

	            		    if (newValues.components.hasOwnProperty(componentKey) && componentKey == component.name) {
	            		    	scope.stream.components[j].lastValue = newValues.components[componentKey];
	            		    	scope.stream.components[j].lastUpdate = newValues.time;
				            	
				            	for(var m=0; m<chartData.length; m++){
				            		if(chartData[m].name == component.name){
				            			chartData[m].values.push(createChartElement(new Date(newValues.time), newValues.components[componentKey]));
				            			 if(chartData[m].values.length>200){
				            				 chartData[m].values.shift();
				            			 }
				            			var maxMinValue = findMinMaxValue(chartData[m].values);
				            			scope.stream.components[j].minXValue = maxMinValue[0];
				            			scope.stream.components[j].maxXValue = maxMinValue[1];
				            			break;
				            		}
				            		
				            	}
				            	scope.stream.tableDataValues[scope.stream.tableDataValues.length-1].push(newValues.components[componentKey]);
	            		    }
	            	   }
	               }
	               if(scope.stream.tableDataValues.length>20)
	            	   scope.stream.tableDataValues.shift();
   	    	   //});
               
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

    	    
    	    if(typeof attr.tenantCode!=undefined && attr.tenantCode!=null &&
    	    	typeof attr.streamCode!=undefined && attr.streamCode!=null &&
    	    	typeof attr.smartobjectCode!=undefined && attr.smartobjectCode!=null){
				metadataService.getStreamMetadata (attr.tenantCode, attr.streamCode, attr.smartobjectCode, user_token).then(function(result){
					console.log("getStreamMetadata metadata",result);
					var metadata = result.data;
					scope.stream.name = metadata.name;
					var colorIndex = 0;
					if(activeComponents == null)
						scope.stream.components = metadata.stream.components;
					else{
						scope.stream.components = [];
						for(var k = 0; k< metadata.stream.components.length; k++){
							for(var m = 0; m< activeComponents.length; m++){
								if(activeComponents[m] == metadata.stream.components[k].name){
									scope.stream.components.push(metadata.stream.components[k]);
									break;
								}
							}
						}
					}
					
					
					
					
					//scope.stream.components = metadata.stream.components;
					for(var k = 0; k<scope.stream.components.length; k++){
		            	if(labels!=null && k<labels.length){
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
					
					for(var j = 0; j<scope.stream.components.length; j++){
	            	   var component  = scope.stream.components[j];
						colorIndex<chartColors.length?colorIndex++:colorIndex=0;
						chartData.push({"name":component.name, "key":component.label, "values":[],"color": chartColors[colorIndex]});
						scope.stream.chartData.push({"name":component.name, "key":component.label, "values":[],"color": chartColors[colorIndex]});
					}
					

					if(typeof metadata["dataset"]!='undefined' && metadata["dataset"]!=null && typeof metadata["dataset"].code!='undefined' && metadata["dataset"].code!=null){
						dataService.getMeasures(metadata["dataset"].code,user_token,filter,  0, 20, 'time%20desc').then((function(result){ 
							return function(data) {
								console.debug("getMeasures" , dataCallbackIndex, data);
								var dataCallbackIndex = result.data
								if(data.data.d.results!=null && data.data.d.results.length>0){
									data.data.d.results.reverse();
									scope.stream.tableDataValues = [];
									//scope.stream.chartData = [];
									// table data
									for(var k=0; k<data.data.d.results.length; k++){
					            		scope.stream.tableDataValues[k] = [$yuccaHelpers.utils.mongoDate2string(data.data.d.results[k]["time"])];
										for(var j = 0; j<scope.stream.components.length; j++){
											if(typeof data.data.d.results[k][scope.stream.components[j].name] != 'undefined' && data.data.d.results[k][scope.stream.components[j].name]!=null)
												scope.stream.tableDataValues[k].push(data.data.d.results[k][scope.stream.components[j].name]);
											else
												scope.stream.tableDataValues[k].push("-");
										}
					            	}

									// chart data
			            			//var colorIndex = 0;

									for(var j = 0; j<scope.stream.components.length; j++){
					            	   var component  = scope.stream.components[j];
					            	   
										chartData[j].values = [];

					            	   //var chartDataValues = [];
					            	    for(var k=0; k<data.data.d.results.length; k++){
						            	   if(data.data.d.results[k][component.name] !=null){
						            		   if(k==0){
						            			   scope.stream.components[j].lastValue = data.data.d.results[k][component.name];
						            			   scope.stream.components[j].lastUpdate = $yuccaHelpers.utils.mongoDate2string(data.data.d.results[k]["time"]);
						            		   }
						            		   chartData[j].values.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.data.d.results[k]["time"]),  
						            				   data.data.d.results[k][component.name]));
						            		   //chartDataValues.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.data.d.results[k]["time"]),  data.data.d.results[k][component.name]));
						            	   }
					            	    }

					            	  //  if(colorIndex<chartColors.length){
			                    	  //		colorIndex++;
			                    	  //	}
					            	  //  else
					            	  //  	colorIndex = 0;

					            	   //scope.stream.chartData.push({"key":component.label, "values":chartDataValues,"color": chartColors[colorIndex]});
					            	   
					            	    var maxMinValue = findMinMaxValue(chartData[j].values);
					            	   scope.stream.components[j].minXValue = maxMinValue[0];
					            	   scope.stream.components[j].maxXValue = maxMinValue[1];
					               }
									console.log("..", scope.stream);
					             	callbackInvoked = true;

					               dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
								}
							};
						})(metadata.code));
					}
					//else
					dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
					
					
					
				},function(e){
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

        	//var start  = new Date().getTime();
        	//var callCounter = 0;
            $interval(function(){
            	if(callbackInvoked && windowActive){
            		//callCounter++;
            		//console.warn("in", windowActive,  (new Date().getTime() - start), callCounter);
            		callbackInvoked= false;
	            	for(var m=0; m<chartData.length; m++){
	            		scope.stream.chartData[m].values = chartData[m].values.slice();
	            	}
            	}
            }, 1000);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_monitor.html",
    '<div class="yucca-widget yucca-stream-monitor">\n' +
    '    <header class="yucca-stream-monitor-header" ng-show="widgetTitle!=null"> \n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-monitor-content">\n' +
    '        <section class="yucca-stream-monitor-chart"  ng-show="panel==\'chart\'">\n' +
    '            <nvd3 options="options" data="stream.chartData"></nvd3>\n' +
    '            <div class="yucca-stream-monitor-chart-x-xAxis" ng-show="stream.chartData.length>0">\n'+
    '            	<div class="min-value"><span class="value-hour">{{stream.components[0].minXValue|date:"H:mm"}}</span><span class="value-date">{{stream.components[0].minXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '               <div class="max-value"><span class="value-hour">{{stream.components[0].maxXValue|date:"H:mm"}}</span><span class="value-date">{{stream.components[0].maxXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '            </div>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-monitor-data" ng-show="panel==\'data\'">\n' +
    '           <table class="yucca-stream-monitor-data-table">\n'+
    '               <thead>\n'+
    '                   <tr><th>Time</th><th ng-repeat="component in stream.components track by $index">{{component.label}}</th></tr>\n'+
    '               </thead>\n'+
    '               <tbody>\n' +
    '                   <tr ng-repeat="row in stream.tableDataValues track by $index">\n' +
    '                     <td ng-repeat="data in row track by $index">\n'+
    '                         <span class="yucca-stream-monitor-data-table">{{data}}</span> \n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +    
    '        <section class="yucca-stream-monitor-lastupdate-bar" ng-show="showLastUpdate">\n' +
    '            Updated at: {{lastupdate|date:"dd/MM/yyyy  H:mm"}}\n' + 
    '        </section>\n' + 
    '        <section class="yucca-stream-monitor-toolbar">\n' +
    '            <a href ng-click="panel=\'chart\'" ng-class="{active: panel == \'chart\'}">Chart</a> | <a href ng-click="panel=\'data\'" ng-class="{active: panel == \'data\'}">Data</a> \n' +
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

