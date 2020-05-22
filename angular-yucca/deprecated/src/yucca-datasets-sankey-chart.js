/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetSankeyChart', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'AE',
        scope: {},
        templateUrl:'template/dataset_sankey_chart.html',
        link: function(scope, elem, attr) {
        	
        	scope.debug = attr.debug==="true"?true:false;
        	var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
            var filter  = attr.filter;
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, "Sankey");
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
            var chartTitle = $yuccaHelpers.attrs.safe(attr.chartTitle, attr.datasetCode);
            scope.chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, 100, null, elem[0].offsetWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, elem[0].offsetHeight);

            var sankeyNodeColumns = scope.$eval(attr.nodeColumns);
            var sankeyNodeRender = scope.$eval(attr.sankeyNodeRender);
            var baseColor = $yuccaHelpers.attrs.safe(attr.baseColor, null);

        	console.log("sankeyNodeColumns - data",sankeyNodeColumns);
            var sankeyNodesParam = scope.$eval(attr.sankeyNodes);
            var sankeyLinksParam = scope.$eval(attr.sankeyLinks);

            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var valueColumn = $yuccaHelpers.attrs.safe(attr.valueColumn, null);
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };

        	scope.sankeyData ={"nodes":[], "links": []};
            
            var compactDataForSankey = function(data){
            	console.debug("compactDataForSankey - data",data);
            	var uniqueNode = {};
            	var sankeyNodes = [];
            	var sankeyMatrix = [];
            	var sankeyLinks = [];
            	var sankeyLinksDictionary = [];
            	var nodeIndex = 0;
            	for(var i=0; i<data.data.length; i++){
            		for(var j=0; j<sankeyNodeColumns.length; j++){
            			if(typeof(sankeyMatrix[sankeyNodeColumns[j]]) == "undefined")
            				sankeyMatrix[sankeyNodeColumns[j]] = [];
	            		if( typeof(uniqueNode[sankeyNodeColumns[j] +"_"+data.data[i][sankeyNodeColumns[j]]]) == "undefined"){
	            			var node = {"name": ""+data.data[i][sankeyNodeColumns[j]], "index": nodeIndex, "label": ""+data.data[i][sankeyNodeColumns[j]], "color": baseColor,"fades":true};
	            			if(typeof sankeyNodeRender!= 'undefined' && typeof sankeyNodeRender[sankeyNodeColumns[j]+"_"+node.name] != 'undefined'){
	            				var render = sankeyNodeRender[sankeyNodeColumns[j]+"_"+node.name];
	            				if(typeof render.label!=undefined)
	            					node.label = render.label;
	            				if(typeof render.color!=undefined)
	            					node.color = render.color;
	            				if(render.fades=="true")
	            					node.fades = true;
	            				else
	            					node.fades = false;
	            			}
	            			sankeyNodes.push(node);
	            			sankeyMatrix[sankeyNodeColumns[j]].push({"node":data.data[i][sankeyNodeColumns[j]],"index": nodeIndex});
	            			nodeIndex++;
	            		}
	            		uniqueNode[sankeyNodeColumns[j] +"_"+data.data[i][sankeyNodeColumns[j]]] = 0;
            		}
            	}
            	console.debug("sankeyNodes", sankeyNodes);
            	console.debug("sankeyMatrix", sankeyMatrix);
            	
              	for(var i=0; i<data.data.length; i++){
            		for(var j=0; j<sankeyNodeColumns.length; j++){
            			if(j<sankeyNodeColumns.length-1){
            				var key= sankeyNodeColumns[j];
	            			for(var k=0; k<sankeyMatrix[key].length; k++){
	            				var source = sankeyMatrix[key][k];
	    						for(var m=0; m<sankeyMatrix[sankeyNodeColumns[j+1]].length; m++){
	    							var target = sankeyMatrix[sankeyNodeColumns[j+1]][m];
	    							if(typeof(sankeyLinksDictionary[key+"|"+source.node+"|"+target.node]) == "undefined")
	    	            				sankeyLinksDictionary[key+"|"+source.node+"|"+target.node] = {"source": source.index, "target":target.index, "value": 0};
	    							if(data.data[i][sankeyNodeColumns[j]] == source.node && data.data[i][sankeyNodeColumns[j+1]]  == target.node){
	    								var add = countingMode=='sum'?parseFloat(data.data[i][valueColumn]):1;
	    								sankeyLinksDictionary[key+"|"+source.node+"|"+target.node].value += add;
	    							}
	    						}
	            			}
            						
            			}
            					
            		}
            				
            	}
              	
              	

       		
            	
            	console.debug("sankeyLinksDictionary", sankeyLinksDictionary);
                for(var key in sankeyLinksDictionary){
                	if(sankeyLinksDictionary[key].value!=0)
                		sankeyLinks.push(sankeyLinksDictionary[key]);
                }
                
            	scope.sankeyData ={"nodes":sankeyNodes, "links": sankeyLinks};
            	
            	console.debug("sankeyData", scope.sankeyData);

            };
            if(typeof sankeyNodesParam == 'undefined' || sankeyNodesParam == null || sankeyNodesParam =="" ||
            	typeof sankeyLinksParam == 'undefined' || sankeyLinksParam == null || sankeyLinksParam =="" ){
    			scope.isLoading = true;

	    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).success(function(firstData){
	    			var maxData = firstData.d.__count>10000?10000:firstData.d.__count;
	    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,  null /*'internalId%20desc'*/, maxData).then( function(result) {
	    				var data = [];
	    				var total = 0;
	    				for(var i=0; i<result.length; i++){
	    					total = result[i].data.d.__count;
	    					for(var j=0; j<result[i].data.d.results.length; j++){
	    						data.push(result[i].data.d.results[j]);
	    					}
	    				}
	    				compactDataForSankey({"total":total,"data":data});
	    				scope.isLoading = false;

	
	    			},function(result) {
	    				console.log("getMultipleDataEnties error", data);
	    				scope.isLoading = false;
	    			});
	    		}).error(function(data){
	    			console.log("getDataEntities error", data);
    				scope.isLoading = false;
	    		});
            }
            else{
            	scope.sankeyData ={"nodes":sankeyNodesParam, "links": sankeyLinksParam};
            }

            
            console.log("attrs", attr);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_sankey_chart.html",
    '<div class="yucca-widget yucca-dataset-sankey">\n' +
    '    <header class="yucca-dataset-sankey-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-sankey-content">\n' +
    '        <section class="yucca-dataset-sankey-chart">\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-sankey-loading" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px" ><p>Loading&hellip;</p>\n' +
    '             <div class="yucca-widget-spinner"> <div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-show="chartMessage != null" class="yucca-dataset-sankey-chart-message" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px">Loading&hellip;</div>\n' +
    '        	<sankey-chart ng-show="!isLoading &&  chartMessage == null "data="sankeyData" width="{{chartWidth}}" height="{{chartHeight}}"></sankey-chart>\n' +
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

