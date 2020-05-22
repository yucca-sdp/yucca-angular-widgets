/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetForcedirectedChart', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'AE',
        scope: {},
        templateUrl:'template/forcedirected_chart.html',
        link: function(scope, elem, attr) {
        	
        	scope.debug = attr.debug==="true"?true:false;
        	var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
            var filter  = attr.filter;
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, "Force Directed");
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
            var chartTitle = $yuccaHelpers.attrs.safe(attr.chartTitle, attr.datasetCode);
            scope.chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, 100, null, elem[0].offsetWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, elem[0].offsetHeight);

            var forcedirectedNodeColumns = scope.$eval(attr.nodeColumns);
            var forcedirectedNodeLabels = scope.$eval(attr.nodeLabels);
            if(typeof forcedirectedNodeLabels == 'undefined' )
            	forcedirectedNodeLabels = forcedirectedNodeColumns;
            var forcedirectedNodeTypeColumn = $yuccaHelpers.attrs.safe(attr.nodeTypeColumn, null);
            var forcedirectedNodeRender = scope.$eval(attr.forcedirectedNodeRender);
            
            

            var baseColor = $yuccaHelpers.attrs.safe(attr.baseColor, null);

            scope.nodeIcon = $yuccaHelpers.attrs.safe(attr.nodeIcon, null);
            scope.linkLine = $yuccaHelpers.attrs.safe(attr.linkLine, null);

            scope.linkLength = $yuccaHelpers.attrs.safe(attr.linkLength, null);
            scope.nodeSize = $yuccaHelpers.attrs.safe(attr.nodeSize, null);
            scope.nodeTypeIcon = $yuccaHelpers.attrs.safe(attr.nodeTypeIcon, null);
            console.log("scope.nodeTypeIcon",scope.nodeTypeIcon);
            scope.computeStatistic = $yuccaHelpers.attrs.safe(attr.computeStatistic, false);

            
        	console.log("forcedirectedNodeColumns - data",forcedirectedNodeColumns);
            var forcedirectedNodesParam = scope.$eval(attr.forcedirectedNodes);
            var forcedirectedLinksParam = scope.$eval(attr.forcedirectedLinks);


        	scope.forcedirectedLinks =  [];
        	var forcedirectedLinks = {};
            
        	var compactDataForForcedirected = function(data){
            	console.log("forcedirectedNodeColumns",forcedirectedNodeColumns);
            	for(var i=0; i<data.data.length; i++){
            		for(var j=0; j<forcedirectedNodeColumns.length; j++){
            			var group = forcedirectedNodeTypeColumn==null?"-":data.data[i][forcedirectedNodeTypeColumn];
            			createLink(j,data.data[i], group);
            		}
            	}
            	console.log("forcedirectedLinks",forcedirectedLinks);
            	for( var key in forcedirectedLinks ) {
            	    if (forcedirectedLinks.hasOwnProperty(key)){
            	    	scope.forcedirectedLinks.push(forcedirectedLinks[key]);
            	    }
            	}
            	
        	};
        	
        	var createLink = function(currentIndex, data, group){
        		for(var k=0; k<forcedirectedNodeColumns.length; k++){
        			if(k!=currentIndex){
		        		var key = data[forcedirectedNodeColumns[currentIndex]] + "_" + data[forcedirectedNodeColumns[k]] + "_" + group;
		    			
		        		if(typeof forcedirectedLinks[key] == 'undefined'){
		        			forcedirectedLinks[key]={
		        					"source": data[forcedirectedNodeColumns[currentIndex]], 
		        					"target": data[forcedirectedNodeColumns[k]], 
		        					"type": group, 
		        					"sourceType": forcedirectedNodeColumns[currentIndex], 
		        					"targetType": forcedirectedNodeColumns[k],
		        					//"sourceColumn": forcedirectedNodeColumns[currentIndex], 
		        					//"targetColumn": forcedirectedNodeColumns[k],
		        					"sourceLabel" : (typeof forcedirectedNodeLabels[currentIndex] == 'undefined'?forcedirectedNodeColumns[currentIndex]: forcedirectedNodeLabels[currentIndex]),
			            			"targetLabel" : (typeof forcedirectedNodeLabels[k] == 'undefined'?forcedirectedNodeColumns[k]: forcedirectedNodeLabels[k]),
			            			"count": 1
		        							
		        			};
		        		}
		        		else
		        			forcedirectedLinks[key].count++;
        			}
        		}
        	};
        	
        	//{source:"Hulk", sourceType: "Character",target:"The Incredible Hulk", targetType: "Movie",type:"Main"}
        	
            if(typeof forcedirectedNodesParam == 'undefined' || forcedirectedNodesParam == null || forcedirectedNodesParam =="" ||
            	typeof forcedirectedLinksParam == 'undefined' || forcedirectedLinksParam == null || forcedirectedLinksParam =="" ){
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
	    				compactDataForForcedirected({"total":total,"data":data});
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
            	scope.forcedirectedData ={"nodes":forcedirectedNodesParam, "links": forcedirectedLinksParam};
            }

            var color = d3.scale.category20()

            console.log("attrs", attr);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/forcedirected_chart.html",
    '<div class="yucca-widget yucca-dataset-forcedirected">\n' +
    '    <header class="yucca-dataset-forcedirected-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-forcedirected-content">\n' +
    '        <section class="yucca-dataset-forcedirected-chart">\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-forcedirected-loading" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px" ><p>Loading&hellip;</p>\n' +
    '             <div class="yucca-widget-spinner"> <div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-show="chartMessage != null" class="yucca-dataset-forcedirected-chart-message" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px">Loading&hellip;</div>\n' +
    '        	<forcedirected-chart ng-if="!isLoading &&  chartMessage == null &&  forcedirectedLinks.length>0" links="forcedirectedLinks" link_length={{linkLength}}  node_size={{nodeSize}} '+
    '                width="{{chartWidth}}" height="{{chartHeight}}" node_icon="{{nodeIcon}}" link_line="{{linkLine}}" compute_statistic="{{computeStatistic}}" node_type_icon="{{nodeTypeIcon}}"></forcedirected-chart>\n' +
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



