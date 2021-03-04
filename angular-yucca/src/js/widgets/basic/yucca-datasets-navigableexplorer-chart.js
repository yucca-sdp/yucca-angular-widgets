/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetNavigableexplorerTable', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_navigableexplorer_table.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetNavigableexplorerTable';
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
            
            var euroValue2 = $yuccaHelpers.attrs.safe(attr.euroValue2, false);
            var decimalValue2 = $yuccaHelpers.attrs.safe(attr.decimalValue2, 2);
            var formatBigNumber2 = $yuccaHelpers.attrs.safe(attr.formatBigNumber2, false);
            scope.isEuroValue2 = function(){
            	return euroValue2 == "true";
            };
            
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
          
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "-");

            
            scope.treeColumns = scope.$eval(attr.treeColumns);
            if(typeof scope.treeColumns != 'Array' )
        		scope.debugMessages.push("Invalid tree columns");
            
            scope.valueColumn =scope.$eval(attr.valueColumn);
//            if(scope.valueColumn==null &&  countingMode=='sum')
//        		scope.debugMessages.push("To sum value you must enter a valid valueColum");
            scope.valueColumn2 =scope.$eval(attr.valueColumn2);

        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};
//        	scope.$on('yucca-treemap-event', function(e, event) {  
// 		       console.log("yucca-treemap-event fuori", event);  
// 		       if(event.sourceId == scope.widgetId){
// 		    	  event.data.datasetcode = datasetcode;
// 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
// 	        	  console.log("event",event);
// 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
// 		       }
//        	});
            
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       $timeout(function() {
			       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
		 		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	
			    		   if(event.eventtype == 'dataset.change.value_column'){
			    			   scope.valueColumn = event.data;
			    			   prepareData();
			    		   } 
			    		   else if(event.eventtype == 'dataset.browse'){
			    			   scope.path = event.data.path;
			    			   browseData();
			    		   }
			    		   else if(event.eventtype == 'dataset.filter.text'){
			    			   filterMap[event.sourceId] = event.data;
			    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
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
       		
       		scope.tableData = [];
       		var odataResult = null;
       		scope.totalResult = 0;
       		var columnDataTypeMap = {};

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
	    				scope.isLoading = false;
	    				console.info("navigableexplorer:loadData", result);
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


        	
        	scope.path = [rootLabel]; 
        	//scope.path = ['TO', '2009'];
        	var treeData = null;
           	var prepareData   = function(){
    			console.log("prepareData", odataResult);
    			scope.isLoading = true;
	    		if(odataResult != null){
	    			scope.tableHeader = new Array();
	    			//scope.tableHeader.push(groupByColumn,scope.valueColumn);

	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			//scope.tableData = {}
	    			//scope.tableData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, scope.treeColumns, scope.valueColumn, countingMode);

	    			
	    			treeData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, scope.treeColumns, scope.valueColumn, scope.valueColumn2);
	    			console.log("navigable explorer fuori", treeData);
	    			browseData(0);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
           	
        	var sumChildresValue = function(key, tree, valueIndex){
        		var total = 0;
        		if(tree.children){
	        		for (var i = 0; i < tree.children.length; i++) {
	        			if(tree.children[i].children){
	        				//	return sumChildresValue(tree.children[i].name, tree.children[i], valueIndex);
	        				total += sumChildresValue(tree.children[i].name, tree.children[i], valueIndex)
	        			}
						else{
							if(valueIndex == 2)
								total += tree.children[i].value2;
							else
								total += tree.children[i].value;
						}
	        		}
        		}
        		else{
					if(valueIndex == 2)
						total += tree.value2;
					else
						total += tree.value;
        			
        		}
        		return total;
        		
        	};
        	
           	var browseData = function(){
           		if(treeData && treeData!=null){
    				var childrens=treeData.children;
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
    				for (var c = 0; c < childrens.length; c++) {
    					childrens[c].total = sumChildresValue(childrens[c].name, childrens[c],1);
    					if(scope.valueColumn2)
    						childrens[c].total2 = sumChildresValue(childrens[c].name, childrens[c],2);
    				}
    				console.log("childrens", childrens);
    			}	
    			
    			scope.tableData = new Array();
    			for (var c = 0; c < childrens.length; c++) {
    				childrens[c].total = $yuccaHelpers.render.safeNumber(childrens[c].total, decimalValue, scope.isEuroValue(),formatBigNumber);
    				if(childrens[c].total2)
    					childrens[c].total2 = $yuccaHelpers.render.safeNumber(childrens[c].total2, decimalValue2, scope.isEuroValue2(),formatBigNumber2);
					scope.tableData.push(childrens[c]);
				}
    			

    			
    			console.log("navigable tableData", scope.tableData);           	
    		};
           	
    		scope.drillUp = function(){
    			if(scope.path.length>1){
    				scope.path.pop();
    				browseData();
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.browse", {"path":scope.path, "datasetcode":datasetcode});
					event.eventControlId = eventControlId;
		        	$rootScope.$broadcast ('yucca-widget-event', event);
    			}
    		}

    		scope.drillDown = function(key){
				scope.path.push(key);
				browseData();
				var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.browse", {"path":scope.path, "datasetcode":datasetcode});
				event.eventControlId = eventControlId;
	        	$rootScope.$broadcast ('yucca-widget-event', event);
    		}
    		
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_navigableexplorer_table.html",
    '<div class="yucca-widget yucca-dataset-dataexplorer" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-dataexplorer-content">\n' +
    '        <section>\n' +
    '         <div ng-if="isLoading" class="yucca-dataset-dataexplorer-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' + 
    '           <div class="yucca-dataset-dataexplorer-breadcrumbs" >' +
    '              <span class="yucca-dataset-dataexplorer-breadcrumbs-item" ng-repeat="p in path track by $index">'+
    '                 <span ng-if="!$last">{{p}} {{$last ? "": "&rarr;"}} </span><a ng-click="drillUp()" href ng-if="$last">{{p}}</a>'+
    '              </span>'+
    '           </div>\n' +
//    '           <div class="yucca-dataset-dataexplorer-breadcrumbs" > <br><br>' +
//    '              <span class="yucca-dataset-dataexplorer-breadcrumbs-item" ng-repeat="p in path track by $index">'+
//    '                 <a ng-click="drillUp()" href>{{p}}</a><span >&rarr;</span>'+
//    '              </span>'+
//    '              <span> {{treeColumns[path.length].label}}</span>'+
//    '           </div>\n' +
    '			<table ng-if="!isLoading"  class="yucca-dataset-dataexplorer-table" ng-if="!isLoading">\n'+
    '			  <thead><tr><th>{{treeColumns[path.length-1].label}}</th><th>{{valueColumn.label}}</th><th ng-if="valueColumn2">{{valueColumn2.label}}</th></tr></thead>' + 
    '             <tbody>\n' +
    '                 <tr ng-repeat="row in tableData " class="yucca-dataset-dataexplorer-table-row" style="{{row.highlight}}">\n' +
    '                   <td class="yucca-dataset-dataexplorer-key-column"><a href ng-click="drillDown(row.name)" ng-if="row.children">{{row.name}}</a><span ng-if="row.value">{{row.name}}</span></td>'+
    '                   <td class="yucca-dataset-dataexplorer-value-column">{{row.total}}</td>' +
    '                   <td class="yucca-dataset-dataexplorer-value-column2" ng-if="valueColumn2">{{row.total2}}</td>' +
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

