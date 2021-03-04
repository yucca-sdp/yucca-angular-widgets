/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetDrilldowndataexplorerChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_drilldowndataexplorer_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetDrilldowndataexplorerChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth-24);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");

            scope.treeColumns = scope.$eval(attr.treeColumns);
            if(typeof scope.treeColumns != 'Array' )
        		scope.debugMessages.push("Invalid tree columns");
            
            var valueColumns = scope.$eval(attr.valueColumns);
            scope.valueColumns = valueColumns;
            
            var valueColumn = $yuccaHelpers.attrs.safe(attr.valueColumn, null);
            if(valueColumn==null &&  countingMode=='sum')
        		scope.debugMessages.push("To sum value you must enter a valid valueColum");

        	var filterMap = {};
        	
        	scope.$on('yucca-drilldowndataexplorer-event', function(e, event) {  
 		       console.log("yucca-drilldowndataexplorer-event fuori", event);  
 		       if(event.sourceId == scope.widgetId){
 		    	  event.data.datasetcode = datasetcode;
 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
 			      event.eventControlId = eventControlId;
 	        	  console.log("event",event);
 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
 		       }
        	});
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("treeee yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
		    	   if(!event.data.datasetcode || event.data.datasetcode == datasetcode){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data.value;
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
		    			   scope.path = event.data.path; //
			    		   var path = event.data.path;
								 $rootScope.$broadcast ('yucca-widget-event-'+scope.widgetId, {"type":"browse", "path":path, "eventControlId":eventControlId});
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
       		
       		scope.path = [rootLabel]; 
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null,apiDataUrl,cache).then(function(firstData){
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
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData,apiDataUrl,cache).then( function(result) {
		                console.info("drilldowndataexplorerchart:loadData", result);
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
	    			//scope.drilldowndataexplorerData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, scope.treeColumns, valueColumn, countingMode);	
	    			scope.drilldowndataexplorerData = $yuccaHelpers.data.aggregationTreeDrill(rootLabel, allData, scope.treeColumns, valueColumns);
	    			scope.drilldowndataexplorerData = $yuccaHelpers.data.recursiveTree(scope.drilldowndataexplorerData,scope.treeColumns,valueColumns,scope.treeColumns.length);
	    			var tableData = new Array();
	    			for(var i = 0; i<scope.drilldowndataexplorerData.children.length;i++) {
	    				tableData.push(scope.drilldowndataexplorerData.children[i]);
	    			}
	    			scope.tableData = tableData;
	    			console.log("tree fuori", scope.drilldowndataexplorerData);

	    			  
	    			var colors = $yuccaHelpers.render.safeColors(scope.drilldowndataexplorerData.children.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			for (var i = 0; i < scope.drilldowndataexplorerData.children.length; i++) {
	    				scope.drilldowndataexplorerData.children[i].color = colors[i];
					}
	    			
	    	        console.log("chartData",scope.drilldowndataexplorerData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	var browseData = function(){
           		if(scope.drilldowndataexplorerData && scope.drilldowndataexplorerData!=null){
    				var childrens=scope.drilldowndataexplorerData.children;
    				for (var p = 0; p < scope.path.length; p++) {
						if(childrens){
							for (var c = 0; c < childrens.length; c++) {
								if(childrens[c].name==scope.path[p] && childrens[c].children){
									childrens = childrens[c].children;
								}
							}
						}
					}
    				console.log("childrens", childrens);
    				/*for (var c = 0; c < childrens.length; c++) {
    					childrens[c].total = sumChildresValue(childrens[c].name, childrens[c]);
    				}*/
    				console.log("childrens", childrens);
    			}	
    			
    			scope.tableData = new Array();
    			for (var c = 0; c < childrens.length; c++) {
    				//childrens[c].total = $yuccaHelpers.render.safeNumber(childrens[c].total, decimalValue, scope.isEuroValue(),formatBigNumber);
					scope.tableData.push(childrens[c]);
				}
    			

    			
    			console.log("navigable tableData", scope.tableData);           	
    		};
        	
        	scope.drillUp = function(){
    			if(scope.path.length>1){
    				scope.path.pop();
    				browseData();
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.browse",  {"path":scope.path});
					event.eventControlId = eventControlId;
		        	$rootScope.$broadcast ('yucca-widget-event', event);
    			}
    		}
        	
        	scope.drillDown = function(key){
				scope.path.push(key);
				browseData();
				var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.browse",  {"path":scope.path});
				event.eventControlId = eventControlId;
	        	$rootScope.$broadcast ('yucca-widget-event', event);
    		}
        	
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
	/*$templateCache.put("template/dataset_treemap_chart.html",
		    '<div class="yucca-dataset-drilldowndataexplorer-chart" id="{{widgetId}}">\n' +
		    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
		    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
		    '    <div class="yucca-dataset-drilldowndataexplorer-chart-content">\n' +
		    '        <section>\n' +
		    '           <div ng-if="isLoading" class="yucca-dataset-drilldowndataexplorer-chart-loading" >\n' +
		    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
		    '           </div>\n' +
		    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
		    '             <p>{{infoMessage}}</p>\n' +
		    '           </div>\n' +
		    '        	<div ng-if="!isLoading" class="yucca-dataset-drilldowndataexplorer-chart-chart" >\n' +
		    '        		<div><treemap-chart data="treemapData" show_legend_="false" width="{{chartWidth}}" height="{{chartHeight}}" widgetId="{{widgetId}}"></treemap-chart>\n' +

		    '				</div>\n' +
		    '       	</div>\n' +
		    '        </section>\n' +
		    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
		    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
		    '        </section>\n' +
		    '    </div>\n' +
		    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
		    '</div>\n'
		    );*/
  /*$templateCache.put("template/dataset_drilldowndataexplorer_chart.html",
    '<div class="yucca-widget yucca-dataset-drilldowndataexplorer-chart" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-drilldowndataexplorer-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-drilldowndataexplorer-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-drilldowndataexplorer-chart-chart" >\n' +
    '        		<div>{{drilldowndataexplorerData}} </div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );*/
	
	$templateCache.put("template/dataset_drilldowndataexplorer_chart.html",
		    '<div class="yucca-widget yucca-dataset-drilldowndataexplorer-chart" id="{{widgetId}}">\n' +
		    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
		    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
		    '    <div class="yucca-dataset-drilldowndataexplorer-chart-content">\n' +
		    '        <section>\n' +
		    '         <div ng-if="isLoading" class="yucca-dataset-drilldowndataexplorer-chart-loading" >\n' +
		    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
		    '         </div>\n' +
		    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
		    '             <p>{{infoMessage}}</p>\n' +
		    '           </div>\n' +
		    '           <div class="yucca-dataset-dataexplorer-breadcrumbs" >' +
		    '              <span class="yucca-dataset-dataexplorer-breadcrumbs-item" ng-repeat="p in path track by $index">'+
		    '                 <span ng-if="!$last">{{p}} {{$last ? "": "&rarr;"}} </span><a ng-click="drillUp()" href ng-if="$last">{{p}}</a>'+
		    '              </span>'+
		    '           </div>\n' +
		    '			<table ng-if="!isLoading"  class="yucca-dataset-dataexplorer-table" ng-if="!isLoading">\n'+
		    '             <tbody>\n' +
		    '                   <th ng-repeat="element in treeColumns " class="yucca-dataset-dataexplorer-key-column">{{element}} </th>' +
		    '                   <th ng-repeat="valueElement in valueColumns " class="yucca-dataset-dataexplorer-value-column">{{valueElement.key}} </th>' +			    
		    '                 <tr ng-repeat="row in tableData " class="yucca-dataset-dataexplorer-table-row" style="{{row.highlight}}">\n' +
//		    '                   <td class="yucca-dataset-dataexplorer-key-column"><a href ng-click="drillDown(row.name)" ng-if="row.children">{{row.name}}</a><span ng-if="row.value">{{row.name}}</span></td>'+
		    '                   <td ng-repeat="element in treeColumns " class="yucca-dataset-dataexplorer-key-column"><a href ng-click="drillDown(row.name)" ng-if="row.children">{{row[element].substr(0,20)}} </a><span ng-if="row.children == null">{{row[element].substr(0,20)}} </span></td>' +
		    '                   <td ng-repeat="valueElement in valueColumns " class="yucca-dataset-dataexplorer-value-column"><a href ng-click="drillDown(row.name)" ng-if="row.children">{{row[valueElement.key]}} </a><span ng-if="row.children == null">{{row[valueElement.key]}} </span></td>' +		    
		    '                 </tr>\n' + 
		    '             </tbody>\n' +
		    '         </table>\n' +
		    '        </section>\n' +
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

