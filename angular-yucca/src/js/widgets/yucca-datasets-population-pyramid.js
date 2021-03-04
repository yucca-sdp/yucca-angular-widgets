/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetPopulationPyramid', ['metadataService','dataService', '$yuccaHelpers','$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_population_pyramid.html',
        link: function(scope, elem, attr) {
        	
        	 var widgetType = 'YuccaDatasetPopulationPyramid';
             scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
        	
        	scope.debug = attr.debug==="true"?true:false;
        	var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
            var filter  = attr.filter;
            
            var genderColumn =  $yuccaHelpers.attrs.safe(attr.genderColumn, null);
            var genderLabels = scope.$eval(attr.genderLabels);
            if(typeof genderLabels == 'undefined' || genderLabels == null ||genderLabels.length==0){
            	genderLabels = ["F", "M"];
            }

            var genderValues = scope.$eval(attr.genderValues);
            if(typeof genderValues == 'undefined' || genderValues == null ||genderValues.length==0){
            	genderValues = ["F", "M"];
            }
            
            var genderColors = scope.$eval(attr.genderColors);
            if(typeof genderColors == 'undefined' || genderColors == null ||genderColors.length!=2){
            	genderColors = ["#f8a0df", "#19aeff"];
            }

            var ageColumn =  $yuccaHelpers.attrs.safe(attr.ageColumn,null);
            var ageValues =  $yuccaHelpers.attrs.safe(attr.ageValues,null);
            var ageValues = scope.$eval(attr.ageValues);
            if(typeof ageValues == 'undefined' || ageValues == null ||ageValues.length==0){
            	ageValues == null;
            }
            var ageLabels = scope.$eval(attr.ageLabels);
            if(typeof ageLabels == 'undefined' || ageLabels == null ||ageLabels.length==0){
            	ageLabels = null;
            }
            
            

            var valueColumn =  $yuccaHelpers.attrs.safe(attr.valueColumn,null);
            
            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");

            var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, 400);
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'multiBarHorizontalChart');
            var groupingWay =  $yuccaHelpers.attrs.safe(attr.groupingWay, 'stacked');
            var stacked = false;
            if(groupingWay == 'stacked')
            	stacked = true;
            
            
            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            
            
       		scope.$on('yucca-widget-event', function(e, event) {  
			       console.log("yucca-widget-event", event);  
			       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
			    	   if(event.data.datasetcode == attr.datasetCode && event.eventtype == "dataset.filter.column"){
			    		   scope.selected = event.data.value.toUpperCase();
			    	   }
			    	   else if(event.data.datasetcode == attr.datasetCode && event.eventtype == "dataset.change.column"){
			    		   valueColumn = event.data.column;
			    		   groupData(allData);
			    	   }
			       }
			       
			 });

        	var toolTipContentFunction = function(key, x, y, e, graph) {
        		var dataIndex  = key.index;
        			
        			var tooltip="";
					tooltip += "  <h3 class='yucca-dataset-population-pyramid-tooltip-header'>" + key.value + "</h3>";
					tooltip += "<div class='yucca-dataset-population-pyramid-tooltip'>";
					tooltip += "  <table><tbody>";
					for (var i = 0; i < scope.chartData.length; i++) {
						var firstSerie = scope.chartData[i];
						for (var j = 0; j < firstSerie.values.length; j++) {
							var secondSerie = firstSerie.values[j];
							if(secondSerie.label == key.value){
								var style  = "";
								if(firstSerie.key == key.data.key)
									style = "font-weight:  bold; color: " +firstSerie.color+ ";";
								tooltip += "  <tr style='"+style+"'>";
								tooltip += "      <td><span class='yucca-dataset-population-pyramid-tooltip-label'>"+secondSerie.key+"</span></td>";
								tooltip += "      <td><span class='yucca-dataset-population-pyramid-tooltip-value'>"+secondSerie.valueLabel+"</span></td>";
								tooltip += "  </tr>";
							}
						}
					}
					tooltip += "  </tbody></table>";
					tooltip += "</div>";	
        			
        	    	return  tooltip;
        		};
        	
        	scope.options = {
    			chart: {
    				type: chartType,
    	            height: parseInt(chartHeight),
    	            margin : {
	                    left: 64
    	            },
    	            x: function(d){return d.label;},
    	            y: function(d){return d.value;},
    	            showValues: true,
	                valueFormat: function(d){
	                    return parseInt(d);
	                },
	                duration: 500,
	                "stacked": stacked,
	                xAxis: {
	                    showMaxMin: false
	                },
	                yAxis: {
	                    axisLabelDistance: -10,
	                    tickFormat: function (d) { return Math.abs(d) }
	                },
	                tooltip:{
	                	contentGenerator: toolTipContentFunction
	                },
	                legend: {maxKeyLength: 50}
	            }
	        };
        	
        	
        	
        	var allTableData = [];
        	
        	var groupData = function(allData){
        		try{
	        		scope.chartData = [{"key": genderLabels[0], "color":genderColors[0],  "values": []}, {"key": genderLabels[1], "color":genderColors[1],  "values": []}];
	        		
	        		
	        		
	        		scope.tableData = [];
	        		var femaleData = {};
	        		var maleData = {};
        			if(ageValues!=null){
        				for(var i=0; i<ageValues.length;i++){
	        				femaleData[ageValues[i]] = 0;
	        				maleData[ageValues[i]] = 0;
        				}
        					
        			}
	        		for(var i=0; i<allData.length; i++){
	        			var d=  allData[i];
	
	        			if(typeof femaleData[d[ageColumn]] == 'undefined') {
	        				femaleData[d[ageColumn]] = 0;
	        				maleData[d[ageColumn]] = 0;
	        			}
	        			
	        			console.log("d",d);
	        			console.log("valueColumn",valueColumn);
	        			console.log("d[valueColumn]",valueColumn,d[valueColumn]);
	        			var val = isNaN(d[valueColumn])?0:parseInt(d[valueColumn]);
	        			
	        			if(d[genderColumn]==genderValues[0]){
	        				if(countingMode == "count")
	        					femaleData[d[ageColumn]] --;
	        				else if(countingMode == "sum")
	        					femaleData[d[ageColumn]] -= parseInt(val);
	        			}
	        			else if(d[genderColumn]==genderValues[1]){
	        				if(countingMode == "count")
	        					maleData[d[ageColumn]] ++;
	        				else if(countingMode == "sum")
	        					maleData[d[ageColumn]] += parseInt(val);
	        			}
	        		}
        	
	        		for (var property in femaleData) {
	        		    if (femaleData.hasOwnProperty(property)) {
	        		    	var ageLabel = property;
	        		    	if(ageLabels !=null && typeof ageLabels[property] != "undefined" && ageLabels[property]!=null)
	        		    		ageLabel= ageLabels[property];
	        		    		
	        		    	scope.chartData[0].values.push({"label": ageLabel, "value":femaleData[property], "valueLabel":-1*femaleData[property]});
	        		    	scope.chartData[1].values.push({"label": ageLabel, "value":maleData[property],"valueLabel":maleData[property]});
	        		    	scope.tableData.push([property, -1*femaleData[property], maleData[property]])
	        		    }
	        		}
	        		
	        		var maxLabel = maxYLabel(scope.chartData[0].values);
					var fakeText = d3.select("#"+ scope.widgetId + "-fake").insert("svg").append("text").text(maxLabel);
					scope.options.chart.margin.left =  fakeText.node().getComputedTextLength();
					console.log("maxLabel",maxLabel, fakeText.node().getComputedTextLength());
					d3.select("#"+ scope.widgetId + "-fake").remove();
	        		
	        		
	        		console.log("chartData", scope.chartData);
	        		console.log("tableData", scope.tableData);
	        	
        		}
        		catch (e) {
        			console.error("groupData",e);
				}
        		
        		
        	};
        	
			var maxYLabel = function(labels){
				var maxLabel = "";
				if(labels){
					for(var i=0; i<labels.length; i++){
						if(labels[i].label.length>maxLabel.length)
							maxLabel = labels[i].label;
					}
				}
				return maxLabel;
			}
			
			scope.isLoading = true;
			var allData = [];

    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).then(function(firstData){
    			console.log("firstData", firstData);
    			
    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,   'internalId%20desc', firstData.data.d.__count).then( function(data) {
    				console.log("data", data);
    				for(var i=0; i<data.length; i++){
    					allData = allData.concat(data[i].data.d.results);
    				}
    				console.log("allData", allData);
    				scope.isLoading = false;
    				groupData(allData); 
    				

    			});
    		});

            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_population_pyramid.html",
    '<div class="yucca-widget yucca-dataset-population-pyramid" id="{{widgetId}}>\n' +
    '    <header class="yucca-dataset-population-pyramid-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
	'    <div id="{{widgetId}}-fake"></div>' + 
    '    <div class="yucca-dataset-population-pyramid-content">\n' +
    '        <section class="yucca-dataset-population-pyramid-chart" ng-show="panel==\'chart\'">\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-pyramid-data-loading" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px" ><p>Loading&hellip;</p>\n' +
    '             <div class="yucca-widget-spinner"> <div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '        	<nvd3 options="options" data="chartData" ></nvd3>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-population-pyramid-data"  ng-show="panel==\'data\'">\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-pyramid-data-loading" style="min-height: {{chartHeight}}px;min-width: {{chartWidth}}px" ><p>Loading&hellip;</p>\n' +
    '             <div class="yucca-widget-spinner"> <div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <table class="yucca-dataset-population-pyramid-table" ng-show="!isLoading" >\n'+
    '               <thead >\n' +
    '                  <tr>\n'+
    '                      <th>{{tableData.title}}</th>\n' +
    '                      <th>F</th>\n'+
    '                      <th>M</th>\n'+
    '                  </tr>\n' +
    '               </thead>\n' +
    '               <tbody>\n' +
    '                   <tr ng-repeat="row in tableData track by $index">\n' +
    '                     <td ng-repeat="data in row track by $index">\n'+
    '                         <span>{{data}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-population-pyramid-toolbar">\n' +
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

