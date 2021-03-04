/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDistributionTable', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/distribution_table.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDistributionTable';
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
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");
            
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            scope.decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            scope.formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.sliceColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

//            scope.chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, 100, null, elem[0].offsetWidth);
//            scope.chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 300, null, elem[0].offsetHeight);
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            
//            var maxRow = attr.maxRow;
            
//            scope.pagination = {current:1};
//            scope.pagination.pagesize = $yuccaHelpers.attrs.safe(attr.pageSize,10);
    		
      
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);

        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		   if(event.eventtype == 'dataset.change.group_by_column'){
	    			   groupByColumn = event.data;
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   prepareData();
	    			   
	    		   }
	    		   else if(event.eventtype == 'dataset.change.value_column'){
	    			   valueColumn.key = event.data.key;
	    			   valueColumn.label = event.data.label;
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   prepareData();
	    		   }
	    		   else if(event.eventtype == 'dataset.filter.text'){
	    			   filterMap[event.sourceId] = event.data;
	    			   filter = $yuccaHelpers.event.updateTextFilter(attr.Filter, filterMap, columnDataTypeMap);
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
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
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   loadData();
	    		   }
	    		   else if(event.eventtype == 'dataset.highlight.group_by_column'){
	    			   if(scope.tableData && scope.tableData[0] && scope.tableData[0].values){
	    				   for(var i=0; i<scope.tableData[0].values.length;i++){
	    					   if(scope.tableData[0].values[i].key == event.data.key){
	    						   console.log("trovato", scope.tableData[0].values[i]);
		    					   scope.tableData[0].values[i].highlight =  "color: " + event.data.color  + 
		    					   "; font-weight: bold; background-color: " + $yuccaHelpers.render.hex2RgbaColor( event.data.color, 10);
		    					   scope.$apply();
		    					   break;
	    					   }
	    					   
	    				   }
	    			   }
	    		   }
	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
	    			   if(scope.tableData && scope.tableData[0] && scope.tableData[0].values){
	    				   for(var i=0; i<scope.tableData[0].values.length;i++){
	    					   if(scope.tableData[0].values[i].key == event.data.key){
	    						   delete scope.tableData[0].values[i].highlight;
		    					   scope.$apply();
		    					   break;
	    					   }
	    					   
	    				   }
	    			   }
	    			   if(scope.tableData && scope.tableData[0][event.data.key])
	    				   scope.tableData[event.data.key].highlight =  null;
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
       		
       		scope.tableData = [];
       		var odataResult = null;
       		var columnDataTypeMap = {};
       		scope.totalResult = 0;
        	var loadData = function(){
        		scope.tableData = [];
    			scope.isLoading = true;
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
		                console.info("discretebarchart:loadData", result);
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
    			console.log("prepareData", odataResult);
    			scope.isLoading = true;
	    		if(odataResult != null){
	    			scope.tableHeader = new Array();
	    			scope.tableHeader.push(groupByColumn,valueColumn);

	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			scope.tableData = {}
	    			//var tableData = $yuccaHelpers.data.aggregationKeyValue(allData, valueColumn, groupByColumn.key, countingMode, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			scope.tableData =  $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, chartColors,attr.mainChartColor);
//	    			if(tableData && tableData!=null){
//	    				for (var i = 0; i < tableData.length; i++) {
//	    					scope.tableData[tableData[i].key] = tableData[i];
//						}
//	    			}
	    			console.log("distribution tableData", scope.tableData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	var loadDataGrouped = function(){
    			scope.isLoading = true;
           		odataResult = null;
           		var group_by=groupByColumn.key;
           		var group_operators= valueColumn.countingMode + "," + valueColumn.key;
        		dataService.getDataEntitiesStats(attr.datasetcode,user_token, group_by,group_operators,filter,  0, 1000, null,apiDataUrl,cache).then(function(result){
        			console.log("loadDataGrouped", result);
		            
		                if(result != null){
			    			scope.isLoading = true;
			    			var valueColumn4GroupBy = {"key":valueColumn.key + '_sts', "label":valueColumn.label, "countingMode":valueColumn.countingMode};
			    			scope.tableData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
			    			console.log("discrete chartData",scope.chartData);
			    			scope.isLoading = false;
		                }
	                },function(result){
		   				scope.isLoading = false;
		   				console.error("loadDataGrouped error",result);
		   				scope.debugMessages.push("Load data error " +result );
	                }
	            );        		
        	};
        	if(groupedQuery)
        		loadDataGrouped();
        	else
        		loadData();
            console.log("attrs", attr);


        }

    };
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/distribution_table.html",
    '<div class="yucca-widget yucca-distribution-table" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-table-content">\n' +
    '        <section>\n' +
    '         <div ng-if="isLoading" class="yucca-distribution-table-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}} </p>\n' +
    '           </div>\n' +
    '			<table ng-if="!isLoading"  class="yucca-widget-table" ng-if="!isLoading">\n'+
    '             <thead >\n' +
    '                <tr>\n'+
    '                    <th ng-repeat="col in tableHeader track by $index"> {{col.label}}</th>\n' +
    '                </tr>\n' +	
    '             </thead>\n' +
    '             <tbody>\n' +
    '                 <tr ng-repeat="row in tableData[0].values " class="yucca-distribution-table-table-row" style="{{row.highlight}}">\n' +
    '                   <td>{{row.label}}</td>'+
    '                   <td>{{row.value|safeNumber:decimalValue:isEuroValue():formatBigNumber}}</td>' +
//    '                   <td ng-if="formatBigNumber">{{row.value|format_big_number}}</td>' +
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

