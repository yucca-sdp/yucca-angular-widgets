/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamTweetStats', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_tweet_stats.html',
        link: function(scope, elem, attr) {

   
        	var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, 300);
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'lineChart');
            var chartColors =  scope.$eval(attr.chartColors);
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');

            if(typeof chartColors == 'undefined' || chartColors == null ||chartColors.length==0){
            	chartColors = Constants.LINE_CHART_COLORS;
            }

        	var valueFormatFunction = function(d){
   				return parseInt(d);
    	    };
        	
        	var toolTipContentFunction = function(key, x, y, e, graph) {
        			console.log("key", key);
        			var dataIndex  = key.index;
        			var tooltip="";
        			if(chartType == 'lineChart')
        				tooltip=key.point.tooltip;
        			else
        				tooltip=key.data.tooltip;
        	    	return  tooltip;
        		};
        	
        	scope.options = {
    			chart: {
    				type: chartType,
    	            height: chartHeight,
    	            margin : {
	                    top: 24,
	                    right: 24,
	                    bottom: 24,
	                    left: 36
    	            },
    	            interpolate: 'basis',
    	            x: function(d){return d.x;},
    	            y: function(d){return d.y;},
    	            showValues: true,
    	            showLegend: false,
	                valueFormat: valueFormatFunction,
	                duration: 500,
	                showXAxis: true,
	                xAxis: {
	                    axisLabel: 'Time' + $yuccaHelpers.odata.timeGroup2resultKey(timeGroupBy),
	                },
	                yAxis: {
	                    axisLabel: '',
	                    axisLabelDistance:-10
	                },
	                tooltip:{contentGenerator: toolTipContentFunction}
	            }
	        };
            
            var user_token =  attr.userToken;
            var decodedDateFilter = $yuccaHelpers.odata.decodeDateFilter(attr);
            var timeFilter = decodedDateFilter.timeFilter;
            var timeGroupBy = $yuccaHelpers.attrs.safe(attr.timeGroupBy, $yuccaHelpers.odata.extractTimeGroupFilter(decodedDateFilter.minDateMillis, decodedDateFilter.maxDateMillis));
            scope.xAxisLabel = $yuccaHelpers.odata.timeGroupLabel(timeGroupBy);
            
            scope.statisticData = [];
            scope.chartData = [];
        	scope.statisticData.push({"label": "Tweets", "value": "-"});
        	scope.statisticData.push({"label": "Unique Author", "value": "-"});
        	scope.statisticData.push({"label": "Tweet/Hour", "value": "-"});
        	scope.statisticData.push({"label": "Tweet/Author", "value":  "-"});

        	var refreshStats = function(){
        		if(scope.statisticData[0].value>0 && scope.statisticData[1].value>0)
        			scope.statisticData[3].value = (parseInt(scope.statisticData[0].value)/parseInt(scope.statisticData[1].value)).toFixed(2);
        		else
        			scope.statisticData[3].value =  "-";

        	};
        	
        	scope.lastTweets = [];
        	scope.mostRetweeted = [];
        	
        	
            metadataService.getStreamMetadata(attr.tenantCode, attr.streamCode, attr.smartobjectCode).success(
                function(metadata) {
                	console.log("metadata",metadata);
        			//var metadata  ={dataset:{code:"ds_Raspberry_907"}, stream:{smartobject:{twtQuery:"raspberry pi"}}};
        			
                    scope.metadata = metadata;
                    
                    if(metadata.dataset.code!=null){
                    	
	                    // last tweet
                    	dataService.getSocialFeeds(metadata.dataset.code, user_token, timeFilter,  null, 10, "time desc").success( function(data) {
	                        	console.log("data",data);
	                        	for(var i=0; i<data.d.results.length; i++){
	                        		scope.lastTweets.push($yuccaHelpers.render.completeTweet(data.d.results[i], $yuccaHelpers.utils.mongoDate2string(data.d.results[i].createdAt)));
	                        	}
	                        	
	                        	scope.statisticData[0].value=data.d.__count;
	                        	refreshStats();
	                    	}
	                    );

	                    // most retweeted
	                    dataService.getSocialFeeds(metadata.dataset.code, user_token, timeFilter,  null, 10, "retweetCount desc").success( function(data) {
	                        	console.log("data",data);
	                        	for(var i=0; i<data.d.results.length; i++){
	                        		scope.mostRetweeted.push($yuccaHelpers.render.completeTweet(data.d.results[i], $yuccaHelpers.utils.mongoDate2string(data.d.results[i].createdAt)));
	                        	}

	                   		}
	                    );

	                    // data statistic 
	                    dataService.getSocialFeedsStats(metadata.dataset.code,  user_token, timeGroupBy, 'sum,tweetid', timeFilter,  null, null, "year,month,dayofmonth,hour").success( function(statisticData) {
	                    	console.log("statisticData", statisticData);
	                    	var chartDataValues = [];
	            			var colorIndex = 0;

	                    	for(var i=0; i<statisticData.d.results.length; i++){
	                    		var data = statisticData.d.results[i];
	                    		var time  =$yuccaHelpers.odata.timeGroup2resultKey(timeGroupBy);
	                    		var tooltipText =  "<h3 class='yucca-stream-tweet-stats-tooltip-header'>";
	                    		tooltipText += $yuccaHelpers.utils.lZero(data['dayofmonth']) + "/" + $yuccaHelpers.utils.lZero(data['month']) +"/" + data['year'];
	                    		tooltipText +=  "</h3>";
	                    		tooltipText +=  "<p>Tweet :<strong>"+data['count']+"</strong></p>";

	                    		var element = {x:parseFloat(data[time]), y:parseFloat(data['count']), "tooltip":tooltipText };
	                    		if(colorIndex<chartColors.length){
	                    			element.color= chartColors[colorIndex];
	                    			colorIndex++;
	                    		}
	                    		chartDataValues.push(element);
	                    	}
	                    	// FIXME REMOVE
	                    	chartDataValues.sort((function(a, b) {return a.x - b.x;}));
	                    	scope.chartData.push({"key":"tweetData","values":chartDataValues});
	               
	                    });
	                    
	                    // unique author
	                    dataService.getSocialFeedsStats(metadata.dataset.code,  user_token, "iduser", 'first,tweetid', timeFilter,  null, 1, null).success( function(statisticData) {
	                    	console.log("statisticData author", statisticData);
                        	scope.statisticData[1].value=statisticData.d.__count;
                        	refreshStats();

	                    });
		                // tweet/hour
	                    dataService.getSocialFeedsStats(metadata.dataset.code,  user_token, "hour", 'sum,tweetid', timeFilter,  null, 1000, null).success( function(statisticData) {
	                    	console.log("statisticData tweet/hour", statisticData);
	                    	if(parseInt(statisticData.d.__count)>0){
		                    	var totalTweet  = 0;
		                    	for (var j = 0; j < statisticData.d.results.length; j++) {
		                    		totalTweet +=  parseInt(statisticData.d.results[j].count);
								}
		                    	scope.statisticData[2].value= (totalTweet/statisticData.d.__count).toFixed(2);
	                    	}
	                    });
                    };
                }
            );
            
           
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
            //attr.$observe('widgetTitle', function(value) {scope.widgetTitle = value;});

        }

    };
}]);
	
yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_tweet_stats.html",
    '<div class="yucca-widget yucca-stream-tweet-stats">\n' +
    '    <header class="yucca-stream-tweet-stats-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-tweet-stats-content">\n' +
    '        <section class="yucca-stream-tweet-stats-chart" ng-show="panel==\'chart\'"">\n' +
    '            <nvd3 options="options" data="chartData"></nvd3>\n' +
    '            <div class="yucca-stream-tweet-stats-xaxis-label">{{xAxisLabel}}</div>' +
    '        </section>\n' +
    '        <section class="yucca-stream-tweet-stats-data"  ng-show="panel==\'chart\'">\n' +
    '           <h4>Statistics</h4>\n' +
    '           <table class="yucca-stream-tweet-stats-table">\n'+
    '               <tbody>\n' +
    '                   <tr >\n' +
    '                     <td ng-repeat="data in statisticData track by $index">\n'+
    '                         <span class="yucca-stream-tweet-stats-value">{{data.value}}</span><span class="yucca-stream-tweet-stats-label"> {{data.label}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +    
    '        <section class="yucca-stream-tweet-stats-last-tweet" ng-show="panel==\'lastTweet\'" >\n' +
    '           <h4>Last tweets</h4>\n' +
    '           <div class="yucca-stream-tweet-stats-last-tweet-content">\n'+
    '           	<div ng-repeat="tweet in lastTweets track by $index" class="yucca-stream-tweet-stats-tweet">\n'+
    '           		<div class="tweet-message">\n' +
    '           			<div class="tweet-profile-image"><a href="{{tweet.twitterUserLink}}" target="_blank" title="View user on twitter">\n' + 
    '							<img src="https://twitter.com/{{tweet.userScreenName}}/profile_image?size=normal" />\n'+
    '						</a></div>\n' +
    '           			<div class="tweet-author"><a href="{{tweet.twitterUserLink}}" target="_blank" title="View user on twitter">{{tweet.userScreenName}}</a>\n' + 
    '                           <a href="{{tweet.twitterLink}}" target="_blank" title="View on twitter" class="tweet-twitter-link"></a>\n' +
    '                       </div>\n' +
    '           			<div class="tweet-text" ng-bind-html="tweet.getTextPretty"></div>\n' +
    '           		</div>\n' +
    '           		<div class="tweet-info">\n' +
    '		           		<div class="tweet-statistic-icons">\n' +
    '           				<span class="tweet-retweet-icon">{{tweet.retweetCount}}</span>\n' +
    '           				<span  class="tweet-favorite-icon">{{tweet.favoriteCount}}</span>\n' +
    '           			</div>\n' +
    '           			<div class="tweet-date">{{tweet.createdAtFormatted}}</div>\n' +
    '           		</div>\n' +
    '               </div>\n' +
    '           </div>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-tweet-stats-most-retweet" ng-show="panel==\'mostRetweet\'" >\n' +
    '           <h4>Most retweeted</h4>\n' +
    '           <div class="yucca-stream-tweet-stats-most-retweet-content">\n'+
    '           	<div ng-repeat="tweet in mostRetweeted track by $index" class="yucca-stream-tweet-stats-tweet">\n'+
    '           		<div class="tweet-message">\n' +
    '           			<div class="tweet-profile-image"><a href="{{tweet.twitterUserLink}}" target="_blank" title="View user on twitter">\n' + 
    '							<img src="https://twitter.com/{{tweet.userScreenName}}/profile_image?size=normal" />\n'+
    '						</a></div>\n' +
    '           			<div class="tweet-author"><a href="{{tweet.twitterUserLink}}" target="_blank" title="View user on twitter">{{tweet.userScreenName}}</a>\n' + 
    '                           <a href="{{tweet.twitterLink}}" target="_blank" title="View on twitter" class="tweet-twitter-link"></a>\n' +
    '                       </div>\n' +
    '           			<div class="tweet-text" ng-bind-html="tweet.getTextPretty"></div>\n' +
    '           		</div>\n' +
    '           		<div class="tweet-info">\n' +
    '		           		<div class="tweet-statistic-icons">\n' +
    '           				<span class="tweet-retweet-icon">{{tweet.retweetCount}}</span>\n' +
    '           				<span  class="tweet-favorite-icon">{{tweet.favoriteCount}}</span>\n' +
    '           			</div>\n' +
    '           			<div class="tweet-date">{{tweet.createdAtFormatted}}</div>\n' +
    '           		</div>\n' +
    '               </div>\n' +
    '           </div>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-tweet-stats-toolbar">\n' +
    '            <a href ng-click="panel=\'chart\'" ng-class="{active: panel == \'chart\'}">Statistics</a> | <a href ng-click="panel=\'lastTweet\'" ng-class="{active: panel == \'lastTweet\'}">Last Tweet</a> | <a href ng-click="panel=\'mostRetweet\'" ng-class="{active: panel == \'mostRetweet\'}">Most Retweet</a> \n' +
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
