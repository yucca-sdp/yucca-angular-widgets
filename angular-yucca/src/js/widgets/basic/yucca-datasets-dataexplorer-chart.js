/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetDataexplorerTable', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_dataexplorer_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetDataExplorerdataexplorerChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());

            scope.widgetTitle=  $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetSubtitle=  $yuccaHelpers.attrs.safe(attr.widgetSubtitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.usertoken;
        	var apiDataUrl = attr.apiDataUrl;
        	var apiMetadataUrl = attr.apiMetadataUrl;
        	var cache = attr.cache==="true"?true:false;
            var filter  = attr.filter;
            var orderby = attr.orderby;

            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.skip, null, null, 1);
            var tenantcode = $yuccaHelpers.attrs.safe(attr.tenantcode, null);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");
//            
//            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
//            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
//            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
//            scope.isEuroValue = function(){
//            	return euroValue == "true";
//            };
//          
            var maxRow = attr.maxRow;
            var dataColumns = attr.dataexplorerColumns?scope.$eval(attr.dataexplorerColumns):null;
            var columnMap = {
            		'datasetVersion':{skip:{table:true, detail:true}},
            		'idDataset':{skip:{table:true, detail:true}},
            		'internalId':{skip:{table:true, detail:true}},
            		'__metadata':{skip:{table:true, detail:true}},
            };

            var showDetail = attr.showDetail==="true"?true:false;
            var  hellip = $yuccaHelpers.attrs.safe(attr.hellip, null);
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
	    				console.info("dataexplorer:loadData", result);
		                odataResult = result;
		                prepareTable();
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


            if(dataColumns!=null){
            	for (var i = 0; i < dataColumns.length; i++) {
            		if(dataColumns[i].skip && (!dataColumns[i].skip.table && !dataColumns[i].skip.detail))
            			dataColumns[i].skip = {table:true, detail:true};
            		else if(!dataColumns[i].skip)
            			dataColumns[i].skip = {table:false, detail:false};
            		
            		columnMap[dataColumns[i].name] = dataColumns[i];

				}
            	loadData();
            }
            else{
            	metadataService.getDatasetMetadata(tenantcode, datasetcode,user_token, apiMetadataUrl, cache).then(
            			function(metadata) {
            				console.log("metadata",metadata);
            				if(metadata && metadata.data && metadata.data.dataset){
            					for (var i = 0; i < metadata.data.dataset.columns.length; i++) {
            						columnMap[metadata.data.dataset.columns[i].name] = 
            						{name:metadata.data.dataset.columns[i].name,
            								label:metadata.data.dataset.columns[i].alias,
            								datatype: metadata.data.dataset.columns[i].datatype,
            								skip:{table:false, detail:false}, 
            						};
            					}
            					console.log("columnMap",columnMap)
            				}
            				loadData();
            					

            	}, function(error) {console.log("error",error);loadData();});
           }
            
            var filteredColumns = attr.filteredColumns?scope.$eval(attr.filteredColumns):null;
            scope.filtered = {};
            
            scope.pagination = {current:1};
            scope.pagination.pagesize = $yuccaHelpers.attrs.safe(attr.pageSize,10);

        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};

       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       $timeout(function() {
			       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
			    	   if(!event.data.datasetcode || event.data.datasetcode == datasetcode){
			    		   if(event.eventtype == 'dataset.filter.text'){
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
			    		   else if(event.eventtype == 'dataset.highlight.group_by_column'){
			    			   if(scope.tableData && event.data.groupByColumn && event.data.groupByColumn.key){
			    				   var columnIndex = -1;
			    				   for (var i = 0; i < scope.tableHeader.length; i++) {
			    					   if(event.data.groupByColumn.key == scope.tableHeader[i].key){
			    						   columnIndex = i;
			    						   break;
			    					   }
			    				   }
			    				   if(columnIndex>=0){
			    					   for (var i = 0; i < scope.tableData.data.length; i++) {
			    						   if(scope.tableData.data[i].cols[columnIndex] == event.data.key)
			    							   scope.tableData.data[i].highlight =  "color: " + event.data.color  + 
			    		    				   "; font-weight: bold; background-color: " + $yuccaHelpers.render.hex2RgbaColor( event.data.color, 10);
									
			    					   }
			    				   }
			    			   }
			    		   }
			    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
			    			   if(scope.tableData && event.data.groupByColumn && event.data.groupByColumn.key){
			    				   var columnIndex = -1;
			    				   for (var i = 0; i < scope.tableHeader.length; i++) {
			    					   if(event.data.groupByColumn.key == scope.tableHeader[i].key){
			    						   columnIndex = i;
			    						   break;
			    					   }
			    				   }
			    				   if(columnIndex>=0){
			    					   for (var i = 0; i < scope.tableData.data.length; i++) {
			    						   if(scope.tableData.data[i].cols[columnIndex] == event.data.key)
			    							   scope.tableData.data[i].highlight =  null;
									
			    					   }
			    				   }
			    			   }
			    		   }
				       }
			       }
		       });
		       
       		});
       		
        	
        	scope.numberOfPages = function(){
        		if(scope.tableData && scope.tableData.data)
        			return Math.ceil(scope.tableData.data.length/scope.pagination.pagesize);                
            }

        	
//         	var includeColumn = function(column){
//         		//console.log("filter",filteredColumns);
//           		var ret = true;
//           		if(column == 'datasetVersion' || column == 'idDataset' || column == 'internalId'  || column == '__metadata' )
//           			ret =  false;
//           		else if(filteredColumns!=null && filteredColumns.length>0){
//           			
//           			for (var i = 0; i < filteredColumns.length; i++) {
//           				//console.log("",filteredColumns[i], column);
//						if(filteredColumns[i].toUpperCase() == column.toUpperCase()){
//							console.log("exclude");
//							ret = false;
//							break;
//						}
//						
//					}
//           		}
//           		return ret;
//           	};
           	
//           	var prepareColumn = function(columnKey){
//           		var column = {"name": columnKey, "label": columnKey, "skip": false};
//           		if(columnKey == 'datasetVersion' || columnKey == 'idDataset' || columnKey == 'internalId'  || columnKey == '__metadata' )
//           			column.skip=true;
//           		else{
//           			if(columnMap[columnKey]){
//           				if(columnMap[columnKey].skip)
//           					column.skip = columnMap[columnKey].skip;
//           				if(columnMap[columnKey].label)
//           					column.label= columnMap[columnKey].label;
//           				if(columnMap[columnKey].euroValue)
//           					column.euroValue= columnMap[columnKey].euroValue;
//           				if(columnMap[columnKey].formatBigNumber)
//           					column.formatBigNumber= columnMap[columnKey].formatBigNumber;
//           				if(columnMap[columnKey].decimalValue)
//           					column.decimalValue= columnMap[columnKey].decimalValue;
//           			}
//           		}
//           		return column;
//           		
//           	};
           	var skipColumn = function(skip){
           		if(!skip || (!skip.table && !skip.detail))
           			return false;
           		else if((skip.table && skip.detail) || (!skip.table && !skip.detail))
           			return true;
           		else 
           			return false;
           	}
           	
           	scope.applyTableFilter = function(row){
           		//console.log("applyTableFilter", row, columnMap);
           		var result = true;
           		for (var i = 0; i < scope.tableFilter.length; i++) {
           			if(scope.tableFilter[i].value){
           				var keyword = new RegExp(scope.tableFilter[i].value, 'i');
           				result = result  && row && row.cols && row.cols[scope.tableFilter[i].key] && row.cols[scope.tableFilter[i].key].val && 
           				keyword.test(row.cols[scope.tableFilter[i].key].val);
           			}
				}
           		
           		return result;
           	}
           	
           	var prepareTable  = function(){
           		console.log("prepareTable - header", odataResult);
        		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			var dataMap = {};
	    			var filteredData  = new Array();
	    			scope.tableHeader = new Array();
	    			scope.tableFilter = new Array();
	    			scope.totalResult = odataResult[0].data.d.results.length;
	    			console.log("odataResult",odataResult);
		        	for (var r = 0; r < allData.length; r++) {
		        		var row = {"highlight":null, "cols":{}};
		        		for (var k in allData[r]) {
		        			if (allData[r].hasOwnProperty(k)) {
		        				var	column= columnMap[k];//prepareColumn(k);
//		        				if(!column)
//		        					column = {skip: {table:false, detail:false}};
		        				if(column && !skipColumn(column.skip)){
			        		    	if(r==0 && (!column.skip || !column.skip.table))
			        		    		scope.tableHeader.push({key:k, label: column.label});

			        		    	if(r==0 && (column.filter && column.filter.show))
			        		    		scope.tableFilter.push({key:k, label: column.filter.label?column.filter.label:column.label});

			        		    	
			        		    	row.cols[k] = {label:column.label, table: !column.skip.table, detail:!column.skip.detail};
			        		    	if(column.datatype == 'dateTime')
			        		    		row.cols[k].val = $yuccaHelpers.render.safeDate(allData[r][k],column.dateOptions);
			        		    	else if(column.datatype == 'string'){
			        		    		row.cols[k].val = allData[r][k];
			        		    		if(column.hellip)
			        		    			row.cols[k].hellip = column.hellip;
			        		    		else if(hellip)
			        		    			row.cols[k].hellip = hellip;
			        		    	}
			        		    	else
			        		    		row.cols[k].val = $yuccaHelpers.render.safeNumber(allData[r][k], column.decimalValue, column.euroValue,column.formatBigNumber);
		        				}
		       			    }		        			    
	        			}
	        			filteredData.push(row);
	           			if(maxRow!= null && r>maxRow)
	            			break;		
	        		}
	    		}
    			scope.isLoading = false;

        		console.log("tableHeader", scope.tableHeader);
        		console.log("filteredData",filteredData);
            	scope.tableData = {data:filteredData};
            	console.log("dataexplorer tableData",scope.tableData);
           	}
           	
            console.log("attrs", attr);
            
            //scope.reverse = false;
            
//            scope.sortColumn = function(col) {
//            	console.log("colonna",col);
//            	scope.sort.predicate = col;
//            	scope.reverse = !scope.reverse;
//            	
//            }
            
            var sort = {reverse:true}
            scope.sortTable = function(key){
            	sort.predicate  = key;
            	sort.reverse = !sort.reverse ;
            	
            	scope.tableData.data = scope.tableData.data.sort(compareData);
            }
            
            var compareData = function( aString, bString ) {
            	var res = 0
            	var a = aString.cols[sort.predicate].val;
            	var b = bString.cols[sort.predicate].val;
            	if(columnMap[sort.predicate].datatype == "int" ||
            			columnMap[sort.predicate].datatype == "long"){
            		a = parseInt(a.replace(/\./g, ''));
            		b = parseInt(b.replace(/\./g, ''));
            	}
            	else if(columnMap[sort.predicate].datatype == "float" ||
            			columnMap[sort.predicate].datatype == "double"){
            		a = parseFloat(a.replace(/\./g, ''));
            		b = parseFloat(b.replace(/\./g, ''));
            	}

            	if(!sort.reverse){
            		res= a < b?-1:1;
            	}
            	else{
            		res= a > b?-1:1;
            	}
            	return res;
            }
            
            scope.detail = null;
            scope.showDetail = function(col){
            	if(showDetail)
            		scope.detail = col;
            };
            
            scope.hideDetail = function(){
                scope.detail = null;
            };
            
//            scope.sortTable = function(n) {
//            	
//          	  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//        	  table = document.getElementById("Table");
//        	  switching = true;
//        	  // Set the sorting direction to ascending:
//        	  dir = "asc";
//        	  /* Make a loop that will continue until
//        	  no switching has been done: */
//        	  while (switching) {
//        	    // Start by saying: no switching is done:
//        	    switching = false;
//        	    rows = table.rows;
//        	    /* Loop through all table rows (except the
//        	    first, which contains table headers): */
//        	    for (i = 1; i < (rows.length - 1); i++) {
//        	      // Start by saying there should be no switching:
//        	      shouldSwitch = false;
//        	      /* Get the two elements you want to compare,
//        	      one from current row and one from the next: */
//        	      x = rows[i].getElementsByTagName("td")[n];
//        	      y = rows[i + 1].getElementsByTagName("td")[n];
//        	      /* Check if the two rows should switch place,
//        	      based on the direction, asc or desc: */
//        	      if (dir == "asc") {
//        	        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//        	          // If so, mark as a switch and break the loop:
//        	          shouldSwitch = true;
//        	          break;
//        	        }
//        	      } else if (dir == "desc") {
//        	        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//        	          // If so, mark as a switch and break the loop:
//        	          shouldSwitch = true;
//        	          break;
//        	        }
//        	      }
//        	    }
//        	    if (shouldSwitch) {
//        	      /* If a switch has been marked, make the switch
//        	      and mark that a switch has been done: */
//        	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//        	      switching = true;
//        	      // Each time a switch is done, increase this count by 1:
//        	      switchcount ++;
//        	    } else {
//        	      /* If no switching has been done AND the direction is "asc",
//        	      set the direction to "desc" and run the while loop again. */
//        	      if (switchcount == 0 && dir == "asc") {
//        	        dir = "desc";
//        	        switching = true;
//        	      }
//        	    }
//        	  }
//        	}

            	
        }

    };
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_dataexplorer_chart.html",
    '<div class="yucca-widget yucca-dataset-dataexplorer" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-table-content">\n' +
    '        <section>\n' +
    '         <div ng-if="isLoading" class="yucca-dataset-dataexplorer-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '           <div class="yucca-widget-dataexplorer-table-container">'+
    '            <div>'+
    '             <div class="yucca-widget-dataexplorer-toolbar-filter">' + 
    '                <div ng-repeat="f in tableFilter" class="yucca-widget-dataexplorer-toolbar-filter-item">'+
    '                  <input type="text" ng-model="f.value" placeholder="{{f.label}}">' + 
    '                </div>'+
    '             </div>' +
    ' 	  		  <table id = "Table" ng-if="!isLoading"  class="yucca-widget-table" ng-if="!isLoading">\n'+
    '                <thead >\n' +
    '                  <tr>\n'+                                             
    //'                    <th ng-repeat="col in tableHeader track by $index"><a href="" ng-click="sortTable($index)">{{col}}</a></th>\n' +
    '                    <th ng-repeat="col in tableHeader track by $index">' +
    '                      <a href ng-click="sortTable(col.key)">{{col.label}}' +
//    '                        <span ng-show="sort.predicate== \'col.key\' && !sort.reverse" class="">&uarr;</span>'+
//    '                        <span ng-show="sort.predicate==\'col.key\' && sort.reverse" class="">&darr;</span>'+
    '                      </a></th>\n' +
    '                  </tr>\n' +	
    '               </thead>\n' +
    '               <tbody>\n' +
    '                  <tr ng-repeat="row in filtered.rows = ( tableData.data | filter: applyTableFilter)  | startFrom:(pagination.current-1)*pagination.pagesize | limitTo:pagination.pagesize" class="yucca-dataset-dataexplorer-table-row" style="{{row.highlight}}">\n' +
    '                     <td ng-repeat="col in row.cols track by $index" ng-click="showDetail(row.cols)" ng-if="col.table">'+
    '                       <span ng-if="!col.hellip">{{col.val}}</span>'+
    '                       <span ng-if="col.hellip" title="{{col.val}}" class="nowrap">{{col.val|string_ellipse:hellip}}</span>'+
    ' 					  </td>\n' +
    '                  </tr>\n' + 
    '               </tbody>\n' +
    '            </table>\n' +
    '   	     <div class="yucca-widget-dataexplorer-pagination" ng-if="!isLoading" >\n' +
    '               <div class="yucca-widget-dataexplorer-pagination-total">Total <strong>{{filtered.rows.length}}</strong></div>' +
    '                <a href ng-if="pagination.current>1" ng-click="pagination.current=pagination.current-1" title="Previous" class="yucca-widget-dataexplorer-pagination-prev">&lt;</a> ' +
    '                  {{pagination.current}}/{{numberOfPages()}}\n' +
    '			     <a href ng-if="pagination.current < filtered.rows.length/pagination.pagesize" ng-click="pagination.current=pagination.current+1" title="Next"  class="yucca-widget-dataexplorer-pagination-prev">&gt;</a>' +
    '   	      </div>\n' +
    '   	    </div>\n' +
    '           <div class="yucca-widget-table-detail-panel" ng-if="detail"><a class="yucca-widget-table-close" href ng-click="hideDetail()">&times</a>'+
    '         	  <div ng-repeat="(key, val) in detail track by $index" ng-if="val.detail" class="yucca-widget-table-detail-panel-row"> ' + 
    '                <label>{{val.label}}</label><span>{{val.val}}</span>'+
    '             </div>'+
    '            </div>' + 
    '          </div>' + 
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

	