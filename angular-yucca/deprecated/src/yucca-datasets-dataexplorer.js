/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetDataexplorer', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'AE',
        scope: {},
        templateUrl:'template/dataset_dataexplorer_chart.html',
        link: function(scope, elem, attr) {
        	
        	
            var widgetType = 'YuccaDatasetDataexplorer';
            var widgetId = widgetType+new Date().getTime();
        	
        	scope.debug = attr.debug==="true"?true:false;
        	var user_token =  attr.userToken;
            var filter  = attr.filter;
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, "Data Explorer");
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

            scope.filteredColumns = scope.$eval(attr.filteredColumns);

            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);

        	
        	var allTableData = [];
     
       		scope.$on('yucca-widget-event', function(e, event) {  
			       console.log("yucca-widget-event", event);  
			       if(typeof event != undefined && event!=null && event.sourceId != widgetId){
			    	   if(event.data.datasetcode == attr.datasetCode && event.eventtype == "dataset.filter.column"){
			    		   if(event.data.value!=null && event.data.value!="" && event.data.column!=null && event.data.column!="")
			    			   filter = '\''+event.data.value.toUpperCase()+'\' eq '+ event.data.column;
		    			   else
		    				   filter = attr.filter;
			    		   loadData();
			    	   }
			       }
			       
			 });

       		

           	var includeColumn = function(column){
           		var ret = true;
           		if(column == 'datasetVersion' || column == 'idDataset' || column == 'internalId'  || column == '__metadata' )
           			ret =  false;
           		else if(scope.filteredColumns!=null && scope.filteredColumns.length>0){
           			for (var i = 0; i < scope.filteredColumns.length; i++) {
           				console.log("",scope.filteredColumns[i], column);
						if(scope.filteredColumns[i].toUpperCase() == column.toUpperCase()){
							console.log("exclude");
							ret = false;
							break;
						}
						
					}
           		}
           		return ret;
           	};

        	
           	var pageSize = 15;
            var filterColumnData = function(allData){
            	if(allData){
            		var filteredData  = new Array();
            		scope.tableHeader = new Array();
            		for (var r = 0; r < allData.length; r++) {
            			var row = new Array();
            			for (var k in allData[r]) {
            			    if (allData[r].hasOwnProperty(k) && includeColumn(k)) {
            			    	if(r==0)
            			    		scope.tableHeader.push(k);
            			    	row.push(allData[r][k]);
            			    }

            			}
            			filteredData.push(row)
            			if(r>pageSize)
            				break;
					}
            	}
            	console.log("filteredData",filteredData);
            	scope.tableData = {data:filteredData};
            };
        	
			scope.tableData = [];
			scope.isLoading = true;
			scope.responseMessage = null;
			var loadData = function(){
				scope.tableHeader = new Array();
				scope.tableData = [];
				scope.isLoading = true;
	    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).success(function(firstData){
	    			console.log("firstData", firstData);
	    			
	    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,   'internalId%20desc', firstData.d.__count).then( function(data) {
	    				scope.isLoading = false;
	    				scope.responseMessage = null;
	    				if(typeof data == 'undefined' || data == null || data.length ==0){
	    					scope.responseMessage = "No data found";
	    				}
	    				else{
		    				var allData = [];
		    				console.log("data", data);
		    				for(var i=0; i<data.length; i++){
		    					allData = allData.concat(data[i].data.d.results);
		    				}
		    				console.log("allData", allData);
		    				
		    				filterColumnData(allData); 
	    				}
	
	    			}, function(){
	    				scope.isLoading = false;
	    				scope.responseMessage = "An error occurred. Please try again later.";
	    			});
	    		});
			}
			if(attr.datasetCode)
				loadData();
			
            console.log("attrs", attr);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_dataexplorer.html",
    '<div class="yucca-widget yucca-dataset-dataexplorer">\n' +
    '    <header class="yucca-dataset-dataexplorer-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-dataexplorer-content">\n' +
    '         <div ng-if="isLoading" class="yucca-dataset-dataexplorer-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' +
    '         <table class="yucca-dataset-dataexplorer-table" ng-if="!isLoading">\n'+
    '             <thead >\n' +
    '                <tr>\n'+
    '                    <th ng-repeat="col in tableHeader track by $index"> {{col}}</th>\n' +
    '                </tr>\n' +
    '             </thead>\n' +
    '             <tbody>\n' +
    '                 <tr ng-repeat="row in tableData.data track by $index" class="yucca-dataset-dataexplorer-table-row">\n' +
    '                   <td ng-repeat="col in row track by $index">{{col}}</td>\n' +
    '                 </tr>\n' + 
    '             </tbody>\n' +
    '         </table>\n' +
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

