/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetMultidataTreemap', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'AE',
        scope: {},
        templateUrl:'template/dataset_multidata_treemap.html',
        link: function(scope, elem, attr) {
        	
        	scope.treemapData = null;
        	
        	scope.debug = attr.debug==="true"?true:false;
        	var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
            var filter  = attr.filter;
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, "Treemap");
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
            var chartTitle = $yuccaHelpers.attrs.safe(attr.chartTitle, attr.datasetCode);
            

            
            var secondGroupColumn =  $yuccaHelpers.attrs.safe(attr.secondGroupColumn, null);
            var colors =  scope.$eval(attr.colors);
            if(typeof colors == 'undefined' || colors == null ||colors.length==0){
            	colors = Constants.LINE_CHART_COLORS;
            }

            var firstGroupColumn =  scope.$eval(attr.firstGroupColumn);
            console.log("secondGroupColumn",secondGroupColumn);
            var firstGroupLabel =  scope.$eval(attr.firstGroupLabel);
            var thirdGroupColumn = $yuccaHelpers.attrs.safe(attr.thirdGroupColumn, null);
            var fourthGroupColumn =  $yuccaHelpers.attrs.safe(attr.fourthGroupColumn, null);

            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            scope.decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };

            
            var countingMode  = attr.countingMode;

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, 100, null, 500);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, 400);
            
            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);

        	
        	var allTableData = [];
        	scope.changeTableData = function(index, mainPanel){
        		console.log("index", index, mainPanel);
        		if(mainPanel && thirdGroupColumn!=null)
        			scope.tableData = allTableData[index];
        	};
        	
           	scope.treemapData  = {"name": chartTitle,"children": []};
           	var groupData = function(allData){
           		var mainTableData = {};
           		var detailsTableData  = {};
           		var childrens = [];
				for(var j=0; j<firstGroupColumn.length; j++){
					childrens[firstGroupColumn[j]] = [];
				}
				
           		var add = 1;
           		for(var i=0; i<allData.length; i++){
        			var d=  allData[i];
        			// treemap data
					if(typeof childrens[firstGroupColumn[0]][d[secondGroupColumn]] == 'undefined'){
						for(var j=0; j<firstGroupColumn.length; j++){
							childrens[firstGroupColumn[j]][d[secondGroupColumn]] = [];
						}
        			}

					// table data
					if(typeof mainTableData[d[secondGroupColumn]] == 'undefined'){
						mainTableData[d[secondGroupColumn]]= [d[secondGroupColumn]];
		           		detailsTableData[d[secondGroupColumn]] = {};

					}

					for(var j=0; j<firstGroupColumn.length; j++){
						var fourthElement = fourthGroupColumn ? d[fourthGroupColumn]:0;
						if(thirdGroupColumn!=null && typeof childrens[firstGroupColumn[j]][d[secondGroupColumn]][d[thirdGroupColumn]] == 'undefined')
							childrens[firstGroupColumn[j]][d[secondGroupColumn]][d[thirdGroupColumn]] = {"value":0, "fourthElement":fourthElement};
						
	
						if(countingMode == 'sum' )
							add  = parseFloat(d[firstGroupColumn[j]]);
						
						childrens[firstGroupColumn[j]][d[secondGroupColumn]][d[thirdGroupColumn]].value += add;
						
						if(mainTableData[d[secondGroupColumn]].length==j+1){
							mainTableData[d[secondGroupColumn]].push(0);
						}
						
    					mainTableData[d[secondGroupColumn]][j+1] += add;
    					var thirdColumnValue = d[thirdGroupColumn];
    					if(typeof detailsTableData[d[secondGroupColumn]][thirdColumnValue] == 'undefined'){
    						detailsTableData[d[secondGroupColumn]][thirdColumnValue] = new Array(firstGroupColumn.length);
    						detailsTableData[d[secondGroupColumn]][thirdColumnValue][0] = thirdColumnValue;
    						for(var k=0; k<firstGroupColumn.length; k++)
    							detailsTableData[d[secondGroupColumn]][thirdColumnValue][k+1] = 0;
    					}
 
    					detailsTableData[d[secondGroupColumn]][thirdColumnValue][j+1]  += add;
					}				
					
           		}
           		console.log("mainTableData new", mainTableData);
           		console.log("detailsTableData new", detailsTableData);
           		
        		allTableData.push({title:'', mainPanel: true, data: mainTableData});//mainTableData;
        		for ( var detailTableIndex in detailsTableData) {
        			allTableData.push({title:detailTableIndex, mainPanel: false, data: detailsTableData[detailTableIndex]});
				}
        		scope.tableData = allTableData[0];

           		scope.treemapData  = {"name": chartTitle,"children": []};
           		
           		var firstCounter = 0;
           		for ( var first in childrens) {
           			if (childrens.hasOwnProperty(first)) {	           			
           				var name = first;
           				if(typeof firstGroupLabel != 'undefined' && firstGroupLabel!=null && typeof firstGroupLabel[firstCounter] != 'undefined' && firstGroupLabel[firstCounter] !=null){
	           				name = firstGroupLabel[firstCounter];
	           			}
	           			firstCounter++;
	           			var firstChildrens  = {"name": name,"children": [], "color": colors[firstCounter]};
	           			
	           			for ( var second in childrens[first]) {
	           				if (childrens[first].hasOwnProperty(second)) {
		               			var secondChildrens  = {"name": second,"children": []};
		               			for ( var third in childrens[first][second]) {
		               				if (childrens[first][second].hasOwnProperty(third)) {
		               					secondChildrens["children"].push({"name": third,"value":  childrens[first][second][third].value, "fourthElement":{"label":fourthGroupColumn, "value":childrens[first][second][third].fourthElement}});
		               				}
								}
		               			firstChildrens["children"].push(secondChildrens);
	           				}
	           			}           
	           			scope.treemapData["children"].push(firstChildrens);
           			}
				}
           		console.log("scope.treemapData",scope.treemapData);
           	};

           	

        	
            
        	
			scope.tableData = [];
			scope.tableDataColums = [];
				for(var j=0; j<firstGroupColumn.length; j++){
	
				var label  = firstGroupColumn[j];
				if(typeof firstGroupLabel != 'undefined' && firstGroupLabel!=null && firstGroupLabel.length>j)
					label = firstGroupLabel[j];
				scope.tableDataColums.push(label);
			}
			scope.isLoading = true;
			scope.chartMessage = null;
    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).then(function(firstData){
    			console.log("firstData", firstData);
    			
    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,   'internalId%20desc', firstData.data.d.__count).then( function(data) {
    				scope.isLoading = false;
    				scope.chartMessage = null;
    				if(typeof data == 'undefined' || data == null || data.length ==0){
    					scope.chartMessage = "No data found";
    				}
    				else{
	    				var allData = [];
	    				console.log("data", data);
	    				for(var i=0; i<data.length; i++){
	    					allData = allData.concat(data[i].data.d.results);
	    				}
	    				console.log("allData", allData);
	    				
	    				groupData(allData); 
	    				console.log("----",scope.allChartData);
    				}

    			}, function(){
    				scope.isLoading = false;
    				scope.chartMessage = "An error occurred. Please try again later.";
    			});
    		});

            console.log("attrs", attr);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_multidata_treemap.html",
    '<div class="yucca-widget yucca-dataset-multidata-treemap">\n' +
    '    <header class="yucca-dataset-multidata-treemap-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-multidata-treemap-content">\n' +
    '        <section class="yucca-dataset-multidata-treemap-chart" ng-show="panel==\'chart\'">\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-multidata-treemap-loading" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px" ><p>Loading&hellip;</p>\n' +
    '             <div class="yucca-widget-spinner"> <div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-show="chartMessage != null" class="yucca-dataset-multidata-treemap-chart-message" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px">Loading&hellip;</div>\n' +
    '        	<treemap-chart ng-show="!isLoading &&  chartMessage == null "data="treemapData" width="{{chartWidth}}" height="{{chartHeight}}"></treemap-chart>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-multidata-treemap-data"  ng-show="panel==\'data\'">\n' +
    '           <table class="yucca-dataset-multidata-treemap-table">\n'+
    '               <thead >\n' +
    '                  <tr>\n'+
    '                      <th><a href ng-click="changeTableData(0, true)" ng-hide="tableData.mainPanel"><span  class="back">&laquo; Back</span> </a> {{tableData.title}}</th>\n' +
    '                      <th ng-repeat="title in tableDataColums track by $index">{{title}}</th>\n'+
    '                  </tr>\n' +
    '               </thead>\n' +
    '               <tbody>\n' +
    '                   <tr ng-repeat="row in tableData.data track by $index" ng-click="changeTableData(($index+1), tableData.mainPanel)" ng-class="{selectable: tableData.mainPanel}">\n' +
    '                     <td ng-repeat="data in row track by $index">\n'+
    '                         <span class="yucca-dataset-multidata-treemap-value">{{data|safeNumber:decimalValue:isEuroValue()}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-multidata-treemap-toolbar">\n' +
    '            <a href ng-click="panel=\'chart\'" ng-class="{active: panel == \'chart\'}">Chart</a> | <a href ng-click="panel=\'data\'" ng-class="{active: panel == \'data\'}">Data</a> \n' +
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

