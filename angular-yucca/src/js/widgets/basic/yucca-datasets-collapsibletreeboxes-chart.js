/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetCollapsibletreeboxesChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_collapsibletreeboxes_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetCollapsibletreeChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

            scope.widgetTitle=  $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetSubtitle=  $yuccaHelpers.attrs.safe(attr.widgetSubtitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.usertoken;
            var filter  = attr.filter;
            var orderby = attr.orderby;

            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");
            
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };

            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");
            scope.rowDepth =  $yuccaHelpers.attrs.safe(attr.rowDepth, 120);
            scope.boxShadow = $yuccaHelpers.attrs.safe(attr.boxShadow, false);
            scope.hideValues = $yuccaHelpers.attrs.safe(attr.hideValues, false);
            scope.boxRadius = $yuccaHelpers.attrs.safe(attr.boxRadius, 6);


            var treeColumns = scope.$eval(attr.treeColumns);
//            if(typeof treeColumns != 'Array' )
//        		scope.debugMessages.push("Invalid tree columns");
            
            var valueColumn =scope.$eval(attr.valueColumn);
//            if(valueColumn==null &&  countingMode=='sum')
//        		scope.debugMessages.push("To sum value you must enter a valid valueColum");
            
            scope.hideValues = $yuccaHelpers.attrs.safe(attr.hideValues, false);

            
            
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};
        	
        	scope.$on('yucca-collapsibletree-event', function(e, event) {  
 		       console.log("yucca-collapsibletree-event fuori", event);  
 		       if(event.sourceId == scope.widgetId){
 		    	  event.data.datasetcode = datasetcode;
 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
				  event.eventControlId = eventControlId;
 	        	  console.log("event",event);
 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
 		       }
        	});
        	
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
	 		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
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
		    		   else if(event.data.datasetcode == datasetcode && event.eventtype == "dataset.browse"){
			    		   var path = event.data.path;
								 $rootScope.$broadcast ('yucca-widget-event-'+scope.widgetId, {"type":"browse", "path":path,"eventControlId":eventControlId});
								 }
		    	   }

		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
        			console.log("loadData", firstData);
	    			var maxData = firstData.data.d.__count>10000?10000:firstData.data.d.__count;
	    			if(maxData>0){
	    				var d = firstData.data.d.results[0];
	    				for (var k in d) {
	    				    if (d.hasOwnProperty(k) && k!='__metadata'){
	    				    	columnDataTypeMap[k] = typeof d[k];
	    				    } 
	    				}
	    				console.log("columnDataTypeMap ", columnDataTypeMap);
	    			}
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData).then( function(result) {
		                console.info("collapsibletreechart:loadData", result);
		                odataResult = result;
		                prepareData();
	                }, function(result){
		    			scope.isLoading = false;
		    			console.error("Load data error",result);
		    			scope.debugMessages.push("Load data error " +result );
		    		});

	           },function(result){
	   				scope.isLoading = false;
	   				console.error("Load data error",result);
	   				scope.debugMessages.push("Load data error " +result );
	           });
        		
        		
        	};
        	
        	var prepareData  = function(){
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			var valueFormat = {decimalValue: decimalValue, isEuro: scope.isEuroValue(), formatBigNumber: formatBigNumber};

	    			scope.collapsibletreeData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, treeColumns, valueColumn, null, valueFormat);
	    			console.log("tree fuori", scope.collapsibletreeData);

	    			  
	    			var colors = $yuccaHelpers.render.safeColors(scope.collapsibletreeData.children.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			for (var i = 0; i < scope.collapsibletreeData.children.length; i++) {
	    				addColorToChildren(scope.collapsibletreeData.children[i],colors[i]);
	    				//scope.collapsibletreeData.children[i].color = colors[i];
					}
	    			
	    	        console.log("chartData",scope.collapsibletreeData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	var addColorToChildren = function(node, color){
        		node.color = color;
        		if(node.children && node.children.length>0)
        			for (var i = 0; i < node.children.length; i++) {
        				addColorToChildren(node.children[i], color);
					}
        	};
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_collapsibletreeboxes_chart.html",
    '<div class="yucca-widget yucca-dataset-collapsibletree-chart" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-collapsibletree-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-collapsibletree-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-collapsibletree-chart-chart" >\n' +
    '        		<div ><collapsible-tree-boxes data="collapsibletreeData" columns="treeColumns" hide_values ="{{hideValues}}" box_radius="{{boxRadius}}"'+
    '					width="{{chartWidth}}" height="{{chartHeight}}" widget_id="{{widgetId}}" row_depth="{{rowDepth}}" box_shadow="boxShadow"></collapsible-tree-boxes></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);

