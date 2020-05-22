/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMultistreamMap', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_multistream_map.html',
        link: function(scope, elem, attr) {
        	
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'map');
        	scope.debugMessages = [];
            
            //[{stream:"", components: [{component:"",min:"",max:""}];
        	var streamsAttr = scope.$eval(attr.streams);
        	scope.streams  ={};
        	
        	var tenant_code = attr.tenantCode;
        	var domain = attr.domain;
        	var search_query = attr.searchQuery;
        	var opendata = null;
        	console.log("attr.opendata",attr.opendata);
        	if(typeof attr.opendata != 'undefined')
        		opendata = attr.opendata==="true"?true:false;

        	if(typeof streamsAttr!=undefined && streamsAttr!=null && streamsAttr.length >0){
        		//stream
        	}
        	else{
        		metadataService.findMetadata(tenant_code, domain, search_query, opendata, user_token).success(function (metadataList){
        			console.log("metadataList",metadataList);
        		}).error(function(){
					scope.debugMessages.push("No data found: tenant=" + tenant_code +", domain=" + domain + ", search_query="+ search_query + ", opendata="+opendata);
				});
        		
        	}

            console.debug("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_multistream_map.html",
    '<div class="yucca-widget yucca-stream-multistream-map">\n' +
    '    <header class="yucca-stream-multistream-map-header">\n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-multistream-map-content">\n' +
    '        <section class="yucca-stream-multistream-map-data">\n' +
    '           <table class="yucca-stream-multistream-map-table">\n'+
    '               <tbody ng-repeat="stream in streams track by $index" >\n' +
    '                   <tr>\n' +
    '                     <td class="yucca-stream-multistream-map-stream-row" colspan="100%">\n'+
    '                         <span class="yucca-stream-multistream-map-component">{{stream.name}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '                   <tr ng-repeat="component in stream.components track by $index">\n' +
    '                     <td class="yucca-stream-multistream-map-component-name"><span title="Phenomenon: {{component.phenomenon}}">{{component.name}}</span></td>\n' +
    '                     <td class="yucca-stream-multistream-map-component-bullet"><span class="yucca-stream-multistream-map-bullet bullet-{{component.bulletLevel}}" title="{{component.bulletsLevel}}"></span></td>\n' +
    '                     <td class="yucca-stream-multistream-map-component-value" title="Updated at: {{component.lastUpdate|date:\'MM/dd/yyyy  H:mm\'}}"><span>{{component.lastValue}}</span> <span class="yucca-stream-multistream-component-measureunit">{{component.measureunit}}</span> </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-multistream-map-lastupdate-bar">\n' +
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

