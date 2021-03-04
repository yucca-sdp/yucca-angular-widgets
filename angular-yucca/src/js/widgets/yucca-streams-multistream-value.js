/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMultistreamValue', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_multistream_value.html',
        link: function(scope, elem, attr) {
        	
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
        	scope.debugMessages = [];
            
            //[{stream:"", components: [{component:"",min:"",max:""}];
        	var streamsAttr = scope.$eval(attr.streams);
        	scope.streams  ={};
        	scope.lastupdate =  new Date();

        	
        	var refershDataBullet = function(component){
        		var result = "";
        		var value =  	parseFloat(component.lastValue);
        		if(value!=null){
            		var result = "ok";
        			if((component.minWarning != '-' && value < component.minWarning) || 
        					(component.maxWarning != '-' && value > component.maxWarning ))
        				result = "warning";
        			if((component.minCritical != '-' && value < component.minCritical) || 
        					(component.maxCritical != '-' && value > component.maxCritical))
        				result = "critical";
        		
        		}
        		return result;
        	};
        	
    	    var dataCallback = function(message, dataCallbackIndex) {
               var messageBody = JSON.parse(message.body);
               if(typeof dataCallbackIndex == undefined || dataCallbackIndex == null){
            	   dataCallbackIndex = message.headers.destination.replace("/topic/output.", "");
//            		   "/topic/output.cittato_aria.9610f4fc-1535-4d09-c596-76dc0a5a339c_AQS_001"            	   
               }
               var newValues = messageBody.values[0];
               scope.lastupdate = newValues.time;
               for(var j = 0; j<scope.streams[dataCallbackIndex].components.length; j++){
            	   var component  = scope.streams[dataCallbackIndex].components[j];
            	   for (var componentKey in newValues.components) {
            		    if (newValues.components.hasOwnProperty(componentKey) && componentKey == component.name) {
            		    	scope.streams[dataCallbackIndex].components[j].lastValue = newValues.components[componentKey];
            		    	scope.streams[dataCallbackIndex].components[j].bulletLevel = refershDataBullet(scope.streams[dataCallbackIndex].components[j]);
            		    	
            		    }
            	   }
               }
    	    };
    	    
  
    	    if(typeof streamsAttr!=undefined && streamsAttr!=null && streamsAttr.length >0){
        		for (var i = 0; i < streamsAttr.length; i++) {
					var stream = streamsAttr[i];
					metadataService.getStreamMetadata (stream.tenantCode, stream.streamCode, stream.smartobjectCode, user_token).success(function(metadata){
						var s = {};
						
						s.name = metadata.name;
						s.components =[];
						for(var a=0; a<streamsAttr.length; a++){ // loop on streams attribute from client
							if(streamsAttr[a].tenantCode == metadata.tenantCode && 
								streamsAttr[a].streamCode == metadata.stream.code && 
								streamsAttr[a].smartobjectCode == metadata.stream.smartobject.code){  // if the stream loaded is the stream attribute
									for(var c=0; c<streamsAttr[a].components.length; c++){ //loop on components of the stream attribute
										for(var c1=0; c1<metadata.stream.components.length; c1++){ // loop on components of the stream loaded
										if(metadata.stream.components[c1].name == streamsAttr[a].components[c].name){
											var c2 = {};
											c2.name = metadata.stream.components[c1].name;
											c2.phenomenon = metadata.stream.components[c1].phenomenon;
											c2.measureunit = metadata.stream.components[c1].measureunit;
											c2.label = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].label, c2.name);
											c2.minWarning = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].minWarning, "-");
											c2.minCritical = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].minCritical, "-");
											c2.maxWarning = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].maxWarning, "-");
											c2.maxCritical = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].maxCritical, "-");
											c2.bulletsLevel  = "Min Critical: " +c2.minCritical + " \u000d " +
																"Min Warning: " +c2.minWarning + " \u000d" +
																"Max Warning: " +c2.maxWarning+ " \u000d" +
																"Max Critical: " +c2.maxCritical;
											s.components.push(c2);
									
										}
									}
								}
							}
						}
						scope.streams[ metadata.code] = s;
						if(typeof metadata["dataset"]!='undefined' && metadata["dataset"]!=null && typeof metadata["dataset"].code!='undefined' && metadata["dataset"].code!=null){
							console.debug("load past data");
							dataService.getMeasures(metadata["dataset"].code, user_token,null,  0, 1, 'time%20desc').success((function(dataCallbackIndex){ 
								return function(data) {
									console.debug("getMeasures" , dataCallbackIndex, data);
									if(data.d.results!=null && data.d.results.length>0){
										for(var j = 0; j<scope.streams[dataCallbackIndex].components.length; j++){
						            	   var component  = scope.streams[dataCallbackIndex].components[j];
						            	   if(data.d.results[0][component.name] !=null){
						            		   scope.streams[dataCallbackIndex].components[j].lastValue = data.d.results[0][component.name];
						            		   scope.streams[dataCallbackIndex].components[j].lastUpdate = $yuccaHelpers.utils.mongoDate2string(data.d.results[0]["time"]);
						            		   scope.streams[dataCallbackIndex].components[j].bulletLevel = refershDataBullet(scope.streams[dataCallbackIndex].components[j]);
						            	   }
						               }
						               dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
									}
									};
							})(metadata.code));
						}
						else
							dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
						
						
						
					}).error(function(){
						scope.debugMessages.push("Stream not found: " + stream);
						
					});
					
					
				}
        	}
        	else{
        		scope.debugMessages.push("Invalid streams definition: " + streamsAttr + " - streams must be an array like this [{'tenantCode':'...', 'streamCode':'...', 'smartobjectCode':'...', components: [{component:'',min:'',max:''}], ...");
        	}
        	
            console.debug("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_multistream_value.html",
    '<div class="yucca-widget yucca-stream-multistream-value">\n' +
    '    <header class="yucca-stream-multistream-value-header">\n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-multistream-value-content">\n' +
    '        <section class="yucca-stream-multistream-value-data">\n' +
    '           <table class="yucca-stream-multistream-value-table">\n'+
    '               <tbody ng-repeat="stream in streams track by $index" >\n' +
    '                   <tr>\n' +
    '                     <td class="yucca-stream-multistream-value-stream-row" colspan="100%">\n'+
    '                         <span class="yucca-stream-multistream-value-component">{{stream.name}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '                   <tr ng-repeat="component in stream.components track by $index">\n' +
    '                     <td class="yucca-stream-multistream-value-component-name"><span title="Phenomenon: {{component.phenomenon}}">{{component.label}}</span></td>\n' +
    '                     <td class="yucca-stream-multistream-value-component-bullet"><span class="yucca-stream-multistream-value-bullet bullet-{{component.bulletLevel}}" title="{{component.bulletsLevel}}"></span></td>\n' +
    '                     <td class="yucca-stream-multistream-value-component-value" title="Updated at: {{component.lastUpdate|date:\'MM/dd/yyyy  H:mm\'}}"><span>{{component.lastValue}}</span> <span class="yucca-stream-multistream-component-measureunit">{{component.measureunit}}</span> </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-multistream-value-lastupdate-bar">\n' +
    '            Updated at: {{lastupdate|date:"MM/dd/yyyy  H:mm"}}\n' + 
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

