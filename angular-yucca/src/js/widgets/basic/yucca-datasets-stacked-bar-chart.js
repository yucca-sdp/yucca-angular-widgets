/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetStackedBarChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_stacked_bar_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);
        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.usertoken;
            var filter  = attr.filter;
            var orderby = attr.orderby;

            var filterIds = $yuccaHelpers.attrs.safe(attr.filterIds, null);
            
        	var loadIds = function(){
        		  
	    		dataService.getDataEntities(attr.datasetCode,user_token,null,  0, 50, orderby).then(function(result){
	    			console.log("loadIds",result);
	    			 var loadedData = result.d.results;
	    			if(result.d.results!=null && result.d.__count>0){
	    				scope.internalIds = [] ;
	    				var ds =[];
	    				for(var i = 0; i<loadedData.length; i++){
	    					scope.internalIds.push([loadedData[i][attr.axisX],loadedData[i][attr.axisY]]);
	    				}
	    				console.log("internalIds",scope.internalIds);
	    			
	                
	                scope.datachart = [
	                    {
	                       // "key" : "Quantity" ,
	                        "bar": true,
	                        "values" : scope.internalIds
	                    }];
	    			}
	                
	    			else{
	    				scope.infoMessage = "No data found";
		    			scope.isLoading = false;
	    			}
	    		},function(result){
	    			scope.isLoading = false;
	    			console.error("loadIds error",result);
	    			scope.debugMessages.push("Load ids error " +result );
	    		});
    		}
            
            loadIds();

            
            console.log("datachart",scope.datachart);
            
        	scope.options = {
        	            chart: {
        	                type: 'historicalBarChart',
        	                height: 450,
        	                margin : {
        	                    top: 20,
        	                    right: 20,
        	                    bottom: 65,
        	                    left: 50
        	                },
        	                x: function(d){return d[0];},
        	                y: function(d){return d[1];},
        	                showValues: true,
        	                valueFormat: function(d){
        	                    return d3.format(',.1f')(d);
        	                },
        	                duration: 100,
        	                xAxis: {
        	                    axisLabel: 'X Axis',
        	                    axisLabelDistance: -10,
        	                 
        	                    rotateLabels: 30,
        	                    showMaxMin: false
        	                },
        	                yAxis: {
        	                    axisLabel: 'Y Axis',
        	                    axisLabelDistance: -10,
        	                  /* tickFormat: function(d){
        	                        return d3.format(',.1f')(d);
        	                    }*/
        	                },
        	                tooltip: {
        	                    keyFormatter: function(d) {
        	                        return d3.format(d)(d);
        	                    }
        	                },
        	                zoom: {
        	                    enabled: true,
        	                    scaleExtent: [1, 10],
        	                    useFixedDomain: false,
        	                    useNiceScale: false,
        	                    horizontalOff: false,
        	                    verticalOff: true,
        	                    unzoomEventType: 'dblclick.zoom'
        	                }
        	            }
        	        };
        	        
        	       
            /* scope.datachart = [
                 {
                     "key" : "Quantity" ,
                     "bar": true,
                     "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
                 }];*/
        	
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_stacked_bar_chart.html",
		  '<div class="yucca-widget yucca-dataset-stacked-bar-chart">\n' +
		    '    <header class="yucca-dataset-stacked-bar-chart-header">\n' +
		    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
		    '    </header>\n' +
		    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
		    '    <div class="yucca-dataset-stacked-bar-chart-content">\n' +
		    '        <section >\n' +
		    '           <div ng-show="isLoading" class="yucca-dataset-stacked-bar-chart-loading" >\n' +
		    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
		    '           </div>\n' +
		    '           <div ng-show="infoMessage!=null" class="yucca-chart-info-message" >\n' +
		    '             <p>{{infoMessage}}</p>\n' +
		    '           </div>\n' +
		    '        	<div ng-show="!isLoading"  o >\n' +
		    '				<nvd3 options="options" data="datachart" ></nvd3>\n' +
		    '       	</div>\n' +
		    '        </section>\n' +
		    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
		    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
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

