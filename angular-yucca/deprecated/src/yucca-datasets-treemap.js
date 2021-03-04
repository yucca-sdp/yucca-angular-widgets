/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetTreemap', ['metadataService','dataService', '$yuccaHelpers','$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$rootScope) {
    'use strict';

    return {
        restrict: 'AE',
        scope: {},
        templateUrl:'template/dataset_treemap.html',
        link: function(scope, elem, attr) {
        	

            var widgetType = 'YuccaDatasetTreemap';
            var widgetId = widgetType+new Date().getTime();
            scope.widgetId = widgetId;
            
        	scope.treemapData = null;
        	
        	scope.debug = attr.debug==="true"?true:false;
        	var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
            var filter  = attr.filter;
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, "Treemap");
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
            var chartTitle = $yuccaHelpers.attrs.safe(attr.chartTitle, attr.datasetCode);

            
            var colors = Constants.LINE_CHART_COLORS;


            var firstLevelColumn = $yuccaHelpers.attrs.safe(attr.firstLevelColumn, null);
            var firstLevelRender =  scope.$eval(attr.firstLevelRender);
            var secondLevelColumn =  $yuccaHelpers.attrs.safe(attr.secondLevelColumn, null);
            var secondLevelRender =  scope.$eval(attr.secondLevelRender);
            var thirdLevelColumn =  $yuccaHelpers.attrs.safe(attr.thirdLevelColumn, null);
            var thirdLevelRender =  scope.$eval(attr.thirdLevelRender);
            var valueColumn = $yuccaHelpers.attrs.safe(attr.valueColumn, null);
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            scope.decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            
            console.debug("firstLevelColumn", firstLevelColumn);
            console.debug("firstLevelRender",firstLevelRender);
            console.debug("secondLevelColumn", secondLevelColumn);
            console.debug("secondLevelRender",secondLevelRender);
            console.debug("thirdLevelColumn", thirdLevelColumn);
            console.debug("thirdLevelRender",thirdLevelRender);
            console.debug("valueColumn",valueColumn);
            
            scope.columns = [null,firstLevelColumn,secondLevelColumn, thirdLevelColumn];
            
            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, 100, null, elem[0].offsetWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, elem[0].offsetHeight);
            
            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);

        	
        	var allTableData = [];
        	
        	scope.backTableData = function(row){
        		row.level --;
        		scope.changeTableData(row);
        	};
        	
        	scope.changeTableData = function(row){
        		scope.tableData.data = [];
        		scope.tableData.current = row;
        		if(row.level==0){
        			scope.tableData.level = 0;
        			scope.tableData.title = chartTitle;
               		for ( var first in tmpChildrens) {
               			if (tmpChildrens.hasOwnProperty(first)) {	   
               				scope.tableData.data.push({"level":1, "first": first, "name":tmpChildrens[first].name, "value":tmpChildrens[first].value});
               			}
               		}
        		}
        		else if(row.level==1){
        			scope.tableData.level = 1;
        			scope.tableData.title = tmpChildrens[row.first].name;
               		for ( var second in tmpChildrens[row.first].children) {
               			if (tmpChildrens[row.first].children.hasOwnProperty(second)) {	   
               				scope.tableData.data.push({"level":2, "first": row.first, "second":second,  "name":tmpChildrens[row.first].children[second].name, "value":tmpChildrens[row.first].children[second].value});
               			}
               		}
        		}
        		else if(row.level==2){
        			scope.tableData.level = 2;
        			scope.tableData.title = tmpChildrens[row.first].children[row.second].name;
               		for ( var third in tmpChildrens[row.first].children[row.second].children) {
               			if (tmpChildrens[row.first].children[row.second].children.hasOwnProperty(third)) {	   
               				scope.tableData.data.push({"level":2, "first": row.first, "second": row.second,  "name":tmpChildrens[row.first].children[row.second].children[third].name, "value":tmpChildrens[row.first].children[row.second].children[third].value});
               			}
               		}
        		}
        		
        	};
        	
           	scope.treemapData  = {"name": chartTitle,"children": []};

           	var colorIndex = 0;
           	
           	var initLevel = function(d, column, render, addColor){
           		var level = {'name':d[column], "value": 0, "children":{}};
           		if(addColor){
	           			level.color = colors[colorIndex];
						colorIndex++;
						if(colorIndex== colors.length)
							colorIndex = 0;
				} 
				if(render!=null && typeof render[d[column]] != 'undefined'){
					if(typeof render[d[column]].label!= 'undefined')
						level.name = render[d[column]].label;
					if(addColor && typeof render[d[firstLevelColumn]].color!= 'undefined')
							level.color = render[d[column]].color;
				
				}
				return level;
           	};
       		var tmpChildrens  = {};

           	var groupData = function(allData){
           		var mainTableData = {};
           		var detailsTableData  = {};
           		//var childrens = [];
           		
           		var percentValues = {};
           		if(firstLevelColumn!=null){
           			//var firstLevel = {};
           			
           			for(var i=0; i<allData.length; i++){
           				var d=  allData[i];
           				// first level
           				if(typeof tmpChildrens[d[firstLevelColumn]] == 'undefined'){
           					tmpChildrens[d[firstLevelColumn]] = initLevel(d, firstLevelColumn, firstLevelRender, true);
           				}
           				tmpChildrens[d[firstLevelColumn]].value += (countingMode=='sum'?parseFloat(d[valueColumn]):1);
           				
           				// second Level
           				if(typeof tmpChildrens[d[firstLevelColumn]].children[d[secondLevelColumn]] == 'undefined'){
           					tmpChildrens[d[firstLevelColumn]].children[d[secondLevelColumn]]= initLevel(d, secondLevelColumn, secondLevelRender, false);
           				}
           				tmpChildrens[d[firstLevelColumn]].children[d[secondLevelColumn]].value += (countingMode=='sum'?parseFloat(d[valueColumn]):1);

           				// third Level
           				if(typeof tmpChildrens[d[firstLevelColumn]].children[d[secondLevelColumn]].children[d[thirdLevelColumn]] == 'undefined'){
           					tmpChildrens[d[firstLevelColumn]].children[d[secondLevelColumn]].children[d[thirdLevelColumn]]= initLevel(d, thirdLevelColumn, thirdLevelRender, false);
           				}
           				tmpChildrens[d[firstLevelColumn]].children[d[secondLevelColumn]].children[d[thirdLevelColumn]].value += (countingMode=='sum'?parseFloat(d[valueColumn]):1);

           				var percentValueKey = d[firstLevelColumn]+"_"+d[secondLevelColumn];
           				if(typeof percentValues[percentValueKey] == 'undefined'){
       						percentValues[percentValueKey] = {"count":0, "total": 0, "min": null, "max": null, "detail":{}};
       					}
           				if(typeof percentValues[percentValueKey].detail[d[thirdLevelColumn]]=='undefined'){
           					percentValues[percentValueKey].detail[d[thirdLevelColumn]]={"count":0, "total": 0};
           				}
       					percentValues[percentValueKey].count++;
       					percentValues[percentValueKey].detail[d[thirdLevelColumn]].count++;
       					if(countingMode=='sum'){
       						percentValues[percentValueKey].total+=parseFloat(d[valueColumn]);
           					percentValues[percentValueKey].detail[d[thirdLevelColumn]].total+=parseFloat(d[valueColumn]);
       					}
           			}
           			
           			
           			console.log("tmpChildrens", tmpChildrens);
           			console.log("percentValues", percentValues);

           		}
           		
           		for ( var firstPercent in percentValues) {
           			if (percentValues.hasOwnProperty(firstPercent)) {
           				for ( var secondPercent in percentValues[firstPercent].detail) {
           					var perVal = countingMode=='sum'?percentValues[firstPercent].detail[secondPercent].total:percentValues[firstPercent].detail[secondPercent].count;
           					
           					if(percentValues[firstPercent].min == null || perVal<percentValues[firstPercent].min)
           						percentValues[firstPercent].min = perVal;
           					if(percentValues[firstPercent].max == null || perVal>percentValues[firstPercent].max)
           						percentValues[firstPercent].max = perVal;
           				}
           			}
           		}
           		
       			console.log("percentValues", percentValues);


           		
           		scope.treemapData  = {"name": chartTitle,"children": []};
           		for ( var first in tmpChildrens) {
           			if (tmpChildrens.hasOwnProperty(first)) {	      
           				var firstValue = scope.isEuroValue()?$yuccaHelpers.render.formatEuro(tmpChildrens[first].value, scope.decimalValue):tmpChildrens[first].value;
	           			var firstChildrens  = {"name": tmpChildrens[first].name,"children": [], "color": tmpChildrens[first].color, "value": tmpChildrens[first].value, "label": tmpChildrens[first].name + " - " + firstValue};
	           			for ( var second in tmpChildrens[first].children) {
	           				
	           				
	           				if (tmpChildrens[first].children.hasOwnProperty(second)) {
	               				var secondValue = scope.isEuroValue()?$yuccaHelpers.render.formatEuro(tmpChildrens[first].children[second].value, scope.decimalValue):tmpChildrens[first].children[second].value;
		               			var secondChildrens  = {"name": tmpChildrens[first].children[second].name,"children": [], "value":  tmpChildrens[first].children[second].value,"label": tmpChildrens[first].children[second].name + " - " + secondValue};
		               			for ( var third in tmpChildrens[first].children[second].children) {
		               				if (tmpChildrens[first].children[second].children.hasOwnProperty(third)) {
		               					var val =  tmpChildrens[first].children[second].children[third].value;
		               					var min =  percentValues[first+"_"+second].min;
		               					var max =  percentValues[first+"_"+second].max;
		               					var total = countingMode=='sum'?percentValues[first+"_"+second].total:percentValues[first+"_"+second].count;

			               				var thirdValue = scope.isEuroValue()?$yuccaHelpers.render.formatEuro(val, scope.decimalValue):val;

		               					var percent =  100*(val)/(total);
		               					var percentLuminance =  100*(val)/(max);

		               					secondChildrens["children"].push({"name": tmpChildrens[first].children[second].children[third].name,
		               						"value":  tmpChildrens[first].children[second].children[third].value, 
		               						"label": tmpChildrens[first].children[second].children[third].name + " - " + val,
		               						"fourthElement":{"label":tmpChildrens[first].children[second].name +": "+ parseFloat(percent).toFixed(1) + "%", "value":percentLuminance}
		               						});
		               				}
								}
		               			firstChildrens["children"].push(secondChildrens);
	           				}
	           			}           
	           			scope.treemapData["children"].push(firstChildrens);
           			}
				}
           		scope.changeTableData({"level":0});

           		console.log("scope.treemapData",scope.treemapData);
           	};

        	scope.selected;
       		scope.$on('yucca-widget-event', function(e, event) {  
			       console.log("yucca-widget-event", event);  
			       if(typeof event != undefined && event!=null && event.sourceId != widgetId){
			    	   if(event.data.datasetcode == attr.datasetCode && event.eventtype == "dataset.filter.column"){
			    		   scope.selected = event.data.value.toUpperCase();
			    	   }
			    	   else if(event.data.datasetcode == attr.datasetCode && event.eventtype == "dataset.change.column"){
			    		   valueColumn = event.data.column;
			    		   groupData(allData);
			    	   }
			       }
			       
			 });

       		scope.$on('treemap-event', function(e, event) {  
			       console.log("treemap-event", e, event) ;
			       if(event.treemapId = widgetId){
				       var event = $yuccaHelpers.event.createEvent(widgetId,
				    			 widgetType,
				    			 event.eventtype, 
				    			 {"datasetcode": attr.datasetCode, "column": event.column, "value": event.value});
				    	console.log("event",event);
				    	$rootScope.$broadcast ('yucca-widget-event', event);	
			       }
			 });
       		
       	 
       		
       		
       		
       		

			scope.tableData = [];
			scope.isLoading = true;
			scope.chartMessage = null;
			var allData = [];
    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).success(function(firstData){
    			console.log("firstData", firstData);
    			
    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,   'internalId%20desc', firstData.d.__count).then( function(data) {
    				scope.isLoading = false;
    				scope.chartMessage = null;
    				if(typeof data == 'undefined' || data == null || data.length ==0){
    					scope.chartMessage = "No data found";
    				}
    				else{
	    				
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
  $templateCache.put("template/dataset_treemap.html",
    '<div class="yucca-widget yucca-dataset-treemap">\n' +
    '    <header class="yucca-dataset-treemap-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-treemap-content">\n' +
    '        <section class="yucca-dataset-treemap-chart" ng-show="panel==\'chart\'">\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-treemap-loading" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px" ><p>Loading&hellip;</p>\n' +
    '             <div class="yucca-widget-spinner"> <div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-show="chartMessage != null" class="yucca-dataset-treemap-chart-message" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px">Loading&hellip;</div>\n' +
    '        	<treemap-chart ng-show="!isLoading &&  chartMessage == null "data="treemapData" widgetid="{{widgetId}}" columns="columns" show_legend="false" width="{{chartWidth}}" height="{{chartHeight}}" selected="{{selected}}"></treemap-chart>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-treemap-data"  ng-show="panel==\'data\'">\n' +
    '           <table class="yucca-dataset-treemap-table">\n'+
    '               <thead >\n' +
    '                  <tr>\n'+
    '                      <th colspan="2"><a href ng-click="backTableData(tableData.current)" ng-hide="tableData.level==0"><span  class="back">&laquo; Back</span> </a> {{tableData.title}}</th>\n' +
    '                  </tr>\n' +
    '               </thead>\n' +
    '               <tbody>\n' +
    '                   <tr ng-repeat="row in tableData.data track by $index" ng-click="changeTableData(row)" class="yucca-dataset-treemap-table-row">\n' +
    '                     <td>{{row.name}}</td><td><span class="yucca-dataset-treemap-value">{{row.value|safeNumber:decimalValue:isEuroValue()}}</span></td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-treemap-toolbar">\n' +
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

