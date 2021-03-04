/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetMultidataStats', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_multidata_stats.html',
        link: function(scope, elem, attr) {
        	
        	scope.debug = attr.debug==="true"?true:false;
        	var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
            var filter  = attr.filter;
            
        	var showValues = attr.showValues==="true"?true:false;

            
            var firstGroupColumn =  $yuccaHelpers.attrs.safe(attr.firstGroupColumn, null);
            var firstGroupColors =  scope.$eval(attr.firstGroupColors);
            if(typeof firstGroupColors == 'undefined' || firstGroupColors == null ||firstGroupColors.length==0){
            	firstGroupColors = Constants.LINE_CHART_COLORS;
            }

            var secondGroupColumn =  scope.$eval(attr.secondGroupColumn);
            console.log("secondGroupColumn",secondGroupColumn);
            var secondGroupLabel =  scope.$eval(attr.secondGroupLabel);
            var thirdGroupColumn = $yuccaHelpers.attrs.safe(attr.thirdGroupColumn, null);

            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2); 
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            scope.decimalValue = decimalValue;

            var countingMode  = attr.countingMode;
            
            var histogramGroupColumn =  $yuccaHelpers.attrs.safe(attr.histogramGroupColumn, null);
            var histogramGroupValueColumn = $yuccaHelpers.attrs.safe(attr.histogramGroupValueColumn, null);
            
            if(typeof secondGroupColumn == 'undefined' && histogramGroupColumn==null){
            	secondGroupColumn = [firstGroupColumn];
            	countingMode = 'count';
            }
            else if(histogramGroupColumn!=null)
            	secondGroupColumn = [];
            
            var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, 400);
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'multiBarChart');
            var groupingWay =  $yuccaHelpers.attrs.safe(attr.groupingWay, 'grouped');
            var stacked = false;
            if(groupingWay == 'stacked')
            	stacked = true;
            
            
            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            
            var isFloat = function(n){
                return Number(n) === n && n % 1 !== 0;
            }
            
        	var toolTipContentFunction = function(key, x, y, e, graph) {
        		var dataIndex  = key.index;
        			
        			var tooltip="";
					tooltip += "  <h3 class='yucca-dataset-multidata-stats-tooltip-header'>" + key.value + "</h3>";
					tooltip += "<div class='yucca-dataset-multidata-stats-tooltip'>";
					tooltip += "  <table><tbody>";
					for (var i = 0; i < scope.chartData.length; i++) {
						var firstSerie = scope.chartData[i];
						for (var j = 0; j < firstSerie.values.length; j++) {
							var secondSerie = firstSerie.values[j];
							if(secondSerie.label == key.value){
								var style  = "";
								var val = secondSerie.value;
								//if($yuccaHelpers.render.isFloat){
									//val = val.toFixed(scope.decimalValue);
								//}

								val  = $yuccaHelpers.render.safeNumber(val, decimalValue, scope.isEuroValue(),formatBigNumber)
								if(firstSerie.key == key.data.key)
									style = "font-weight:  bold; color: " +firstSerie.color+ ";";
								tooltip += "  <tr style='"+style+"'>";
								tooltip += "      <td><span class='yucca-dataset-multidata-stats-tooltip-label'>"+secondSerie.key+"</span></td>";
								tooltip += "      <td><span class='yucca-dataset-multidata-stats-tooltip-value'>"+val+"</span></td>";
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
	                    top: 24,
	                    right: 24,
	                    bottom: 24,
	                    left: 64
    	            },
    	            x: function(d){return d.label;},
    	            y: function(d){return d.value;},
    	            showValues: showValues,
	                valueFormat: function(d){return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);},	         
	                //valueFormat: function(d){return parseFloat(d);},
	                duration: 500,
	                "stacked": stacked,
	                xAxis: {
	                    showMaxMin: false
	                },
	                yAxis: {
	                    axisLabelDistance: -10,
	                    tickFormat: function(d){
	                    	return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);
	                    }
					},
					reduceXTicks: attr.reduceXTicks == "true",
	                tooltip:{
	                	contentGenerator: toolTipContentFunction
	                }
	            }
	        };
        	
        	
        	var allTableData = [];
        	scope.changeTableData = function(index, mainPanel){
        		console.log("index", index, mainPanel);
        		if(mainPanel && thirdGroupColumn!=null)
        			scope.tableData = allTableData[index];
        	};
        	
        	
        	var groupData = function(allData){
        		var dataGroup  = {};
    			var valueIndexs = {};
    			var colorIndex = 0;
    			
    			var detailsTableData  = {};
    			var mainTableData = {};
				if(histogramGroupColumn!=null){
					for(var i=0; i<allData.length; i++){
	        			var d=  allData[i];
    					if(secondGroupColumn.indexOf(d[histogramGroupColumn])<0)
    						secondGroupColumn.push(d[histogramGroupColumn]);
					}
        		}

        		for(var i=0; i<allData.length; i++){
        			var d=  allData[i];
        			if(typeof dataGroup[d[firstGroupColumn]] == 'undefined'){
        				var v = [];
        				mainTableData[d[firstGroupColumn]]= [d[firstGroupColumn]];
        				for(var j=0; j<secondGroupColumn.length; j++){
        					valueIndexs[d[firstGroupColumn] + "_" + secondGroupColumn[j]] = j;
        					var label  = secondGroupColumn[j];
        					if(typeof secondGroupLabel != 'undefined' && secondGroupLabel!=null && secondGroupLabel.length>j)
        						label = secondGroupLabel[j];
        					v[j] = {"label":label,"value": 0};
        					
        					
        					mainTableData[d[firstGroupColumn]].push(0);
        					detailsTableData[d[firstGroupColumn]] = {};
        				}

        				dataGroup[d[firstGroupColumn]] = [{key: d[firstGroupColumn], values: v}];
        				if(typeof firstGroupColors != 'undefined' && firstGroupColors != null && colorIndex<firstGroupColors.length){
        					dataGroup[d[firstGroupColumn]][0].color= firstGroupColors[colorIndex];
        					colorIndex++;
        				}
        				
        				
        			}
        			
    				for(var j=0; j<secondGroupColumn.length; j++){
    					var add  = 1;
    					if(histogramGroupColumn!=null){
    						if(secondGroupColumn[j] == d[histogramGroupColumn]){
    	    					if(countingMode == 'sum'  && histogramGroupValueColumn !=null)
    	    						add  = parseFloat(d[histogramGroupValueColumn]);
    						}
    						else
    							add = 0;
    					}
    					else{
	    					if(countingMode == 'sum' )
	    						add  = parseFloat(d[secondGroupColumn[j]]);
    					}
    					
    					dataGroup[d[firstGroupColumn]][0].values[valueIndexs[d[firstGroupColumn]+ "_" + secondGroupColumn[j]]].value += add;
    					mainTableData[d[firstGroupColumn]][j+1] += add;
    					
    					if(thirdGroupColumn!=null){
    						var thirdColumnValue = d[thirdGroupColumn];
	    					if(typeof detailsTableData[d[firstGroupColumn]][thirdColumnValue] == 'undefined'){
	    						detailsTableData[d[firstGroupColumn]][thirdColumnValue] = new Array(secondGroupColumn.length);
	    						detailsTableData[d[firstGroupColumn]][thirdColumnValue][0] = thirdColumnValue;
	    						for(var k=0; k<secondGroupColumn.length; k++)
	    							detailsTableData[d[firstGroupColumn]][thirdColumnValue][k+1] = 0;
	    					}
	 
	    					detailsTableData[d[firstGroupColumn]][thirdColumnValue][j+1]  += add;
    					}
    				}
        			
        		}
        		console.log("secondGroupColumn", secondGroupColumn);
        		console.log("dataGroup",dataGroup);
        		console.log("valueIndexs",valueIndexs);
        		
        		
        		for ( var dataKey in dataGroup) {
        			scope.chartData.push(dataGroup[dataKey][0]);
				}
        		allTableData.push({title:'', mainPanel: true, data: mainTableData});//mainTableData;
        		for ( var detailTableIndex in detailsTableData) {
        			allTableData.push({title:detailTableIndex, mainPanel: false, data: detailsTableData[detailTableIndex]});
				}
        		scope.tableData = allTableData[0];
        		console.log("scope.chartData",scope.chartData);
        		console.log("allTableData  f", allTableData);
        		console.log("detailsTableData  f", detailsTableData);
        	};
            
        	
			scope.tableData = [];
			scope.tableDataColums = [];
				for(var j=0; j<secondGroupColumn.length; j++){
	
				var label  = secondGroupColumn[j];
				if(typeof secondGroupLabel != 'undefined' && secondGroupLabel!=null && secondGroupLabel.length>j)
					label = secondGroupLabel[j];
				scope.tableDataColums.push(label);
			}
            scope.chartData = [];
    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).then(function(firstData){
    			console.log("firstData", firstData);
    			
    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,   'internalId%20desc', firstData.data.d.__count).then( function(data) {
    				var allData = [];
    				console.log("data", data);
    				for(var i=0; i<data.length; i++){
    					allData = allData.concat(data[i].data.d.results);
    				}
    				console.log("allData", allData);
    				
    				groupData(allData); 
    				console.log("----",scope.allChartData);
    				

    			});
    		});

            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_multidata_stats.html",
    '<div class="yucca-widget yucca-dataset-multidata-stats">\n' +
    '    <header class="yucca-dataset-multidata-stats-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-multidata-stats-content">\n' +
    '        <section class="yucca-dataset-multidata-stats-chart" ng-show="panel==\'chart\'">\n' +
    '        	<nvd3 options="options" data="chartData"></nvd3>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-multidata-stats-data"  ng-show="panel==\'data\'">\n' +
    '           <table class="yucca-dataset-multidata-stats-table">\n'+
    '               <thead >\n' +
    '                  <tr>\n'+
    '                      <th><a href ng-click="changeTableData(0, true)" ng-hide="tableData.mainPanel"><span  class="back">&laquo; Back</span> </a> {{tableData.title}}</th>\n' +
    '                      <th ng-repeat="title in tableDataColums track by $index">{{title}}</th>\n'+
    '                  </tr>\n' +
    '               </thead>\n' +
    '               <tbody>\n' +
    '                   <tr ng-repeat="row in tableData.data track by $index" ng-click="changeTableData(($index+1), tableData.mainPanel)" ng-class="{selectable: tableData.mainPanel}">\n' +
    '                     <td ng-repeat="data in row track by $index">\n'+
    '                         <span class="yucca-dataset-multidata-stats-value">{{data|safeNumber:decimalValue}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-multidata-stats-toolbar">\n' +
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

