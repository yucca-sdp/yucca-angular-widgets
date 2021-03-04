/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

var Constants = Constants || {};


//Constants.SDP_BASE_RESOURCES_URL = '//localhost:8001';
//Constants.SDP_BASE_RESOURCES_URL = '//int-';
//prova

Constants.API_METADATA_URL = "//api.smartdatanet.it/metadataapi/api/";
Constants.API_DATA_URL = "//api.smartdatanet.it/api/";

//Constants.API_METADATA_SERVICES_URL = Constants.SDP_BASE_URL + "api/proxy/services/";
//Constants.API_METADATA_STREAM_URL = Constants.API_METADATA_SERVICES_URL + "streams/";
//Constants.API_ODATA_URL = Constants.SDP_BASE_URL + "api/proxy/odata/";
//Constants.API_DISCOVERY_URL = Constants.SDP_BASE_URL +"api/proxy/discovery/";


//Constants.SDP_IMAGES_BASE_URL = Constants.SDP_BASE_URL + 'img/' ;

//Constants.SDP_ICONS_STREAM_URL = Constants.SDP_IMAGES_BASE_URL+"icons/stream_icon_white.png";
//Constants.SDP_ICONS_DOMAIN_BASE_URL = Constants.SDP_IMAGES_BASE_URL+"domain/";
//Constants.SDP_STREAM_LOGO_BASE_URL = Constants.SDP_BASE_URL+ "api/proxy/resources/stream/icon/";

Constants.SDP_WEB_SOCKET_BASE_URL = 'wss://stream.smartdatanet.it/wss/';
Constants.WEB_SOCKET_USER = 'guest';
Constants.WEB_SOCKET_SECRET = 'Aekieh6F';
Constants.SDP_WEBSOCKET_CONNECTING = 'Connecting';
Constants.SDP_WEBSOCKET_CONNECTED = 'Connected';
Constants.SDP_WEBSOCKET_NOT_CONNECTED = 'Not Connected';

Constants.LINE_CHART_COLORS = ["#004586","#0084d1", "#d01e2a", "#f37a1f", "#f3c414", "#3d9e00", "#a6d615","#8f69c2","#e4477e"];

Constants.Time = {};
Constants.Time.ONE_MINUTE = 60000;
Constants.Time.ONE_HOUR = 3600000;
Constants.Time.ONE_DAY = 86400000;
Constants.Time.ONE_MONTH = 2678400000;
Constants.Time.ONE_YEAR = 31536000000;

Constants.MAP_TILES_CARTO_DB_POSITRON_URL = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";




/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

angular.module('yucca.plugin', [
 // 'sdp.stream',
  'yucca.widgets',
  'yucca.utils',
  'yucca.filters'
]);

var yuccaWidgetsTemplatesModule = angular.module('yucca.widgets.templates', ['yucca.utils']);
var yuccaWidgetsModule = angular.module('yucca.widgets', ['yucca.widgets.templates', 'yucca.services', 'nvd3','leaflet-directive']);

var yuccaWidgetsFilter  = angular.module('yucca.filters', []);


yuccaWidgetsFilter.filter('safeNumber', function($yuccaHelpers) {
	return function(input, decimal, euro,formatBigNumber) {
		return $yuccaHelpers.render.safeNumber(input, decimal, euro,formatBigNumber);
	};
});

//yuccaWidgetsFilter.filter('safeNumber2', function() {
//	return function(input, decimal, euro) {
//		var result = input;
//		var suffix = "";
//		if(!isNaN(input) ){
//			if(input)
//				input = parseFloat(input);
//			
//			if(isNaN(decimal))
//				decimal=0;
//			if(euro){
//				result = input.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
//				suffix = " \u20AC";
//			}
//			else
//				result = input.toFixed(decimal);
//		}
//		return result +suffix;
//	};
//});

yuccaWidgetsFilter.filter('format_big_number', function() {
	return function(input, lang, decimal) {
		return $yuccaHelpers.render.format_big_number(input, decimal, lang);
	}
});

//yuccaWidgetsFilter.filter('format_big_number', function() {
//	return function(input, lang) {
//		if(!lang)
//			lang = "it";
//		var output = "";
//		if (input) {
//			input=Number.parseFloat(input);
//			if(input<1000)
//				output=input.toFixed(2);
//			else if(input<1000000)
//				output=(input/1000).toFixed(2)+(lang=='it'?" mila":" k");
//			else if(input<1000000000)
//				output=(input/1000000).toFixed(2)+(lang=='it'?" mln":" M");
//			else if(input<1000000000000)
//				output=(input/1000000000).toFixed(2)+(lang=='it'?" mld":" B");
//	    }
//		return (""+output).replace(".", ","); 
//	};
//});

yuccaWidgetsFilter.filter('startFrom', function() {
    return function(input, start) {
    	if(input){    		
    		start = +start; //parse to int
    		return input.slice(start);
    	}
    }
});

yuccaWidgetsFilter.filter('string_ellipse', function () {
    return function (text, length, end) {
    	
    	if(typeof text === "undefined"  || text == null)
    		text = "";
    	
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }
    };
});

/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

var yuccaServices = yuccaServices || angular.module('yucca.services', []);


yuccaServices.factory('metadataService',["$http","$q", function($http, $q) {


	var metadataService = {};
	
	var loadMetadata = function(metadataUrl, user_token, useCache){

		
		var httpBodyRequest = {
			method : 'GET',
			cache: useCache===true,
			url : metadataUrl
		};
		if(user_token && user_token!=null && user_token!=''){
			httpBodyRequest.headers = {'Authorization': "Bearer " + user_token};
			httpBodyRequestwithCredentials = true;
		};

		return $http(httpBodyRequest);
		
	};
	
	metadataService.getStreamMetadata = function(tenant_code, stream_code, smartobject_code, user_token) {
		var URLBaseQuery ="https:" +  Constants.API_METADATA_URL + "detail/"+tenant_code + "/" + smartobject_code + "/"  + stream_code+'?';
		console.debug(URLBaseQuery);
		return loadMetadata(URLBaseQuery, user_token);

	};

	metadataService.getDatasetMetadata = function(tenant_code, dataset_code, user_token, apiMetadataUrl,useCache) {
		
		if(!apiMetadataUrl)
			apiMetadataUrl = Constants.API_METADATA_URL;

		var URLBaseQuery = "https:" + apiMetadataUrl + "detail/"+tenant_code + "/" + dataset_code + '?';
		return loadMetadata(URLBaseQuery, user_token, apiMetadataUrl,useCache);
	};
	
	metadataService.findMetadata = function(tenant_code, domain, search_query, opendata, user_token, apiMetadataUrl,useCache){
		if(!apiMetadataUrl)
			apiMetadataUrl = Constants.API_METADATA_URL;

		var URLBaseQuery = "http:" + apiMetadataUrl + "search/full?end=10";
		
		if(typeof tenant_code!= 'undefined' && tenant_code!=null && tenant_code!='')
			URLBaseQuery += "&tenant=" + tenant_code;
		
		if(typeof domain!= 'undefined' && domain!=null && domain!='')
			URLBaseQuery += "&domain=" + domain;
		
		if(typeof search_query!= 'undefined' && search_query!=null && search_query!='')
			URLBaseQuery += "&q=" + search_query;
		
		if(typeof opendata != 'undefined' && opendata!=null){
			if(opendata)
				URLBaseQuery += "&opendata=true";
			else
				URLBaseQuery += "&opendata=false";
		}
		
		console.debug(URLBaseQuery);
		return loadMetadata(URLBaseQuery, user_token, apiMetadataUrl,useCache);

	};
	
	
	
	return metadataService;
}]);


yuccaServices.factory('dataService',["$http","$q", "$yuccaHelpers" , 
		function($http, $q,  $yuccaHelpers) {
	
	var dataService = {};

	dataService.getLastValue = function(tenant_code, stream_code, smartobject_code, user_token, dataCallback, dataCallbackIndex) {
		var self = this;
		var topic = $yuccaHelpers.stream.wsOutputUrl(tenant_code, stream_code, smartobject_code);
		var currentSettings = {};
		currentSettings.ws_url = Constants.SDP_WEB_SOCKET_BASE_URL;
		currentSettings.user_token = user_token;

		var clientSingleton = WebsocketStompSingleton.getInstance(currentSettings);
		console.debug("clientSingleton",clientSingleton);
		var client = clientSingleton.getWebClient();
		
		clientSingleton.addSubscription(topic, dataCallback,tenant_code, dataCallbackIndex);
		
		
		self.onDispose = function(){
			client.disconnect();
		};
	};
	
	var loadSingleData = function(collection, dataset_code,user_token, internalId, apiDataUrl,useCache){
		if(!apiDataUrl)
			apiDataUrl = Constants.API_DATA_URL;
		
		var dataUrl = "https:" + apiDataUrl +dataset_code+"/"+collection+"('"+internalId+"')?$format=json";

		dataUrl += '&callback=JSON_CALLBACK';
		var httpBodyRequest = {
			method : 'GET',
			cache: useCache===true,
			url : dataUrl
		};

		if(user_token && user_token!=null && user_token!=''){
			httpBodyRequest.headers = {'Authorization': "Bearer " + user_token};
			httpBodyRequestwithCredentials = true;
		};

		console.debug('dataUrl', dataUrl);
		return $http(httpBodyRequest);
	};
	
	var loadData = function(collection, dataset_code,user_token, filter,  skip, top, orderby, apiDataUrl,useCache) {
		
		if(!apiDataUrl)
			apiDataUrl = Constants.API_DATA_URL;

		var dataUrl = "https:" + apiDataUrl +dataset_code+"/"+collection+"?$format=json";
		console.debug("filter", filter);
		if(filter && filter!=null)
			dataUrl += '&$filter='+filter;
		if(skip && skip!=null)
			dataUrl += '&$skip='+skip;
		if(top && top!=null)
			dataUrl += '&$top='+top;
		else
			dataUrl += '&$top=30';
		if(orderby && orderby!=null)
			dataUrl += '&$orderby='+orderby;
		
		dataUrl += '&callback=JSON_CALLBACK';
		var httpBodyRequest = {
			method : 'GET',
			cache: useCache===true,
			url : dataUrl
		};


		
		if(user_token && user_token!=null && user_token!=''){
			httpBodyRequest.headers = {'Authorization': "Bearer " + user_token};
			httpBodyRequestwithCredentials = true;
		};

		console.debug('dataUrl', dataUrl);
		return $http(httpBodyRequest);
	};
	
	var loadDataStats = function(collection, dataset_code, user_token, time_group_by,time_group_operators,time_group_filter,  skip, top, orderby, apiDataUrl, useCache){
		
		console.debug("loadDataStats", collection, dataset_code, user_token, time_group_by,time_group_operators,time_group_filter,  skip, top, orderby );
		if(!apiDataUrl)
			apiDataUrl = Constants.API_DATA_URL;

		var dataUrl = "https:" + apiDataUrl + dataset_code+"/"+collection+"?$format=json";

		if(time_group_by && time_group_by!=null)
			dataUrl += '&timeGroupBy='+time_group_by;
		if(time_group_operators && time_group_operators!=null)
			dataUrl += '&timeGroupOperators='+time_group_operators;
		if(time_group_filter && time_group_filter!=null)
			dataUrl += '&timeGroupFilter='+time_group_filter;
		if(skip && skip!=null)
			dataUrl += '&$skip='+skip;
		if(top && top!=null)
			dataUrl += '&$top='+top;
		else
			dataUrl += '&$top=1000';
		if(orderby && orderby!=null)
			dataUrl += '&$orderby='+orderby;
		
		dataUrl += '&callback=JSON_CALLBACK';
		var httpBodyRequest = {
			method : 'GET',
			cache: useCache===true,
			url : dataUrl
		};


		
		if(user_token && user_token!=null && user_token!=''){
			httpBodyRequest.headers = {'Authorization': "Bearer " + user_token};
			httpBodyRequestwithCredentials = true;
		};

		console.debug('dataUrl', dataUrl);
		return $http(httpBodyRequest);
		
	};
	

	var loadDataGrouped = function(collection, dataset_code, user_token, group_by,group_operators,group_filter,  skip, top, orderby, apiDataUrl, useCache){
		// groupBy=provincia
		// groupOperators=sum,flag_entro_target;sum,flag_entro_doppio_target;
		// operators avg, sum, min, max
		console.debug("loadDataGrouped", collection, dataset_code, user_token, group_by, group_operators, group_filter,  skip, top, orderby );
		
		if(!apiDataUrl)
			apiDataUrl = Constants.API_DATA_URL;

		var dataUrl = "https:" + apiDataUrl +dataset_code+"/"+collection+"?$format=json";

		if(group_by && group_by!=null)
			dataUrl += '&groupBy='+group_by;
		if(group_operators && group_operators!=null)
			dataUrl += '&groupOperators='+group_operators;
		if(group_filter && group_filter!=null)
			dataUrl += '&groupFilter='+group_filter;
		if(skip && skip!=null)
			dataUrl += '&$skip='+skip;
		if(top && top!=null)
			dataUrl += '&$top='+top;
		else
			dataUrl += '&$top=1000';
		if(orderby && orderby!=null)
			dataUrl += '&$orderby='+orderby;
		
		dataUrl += '&callback=JSON_CALLBACK';
		var httpBodyRequest = {
			method : 'GET',
			cache: useCache===true,
			url : dataUrl
		};


		
		if(user_token && user_token!=null && user_token!=''){
			httpBodyRequest.headers = {'Authorization': "Bearer " + user_token};
			httpBodyRequestwithCredentials = true;
		};

		console.debug('dataUrl', dataUrl);
		return $http(httpBodyRequest);
		
	};
	
	dataService.getDataEntitiesStats = function(dataset_code, request_token, group_by,group_operators,group_filter,  skip, top, orderby, apiDataUrl,useCache) {
		return loadDataGrouped('DataEntitiesStats', dataset_code, request_token, group_by,group_operators,group_filter,  skip, top, orderby, apiDataUrl,useCache);
	};
	
	dataService.getMeasuresStats = function(dataset_code, request_token, time_group_by,time_group_operators,time_group_filter,  skip, top, orderby, apiDataUrl,useCache) {
		return loadDataStats('MeasuresStats', dataset_code, request_token, time_group_by,time_group_operators,time_group_filter,  skip, top, orderby, apiDataUrl, useCache);
	};
	
	dataService.getSocialFeeds = function(dataset_code,user_token,filter,  skip, top, orderby, apiDataUrl,useCache) {
		return loadData('SocialFeeds', dataset_code,user_token, filter,  skip, top, orderby, apiDataUrl, useCache);
	};
	
	dataService.getMeasures = function(dataset_code,user_token,filter,  skip, top, orderby, apiDataUrl,useCache) {
		return loadData('Measures', dataset_code,user_token,filter,  skip, top, orderby, apiDataUrl, useCache);
	};
	
	dataService.getDataEntities = function(dataset_code,user_token,filter,  skip, top, orderby, apiDataUrl,useCache) {
		var collection = 'DataEntities';
		if($yuccaHelpers.utils.startsWith(dataset_code, 'ds_'))
			collection = 'Measures';
		return loadData(collection, dataset_code,user_token,filter,  skip, top, orderby, apiDataUrl, useCache);
	};
	
	dataService.getSocialFeedsStats = function(dataset_code, user_token, time_group_by,time_group_operators,time_group_filter,  skip, top, orderby, apiDataUrl,useCache) {
		return loadDataStats('SocialFeedsStats', dataset_code, user_token, time_group_by,time_group_operators,time_group_filter,  skip, top, orderby, apiDataUrl, useCache);
	};

	
	
	dataService.getBinariesData = function(url) {
		return $http.get(url+"?$format=json");
	};
	
	dataService.getMultipleDataEnties = function(dataset_code,user_token,filter, orderby, maxData, apiDataUrl,useCache) {
		if(maxData>10000) 
			maxData = 10000;
		var numOfLoop = parseInt(maxData/1000)+1;
		console.debug("numOfLoop", numOfLoop);
		
		var httpCalls = [];
		var top  = 1000;
		for (var i = 0; i< numOfLoop; i++) {
			httpCalls.push(dataService.getDataEntities(dataset_code,user_token,filter,  i*top, top, orderby, apiDataUrl,useCache));
			
		}
		return $q.all(httpCalls);
	};
	
	dataService.getSingleSocialFeeds = function(dataset_code,user_token,internalId, apiDataUrl,useCache) {
		return loadSingleData('SocialFeeds', dataset_code,user_token,internalId, apiDataUrl,useCache);
	};
	
	dataService.getSingleMeasures = function(dataset_code,user_token,internalId, apiDataUrl,useCache) {
		return loadSingleData('Measures', dataset_code,user_token,internalId, apiDataUrl,useCache);
	};
	
	dataService.getSingleDataEntities = function(dataset_code,user_token, internalId, apiDataUrl,useCache) {
		return loadSingleData('DataEntities', dataset_code,user_token,internalId, apiDataUrl,useCache);
	};
	
	
	

/*
	dataService.getStatisticData = function(code,user_token, time_group_by, time_group_operators,
		time_group_filter,  skip, top, orderby, apiDataUrl,useCache) {
		
		var statisticDataUrl = "https:" + Constants.API_ODATA_URL+code+"/MeasuresStats?$format=json";
		if(time_group_by && time_group_by!=null)
			statisticDataUrl += '&time_group_by='+time_group_by;
		if(time_group_operators && time_group_operators!=null)
			statisticDataUrl += '&time_group_operators='+time_group_operators;


		if(time_group_filter && time_group_filter!=null)
			statisticDataUrl += '&time_group_filter='+time_group_filter;
		if(skip && skip!=null)
			statisticDataUrl += '&$skip='+skip;
		if(top && top!=null)
			statisticDataUrl += '&$top='+top;
		else
			statisticDataUrl += '&$top=150';
		if(orderby && orderby!=null)
			statisticDataUrl += '&$orderby='+orderby;
		
		statisticDataUrl += '&callback=JSON_CALLBACK';
		var httpBodyRequest = {
			method : 'JSONP',
			url : statisticDataUrl
		};


		
		if(user_token && user_token!=null && user_token!=''){
			httpBodyRequest.headers = {'Authorization': "Bearer " + user_token};
			httpBodyRequestwithCredentials = true;
		};

		console.log('statisticDataUrl in getStreamDataMultiToken', statisticDataUrl);
		return $http(httpBodyRequest);
	}; */

	return dataService;
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

var yuccaUtilsModule = angular.module('yucca.utils', []);

yuccaUtilsModule.factory('$yuccaHelpers', [function () {
	var self = {
			"stream":{
				wsOutputUrl : function(tenant_code, stream_code, smartobject_code) {
					var smartobject_stream = "";

					if (stream_code && stream_code!=null && smartobject_code && smartobject_code!=null)
						smartobject_stream = smartobject_code + "_" + stream_code;
					else if (smartobject_code && smartobject_code!=null)
						smartobject_stream = smartobject_code;
					else 
						smartobject_stream += stream.stream_code;

					var result = "/topic/output." + tenant_code + "." + smartobject_stream;
					return result;
				},
			},
			"attrs":{
				num : function(value, min, max, defaultValue){
					console.log("num", value, min, max, defaultValue);
					var result = value;
//					if(isNaN(value) || value == null || value == "" ||
//					(typeof min != 'undefined' && min !=null && value<min) || 
//					(typeof max != 'undefined' && max !=null && value>max))
//					result = defaultValue;
					if(isNaN(value) || value == null || value == "" )
						result = defaultValue;
					if(typeof min != 'undefined' && min !=null && result<min)
						result = min;
					if(typeof max != 'undefined' && max !=null && result>max)
						result = max;

					console.log("result", result);
					return result;
				},
				safe: function(value, defaultValue){
					var result = value;
					if(typeof value == 'undefined' || value == null || value == '')
						result = defaultValue;
					else if(value === 'false')
						result = false;
					else if(value === 'true')
						result = true;
					return result;
				}
			},
			"utils":{
				mongoDate2millis : function(dateIn) {
					var time = null;
					if(dateIn){
						//var offset = new Date().getTimezoneOffset();
						var parts = /\/Date\((-?\d+)([+-]\d{4})?.*/.exec(dateIn);

						if (parts[2] == undefined)
							parts[2] = 0;
						var p  = parseInt(parts[2]);
						time = new Date(parts[1] - (p * 60000));
					}
					return time;
				},
				mongoDate2string : function(dateIn) {
					return this.formatDateFromMillis(this.mongoDate2millis(dateIn).getTime());
				},
				isEmpty: function(input){
					return (typeof input == 'undefined' || input==null );
				},
				startsWith: function(str, word) {
					return str.lastIndexOf(word, 0) === 0;
				},
				rgb2Hex: function(rgb){
					if(rgb.indexOf("(")>=0)
						rgb = rgb.match(/\(([^)]+)\)/)[1];
					var component = rgb.split(",");
					return "#" + ((1 << 24) + (parseInt(component[0]) << 16) + (parseInt(component[1]) << 8) + parseInt(component[2])).toString(16).slice(1);
				},
				hex2Rgb: function(hex){
					if(hex.charAt(0)=="#") 
						hex = hex.substring(1,7);
					var r = parseInt((hex).substring(0,2),16);
					var g = parseInt((hex).substring(2,4),16);
					var b = parseInt((hex).substring(4,6),16);
					return r+","+g +","+b;
				},
				hex2Color: function(hex){
					if(hex.charAt(0)=="#") 
						hex = hex.substring(1,7);
					var r = parseInt((hex).substring(0,2),16);
					var g = parseInt((hex).substring(2,4),16);
					var b = parseInt((hex).substring(4,6),16);
					return {r:r, g:g, b:b, opacity: 16};
				},
				formatDateFromMillis: function(millis){
					var formattedDate = "";
					if(millis){
						var date   = new Date(millis);
						var d = date.getDate();
						var m = date.getMonth() + 1;
						var y = date.getFullYear();
						var hh = date.getHours();
						var mm = date.getMinutes();
						formattedDate = '' + (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y + ' ' + (hh <= 9 ? '0' +hh : hh) + ":" +  (mm <= 9 ? '0' + mm : mm);
					}
					return formattedDate;
				},
				lZero: function(value){
					var result = "00";
					if(!isNaN(value)){
						result= (value <= 9 ? '0' + value : value);
					}
					return result;

				},
				formatDate: function(millis, options,lang){
					var result = millis;
					if(millis){
						if(!lang)
							lang = "it-IT";
						else if(lang=='en')
							lang= "en-EN";

						//var options = {};
//						if(weekday) options.weekday=weekday;
//						if(year) options.year=year;
//						if(month) options.month=month;
//						if(day) options.day=day;
//						if(hour) options.hour=hour;
//						if(minute) options.minute=minute;
//						if(second) options.second=second;

						result = new Date(millis).toLocaleDateString(lang, options);

					}
					return result;

				},
				formatStreamDate: function(millis, includeTime){
					var formattedDate = "";
					if(millis){
						var date   = new Date(millis);
						var d = date.getDate();
						var m = date.getMonth() + 1;
						var y = date.getFullYear();
						var hh = date.getHours();
						var mm = date.getMinutes();
						var ss = date.getSeconds();

						formattedDate = '' + y + '/' + (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d);
						if(includeTime)
							formattedDate += ' ' + (hh <= 9 ? '0' +hh : hh) + ":" +  (mm <= 9 ? '0' + mm : mm) + ":" + (ss <= 9 ? '0' + ss : ss);
					}

					return formattedDate;		    			
				},
				isTouchDevice : function () {
					return ("ontouchstart" in document.documentElement);
				},
				startsWith: function(str, word) {
				    return str.lastIndexOf(word, 0) === 0;
				}

			},
			"odata": {
				decodeDateFilter: function(attr){
					console.log("attr", attr);
					var minDateFormatted = null;
					var maxDateFormatted = null;
					var minDateMillis = null;
					var maxDateMillis = null;
					if(attr.timeRange!=null && attr.timeRange!=''){
						var minDate =  new Date();
						var maxDate =  new Date();

						switch (attr.timeRange) {
						case "today":
							minDate.setHours(0,0,0,0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "yesterday":
							minDate.setDate(minDate.getDate()-1);
							minDate.setHours(0,0,0,0);
							maxDate.setDate(maxDate.getDate()-1);
							maxDate.setHours(23,59,59,999);						
							break;
						case "this_month":
							minDate =  new Date(minDate.getFullYear(), minDate.getMonth(), 1);
							maxDate =  new Date(minDate.getFullYear(), minDate.getMonth()+1, 0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "last_month":
							minDate =  new Date(minDate.getFullYear(), minDate.getMonth()-1, 1);
							maxDate =  new Date(minDate.getFullYear(), maxDate.getMonth(), 0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "this_year":
							minDate =  new Date(minDate.getFullYear(), 0, 1);
							maxDate =  new Date(minDate.getFullYear()+1, 0, 0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "last_year":
							minDate =  new Date(minDate.getFullYear()-1, 0, 1);
							maxDate =  new Date(maxDate.getFullYear(), 0, 0);
							maxDate.setHours(23,59,59,999);						
							break;
						default: // today
							minDate.setHours(0,0,0,0);
						maxDate.setHours(23,59,59,999);						
						break;
						}
						minDateFormatted = this.formatData(minDate.getTime() - (minDate.getTimezoneOffset() * 60000));
						maxDateFormatted = this.formatData(maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000));
						minDateMillis = minDate.getTime() - (minDate.getTimezoneOffset() * 60000);
						maxDateMillis = maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000);

					}
					else if(attr.timeMaxDate!=null && attr.timeMaxDate!='' && attr.timeMinDate!=null && attr.timeMinDate!=''){
						minDateMillis = new Date(attr.timeMinDate).getTime();
						maxDateMillis = new Date(attr.timeMaxDate).getTime();
						minDateFormatted = this.formatData(minDateMillis - (new Date().getTimezoneOffset() * 60000));
						maxDateFormatted = this.formatData(maxDateMillis - (new Date().getTimezoneOffset() * 60000));
					}
					else{
						var minDate =  new Date();
						var maxDate =  new Date();
						minDate.setHours(0,0,0,0);
						maxDate.setHours(23,59,59,999);		
						minDateFormatted = this.formatData(minDate.getTime() - (minDate.getTimezoneOffset() * 60000));
						maxDateFormatted = this.formatData(maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000));
						minDateMillis = minDate.getTime() - (minDate.getTimezoneOffset() * 60000);
						maxDateMillis = maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000);
					}

					return {
						"timeFilter": 'time%20ge%20datetimeoffset%27'+minDateFormatted+'%27%20and%20time%20lt%20datetimeoffset%27'+maxDateFormatted+'%27',
						"minDateMillis": minDateMillis,
						"maxDateMillis": maxDateMillis
					};
				},
				formatData: function(millis){
					var formattedDate = "";
					if(millis){
						var date   = new Date(millis);
						var d = date.getDate();
						var m = date.getMonth() + 1;
						var y = date.getFullYear();
						var hh = date.getHours();
						var mm = date.getMinutes();
						var ss = date.getSeconds();

						var timezone = "02:00";
						formattedDate = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + 'T' + (hh <= 9 ? '0' +hh : hh) + ":" +  (mm <= 9 ? '0' + mm : mm) + ":" + (ss <= 9 ? '0' + ss : ss);
						formattedDate += '+' + timezone;
					}

					return formattedDate;		    			
				},
				extractTimeGroupFilter : function(minDateMillis, maxDateMillis){
					var timeGroupFilter = 'year';
					if(minDateMillis>0 && maxDateMillis> minDateMillis){
						var delta = maxDateMillis-minDateMillis;
						if(delta < Constants.Time.ONE_DAY)
							timeGroupFilter = 'hour_dayofmonth_month_year';
						else if(delta < Constants.Time.ONE_MONTH)
							timeGroupFilter = 'dayofmonth_month_year';
						else if(delta < Constants.Time.ONE_YEAR)
							timeGroupFilter = 'month_year';
					}
					return timeGroupFilter;
				},
				timeGroup2resultKey: function(timeGroupBy){
					var result  =  'year';
					if(timeGroupBy == 'hour_dayofmonth_month_year')
						result = 'hour';
					else if(timeGroupBy == 'dayofmonth_month_year')
						result = 'dayofmonth';
					else if(timeGroupBy == 'month_year')
						result = 'month';
					return result;
				},
				timeGroupLabel: function(timeGroupBy){
					var result  =  'Year';
					if(timeGroupBy == 'hour_dayofmonth_month_year')
						result = 'Hour of the day';
					else if(timeGroupBy == 'dayofmonth_month_year')
						result = 'Day of the month';
					else if(timeGroupBy == 'month_year')
						result = 'Month of the year';
					return result;
				}

			}, 
			"csv": {
				downloadCSV : function(csv, filename) {
					var csvFile = new Blob([csv], {type: "text/csv"});
					var downloadLink = document.createElement("a");
					// File name
					downloadLink.download = filename;
					// Create a link to the file
					downloadLink.href = window.URL.createObjectURL(csvFile);
					// Hide download link
					downloadLink.style.display = "none";
					// Add the link to DOM
					document.body.appendChild(downloadLink);
					// Click download link
					downloadLink.click();
					document.body.removeChild(downloadLink);
				},
				prepareKeyValue: function(column, label, data){
					return this.prepareSeriesKeyValue(column, [{label: label, values:data}]);
				},
				prepareSeriesKeyValue: function(column, data){
					console.log(data);
					var csv = column;
					if(data){
						for (var j = 0; j < data.length; j++)
							csv  += ";" + data[j].label;
						csv  += "\r\n";
						for (var i = 0; i < data[0].values.length; i++) {
							csv += data[0].values[i].label;
							for (var j = 0; j < data.length; j++){
								if(data[j].values[i].value && !isNaN(data[j].values[i].value))
									csv += ";" + parseFloat(data[j].values[i].value).toLocaleString();
								else
									csv += ";" + data[j].values[i].value;
							}
							csv  += "\r\n";
						}
					}
					return csv;
//					var csv = column + ";";
//					if(data && data[0].values){
//					csv  += data[0].label + "\r\n";
//					for (var i = 0; i < data[0].values.length; i++) {
//					csv += data[0].values[i].label +";" + data[0].values[i].value + "\r\n"; 
//					}
//					}
//					return csv;
				},
				prepareSeriesXY: function(column, data){
					var csv = column;
					if(data){
						for (var j = 0; j < data.length; j++)
							csv  += ";" + data[j].label;
						csv  += "\r\n";
						for (var j = 0; j < data.length; j++){
							csv += data[j].values[0].x;
							for (var i = 0; i < data[j].values.length; i++) {
								csv += ";" + data[j].values[i].y;
							}
							csv  += "\r\n";
						}
					}
					return csv;
				},

			},
			"statistic": {
				timeAggregation : function(data){
					result = [];
					var labelFormat = "%H:%M";
					var dataValues = [];

					if(data!=null && data.length>1){
						var maxTime = data[0][0].getTime();
						var minTime = data[data.length-1][0].getTime();
						var elapsed = maxTime-minTime;
						var segment  = Constants.Time.ONE_YEAR;
						if(elapsed<Constants.Time.ONE_MINUTE){
							segment = Constants.Time.ONE_MINUTE/6;
							labelFormat = "%s s";
						}
						else if(elapsed<Constants.Time.ONE_HOUR){
							segment = Constants.Time.ONE_HOUR/6;
							labelFormat = "%m min";
						}
						else if(elapsed<Constants.Time.ONE_DAY){
							segment = Constants.Time.ONE_HOUR/12;
							labelFormat = "%H:%M";
						}
						else if(elapsed<Constants.Time.ONE_MONTH){
							segment = Constants.Time.ONE_MONTH/15;
							labelFormat = "%d/%M";
						}
						else if(elapsed<Constants.Time.ONE_YEAR){
							segment = Constants.Time.ONE_YEAR/12;
							labelFormat = "%b/%y";
						}
						segment = elapsed/10;
						var time = minTime;
						var dataCounter = 0;

						var dataList = [];
						for(var i=data.length-1;i>=0; i--){

							if(data[i][0].getTime()<time+segment){
								dataList.push(data[i][1]);
								dataCounter++;
							}
							else{
								result.push({"label":time,"value":dataCounter});
								time += segment;//data[i][0].getTime();
								dataValues.push(dataList);
								dataCounter = 0;
								dataList = [];
							}
						}

					}

					console.debug("in", data);
					console.debug("out", result);
					console.debug("dataValues", dataValues);
					return {"data":result, "labelFormat": labelFormat, "dataValues": dataValues};
				}
			},
			"d3color":{

				getRange:function(mainChartColor){
					var mainRangeColor = d3.scale.linear().domain([1,10]).range(["white", mainChartColor,"black"]);
					return [mainRangeColor(3),mainRangeColor(7)];
				},
				brighter: function(colorHex, k) {
					var brighter = 1 / 0.7;
					var  color = self.utils.hex2Color(colorHex);
					k = k == null ? brighter : Math.pow(brighter, k);
					return self.utils.rgb2Hex("(" + color.r * k + "," + color.g * k + "," + color.b * k + ")");
				},
				darker: function(colorHex, k) {
					var darker = 0.7;
					var  color = self.utils.hex2Color(colorHex);
					k = k == null ? darker : Math.pow(darker, k);
					return self.utils.rgb2Hex("(" + color.r * k + "," + color.g * k + "," + color.b * k + ")");
				},
			},
			"render": {
//				noExponent: function(input){
//				var data= String(input).split(/[eE]/);
//				if(data.length== 1) return data[0]; 

//				var  z= '', sign= this<0? '-':'',
//				str= data[0].replace('.', ''),
//				mag= Number(data[1])+ 1;

//				if(mag<0){
//				z= sign + '0.';
//				while(mag++) z += '0';
//				return z + str.replace(/^\-/,'');
//				}
//				mag -= str.length;  
//				while(mag--) z += '0';
//				return str + z;
//				},
				safeDate: function(input,options){
					var result = input;
					if(input && self.utils.startsWith(input,"/Date(") ){
						var millis = self.utils.mongoDate2millis(input);
						result = self.utils.formatDate(millis, options);
					}
					return result;
				},
				safeNumber : function(input, decimal, isEuro,formatBigNumber, textAfter) {

					var result = input;
					if(!isNaN(input) ){
						if(input=== parseInt(input, 10))
							input = parseInt(input);
						else
							input = parseFloat(input);
						if(isEuro){
							result = this.formatEuro(input, decimal,formatBigNumber);
						}
						else{
							if(isNaN(decimal)){
								if(Math.abs(input)>100)
									decimal=0;
								else if(Math.abs(input)<1){
									decimal= -1*Math.log10(input) +1;
									if(decimal < 0 || decimal==Infinity)
										decimal = 0;
									else if(decimal>20)
										decimal =20;
								}
								else
									decimal = 2;
							}
							result = parseFloat(input).toFixed(decimal);
							if(formatBigNumber){
								result = this.format_big_number(result, decimal);
							}
							else
								if(result>3000) // to avoid year written like 2.019
									result = new Number(result).toLocaleString();
						}
					}
					if(textAfter)
						result += ' ' + textAfter;
					return result;
				},
				format_big_number:function(input, decimal, lang) {
					var output = "";
					if(!decimal)
						decimal = 2;
					if (input) {
						output = this.formatBigNumberValue(input, decimal);
					}
					return (""+output).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
				}, 
				formatBigNumberValue: function(input,decimal, lang){
					if(!lang)
						lang = "it";
					//input=Math.trunc(input);
					//console.log("input",input);
					if(input<1000)
						output=parseFloat(input).toFixed(decimal);
					else if(input<1000000)
						output=(input/1000).toFixed(decimal)+(lang=='it'?" mila":" k");
					else if(input<1000000000)
						output=(input/1000000).toFixed(decimal)+(lang=='it'?" mln":" M");
					else 
						output=(input/1000000000).toFixed(decimal).toLocaleString()+(lang=='it'?" mld":" B");
					return output;
				},
				isFloat : function(n){
					return Number(n) === n && n % 1 !== 0;
				},
				completeTweet : function(originalTweet, createdAtFormatted){
					var completeTweet = originalTweet;
					completeTweet.getTextPretty = this.prettifyTwitterMessage(originalTweet.getText);
					completeTweet.createdAtFormatted =  createdAtFormatted;
					completeTweet.twitterLink = 'https://twitter.com/' + originalTweet.userScreenName + '/status/' + originalTweet.tweetid;
					completeTweet.twitterUserLink = 'https://twitter.com/' + originalTweet.userScreenName;
					return completeTweet;
				},
				safeTags : function (stringIn) {
					var outString = "";
					if((typeof stringIn != "undefined") && stringIn!=null){
						var typeStringIN = typeof stringIn;
						if (typeStringIN == "string")
							outString = stringIn.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
						else 
							outString = stringIn;
					}
					return outString;   

				},

				prettifyTwitterUser : function(stringIn){
					var outString = "";
					if((typeof stringIn != "undefined") && stringIn!=null){
						var typeStringIN = typeof stringIn;
						if (typeStringIN == "string")
							outString = stringIn.replace(/(^|\W)(@[a-z\d][\w-]*)/ig, '$1<span class="tweet-user">$2</span>');
						else 
							outString = stringIn;
					}
					return outString;
				},
				prettifyTwitterHashtag : function(stringIn){
					var outString = "";
					if((typeof stringIn != "undefined") && stringIn!=null){
						var typeStringIN = typeof stringIn;
						if (typeStringIN == "string")
							outString = stringIn.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '$1<span class="tweet-hashtag">$2</span>');
						else 
							outString = stringIn;
					}
					return outString;
				},
				linkify: function(stringIn) {
					var outString = "";
					if((typeof stringIn != "undefined") && stringIn!=null){
						var typeStringIN = typeof stringIn;
						if (typeStringIN == "string"){
							var  replacePattern1, replacePattern2, replacePattern3;

							//URLs starting with http://, https://, or ftp://
							replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
							outString = stringIn.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

							//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
							replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
							outString = outString.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

							//Change email addresses to mailto:: links.
							replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
							outString = outString.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
						} else 
							outString = stringIn;
					}

					return outString;
				},
				prettifyTwitterMessage: function(stringIn){
					var pretty  = this.safeTags(stringIn);
					pretty = this.linkify(pretty);
					pretty = this.prettifyTwitterHashtag(pretty);
					pretty = this.prettifyTwitterUser(pretty);
					return pretty;
				},
				safeColors : function(numOfColors, inputColors, mainColor,kLuminance){
					var colors = new Array();

					if(inputColors && inputColors!=null && inputColors.length>0){
						var sIndex = 0;
						for(var k=0; k<numOfColors; k++){
							colors.push(inputColors[sIndex]);
							sIndex++;
							if(sIndex==inputColors.length)
								sIndex=0;
						}
					}
					else if(mainColor){
						//var startColor = self.d3color.darker(mainColor);
						//var endColor = self.d3color.brighter(mainColor);
						var startColor = this.colorLuminance(mainColor, -0.6);
						var endColor = this.colorLuminance(mainColor, 0.6);
						var scale = d3.scale.linear().range([startColor, endColor]).domain([0, numOfColors]);//.interpolate(d3.interpolateRgb.gamma(1.9));
						colors = d3.range(numOfColors).map(function(d) {return scale(d)});

						//colors.push({max: numOfColors+1, color: d3.scale.linear().domain([1,numOfColors+1]).clamp(true).range(self.d3color.getRange(numOfColors))});
//						console.log("cccd3", colors)
//						var colors2 = new Array();
//						if(!kLuminance)
//						kLuminance = .9
//						var delta = 2/numOfColors;
//						for(var k=0; k<numOfColors; k++){
//						colors2.push(this.colorLuminance(mainColor, -kLuminance+k*delta));
//						}
//						console.log("ccccy", colors2);
					}
					return colors;
				},
				hex2RgbaColor: function(hex,opacity){
					hex = hex.replace('#','');
					r = parseInt(hex.substring(0,2), 16);
					g = parseInt(hex.substring(2,4), 16);
					b = parseInt(hex.substring(4,6), 16);

					result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
					return result;
				},
				colorLuminance: function(hex, lum) {
					// validate hex string
					hex = String(hex).replace(/[^0-9a-f]/gi, '');
					if (hex.length < 6) {
						hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
					}
					lum = lum || 0;

					// convert to decimal and change luminosity
					var rgb = "#", c, i;
					for (i = 0; i < 3; i++) {
						c = parseInt(hex.substr(i*2,2), 16);
						c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
						rgb += ("00"+c).substr(c.length);
					}

					return rgb;
				},
				formatEuro : function(input, decimal, bigNumber) {
					var result = input;
					if(typeof decimal == 'undefined' || isNaN(decimal))
						decimal = 2;
					var suffix = " \u20AC";

					if(!isNaN(input) ){
						if(bigNumber)
							result = this.formatBigNumberValue(input, decimal);
						else
							result = parseFloat(input).toFixed(decimal).toString();
					}
					return result.toString().replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") +suffix;

				},
				widgetSize : function(el, $timeout){
					var parentStyle = window.getComputedStyle(el.parentElement);
					var paddingLeft= parseInt(parentStyle["paddingLeft"].replace("px",""));
					var paddingRight= parseInt(parentStyle["paddingRight"].replace("px",""));
					var paddingTop= parseInt(parentStyle["paddingTop"].replace("px",""));
					var paddingBottom= parseInt(parentStyle["paddingBottom"].replace("px",""));

					var paddingWidth = 24 + paddingLeft + paddingRight;
					var paddingheight = 24 + paddingTop + paddingBottom;
					return {w:el.parentElement.clientWidth - paddingWidth, h:el.parentElement.clientHeight }

				}
			},
			"data":{ 
				aggregationSeriesKeyValue: function(rows, valueColumns, groupByColumn, chartColors,mainChartColor,seriesDescriptionColumn){
					console.log("aggregationSeriesKeyValue", valueColumns, groupByColumn);
//					[{
//					"key": "Arrivi totali",
//					"values": [
//					{
//					"key": "BI",
//					"label": "BI",
//					"value": 962010,
//					"color": "#0b001a"
//					},
//					{
//					"key": "NO",
//					"label": "NO",
//					"value": 5233298,
//					"color": "#250059"
//					},
//					...



					var dataMap = {};
					var descriptionsMap = {};
					var sliceCount = 0;

					if(!valueColumns || valueColumns==null || valueColumns.lenght==0)
						valueColumns = ['empty'];

					var max = {};
					var min = {};


					for(var j=0; j<rows.length; j++){
						if(!dataMap[rows[j][groupByColumn]] ){
							dataMap[rows[j][groupByColumn]]  = Array(valueColumns.length).fill(0);
							if(seriesDescriptionColumn)
								descriptionsMap[rows[j][groupByColumn]] = rows[j][seriesDescriptionColumn.key];
							sliceCount++;
						}
						for (var i = 0; i < valueColumns.length; i++) {
							if(valueColumns[i].countingMode=='sum')
								dataMap[rows[j][groupByColumn]][i] += parseFloat(rows[j][valueColumns[i].key]);
							else if(valueColumns[i].countingMode=='max'){
								if(!max[valueColumns[i].key])
									max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								else if(max[valueColumns[i].key]>parseFloat(rows[j][valueColumns[i].key]))
									max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
							}
							else if(valueColumns[i].countingMode=='min'){
								if(!min[valueColumns[i].key])
									min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								else if(min[valueColumns[i].key]>parseFloat(rows[j][valueColumns[i].key]))
									min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
							}
							else
								dataMap[rows[j][groupByColumn]][i]++;
						}
					}

					console.log("dentro", dataMap);
					var colors = self.render.safeColors(sliceCount, chartColors,mainChartColor);
					console.log("colors", colors);
					var chartData  = new Array();
					for (var i = 0; i < valueColumns.length; i++) {
						var serie = angular.copy(valueColumns[i]);
						serie.realKey = serie.key;
						serie.key = serie.label;
						serie.values = new Array();
						chartData.push(serie);
						//chartData.push({"key":valueColumns[i].label, "values":new Array()});
						var sIndex = 0;
						for (var key in dataMap) {
							if (dataMap.hasOwnProperty(key)) {
								var d = {"key": key,"label": key, "value": dataMap[key][i]};
								if(colors  && colors.length>0 && typeof serie.color == 'undefined'){
									d.color=colors[sIndex];
								}	
								if(seriesDescriptionColumn){
									d.description = descriptionsMap[key];
								}

//								if(colors.length>0)
//								d.color=colors[sIndex];
								chartData[i].values.push(d);
								sIndex++;
							}
						} 
					}
					return chartData;
				},
				aggregationSeriesKeyValue: function(rows, valueColumns, groupByColumn, chartColors,mainChartColor,seriesDescriptionColumn){
					console.log("aggregationSeriesKeyValue", valueColumns, groupByColumn);
//					[{
//					"key": "Arrivi totali",
//					"values": [
//					{
//					"key": "BI",
//					"label": "BI",
//					"value": 962010,
//					"color": "#0b001a"
//					},
//					{
//					"key": "NO",
//					"label": "NO",
//					"value": 5233298,
//					"color": "#250059"
//					},
//					...



					var dataMap = {};
					var descriptionsMap = {};
					var sliceCount = 0;

					if(!valueColumns || valueColumns==null || valueColumns.lenght==0)
						valueColumns = ['empty'];

					var max = {};
					var min = {};


					for(var j=0; j<rows.length; j++){
						if(!dataMap[rows[j][groupByColumn]] ){
							dataMap[rows[j][groupByColumn]]  = Array(valueColumns.length).fill(0);
							if(seriesDescriptionColumn)
								descriptionsMap[rows[j][groupByColumn]] = rows[j][seriesDescriptionColumn.key];
							sliceCount++;
						}
						for (var i = 0; i < valueColumns.length; i++) {
							if(valueColumns[i].countingMode=='sum')
								dataMap[rows[j][groupByColumn]][i] += parseFloat(rows[j][valueColumns[i].key]);
							else if(valueColumns[i].countingMode=='max'){
								if(!max[valueColumns[i].key])
									max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								else if(max[valueColumns[i].key]>parseFloat(rows[j][valueColumns[i].key]))
									max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
							}
							else if(valueColumns[i].countingMode=='min'){
								if(!min[valueColumns[i].key])
									min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								else if(min[valueColumns[i].key]>parseFloat(rows[j][valueColumns[i].key]))
									min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
								dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
							}
							else
								dataMap[rows[j][groupByColumn]][i]++;
						}
					}

					console.log("dentro", dataMap);
					var colors = self.render.safeColors(sliceCount, chartColors,mainChartColor);
					console.log("colors", colors);
					var chartData  = new Array();
					for (var i = 0; i < valueColumns.length; i++) {
						var serie = angular.copy(valueColumns[i]);
						serie.realKey = serie.key;
						serie.key = serie.label;
						serie.values = new Array();
						chartData.push(serie);
						//chartData.push({"key":valueColumns[i].label, "values":new Array()});
						var sIndex = 0;
						for (var key in dataMap) {
							if (dataMap.hasOwnProperty(key)) {
								var d = {"key": key,"label": key, "value": dataMap[key][i]};
								if(colors  && colors.length>0 && typeof serie.color == 'undefined'){
									d.color=colors[sIndex];
								}	
								if(seriesDescriptionColumn){
									d.description = descriptionsMap[key];
								}

//								if(colors.length>0)
//								d.color=colors[sIndex];
								chartData[i].values.push(d);
								sIndex++;
							}
						} 
					}
					return chartData;
				},
				
				noaggregationBoxplotValueKey:function(rows, valueColumns, groupByColumn, chartColors,mainChartColor){
					console.log("noaggregationBoxplotValueKey", valueColumns, groupByColumn);
					console.log("valueColumns", rows);
					var sliceCount = 0;
					var dataMap = {};
					for(var j=0; j<rows.length; j++){
						if(!dataMap[rows[j][groupByColumn]] ){
							dataMap[rows[j][groupByColumn]]  = new Array();						
							sliceCount++;
						}
						dataMap[rows[j][groupByColumn]].push(rows[j][valueColumns[0].key]);
						console.log("log_no_aggragation", rows[j][valueColumns[0].key]);
					}
					console.log("data_map",dataMap);
					return rows;
				},

				aggregationBoxplotValueKey: function(rows, valueColumns, groupByColumn, chartColors,mainChartColor){
					console.log("aggregationBoxplotValueKey", valueColumns, groupByColumn);
					var dataMap = {};
					var sliceCount = 0;

					rows.sort( function( a, b ) {
						if ( a[valueColumns[0].key] < b[valueColumns[0].key] ){
							return -1;
						}
						if ( a[valueColumns[0].key] > b[valueColumns[0].key] ){
							return 1;
						}
						return 0;
					} );

					for(var j=0; j<rows.length; j++){
						if(!dataMap[rows[j][groupByColumn]] ){
							dataMap[rows[j][groupByColumn]]  = new Array();						
							sliceCount++;
						}

						dataMap[rows[j][groupByColumn]].push(rows[j][valueColumns[0].key]);
					}
					
					console.log("dentro", dataMap);
					
					var chartData = [];
					for (var key in dataMap){
						if (dataMap.hasOwnProperty(key)) {
							//calcolo dei quartili

							var dataMapBoxplot = {};
							var len = dataMap[key].length;
							var posq1 = Math.round(len/4)-1;
							var posq2 = Math.round(len/2)-1;
							var posq3 = Math.round(len*3/4)-1;
							var q1 = dataMap[key][posq1];
							var q2 = dataMap[key][posq2];
							var q3 = dataMap[key][posq3];
							//calcolo degli outliers
							//calcolo dei valori di minimo e massimo
							var iqr = q3 - q1;
							console.log("iqr"+ key, iqr);
							var minValue = q1 - 1.5 * iqr;
							var maxValue = q3 + 1.5 * iqr;
							// bisogna rimuovere i valori minori di minValue e maggiori di maxValue
							//calcolo degli outliers
							var outliers = dataMap[key].filter(function(value, index, arr){

							    return value < minValue || value > maxValue;

							});
							//rimuovo i valori in outliers
							var filtred = dataMap[key].filter(function(value, index, arr){

							    return !(value < minValue || value > maxValue);

							});
							// prendo massimi e minimi 
							var maxVal = filtred[filtred.length-1];
							var minVal = filtred[0];
							
							var obj ={}	;
							obj['Q1'] = q1;
							obj['Q2'] = q2;
							obj['Q3'] = q3;
							obj['whisker_low']=minVal
							obj['whisker_high'] = maxVal;
							obj['outliers'] = outliers;
							dataMapBoxplot['label']= key;
							dataMapBoxplot['values']=obj;
							
							chartData.push(dataMapBoxplot);
						}
					}
					console.log ("oggettoDataMap", chartData);
					var colorIndex = 0;
					console.log("chartData",chartData);

					return chartData;
				},
				aggregationValuesValueKey: function(rows, valueColumns,valueColumn, groupByColumn, chartColors,mainChartColor){
					console.log("aggregationValuesValueKey", valueColumns, valueColumn, groupByColumn);
					var dataMap = {};

					// prepare values column map for fast access
					var valueColumnsMap = {};
					if(valueColumns){
						for(var i=0;i<valueColumns.length;i++)
							valueColumnsMap[valueColumns[i].value] = valueColumns[i];
					}
					else{
						var side = "L";
						for(var j=0; j<rows.length; j++){
							var v = rows[j][valueColumn.key];
							if(!valueColumnsMap[v]){
								valueColumnsMap[v] = {value:v,label:v,side:side};
								side = side=='L'?'R':'L';
							}
						}					
					}

					var sliceCount = 0;

					for(var j=0; j<rows.length; j++){
						var v = rows[j][valueColumn.key];
						var g = rows[j][groupByColumn.key];
						if(valueColumnsMap[v]){						
							if(!dataMap[v]){
								dataMap[v] = valueColumnsMap[v];
								dataMap[v].values = {};
							}
							if(!dataMap[v].values[g]){
								dataMap[v].values[g] = {label:g, value:0};
								sliceCount++;
							}
							dataMap[v].values[g].value++;
						}
					}


					console.log("dentro aggregationValuesValueKey", dataMap);
					var colors = self.render.safeColors(sliceCount, chartColors,mainChartColor);
					console.log("colors", colors);
					var chartData  = new Array();
					var colorIndex = 0;
					for (var key in dataMap) {
						if (dataMap.hasOwnProperty(key)) {
							var s = {"key": dataMap[key].label, label: dataMap[key].label,side: dataMap[key].side, values: new Array()};
							if(dataMap[key].color)
								s.color = dataMap[key].color;
							else if(colors[colorIndex])
								s.color = colors[colorIndex];
							colorIndex++;
							for (var vKey in dataMap[key].values) {
								if (dataMap[key].values.hasOwnProperty(vKey)) {
									s.values.push(dataMap[key].values[vKey]);
								}
							}
							chartData.push(s);


						}
					}
					console.log("chartData aggregationValuesValueKey",chartData);

					return chartData;

				}, 
				aggregationSeriesXY: function(rows, xColumn, serieColumns, chartColors, isDate){
					var chartData  = new Array();
					for (var s = 0; s < serieColumns.length; s++) {
						var dataMap = {};

						var serie = angular.copy(serieColumns[s])//{key:serieColumns[s].key, values: new Array()};
						serie.values = new Array();

						if(chartColors && chartColors.length>0 && typeof serie.color == 'undefined'){
							serie.color = chartColors[s];
						}

						for(var i=0; i<rows.length; i++){
							if(!dataMap[rows[i][xColumn.key]] ){
								dataMap[rows[i][xColumn.key]]  = 0;
							}
							if(serieColumns[s].countingMode=='sum')
								dataMap[rows[i][xColumn.key]] += parseFloat(rows[i][serieColumns[s].key]);
							else
								dataMap[rows[i][xColumn.key]]++;

						}
						var sIndex = 0;
						console.log("linechart dataMap",xColumn);

						for (var key in dataMap) {
							if (dataMap.hasOwnProperty(key)) {
								var x;
								if(isDate)
									x = self.utils.mongoDate2millis(key);
								else
									x = parseFloat(key);
								
								var d = {"x": x, "y": dataMap[key]};

								if(serie.shape)
									d.shape=serie.shape;
								serie.values.push(d);
								sIndex++;
							}
						} 

						console.log("linechart serie",serie);
						serie.key = serie.label;
						chartData.push(serie);
					}
					return chartData;
				},
				aggregationKeyValue: function(rows, valueColumn, groupByColumn, countingMode, chartColors, mainChartColor){
					var seriesData = this.aggregationSeriesKeyValue(rows, [valueColumn], groupByColumn, countingMode, chartColors, mainChartColor);
					return seriesData[0].values;
				},
				aggregationTree: function(rootLabel, rows, columns, valueColumn, valueColumn2, valueFormat, valueFormat2){
					console.log("aggregationTree",columns);
					var tree = {"name": rootLabel, column:"", absolutedepth: 0, children: new Array(), valueLabel:valueColumn.label};
					if(!valueColumn.countingMode) 
						valueColumn.countingMode = 'count';
					if(valueColumn2){
						tree.valueLabel2 = valueColumn2.label;
						if(!valueColumn2.countingMode) 
							valueColumn2.countingMode = 'count'


					}
					for (var r = 0; r < rows.length; r++) {
						var keys =  new Array();
						var column = null;
						for (var c = 0; c < columns.length; c++) {
							keys.push({k:rows[r][columns[c].key], c: columns[c], d:c});
						}
						var value = 1;
						if(valueColumn.countingMode== 'sum')
							value = rows[r][valueColumn.key];

						if(valueColumn2){
							var value2 = 1;
							if(valueColumn2.countingMode== 'sum')
								value2 = rows[r][valueColumn2.key];
						}				
						tree = this.initTreeNode(tree, keys, value,value2, valueFormat, valueFormat2);
					}
					return tree;
				},
				initTreeNode: function(tree, keys, value, value2, valueFormat, valueFormat2) {
					var cur = tree;
					for (var k = 0; k < keys.length; k++) {
						var key = keys[k].k;
						var col = keys[k].c.key;
						var label = keys[k].c.label;
						var direction = keys[k].c.direction?keys[k].c.direction:"none";

						var childIndex = this.hasNameInArray(cur.children,key);
						if(childIndex==-1){
							if(k==keys.length-1){
								if(value2)
									childIndex = cur.children.push({"name": ""+key, "column":col, "label":label, "direction":direction, "absolutedepth": k+1, "value":0, "value2":0}) -1;
								else
									childIndex = cur.children.push({"name": ""+key, "column":col, "label":label, "direction":direction, "absolutedepth": k+1, "value":0}) -1;
							}
							else
								childIndex = cur.children.push({"name": ""+key, "column":col, "label":label, "direction":direction, "absolutedepth": k+1, children: new Array()}) -1;
						}
						cur = cur.children[childIndex];
					};

					cur.value += parseFloat(value);
					if(typeof valueFormat != 'undefined' && valueFormat)
						cur.formattedValue = self.render.safeNumber(cur.value, valueFormat.decimalValue, valueFormat.isEuro,valueFormat.formatBigNumber, valueFormat.textAfter);
					else
						cur.formattedValue = cur.value;
					if(value2){
						cur.value2 += parseFloat(value2);
						if(typeof valueFormat2 != 'undefined' && valueFormat2)
							cur.formattedValue2 = self.render.safeNumber(cur.value2, valueFormat2.decimalValue, valueFormat2.isEuro,valueFormat2.formatBigNumber, valueFormat.textAfter);
						else
							cur.formattedValue2 = cur.value2;

					}

					return tree;
				},
				hasNameInArray: function(arr, name){
					var result = -1;
					for (var i = 0; i < arr.length; i++) {
						if(arr[i].name == name){
							result=i;
							break;
						}		
					}
					return result;
				},
				aggregationTreeDrill: function(rootLabel, rows, columns, columnValues){
					var tree = {"name": rootLabel, column:"", absolutedepth: 0, children: new Array()};
					/*if(!countingMode) 
					countingMode = 'count'*/
					for (var r = 0; r < rows.length; r++) {
						var keys =  new Array();
						var values =  new Array();
						var column = null;
						for (var c = 0; c < columns.length; c++) {
							keys.push({k:rows[r][columns[c]], c: columns[c], d:c});
						}
						for (var p = 0; p < columnValues.length; p++) {
							values.push({k:rows[r][columnValues[p].key], c: columnValues[p].key})   
						}
						tree = this.initTreeNodeDrill(tree, keys, values);
					}
					return tree;
				},
				initTreeNodeDrill: function(tree, keys, values) {
					var cur = tree;
					for (var k = 0; k < keys.length; k++) {
						var key = keys[k].k;
						var col = keys[k].c;

						var childIndex = this.hasNameInArray(cur.children,key);
						if(childIndex==-1){
							if(k==keys.length-1) {
								childIndex = cur.children.push({"name": ""+key, "column":col, "absolutedepth": k+1}) -1;
							}else
								childIndex = cur.children.push({"name": ""+key, "column":col, "absolutedepth": k+1, children: new Array()}) -1;
						}
						cur = cur.children[childIndex];
					};
					for(var m = 0;m <keys.length;m++) {
						var field = keys[m].c;
						if(!cur[field]) 
							cur[field] = "";
						cur[field] += keys[m].k;
					} 
					for(var i = 0;i < values.length;i++) {
						var field = values[i].c;
						if(!cur[field])
							cur[field] =0;
						cur[field] += values[i].k;
					}
					return tree;
				},
				/*aggregationTreeValues: function(tree,keyColumns,columnValues,maxDeep) {
				var treeWithValue = tree;
				this.recursiveTree(tree,keyColumns,columnValues,maxDeep);
				return treeWithValue;
			},*/
				recursiveTree: function(tree,keyColumns,columnValues,maxDeep){
					var newTree = tree;
					var level = tree.absolutedepth;
					var nChildren = newTree.children.length;
					for( var i = 0;i<nChildren;i++) {
						if(level< maxDeep-2) {
							newTree.children[i] = this.recursiveTree(newTree.children[i],keyColumns,columnValues,maxDeep);
						}
						var vectorKey = this.sumKeys(newTree.children[i],keyColumns);
						for(j = 0; j<keyColumns.length;j++) {
							newTree.children[i][keyColumns[j]] = vectorKey[keyColumns[j]];
						}

						var vector = this.sumValues(newTree.children[i],columnValues);
						for(j = 0; j<columnValues.length;j++) {
							newTree.children[i][columnValues[j].key] = vector[columnValues[j].key];
						}
					}
					return newTree;
				},
				sumKeys: function(parent, keyColumns) {
					var added =  new Array();
					for(j = 0; j<keyColumns.length;j++) {
						added[keyColumns[j]] = new Array();
					}
					for(k = 0; k<parent.children.length;k++) {
						var child = parent.children[k]
						for(j = 0; j<keyColumns.length;j++) {
							added[keyColumns[j]][k] = child[keyColumns[j]];
						}
					}
					for(var j = 0; j<keyColumns.length; j++) {
						added[keyColumns[j]] = Array.from(new Set(added[keyColumns[j]].sort())).join(", ");
						added[keyColumns[j]] = Array.from(new Set(added[keyColumns[j]].split(", "))).sort().join(", ");
					}

					return added;
				},
				sumValues: function(parent, columnValues) {
					var added =  new Array();
					for(j = 0; j<columnValues.length;j++) {
						added[columnValues[j].key] = 0;
					} 
					for(k = 0; k<parent.children.length;k++) {
						var child = parent.children[k]
						for(j = 0; j<columnValues.length;j++) {
							if(columnValues[j].counting_mode=='sum') {
								added[columnValues[j].key] += child[columnValues[j].key];
							} else if(columnValues[j].counting_mode=='count') {
								added[values[j].key] += 1;
							}
						}
					}
					return added;
				},

				aggregationNodesLinks: function(rows, columns, columnValue, countingMode, render, mainColor){

					console.info("aggregationNodesLinks");
					var uniqueNode = {};
					var nodes = [];
					var matrix = [];
					var links = [];
					var linksDictionary = [];
					var nodeIndex = 0;
					for(var i=0; i<rows.length; i++){
						if(rows[i][columnValue]){
							for(var j=0; j<columns.length; j++){
								if(typeof(matrix[columns[j].key]) == "undefined")
									matrix[columns[j].key] = [];
								if( typeof(uniqueNode[columns[j].key +"_"+rows[i][columns[j].key]]) == "undefined"){
									var c = mainColor;
	//								if(colors && colors[j])
	//								c = colors[j];
									var node = {"name": ""+rows[i][columns[j].key], "index": nodeIndex, "label": ""+rows[i][columns[j].key], "color": c,"fades":true};
									console.debug("render",columns[j]+"_"+node.name);
									if(typeof render!= 'undefined' && typeof render[columns[j].key+"_"+node.name] != 'undefined'){
										var r = render[columns[j].key+"_"+node.name];
										if(typeof r.label!=undefined)
											node.label = r.label;
										if(typeof r.color!=undefined)
											node.color = r.color;
										if(r.fades=="true")
											node.fades = true;
										else
											node.fades = false;
									}
									nodes.push(node);
									matrix[columns[j].key].push({"node":rows[i][columns[j].key],"index": nodeIndex});
									nodeIndex++;
								}
								uniqueNode[columns[j].key +"_"+rows[i][columns[j].key]] = 0;
							}
						}
					}
					console.debug("nodes", nodes);
					console.debug("matrix", matrix);

					for(var i=0; i<rows.length; i++){
						if(rows[i][columnValue]){
							for(var j=0; j<columns.length; j++){
								if(j<columns.length-1){
									var key= columns[j].key;
									for(var k=0; k<matrix[key].length; k++){
										var source = matrix[key][k];
										for(var m=0; m<matrix[columns[j+1].key].length; m++){
											var target = matrix[columns[j+1].key][m];
											if(typeof(linksDictionary[key+"|"+source.node+"|"+target.node]) == "undefined")
												linksDictionary[key+"|"+source.node+"|"+target.node] = {"source": source.index, "target":target.index, "value": 0};
											if(rows[i][columns[j].key] == source.node && rows[i][columns[j+1].key]  == target.node){
												var value = rows[i][columnValue]?parseFloat(rows[i][columnValue]):0;
												var add = countingMode=='sum'?value:1;
												linksDictionary[key+"|"+source.node+"|"+target.node].value += add;
											}
										}
									}
	
								}
							}
						}

					}





					console.debug("linksDictionary", linksDictionary);
					for(var key in linksDictionary){
						if(linksDictionary[key].value!=0)
							links.push(linksDictionary[key]);
					}

					return {"nodes":nodes, "links": links};
				},
				aggregationForcedirected: function(rows, relations, colors){
					var links = new Array();
					if(relations){
						var relationsMap = {};
						for (var r = 0; r < relations.length; r++) {
							var sourceColumn = relations[r].source;
							var sourceType = relations[r].sourceType;
							var targetColumn = relations[r].target;
							var targetType = relations[r].targetType;
							var relationType = relations[r].relationType;
							var color = relations[r].color?relations[r].color:colors[r];
							var linkLine = relations[r].linkLine?relations[r].linkLine:null;
							for(var i=0; i<rows.length; i++){
								var source = rows[i][sourceColumn];
								var target = rows[i][targetColumn];
								if(!relationsMap[source + "_" + target])
									relationsMap[source + "_" + target] = {};
								relationsMap[source + "_" + target] = {"source":source, "sourceType": sourceType,"target":target, "targetType": targetType,type:relationType, "color": color, "linkLine": linkLine};
							}
						}

						for (var relationKey in relationsMap) {
							if (relationsMap.hasOwnProperty(relationKey)) {
								links.push(relationsMap[relationKey]);
							}
						}

					}
					console.log("links", links);
					return links;
				}

			},
			"geo": {
				fitGeojson : function(geojson,width,height, geoprojection){
					var c = d3.geo.centroid(geojson);
					// Create a unit projection.
					var projection = self.geo.getProjection(1,c ,[0,0], geoprojection);
					//	projection = d3.geo.mercator().scale(1).center(c).translate([0,0]);

					// Create a path generator.
					var path = d3.geo.path().projection(projection);
					// Compute the bounds of a feature of interest, then derive scale & translate.
					//  x-min=bounds[0][0] x-max=bounds[1][0]       
					//	y-min=bounds[0][1] y-max=bounds[1][1]    
					var b = path.bounds(geojson);
					if(!height || height<1){
						height = parseInt((b[1][1] - b[0][1])*width/(b[1][0] - b[0][0]));
					}
					var s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
					t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
					console.log("bounds",b);

					// Update the projection to use computed scale & translate.
					console.log("offset s c t ",s,c,t);
					return {path:d3.geo.path().projection(self.geo.getProjection(s,c,t, geoprojection)),
						projectionScale: s, 
						projectionCenter: c, 
						projectionTranslate: t,
						height: height
					};

				},
				pointProjection : function(coordinates, s, c, t, geoprojection){
					//var projection =  d3.geo.mercator().scale(s).center(c).translate(t);
					var projection =   self.geo.getProjection(s,c ,t, geoprojection);
					return projection(coordinates);
				},
				getProjection: function(scale, center, offset,geoprojection){
					if(!geoprojection)
						return d3.geo.mercator().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'azimuthalEqualArea')
						return d3.geo.azimuthalEqualArea().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'azimuthalEquidistant')
						return d3.geo.azimuthalEquidistant().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'conicConformal')
						return d3.geo.conicConformal().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'conicEqualArea')
						return d3.geo.conicEqualArea().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'conicEquidistant')
						return d3.geo.conicEquidistant().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'equirectangular')
						return d3.geo.equirectangular().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'gnomonic')
						return d3.geo.gnomonic().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'orthographic')
						return d3.geo.orthographic().scale(scale).center(center).translate(offset);
					else if(geoprojection == 'stereographic')
						return d3.geo.stereographic().scale(scale).center(center).translate(offset);
					else
						return d3.geo.mercator().scale(scale).center(center).translate(offset);

				},
				initGeojson : function(g){
					if(!g.url)
	            		g.url="lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json";
	            	if(!g.key)
	            		g.key = "code";
	            	if(!g.render)
	            		g.render = {};
	            	if(!g.render.line)
	            		g.render.line = {}
	            	if(!g.render.line.weight)
	            		g.render.line.weight = 1;
	            	if(!g.render.line.opacity)
	            		g.render.line.opacity = 1;
	            	if(!g.render.line.dashcolor)
	            		g.render.line.dashcolor = '#0e232e';
	            	if(!g.render.line.dasharray)
	            		g.render.line.dasharray = 1;
	            	if(!g.render.areas)
	            		g.render.areas = {}
	            	if(!g.render.areas.fillopacity)
	            		g.render.areas.fillopacity = .7;
	            	return g;
				}, 
				
				

			},
			"svg":{
				createSvg: function(svgAttrs, tag, tagAttrs,  defs, text, textAttrs){
					console.log("svgAttrs", svgAttrs);
					var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
					for (var k in svgAttrs)
						svg.setAttribute(k, svgAttrs[k]);

					var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
					for (var k in tagAttrs)
						el.setAttribute(k, tagAttrs[k]);

					if(defs)
						svg.appendChild(defs);
					svg.appendChild(el);
					if(text){
						var t = document.createElementNS('http://www.w3.org/2000/svg', "text");
						for (var k in textAttrs)
							t.setAttribute(k, textAttrs[k]);				
						t.textContent = text;
						svg.appendChild(t);
					}


					return svg;
				},
				updateSvg: function(svgString, svgAttrs, tagAttrs, defs, text, textAttrs){
					var svg = new DOMParser().parseFromString(svgString, "text/xml").children[0];
					for (var k in svgAttrs)
						svg.setAttribute(k, svgAttrs[k]);

					if(defs)
						svg.appendChild(defs);

					for (var i = 0; i <= svg.childNodes.length; i++) {
						if(svg.childNodes[i].nodeName =='g' || svg.childNodes[i].nodeName =='path'){
							el = svg.childNodes[i];
							break;
						}
					}


					for (var k in tagAttrs)
						el.setAttribute(k, tagAttrs[k]);				
					svg.appendChild(el);

					if(text){
						var t = document.createElementNS('http://www.w3.org/2000/svg', "text");
						for (var k in textAttrs)
							t.setAttribute(k, textAttrs[k]);				
						t.textContent = text;
						svg.appendChild(t);
					}

					return svg;

				}, 
				createPercentage: function(svgId, percentage, fullColor, emptyColor, strokeColor, orientation, isPath){
					var defs= document.createElementNS('http://www.w3.org/2000/svg', 'defs');

					var background= document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
					background.setAttribute('id', svgId + 'bg');

					background.setAttribute('x1', '0%');
					background.setAttribute('y2', '0%');
					background.setAttribute('gradientUnits','userSpaceOnUse');
					if(orientation=='horizontal'){
						background.setAttribute('y1', '0%');
						background.setAttribute('x2', '100%');
					}
					else{
						background.setAttribute('y1', '100%');
						background.setAttribute('x2', '0%');
					}

					var backgroundStopFill= document.createElementNS('http://www.w3.org/2000/svg', 'stop');
					backgroundStopFill.setAttribute('offset', percentage);
					backgroundStopFill.setAttribute('stop-color', fullColor);

					var backgroundStopEmpty= document.createElementNS('http://www.w3.org/2000/svg', 'stop');
					backgroundStopEmpty.setAttribute('offset', percentage);
					backgroundStopEmpty.setAttribute('stop-color', emptyColor);


					var backgroundAnimation= document.createElementNS('http://www.w3.org/2000/svg', 'animate');
					backgroundAnimation.setAttribute('dur', '0.5s');
					backgroundAnimation.setAttribute('attributeName', 'offset');
					backgroundAnimation.setAttribute('fill', 'freeze');
					backgroundAnimation.setAttribute('from', '0');
					backgroundAnimation.setAttribute('to', percentage);

					backgroundStopFill.appendChild(backgroundAnimation);
					background.appendChild(backgroundStopFill);

					backgroundStopEmpty.appendChild(angular.copy(backgroundAnimation));
					background.appendChild(backgroundStopEmpty);

					defs.appendChild(background);

					var stroke= document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
					stroke.setAttribute('id', svgId + 'stroke');

					var strokeStop= document.createElementNS('http://www.w3.org/2000/svg', 'stop');
					strokeStop.setAttribute('offset', '0');
					strokeStop.setAttribute('stop-color', strokeColor);

					stroke.appendChild(strokeStop);
					defs.appendChild(stroke);

					return defs;
				},
				createText: function(text, fill, stroke){

				},
				sizeAttrs : function(tag, w, h){
					var attrs = {};
					switch (tag) {
					case 'ellipse':
						attrs["cx"] =  w/4+1;
						attrs["cy"] =  h/4;
						attrs["rx"] =  w/4;
						attrs["ry"] =  h/4;
						break;
					case 'circle':
						attrs["cx"] =  (w>h?h:w)/4+1;
						attrs["cy"] =  (w>h?h:w)/4;
						attrs["r"] =  (w>h?h:w)/4;
						break;
					default:
						attrs["width"] =  w;
					attrs["height"] =  h;
					break;
					}

					return attrs;
				},
				baseSize: function(points){
					var width = 0;
					var height = 0;
					if(points){
						var allPoints = points.split(" ");
						for (var i = 0; i < allPoints.length; i++) {
							var w=parseFloat(allPoints[i].split(",")[0]);
							var h=parseFloat(allPoints[i].split(",")[1]);
							width = w>width?w:width;
							height = h>height?h:height;
						}
					}
					return [width, height];
				}
			},
			"event": {
				createEvent:  function(sourceId, widget,  eventtype, data, eventControlId){
					return {"sourceId":sourceId,"widget": widget, "eventtype":eventtype,"data":data, "eventControlId":eventControlId};
				},
				clearArrayTextFilter: function(filterMap, key){
					if(filterMap){
						for (var filterKey in filterMap) {
							if (filterKey.startsWith(key)) {
								delete filterMap[filterKey];

							}
						}
					}
					return filterMap;
				},
				updateTextFilter : function(originalFilter, newFilterMap, columnDataTypeMap){
					//filter='a' eq provincia and idDataset gt 1&$top=15&$orderby=internalId%20desc
					//originalFilter = (!originalFilter?"":" and ";
					var result = "";
					if(originalFilter)
						result = originalFilter;
					for (var newFilterKey in newFilterMap) {
						if (newFilterMap.hasOwnProperty(newFilterKey)) {
							var newFilter = newFilterMap[newFilterKey];

							if(newFilter.value && newFilter.value !=null && newFilter.value != ""){
								if(result != "")
									result += ' and ';
								var quote = columnDataTypeMap[newFilter.column] == 'number'?"":"\'";
								if(columnDataTypeMap[newFilter.column] == 'number'){
									if(newFilter.advanced)
										result += newFilter.column + " " + newFilter.advanced + " " +newFilter.value;
									else
										result += newFilter.value + " eq " +newFilter.column;
								}
								else{
									if(newFilter.advanced){
										if(newFilter.advanced == 'startWith'){
											result += 'startswith(' + newFilter.column + ',\''+ newFilter.value + '\')';
										}
										else if(newFilter.advanced == 'endWith'){
											result += 'endswith(' + newFilter.column + ',\''+ newFilter.value + '\')';
										}	
										else{
											result += '\'' + newFilter.value + "\' eq " +newFilter.column;
										}
									}
									else{
										result += '(substringof(\''+ newFilter.value + '\','+newFilter.column +') eq true)';
									}
								}

							}
						}
					}
					console.log("filter", result);
					return result;

				},
				readWidgetEventAttr: function(attr){
					var evtConfig = {};
					angular.forEach(attr, function (eventAttrvalue, eventAttrkey) { 
						if(eventAttrkey.startsWith('evt')){
							evtConfig[eventAttrkey] = eventAttrvalue;
						}
					});
					return evtConfig;
				},
				ignoreEvent: function(event, eventconfig){
					console.debug("ignoreEvent: event", event);
					console.debug("ignoreEvent: eventconfig",eventconfig);
					var result = false;
					// mapping event type with directive config
					var eventDirectiveConfigMap = {	"dataset.change.group_by_column":"evtChangeGroupbycolumn",
							"dataset.change.value_column":"evtChangeValuecolumn",
							"dataset.filter.text":"evtFiltertext",
							"dataset.filter.odata":"evtFilterodata",
							"dataset.de_highlight.group_by_column":"evtHighlightGroupbycolumn",
							"dataset.highlight.group_by_column": "evtDehighlightGroupbycolumn"};

					var configKey =  eventDirectiveConfigMap[event.eventtype];


					var config = {enabled:true, onlySameDataset: false};
					if(eventconfig[configKey])
						config = JSON.parse(eventconfig[configKey]);


					if(configKey){
						//console.log("eeeee config ", config );

						if(config["enabled"] !== true)
							result = true;
						else if(event.eventControlId && eventconfig.evtAcceptedControlIds && eventconfig.evtAcceptedControlIds.length>2){
							result = true;
							var evtAcceptedControlIds = JSON.parse(eventconfig.evtAcceptedControlIds);
							for (var i = 0; i < evtAcceptedControlIds.length; i++) {
								if(event.eventControlId == evtAcceptedControlIds[i]){
									result = false;
									break;
								}
							}
						}

						if(!result && config.onlySameDataset){
							result = !event.data.datasetcode || event.data.datasetcode != datasetcode;
						}
					}
					return result;
				}
			}

	};
	return self;



}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

var WebsocketStompSingleton= (function() {    
	var clientInstance = null; //private variable to hold the
	//only instance of client that will exits.


	var SubscriptionList = [];
	var SubscriptedElementsList = [];
	var connectedClient = false;


	var cancelAllSubscriptionsmetadata = function(){
		for(var i =0; i< SubscriptedElementsList.length ; i++){
			var widget = SubscriptedElementsList[i];
			if(debug)
				console.debug(':::: Unsubscribe for ::::', widget);
			widget.unsubscribe();      				  
		}
		SubscriptionList = [];
		SubscriptedElementsList = [];
	};

	var createClient = function(settings,count){ 
		console.debug("createClient");
		var intSettings = settings;	                    
		var client = Stomp.client(intSettings.ws_url);

		var user = Constants.WEB_SOCKET_USER;
		var password = Constants.WEB_SOCKET_SECRET;
		console.debug("intSettings",intSettings);
		if(intSettings.user_token && intSettings.user_token!=null && intSettings.user_token!=''){
			user = "Bearer " + intSettings.user_token;
			password = "";
		}
		console.debug("user = ", user);
		
		client.connect(user, password, function(frame) { //success Callback
			console.debug("connet 2 - SubscriptionList", SubscriptionList);

			for(var i =0; i< SubscriptionList.length ; i++){
				var widget = SubscriptionList[i];
				console.debug(':::: subscribe for ::::', widget);
				SubscriptedElementsList.push(client.subscribe(widget.keyTopic,widget.keyCallback));
			}
			console.debug(':::: Finish with the subscribe:::::');
			connectedClient=true;
		},
		function(frame) //error Callback
		{
			console.info("frame", frame);
			if (count<5) {
				console.debug("createClient count ::::::::::::: ",count);    						       
				setTimeout(function(){createClient(intSettings,++count);},count*1000);
				console.debug("awake.. ");		         	       
			} else{
				console.error(':::: connection error::::');
			}	
		});


		return {
			getWebClient: function(){               		 
				return client;
			},
			addSubscription : function(topic, callback,tenant_code, dataCallbackIndex){
				if(connectedClient){
					console.debug(':::: addSubscription Client connected::::', topic, callback);
					SubscriptionList.push({
						keyTopic:topic,
						keyCallback:callback,
						keyTenantCode: tenant_code,
						keyDataCallbackIndex: dataCallbackIndex
					});
					client.subscribe(topic, callback);
				}else{
					
					console.debug(':::: addSubscription Client NOT connected Add to SubscriptionList::::');
					SubscriptionList.push({
						keyTopic:topic,
						keyCallback:callback,
						keyTenantCode: tenant_code,
						keyDataCallbackIndex: dataCallbackIndex
					});
				}
			},
			cancelAllSubscriptionsmetadata:cancelAllSubscriptionsmetadata
		};                         
	};

	return {
		getInstance: function(settings,updateStatus){
			console.debug("clientInstance",clientInstance);
			if(clientInstance && clientInstance != null) return clientInstance; 
			if(!settings)
				return null;  

			if(!clientInstance){
				console.debug("::::  New Stomp Client Created ::::");
				clientInstance = createClient(settings,1);              	  
			}
			return clientInstance;
		}
	};
})();


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('collapsibleTree', function($timeout,$rootScope) {
	return {
		restrict : 'E',
		scope:{data :'=', selected: "@", columns: '=', widgetId: "@", rowDepth: "@", updateCallback: '&updateCallback'},
		template : '<div id="collapsibleTree{{panelIndex}}" class="collapsible-tree-container" style="min-width:{{svgWidth}}px; border: solid 0px red; display: inline-block"></div>',
		link : function(scope, elem, attr) {
			console.log("attr", attr);
			console.log("elem", elem);
			console.log("scope", scope);
			scope.panelIndex = Math.floor((Math.random() * 10000) + 1);
			var margin = {top : 0, right : 0, bottom : 0, left : 0};

//			var margin = {
//				top : 20,
//				right : 120,
//				bottom : 20,
//				left : 120
//			};

//			if ((typeof attr.marginTop != 'undefined' && attr.marginTop != null))
//				margin.top = parseInt(attr.marginTop);
//			if ((typeof attr.marginRight != 'undefined' && attr.marginRight != null))
//				margin.right = parseInt(attr.marginRight);
//			if ((typeof attr.marginBottom != 'undefined' && attr.marginBottom != null))
//				margin.bottom = parseInt(attr.marginBottom);
//			if ((typeof attr.marginLeft != 'undefined' && attr.marginLeft != null))
//				margin.left = parseInt(attr.marginLeft);

			//console.log("margin", margin);
			var fixHeight = (typeof attr.fixHeight != 'undefined' && attr.fixHeight == 'true') ? true : false;
			var nodeIndex = 0, root;
			var rowHeight = !attr.rowHeight? 32 : attr.rowHeight;
			var rowDepth = !attr.rowDepth? 160 : parseInt(attr.rowDepth);
			var radius = !attr.radius? rowHeight / 3 : parseInt(attr.radius);
			var levelDepth = {};
			var startClosed = (typeof attr.startClosed != 'undefined' && attr.startClosed == 'true') ? true : false;
			var nodeOffsetX = !attr.nodeOffsetX? 0 : parseInt(attr.nodeOffsetX);



			scope.$watch('data', function() {
				console.log("attr.width in", attr.width);
				var width = (typeof attr.width == 'undefined' || attr.width == null) ? 800 : parseInt(attr.width);
				var height = (typeof attr.height == 'undefined' || attr.height == null) ? 50 : parseInt(attr.height);
				height = height - margin.top - margin.bottom;
				console.log("width in", width);

				console.log("ssdata", scope.data);
				var tree = d3.layout.tree().size([ height, width ]).sort(function(a,b){
				      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
			    });

				var diagonal = d3.svg.diagonal().projection(function(d) {
					return [ d.y, d.x ];
				});

				var ignoreClick = false;

				function onNodeClick(browseHistory, opening){
						console.log("onAreaClick ignoreClick", browseHistory, ignoreClick);


						if(ignoreClick){
							ignoreClick = false;
						}
						else{
							console.log("data", scope.data);
							var path = [];
						for (var key in browseHistory) {
							if (browseHistory.hasOwnProperty(key)) {
						path.push(browseHistory[key].value);
						}
						}
						path.push(scope.data.name);
						if(!opening)
							path.shift();
						var event = {"sourceId": scope.widgetid,
										"eventtype": "dataset.browse", 
										"data": {"browseHistory":browseHistory, "path":path.reverse()}, 
										"widget": "collapsibletree"};
					$rootScope.$broadcast('yucca-collapsibletree-event', event);
							console.log("yucca-collapsibletree-event", event);
						}
				};
				
				d3.select("#collapsibleTree" + scope.panelIndex + " svg").remove();
				var vis = d3.select("#collapsibleTree" + scope.panelIndex).append("svg").attr("width",width).attr("height",
						height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				root = scope.data;

				// d3.select(self.frameElement).style("height", "500px");
				root.x0 = height / 2;
				root.y0 = 0;

				function toggleAll(d) {
					if (d.children) {
						d.children.forEach(toggleAll);
						toggle(d);
					}
				}
				
				if(root.children)
					root.children.forEach(toggleAll);

				if(startClosed)
					toggle(root);
				update(root);
				var isRoot = true;
				function update(source) {
					console.info("source", source);
					var duration = d3.event && d3.event.altKey ? 5000 : 500;

					// compute the new height
					var levelWidth = new Array();
					levelWidth[0] = 1;
					var childCount = function(level, n) {

						if (n.children && n.children.length > 0) {
							if (levelWidth.length <= level + 1)
								levelWidth.push(0);

							levelWidth[level + 1] += n.children.length;
							n.children.forEach(function(d) {
								childCount(level + 1, d);
							});
						}
					};
					
					
					childCount(0, root);

					var newHeight = d3.max(levelWidth) * rowHeight;
					
					if (fixHeight)
						d3.select("#collapsibleTree" + scope.panelIndex).attr("style", "height:" + newHeight + "px");
					d3.select("#collapsibleTree" + scope.panelIndex + " svg").attr("height", newHeight);
					tree = tree.size([ newHeight, width ]);

					// Compute the new tree layout.
					var nodes = tree.nodes(root).reverse();
					console.log("nodes root", root, nodes);

					// Normalize for fixed-depth.
					nodes.forEach(function(d) {
						var invisible = vis.append("svg:text").attr("id", "invisible").attr("class", d.cssClass).attr("x", 0).attr("y", 0).attr("dy", ".35em");
						invisible.append("svg:tspan").attr("class", d.title + " title").text(d.name + " ");
						invisible.append("svg:tspan").attr("class", d.title + " subtitle").text(typeof d.subtitle!='undefined' && d.subtitle!=null ? d.subtitle: "");
						
						var currentDepth = parseInt(invisible.node().getBBox().width + (radius * 4));
						d.titleLength  = currentDepth;
						d3.select("#invisible").remove();
					
					
						if (typeof levelDepth["depth_" + d.depth] == 'undefined')
							levelDepth["depth_" + d.depth] = {"current": d.children || d._children ? currentDepth : rowDepth};
						else if (currentDepth > levelDepth["depth_" + d.depth].current && ( d.children || d._children))
							levelDepth["depth_" + d.depth] = {"current": currentDepth};
						
						var maxWidth = 0;
						
						console.log("maxWidth", maxWidth);
						//baseSvg.attr("height",maxHeight + margin.top + margin.bottom);
					
					});
					var numChildren = 0;
					nodes.forEach(function(d) {
						d.y = 0;
						for (var int = 0; int <= d.depth; int++) {
							d.y += levelDepth["depth_" + int].current + nodeOffsetX;
						}
						numChildren += (d.children && d.children!=null?d.children.length:0);
					});
					
					console.log("levelDepth",levelDepth);
					isRoot = numChildren == 0;
					
					// Update the nodes...
					var node = vis.selectAll("g.node").data(nodes, function(d) {
						return d.id || (d.id = ++nodeIndex);
					});
					
					// Enter any new nodes at the parent's previous position.
					var nodeEnter = node.enter().append("svg:g").attr("class",  function(d) { return "node node_depth_" + d.depth;}).attr("transform", function(d) {
						return "translate(" + source.y0 + "," + source.x0 + ")";
					});

					nodeEnter.append("svg:circle").attr("r", 1e-6).attr("class", function(d) {
						return "node_circle " +  (d._children ? "full" : "empty") + "circle_depth_" + d.depth;
					}).on("click", function(d) {
						toggle(d);
						update(d);
						var opening = d.children?true: false;
						onNodeClick(browseHistory(d,new Array()),opening);
					});
					function browseHistory(d,bh){
						if(d.parent){
							//bh.push({column:scope.columns[realDepth(d,0)-1],value:d.name});
							bh.push({column:d.column,value:d.name});
							bh = browseHistory(d.parent, bh);
						}
							
						return bh;
					}
					
					
					// icon
//					nodeEnter.append("svg:text").attr("id", function(d) {
//						return "icon_" + d.depth + "_" + d.id;
//					}).attr("x", function(d) {
//						return -1*d.titleLength;
//						//return -1*levelDepth["depth_" + d.depth].current;//-d.y;
//					}).attr("dy", ".35em").attr("text-anchor", function(d) {
//						return d.children || d._children ? "start" : "start";
//					}).attr("class", function(d) {
//						return d.cssIcon + " icon";
//					}).on("click", function(d) {
//						d.action(d.filter);
//						// update(d);
//					}).text(function(d) {
//						return d.icon + " ";
//					});
//					

					// title / subtitle
					var nodeText = nodeEnter.append("svg:text").attr("id", function(d) {
						return "text_" + d.depth + "_" + d.id;
					}).attr("x", function(d) {
						return d.children || d._children ? -rowHeight / 2:rowHeight / 2;
					}).attr("dy", ".35em").attr("text-anchor", function(d) {
						return d.children || d._children ? "end" : "start";
					}).attr("class", function(d) {
						return d.cssClass + " title_depth_" + d.depth;
					}).on("click", function(d) {
						d.action(d.filter);
					});
					
					
					
					nodeText.append("svg:title").attr("class", function(d) {
						return compactText(d.name) + " tooltip";
					}).text(function(d) {
						return typeof d.tooltip != 'undefined' && d.tooltip!=null ?d.tooltip:"";
					});
					
					nodeText.append("svg:tspan").attr("class", function(d) {
						console.debug("tree ",d);
						return compactText(d.name) + " title";
					}).text(function(d) {
							return d.name + " ";
					});
					
					nodeText.append("svg:tspan").attr("class", function(d) {
						return compactText(d.name) + " subtitle";
					}).text(function(d) {
						return typeof d.subtitle!='undefined' && d.subtitle!=null  ? d.subtitle: "";
					});
					


					if(!attr.hideValues || attr.hideValues!="true"){
						nodeText.append("svg:tspan").attr("class", function(d) {
							return  compactText(d.name)  + " value_separator";
						}).text(function(d) {
							return typeof d.formattedValue!='undefined' && d.formattedValue!=null  ? " - " : "";
						});
						
						var tspanValue = nodeText.append("svg:tspan").attr("class", function(d) {
							return  compactText(d.name)  + " value";
						}).text(function(d) {
							return typeof d.formattedValue!='undefined' && d.formattedValue!=null  ? d.formattedValue: "";
						});
						if(!attr.valueNotColored || attr.valueNotColored!="true")
							tspanValue.style("fill",function(d) {return d.color;})
					}
					
					// Transition nodes to their new position.
					var nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
						return "translate(" + d.y + "," + d.x + ")";
					});


					nodeUpdate.select("circle").attr("r", radius).attr("class", function(d) {
						return "node_circle " +  (d._children ? "full" : "empty") + " circle_depth_" + d.depth;
					}).style("stroke",function(d) {return d.color;});

					nodeUpdate.select("text").style("fill-opacity", 1);
					nodeUpdate.select("tspan").style("fill-opacity", 1); 
					//nodeUpdate.select("text").call(wrap, 200);

					// Transition exiting nodes to the parent's new position.
					var nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) {
						return "translate(" + source.y + "," + source.x + ")";
					}).remove();

					nodeExit.select("circle").attr("r", 1e-6);

					nodeExit.select("text").style("fill-opacity", 1e-6);
					


					// Update the links...
					var link = vis.selectAll("path.link").data(tree.links(nodes), function(d) {
						return d.target.id;
					});

					// Enter any new links at the parent's previous position.
					link.enter().insert("svg:path", "g").attr("class", "link").attr("d", function(d) {
						var o = {
							x : source.x0,
							y : source.y0
						};
						return diagonal({
							source : o,
							target : o
						});
					}).transition().duration(duration).attr("d", diagonal);

					// Transition links to their new position.
					link.transition().duration(duration).attr("d", diagonal);

					// Transition exiting nodes to the parent's new position.
					link.exit().transition().duration(duration).attr("d", function(d) {
						var o = {
							x : source.x,
							y : source.y
						};
						return diagonal({
							source : o,
							target : o
						});
					}).remove();

					// Stash the old positions for transition.
					nodes.forEach(function(d) {
						d.x0 = d.x;
						d.y0 = d.y;
					});
					
					if(scope.updateCallback){
						scope.updateCallback({"isRoot": isRoot});
					}
					
//					$timeout(function() {scope.svgWidth = vis.node().getBBox().width + margin.right + margin.left + 40;
//						d3.select("#collapsibleTree" + scope.panelIndex + " svg").attr("width", scope.svgWidth)
//						console.log("svgWidth",d.x,vis.node().getBBox().width);
//					}, duration);
//					
//					
//					console.log("svgWidth",vis.node().getBBox().width);
//					console.log("svgWidth",scope.svgWidth);
					//scope.$apply();
					//d3.select("#collapsibleTree" + scope.panelIndex + " svg").attr("width", scope.svgWidth)

				}

				// Toggle children.
				function toggle(d) {
					if (d.children) {
						d._children = d.children;
						d.children = null;
					} else {
						d.children = d._children;
						d._children = null;
					}
				}

			});
			
			var compactText = function(text){
				if(text)
					return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
				else
					return "";
			}
			
			var stringEllipse = function(text, length, end) {
		    	
		    	if(typeof text === "undefined"  || text == null)
		    		text = "";
		    	
		        if (isNaN(length))
		            length = 10;

		        if (end === undefined)
		            end = "...";

		        if (text.length <= length || text.length - end.length <= length) {
		            return text;
		        }
		        else {
		            return String(text).substring(0, length-end.length) + end;
		        }
			};
			
			function wrap(text, width) {
			    text.each(function () {
			        var text = d3.select(this),
			            words = text.text().split(/\s+/).reverse(),
			            word,
			            line = [],
			            lineNumber = 0,
			            lineHeight = 1, // ems
			            x = text.attr("x"),
			            y = text.attr("y"),
			            dy = text.attr("dy")?parseFloat(text.attr("dy")):0, //parseFloat(text.attr("dy")),
			            tspan = text.text(null)
			                        .append("tspan")
			                        .attr("x", x)
			                        .attr("y", y)
			                        .attr("dy", dy + "em");
			        while (word = words.pop()) {
			            line.push(word);
			            tspan.text(line.join(" "));
			            if (tspan.node().getComputedTextLength() > width) {
			                line.pop();
			                tspan.text(line.join(" "));
			                line = [word];
			                tspan = text.append("tspan")
			                            .attr("x", x)
			                            .attr("y", y)
			                            .attr("dy", ++lineNumber * lineHeight*0.5 + dy + "em");
			                            //.text(word);
			            }
			        }
			    });
			}
		}
	};
});

/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('collapsibleTreeBoxes',
		function($timeout, $rootScope) {
			return {
				restrict : 'E',
				scope : {
					data : '=',
					selected : "@",
					columns : '=',
					widgetId : "@",
					boxShadow: "=",
					updateCallback : '&updateCallback'
				},
				template : '<div id="collapsibleTreeBoxes{{panelIndex}}" class="collapsible-tree-boxes-container"></div> <div id="panel-{{panelIndex}}-fake"></div>',
				link : function(scope, elem, attr) {
					console.log("attr", attr);
					console.log("elem", elem);
					console.log("scope", scope);
					scope.panelIndex = Math.floor((Math.random() * 10000) + 1);
					var margin = {
						top : 0,
						right : 0,
						bottom : 0,
						left : 0
					};


					var nodeIndex = 0, root;
					var levelDepth = {};
		            var boxRadius = !attr.boxRadius? 6 : attr.boxRadius;
					var rowDepth = !attr.rowDepth? 120 : parseInt(attr.rowDepth);

					var rectNode = {
						width : rowDepth,
						height : function(textContent){
							if(textContent){
								
								var fakeBox = angular.element(document.querySelector("#panel-"+ scope.panelIndex + "-fake"));
								fakeBox.html('<div style="padding: 3px;width: ' + rowDepth + 'px; display: inline-block" class="node-text wordwrap"><b>' + textContent+ '</b></div>');
								var h = fakeBox[0].offsetHeight*1.3;
								fakeBox.html("");
								return h<45?45:h;
							}
							else
								return 45;
						},
						textMargin : 5
					}, tooltip = {
						width : 150,
						height : 30,
						textMargin : 5
					};
					var i = 0, duration = 750;
					var tree;
					var width = (typeof attr.width == 'undefined' || attr.width == null) ? 800 : parseInt(attr.width);
					var height = (typeof attr.height == 'undefined' || attr.height == null) ? 50 : parseInt(attr.height);
					scope.$watch('data', function() {
						console.log("attr.width in", attr.width);
						height = height - margin.top - margin.bottom;
						console.log("width in", width);

						tree = d3.layout.tree().size([ height, width ]).sort(function(a,b){
						      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
					    });
						root = scope.data;

						root.x0 = height / 2;
						root.y0 = 0;
						var maxDepth = 0;
						var maxTreeWidth = breadthFirstTraversal(tree.nodes(root), function(currentLevel) {
							maxDepth++;
						});
						height = maxTreeWidth * (rectNode.height() + 20) + tooltip.height + 20 - margin.right - margin.left;
						width = maxDepth * (rectNode.width * 1.5) + tooltip.width / 2 - margin.top - margin.bottom;

						
						
						d3.select("#collapsibleTreeBoxes" + scope.panelIndex + " svg").remove();
						baseSvg = d3.select("#collapsibleTreeBoxes" + scope.panelIndex).append('svg')
								.attr('width', width + margin.right + margin.left).attr('height', height + margin.top + margin.bottom).attr('class',
										'svgContainer').call(d3.behavior.zoom()
								// .scaleExtent([0.5,
								// 1.5])
								// //
								// Limit
								// the
								// zoom
								// scale
								.on('zoom', zoomAndDrag));

						// Mouse wheel is desactivated,
						// else after a first drag of
						// the
						// tree, wheel event drags the
						// tree (instead of scrolling
						// the
						// window)
						getMouseWheelEvent();
						d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on(mouseWheelName, null);
						d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('dblclick.zoom', null);

						svgGroup = baseSvg.append('g').attr('class', 'drawarea').append('g').attr('transform',
								'translate(' + margin.left + ',' + margin.top + ')');

						// SVG elements under
						// nodeGroupTooltip could be
						// associated with
						// nodeGroup,
						// same for linkGroupToolTip and
						// linkGroup,
						// but this separation allows to
						// manage the order on which
						// elements are drew
						// and so tooltips are always on
						// top.
						nodeGroup = svgGroup.append('g').attr('id', 'nodes');
						linkGroup = svgGroup.append('g').attr('id', 'links');
						linkGroupToolTip = svgGroup.append('g').attr('id', 'linksTooltips');
						nodeGroupTooltip = svgGroup.append('g').attr('id', 'nodesTooltips');

						defs = baseSvg.append('defs');
						initArrowDef();
						initDropShadow();
						function toggleAll(d) {
							if (d.children) {
								d.children.forEach(toggleAll);
								toggle(d);
							}
						}
						
						if(root.children)
							root.children.forEach(toggleAll);
						
						update(root);
					});

					var mousedown; // Use to save temporarily
					// 'mousedown.zoom' value
					var mouseWheel, mouseWheelName, isKeydownZoom = false;

					var tree;
					var baseSvg, svgGroup, nodeGroup, // If nodes are
					// not grouped
					// together,
					// after a click
					// the svg
					// node will be set after his corresponding tooltip
					// and will
					// hide it
					nodeGroupTooltip, linkGroup, linkGroupToolTip, defs;

					function update(source) {
						// Compute the new tree layout
						var nodes = tree.nodes(root).reverse(), links = tree.links(nodes);

						// Check if two nodes are in collision on the
						// ordinates axe and move
						// them

						breadthFirstTraversal(tree.nodes(root), collision);
						
						var maxHeight = 0;
						// Normalize for fixed-depth
						nodes.forEach(function(d) {
							d.y = d.depth * (rectNode.width * 1.5);
							var currentHeight = d.x + rectNode.height(d.name)+4;
							maxHeight = maxHeight<currentHeight?currentHeight:maxHeight;
						});
						
						console.log("maxHeight", maxHeight);
						baseSvg.attr("height",maxHeight + margin.top + margin.bottom);

						// 1) ******************* Update the nodes
						// *******************
						var node = nodeGroup.selectAll('g.node').data(nodes, function(d) {
							return d.id || (d.id = ++i);
						});
						var nodesTooltip = nodeGroupTooltip.selectAll('g').data(nodes, function(d) {
							return d.id || (d.id = ++i);
						});

						// Enter any new nodes at the parent's previous
						// position
						// We use "insert" rather than "append", so when
						// a new child node is
						// added (after a click)
						// it is added at the top of the group, so it is
						// drawed first
						// else the nodes tooltips are drawed before
						// their children nodes and
						// they
						// hide them
						var nodeEnter = node.enter().insert('g', 'g.node').attr('class', 'node').attr('transform', function(d) {
							return 'translate(' + source.y0 + ',' + source.x0 + ')';
						}).on('click', function(d) {
							click(d);
						});
						var nodeEnterTooltip = nodesTooltip.enter().append('g').attr('transform', function(d) {
							return 'translate(' + source.y0 + ',' + source.x0 + ')';
						});

						var rect = nodeEnter.append('g').append('rect').attr('rx', boxRadius).attr('ry', boxRadius).attr('width', rectNode.width).
							attr('height', function(d){return rectNode.height(d.name)}).attr('class', 'node-rect').attr('stroke', function(d) {
							return d.color?d.color: "#ccc";
						});
						if(scope.boxShadow)
							rect.attr('filter', 'url(#drop-shadow)')

						nodeEnter.append('foreignObject').attr('x', rectNode.textMargin).attr('y', rectNode.textMargin).attr('width', function() {
							return (rectNode.width - rectNode.textMargin * 2) < 0 ? 0 : (rectNode.width - rectNode.textMargin * 2)
						}).attr('height', function(d) {
							return (rectNode.height(d.name) - rectNode.textMargin * 2) < 0 ? 0 : (rectNode.height(d.name) - rectNode.textMargin * 2)
						}).append('xhtml').html(
								function(d) {
									
									return '<div style="width: ' + (rectNode.width - rectNode.textMargin * 2) + 'px; height: '
										+ (rectNode.height(d.name) - rectNode.textMargin * 2) + 'px;" class="node-text wordwrap">' + '<b>' + d.name
											+ '</b></div>';
								}).on('mouseover', function(d) {
							$('#nodeInfoID' + d.id).css('visibility', 'visible');
							$('#nodeInfoTextID' + d.id).css('visibility', 'visible');
						}).on('mouseout', function(d) {
							$('#nodeInfoID' + d.id).css('visibility', 'hidden');
							$('#nodeInfoTextID' + d.id).css('visibility', 'hidden');
						});
						
						var value = nodeEnter.append('g').append('text').attr('x', rectNode.textMargin*4+ rectNode.width)
							.attr('y', function(d){return rectNode.textMargin + rectNode.height(d.name)/2;} )
							.attr('width', rectNode.width).attr('height', function(d){return rectNode.height(d.name)}).attr('class', 'node-value')
							.attr('fill', function(d) {
							return d.color?d.color: "#ccc";
						}).text(function(d){return d.formattedValue}).style("visibility", function(d){
							return (!d.formattedValue || attr.hideValues=="true")?"hidden" : "visible";
						});
						
						var lineValue = nodeEnter.append('g').append('line').attr('x1', rectNode.width +1)
							.attr('y1', function(d){return rectNode.height(d.name)/2;} )
							.attr('x2', rectNode.textMargin*3+ rectNode.width).attr('y2', function(d){return rectNode.height(d.name)/2;}).attr('class', 'node-value-link')
							.attr('stroke', function(d) {return d.color?d.color: "#ccc";})
							.style("visibility", function(d){
									return (!d.formattedValue || attr.hideValues=="true")?"hidden" : "visible";
								});
							


//						
//						nodeEnterTooltip.append("rect").attr('id', function(d) {
//							return 'nodeInfoID' + d.id;
//						}).attr('x', rectNode.width / 2).attr('y',function(d){return rectNode.height(d.name) / 2}).attr('width', tooltip.width).attr('height', tooltip.height).attr(
//								'class', 'tooltip-box').style('fill-opacity', 0.1).on('mouseover', function(d) {
//									console.log("d");
//							$('#nodeInfoID' + d.id).css('visibility', 'visible');
//							$('#nodeInfoTextID' + d.id).css('visibility', 'visible');
//							removeMouseEvents();
//						}).on('mouseout', function(d) {
//							$('#nodeInfoID' + d.id).css('visibility', 'hidden');
//							$('#nodeInfoTextID' + d.id).css('visibility', 'hidden');
//							reactivateMouseEvents();
//						});
//
//						nodeEnterTooltip.append("text").attr('id', function(d) {
//							return 'nodeInfoTextID' + d.id;
//						}).attr('x', rectNode.width / 2 + tooltip.textMargin).attr('y', function(d){return rectNode.height(d.name) / 2 + tooltip.textMargin * 2}).attr('width',
//								tooltip.width).attr('height', tooltip.height).attr('class', 'tooltip-text').style('fill', 'white').append("tspan").text(
//								function(d) {
//									return d.name;
//								}).append("tspan").attr('x', rectNode.width / 2 + tooltip.textMargin).attr('dy', '1.5em').text(function(d) {
//							return  "" +  (d.formattedValue?d.formattedValue:"");
//						});

						// Transition nodes to their new position.
						var nodeUpdate = node.transition().duration(duration).attr('transform', function(d) {
							return 'translate(' + d.y + ',' + d.x + ')';
						});
//						nodesTooltip.transition().duration(duration).attr('transform', function(d) {
//							return 'translate(' + d.y + ',' + d.x + ')';
//						});

						nodeUpdate.select('rect').attr('class', function(d) {
							return d._children ? 'node-rect-closed' : 'node-rect';
						}).style('fill-opacity', 0.1).style('fill', function(d){return d.color});

						nodeUpdate.select('text').style('fill-opacity', 1);

						// Transition exiting nodes to the parent's new
						// position
						var nodeExit = node.exit().transition().duration(duration).attr('transform', function(d) {
							return 'translate(' + source.y + ',' + source.x + ')';
						}).remove();
						nodesTooltip.exit().transition().duration(duration).attr('transform', function(d) {
							return 'translate(' + source.y + ',' + source.x + ')';
						}).remove();

						nodeExit.select('text').style('fill-opacity', 1e-6);

						// 2) ******************* Update the links
						// *******************
						var link = linkGroup.selectAll('path').data(links, function(d) {
							return d.target.id;
						});
						var linkTooltip = linkGroupToolTip.selectAll('g').data(links, function(d) {
							return d.target.id;
						});

						function linkMarkerStart(direction, isSelected) {
							if (direction == 'left' || direction == 'both') {
								return isSelected ? 'url(#start-arrow-selected)' : 'url(#start-arrow)';
							}
							return '';
						}

						function linkMarkerEnd(direction, isSelected) {
							if (direction == 'right' || direction == 'both') {
								return isSelected ? 'url(#end-arrow-selected)' : 'url(#end-arrow)';
							}
							return '';
						}

						d3.selection.prototype.moveToFront = function() {
							return this.each(function() {
								this.parentNode.appendChild(this);
							});
						};

						// Enter any new links at the parent's previous
						// position.
						// Enter any new links at the parent's previous
						// position.
						var linkenter = link.enter().insert('path', 'g').attr('class', 'link').attr('id', function(d) {
							return 'linkID' + d.target.id;
						}).attr('d', function(d) {
							return diagonal(d);
						}).attr('marker-end', function(d) {
							return linkMarkerEnd(d.target.direction, false);
						}).attr('marker-start', function(d) {
							return linkMarkerStart(d.target.direction, false);
						}).on('mouseover', function(d) {
							d3.select(this).moveToFront();

							d3.select(this).attr('marker-end', linkMarkerEnd(d.target.direction, true));
							d3.select(this).attr('marker-start', linkMarkerStart(d.target.direction, true));
							d3.select(this).attr('class', 'linkselected');

							$('#tooltipLinkID' + d.target.id).attr('x', (d.target.y + rectNode.width - d.source.y) / 2 + d.source.y);
							$('#tooltipLinkID' + d.target.id).attr('y', (d.target.x - d.source.x) / 2 + d.source.x);
							$('#tooltipLinkID' + d.target.id).css('visibility', 'visible');
							$('#tooltipLinkTextID' + d.target.id).css('visibility', 'visible');
						}).on('mouseout', function(d) {
							d3.select(this).attr('marker-end', linkMarkerEnd(d.target.direction, false));
							d3.select(this).attr('marker-start', linkMarkerStart(d.target.direction, false));
							d3.select(this).attr('class', 'link');
							$('#tooltipLinkID' + d.target.id).css('visibility', 'hidden');
							$('#tooltipLinkTextID' + d.target.id).css('visibility', 'hidden');
						});

						linkTooltip.enter().append('rect').attr('id', function(d) {
							return 'tooltipLinkID' + d.target.id;
						}).attr('class', 'tooltip-box').style('fill-opacity', 0.8).attr('x', function(d) {
							return (d.target.y + rectNode.width - d.source.y) / 2 + d.source.y;
						}).attr('y', function(d) {
							return (d.target.x - d.source.x) / 2 + d.source.x;
						}).attr('width', tooltip.width).attr('height', tooltip.height).on('mouseover', function(d) {
							$('#tooltipLinkID' + d.target.id).css('visibility', 'visible');
							$('#tooltipLinkTextID' + d.target.id).css('visibility', 'visible');
							// After selected a link,
							// the cursor can be hover
							// the tooltip,
							// that's why we still need
							// to highlight the link and
							// the arrow
							$('#linkID' + d.target.id).attr('class', 'linkselected');
							$('#linkID' + d.target.id).attr('marker-end',  linkMarkerEnd(d.target.direction, true));
							$('#linkID' + d.target.id).attr('marker-start', linkMarkerStart(d.target.direction, true));

							removeMouseEvents();
						}).on('mouseout', function(d) {
							$('#tooltipLinkID' + d.target.id).css('visibility', 'hidden');
							$('#tooltipLinkTextID' + d.target.id).css('visibility', 'hidden');
							$('#linkID' + d.target.id).attr('class', 'link');
							$('#linkID' + d.target.id).attr('marker-end',  linkMarkerEnd(d.target.direction, false));
							$('#linkID' + d.target.id).attr('marker-start', linkMarkerStart(d.target.direction, false));

							reactivateMouseEvents();
						});

						linkTooltip.enter().append('text').attr('id', function(d) {
							return 'tooltipLinkTextID' + d.target.id;
						}).attr('class', 'tooltip-text').attr('x', function(d) {
							return (d.target.y + rectNode.width - d.source.y) / 2 + d.source.y + tooltip.textMargin;
						}).attr('y', function(d) {
							return (d.target.x - d.source.x) / 2 + d.source.x + tooltip.textMargin * 2;
						}).attr('width', tooltip.width).attr('height', tooltip.height).style('fill', 'white').append("tspan").text(function(d) {
							return d.label;
						}).append("tspan").attr('x', function(d) {
							return (d.target.y + rectNode.width - d.source.y) / 2 + d.source.y + 2*tooltip.textMargin;
						}).attr('dy', '0.75em').text(function(d) {
							return d.target.label;
						});

						// Transition links to their new position.
						var linkUpdate = link.transition().duration(duration).attr('d', function(d) {
							return diagonal(d);
						});
						linkTooltip.transition().duration(duration).attr('d', function(d) {
							return diagonal(d);
						});

						// Transition exiting nodes to the parent's new
						// position.
						link.exit().transition().remove();

						linkTooltip.exit().transition().remove();

						// Stash the old positions for transition.
						nodes.forEach(function(d) {
							d.x0 = d.x;
							d.y0 = d.y;
						});
					}

					// Zoom functionnality is desactivated (user can use
					// browser Ctrl + mouse
					// wheel shortcut)
					function zoomAndDrag() {
						// var scale = d3.event.scale,
						var scale = 1, translation = d3.event.translate, tbound = -height * scale, bbound = height * scale, lbound = (-width + margin.right)
								* scale, rbound = (width - margin.left) * scale;
						// limit translation to thresholds
						translation = [ Math.max(Math.min(translation[0], rbound), lbound), Math.max(Math.min(translation[1], bbound), tbound) ];
						d3.select('.drawarea').attr('transform', 'translate(' + translation + ')' + ' scale(' + scale + ')');
					}

					function toggle(d) {
						if (d.children) {
							d._children = d.children;
							d.children = null;
						} else {
							d.children = d._children;
							d._children = null;
						}
					}

					// Toggle children on click.
					function click(d) {
						if (d.children) {
							d._children = d.children;
							d.children = null;
						} else {
							d.children = d._children;
							d._children = null;
						}
						update(d);
					}

					// Breadth-first traversal of the tree
					// func function is processed on every node of a
					// same level
					// return the max level
					function breadthFirstTraversal(tree, func) {
						var max = 0;
						if (tree && tree.length > 0) {
							var currentDepth = tree[0].depth;
							var fifo = [];
							var currentLevel = [];

							fifo.push(tree[0]);
							while (fifo.length > 0) {
								var node = fifo.shift();
								if (node.depth > currentDepth) {
									func(currentLevel);
									currentDepth++;
									max = Math.max(max, currentLevel.length);
									currentLevel = [];
								}
								currentLevel.push(node);
								if (node.children) {
									for (var j = 0; j < node.children.length; j++) {
										fifo.push(node.children[j]);
									}
								}
							}
							func(currentLevel);
							return Math.max(max, currentLevel.length);
						}
						return 0;
					}

					// x = ordoninates and y = abscissas
					function collision(siblings) {
						var minPadding = 5;
						if (siblings) {
							for (var i = 0; i < siblings.length - 1; i++) {
								if (siblings[i + 1].x - (siblings[i].x + rectNode.height(siblings[i].name)) < minPadding)
									siblings[i + 1].x = siblings[i].x + rectNode.height(siblings[i].name) + minPadding;
							}
						}
					}

					function removeMouseEvents() {
						// Drag and zoom behaviors are temporarily
						// disabled, so tooltip text can
						// be selected
						mousedown = d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('mousedown.zoom');
						d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on("mousedown.zoom", null);
					}

					function reactivateMouseEvents() {
						// Reactivate the drag and zoom behaviors
						d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('mousedown.zoom', mousedown);
					}

					// Name of the event depends of the browser
					function getMouseWheelEvent() {
						if (d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('wheel.zoom')) {
							mouseWheelName = 'wheel.zoom';
							return d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('wheel.zoom');
						}
						if (d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('mousewheel.zoom') != null) {
							mouseWheelName = 'mousewheel.zoom';
							return d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('mousewheel.zoom');
						}
						if (d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('DOMMouseScroll.zoom')) {
							mouseWheelName = 'DOMMouseScroll.zoom';
							return d3.select("#collapsibleTreeBoxes" + scope.panelIndex).select('svg').on('DOMMouseScroll.zoom');
						}
					}

					function diagonal(d) {
						var rightOffset = d.target.direction=='both' || d.target.direction=='right'?12:2;
						var leftOffset = d.target.direction=='both' || d.target.direction=='left'?12:2;
						var p0 = {
							x : d.source.x + rectNode.height(d.name) / 2,
							y : (d.source.y + rectNode.width)+leftOffset
						}, p3 = {
							x : d.target.x + rectNode.height(d.name) / 2,
							y : d.target.y - rightOffset
						// -12, so the end arrows are just before
						// the rect node
						}, m = (p0.y + p3.y) / 2, p = [ p0, {
							x : p0.x,
							y : m
						}, {
							x : p3.x,
							y : m
						}, p3 ];
						p = p.map(function(d) {
							return [ d.y, d.x ];
						});
						return 'M' + p[0] + 'C' + p[1] + ' ' + p[2] + ' ' + p[3];
					}

					function initDropShadow() {
						var filter = defs.append("filter").attr("id", "drop-shadow").attr("color-interpolation-filters", "sRGB");

						filter.append("feOffset").attr("result", "offOut").attr("in", "SourceGraphic").attr("dx", 0).attr("dy", 0);

						filter.append("feGaussianBlur").attr("stdDeviation", 2);

						filter.append("feOffset").attr("dx", 2).attr("dy", 2).attr("result", "shadow");

						filter.append("feComposite").attr("in", 'offOut').attr("in2", 'shadow').attr("operator", "over");
					}

					function initArrowDef() {
						// Build the arrows definitions
						// End arrow
						defs.append('marker').attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10').attr('refX', 0).attr('refY', 0).attr('markerWidth', 6)
								.attr('markerHeight', 6).attr('orient', 'auto').attr('class', 'arrow').append('path').attr('d', 'M0,-5L10,0L0,5');

						// End arrow selected
						defs.append('marker').attr('id', 'end-arrow-selected').attr('viewBox', '0 -5 10 10').attr('refX', 0).attr('refY', 0).attr(
								'markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').attr('class', 'arrowselected').append('path').attr('d',
								'M0,-5L10,0L0,5');

						// Start arrow
						defs.append('marker').attr('id', 'start-arrow').attr('viewBox', '-10 -5 10 10').attr('refX', 0).attr('refY', 0).attr('markerWidth', 6)
								.attr('markerHeight', 6).attr('orient', 'auto').attr('class', 'arrow').append('path').attr('d', 'M0,-5L-10,0L0,5');

						// Start arrow selected
						defs.append('marker').attr('id', 'start-arrow-selected').attr('viewBox', '-10 -5 10 10').attr('refX', 0).attr('refY', 0).attr(
								'markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').attr('class', 'arrowselected').append('path').attr('d',
								'M0,-5L-10,0L0,5');
					}
				}
			}
		});
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('forcedirectedChart', function() {
    return {
      restrict: 'E',
      scope: {
        links: '='
      },
      template: '<div class="forcedirected-chart"><div id="forcedirectedPanel{{panelIndex}}" class="forcedirected-canvas"></div>' +
        '<div class="forcedirected-legend">' +
        '<div class="forcedirected-legend-block {{block.name}}" ng-repeat="block in legendBlocks"><div class="forcedirected-legend-block-title">{{block.label}}</div>' +
        '<span ng-repeat="n in block.items track by $index" class="forcedirected-legend-item legend_{{n.clazz}}">' +
        '<span class="forcedirected-legend-{{n.type}}" style="{{n.style}}"></span><span>{{n.label}}</span>' +
        '</div>',
      link: function(scope, elem, attr) {
    	  console.log("forcedirectedChart attr", attr);
        scope.panelIndex = Math.floor((Math.random() * 10000) + 1);
        var margin = {
          top: 8,
          right: 8,
          bottom: 8,
          left: 8
        };

        function circlePath(cx, cy, r) {
          return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
        }

        function hexagonPath(cx, cy, a) {
          var h = a * Math.sin(Math.PI / 3);
          var points = new Array();
          points.push({
            x: cx - a,
            y: cy
          });
          points.push({
            x: cx - a / 2,
            y: cy + h
          });
          points.push({
            x: cx + a / 2,
            y: cy + h
          });
          points.push({
            x: parseInt(cx) + parseInt(a),
            y: cy
          });
          points.push({
            x: cx + a / 2,
            y: cy - h
          });
          points.push({
            x: cx - a / 2,
            y: cy - h
          });
          points.push({
            x: cx - a,
            y: cy
          }); /// ?????
          var path = "M 0 0";
          for (var i = 0; i < points.length; i++) {
            var p = points[i];
            path += "L" + p.x + " " + p.y + " ";
          }
          return path + " Z";
        }

        var nodePaths = function(type, r) {
          if (type == "hexagon")
            return hexagonPath(0, 0, r);
          else
            return circlePath(0, 0, r);

        };

        var nodeTypeIcon = scope.$eval(attr.nodeTypes);
        console.log("nodeTypeIcon",nodeTypeIcon);
        if (typeof attr.linkLine == 'undefined' || attr.linkLine === null)
          attr.linkLine = "bezier";

        var linkLength = 120;
        if (typeof attr.linkLength != 'undefined' && attr.linkLength !== null && attr.linkLength !== "null" && attr.linkLength !== "") {
          linkLength = attr.linkLength;
        }

        var radiusMin = 6;
        var radius = Math.round(radiusMin + radiusMin / 2);

        if (typeof attr.nodeSize != 'undefined' && attr.nodeSize !== null && attr.nodeSize !== "null" && attr.nodeSize !== "") {
          radius = attr.nodeSize;
          radiusMin = Math.round(2 * radius / 3);
        }

  //      var computeStatistic = false;
  //      if (attr.computeStatistic == 'true')
  //        computeStatistic = true;

        scope.$watch('links', function() {
          var width = (typeof attr.width == 'undefined' || attr.width === null) ? 500 : parseInt(attr.width);
          var height = (typeof attr.height == 'undefined' || attr.height === null) ? 500 : parseInt(attr.height);
          console.log("forcedirected - width: " + width + " height: " + height);

          height = height - margin.top - margin.bottom;
          var links = scope.links;
          var nodes = {};
          var linksTypes = {};
          scope.legendBlocks = {
        	"Links": {items: [],name: "force-directed-links",label: ""},
          	"Series": {items: [],name: "force-directed-series",label: ""}
          };

          var allNodeTypes = {};
          // Compute the distinct nodes from the links.
          links.forEach(function(link) {
            var nodeIcon = 'circle';
            if (typeof nodeTypeIcon != 'undefined' && nodeTypeIcon !== null && nodeTypeIcon[link.sourceType] != 'undefined')
              nodeIcon = nodeTypeIcon[link.sourceType];
            link.source = nodes[link.source + "_" + link.sourceType] || (nodes[link.source + "_" + link.sourceType] = {
              name: link.source,
              type: link.sourceType,
              label: link.sourceLabel,
              count: 0,
              radius: radius,
              nodeIcon: nodeIcon
            });
            nodes[link.source.name + "_" + link.sourceType].count += link.count;
            nodeIcon = 'circle';
            if (typeof nodeTypeIcon != 'undefined' && nodeTypeIcon !== null && nodeTypeIcon[link.sourceType] != 'undefined')
              nodeIcon = nodeTypeIcon[link.targetType];

            link.target = nodes[link.target + "_" + link.targetType] || (nodes[link.target + "_" + link.targetType] = {
              name: link.target,
              type: link.targetType,
              label: link.targetLabel,
              count: 0,
              radius: radius,
              nodeIcon: nodeIcon,
            });
            nodes[link.target.name + "_" + link.targetType].count += link.count;

            // prepare legend for links
            if (typeof linksTypes[link.type] == 'undefined') {
              linksTypes[link.type] = link.type;
              scope.legendBlocks.Links.items.push({
            	"type":"link",
                "label": link.type,
                "clazz": "links_" + clearString(link.type.split(' ').join('_')).toLowerCase(),
                "style":"background-color: " + link.color
              });
            }
            
            if(!allNodeTypes[link.sourceType])
            	allNodeTypes[link.sourceType] = link.sourceType;
            if(!allNodeTypes[link.targetType])
            	allNodeTypes[link.targetType] = link.targetType;

          });


          for (var key in allNodeTypes) {
              if (allNodeTypes.hasOwnProperty(key)) {
            	  scope.legendBlocks.Series.items.push({
                  	"type":"serie",
                    "label": allNodeTypes[key],
                    "clazz": "serie_" + clearString(allNodeTypes[key].split(' ').join('_')).toLowerCase()
            	  });
              }
          }
          for (var key in nodes) {
            if (nodes.hasOwnProperty(key)) {
              var nodeType = nodes[key].type;
              if (typeof scope.legendBlocks[nodeType] == 'undefined')
                scope.legendBlocks[nodeType] = {
                  "name": "force-directed-nodes node_" + nodeType,
                  "label": nodes[key].label,
                  "items": []
                };
              scope.legendBlocks[nodeType].items.push({
            	"type": "node",
                "label": nodes[key].name,
                "clazz": "serie_" + nodes[key].type + " node_" + clearString(("" + nodes[key].name).split(' ').join('_'))
              });

            }
          }

          var force = d3.layout.force().nodes(d3.values(nodes)).links(links).size([width, height]).linkDistance(linkLength).charge(-800).on("tick", tick)
            .start();

          d3.select("#forcedirectedPanel" + scope.panelIndex + " svg").remove();
          var svg = d3.select("#forcedirectedPanel" + scope.panelIndex).append("svg").attr("class", "forcedirected-chart").attr("width",
            width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);

          var path = svg.append("g").selectAll("path").data(force.links()).enter().append("path").attr("class", function(d) {
            return "link link_" + d.type + " " + "source_" + clearString(("" + d.source.name).split(' ').join('_')) + " " + "target_" + 
            	clearString(("" + d.target.name).split(' ').join('_')) + " link_" + d.sourceType + "_" + d.targetType;
          }).attr("marker-end", function(d) {
            return "url(#link_" + d.sourceType + "_" + d.targetType + ")";
          }).attr("style", function(d){return d.color?"stroke:"+d.color:"";});

          var circle = svg.append("g").selectAll("circle").data(force.nodes()).enter().append("path")
            .attr("d", function(d) {
              return nodePaths(d.nodeIcon, d.radius);
            }).attr("class", function(d) {
              var clazz = "node " + d.type;
              if (typeof d.name != 'undefined')
                clazz += " " + clearString((""+d.name).split(' ').join('_'));
              return clazz;
            }).call(force.drag);

          var text = svg.append("g").selectAll("text").data(force.nodes()).enter().append("text").attr("x", 16).attr("y", ".31em").attr("class", function(d) {
            var clazz = "label " + d.type;
            if (typeof d.name != 'undefined')
              clazz += " " + clearString((""+d.name).split(' ').join('_'));
            return clazz;
          }).text(function(d) {
            return d.name;
          });

          function tick(d) {
            path.attr("d", linkLine);
            circle.attr("transform", transform);
            text.attr("transform", transform);
          }

        });

        function linkLine(d) {
        var linkLineType = attr.linkLine
        if(d.linkLine)
        	linkLineType  = d.linkLine;
        	
        if (linkLineType  == "bezier")
            return linkBezier(d);
          else if (linkLineType  == "arc")
            return linkArc(d);
          else if (linkLineType  == "straight")
            return linkStraight(d);
          else
            return linkBezier(d);
        }

        function linkArc(d) {
          var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        }

        function linkStraight(d) {
          return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
        }

        function clearString(input) {
          return input.replace(/[^\w\s]/gi, '');
        }

        function linkBezier(d) {
          var curvature = 0.5;
          var xi = d3.interpolateNumber(d.source.x, d.target.x);
          var x2 = xi(curvature);
          var x3 = xi(1 - curvature);

          return "M" + d.source.x + "," + d.source.y +
            "C" + x2 + "," + d.source.y +
            " " + x3 + "," + d.target.y +
            " " + d.target.x + "," + d.target.y;
        }

        function transform(d) {
          return "translate(" + d.x + "," + d.y + ")";
        }

      }
    };

  });
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('funnelChart', function($timeout,$rootScope) {
	return {
		restrict : 'E',
		scope:{data :'=', showLegend:"@",  widgetid: "@", colors:"=", mouth: "="},
		template: '<div id="funnelPanel{{panelIndex}}" class="funnel-container"><div id="fake-{{panelIndex}}"></div></div>',
		link : function(scope, elem, attr) {
			console.info("Funnel - attr", attr);
			console.debug("Funnel - elem", elem);
			console.debug("Funnel - scope", scope);
			var showLegend = true;
			if(scope.showLegend == "false")
				showLegend = false;

			scope.panelIndex  = Math.floor((Math.random() * 10000) + 1); 
			var margin = {top : 0, right : 0, bottom : 0, left : 0};

			var ignoreClick = false;

			function onAreaClick(browseHistory){
            	 console.log("onAreaClick ignoreClick", browseHistory, ignoreClick);


            	 if(ignoreClick){
            		 ignoreClick = false;
            	 }
            	 else{
            		 console.log("data", scope.data);
            		 var path = [];
	 	    	     for (var key in browseHistory) {
	 	    	    	 if (browseHistory.hasOwnProperty(key)) {
							  path.push(browseHistory[key].value);
					     }
	 	    	     }
	 	    	     path.push(scope.data.name);

	 	    	     var event = {"sourceId": scope.widgetid,
	            			 	  "eventtype": "dataset.browse", 
	            			 	  "data": {"browseHistory":browseHistory, "path":path.reverse()}, 
	            			 	  "widget": "treemap"};
					$rootScope.$broadcast('yucca-treemap-event', event);
	            	 console.log("yucca-treemap-event", event);
            	 }
            };
			
			scope.$on('yucca-widget-event-'+scope.widgetid, function(e, event) {  
				console.log("yucca-widget-event-"+scope.widgetid,e, event);
			});

			var findMaxLabel = function(){
				var maxLabel = "";
				for(var i=0; i<scope.data.length; i++){
					if(scope.data[i].label.length>maxLabel.length)
						maxLabel = scope.data[i].label;
				}
				return maxLabel;
			}

			scope.$watch('data', function() {
				console.log("data change", scope.data);
				
				var width = (typeof attr.width == 'undefined' || attr.width == null) ? 500: parseInt(attr.width);
				var height = (typeof attr.height == 'undefined' || attr.height == null) ? 500: parseInt(attr.height);

				height = height - margin.top - margin.bottom;
				var sectionHeight = parseInt(height/scope.data.length);

				var radius = Math.min(width, height) / 2;
				//var color = d3.scale.ordinal().range(["#255aee","#3a6fff","#4f84ff","rgb(101,154,302)","rgb(122,175,323)", "rgb(144,197,345)", "rgb(165,218,366)"]);
				var color = d3.scale.ordinal().range(scope.colors);
				console.log("colors",color);
				console.log("colors",scope.colors);
				scope.legendColors = [];
				if(scope.data !=null){
					var maxLabel = findMaxLabel();
					var fakeText = d3.select("#fake-"+ scope.panelIndex ).insert("svg").append("text").text(maxLabel);
					var horizontalOffset =  fakeText.node().getComputedTextLength()+6;
					d3.select("#fake-"+ scope.panelIndex).remove();

					d3.select("#funnelPanel"+scope.panelIndex+" svg").remove();
					var svg = d3.select("#funnelPanel"+scope.panelIndex).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.bottom + margin.top)
							.style("margin-left", -margin.left + "px").style("margin.right", -margin.right + "px").append("g");
	
					var funnel = d3.funnel().size([width,height]).showMouth(scope.mouth).horizontalOffset(horizontalOffset).value(function(d) { return d.value; });
					   
					var line = d3.svg.line().interpolate('line-closed').x(function(d,i) { return d.x; }).y(function(d,i) { return d.y; });
						
					var g = svg.selectAll(".funnel-group").data(funnel(scope.data)).enter().append("g").attr("class", "funnel-group");

				
					g.append("path").attr("d", function (d){ return line(d.coordinates); }).style("fill", function(d) { return color(d.label); });
				
					g.append("line").attr("x1",0)
						.attr("x2",function(d){return d.coordinates[2].x})
						.attr("y1",function(d){return d.coordinates[0].y+sectionHeight})
						.attr("y2",function(d){return d.coordinates[0].y+sectionHeight})
						.attr("class",function(d){return "funnel-chart-label-line " + d.key;});
//						.style("stroke", function(d) { return color(d.label); })
//						.style("stroke-width", 0.4 )
//						;
					g.append("text").attr({
						"y": function (d,i) {
							
							return parseInt(d.coordinates[0].y+sectionHeight-4);
							//if(d.coordinates.length === 4) {
							//	return (((d.coordinates[0].y-d.coordinates[1].y)/2)+d.coordinates[1].y) + 5;
							//} else {
							//	return (d.coordinates[0].y + d.coordinates[1].y)/2 + 10;
							//}
						},
						"x": function (d,i) { return 0;}
					})
					.style("text-anchor", "right")
					.text(function(d) { return d.label; });





					
					
					
					
					
					function guessForegroundColor(color){
						var rgb = parseInt(color.replace('#', ''), 16);   // convert rrggbb to decimal
						var r = (rgb >> 16) & 0xff;  // extract red
						var g = (rgb >>  8) & 0xff;  // extract green
						var b = (rgb >>  0) & 0xff;  // extract blue

						var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
						
						var foregroundColor = "#fff";
						if (luma > 164) {
							foregroundColor = "#000";
						}
						return foregroundColor;
					}

					

				}
			});

	
			d3.funnel = function() {
				var size = [1,1],
					mouth = [1,1],
					horizontalOffset,
					showMouth,
					sort_data,
					value = function(d) { return d.value},
					coordinates;
				var percentageValues = function (data) {
				  var values = data.map(value);
				  var percentValues = data.map(function (d,i){
					d.value = +values[i];
					var weight_max = d3.max(data, function (d,i) {
					  return d.value;
					})
					return d.value/weight_max*100;
				  });
				  percentValues.sort(function(a,b){
					return b-a;
				  });
				  return percentValues;
				}

				var coordinatesCalculation = function(data){
					console.log("funnel data", data, size[1]);
					var w = size[0]-horizontalOffset,
						h = size[1],
						coordinates = [];
						var allPercentValues = percentageValues(data);
						var sectionHeight = parseInt(h/data.length);

						for (var i=0; i<data.length; i++){
							var selectedPercentValues = allPercentValues[i];
							var hTop = i*  sectionHeight;
							var hBottom = (i+1)*  sectionHeight;
							var wLeftTop = horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2);
							var wRightTop =  horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2 + w*allPercentValues[i]/100);
							var wLeftBottom;
							var wRightBottom;
							if(i==data.length-1){
								if(!showMouth){
									wLeftBottom =  horizontalOffset + parseInt(w/2);
									wRightBottom = horizontalOffset + parseInt(w/2);
								}
								else{
									wLeftBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2);
									wRightBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2 + w*allPercentValues[i]/100);
									}
							}
							else{
								wLeftBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i+1]/100)/2);
								wRightBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i+1]/100)/2 + w*allPercentValues[i+1]/100);

							}

							coordinates[i] = {"values":[
								{"x":wLeftTop,"y":hTop},
								{"x":wRightTop,"y":hTop},
								{"x":wRightBottom,"y":hBottom},
								{"x":wLeftBottom,"y":hBottom}
							]};
							  
						}
						return coordinates;
				  }

				var coordinatesCalculationPercentage = function(data){
					console.log("funnel data", data, size[1]);
				  var w = size[0],
					  h = size[1],
					  rw = mouth[0], //rect width
					  rh = mouth[1], //rect height
					  tw = (w - rw)/2, //triangle width
					  th = h - rh, //triangle height
					  height1=0,
					  height2=0,
					  height3=0,
					  merge = 0,
					  coordinates = [],
					  ratio = tw/th,
					  area_of_trapezium = (w + rw) / 2 * th,
					  area_of_rectangle = rw * rh,
					  total_area = area_of_trapezium + area_of_rectangle,
					  percent_of_rectangle = area_of_rectangle / total_area * 100;
					  console.log("percent_of_rectangle",percent_of_rectangle);
					  var allPercentValues = percentageValues(data);
					  var heightEqual = parseInt(h/data.length);
				  for (var i=data.length-1; i>=0; i--){
					var selectedPercentValues = allPercentValues[i];
					console.log("funnel selectedPercentValues",data[i], selectedPercentValues)
					if (percent_of_rectangle>=selectedPercentValues){
					  height3 = selectedPercentValues / percent_of_rectangle * rh;
					  height1 = h - height3;
					  if (i===data.length-1){
						coordinates[i] = {"values":[{"x":(w-rw)/2,"y":height1},{"x":(w-rw)/2,"y":h},{"x":((w-rw)/2)+rw,"y":h},{"x":((w-rw)/2)+rw,"y":height1}]};
					  }else{
						coordinates[i] = {"values":[{"x":(w-rw)/2,"y":height1+coordinates[i+1].values[3].y},coordinates[i+1].values[0],coordinates[i+1].values[3],{"x":((w-rw)/2)+rw,"y":height1 + coordinates[i+1].values[3].y}]};
					  }
					  console.log("primo if ",coordinates[i],height1, height3, rh)
					}else{
					  var area_of_element = ((selectedPercentValues)/100 * total_area) - area_of_rectangle,
						  a = 2 * ratio,
						  b = 2 * rw,
						  c = 2 * area_of_element;
					  height2 = (-b + Math.sqrt(Math.pow(b,2) - (4 * a * -c))) / (2 * a);
					  height1 = h - height2 - rh;
					  var base = 2*(ratio * height2)+rw,
					  xwidth = (w-base)/2;
					  
					  if(merge===0){
						if (i===data.length-1){
						  coordinates[i] = {"values":[{"x":xwidth,"y":height1},
							  {"x":(w-rw)/2,"y":th},
							  {"x":(w-rw)/2,"y":h},
							  {"x":((w-rw)/2)+rw,"y":h},
							  {"x":((w-rw)/2)+rw,"y":th},
							  {"x":base+xwidth,"y":height1}]};
						}else{
						  coordinates[i] = {"values":[{"x":xwidth,"y":height1},
						  {"x":(w-rw)/2,"y":th},
						  coordinates[i+1].values[0],coordinates[i+1].values[3],
						  {"x":((w-rw)/2)+rw,"y":th},
						  {"x":base+xwidth,"y":height1}]};
						}
					  }
					  else{
						var coindex;
						if(coordinates[i+1].values.length===6){
						  coindex = 5;
						}else{
						  coindex = 3;
						}
						conidex = i+1;
						coordinates[i] = {"values":[{"x":xwidth,"y":height1},
											coordinates[i+1].values[0],
											coordinates[i+1].values[coindex],
											{"x":base+xwidth,"y":height1}]};
					  }
					  merge = 1;
					  console.log("primo else ",coordinates[i].values[1].y,height1, height3, rh, th)

					}
				  }
				  return coordinates;
				}
				function funnel(data) {
				  var i = 0,
					  coordinates = coordinatesCalculation(data);
				  data.sort(function(a,b) {
					return b.value - a.value;
				  })
				  data.forEach(function(){
					data[i].coordinates = coordinates[i].values;
					i++;
				  })
				  return data;
				}
				funnel.size = function(s){
				  if (s.length!==2){
				  } else {
					size = s;
				  }
				  return funnel;
				}
				funnel.mouth = function(m){
				  if (m.length!==2){
				  } else {
					mouth = m;
				  }
				  return funnel;
				}
				funnel.showMouth = function(show){
					showMouth = show;
					return funnel;
				}
				funnel.horizontalOffset = function(o){
					if (o){
						horizontalOffset = o;
					} else {
					  horizontalOffset = 0;
					}
					return funnel;
				  }
				funnel.value = function(v) {
				  if (!arguments.length) return value;
				  value = v;
				  return funnel;
				};
				return funnel;
			  }
			  /*
			  var  roundPathCorners = function(pathString, radius, useFractionalRadius) {
				function moveTowardsLength(movingPoint, targetPoint, amount) {
				  var width = (targetPoint.x - movingPoint.x);
				  var height = (targetPoint.y - movingPoint.y);
				  
				  var distance = Math.sqrt(width*width + height*height);
				  
				  return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
				}
				function moveTowardsFractional(movingPoint, targetPoint, fraction) {
				  return {
					x: movingPoint.x + (targetPoint.x - movingPoint.x)*fraction,
					y: movingPoint.y + (targetPoint.y - movingPoint.y)*fraction
				  };
				}
				
				// Adjusts the ending position of a command
				function adjustCommand(cmd, newPoint) {
				  if (cmd.length > 2) {
					cmd[cmd.length - 2] = newPoint.x;
					cmd[cmd.length - 1] = newPoint.y;
				  }
				}
				
				// Gives an {x, y} object for a command's ending position
				function pointForCommand(cmd) {
				  return {
					x: parseFloat(cmd[cmd.length - 2]),
					y: parseFloat(cmd[cmd.length - 1]),
				  };
				}
				
				// Split apart the path, handing concatonated letters and numbers
				var pathParts = pathString
				  .split(/[,\s]/)
				  .reduce(function(parts, part){
					var match = part.match("([a-zA-Z])(.+)");
					if (match) {
					  parts.push(match[1]);
					  parts.push(match[2]);
					} else {
					  parts.push(part);
					}
					
					return parts;
				  }, []);
				
				// Group the commands with their arguments for easier handling
				var commands = pathParts.reduce(function(commands, part) {
				  if (parseFloat(part) == part && commands.length) {
					commands[commands.length - 1].push(part);
				  } else {
					commands.push([part]);
				  }
				  
				  return commands;
				}, []);
				
				// The resulting commands, also grouped
				var resultCommands = [];
				
				if (commands.length > 1) {
				  var startPoint = pointForCommand(commands[0]);
				  
				  // Handle the close path case with a "virtual" closing line
				  var virtualCloseLine = null;
				  if (commands[commands.length - 1][0] == "Z" && commands[0].length > 2) {
					virtualCloseLine = ["L", startPoint.x, startPoint.y];
					commands[commands.length - 1] = virtualCloseLine;
				  }
				  
				  // We always use the first command (but it may be mutated)
				  resultCommands.push(commands[0]);
				  
				  for (var cmdIndex=1; cmdIndex < commands.length; cmdIndex++) {
					var prevCmd = resultCommands[resultCommands.length - 1];
					
					var curCmd = commands[cmdIndex];
					
					// Handle closing case
					var nextCmd = (curCmd == virtualCloseLine)
					  ? commands[1]
					  : commands[cmdIndex + 1];
					
					// Nasty logic to decide if this path is a candidite.
					if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == "L" && nextCmd.length > 2 && nextCmd[0] == "L") {
					  // Calc the points we're dealing with
					  var prevPoint = pointForCommand(prevCmd);
					  var curPoint = pointForCommand(curCmd);
					  var nextPoint = pointForCommand(nextCmd);
					  
					  // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
					  var curveStart, curveEnd;
					  
					  if (useFractionalRadius) {
						curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
						curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
					  } else {
						curveStart = moveTowardsLength(curPoint, prevPoint, radius);
						curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
					  }
					  
					  // Adjust the current command and add it
					  adjustCommand(curCmd, curveStart);
					  curCmd.origPoint = curPoint;
					  resultCommands.push(curCmd);
					  
					  // The curve control points are halfway between the start/end of the curve and
					  // the original point
					  var startControl = moveTowardsFractional(curveStart, curPoint, .5);
					  var endControl = moveTowardsFractional(curPoint, curveEnd, .5);
				
					  // Create the curve 
					  var curveCmd = ["C", startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
					  // Save the original point for fractional calculations
					  curveCmd.origPoint = curPoint;
					  resultCommands.push(curveCmd);
					} else {
					  // Pass through commands that don't qualify
					  resultCommands.push(curCmd);
					}
				  }
				  
				  // Fix up the starting point and restore the close path if the path was orignally closed
				  if (virtualCloseLine) {
					var newStartPoint = pointForCommand(resultCommands[resultCommands.length-1]);
					resultCommands.push(["Z"]);
					adjustCommand(resultCommands[0], newStartPoint);
				  }
				} else {
				  resultCommands = commands;
				}
				
				return resultCommands.reduce(function(str, c){ return str + c.join(" ") + " "; }, "");
			  };*/
			  

		}
	};
});
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('sankeyChart', function() {
	return {
		restrict : 'E',
		scope:{data :'=', numberFormat: '='},
		template: '<div id="sankeyPanel{{panelIndex}}"></div>'+
				'<div class="legend" ng-show="legendColors.length>0">'+
				'<span class="legend-label">0</span>' +
				'<span ng-repeat="c in legendColors track by $index" class="legend-bullet" style="background-color: {{c}}">{{cc}}</span>' +
				'<span class="legend-label">100</span>' +
				'</div>',
		link : function(scope, elem, attr) {
			console.log("attr", attr);
			console.log("elem", elem);
			console.log("scope", scope);
			console.log("scope.numberFormat",scope.numberFormat);
			scope.panelIndex  = Math.floor((Math.random() * 10000) + 1); 
			var margin = {top: 0, right: 0, bottom: 0, left: 0};
		    //var formatNumber = d3.format(",.0f");
		    //var format = function(d) { return safeNumber(d, scope.numberFormat); };
		    var color = d3.scale.category20();


			scope.$watch('data', function() {
				console.log("attr.width in", attr.width);
				var width = (typeof attr.width == 'undefined' || attr.width == null) ? 500: parseInt(attr.width);
				var height = (typeof attr.height == 'undefined' || attr.height == null) ? 500: parseInt(attr.height);
				height = height - margin.top - margin.bottom-12;

				d3.select("#sankeyPanel"+scope.panelIndex+" svg").remove();
				var svg = d3.select("#sankeyPanel"+scope.panelIndex).append("svg").attr("class","sankey-chart").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				var sankey = d3.sankey().nodeWidth(15).nodePadding(10).size([width, height]);
				
				var path = sankey.link();

				sankey.nodes(scope.data.nodes).links(scope.data.links).layout(32);

			  var link = svg.append("g").selectAll(".link")
			      .data(scope.data.links)
			      .enter().append("path")
			      .attr("class", "link")
			      .attr("d", path)
			      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
			      .sort(function(a, b) { return b.dy - a.dy; });

			  link.append("title")
			      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + safeNumber(d.value, scope.numberFormat); });

			  var node = svg.append("g").selectAll(".node")
			      .data(scope.data.nodes)
			      .enter().append("g")
			      .attr("class", "node")
			      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
			      .call(d3.behavior.drag()
			      .origin(function(d) { return d; })
			      .on("dragstart", function() { this.parentNode.appendChild(this); })
			      .on("drag", dragmove));

			  node.append("rect")
			      .attr("height", function(d) { return d.dy; })
			      .attr("width", sankey.nodeWidth())
			      .style("fill", function(d) { 
			    	  if(typeof d.color == 'undefined' || d.color == null)
			    		  d.color = color(d.name.replace(/ .*/, "")); 
			    	  else if(d.fades)
			    		  d.color = ColorLuminance(d.color, Math.random()-.5);
			    	  return d.color; 
			    	  })
			      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
			    .append("title")
			      .text(function(d) { return d.label + "\n" + safeNumber(d.value, scope.numberFormat); });

			  node.append("text")
			      .attr("x", -6)
			      .attr("y", function(d) { return d.dy / 2; })
			      .attr("dy", ".35em")
			      .attr("text-anchor", "end")
			      .attr("transform", null)
			      .text(function(d) { return d.label; })
			    .filter(function(d) { return d.x < width / 2; })
			      .attr("x", 6 + sankey.nodeWidth())
			      .attr("text-anchor", "start");

			  function dragmove(d) {
			    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
			    sankey.relayout();
			    link.attr("d", path);
			  }				
				
			  var newHeight = sankey.computeHeight();
			  console.log("newHeight",newHeight);
			  d3.select("#sankeyPanel"+scope.panelIndex+" svg").attr("height",newHeight+12);
			});

	
			function ColorLuminance(hex, lum) {
				// validate hex string
				hex = String(hex).replace(/[^0-9a-f]/gi, '');
				if (hex.length < 6) {
					hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
				}
				lum = lum || 0;

				// convert to decimal and change luminosity
				var rgb = "#", c, i;
				for (i = 0; i < 3; i++) {
					c = parseInt(hex.substr(i*2,2), 16);
					c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
					rgb += ("00"+c).substr(c.length);
				}

				return rgb;
			}

			var safeNumber = function(input, format) {
				var result = input;
				if(!isNaN(input) ){
					if(input)
						input = parseFloat(input);
					if(format){
						if(format.euro){
							result = formatEuro(input, format.decimal,format.bigNumber);
						}
						else{
							if(isNaN(format.decimal)){
								if(Math.abs(input)>100)
									format.decimal=0;
								else if(Math.abs(input)<1){
									format.decimal= -1*Math.log10(input) +1;
									if(format.decimal < 0)
										format.decimal = 0;
									else if(format.decimal>20)
										format.decimal =20;
								}
								else
									format.decimal = 2;
							}
							result = parseFloat(input).toFixed(format.decimal);
							if(format.bigNumber){
								result = formatBigNumber(result, format.decimal, format.lang);
							}
						}
					}
				}
				return result;
			};
			
			var formatBigNumber = function(input, decimal, lang) {
				var output = "";
				if(!decimal)
					decimal = 2;
				if (input) {
					output = formatBigNumberValue(input, decimal);
			    }
				return (""+output).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
			};
			
			var formatEuro = function(input, decimal, bigNumber) {
				var result = input;
				if(typeof decimal == 'undefined' || isNaN(decimal))
					decimal = 2;
				var suffix = " \u20AC";
				if(!isNaN(input) ){
					if(bigNumber)
						result = formatBigNumberValue(input, decimal);
					else
						result = parseFloat(input).toFixed(decimal).toString();
				}
				return result.replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") +suffix;
			};
			
			var formatBigNumberValue = function(input,decimal, lang){
				if(!lang)
					lang = "it";
				//input=Math.trunc(input);

				if(input<1000)
					output=parseFloat(input).toFixed(decimal);
				else if(input<1000000)
					output=(input/1000).toFixed(decimal)+(lang=='it'?" mila":" k");
				else if(input<1000000000)
					output=(input/1000000).toFixed(decimal)+(lang=='it'?" mln":" M");
				else 
					output=(input/1000000000).toFixed(decimal).toLocaleString()+(lang=='it'?" mld":" B");
				return output;
			};
	


		}
	};
});

d3.sankey = function() {
	  var sankey = {},
	      nodeWidth = 24,
	      nodePadding = 8,
	      size = [1, 1],
	      nodes = [],
	      links = [];

	  sankey.nodeWidth = function(_) {
	    if (!arguments.length) return nodeWidth;
	    nodeWidth = +_;
	    return sankey;
	  };

	  sankey.nodePadding = function(_) {
	    if (!arguments.length) return nodePadding;
	    nodePadding = +_;
	    return sankey;
	  };

	  sankey.nodes = function(_) {
	    if (!arguments.length) return nodes;
	    nodes = _;
	    return sankey;
	  };

	  sankey.links = function(_) {
	    if (!arguments.length) return links;
	    links = _;
	    return sankey;
	  };

	  sankey.size = function(_) {
	    if (!arguments.length) return size;
	    size = _;
	    return sankey;
	  };

	  sankey.layout = function(iterations) {
	    computeNodeLinks();
	    computeNodeValues();
	    computeNodeBreadths();
	    computeNodeDepths(iterations);
	    computeLinkDepths();
	    return sankey;
	  };

	  sankey.relayout = function() {
	    computeLinkDepths();
	    return sankey;
	  };
	  
	  sankey.computeHeight = function(){
		  var maxHeight = 0;
		  nodes.forEach(function(node) {
			   if(node.dy + node.y>maxHeight)
				   maxHeight = node.dy + node.y;
		  });
		  return maxHeight;
	  }

	  sankey.link = function() {
	    var curvature = .5;

	    function link(d) {
	      var x0 = d.source.x + d.source.dx,
	          x1 = d.target.x,
	          xi = d3.interpolateNumber(x0, x1),
	          x2 = xi(curvature),
	          x3 = xi(1 - curvature),
	          y0 = d.source.y + d.sy + d.dy / 2,
	          y1 = d.target.y + d.ty + d.dy / 2;
	      return "M" + x0 + "," + y0
	           + "C" + x2 + "," + y0
	           + " " + x3 + "," + y1
	           + " " + x1 + "," + y1;
	    }

	    link.curvature = function(_) {
	      if (!arguments.length) return curvature;
	      curvature = +_;
	      return link;
	    };

	    return link;
	  };

	  // Populate the sourceLinks and targetLinks for each node.
	  // Also, if the source and target are not objects, assume they are indices.
	  function computeNodeLinks() {
	    nodes.forEach(function(node) {
	      node.sourceLinks = [];
	      node.targetLinks = [];
	    });
	    links.forEach(function(link) {
	      var source = link.source,
	          target = link.target;
	      if (typeof source === "number") source = link.source = nodes[link.source];
	      if (typeof target === "number") target = link.target = nodes[link.target];
	      source.sourceLinks.push(link);
	      target.targetLinks.push(link);
	    });
	  }

	  // Compute the value (size) of each node by summing the associated links.
	  function computeNodeValues() {
	    nodes.forEach(function(node) {
	      node.value = Math.max(
	        d3.sum(node.sourceLinks, value),
	        d3.sum(node.targetLinks, value)
	      );
	    });
	  }

	  // Iteratively assign the breadth (x-position) for each node.
	  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
	  // nodes with no incoming links are assigned breadth zero, while
	  // nodes with no outgoing links are assigned the maximum breadth.
	  function computeNodeBreadths() {
	    var remainingNodes = nodes,
	        nextNodes,
	        x = 0;

	    while (remainingNodes.length) {
	      nextNodes = [];
	      remainingNodes.forEach(function(node) {
	        node.x = x;
	        node.dx = nodeWidth;
	        node.sourceLinks.forEach(function(link) {
	          if (nextNodes.indexOf(link.target) < 0) {
	            nextNodes.push(link.target);
	          }
	        });
	      });
	      remainingNodes = nextNodes;
	      ++x;
	    }

	    //
	    moveSinksRight(x);
	    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
	  }

	  function moveSourcesRight() {
	    nodes.forEach(function(node) {
	      if (!node.targetLinks.length) {
	        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
	      }
	    });
	  }

	  function moveSinksRight(x) {
	    nodes.forEach(function(node) {
	      if (!node.sourceLinks.length) {
	        node.x = x - 1;
	      }
	    });
	  }

	  function scaleNodeBreadths(kx) {
	    nodes.forEach(function(node) {
	      node.x *= kx;
	    });
	  }

	  function computeNodeDepths(iterations) {
	    var nodesByBreadth = d3.nest()
	        .key(function(d) { return d.x; })
	        .sortKeys(d3.ascending)
	        .entries(nodes)
	        .map(function(d) { return d.values; });

	    //
	    initializeNodeDepth();
	    resolveCollisions();
	    for (var alpha = 1; iterations > 0; --iterations) {
	      relaxRightToLeft(alpha *= .99);
	      resolveCollisions();
	      relaxLeftToRight(alpha);
	      resolveCollisions();
	    }

	    function initializeNodeDepth() {
	      var ky = d3.min(nodesByBreadth, function(nodes) {
	        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
	      });

	      nodesByBreadth.forEach(function(nodes) {
	        nodes.forEach(function(node, i) {
	          node.y = i;
	          node.dy = node.value * ky;
	        });
	      });

	      links.forEach(function(link) {
	        link.dy = link.value * ky;
	      });
	    }

	    function relaxLeftToRight(alpha) {
	      nodesByBreadth.forEach(function(nodes, breadth) {
	        nodes.forEach(function(node) {
	          if (node.targetLinks.length) {
	            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
	            node.y += (y - center(node)) * alpha;
	          }
	        });
	      });

	      function weightedSource(link) {
	        return center(link.source) * link.value;
	      }
	    }

	    function relaxRightToLeft(alpha) {
	      nodesByBreadth.slice().reverse().forEach(function(nodes) {
	        nodes.forEach(function(node) {
	          if (node.sourceLinks.length) {
	            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
	            node.y += (y - center(node)) * alpha;
	          }
	        });
	      });

	      function weightedTarget(link) {
	        return center(link.target) * link.value;
	      }
	    }

	    function resolveCollisions() {
	      nodesByBreadth.forEach(function(nodes) {
	        var node,
	            dy,
	            y0 = 0,
	            n = nodes.length,
	            i;

	        // Push any overlapping nodes down.
	        nodes.sort(ascendingDepth);
	        for (i = 0; i < n; ++i) {
	          node = nodes[i];
	          dy = y0 - node.y;
	          if (dy > 0) node.y += dy;
	          y0 = node.y + node.dy + nodePadding;
	        }

	        // If the bottommost node goes outside the bounds, push it back up.
	        dy = y0 - nodePadding - size[1];
	        if (dy > 0) {
	          y0 = node.y -= dy;

	          // Push any overlapping nodes back up.
	          for (i = n - 2; i >= 0; --i) {
	            node = nodes[i];
	            dy = node.y + node.dy + nodePadding - y0;
	            if (dy > 0) node.y -= dy;
	            y0 = node.y;
	          }
	        }
	      });
	    }

	    function ascendingDepth(a, b) {
	      return a.y - b.y;
	    }
	  }

	  function computeLinkDepths() {
	    nodes.forEach(function(node) {
	      node.sourceLinks.sort(ascendingTargetDepth);
	      node.targetLinks.sort(ascendingSourceDepth);
	    });
	    nodes.forEach(function(node) {
	      var sy = 0, ty = 0;
	      node.sourceLinks.forEach(function(link) {
	        link.sy = sy;
	        sy += link.dy;
	      });
	      node.targetLinks.forEach(function(link) {
	        link.ty = ty;
	        ty += link.dy;
	      });
	    });

	    function ascendingSourceDepth(a, b) {
	      return a.source.y - b.source.y;
	    }

	    function ascendingTargetDepth(a, b) {
	      return a.target.y - b.target.y;
	    }
	  }

	  function center(node) {
	    return node.y + node.dy / 2;
	  }

	  function value(link) {
	    return link.value;
	  }

	  return sankey;
	};
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

'use strict';

if (typeof module !== 'undefined') module.exports = simpleheat;

function simpleheat(canvas) {
    if (!(this instanceof simpleheat)) return new simpleheat(canvas);

    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._max = 1;
    this._data = [];
}

simpleheat.prototype = {

    defaultRadius: 25,

    defaultGradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
    },

    data: function (data) {
        this._data = data;
        return this;
    },

    max: function (max) {
        this._max = max;
        return this;
    },

    add: function (point) {
        this._data.push(point);
        return this;
    },

    clear: function () {
        this._data = [];
        return this;
    },

    radius: function (r, blur) {
        blur = blur === undefined ? 15 : blur;

        // create a grayscale blurred circle image that we'll use for drawing points
        var circle = this._circle = this._createCanvas(),
            ctx = circle.getContext('2d'),
            r2 = this._r = r + blur;

        circle.width = circle.height = r2 * 2;

        ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';

        ctx.beginPath();
        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        return this;
    },

    resize: function () {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    },

    gradient: function (grad) {
        // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
        var canvas = this._createCanvas(),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        for (var i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._grad = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    },

    draw: function (minOpacity) {
        if (!this._circle) this.radius(this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradient);

        var ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);

        // draw a grayscale heatmap by putting a blurred circle at each data point
        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity), 1);
            ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
        }

        // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
        var colored = ctx.getImageData(0, 0, this._width, this._height);
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);

        return this;
    },

    _colorize: function (pixels, gradient) {
        for (var i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; // get gradient color from opacity value

            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    },

    _createCanvas: function () {
        if (typeof document !== 'undefined') {
            return document.createElement('canvas');
        } else {
            // create a new canvas instance in node.js
            // the canvas class needs to have a default constructor without any parameter
            return new this._canvas.constructor();
        }
    }
};
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('treemapChart', function($timeout,$rootScope, $sce) {
	return {
		restrict : 'E',
		scope:{data :'=', showLegend:"@",  widgetid: "@", numberFormat: '=', numberFormat2: '='},
		template: '<div id="treemapPanel{{panelIndex}}" class="treemap-container" style="width: {{width}}px"></div>'+
				'<div class="legend" ng-if="legendColors.length>0 && showLegend">'+
				'	<span class="legend-label">0</span>' +
				'	<span ng-repeat="c in legendColors track by $index" class="legend-bullet" style="background-color: {{c}}">{{cc}}</span>' +
				'	<span class="legend-label">100</span>' +
				'</div>' + 
				'<style>{{scrolltext_keyframe}}</style>' + 
				'<div class="treemap-textscroll-wrapper" style="width: {{width}}px"><div class="treemap-textscroll" ng-bind-html="textvalues" style=" animation-duration: {{scrolltext_duration}}s; "></div></div>',
		link : function(scope, elem, attr) {
			console.info("Treemap - attr", attr);
			console.debug("Treemap - elem", elem);
			console.debug("Treemap - scope", scope);
			var showLegend = true;
			if(scope.showLegend == "false")
				showLegend = false;

			scope.panelIndex  = Math.floor((Math.random() * 10000) + 1); 
			var margin = {top : 30, right : 0, bottom : 0, left : 0};
			//var width = 500;
			//var height = 500;
			//height = height - margin.top - margin.bottom;
			
			var ignoreClick = false;

			function onAreaClick(browseHistory){
            	 console.log("onAreaClick ignoreClick", browseHistory, ignoreClick);


            	 if(ignoreClick){
            		 ignoreClick = false;
            	 }
            	 else{
            		 console.log("data", scope.data);
            		 var path = [];
	 	    	     for (var key in browseHistory) {
	 	    	    	 if (browseHistory.hasOwnProperty(key)) {
							  path.push(browseHistory[key].value);
					     }
	 	    	     }
	 	    	     path.push(scope.data.name);

	 	    	     var event = {"sourceId": scope.widgetid,
	            			 	  "eventtype": "dataset.browse", 
	            			 	  "data": {"browseHistory":browseHistory, "path":path.reverse()}, 
	            			 	  "widget": "treemap"};
					$rootScope.$emit('yucca-treemap-event', event);
	            	 console.log("yucca-treemap-event", event);
            	 }
            };
			
			scope.$on('yucca-widget-event-'+scope.widgetid, function(e, event) {  
				console.log("yucca-widget-event-"+scope.widgetid,e, event);
				if(event.type == 'browse'){
					browseToPath(event.path);
				}
			});

			var browseToPath  = function(path){
				
				console.log("browseToPath",path);
				var absolutedepth = parseInt(d3.select("#absoluteparent").attr("absolutedepth"))+1;

				var pathdepth = path.length;
				if(absolutedepth>path.pathdepth){
					drillUp();
					browseToPath(path);
				}
				else{
					var parentname = d3.select("#absoluteparent").attr("parentname");
					var equivalentname = path[absolutedepth-1];
					var targetname = path[path.length-1];
					if(equivalentname != targetname){
						if(equivalentname == parentname){
							drillDown(path[absolutedepth]);
							$timeout(function() {browseToPath(path);}, 1000);
						}
						else{
							drillUp();
							$timeout(function() {browseToPath(path);}, 1000);
						}
					}
				}
			};

			var drillUp = function(){
				ignoreClick = true;
				$timeout(function() {d3.select(".grandparent").node().dispatchEvent(new Event("click"))},1);
			};

			var drillDown = function(id){
				ignoreClick = true;
				var gId = "#id_" + id.replace(/\s/g, "_")+ "_1";
				$timeout(function() {d3.select(gId).node().dispatchEvent(new Event("click"))},1);
			/*	$timeout(function() {
					if(d3.select(gId)){
						ignoreClick = true;
						$timeout(function() {
							console.log("Click on "+gId+ "_1");
							d3.select(gId).node().dispatchEvent(new Event("click"));
							return true;
						}, 1000);
					}
					else{
						return false;
					}
			});*/
			}
		
			
			var refreshTextvalues = function(d){
				console.log("refreshTextvalues", d);
				console.log("refreshTextvalues numberFormat", scope.numberFormat);
				var textvalues = "";
				var text = "";
				if(d && d._children){
					for (var i = 0; i < d._children.length; i++) {
						var c = d._children[i];
						var fColor = c.color?guessForegroundColor(c.color):"#333";
						var value = safeNumber(c.value, scope.numberFormat);
						textvalues+= "<span class='treemap-column' style='background-color: " + c.color + "; color: " + fColor + "'>"+c.name+"</span>"+
							"	<span class='treemap-first-value'>"+
							"		<span class='treemap-data-label'>"+scope.data.valueLabel+"</span> <span class='treemap-data-value'>" + value + "</span>  "+
							"   </span>";
						text += c.name + scope.data.valueLabel + c.value;
						if(c.value2){
							var value2 = safeNumber(c.value2, scope.numberFormat2);
							textvalues+= "	<span class='treemap-first-value'>"+
							"		<span class='treemap-data-label'>"+scope.data.valueLabel2+"</span> <span class='treemap-data-value'>" + value2 + "</span>  "+
							"   </span>";;
							text += scope.data.valueLabel2 + c.value2;
							
						}
					}
				}
				console.log("refreshTextvalues text",text );
				scope.scrolltext_keyframe = "@keyframes scroll{0% {left:100%;}100% {left:-" + (text.length/1.8) + "em;}}";
				scope.scrolltext_duration = text.length/5;
				scope.textvalues = $sce.trustAsHtml(textvalues);
			};
			
			scope.$watch('data', function() {
				console.log("data change");
				
				var width = (typeof attr.width == 'undefined' || attr.width == null) ? 500: parseInt(attr.width);
				var height = (typeof attr.height == 'undefined' || attr.height == null) ? 500: parseInt(attr.height);
				scope.width = width;
				height = height - margin.top - margin.bottom;
				var root=scope.data;
				scope.legendColors = [];
				if(root !=null){
					var transitioning;
	
					var x = d3.scale.linear().domain([ 0, width ]).range([ 0, width ]);
	
					var y = d3.scale.linear().domain([ 0, height ]).range([ 0, height ]);
	
					var treemap = d3.layout.treemap().children(function(d, depth) {
						return depth ? null : d._children;
					}).sort(function(a, b) {
						return a.value - b.value;
					}).ratio(height / width * 0.5 * (1 + Math.sqrt(5))).round(false);
	
					d3.select("#treemapPanel"+scope.panelIndex+" svg").remove();
					var svg = d3.select("#treemapPanel"+scope.panelIndex).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.bottom + margin.top)
							.style("margin-left", -margin.left + "px").style("margin.right", -margin.right + "px").append("g").attr("transform",
									"translate(" + margin.left + "," + margin.top + ")").style("shape-rendering", "crispEdges");
	
					var grandparent = svg.append("g").attr("class", "grandparent");
	
					grandparent.append("rect").attr("y", -margin.top).attr("width", width).attr("height", margin.top);
	
					grandparent.append("text").attr("x", 8).attr("y", 8 - margin.top).attr("dy", ".75em");
					
					
					var initialize = function(root) {
						root.x = root.y = 0;
						root.dx = width;
						root.dy = height;
						root.depth = 0;
					};
	
					var accumulate = function(d) {
						return (d._children = d.children) ? d.value = d.children.reduce(function(p, v) {
							return p + accumulate(v);
						}, 0) : d.value;
					};

					var accumulate2 = function(d) {
						return (d._children = d.children) ? d.value2 = d.children.reduce(function(p, v) {
							return p + accumulate2(v);
						}, 0) : d.value2;
					};

					var layout = function(d) {
						if (d._children) {
							treemap.nodes({
								_children : d._children
							});
							d._children.forEach(function(c) {
								c.x = d.x + c.x * d.dx;
								c.y = d.y + c.y * d.dy;
								c.dx *= d.dx;
								c.dy *= d.dy;
								c.parent = d;
								layout(c);
							});
						}
					};
					
					var gId = 0;
					var display = function(d) {
						console.log("ttt ddd ",d)
						grandparent.datum(d.parent).on("click", transition).select("text").text(name(d));
						if(d.absolutedepth>0)
							grandparent.attr("style","cursor:pointer");
						else
							grandparent.attr("style","cursor:default");

						var g1 = svg.insert("g", ".grandparent").datum(d).attr("class", "depth").attr("parentname",d.name).attr("id", "absoluteparent")
							.attr("absolutedepth", function(d){return d.absolutedepth;});
						var g = g1.selectAll("g").data(d._children).enter().append("g");
						
	
						g.filter(function(d) {
							return d._children;
						}).classed("children", true).on("click", transition);
	
						g.selectAll(".child").data(function(d) {
							return d._children || [ d ];
						}).enter().append("rect").attr("class", "child").attr("style",function(d){return color(d);}).call(rect);
	
						g.append("rect").attr("class", "parent").attr("style",function(d){return color(d) + ";" + cursorDrilldown(d);}).call(rect).append("title").text(function(d) {
							return tooltip(d);
						});
						
						g.append("text").attr("dy", ".75em").attr("style",function(d){return textColor(d);}).call(text);
						g.attr("id", function(d){return "id_" + d.name.replace(/\s/g, "_") + "_" + d.depth;} );
						g.attr("column",function(d){return d.column;});
						g.attr("absolutedepth",function(d){return d.absolutedepth;});
						
						refreshTextvalues(root);

						function transition(d) {
							if (transitioning || !d)
								return;
							transitioning = true;
	
							var g2 = display(d), t1 = g1.transition().duration(750), t2 = g2.transition().duration(750);
	
							// Update the domain only after entering new elements.
							x.domain([ d.x, d.x + d.dx ]);
							y.domain([ d.y, d.y + d.dy ]);
	
							// Enable anti-aliasing during the transition.
							svg.style("shape-rendering", null);
	
							// Draw child nodes on top of parent nodes.
							svg.selectAll(".depth").sort(function(a, b) {
								return a.depth - b.depth;
							});
	
							// Fade-in entering text.
							g2.selectAll("text").style("fill-opacity", 0);
	
							// Transition to the new view.
							t1.selectAll("text").call(text).style("fill-opacity", 0);
							t2.selectAll("text").call(text).style("fill-opacity", 1);
							t1.selectAll("rect").call(rect);
							t2.selectAll("rect").call(rect);
	
							// Remove the old node when the transition is finished.
							t1.remove().each("end", function() {
								svg.style("shape-rendering", "crispEdges");
								transitioning = false;
							});
							
							//if(typeof d._children != 'undefined' && typeof d._children.length != 'undefined' &&  d._children.length>0 && 
							//		typeof d._children[0] != 'undefined' && typeof d._children[0]._children == 'undefined'){
							if(typeof d.parent != 'undefined' && showLegend){
								scope.legendColors = [];
								var startColor = d.color?d.color:d.parent.color;
								for (var i = 0; i < 5; i++) {
									var lum = i*.9/2 -0.9;
									
									var color = ColorLuminance(startColor, lum);
									scope.legendColors.push(color);
								}
							}
							else
								scope.legendColors = [];
							refreshTextvalues(d);

							scope.$apply();
							onAreaClick(browseHistory(d,new Array()));
						}
	
						return g;
					};
					
					function tooltip(d){
						console.log("tooltip", d);
						//var t = root.valueLabel + " " + d.name.trim() + " : " + d.value.toFixed();
						
						var value = safeNumber(d.value, scope.numberFormat);

						var t = d.name + " - " + root.valueLabel + ": " + value;
						//if(typeof d.label != 'undefined')
						//	t = d.label;
						if(d.fourthElement){
							try{
								t += " - "+ d.fourthElement.label +": "+ parseFloat(d.fourthElement.value).toFixed(1) + "%";
							}
							catch (e) {
							}
						}
						if(d.value2){
							try{
								var value2 = safeNumber(d.value2, scope.numberFormat2);
								t += " - " + root.valueLabel2 + ": "+ value2;
							}
							catch (e) {
							}
						}
						return t;
					}
					
					function color(d) {
						//var c =  d.color? d.color:(d.parent.color?d.parent.color:d.parent.parent.color);
						var c = upColor(d);

						if(d.fourthElement){
							var lum = d.fourthElement.value*0.9/50 -0.9;
							c = ColorLuminance(c,lum);
						}
						else if(d.value2){
							var maxValueParent,minValueParent;
							for (var i = 0; i < d.parent.children.length; i++) {
								var childValue2 = d.parent.children[i].value2;
								if(!maxValueParent || maxValueParent<childValue2)
									maxValueParent = childValue2;
								if(!minValueParent || minValueParent>childValue2)
									minValueParent = childValue2;
							}
							//var value2percent = d.value2/d.parent.value2;
							var value2percent = .2 + .8*d.value2/maxValueParent;
							var lum = 1-value2percent;
							c = colorShadeRgba(c,value2percent );
						}
						return "fill:" +c;
					}
					
					function cursorDrilldown(d) {
						console.log("Drilldown", d)
						if(d._children)
							return "cursor: pointer;";
						else
							return "cursor: default;";

					}
					
					function textColor(d){
						//var c =  d.color? d.color:(d.parent.color?d.parent.color:d.parent.parent.color);
						var c = upColor(d);
						if(d.fourthElement){
							var lum = d.fourthElement.value*0.9/50 -0.9;
							c = ColorLuminance(c,lum);
						}
						return "fill: " +guessForegroundColor(c);
					}
					
					function upColor(d){
						return d.color? d.color:(d.parent?upColor(d.parent):"#ddd");
					}
					
					//function realDepth(d,val){
					//	if(d.parent){
					//		val = realDepth(d.parent, val+1);
					//	}
					//	return val;
					//}
					
					function browseHistory(d,bh){
						if(d.parent){
							//bh.push({column:scope.columns[realDepth(d,0)-1],value:d.name});
							bh.push({column:d.column,value:d.name});
							bh = browseHistory(d.parent, bh);
						}
							
						return bh;
					}
					
					function text(text, label) {
						text.attr("x", function(d) {
							return x(d.x) + 6;
						}).attr("y", function(d) {
							return y(d.y) + 6;
						}).text(function(d) {
							var fontWidth = 10;
							var nameLength = d.name.trim().length*fontWidth;
							var label = d.name;
							var width = x(d.x + d.dx) - x(d.x);
							if(width<nameLength){
								var numOfChar = parseInt(width/fontWidth) -1;
								if(numOfChar>3)
									label = d.name.substring(0,numOfChar)+"...";
								else
									label = "";
							}
							return  label;
						});
					}
	
					function rect(rect) {
						rect.attr("x", function(d) {
							return x(d.x);
						}).attr("y", function(d) {
							return y(d.y);
						}).attr("width", function(d) {
							return x(d.x + d.dx) - x(d.x);
						}).attr("height", function(d) {
							return y(d.y + d.dy) - y(d.y);
						});
					}
					
					function name(d) {
						return d.parent ? name(d.parent) + "  -  " + d.name : d.name;
					}
					
				

					initialize(root);
					accumulate(root);
					accumulate2(root);
					layout(root);
					display(root);
				}
			});
			
			function guessForegroundColor(color){
				var rgb = parseInt(color.replace('#', ''), 16);   // convert rrggbb to decimal
				var r = (rgb >> 16) & 0xff;  // extract red
				var g = (rgb >>  8) & 0xff;  // extract green
				var b = (rgb >>  0) & 0xff;  // extract blue

				var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
				
				var foregroundColor = "#fff";
				if (luma > 164) {
					foregroundColor = "#000";
				}
				return foregroundColor;
			}
	
			function ColorLuminance(hex, lum) {

				// validate hex string
				hex = String(hex).replace(/[^0-9a-f]/gi, '');
				if (hex.length < 6) {
					hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
				}
				lum = lum || 0;

				// convert to decimal and change luminosity
				var rgb = "#", c, i;
				for (i = 0; i < 3; i++) {
					c = parseInt(hex.substr(i*2,2), 16);
					c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
					rgb += ("00"+c).substr(c.length);
				}

				return rgb;
			}
			
			function colorShade(col, amt) {
				  col = col.replace(/^#/, '')
				  if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]

				  let [r, g, b] = col.match(/.{2}/g);
				  ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])

				  r = Math.max(Math.min(255, r), 0).toString(16)
				  g = Math.max(Math.min(255, g), 0).toString(16)
				  b = Math.max(Math.min(255, b), 0).toString(16)

				  const rr = (r.length < 2 ? '0' : '') + r
				  const gg = (g.length < 2 ? '0' : '') + g
				  const bb = (b.length < 2 ? '0' : '') + b

				  return '#${rr}${gg}${bb}'
			}
			function colorShadeRgba(col, percent) {
				 var rgb = d3.rgb(col);
				  return 'rgba(' + rgb.r + ','+ rgb.g + ','+ rgb.b + ',' + percent.toFixed(2) + ')';
			}			
			
			var safeNumber = function(input, format) {
				var result = input;
				if(!isNaN(input) ){
					if(input)
						input = parseFloat(input);
					if(format){
						if(format.euro){
							result = formatEuro(input, format.decimal,format.bigNumber);
						}
						else{
							if(isNaN(format.decimal)){
								if(Math.abs(input)>100)
									format.decimal=0;
								else if(Math.abs(input)<1){
									format.decimal= -1*Math.log10(input) +1;
									if(format.decimal < 0)
										format.decimal = 0;
									else if(format.decimal>20)
										format.decimal =20;
								}
								else
									format.decimal = 2;
							}
							result = parseFloat(input).toFixed(format.decimal);
							if(format.bigNumber){
								result = formatBigNumber(result, format.decimal, format.lang);
							}
						}
					}
				}
				return result;
			};
			
			var formatBigNumber = function(input, decimal, lang) {
				var output = "";
				if(!decimal)
					decimal = 2;
				if (input) {
					output = formatBigNumberValue(input, decimal);
			    }
				return (""+output).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
			};
			
			var formatEuro = function(input, decimal, bigNumber) {
				var result = input;
				if(typeof decimal == 'undefined' || isNaN(decimal))
					decimal = 2;
				var suffix = " \u20AC";
				if(!isNaN(input) ){
					if(bigNumber)
						result = formatBigNumberValue(input, decimal);
					else
						result = parseFloat(input).toFixed(decimal).toString();
				}
				return result.replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") +suffix;
			};
			
			var formatBigNumberValue = function(input,decimal, lang){
				if(!lang)
					lang = "it";
				//input=Math.trunc(input);

				if(input<1000)
					output=parseFloat(input).toFixed(decimal);
				else if(input<1000000)
					output=(input/1000).toFixed(decimal)+(lang=='it'?" mila":" k");
				else if(input<1000000000)
					output=(input/1000000).toFixed(decimal)+(lang=='it'?" mln":" M");
				else 
					output=(input/1000000000).toFixed(decimal).toLocaleString()+(lang=='it'?" mld":" B");
				return output;
			};



		}
	};
});
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetBulletChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_bullet_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);
        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.userToken;
            var filter  = attr.filter;
            
            var currentValueColumn =  $yuccaHelpers.attrs.safe(attr.currentValueColumn, null);
            var previousValueColumn =  $yuccaHelpers.attrs.safe(attr.previousValueColumn, null);
            
            var barColors =  scope.$eval(attr.barColors);
            if(typeof barColors == 'undefined' || barColors == null ||barColors==''){
            	barColors = Constants.LINE_CHART_COLORS;
            }
            
            var ranges = scope.$eval(attr.rangeValues, null);
            if(ranges !=null){
            	if(ranges.length!=3){
            		scope.debugMessages.push("Invalid range values: range values must be an array with 3 elements: Min, Mean, Max");
            		ranges = null;
                }
            }

            var rangeColumnValues = scope.$eval(attr.rangeColumnValues, null);
            if(rangeColumnValues !=null){
            	if(rangeColumnValues.length!=3){
            		scope.debugMessages.push("Invalid range column values: range column values must be an array with 3 elements: Column with Min, Column with Mean, Column with Max");
            		rangeColumnValues = null;
                }
            }
            
            var averageValues =  attr.averageValues==="true"?true:false;

            var top = $yuccaHelpers.attrs.num(attr.top, 1, 1000, 1000);
            var skip  = $yuccaHelpers.attrs.num(attr.top, null, null, 1);
            
            var internalIds =  scope.$eval(attr.internalIds);
            var filterIds = $yuccaHelpers.attrs.safe(attr.filterIds, null);

            var barTitleColumn=  $yuccaHelpers.attrs.safe(attr.barTitleColumn, null);
            var barSubtitleColumn=  $yuccaHelpers.attrs.safe(attr.barSubtitleColumn, null);

            var barTitleLabel=  $yuccaHelpers.attrs.safe(attr.barTitleLabel, null);
            var barSubtitleLabel=  $yuccaHelpers.attrs.safe(attr.barSubtitleLabel, null);

            
            var rangeLabels =  scope.$eval(attr.rangeLabels);
            var measureLabels =  scope.$eval(attr.measureLabels);
            var customMarkers =  scope.$eval(attr.customMarkers);
            var customMarkerColumns =  scope.$eval(attr.customMarkerColumns);
            var markerLabels =  scope.$eval(attr.markerLabels);
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            
            scope.chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, 100, null, elem[0].offsetWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, elem[0].offsetHeight);



        	var toolTipContentFunction = function(key, x, y, e, graph) {
        		//console.log("too",key, x, y, e, graph)
        		var dataIndex  = key.index;
        			
        		
        		
    			var tooltip="";
    			tooltip += "  <span class='yucca-dataset-bullet-chart-tooltip'>";
    			tooltip += "    <i class='glyphicon glyphicon-stop' style='color:"+key.color+"'></i> " + key.label+ " <strong>"+$yuccaHelpers.render.safeNumber(key.value, decimalValue, scope.isEuroValue())+"</strong></span>";
    			tooltip += "  </span>";
				
    			
    	    	return  tooltip;
    		};
    		
        	

    		var computeRanges = function(){
	    		dataService.getDataEntities(attr.datasetCode,user_token,filter,  0, 1, null).success(function(firstData){
	    			var maxData = firstData.d.__count>10000?10000:firstData.d.__count;
	    			dataService.getMultipleDataEnties(attr.datasetCode, user_token, filter,  null /*'internalId%20desc'*/, maxData).then( function(result) {
	    				var sum= 0;
	    				var total = 0;
	    				var min = null;
	    				var max = null;

	    				for(var i=0; i<result.length; i++){
	    					//console.log("  "+result[i]);
	    					//console.log("       " + result[i].data.d.results);
	    					for(var j=0; j<result[i].data.d.results.length; j++){
		    					var value = parseFloat(result[i].data.d.results[j][currentValueColumn]);
		    					if(min == null || value<min) min = value;
		    					if(max == null || value>max) max = value;
		    					sum += value;
		    					total++;
		    				}
	    				}
	    	
	    				ranges.push(min);
	    				ranges.push(sum/total);
	    				ranges.push(max);
	    				console.log("ranges",ranges);
	    				loadIds();
	    				
	
	    			});
	    		});
        	};
        	
        	scope.options = {
    			chart: {
    				type: 'bulletChart',
	                duration: 500,
	                tooltip:{
	                	contentGenerator: toolTipContentFunction
	                },
	                tickFormat:(function (d) { return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue());}),
	                ticks: 2
	            }
	        };
        	
			var colorIndex = 0;

        	var createBulletChart = function(data, chartIndex){
        		console.log("createBulletChart", data);

        		var measures = [];
        		
        		if(rangeColumnValues!=null){
        			ranges =  [parseFloat(data[rangeColumnValues[0]]),parseFloat(data[rangeColumnValues[1]]),parseFloat(data[rangeColumnValues[2]])];
        		}
        		if(data[currentValueColumn]!=null)
        			measures.push(parseFloat(data[currentValueColumn].replace(",",".")));
    			
    			var title = barTitleLabel;
    			if(typeof barTitleColumn != 'undefined' && barTitleColumn!=null && barTitleColumn!=''){
    				title =data[barTitleColumn];
    			}
    			
      			var subtitle = barSubtitleLabel;
    			if(typeof barSubtitleColumn != 'undefined' && barSubtitleColumn!=null && barSubtitleColumn!=''){
    				subtitle =data[barSubtitleColumn];
    			}
    			
                var datasetBulletChartChartId = "bullet_"+chartIndex+"_"+new Date().getTime();


    			var chartData={
    				"chartId": datasetBulletChartChartId,
	        		"title":title,
		            "subtitle": subtitle,
		            "ranges": ranges,
		            "measures": measures,
		            "color": barColors[colorIndex],
    				"markers" : [],
    				"markerLabels":[],
    				"markersControl": []
        		};

    			if(previousValueColumn!=null ){
    				chartData.markers.push(data[previousValueColumn]);
    				chartData.markerLabels.push("Previous");
    			}

    			if(typeof customMarkerColumns != 'undefined' && customMarkerColumns!=null){
    				for (var k = 0; k < customMarkerColumns.length; k++) {
    					chartData.markersControl.push({"marker":customMarkerColumns[k], "show": true});
					}
    			}
    			
    			if(typeof customMarkerColumns != 'undefined' && customMarkerColumns!=null){
    				for (var k = 0; k < customMarkerColumns.length; k++) {
    					chartData.markers.push(data[customMarkerColumns[k]]);
					}
    			}

    			if(typeof rangeLabels != 'undefined' && rangeLabels!=null){
    				chartData.rangeLabels = rangeLabels;
    			}

    			if(typeof measureLabels != 'undefined' && measureLabels!=null){
    				chartData.measureLabels = measureLabels;
    			}

    			if(typeof markerLabels != 'undefined' && markerLabels!=null){
    				for (var k = 0; k < markerLabels.length; k++) {
    					chartData.markerLabels.push(markerLabels[k]);
    					if(typeof chartData.markersControl[k]!= 'undefined')
    						chartData.markersControl[k].label = markerLabels[k];
					}
    			}

    			
    			scope.chartDataArray.push(chartData);
				colorIndex++;
        		if(colorIndex == barColors.length)
        			colorIndex = 0;
        		
        		console.debug("chartData", chartData);

    			scope.isLoading = false;

        	};
        	
        	var loadedData = null;
        	
        	var loadIds = function(){
        		if(internalIds!=null){
        			loadData();
        		}
        		else{
		    		dataService.getDataEntities(attr.datasetCode,user_token,filterIds,  0, 50, null).success(function(result){
		    			console.debug("loadIds",result);
		    			loadedData = result.d.results;
		    			if(result.d.results!=null && result.d.__count>0){
		    				internalIds = [];
		    				for(var i = 0; i<result.d.results.length; i++){
		    					internalIds.push(result.d.results[i].internalId);
		    				}
			    			loadData();
		    			}
		    			else{
		    				scope.infoMessage = "No data found";
			    			scope.isLoading = false;
		    			}
		    		}).error(function(result){
		    			scope.isLoading = false;
		    			console.error("loadIds error",result);
		    			scope.debugMessages.push("Load ids error " +result );
		    		});
        		}
        	};
        	
        	var loadData = function(){
	        	scope.chartDataArray = [];
	        	console.log("loadData",internalIds);
    			var colorIndex = 0;
	        	if(loadedData!=null && loadedData.length>0){
	        		if(averageValues){
	        			var summedData = loadedData[0];
	        			for(var ii=1; ii<loadedData.length; ii++){
	        				summedData[currentValueColumn] = parseFloat(summedData[currentValueColumn]) + parseFloat(loadedData[ii][currentValueColumn]);
	        			}
	        			summedData[currentValueColumn] = summedData[currentValueColumn]/loadedData.length;
	        			createBulletChart(summedData,0);
	        		}
	        		else{
	        			for(var ii=0; ii<loadedData.length; ii++){
	        				createBulletChart(loadedData[ii],ii);

	        			}
	        		}	        		
	        	}
	        	else{
		        	for(var ii=0; ii<internalIds.length; ii++){
		        		dataService.getSingleDataEntities(attr.datasetCode,user_token, internalIds[ii]).then( function(result) {
		        			createBulletChart(result.data.d, ii);
		        		});
		        		
		        	}
	        	}
        	};
        	
        
			scope.isLoading = true;

        	if(ranges!=null || rangeColumnValues!=null){
        		loadIds();
        	}
        	else{
        		ranges = [];
        		computeRanges();
        	}
        	
        	/*
        	scope.toggleMarker = function(chartId, m){
        		console.log("toggleMarker", m);
        		
        		scope.chartDataArray[0].markers.splice(0, 1);
        		console.log("scope.chartDataArray", scope.chartDataArray);
        		//var content = angular.element(document.getElementById(chartId)).contents();
        	   // $timeout(function() {$compile(content)(scope);}, 200);
        	};
        	
        	*/
        	
        	
        	//loadIds();
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_bullet_chart.html",
    '<div class="yucca-widget yucca-dataset-bullet-chart">\n' +
    '    <header class="yucca-dataset-bullet-chart-header">\n' +
    '        {{widgetTitle}} {{metadata.stream.smartobject.twtQuery}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-bullet-chart-content">\n' +
    '        <section >\n' +
    '           <div ng-show="isLoading" class="yucca-dataset-bullet-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-show="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-show="!isLoading" ng-repeat="chartData in chartDataArray track by $index" class="yucca-dataset-bullet-chart-chart" >\n' +
    '        		<!--<div class="yucca-dataset-bullet-chart-marker-controls">\n' +
    '        		  <div class="check-control" ng-repeat="m in chartData.markersControl track by $index">\n' +
    '        		    <div class="check-bullet" ng-click="toggleMarker(chartData.chartId, m)"></div>{{m.label}}\n' +
    '        		  </div>\n' +
    '        		</div>\n' +
    '				<div id="{{chartData.chartId}}"><nvd3 options="options" data="chartData" ></nvd3></div>-->\n' +
    '				<nvd3 options="options" data="chartData" ></nvd3>\n' +
    '				<!--<bullet-chart options="options" data="chartData" width="{{chartWidth}}" height="{{chartHeight}}" ></bullet-chart>-->\n' +
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetImageGallery', ['metadataService','dataService', '$yuccaHelpers', '$interval', 'leafletData', '$compile', '$timeout',
    function (metadataService, dataService,$yuccaHelpers, $interval, leafletData, $compile, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_image_gallery.html',
        link: function(scope, elem, attr) {
            
            var user_token =  attr.userToken;
            scope.debug = attr.debug==="true"?true:false;
            
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'slideshow');
            scope.datasetImageGalleryMapId = "map"+new Date().getTime();

            var filter  = attr.filter;
            var skip  = attr.skip;
            var top  = attr.top;
            if(isNaN(top) || top<1)
            	top  =10;
            else if(top>50)
            	top=50;
            	
            var interval  =attr.interval;
            if(isNaN(interval) || interval<500)
            	interval  =2000;
            var imageColumns = scope.$eval(attr.imageColumns);
            scope.hasMap = false;
            var positionColumns = null;
            if(typeof attr.positionColumns != undefined && attr.positionColumns!=null){
            	positionColumns =  scope.$eval(attr.positionColumns);
            	scope.hasMap = true;
            }
            
            var imageTitleColumn = attr.imageTitleColumn;

            var markerAsImage = attr.markerAsImage==="true"?true:false;
            var	markerUrl = attr.markerUrl;
            scope.showTitle = attr.showTitle==="false"?false:true;
            
            var	markerColor = attr.markerUrl;
            if(typeof markerColor == 'undefined' || markerColor ==null)
            	markerColor = "#00bbf0";
            

            scope.allData = [];

            scope.currentImageIndex = 0;
            scope.nexImage = function(imageIndex){
            	if(imageIndex!=null && imageIndex<scope.allData.length){
            		scope.currentImageIndex = imageIndex;
                    $interval.cancel(slideshowInterval);
            	}
            	else {
            		if(scope.currentImageIndex>= scope.allData.length-1){
            			scope.currentImageIndex = 0;
            		}
            		else
            			scope.currentImageIndex++;
            	}

            };
            
            var slideshowInterval = $interval(function(){scope.nexImage();}, interval);
            
            
            scope.mapData = {"markers": {},"markerstyles": []};
            var bounds = {};
            bounds[scope.datasetImageGalleryMapId] = [];
            

            var createMarker = function(iconUrl, lat, lng){
            	var marker = {};
				marker.lat = parseFloat(lat);
				marker.lng = parseFloat(lng);
				if(markerAsImage){
					marker.icon = {	 iconUrl: iconUrl,
			                         iconSize:     [48, 48]
						 		  };
				}
				else{
					if(markerUrl!=null && markerUrl!=''){
						marker.icon = {	
							iconUrl: markerUrl,
				 		 };
					}
					else{
						marker.icon = {	
							markerColor: markerColor,
				 		};
					}
				}
				
				
				marker.message = "<img src='" + iconUrl +  "'  class='yucca-dataset-image-gallery-popup-img'> </img>";

				bounds[scope.datasetImageGalleryMapId].push([L.latLng(marker.lat, marker.lng)]);
				return marker;
            };
            
          /*  
            metadataService.getDatasetMetadata(attr.tenantCode, attr.datasetCode).success(
                function(metadata) {
                	console.log("metadata",metadata);
                    scope.metadata = metadata;
                    
                }
            );
            */

            scope.totalCount = "-";
            scope.imgUrl = null;
            scope.debugMessages = [];
        	scope.datasetImageGalleryMaxBounds = {southWest: {lat: 38.700247900602726, lng: -9.165430068969727},northEast: {lat: 38.72703673982525,lng: -9.110498428344725}};

        	dataService.getDataEntities(attr.datasetCode, user_token, filter,  skip, top, 'internalId%20desc').success( function(data) {

            		if(data!=null && data.d!=null){
            			 scope.totalCount = data.d.__count;
            			 var validIdBinaries = [];
            			 var idBinaryPosiytionsMap = [];
            			 var idBinaryLabelMap = [];
            			 
            			 for (var i = 0; i < data.d.results.length; i++) {
            				var d  =data.d.results[i];
            				
							var binariesUrl = d.Binaries.__deferred.uri.replace("http://","https://");
							for(var colsIndex = 0; colsIndex <imageColumns.length; colsIndex++){
								if(d[imageColumns[colsIndex]]!=null){
									validIdBinaries.push(d[imageColumns[colsIndex]].idBinary); 
									idBinaryPosiytionsMap[d[imageColumns[colsIndex]].idBinary] = [d[positionColumns[0]],d[positionColumns[1]]];
									if(typeof imageTitleColumn != 'undefined' &&  imageTitleColumn !=null)
										idBinaryLabelMap[d[imageColumns[colsIndex]].idBinary] = d[imageTitleColumn];
								}
							}
							for(var colsIndex = 0; colsIndex <imageColumns.length; colsIndex++){
								if(d[imageColumns[colsIndex]]!=null){
									dataService.getBinariesData(binariesUrl).success( function(binariesData) {
										console.log("idBinary, binariesData",binariesData);
										for(var j = 0; j < binariesData.d.results.length;j++){
											//if(binariesData.d.results[j].idBinary == idBinary){
											var idBinary = binariesData.d.results[j].idBinary;
											if(validIdBinaries.indexOf(idBinary) > -1){
												var urlDownloadBinary  = binariesData.d.results[j].urlDownloadBinary;
												var labelBinary  = binariesData.d.results[j].aliasNameBinary;
												console.log("urlDownloadBinary",urlDownloadBinary);
												var data = {};
												data["url"] = Constants.API_DATA_URL + urlDownloadBinary.substring(5);
												data["label"] = labelBinary;
												if(typeof idBinaryLabelMap[idBinary] !='undefined' && idBinaryLabelMap[idBinary]!=null  && idBinaryLabelMap[idBinary]!= '')
													data["label"] = idBinaryLabelMap[idBinary];
												scope.allData.push(data);
												
												if(scope.hasMap && idBinaryPosiytionsMap[idBinary]!=null ){ 
													scope.mapData.markers[idBinary.replace('.', '_')] = createMarker('http:'+data["url"], idBinaryPosiytionsMap[idBinary][0], idBinaryPosiytionsMap[idBinary][1]);
												}
												
												console.log(scope.mapData.markers);

												
											};
										};
										
										//leafletData.getMap(scope.mapId).then(function (map) {
										//	console.info("map", map);
										//	console.log("bounds",bounds);
											 //map.invalidateSize();
						                //     map.fitBounds(bounds);
						                //});

									});
								}
								else{
									scope.debugMessages.push("Invalid column name: " + imageColumns[colsIndex]);
								}
							}
						};
            		}
            		else{
						scope.debugMessages.push("No data found with dataset code " +attr.datasetCode);
            		};
	        	}
	        );


        	scope.viewMap = function(){
        		scope.panel = 'map';
        		
        		$timeout(function(){
            		var mapTemplate = '<leaflet width="100%" height="300px" markers="mapData.markers" maxbounds="datasetImageGalleryMaxBounds"></leaflet>';
            		angular.element(document.getElementById(scope.datasetImageGalleryMapId)).empty().append($compile(mapTemplate)(scope));
        			var bb = new L.latLngBounds(bounds[scope.datasetImageGalleryMapId]);
            		scope.datasetImageGalleryMaxBounds = {southWest: bb.getSouthWest(), northEast: bb.getNorthEast()};
            		console.info("scope.datasetImageGalleryMaxBounds",scope.datasetImageGalleryMaxBounds);
        		}, 100);
        		
        	};
           
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_image_gallery.html",
    '<div class="yucca-widget yucca-dataset-image-gallery">\n' +
    '    <header class="yucca-dataset-image-gallery-header">\n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-image-gallery-content">\n' +
    '        <section class="yucca-dataset-image-gallery-map" ng-show="panel==\'map\'">\n' +
    //'           <leaflet width="100%" height="300px" markers="mapData.markers" maxbounds="datasetImageGalleryMaxBounds"></leaflet>\n' +
    '             <div ng-attr-id="{{datasetImageGalleryMapId}}"></div>\n'+
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-slideshow" ng-show="panel==\'slideshow\'" >\n' +
    '        	<div>\n' +
    '              <img ng-src="{{data.url}}" ng-repeat="data in allData track by $index" ng-show="$index==currentImageIndex"/>\n' +
    '              <div class="yucca-dataset-image-gallery-slide-title" ng-show="showTitle">{{allData[currentImageIndex].label}}</div>\n' +
    '              <div class="yucca-dataset-image-gallery-bullets-panel">\n' +
    '                  <a ng-repeat="image in allData track by $index" href ng-click="nexImage($index)" class="yucca-dataset-image-gallery-bullet" ng-class="{active: $index == currentImageIndex}"></a>\n' +
    '        	   </div>\n' +
    '        	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-data" ng-hide="allData!=null">\n' +
    '           No data\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-total-count">\n' +
    '            Total: {{totalCount}}\n' +
    '        </section>\n' +
    '        <section class="yucca-dataset-image-gallery-toolbar" ng-show="hasMap">\n' +
    '            <a href ng-click="viewMap()"  ng-class="{active: panel == \'map\'}">Map</a> | <a href ng-click="panel=\'slideshow\'"  ng-class="{active: panel == \'slideshow\'}">Slideshow</a> \n' +
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
    	            showValues: true,
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamLastValue', ['metadataService','dataService', '$yuccaHelpers', '$interval', '$window',
    function (metadataService, dataService,$yuccaHelpers,$interval,$window) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_last_value.html',
        link: function(scope, elem, attr) {
        	var windowActive = true;
        	$window.onblur = function() {console.log('>onblur'); windowActive = false;};
        	$window.onfocus  = function() {console.log('>onfocus'); windowActive = true;};

            
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
        	scope.debugMessages = [];
        	scope.showLastUpdate= $yuccaHelpers.attrs.safe(attr.showLastUpdate, false) === "true"?true:false;
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'lineChart');
        	var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, null, null, 60);
        	var chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, null, null, 200);
        	var chartColor = $yuccaHelpers.attrs.safe(attr.chartColor, '#0050ef');
        	console.log("chartColor", chartColor);
        	

        	var labels =  scope.$eval(attr.labels);
            if(typeof labels == 'undefined' || labels == null ||labels.length==0){
            	labels = null;
            }        	

            var activeComponents =  scope.$eval(attr.components );
            if(typeof activeComponents == 'undefined' || activeComponents == null ||activeComponents.length==0){
            	activeComponents = null;
            }

        	var toolTipContentFunction = function(key, x, y, e, graph) {
    			var dataIndex  = key.index;
    			var tooltip="";
    			if(chartType == 'lineChart')
    				tooltip=key.point.tooltip;
    			else
    				tooltip=key.data.tooltip;
    	    	return  tooltip;
    		};
            
        	scope.stream  = {};
        	var components = new Array();
         	scope.lastupdate =  new Date();
         	
         	scope.options = {
    			chart: {
    				type: chartType,
    				width: chartWidth,
    	            height: chartHeight,
    	            interpolate: 'basis',
    	            showXAxis: false,
    	            showYAxis: false,
    	            showLegend: false, 
    	            margin : {
	                    top: 0,
	                    right: 6,
	                    bottom: 25,
	                    left: 6
    	            },
    	            x: function(d){return d.x;},
	                tooltip:{contentGenerator: toolTipContentFunction},
	                duration: 250
	            }
    	    };
         	
         	var createChartElement  = function(xValue, yValue){
    		 //  var tooltipText =  "<h3 class='yucca-stream-tweet-stats-tooltip-header'>";
    		 //  tooltipText += $yuccaHelpers.utils.formatData(xValue.getTime());
    		 //  tooltipText +=  "</h3>";
    		 //  tooltipText +=  "<p>Value :<strong>"+yValue+"</strong></p>";
        		
     		   //var element = {x:parseFloat(xValue.getTime()), y:parseFloat(yValue), "tooltip": "<h3 class='yucca-stream-tweet-stats-tooltip-header'>" + $yuccaHelpers.utils.formatData(xValue.getTime()) +
     			//	   "</h3><p>Value :<strong>"+yValue+"</strong></p>"};
    		   //var element = {x:parseFloat(xValue.getTime()), y:parseFloat(yValue)};
    		   return {x:parseFloat(xValue.getTime()), y:parseFloat(yValue), "tooltip": "<h3 class='yucca-stream-tweet-stats-tooltip-header'>" + $yuccaHelpers.utils.formatStreamDate(xValue.getTime(), true) +
 				   "</h3><p>Value :<strong>"+yValue+"</strong></p>"};;
         	};
         	         	
         	var callbackInvoked = false;
        	
    	    var dataCallback = function(message) {
    	    	callbackInvoked = true;
    	       var messageBody = JSON.parse(message.body);
               var newValues = messageBody.values[0];
               scope.lastupdate = newValues.time;
               for(var j = 0; j<scope.stream.components.length; j++){
            	   var component  = scope.stream.components[j];
            	   for (var componentKey in newValues.components) {
            		    if (newValues.components.hasOwnProperty(componentKey) && componentKey == component.name) {
            		    	//scope.$apply(function(){ 
	            		    	scope.stream.components[j].lastValue = newValues.components[componentKey];
	            		    	scope.stream.components[j].lastUpdate = newValues.time;
	            		    	scope.stream.components[j].chartData[0]["values"].push(createChartElement(new Date(newValues.time), newValues.components[componentKey]));
		            			 if(scope.stream.components[j].chartData[0]["values"].length>50){
		            				 scope.stream.components[j].chartData[0]["values"].shift();
		            			 }

				            	var maxMinValue = findMinMaxValue(scope.stream.components[j].chartData[0]["values"]);
				            	scope.stream.components[j].minXValue = maxMinValue[0];
				            	scope.stream.components[j].maxXValue = maxMinValue[1];
				            	scope.stream.components[j].delta = findDelta(scope.stream.components[j].chartData[0]["values"]);			
            		    //	});
            		    }
            	   }
               }
    	    };
    	    
    	    var findMinMaxValue = function(chartDataElementsArray){
    	    	var min  = null;
    	    	var max = null;
    	    	if(typeof chartDataElementsArray!= 'undefined' && chartDataElementsArray!=null && chartDataElementsArray.length>0){
	    	    	for (var i = 0; i < chartDataElementsArray.length; i++) {
	    	    		if(min == null || min>chartDataElementsArray[i].x)
	    	    			min = chartDataElementsArray[i].x;
	    	    		if(max == null || max<chartDataElementsArray[i].x)
	    	    			max = chartDataElementsArray[i].x;
					}
    	    	}
    	    	return [min, max];
    	    };
    	    var findDelta= function(chartDataElementsArray){
    	    	var delta  = null;
    	    	if(typeof chartDataElementsArray!= 'undefined' && chartDataElementsArray!=null){
    	    		if(chartDataElementsArray.length>1)
    	    			delta = parseFloat(chartDataElementsArray[chartDataElementsArray.length-1].y) - parseFloat(chartDataElementsArray[chartDataElementsArray.length-2].y); 
    	    		else
    	    			delta = 0;
    	    		delta  = delta.toPrecision(2);
    	    	}
    	    	return delta;
    	    };
    	    
    	    
    	    if(typeof attr.tenantCode!=undefined && attr.tenantCode!=null &&
    	    	typeof attr.streamCode!=undefined && attr.streamCode!=null &&
    	    	typeof attr.smartobjectCode!=undefined && attr.smartobjectCode!=null){
				metadataService.getStreamMetadata (attr.tenantCode, attr.streamCode, attr.smartobjectCode, user_token).success(function(metadata){
					scope.stream.name = metadata.name;
					if(activeComponents == null){
						scope.stream.components = metadata.stream.components;
						components = metadata.stream.components;
					}
					else{
						scope.stream.components = [];
						for(var k = 0; k< metadata.stream.components.length; k++){
							for(var m = 0; m< activeComponents.length; m++){
								if(activeComponents[m] == metadata.stream.components[k].name){
									scope.stream.components.push(metadata.stream.components[k]);
									components.push(metadata.stream.components[k]);
									break;
								}
							}
						}
					}
					for(var k = 0; k<scope.stream.components.length; k++){
						scope.stream.components[k].chartData = [{"key":"data","values":[], "color": chartColor}];
		            	if(labels!=null){
		            		try {
		            			scope.stream.components[k].label = labels[k];
							} catch (e) {
								scope.stream.components[k].label = scope.stream.components[k].name;
								console.error("Component's label not valid");
							}
		            	}
		            	else
		            		scope.stream.components[k].label = scope.stream.components[k].name;

					}
					
					if(typeof metadata["dataset"]!='undefined' && metadata["dataset"]!=null && typeof metadata["dataset"].code!='undefined' && metadata["dataset"].code!=null){
						dataService.getMeasures(metadata["dataset"].code,user_token,null,  0, 20, 'time%20desc').success((function(dataCallbackIndex){ 
							return function(data) {
								console.debug("getMeasures" , dataCallbackIndex, data);

								if(data.d.results!=null && data.d.results.length>0){
									data.d.results.reverse();
									for(var j = 0; j<scope.stream.components.length; j++){
					            	   var component  = scope.stream.components[j];
					            	   //var chartDataValues = new Array();
					            	   components[j].chartDataValues =  new Array();
					            	   for(var k=0; k<data.d.results.length; k++){
						            	   if(data.d.results[k][component.name] !=null){
						            		   if(k==0){
						            			   scope.stream.components[j].lastValue = data.d.results[k][component.name];
						            			   scope.stream.components[j].lastUpdate = $yuccaHelpers.utils.mongoDate2string(data.d.results[k]["time"]);
						            		   }
						            	
						            		   components[j].chartDataValues.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.d.results[k]["time"]),  data.d.results[k][component.name]));
						            		   //chartDataValues.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.d.results[k]["time"]),  data.d.results[k][component.name]));
						            	   }
					            	   }
					            	   //scope.stream.components[j].chartData[0]["values"] = chartDataValues;
					            	   var maxMinValue = findMinMaxValue(components[j].chartDataValues);
					            	   scope.stream.components[j].minXValue = maxMinValue[0];
					            	   scope.stream.components[j].maxXValue = maxMinValue[1];
					            	   scope.stream.components[j].delta = findDelta(components[j].chartDataValues);
					               }
					               dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
					               callbackInvoked = true;
								}
							};
						})(metadata.code));
					}
					//else
						dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
					
					
					
				}).error(function(e){
					console.log("error", e);
					scope.debugMessages.push("Stream not found: " + scope.stream);
					
				});
					
					
        	}
        	else{
        		scope.debugMessages.push("Invalid stream definition: tenantCode: " + attr.tenantCode+ " - streamCode: "+ attr.streamCode + " - smartobjectCode: " + attr.smartobjectCode);
        	}
        	
            console.debug("attrs", attr);
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


            $interval(function(){
            	if(callbackInvoked && windowActive){
            		//console.warn("in", windowActive,  (new Date().getTime() - start));
            		callbackInvoked = false;
            		for(var m=0; m<components.length; m++){
	            		if(typeof components[m].chartDataValues != 'undefined'){
	            			scope.stream.components[m].chartData[0]["values"] = components[m].chartDataValues.slice();
	            		}
	            	}
            	}
            }, 1000);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_last_value.html",
    '<div class="yucca-widget yucca-stream-last-value">\n' +
    '    <header class="yucca-stream-last-value-header" ng-show="widgetTitle!=null"> \n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-last-value-content">\n' +
    '        <section class="yucca-stream-last-value-data">\n' +
    '           <div class="yucca-stream-last-value-panel " ng-repeat-start="component in stream.components track by $index"> \n' +
    '               <div class="yucca-stream-last-value-component-name"><span title="Phenomenon: {{component.phenomenon}}">{{component.label}}</span></div>\n' +
    '               <div class="yucca-stream-last-value-component-panel"> \n' +
    '                   <div class="yucca-stream-last-value-component-value" title="Exact value: {{component.lastValue}} - Updated at: {{component.lastUpdate|date:\'dd/MM/yyyy  H:mm\'}}">{{component.lastValue|format_big_number}}</div>\n' + 
    '                   <div class="yucca-stream-last-value-component-value-info"> \n' +
    '                       <div class="yucca-stream-last-value-component-trend" ng-show="component.delta!=null" title="Value trend">\n' +
    '					        <span class="trend-up" ng-show="component.delta>0">&plus;</span>\n'+
    '					        <span class="trend-down" ng-show="component.delta<0"></span>\n' +
    '					        <span class="trend-stable" ng-show="component.delta==0"></span>\n' +
    '					        {{component.delta}}\n'+
    '                       </div>\n' +
    '                       <div class="yucca-stream-last-component-measureunit">{{component.measureunit}}</span> </div>\n' +
    '                   </div>\n' +
    '               </div>\n' +
    '               <div class="yucca-stream-last-value-component-chart" ng-show="component.chartData[0].values.length>1"><nvd3 options="options" data="component.chartData"></nvd3></div>\n' +
    '               <div class="yucca-stream-last-value-component-chart-x-xAxis" ng-show="component.chartData[0].values.length>1">\n'+
    '                   <div class="min-value"><span class="value-hour">{{component.minXValue|date:"H:mm"}}</span><span class="value-date">{{component.minXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '                   <div class="max-value"><span class="value-hour">{{component.maxXValue|date:"H:mm"}}</span><span class="value-date">{{component.maxXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '               </div>\n' +
    '           </div>\n' +
    '           <div class="yucca-stream-last-value-panel-separator " ng-repeat-end ng-hide="$index<stream.components.length"></div>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-last-value-lastupdate-bar" ng-show="showLastUpdate">\n' +
    '            Updated at: {{lastupdate|date:"dd/MM/yyyy  H:mm"}}\n' + 
    '        </section>\n' + 
    '    </div>\n' +
    '    <footer>\n' +
    '        <a href="http://www.smartdatanet.it/" target="_blank" title="Powered by smartdatanet.it">\n' +
    '          <i>SmartDataNet.it</i>\n' +
    '        </a>\n' +
    '    </footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMonitor', ['metadataService','dataService', '$yuccaHelpers', '$interval', '$window',
    function (metadataService, dataService,$yuccaHelpers,$interval,  $window) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_monitor.html',
        link: function(scope, elem, attr) {
        	

        	
        	var windowActive = true;
        	$window.onblur = function() {console.log('>onblur'); windowActive = false;};
        	$window.onfocus  = function() {console.log('>onfocus'); windowActive = true;};
        	
            var filter  = attr.filter;

        	
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'chart');
        	scope.debugMessages = [];
        	scope.showLastUpdate= $yuccaHelpers.attrs.safe(attr.showLastUpdate, false) === "true"?true:false;
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'lineChart');
        	var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, null, null, 300);
        	var chartWidth = $yuccaHelpers.attrs.num(attr.chartWidth, null, null, 400);

        	
        	var chartColors =  scope.$eval(attr.chartColors);
            if(typeof chartColors == 'undefined' || chartColors == null ||chartColors.length==0){
            	chartColors = Constants.LINE_CHART_COLORS;
            }
            
            var labels =  scope.$eval(attr.labels);
            if(typeof labels == 'undefined' || labels == null ||labels.length==0){
            	labels = null;
            }        	

            var labels =  scope.$eval(attr.labels);
            if(typeof labels == 'undefined' || labels == null ||labels.length==0){
            	labels = null;
            }        	

            var activeComponents =  scope.$eval(attr.components);
            if(typeof activeComponents == 'undefined' || activeComponents == null ||activeComponents.length==0){
            	activeComponents = null;
            }        	


        	scope.stream  = {};
         	scope.lastupdate =  new Date();
         	
         	scope.options = {
    			chart: {
    				type: chartType,
    				width: chartWidth,
    	            height: chartHeight,
                    useInteractiveGuideline: true,
    	            margin : {
	                    top: 2,	
	                    right: 2,
	                    bottom: 2,
	                    left: 2
    	            },
    	            x: function(d){return d.x;},
    	            xAxis: {tickFormat:(function (d) { return $yuccaHelpers.utils.formatDateFromMillis(d);})},
	                duration: 250
	            }
    	    };
         	
			scope.stream.tableDataValues = [];
			scope.stream.chartData = [];
			var chartData = new Array();

         	
         	var createChartElement  = function(xValue, yValue){
         	// console.error("createChartElement", measureUnit);
    		//   var tooltipText =  "<h3 class='yucca-stream-tweet-stats-tooltip-header'>";
    		//   tooltipText += $yuccaHelpers.utils.formatData(xValue.getTime());
    		//   tooltipText +=  "</h3>";
    		//   tooltipText +=  "<p>Value :<strong>"+yValue+"</strong> <small>" + measureUnit + "</small></p>";
        		
    		   var element = {x:parseFloat(xValue.getTime()), 
    				   y:parseFloat(yValue)};
    		   return element;
         	};
        	
         	var callbackInvoked = false;

    	    var dataCallback = function(message) {
             	callbackInvoked = true;

               var messageBody = JSON.parse(message.body);
               var newValues = messageBody.values[0];
               scope.lastupdate = newValues.time;
   	    	  // scope.$apply(function(){ 
	               // table data
	               scope.stream.tableDataValues.push([$yuccaHelpers.utils.formatDateFromMillis(new Date(newValues.time))]);
	               // chart data
	               for(var j = 0; j<scope.stream.components.length; j++){
	            	   var component  = scope.stream.components[j];
	            	   for (var componentKey in newValues.components) {

	            		    if (newValues.components.hasOwnProperty(componentKey) && componentKey == component.name) {
	            		    	scope.stream.components[j].lastValue = newValues.components[componentKey];
	            		    	scope.stream.components[j].lastUpdate = newValues.time;
				            	
				            	for(var m=0; m<chartData.length; m++){
				            		if(chartData[m].name == component.name){
				            			chartData[m].values.push(createChartElement(new Date(newValues.time), newValues.components[componentKey]));
				            			 if(chartData[m].values.length>200){
				            				 chartData[m].values.shift();
				            			 }
				            			var maxMinValue = findMinMaxValue(chartData[m].values);
				            			scope.stream.components[j].minXValue = maxMinValue[0];
				            			scope.stream.components[j].maxXValue = maxMinValue[1];
				            			break;
				            		}
				            		
				            	}
				            	scope.stream.tableDataValues[scope.stream.tableDataValues.length-1].push(newValues.components[componentKey]);
	            		    }
	            	   }
	               }
	               if(scope.stream.tableDataValues.length>20)
	            	   scope.stream.tableDataValues.shift();
   	    	   //});
               
    	    };
    	    
    	    var findMinMaxValue = function(chartDataElementsArray){
    	    	var min  = null;
    	    	var max = null;
    	    	if(typeof chartDataElementsArray!= 'undefined' && chartDataElementsArray!=null && chartDataElementsArray.length>0){
	    	    	for (var i = 0; i < chartDataElementsArray.length; i++) {
	    	    		if(min == null || min>chartDataElementsArray[i].x)
	    	    			min = chartDataElementsArray[i].x;
	    	    		if(max == null || max<chartDataElementsArray[i].x)
	    	    			max = chartDataElementsArray[i].x;
					}
    	    	}
    	    	return [min, max];
    	    };

    	    
    	    if(typeof attr.tenantCode!=undefined && attr.tenantCode!=null &&
    	    	typeof attr.streamCode!=undefined && attr.streamCode!=null &&
    	    	typeof attr.smartobjectCode!=undefined && attr.smartobjectCode!=null){
				metadataService.getStreamMetadata (attr.tenantCode, attr.streamCode, attr.smartobjectCode, user_token).then(function(result){
					console.log("getStreamMetadata metadata",result);
					var metadata = result.data;
					scope.stream.name = metadata.name;
					var colorIndex = 0;
					if(activeComponents == null)
						scope.stream.components = metadata.stream.components;
					else{
						scope.stream.components = [];
						for(var k = 0; k< metadata.stream.components.length; k++){
							for(var m = 0; m< activeComponents.length; m++){
								if(activeComponents[m] == metadata.stream.components[k].name){
									scope.stream.components.push(metadata.stream.components[k]);
									break;
								}
							}
						}
					}
					
					
					
					
					//scope.stream.components = metadata.stream.components;
					for(var k = 0; k<scope.stream.components.length; k++){
		            	if(labels!=null && k<labels.length){
		            		try {
		            			scope.stream.components[k].label = labels[k];
							} catch (e) {
								scope.stream.components[k].label = scope.stream.components[k].name;
								console.error("Component's label not valid");
							}
		            	}
		            	else
		            		scope.stream.components[k].label = scope.stream.components[k].name;
		            }
					
					for(var j = 0; j<scope.stream.components.length; j++){
	            	   var component  = scope.stream.components[j];
						colorIndex<chartColors.length?colorIndex++:colorIndex=0;
						chartData.push({"name":component.name, "key":component.label, "values":[],"color": chartColors[colorIndex]});
						scope.stream.chartData.push({"name":component.name, "key":component.label, "values":[],"color": chartColors[colorIndex]});
					}
					

					if(typeof metadata["dataset"]!='undefined' && metadata["dataset"]!=null && typeof metadata["dataset"].code!='undefined' && metadata["dataset"].code!=null){
						dataService.getMeasures(metadata["dataset"].code,user_token,filter,  0, 20, 'time%20desc').then((function(result){ 
							return function(data) {
								console.debug("getMeasures" , dataCallbackIndex, data);
								var dataCallbackIndex = result.data
								if(data.data.d.results!=null && data.data.d.results.length>0){
									data.data.d.results.reverse();
									scope.stream.tableDataValues = [];
									//scope.stream.chartData = [];
									// table data
									for(var k=0; k<data.data.d.results.length; k++){
					            		scope.stream.tableDataValues[k] = [$yuccaHelpers.utils.mongoDate2string(data.data.d.results[k]["time"])];
										for(var j = 0; j<scope.stream.components.length; j++){
											if(typeof data.data.d.results[k][scope.stream.components[j].name] != 'undefined' && data.data.d.results[k][scope.stream.components[j].name]!=null)
												scope.stream.tableDataValues[k].push(data.data.d.results[k][scope.stream.components[j].name]);
											else
												scope.stream.tableDataValues[k].push("-");
										}
					            	}

									// chart data
			            			//var colorIndex = 0;

									for(var j = 0; j<scope.stream.components.length; j++){
					            	   var component  = scope.stream.components[j];
					            	   
										chartData[j].values = [];

					            	   //var chartDataValues = [];
					            	    for(var k=0; k<data.data.d.results.length; k++){
						            	   if(data.data.d.results[k][component.name] !=null){
						            		   if(k==0){
						            			   scope.stream.components[j].lastValue = data.data.d.results[k][component.name];
						            			   scope.stream.components[j].lastUpdate = $yuccaHelpers.utils.mongoDate2string(data.data.d.results[k]["time"]);
						            		   }
						            		   chartData[j].values.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.data.d.results[k]["time"]),  
						            				   data.data.d.results[k][component.name]));
						            		   //chartDataValues.push(createChartElement($yuccaHelpers.utils.mongoDate2millis(data.data.d.results[k]["time"]),  data.data.d.results[k][component.name]));
						            	   }
					            	    }

					            	  //  if(colorIndex<chartColors.length){
			                    	  //		colorIndex++;
			                    	  //	}
					            	  //  else
					            	  //  	colorIndex = 0;

					            	   //scope.stream.chartData.push({"key":component.label, "values":chartDataValues,"color": chartColors[colorIndex]});
					            	   
					            	    var maxMinValue = findMinMaxValue(chartData[j].values);
					            	   scope.stream.components[j].minXValue = maxMinValue[0];
					            	   scope.stream.components[j].maxXValue = maxMinValue[1];
					               }
									console.log("..", scope.stream);
					             	callbackInvoked = true;

					               dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
								}
							};
						})(metadata.code));
					}
					//else
					dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
					
					
					
				},function(e){
					console.log("error", e);
					scope.debugMessages.push("Stream not found: " + scope.stream);
					
				});
					
					
        	}
        	else{
        		scope.debugMessages.push("Invalid stream definition: tenantCode: " + attr.tenantCode+ " - streamCode: "+ attr.streamCode + " - smartobjectCode: " + attr.smartobjectCode);
        	}
        	
            console.debug("attrs", attr);
            scope.widgetTitle = $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        	//var start  = new Date().getTime();
        	//var callCounter = 0;
            $interval(function(){
            	if(callbackInvoked && windowActive){
            		//callCounter++;
            		//console.warn("in", windowActive,  (new Date().getTime() - start), callCounter);
            		callbackInvoked= false;
	            	for(var m=0; m<chartData.length; m++){
	            		scope.stream.chartData[m].values = chartData[m].values.slice();
	            	}
            	}
            }, 1000);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_monitor.html",
    '<div class="yucca-widget yucca-stream-monitor">\n' +
    '    <header class="yucca-stream-monitor-header" ng-show="widgetTitle!=null"> \n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-monitor-content">\n' +
    '        <section class="yucca-stream-monitor-chart"  ng-show="panel==\'chart\'">\n' +
    '            <nvd3 options="options" data="stream.chartData"></nvd3>\n' +
    '            <div class="yucca-stream-monitor-chart-x-xAxis" ng-show="stream.chartData.length>0">\n'+
    '            	<div class="min-value"><span class="value-hour">{{stream.components[0].minXValue|date:"H:mm"}}</span><span class="value-date">{{stream.components[0].minXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '               <div class="max-value"><span class="value-hour">{{stream.components[0].maxXValue|date:"H:mm"}}</span><span class="value-date">{{stream.components[0].maxXValue|date:"dd MMM yyyy"}}</span></div>\n'+
    '            </div>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-monitor-data" ng-show="panel==\'data\'">\n' +
    '           <table class="yucca-stream-monitor-data-table">\n'+
    '               <thead>\n'+
    '                   <tr><th>Time</th><th ng-repeat="component in stream.components track by $index">{{component.label}}</th></tr>\n'+
    '               </thead>\n'+
    '               <tbody>\n' +
    '                   <tr ng-repeat="row in stream.tableDataValues track by $index">\n' +
    '                     <td ng-repeat="data in row track by $index">\n'+
    '                         <span class="yucca-stream-monitor-data-table">{{data}}</span> \n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +    
    '        <section class="yucca-stream-monitor-lastupdate-bar" ng-show="showLastUpdate">\n' +
    '            Updated at: {{lastupdate|date:"dd/MM/yyyy  H:mm"}}\n' + 
    '        </section>\n' + 
    '        <section class="yucca-stream-monitor-toolbar">\n' +
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMultistreamMap', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_multistream_map.html',
        link: function(scope, elem, attr) {
        	
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'map');
        	scope.debugMessages = [];
            
            //[{stream:"", components: [{component:"",min:"",max:""}];
        	var streamsAttr = scope.$eval(attr.streams);
        	scope.streams  ={};
        	
        	var tenant_code = attr.tenantCode;
        	var domain = attr.domain;
        	var search_query = attr.searchQuery;
        	var opendata = null;
        	console.log("attr.opendata",attr.opendata);
        	if(typeof attr.opendata != 'undefined')
        		opendata = attr.opendata==="true"?true:false;

        	if(typeof streamsAttr!=undefined && streamsAttr!=null && streamsAttr.length >0){
        		//stream
        	}
        	else{
        		metadataService.findMetadata(tenant_code, domain, search_query, opendata, user_token).success(function (metadataList){
        			console.log("metadataList",metadataList);
        		}).error(function(){
					scope.debugMessages.push("No data found: tenant=" + tenant_code +", domain=" + domain + ", search_query="+ search_query + ", opendata="+opendata);
				});
        		
        	}

            console.debug("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_multistream_map.html",
    '<div class="yucca-widget yucca-stream-multistream-map">\n' +
    '    <header class="yucca-stream-multistream-map-header">\n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-multistream-map-content">\n' +
    '        <section class="yucca-stream-multistream-map-data">\n' +
    '           <table class="yucca-stream-multistream-map-table">\n'+
    '               <tbody ng-repeat="stream in streams track by $index" >\n' +
    '                   <tr>\n' +
    '                     <td class="yucca-stream-multistream-map-stream-row" colspan="100%">\n'+
    '                         <span class="yucca-stream-multistream-map-component">{{stream.name}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '                   <tr ng-repeat="component in stream.components track by $index">\n' +
    '                     <td class="yucca-stream-multistream-map-component-name"><span title="Phenomenon: {{component.phenomenon}}">{{component.name}}</span></td>\n' +
    '                     <td class="yucca-stream-multistream-map-component-bullet"><span class="yucca-stream-multistream-map-bullet bullet-{{component.bulletLevel}}" title="{{component.bulletsLevel}}"></span></td>\n' +
    '                     <td class="yucca-stream-multistream-map-component-value" title="Updated at: {{component.lastUpdate|date:\'MM/dd/yyyy  H:mm\'}}"><span>{{component.lastValue}}</span> <span class="yucca-stream-multistream-component-measureunit">{{component.measureunit}}</span> </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-multistream-map-lastupdate-bar">\n' +
    '            Updated at: {{lastupdate|date:"MM/dd/yyyy  H:mm"}}\n' + 
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMultistreamStats', ['metadataService','dataService', '$yuccaHelpers', 'leafletData',
    function (metadataService, dataService, $yuccaHelpers, leafletData) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_multistream_stats.html',
        link: function(scope, elem, attr) {

        	scope.xAxisTickFormatFunction = function(){
                return function(d) {
                    return  d3.time.format("%H:%M:%S")(new Date(d));
                  };
            };
            
            scope.panel = $yuccaHelpers.attrs.safe(attr.landingPanel, 'map');
        	var valueFormatFunction = function(d){
   				return parseInt(d);
    	    };
            
            var createTimeKey = function(data){
                return data.hour;
            }

            var minData = null;
            var maxData = null;
            var minMarkerWidth = 40;
            var maxMarkerWidth  = 80;

            scope.mapId = "map"+new Date().getTime();
            var computeStatistics = function(){
                for(var k in scope.allData){
                    if(scope.allData[k].hasOwnProperty('tableData')){
                        var data =  scope.allData[k].tableData[1];
                        if(minData==null || data<minData)
                            minData = data;
                        if(maxData==null || data>maxData)
                            maxData = data;
                    }
                    
                }
                console.log("min max", minData, maxData);
            };

            scope.refreshMarker = function(){

                console.log("scope.allData", scope.allData);
                scope.mapData.markerstyles = [];
                var dataAtTime = scope.allData[scope.currentTimeStats];
                console.log("allData",scope.allData);
                if(!$yuccaHelpers.utils.isEmpty(dataAtTime)){
                    console.log("dataAtTime",dataAtTime);
                    for (var i = 0; i < scope.allData.datasetsCode.length; i++) {
                        var data = parseFloat(dataAtTime.tableData[i+1]).toFixed(1);
                        data = (data === "NaN") ? 0 : data;
                        console.log("data", data);
                        var percent = (data-minData)/(maxData-minData);
                        var size = parseInt(minMarkerWidth + (maxMarkerWidth-minMarkerWidth)*percent);
                        var datasetCode = scope.allData.datasetsCode[i];
                        scope.mapData.markerstyles.push(".marker"+datasetCode+
                            "{font-size: "+(size/2.2)+"px; line-height:"+(size)+"px; " + 
                            "border-color:"+computeColor(data, 1)+"; background-color:"+computeColor(data, .5)+";}");
                        var icon = {type: 'div',
                                    iconSize: [size, size],
                                    className: "marker marker"+datasetCode,
                                    popupAnchor:  [0, 0],
                                    html: data
                        };

                        scope.mapData.markers["m_"+ datasetCode].icon = icon;
                    }
                }
//                leafletData.getMap().then(function (map) {
//                	console.warn("bounds", bounds);
//                    map.fitBounds(bounds);
//                });
            };
            
            var chartHeight = $yuccaHelpers.attrs.num(attr.chartHeight, 100, null, 300);
            var chartType = $yuccaHelpers.attrs.safe(attr.chartType, 'lineChart');
            var chartColors =  scope.$eval(attr.chartColors);
            
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
            //id="nvDataChart2"  height="300" xAxisTickFormat="xAxisTickFormatFunction()" showXAxis="true" showYAxis="true" tooltips="true" interactive="true" objectEquality="true"
        	
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
	                tooltip:{
	                	contentGenerator: toolTipContentFunction
	                }
	            }
	        };
            
            scope.maxStats = 23;
            scope.allData = {};
            scope.mapData = {"markers": {},"markerstyles": []};
            var bounds = [];

            scope.currentTimeStats=5;

            var tableData = [];
            scope.allData.tableHeader = ["Time"];
            scope.allData.datasetsCode = [];
           
            var markerColor = ["#009100","#9ade00", "#edd400", "#f57900", "#cc0000"];
            var computeColor = function(value, alpha){
                var result = markerColor[2];
                if(maxData-minData!=0){
                    var percent = (value-minData)/(maxData-minData);
                    var colorIndex = parseInt(percent*markerColor.length);
                    if(colorIndex>=markerColor.length)
                        colorIndex = markerColor.length-1;
                    result = markerColor[colorIndex];
                }
                if(typeof result == 'undefined')
                    result = markerColor[2];
                return "rgba(" + $yuccaHelpers.utils.hex2Rgb(result) + "," + alpha + ")";
            };

            var addData  = function(metadata, dataset){
                scope.allData.datasetsCode.push(metadata.code);
                scope.allData.tableHeader.push(metadata.code);
                for (var i = 0; i < dataset.data.length; i++) {
                    var data = dataset.data[i];
                
                    // table
                    var timeKey = createTimeKey(dataset.data[i]);
                    if(!scope.allData[timeKey] || scope.allData[timeKey]==null){
                        scope.allData[timeKey]= {};
                        scope.allData[timeKey].tableData = [];
                        scope.allData[timeKey].tableData.push(data.hour);
                    }
                    scope.allData[timeKey].tableData.push(data.value_sts);
                }

                // map
                if(!$yuccaHelpers.utils.isEmpty(metadata.stream) && !$yuccaHelpers.utils.isEmpty(metadata.stream.smartobject.latitude)){

                	var marker = { lat: parseFloat(metadata.stream.smartobject.latitude),
                    			   lng: parseFloat(metadata.stream.smartobject.longitude), 
                    			   message: metadata.code};

                    var icon = {type: 'div',
                        className: "marker marker"+metadata.code,
                        popupAnchor:  [0, 0],
                        html: '-'
                    };

                    marker.icon = icon;

                    scope.mapData.markers["m_"+ metadata.code] = marker;
                    scope.mapData.markerstyles.push(".marker"+metadata.code+"{border-radius: 100%;width:30px; height:30px;border:solid 2px red}");

                    bounds.push([marker.lat, marker.lng]);
                    
                    leafletData.getMap().then(function (map) {
                    	map.invalidateSize();
                    	map.fitBounds(bounds, {padding: [32, 32]});
                    });
                }
            };
            
            var decodedDateFilter = $yuccaHelpers.odata.decodeDateFilter(attr);
            var timeFilter = decodedDateFilter.timeFilter;
            var timeGroupBy = $yuccaHelpers.attrs.safe(attr.timeGroupBy, $yuccaHelpers.odata.extractTimeGroupFilter(decodedDateFilter.minDateMillis, decodedDateFilter.maxDateMillis));
            

            //scope.widgetTitle = attr.widgettitle;
            var datasetsKey = scope.$eval(attr.datasets);
        	var user_token =  attr.userToken;

            if(datasetsKey && datasetsKey!=null && datasetsKey.length>0){
                for (var i = 0; i < datasetsKey.length; i++) {
                	
                	var tenant_code = datasetsKey[i][0];
        			var dataset_code = datasetsKey[i][1];

                    metadataService.getDatasetMetadata(tenant_code, dataset_code).success(
                        function(result) {
                            var metadata = result; //result.d.results[0];

                        	var size = Object.keys(result).length;
                            
                            if (size>0){
                            	if (metadata && metadata!=null) {
                            	
	                    			dataService.getMeasuresStats(metadata.dataset.code, user_token, timeGroupBy, 'avg,value', timeFilter,  null, null, "year,month,dayofmonth,hour").success( function(response) {
	                                    console.log('response', response);
	                                    var dataRow = {"key":metadata.code, 
	                                                   "metadata": metadata, 
	                                                   "data":response.d.results};
	
	                                    addData(metadata, dataRow);
	                                    computeStatistics();
	                                    scope.refreshMarker();
	                                })
	                                .error(function(response) {
	                                    console.error('getDatasetMetadata: error', response);
	                                });
                            	}
                            }
                        }       
                    );
                }
            }
            
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
    	}
    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_multistream_stats.html",
		'<div class="yucca-widget yucca-stream-multistream-stats">\n' +
	    '    <header class="yucca-stream-multistream-stats-header">\n' +
	    '        {{widgetTitle}}\n' +
	    '    </header>\n' +
	    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
	    '    <div class="yucca-stream-multistream-stats-content">\n' +
	    '        <section class="yucca-stream-multistream-stats-map" ng-show="panel==\'map\'">\n' +
	    '           <style>.marker{border-radius: 100%;border:solid 4px;background-color: white; text-align: center;padding-top: -8px;}</style>\n' +
	    '           <style ng-repeat="style in mapData.markerstyles track by $index">{{style}}</style>\n' +
	    '           <leaflet id="{{mapId}}" width="100%" height="300px" markers="mapData.markers"></leaflet>\n' +
	    '           <div class="range-panel"><div class="range-min">0</div><div class="range-container">\n' +
	    '                <div class="range-value">{{currentTimeStats}} h</div>\n' +
	    '                <input type="range" name="points" min="0" max="{{maxStats}}" '+
	    '                    ng-model="currentTimeStats" ng-change="refreshMarker()" class="range-input"></div>\n' +
	    '               <div class="range-max">{{maxStats}}</div>\n'+
	    '           </div> \n' +
	    '        </section>\n' +
//	    '        <section class="yucca-stream-multistream-stats-chart" ng-show="panel==\'chart\'">\n' +
//	    '            <nvd3 options="options" data="chartData"></nvd3>\n' +
//	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-data" ng-show="panel==\'data\'" >\n' +
	    '           <table class="yucca-stream-multistream-stats-table">\n'+
	    '               <thead>\n' +
	    '                   <tr><th ng-repeat="titles in allData.tableHeader track by $index">{{titles}}</th></tr>\n' +
	    '               </thead>\n' +
	    '               <tbody>\n' +
	    '                   <tr ng-repeat="(key, value) in allData track by $index">\n' +
	    '                     <td ng-repeat="data in value.tableData track by $index">{{data}}</td>\n' +
	    '                   </tr>\n' + 
	    '               </tbody>\n' +
	    '           </table>\n' +
	    '           <div class="yucca-stream-multistream-stats-component" ng-repeat="(key, value) in lastMessage.values[0].components">' +
	    '               <div class="yucca-stream-multistream-stats-component-key">{{key}}</div>\n' +
	    '               <div class="yucca-stream-multistream-stats-component-value">{{value}}</div>\n' +
	    '               <div class="yucca-stream-multistream-stats-component-measure-unit">{{componentsMap[key].measureUnit}}</div>\n' +
	    '           </div>\n' +
	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-data" ng-hide="allData!=null">\n' +
	    '           No data\n' +
	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-total-count">\n' +
	    '            Total: {{totalCount}}\n' +
	    '        </section>\n' +
	    '        <section class="yucca-stream-multistream-stats-toolbar">\n' +
	    '            <a href ng-click="panel=\'map\'" ng-class="{active: panel == \'map\'}">Map</a> | <a href ng-click="panel=\'data\'" ng-class="{active: panel == \'data\'}">Data</a> \n' +
	    '        </section>\n' +
	    '    </div>\n' +
	    '    <footer>\n' +
	    '        <div class="credits-intro">powered by</div>\n' +
	    '        <a href="http://www.smartdataplatform.it/" target="_blank">\n' +
	    '          <i>SmartDataNet.it</i>\n' +
	    '        </a>\n' +
	    '    </footer>\n' +
	    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaStreamMultistreamValue', ['metadataService','dataService', '$yuccaHelpers',
    function (metadataService, dataService,$yuccaHelpers) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/stream_multistream_value.html',
        link: function(scope, elem, attr) {
        	
        	scope.debug = attr.debug==="true"?true:false;
            var user_token =  attr.userToken;
        	scope.debugMessages = [];
            
            //[{stream:"", components: [{component:"",min:"",max:""}];
        	var streamsAttr = scope.$eval(attr.streams);
        	scope.streams  ={};
        	scope.lastupdate =  new Date();

        	
        	var refershDataBullet = function(component){
        		var result = "";
        		var value =  	parseFloat(component.lastValue);
        		if(value!=null){
            		var result = "ok";
        			if((component.minWarning != '-' && value < component.minWarning) || 
        					(component.maxWarning != '-' && value > component.maxWarning ))
        				result = "warning";
        			if((component.minCritical != '-' && value < component.minCritical) || 
        					(component.maxCritical != '-' && value > component.maxCritical))
        				result = "critical";
        		
        		}
        		return result;
        	};
        	
    	    var dataCallback = function(message, dataCallbackIndex) {
               var messageBody = JSON.parse(message.body);
               if(typeof dataCallbackIndex == undefined || dataCallbackIndex == null){
            	   dataCallbackIndex = message.headers.destination.replace("/topic/output.", "");
//            		   "/topic/output.cittato_aria.9610f4fc-1535-4d09-c596-76dc0a5a339c_AQS_001"            	   
               }
               var newValues = messageBody.values[0];
               scope.lastupdate = newValues.time;
               for(var j = 0; j<scope.streams[dataCallbackIndex].components.length; j++){
            	   var component  = scope.streams[dataCallbackIndex].components[j];
            	   for (var componentKey in newValues.components) {
            		    if (newValues.components.hasOwnProperty(componentKey) && componentKey == component.name) {
            		    	scope.streams[dataCallbackIndex].components[j].lastValue = newValues.components[componentKey];
            		    	scope.streams[dataCallbackIndex].components[j].bulletLevel = refershDataBullet(scope.streams[dataCallbackIndex].components[j]);
            		    	
            		    }
            	   }
               }
    	    };
    	    
  
    	    if(typeof streamsAttr!=undefined && streamsAttr!=null && streamsAttr.length >0){
        		for (var i = 0; i < streamsAttr.length; i++) {
					var stream = streamsAttr[i];
					metadataService.getStreamMetadata (stream.tenantCode, stream.streamCode, stream.smartobjectCode, user_token).success(function(metadata){
						var s = {};
						
						s.name = metadata.name;
						s.components =[];
						for(var a=0; a<streamsAttr.length; a++){ // loop on streams attribute from client
							if(streamsAttr[a].tenantCode == metadata.tenantCode && 
								streamsAttr[a].streamCode == metadata.stream.code && 
								streamsAttr[a].smartobjectCode == metadata.stream.smartobject.code){  // if the stream loaded is the stream attribute
									for(var c=0; c<streamsAttr[a].components.length; c++){ //loop on components of the stream attribute
										for(var c1=0; c1<metadata.stream.components.length; c1++){ // loop on components of the stream loaded
										if(metadata.stream.components[c1].name == streamsAttr[a].components[c].name){
											var c2 = {};
											c2.name = metadata.stream.components[c1].name;
											c2.phenomenon = metadata.stream.components[c1].phenomenon;
											c2.measureunit = metadata.stream.components[c1].measureunit;
											c2.label = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].label, c2.name);
											c2.minWarning = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].minWarning, "-");
											c2.minCritical = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].minCritical, "-");
											c2.maxWarning = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].maxWarning, "-");
											c2.maxCritical = $yuccaHelpers.attrs.safe(streamsAttr[a].components[c].maxCritical, "-");
											c2.bulletsLevel  = "Min Critical: " +c2.minCritical + " \u000d " +
																"Min Warning: " +c2.minWarning + " \u000d" +
																"Max Warning: " +c2.maxWarning+ " \u000d" +
																"Max Critical: " +c2.maxCritical;
											s.components.push(c2);
									
										}
									}
								}
							}
						}
						scope.streams[ metadata.code] = s;
						if(typeof metadata["dataset"]!='undefined' && metadata["dataset"]!=null && typeof metadata["dataset"].code!='undefined' && metadata["dataset"].code!=null){
							console.debug("load past data");
							dataService.getMeasures(metadata["dataset"].code, user_token,null,  0, 1, 'time%20desc').success((function(dataCallbackIndex){ 
								return function(data) {
									console.debug("getMeasures" , dataCallbackIndex, data);
									if(data.d.results!=null && data.d.results.length>0){
										for(var j = 0; j<scope.streams[dataCallbackIndex].components.length; j++){
						            	   var component  = scope.streams[dataCallbackIndex].components[j];
						            	   if(data.d.results[0][component.name] !=null){
						            		   scope.streams[dataCallbackIndex].components[j].lastValue = data.d.results[0][component.name];
						            		   scope.streams[dataCallbackIndex].components[j].lastUpdate = $yuccaHelpers.utils.mongoDate2string(data.d.results[0]["time"]);
						            		   scope.streams[dataCallbackIndex].components[j].bulletLevel = refershDataBullet(scope.streams[dataCallbackIndex].components[j]);
						            	   }
						               }
						               dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
									}
									};
							})(metadata.code));
						}
						else
							dataService.getLastValue(metadata.tenantCode, metadata.stream.code, metadata.stream.smartobject.code, user_token, dataCallback, metadata.code);
						
						
						
					}).error(function(){
						scope.debugMessages.push("Stream not found: " + stream);
						
					});
					
					
				}
        	}
        	else{
        		scope.debugMessages.push("Invalid streams definition: " + streamsAttr + " - streams must be an array like this [{'tenantCode':'...', 'streamCode':'...', 'smartobjectCode':'...', components: [{component:'',min:'',max:''}], ...");
        	}
        	
            console.debug("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/stream_multistream_value.html",
    '<div class="yucca-widget yucca-stream-multistream-value">\n' +
    '    <header class="yucca-stream-multistream-value-header">\n' +
    '        {{widgetTitle}}\n' +
    '    </header>\n' +
    '    <div class="yucca-widget-intro" ng-show="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-stream-multistream-value-content">\n' +
    '        <section class="yucca-stream-multistream-value-data">\n' +
    '           <table class="yucca-stream-multistream-value-table">\n'+
    '               <tbody ng-repeat="stream in streams track by $index" >\n' +
    '                   <tr>\n' +
    '                     <td class="yucca-stream-multistream-value-stream-row" colspan="100%">\n'+
    '                         <span class="yucca-stream-multistream-value-component">{{stream.name}}</span>\n' +
    '                     </td>\n' +
    '                   </tr>\n' + 
    '                   <tr ng-repeat="component in stream.components track by $index">\n' +
    '                     <td class="yucca-stream-multistream-value-component-name"><span title="Phenomenon: {{component.phenomenon}}">{{component.label}}</span></td>\n' +
    '                     <td class="yucca-stream-multistream-value-component-bullet"><span class="yucca-stream-multistream-value-bullet bullet-{{component.bulletLevel}}" title="{{component.bulletsLevel}}"></span></td>\n' +
    '                     <td class="yucca-stream-multistream-value-component-value" title="Updated at: {{component.lastUpdate|date:\'MM/dd/yyyy  H:mm\'}}"><span>{{component.lastValue}}</span> <span class="yucca-stream-multistream-component-measureunit">{{component.measureunit}}</span> </td>\n' +
    '                   </tr>\n' + 
    '               </tbody>\n' +
    '           </table>\n' +
    '        </section>\n' +
    '        <section class="yucca-stream-multistream-value-lastupdate-bar">\n' +
    '            Updated at: {{lastupdate|date:"MM/dd/yyyy  H:mm"}}\n' + 
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

/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('widgetHeader',
    function () {
    	'use strict';
    	return {     
    		restrict: 'E',
    		scope: {widgetTitle: '@', widgetSubtitle: '@'},
    		template: '<header ng-if="widgetTitle || widgetSubtitle" class="yucca-widget-header">{{widgetTitle}} <small>{{widgetSubtitle}}</small></header>'
    	}
	}
);


yuccaWidgetsModule.directive('widgetFooter',
    function () {
    	'use strict';
    	return {     
    		restrict: 'E',
    		scope: {widgetFooterText: '@'},
    		template: '<footer class="yucca-widget-footer">' + 
    				'<div class="yucca-credits"><div class="yucca-widget-footer-text">{{footerText}}</div><div class="yucca-credits-intro">powered by</div>' +
    	    '        <a href="http://www.smartdatanet.it/" target="_blank">\n' +
    	    '        SmartDataPlatform.it</a></div></footer>'
    	}
	}
);




yuccaWidgetsModule.directive('wrap',
	    function () {
	    return {      restrict: 'E',
	    	tranclude: true,
	        template: '<div  style="background-color: red ; padding: 1em;" ></div>'
	                	      };
	}
);


yuccaWidgetsModule.directive('widget',
	    function () {
	    'use strict';

	    return {      restrict: 'E',

	        template: '<div><header></header><wrap><div>Ciao</div></wrap><footer></footer></div>'
	      };
	}
	);


yuccaWidgetsModule.directive('one', function($rootScope) {
    return {
            template: '<div>I am one</div>',
            link:function(scope, elem, attr){
            	console.log("one", attr, scope.filter);
            	scope.ciao = "ciao";
            	scope.ciao = function(da){
            		$rootScope.$broadcast('saluto', ' da ale ' + da);
            	}

            }
        };
    });

yuccaWidgetsModule.directive('two', function(oneDirective) {
    return angular.extend({}, oneDirective[0], { 
    	template: '<div>I am two {{ciao}} {{filter}} <a href ng-click="ciao(filter)">saluta</a></div>',
    	link: function(scope, elem, attr) {
        	console.log("two", attr, scope.filter);
    		scope.filter  = attr.filter;
    		
    	 
    	}
 
    });     
});
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetBoxplotChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_boxplot_chart.html',
        link: function(scope, elem, attr) {
        	console.debug("elem", elem);

            var widgetType = 'YuccaBasicDatasetBoxplotChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: ""};

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
    		
            
            
            var boxplotColumns=scope.$eval(attr.boxplotColumns);
            var isDataAggregate = $yuccaHelpers.attrs.safe(attr.isDataAggregate, false);
        	scope.options = {
    			chart: {
    				type: 'boxPlotChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){return d.label;},
	                y: function(d){return d.value;},
	                valueFormat: function(d){return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);},	         
	                showValues: attr.showValues==="false"?false:true,
//	                yAxis:{
//	                	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
//    	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
//						axisLabel:yAxisAttr.label?yAxisAttr.label:""
//					},
//	                xAxis:{
//	   				axisLabel:xAxisAttr.label?xAxisAttr.label:"",
//	    	            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
//
//					},
//					showXAxis:!xAxisAttr.hide,
//	    	        showYAxis:!yAxisAttr.hide,
	    	    	reduceXTicks: attr.reduceXTicks == "true",
	        		boxplot: {
	        			dispatch: {
	        				//chartClick: function(e) {console.log("! chart Click !")},
	        				//elementClick: function(e) {},
	        				//elementDblClick: function(e) {console.log("! element Double Click !")},
	        				elementMouseout: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				},
	        				elementMouseover: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				}
	        			}
	        		}
    			},
	        };
        	// range 0->1
			
			if(!yAxisAttr.hide){
				scope.options.chart.showYAxis=true;
				scope.options.chart.yAxis = {
	            	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
	    			axisLabel:yAxisAttr.label?yAxisAttr.label:"",
	    			staggerLabels: yAxisAttr.staggerLabels?true:false
				};
			}
			else
				scope.options.chart.showYAxis=false;

			if(!xAxisAttr.hide){
				scope.options.chart.showXAxis=true;
				scope.options.chart.reduceXTicks= attr.reduceXTicks == "true",
			
			
				scope.options.chart.xAxis = {
	            	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
		            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
					staggerLabels: xAxisAttr.staggerLabels?true:false
				};
			}
			else
				scope.options.chart.showXAxis=false;
        	console.log("yAxisAttr", yAxisAttr);
        	console.log("scope.options",scope.options);

        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		
        		//var legend = {margin:{top: legendAttr.position.top,right: legend.position.right,bottom: legend.position.bottom,left: legend.position.left}};
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
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
	    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
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
		    	   
		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
       		
       		// caricamento dei dati?
       		
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("boxplotchart:loadData", result);
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
        	// aggregazione dei dati?
        	
        	
        	var prepareData  = function(){
    			//var dataMap = {};
    			console.log("prepareData", odataResult);
    			//var sliceCount=0;
	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			console.log("boxplotColumns", boxplotColumns);
	    			for(var i=0; i<odataResult.length; i++){
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			}

//	    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, chartColors,attr.mainChartColor);
	    			if (!isDataAggregate){
	    				scope.chartData = $yuccaHelpers.data.aggregationBoxplotValueKey(allData, [valueColumn], groupByColumn.key, chartColors,attr.mainChartColor);
	    			}else{
	    				
	    				var outliers_separator = boxplotColumns['outliers_separator']?boxplotColumns['outliers_separator']:";";

						for(var i=0; i<allData.length; i++){

		    				var obj = {};
		    				var dataMapBoxplot = {};
		    				console.log("ilmiolog",allData[i]);
		    				console.log("test",allData[i][boxplotColumns['Q1']]);
		    				obj['Q1'] = allData[i][boxplotColumns['Q1']];
							obj['Q2'] = allData[i][boxplotColumns['Q2']];
							obj['Q3'] = allData[i][boxplotColumns['Q3']];
							obj['whisker_low']=allData[i][boxplotColumns['whisker_low']]
							obj['whisker_high'] = allData[i][boxplotColumns['whisker_high']];
							var outliers = allData[i][boxplotColumns['outliers']].split(outliers_separator).map( Number );
							obj['outliers'] = outliers ;
							console.log("objvalue",obj);
							dataMapBoxplot['values']=obj;
							dataMapBoxplot['label']= allData[i].course;
						
							scope.chartData.push(dataMapBoxplot);
						}
	    			}
					var colors = $yuccaHelpers.render.safeColors(scope.chartData.length, chartColors,mainChartColor);
					scope.options.chart.color = colors;

	    	        console.log("discrete chartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesKeyValue(groupByColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
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
  $templateCache.put("template/dataset_boxplot_chart.html",
    '<div class="yucca-widget yucca-dataset-boxplot-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-boxplot-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetBubblesMapChart', ['metadataService','dataService', '$yuccaHelpers', '$http', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_bubbles_map_chart.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaControlMapChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


			var colors = new Array();

            
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
          
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            var areaColor = $yuccaHelpers.attrs.safe(attr.areaColor, "#cccccc");
            
            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
        	var legendAttr= scope.$eval(attr.chartLegend);

            var width = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            var height = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            
            
            var radius = $yuccaHelpers.attrs.num(attr.radius, null, null, 2);
			var svg,g,mapLayer;

            $timeout(function(){
            	//var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId));
            	//console.log("YuccaControlMapChart",chartContentElement)
            	console.log("elem",elem)
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));

            	if(!width)
            		width = chartContentElement[0].offsetWidth; //elem[0].offsetWidth;
//            	if(!height){
//            		height= elem[0].offsetHeight;
//            		if(height<1)
//            			height = 300;
//            	} 
    			svg = d3.select('#' + scope.widgetId+ ' svg').attr('width', width).attr('height', height).on("click", stopped, true);
    			g = svg.append('g');
    			mapLayer = g.append('g').classed('map-layer', true);
    			
    			svg.call(zoom).call(zoom.event);
            	loadGeojson();

    			//loadData();
            });
            
            var valueColumn = scope.$eval(attr.valueColumn);
            var labelColumn = scope.$eval(attr.labelColumn);

            var latColumn = $yuccaHelpers.attrs.safe(attr.latColumn,'lat');
            var lngColumn = $yuccaHelpers.attrs.safe(attr.lngColumn,'lng');

            var borderColor =  $yuccaHelpers.attrs.safe(attr.borderColor, "#fff");
            scope.controlMapMapId = "controlMap"+new Date().getTime();

            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            var geoprojection = $yuccaHelpers.attrs.safe(attr.geoprojection, "mercator");
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	g = $yuccaHelpers.geo.initGeojson(g);
            	
			}
            var geojson_data = null;
            
            

            
            scope.geojson= null;
            var mapLatLngs = null;
			scope.isLoading = true;

			var activeGeojson = 0;

			var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		  if(event.eventtype == 'dataset.change.value_column'){
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
//	    		   else if(event.eventtype == 'dataset.highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetBubblesMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//			    				 layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
//	    					   }
//	    				   });
//	    			   });
//	    		   }
//	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetBubblesMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//	    			               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
//	    			            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
//	    					   }
//	    				   });
//	    			   });
//	    		   }		    	   
		       }
		       
       		});

			var maxValue = null;
			var minValue = null;
			scope.geojson= null;
			var mapLatLngs = null;
			scope.tableData = [];
			scope.isLoading = true;
   
   

			var zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 8]).on("zoom", zoomed);
			var zoomedScale = 1
			function zoomed() {
			  console.log("zoomed", d3.event.scale);
			  zoomedScale = d3.event.scale;
			  g.style("stroke-width", 1.5 / d3.event.scale + "px");
			  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}
			
			function stopped() {
				if (d3.event.defaultPrevented) d3.event.stopPropagation();
			}
			
			var projectionScale, projectionCenter, projectionTranslate;

			var loadGeojson = function(){
				d3.json(geojsons[activeGeojson].url, function(error, mapData) {
					
					var geofit = $yuccaHelpers.geo.fitGeojson(mapData, width, height, geoprojection);

	    			d3.select('#' + scope.widgetId+ ' svg').attr('height', geofit.height);
	    			height = geofit.height;
					var path = geofit.path;
					projectionScale = geofit.projectionScale;
					projectionCenter = geofit.projectionCenter;
					projectionTranslate = geofit.projectionTranslate;

					// Update color scale domain based on data
					console.log("data[0]",data);
					mapLayer.selectAll('path')
					.data(mapData.features)
					.enter().append('path')
					.attr('d', path)
					.attr('vector-effect', 'non-scaling-stroke')
					.style('fill', areaColor)
					.style('stroke', borderColor)
					.on('mouseover', highlightFeature)
					.on('mouseout', resetHighlight)
					.on('click', onAreaClick);
					//.on('dblclick', onAreaDblclick);
					



					//mapLayer.append("rect").attr('width', width).attr('height', height);
					// Draw each province as a path
					loadData()
					scope.isLoading = false;
				});
			};
			
			
			
			//var noDataColor = '#ccc'
//			var getValueColor = function(d){
//				var color = noDataColor;
//				if(d.properties.value){
//					color = colors[0].color(d.properties.value);
//					for (var i = 0; i < colors.length-1; i++) {
//						if(d.properties.value>=colors[i].max && d.properties.value<colors[i+1].max){
//							color = colors[i].color(d.properties.value);
//						}
//					}
//					if(d.properties.value>=colors[colors.length-1].max)
//						color = colors[colors.length-1].color(d.properties.value);
//				}
//				return color;
//			};

//			
//			function fillFn(d){
//				return getValueColor(d);
//			}

			scope.info = {"show": true};
			scope.updateInfo = function(show, content){
				$timeout(function(){
					console.log("updateinfo",show, content);
					scope.info.show= show;
					scope.info.content = content;
				},100);
			}

			
			var highlightBubble = function(d) {
				//var color = $yuccaHelpers.d3color.darker(mainChartColor, 2);
				//d.style('fill', color);
				d.attr("fill-opacity","0.4");
				var label = d.attr("label");
				var value = $yuccaHelpers.render.safeNumber(d.attr("value"), decimalValue, scope.isEuroValue(),formatBigNumber);
				scope.updateInfo(true, label + ": " + value);
			};
			
			var resetHighlightBubble = function(d) {
				d.attr("fill-opacity","0.2");
				scope.updateInfo(false, "");
			};

			var highlightFeature = function(d) {
				var color = $yuccaHelpers.d3color.darker(areaColor, 0.3);
				d3.select(this).style('fill', color);
				scope.updateInfo(true, d.properties[geojsons[activeGeojson].key]);
          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", 
          				{"key": d.properties[geojsons[activeGeojson].key], "color" :color}, eventControlId);
	        	$rootScope.$broadcast ('yucca-widget-event', event);				
			};

			var resetHighlight = function(d) {
				scope.updateInfo(false, "");
				if(d){
					mapLayer.selectAll('path').style('fill', areaColor);
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", 
							{"key": d.properties[geojsons[activeGeojson].key]}, eventControlId);
					$rootScope.$broadcast ('yucca-widget-event', event);					
				}
			};
             
             scope.filter = {};
             var currentSelected = null;
             function onAreaClick(d){
             	console.log("onAreaClick", d);
            	console.log("groupByColumn", groupByColumn);
            	
            	if(currentSelected!=null){
            		 currentSelected.properties.selected = false;
            	}
            	d.properties.selected = !d.properties.selected;
            	currentSelected = d;
            	if($yuccaHelpers.utils.isTouchDevice)
            		highlightFeature(d);
            	else
            		resetHighlight();

          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", {"column": groupByColumn.key, "value" :d.properties[geojsons[activeGeojson].key]}, eventControlId);
				event.eventControlId = eventControlId;
         		$rootScope.$broadcast ('yucca-widget-event', event); 
			 }
             
             var active = d3.select(null);
             
             function onAreaDblclick(d){
            	 if (active.node() === this) return reset();
            	  active.classed("active", false);
            	  active = d3.select(this).classed("active", true);

            	  var bounds = path.bounds(d),
            	      dx = bounds[1][0] - bounds[0][0],
            	      dy = bounds[1][1] - bounds[0][1],
            	      x = (bounds[0][0] + bounds[1][0]) / 2,
            	      y = (bounds[0][1] + bounds[1][1]) / 2,
            	      scale = Math.max(1, Math.min(8, 0.85 / Math.max(dx / width, dy / height))),
            	      translate = [width / 2 - scale * x, height / 2 - scale * y];

            	  svg.transition()
            	      .duration(750)
            	      .call(zoom.translate(translate).scale(scale).event);
             }
             
             function reset() {
            	  active.classed("active", false);
            	  active = d3.select(null);

            	  svg.transition()
            	      .duration(750)
            	      .call(zoom.translate([0, 0]).scale(1).event);
            	}


			 var odataResult = null;
			 var columnDataTypeMap = {};
			 var loadData = function(){
				console.log("map - loadData", datasetcode);
				scope.isLoading = true;
				odataResult = null;
				dataService.getDataEntities(datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
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
						console.info("bubblesMapChart:loadData", result);
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

			var data = new Array();
			
			//var minValue, maxValue;
			var prepareData  = function(){
				//var dataMap = {};
				data = new Array();

				console.log("prepareData", odataResult);
				//var sliceCount=0;
	
				if(odataResult != null){
					scope.isLoading = true;
					for(var i=0; i<odataResult.length; i++){
						for(var j=0;j<odataResult[i].data.d.results.length; j++){
							data.push(odataResult[i].data.d.results[j]);
							if(minValue == null){
								minValue = odataResult[i].data.d.results[j][valueColumn.key];
								maxValue = odataResult[i].data.d.results[j][valueColumn.key];
							}
							else{
								if(minValue>odataResult[i].data.d.results[j][valueColumn.key])
									minValue = odataResult[i].data.d.results[j][valueColumn.key];
								if(maxValue<odataResult[i].data.d.results[j][valueColumn.key])
									maxValue = odataResult[i].data.d.results[j][valueColumn.key];
							}
								
						}
					}
						//allData = allData.concat(odataResult[i].data.d.results);
						
					//data = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, null,attr.mainChartColor);
					//data = allData;
					console.log("discrete mapData",data);
					
					//color = d3.scale.quantile().range(["#ff00ff", "#ff0000", "#00ffff", "0000ff", "fff000"]);
//					if(rangeColors){
//						var minValue =  d3.min(data[0].values, function(d){ return d.value; });
//	            		for(var c = 0; c<rangeColors.length;c++){ // [4,5,100,300
//	            			var color = {max: rangeColors[c].limit, color: d3.scale.linear().domain([minValue,rangeColors[c].limit])
//	            					.clamp(true).range($yuccaHelpers.d3color.getRange(rangeColors[c].color))}
//	            			minValue = rangeColors[c].limit;
//	            			colors.push(color);
//	            		}
//					}
//					else{
//						var maxValue = d3.max(data[0].values, function(d){ return d.value; });
//						colors.push({max: maxValue, color: d3.scale.linear().domain([ d3.min(data[0].values, function(d){ return d.value; }),maxValue])
//							.clamp(true).range($yuccaHelpers.d3color.getRange(mainChartColor))});
//					}
					//color.domain();
					mapLayer.selectAll('circle').remove();

					console.log("data",data)
					if(data.length>0){
						var rUnit = radius*parseInt(width/100);
						for(var j=0; j<data.length; j++){
						  var d = data[j];
						  //console.debug("d", d);
						  
						  var coordinates = $yuccaHelpers.geo.pointProjection([d[lngColumn],d[latColumn]],projectionScale, projectionCenter, projectionTranslate,geoprojection);
						  var r = parseInt(d[valueColumn.key]*rUnit/maxValue);
						  if(radius>0){							  
							  mapLayer.append('svg:circle')
							  .attr('cx', coordinates[0])
							  .attr('cy', coordinates[1])
							  .attr('r', r)
							  .attr('stroke', mainChartColor)
							  .attr("stroke-width",1)
							  .attr("fill",mainChartColor)
							  .attr("fill-opacity","0.2")
							  .attr("value", d[valueColumn.key])
							  .attr("label", labelColumn?d[labelColumn.key]:"")
							  .attr("vector-effect","non-scaling-stroke")
							  .on('mouseover', function(){highlightBubble(d3.select(this));})
							  .on('mouseout', function(){resetHighlightBubble(d3.select(this));});	
						  }
						}
					}
					console.log("colors", colors);

						scope.isLoading = false;
				}
				  
				  scope.isLoading = false;
			}
	
			loadGeojson();

			//loadData();


             console.log("attrs", attr);
             scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);


yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_bubbles_map_chart.html",
    '<div class="yucca-widget  yucca-bubbles-map-chart" id="{{widgetId}}" >\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <svg ng-show="!isLoading"></svg>\n' + 
    '           <div class="info-panel" ng-show="info.show"><span>{{info.content}}</span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetChoroplethMapChart', ['metadataService','dataService', '$yuccaHelpers', '$http', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_choropleth_map_chart.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaControlMapChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


			var centered;
			var colors = new Array();

            
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
          
            var rangeColors = scope.$eval(attr.rangeColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            
            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
        	var legendAttr= scope.$eval(attr.chartLegend);

            var width = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            var height = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            
            
			var svg,g,mapLayer;

            $timeout(function(){
            	//var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId));
            	//console.log("YuccaControlMapChart",chartContentElement)
            	console.log("elem",elem)
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	if(!width)
            		width = chartContentElement[0].offsetWidth; //elem[0].offsetWidth;
//            	if(!height){
//            		height= elem[0].offsetHeight;
//            		if(height<1)
//            			height = 300;
//            	} 
    			svg = d3.select('#' + scope.widgetId+ ' svg').attr('width', width).attr('height', height);
    			g = svg.append('g');
    			mapLayer = g.append('g').classed('map-layer', true);
            	
            	//loadGeojson();
            	loadData();
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            

            
            

            var borderColor =  $yuccaHelpers.attrs.safe(attr.borderColor, "#fff");
            var noDataColor = $yuccaHelpers.attrs.safe(attr.noDataColor, "#eee");
            scope.controlMapMapId = "controlMap"+new Date().getTime();

            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            var geoprojection = $yuccaHelpers.attrs.safe(attr.geoprojection, "mercator");
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	g = $yuccaHelpers.geo.initGeojson(g);
            	
			}
            var geojson_data = null;
            

            
            scope.geojson= null;
            var mapLatLngs = null;
			scope.isLoading = true;

			var activeGeojson = 0;

			var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		  if(event.eventtype == 'dataset.change.value_column'){
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
//	    		   else if(event.eventtype == 'dataset.highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//			    				 layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
//	    					   }
//	    				   });
//	    			   });
//	    		   }
//	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//	    			               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
//	    			            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
//	    					   }
//	    				   });
//	    			   });
//	    		   }		    	   
		       }
		       
       		});

			var maxValue = null;
			var minValue = null;
			scope.geojson= null;
			var mapLatLngs = null;
			scope.tableData = [];
			scope.isLoading = true;
   
   

			
			var projectionScale, projectionCenter, projectionTranslate;


			var loadGeojson = function(){
				d3.json(geojsons[activeGeojson].url, function(error, mapData) {
					// create a first guess for the projection
					for (var k in mapData.features) {
						mapData.features[k].properties.selected=false;
					}
					var geofit = $yuccaHelpers.geo.fitGeojson(mapData, width, height, geoprojection);

	    			d3.select('#' + scope.widgetId+ ' svg').attr('height', geofit.height);
	    			height = geofit.height;

					/*
					var center = d3.geo.centroid(mapData);
					console.log("offset center", center);
					var scale  = 60;
					var offset = [width/2, height/2];
					console.log("offset", offset);
					var projection = getProjection(scale,center,offset);

					// create the path
					var path = d3.geo.path().projection(projection);

					// using the path determine the bounds of the current map and use 
					// these to determine better values for the scale and translation
					var bounds  = path.bounds(mapData);
					console.log("offset bounds", bounds);
					//scale = 1 / Math.max((bounds[1][0]-bounds[0][0])*1./width, (bounds[1][1]-bounds[0][1])*1./height);
					//console.log("scale", scale);
					//offset  = [width - (bounds[0][0] + bounds[1][0])/2,height*1.-(bounds[0][1] + bounds[1][1])/2];
					//console.log("offset", offset);
					//var offset = [width/2, height/2];
					// new projection
					
				    var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
				    var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
				    var scale   = (hscale < vscale) ? hscale : vscale;
				    console.log("offset scale", scale);
					var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
				                        height - (bounds[0][1] + bounds[1][1])/2];
					console.log("offset", offset);

					projection = getProjection(scale,center,offset);
					path = path.projection(projection);				
					
					console.log("offset s c o ",scale,center,offset);*/

					var path = geofit.path;
					projectionScale = geofit.projectionScale;
					projectionCenter = geofit.projectionCenter;
					projectionTranslate = geofit.projectionTranslate;

					
					// Update color scale domain based on data
					//color.domain([0, d3.max(features, nameLength)]);
					if(data[0].values.length>0){
						console.log("data[0]",data[0]);
						for(var j=0; j<data[0].values.length; j++){
						  var d = data[0].values[j];
						  console.debug("d", d);
						  for(var k=0; k<mapData.features.length;k++){
							  if(d.key.toUpperCase() == mapData.features[k].properties[geojsons[activeGeojson].key].toUpperCase()){
								mapData.features[k].properties.label = data[0].label; 
								mapData.features[k].properties.value = d.value;
								//geojson_data.features[k].properties.color = d.color;
							}
						  }
						}
					}



					//mapLayer.append("rect").attr('width', width).attr('height', height);
					// Draw each province as a path
					mapLayer.selectAll('path')
						.data(mapData.features)
						.enter().append('path')
						.attr('d', path)
						.attr('vector-effect', 'non-scaling-stroke')
						.style('fill', fillFn)
						.style('stroke', borderColor)
						.on('mouseover', highlightFeature)
						.on('mouseout', resetHighlight)
						.on('click', onAreaClick);
					
					scope.isLoading = false;
				});
			};
			
//			var fitGeojson = function(geojson){
//				
//				var c = d3.geo.centroid(geojson);
//				
//				// Create a unit projection.
//				var projection = getProjection(1,c ,[0,0]);
//				// Create a path generator.
//				var path = d3.geo.path().projection(projection);
//				// Compute the bounds of a feature of interest, then derive scale & translate.
//				var b = path.bounds(geojson),
//				    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
//				    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
//
//				// Update the projection to use computed scale & translate.
//				console.log("offset s c t ",s,c,t);
//				return d3.geo.path().projection(getProjection(s,c,t));
//
//			}
			
			// https://github.com/d3/d3-geo#geoProjection
//			var getProjection = function(scale, center, offset){
//				if(geoprojection == 'azimuthalEqualArea')
//					return d3.geo.azimuthalEqualArea().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'azimuthalEquidistant')
//					return d3.geo.azimuthalEquidistant().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'conicConformal')
//					return d3.geo.conicConformal().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'conicEqualArea')
//					return d3.geo.conicEqualArea().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'conicEquidistant')
//					return d3.geo.conicEquidistant().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'equirectangular')
//					return d3.geo.equirectangular().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'gnomonic')
//					return d3.geo.gnomonic().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'orthographic')
//					return d3.geo.orthographic().scale(scale).center(center).translate(offset);
//				else if(geoprojection == 'stereographic')
//					return d3.geo.stereographic().scale(scale).center(center).translate(offset);
//				else
//					return d3.geo.mercator().scale(scale).center(center).translate(offset);
//				
//			}
			
			
			
			
			var getValueColor = function(d){
				var color = noDataColor;
				if(d.properties.value){
					color = colors[0].color(d.properties.value);
					for (var i = 0; i < colors.length-1; i++) {
						if(d.properties.value>=colors[i].max && d.properties.value<colors[i+1].max){
							color = colors[i].color(d.properties.value);
						}
					}
					if(d.properties.value>=colors[colors.length-1].max)
						color = colors[colors.length-1].color(d.properties.value);
				}
				return color;
			};

			
			function fillFn(d){
				return getValueColor(d);
			}

			scope.info = {"show": true};
			scope.updateInfo = function(show, content){
				$timeout(function(){
					scope.info.show= show;
					scope.info.content = content;
				},100);
			}

			
			var highlightFeature = function(d) {
				var color = $yuccaHelpers.d3color.darker(getValueColor(d), 0.3);
				d3.select(this).style('fill', color);
				scope.updateInfo(true, d.properties.name  + (d.properties.label?" - " + d.properties.label:"") +
						(d.properties.value?
						": " + $yuccaHelpers.render.safeNumber(d.properties.value, decimalValue, scope.isEuroValue(),formatBigNumber):": no data"));
          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", 
          				{"key": d.properties[geojsons[activeGeojson].key], "color" :color}, eventControlId);
	        	$rootScope.$broadcast ('yucca-widget-event', event);				
			};

			var resetHighlight = function(d) {
        	  	mapLayer.selectAll('path').style('fill', function(d){return getValueColor(d);});
        	  	scope.updateInfo(false, "");
          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", 
          				{"key": d.properties[geojsons[activeGeojson].key]}, eventControlId);
	        	$rootScope.$broadcast ('yucca-widget-event', event);
			};
             
             scope.filter = {};
             var currentSelected = null;
             function onAreaClick(d){
             	console.log("onAreaClick", d);
            	console.log("groupByColumn", groupByColumn);
            	
            	if(currentSelected!=null){
            		 currentSelected.properties.selected = false;
            	}
            	d.properties.selected = !d.properties.selected;
            	currentSelected = d;
            	if($yuccaHelpers.utils.isTouchDevice)
            		highlightFeature(d);
            	else
            		resetHighlight();

          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", {"column": groupByColumn.key, "value" :d.properties[geojsons[activeGeojson].key]}, eventControlId);
				event.eventControlId = eventControlId;
         		$rootScope.$broadcast ('yucca-widget-event', event); 
			 }

			 var odataResult = null;
			 var columnDataTypeMap = {};
			   var loadData = function(){
				console.log("map - loadData", datasetcode);
				scope.isLoading = true;
				   odataResult = null;
				dataService.getDataEntities(datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
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

			var data;
			
			var prepareData  = function(){
				//var dataMap = {};
				console.log("prepareData", odataResult);
				//var sliceCount=0;
	
				if(odataResult != null){
					scope.isLoading = true;
					var allData = new Array();
					for(var i=0; i<odataResult.length; i++)
						allData = allData.concat(odataResult[i].data.d.results);
						
					data = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, null,attr.mainChartColor);
	
					console.log("discrete mapData",data);
					
					//color = d3.scale.quantile().range(["#ff00ff", "#ff0000", "#00ffff", "0000ff", "fff000"]);
					//var mainRangeColor = d3.scale.linear().domain([1,10]).range(["white", mainChartColor,"black"]);
					if(rangeColors){
						var minValue =  d3.min(data[0].values, function(d){ return d.value; });
	            		for(var c = 0; c<rangeColors.length;c++){ // [4,5,100,300
	            			var color = {max: rangeColors[c].limit, color: d3.scale.linear().domain([minValue,rangeColors[c].limit])
	            					.clamp(true).range($yuccaHelpers.d3color.getRange(rangeColors[c].color))}
	            			minValue = rangeColors[c].limit;
	            			colors.push(color);
	            		}
					}
					else{
						var maxValue = d3.max(data[0].values, function(d){ return d.value; });
						colors.push({max: maxValue, color: d3.scale.linear().domain([ d3.min(data[0].values, function(d){ return d.value; }),maxValue])
							.clamp(true).range($yuccaHelpers.d3color.getRange(mainChartColor))});
					}
					//color.domain();
					
					loadGeojson();
					console.log("colors", colors);
					/*
					if(data[0].values.length>0){
						for(var j=0; j<data[0].values.length; j++){
						  var d = data[0].values[j];
						  console.log("d", d);
						  for(var k=0; k<geojson_data.features.length;k++){
							  if(d.key.toUpperCase() == geojson_data.features[k].properties[geojsons[activeGeojson].key].toUpperCase()){
								
								geojson_data.features[k].properties.value = d.value;
								geojson_data.features[k].properties.color = d.color;
							}
						  }
						}
						// compute statistic
						for(var m=0; m<geojson_data.features.length; m++){
							//scope.tableData.push({"key": geojson_data.features[m].properties[geojsonAreasKey], "value": geojson_data.features[m].properties.value});
							if(geojson_data.features[m].properties.value!=0){
							  if(maxValue==null || geojson_data.features[m].properties.value>maxValue)
								maxValue = geojson_data.features[m].properties.value;
							  if(minValue==null || geojson_data.features[m].properties.value<minValue)
								minValue = geojson_data.features[m].properties.value;
							}
						}
	
						scope.geojson= {};
						console.info("geojson_data",geojson_data);
						scope.geojson.data = geojson_data;
						scope.geojson.style = styleChoroplethMap;
						scope.geojson.onEachFeature = onEachChoroplethMapFeature;
						leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
							map.fitBounds(mapLatLngs);
						});
						if(legendAttr && legendAttr.show)
							createLegend();
					  } */
						scope.isLoading = false;
				}
				  
				  scope.isLoading = false;
			}
	
			//loadData();


             console.log("attrs", attr);
             scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);


yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_choropleth_map_chart.html",
    '<div class="yucca-widget  yucca-choropleth-map-chart" id="{{widgetId}}" >\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <svg ng-show="!isLoading"></svg>\n' + 
    '           <div class="info-panel" ng-show="info.show"><span>{{info.content}}</span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetCollapsibletreeChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_collapsibletree_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetCollapsibletreeChart';
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

            var textAfter = $yuccaHelpers.attrs.safe(attr.textAfter, '');

            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");
            scope.rowDepth =  $yuccaHelpers.attrs.safe(attr.rowDepth, 160);

            var treeColumns = scope.$eval(attr.treeColumns);
//            if(typeof treeColumns != 'Array' )
//        		scope.debugMessages.push("Invalid tree columns");
            
            var valueColumn =scope.$eval(attr.valueColumn);
//            if(valueColumn==null &&  countingMode=='sum')
//        		scope.debugMessages.push("To sum value you must enter a valid valueColum");
            
            scope.valueNotColored = $yuccaHelpers.attrs.safe(attr.valueNotColored, false);
            scope.hideValues = $yuccaHelpers.attrs.safe(attr.hideValues, false);
            scope.rowHeight = $yuccaHelpers.attrs.safe(attr.rowHeight, 32);
			scope.radius = attr.radius;
			scope.startClosed = $yuccaHelpers.attrs.safe(attr.startClosed, false);
			scope.nodeOffsetX = $yuccaHelpers.attrs.safe(attr.nodeOffsetX, 0);
            
            
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};
        	
        	scope.$on('yucca-collapsibletree-event', function(e, event) {  
 		       console.log("yucca-collapsibletree-event fuori", event);  
 		       if(event.sourceId == scope.widgetId){
 		    	  event.data.datasetcode = datasetcode;
 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
				  event.eventControlId = eventControlId;
 	        	  console.log("event",event);
 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
 		       }
        	});
        	
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
	 		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
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
		    		   else if(event.data.datasetcode == datasetcode && event.eventtype == "dataset.browse"){
			    		   var path = event.data.path;
								 $rootScope.$broadcast ('yucca-widget-event-'+scope.widgetId, {"type":"browse", "path":path, "eventControlId":eventControlId});
								 }
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
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("collapsibletreechart:loadData", result);
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
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			var valueFormat = {decimalValue: decimalValue, isEuro: scope.isEuroValue(), formatBigNumber: formatBigNumber, textAfter:textAfter};

	    			scope.collapsibletreeData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, treeColumns, valueColumn, null, valueFormat);
	    			console.log("tree fuori", scope.collapsibletreeData);

	    			  
	    			var colors = $yuccaHelpers.render.safeColors(scope.collapsibletreeData.children.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			for (var i = 0; i < scope.collapsibletreeData.children.length; i++) {
	    				addColorToChildren(scope.collapsibletreeData.children[i],colors[i]);
	    				//scope.collapsibletreeData.children[i].color = colors[i];
					}
	    			
	    	        console.log("chartData",scope.collapsibletreeData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	var addColorToChildren = function(node, color){
        		node.color = color;
        		if(node.children && node.children.length>0)
        			for (var i = 0; i < node.children.length; i++) {
        				addColorToChildren(node.children[i], color);
					}
        	};
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_collapsibletree_chart.html",
    '<div class="yucca-widget yucca-dataset-collapsibletree-chart" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-collapsibletree-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-collapsibletree-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-collapsibletree-chart-chart" >\n' +
    '        		<div ><collapsible-tree data="collapsibletreeData" columns="treeColumns" selected="{{treeSelected}}" hide_values = {{hideValues}} value_not_colored={{valueNotColored}} width="{{chartWidth}}" ' + 
    '                  height="{{chartHeight}}" widget_id="{{widgetId}}" row_height="{{rowHeight}}" row_depth="{{rowDepth}}" radius="{{radius}}" ' + 
    '				   start_closed="{{startClosed}}" node_offset_x="{{nodeOffsetX}}" ></collapsible-tree></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetCollapsibletreeboxesChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_collapsibletreeboxes_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetCollapsibletreeChart';
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
            
            var textAfter = $yuccaHelpers.attrs.safe(attr.textAfter, '');

            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");
            scope.rowDepth =  $yuccaHelpers.attrs.safe(attr.rowDepth, 120);
            scope.boxShadow = $yuccaHelpers.attrs.safe(attr.boxShadow, false);
            scope.hideValues = $yuccaHelpers.attrs.safe(attr.hideValues, false);
            scope.boxRadius = $yuccaHelpers.attrs.safe(attr.boxRadius, 6);


            var treeColumns = scope.$eval(attr.treeColumns);
//            if(typeof treeColumns != 'Array' )
//        		scope.debugMessages.push("Invalid tree columns");
            
            var valueColumn =scope.$eval(attr.valueColumn);
//            if(valueColumn==null &&  countingMode=='sum')
//        		scope.debugMessages.push("To sum value you must enter a valid valueColum");
            
            scope.hideValues = $yuccaHelpers.attrs.safe(attr.hideValues, false);

            
            
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};
        	
        	scope.$on('yucca-collapsibletree-event', function(e, event) {  
 		       console.log("yucca-collapsibletree-event fuori", event);  
 		       if(event.sourceId == scope.widgetId){
 		    	  event.data.datasetcode = datasetcode;
 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
				  event.eventControlId = eventControlId;
 	        	  console.log("event",event);
 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
 		       }
        	});
        	
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
	 		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
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
		    		   else if(event.data.datasetcode == datasetcode && event.eventtype == "dataset.browse"){
			    		   var path = event.data.path;
								 $rootScope.$broadcast ('yucca-widget-event-'+scope.widgetId, {"type":"browse", "path":path,"eventControlId":eventControlId});
								 }
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
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("collapsibletreechart:loadData", result);
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
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			var valueFormat = {decimalValue: decimalValue, isEuro: scope.isEuroValue(), formatBigNumber: formatBigNumber, textAfter:textAfter};

	    			scope.collapsibletreeData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, treeColumns, valueColumn, null, valueFormat);
	    			console.log("tree fuori", scope.collapsibletreeData);

	    			  
	    			var colors = $yuccaHelpers.render.safeColors(scope.collapsibletreeData.children.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			for (var i = 0; i < scope.collapsibletreeData.children.length; i++) {
	    				addColorToChildren(scope.collapsibletreeData.children[i],colors[i]);
	    				//scope.collapsibletreeData.children[i].color = colors[i];
					}
	    			
	    	        console.log("chartData",scope.collapsibletreeData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	var addColorToChildren = function(node, color){
        		node.color = color;
        		if(node.children && node.children.length>0)
        			for (var i = 0; i < node.children.length; i++) {
        				addColorToChildren(node.children[i], color);
					}
        	};
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_collapsibletreeboxes_chart.html",
    '<div class="yucca-widget yucca-dataset-collapsibletree-chart" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-collapsibletree-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-collapsibletree-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-collapsibletree-chart-chart" >\n' +
    '        		<div ><collapsible-tree-boxes data="collapsibletreeData" columns="treeColumns" hide_values ="{{hideValues}}" box_radius="{{boxRadius}}"'+
    '					width="{{chartWidth}}" height="{{chartHeight}}" widget_id="{{widgetId}}" row_depth="{{rowDepth}}" box_shadow="boxShadow"></collapsible-tree-boxes></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


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

	
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetDiscretebarChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_discretebar_chart.html',
        link: function(scope, elem, attr) {
        	console.debug("elem", elem);

            var widgetType = 'YuccaBasicDatasetDiscretebarChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: ""};

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
    		
        	scope.options = {
    			chart: {
    				type: 'discreteBarChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){return d.label;},
	                y: function(d){return d.value;},
	                valueFormat: function(d){return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);},	         
	                showValues: attr.showValues==="false"?false:true,
//	                yAxis:{
//	                	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
//    	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
//						axisLabel:yAxisAttr.label?yAxisAttr.label:""
//					},
//	                xAxis:{
//	                	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
//	    	            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
//
//					},
//					showXAxis:!xAxisAttr.hide,
//	    	        showYAxis:!yAxisAttr.hide,
	    	    	reduceXTicks: attr.reduceXTicks == "true",
	        		discretebar: {
	        			dispatch: {
	        				//chartClick: function(e) {console.log("! chart Click !")},
	        				//elementClick: function(e) {},
	        				//elementDblClick: function(e) {console.log("! element Double Click !")},
	        				elementMouseout: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				},
	        				elementMouseover: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				}
	        			}
	        		}
    			},
	        };
        	// range 0->1
			
			if(!yAxisAttr.hide){
				scope.options.chart.showYAxis=true;
				scope.options.chart.yAxis = {
	            	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
					axisLabel:yAxisAttr.label?yAxisAttr.label:"",
					staggerLabels: yAxisAttr.staggerLabels?true:false
				};
			}
			else
				scope.options.chart.showYAxis=false;

			if(!xAxisAttr.hide){
				scope.options.chart.showXAxis=true;
				scope.options.chart.reduceXTicks= attr.reduceXTicks == "true",
			
			
				scope.options.chart.xAxis = {
	            	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
		            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
					staggerLabels: xAxisAttr.staggerLabels?true:false
		
				};
			}
			else
				scope.options.chart.showXAxis=false;
			
        	console.log("yAxisAttr", yAxisAttr);
        	console.log("scope.options",scope.options);

        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		
        		//var legend = {margin:{top: legendAttr.position.top,right: legend.position.right,bottom: legend.position.bottom,left: legend.position.left}};
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
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
	    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
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
		    	   
		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
    			//var dataMap = {};
    			console.log("prepareData", odataResult);
    			//var sliceCount=0;

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, chartColors,attr.mainChartColor);
	    			
	    			var maxLabel = "";
	    			if(scope.chartData && scope.chartData.length>0 && scope.chartData[0].values){	    				
	    				for(var i=0; i<scope.chartData[0].values.length; i++){
	    					var label = $yuccaHelpers.render.safeNumber(scope.chartData[0].values[i].value, decimalValue, scope.isEuroValue(),formatBigNumber);
	    					if(label.length>maxLabel.length)
	    						maxLabel = label;
	    				}
	    				var fakeText = d3.select("#"+ scope.widgetId + "-fake").insert("svg").append("text").text(maxLabel);
	    				if(!scope.options.chart.margin)
	    					scope.options.chart.margin = {};
	    				scope.options.chart.margin.left = fakeText.node().getComputedTextLength()+6;
	    				console.log("maxLabel",maxLabel, fakeText.node().getComputedTextLength());
	    				d3.select("#"+ scope.widgetId + "-fake svg").remove();
	    			}

	    	        console.log("discrete chartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesKeyValue(groupByColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
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
  $templateCache.put("template/dataset_discretebar_chart.html",
    '<div class="yucca-widget yucca-dataset-discretebar-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '           <div id="{{widgetId}}-fake" class="nvd3"></div>' + 
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetDrilldowndataexplorerChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_drilldowndataexplorer_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetDrilldowndataexplorerChart';
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth-24);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");

            scope.treeColumns = scope.$eval(attr.treeColumns);
            if(typeof scope.treeColumns != 'Array' )
        		scope.debugMessages.push("Invalid tree columns");
            
            var valueColumns = scope.$eval(attr.valueColumns);
            scope.valueColumns = valueColumns;
            
            var valueColumn = $yuccaHelpers.attrs.safe(attr.valueColumn, null);
            if(valueColumn==null &&  countingMode=='sum')
        		scope.debugMessages.push("To sum value you must enter a valid valueColum");

        	var filterMap = {};
        	
        	scope.$on('yucca-drilldowndataexplorer-event', function(e, event) {  
 		       console.log("yucca-drilldowndataexplorer-event fuori", event);  
 		       if(event.sourceId == scope.widgetId){
 		    	  event.data.datasetcode = datasetcode;
 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
 			      event.eventControlId = eventControlId;
 	        	  console.log("event",event);
 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
 		       }
        	});
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("treeee yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
		    	   if(!event.data.datasetcode || event.data.datasetcode == datasetcode){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data.value;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
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
		    		   else if(event.data.datasetcode == datasetcode && event.eventtype == "dataset.browse"){
		    			   scope.path = event.data.path; //
			    		   var path = event.data.path;
								 $rootScope.$broadcast ('yucca-widget-event-'+scope.widgetId, {"type":"browse", "path":path, "eventControlId":eventControlId});
								 }
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
       		
       		scope.path = [rootLabel]; 
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("drilldowndataexplorerchart:loadData", result);
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
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			//scope.drilldowndataexplorerData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, scope.treeColumns, valueColumn, countingMode);	
	    			scope.drilldowndataexplorerData = $yuccaHelpers.data.aggregationTreeDrill(rootLabel, allData, scope.treeColumns, valueColumns);
	    			scope.drilldowndataexplorerData = $yuccaHelpers.data.recursiveTree(scope.drilldowndataexplorerData,scope.treeColumns,valueColumns,scope.treeColumns.length);
	    			var tableData = new Array();
	    			for(var i = 0; i<scope.drilldowndataexplorerData.children.length;i++) {
	    				tableData.push(scope.drilldowndataexplorerData.children[i]);
	    			}
	    			scope.tableData = tableData;
	    			console.log("tree fuori", scope.drilldowndataexplorerData);

	    			  
	    			var colors = $yuccaHelpers.render.safeColors(scope.drilldowndataexplorerData.children.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			for (var i = 0; i < scope.drilldowndataexplorerData.children.length; i++) {
	    				scope.drilldowndataexplorerData.children[i].color = colors[i];
					}
	    			
	    	        console.log("chartData",scope.drilldowndataexplorerData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	var browseData = function(){
           		if(scope.drilldowndataexplorerData && scope.drilldowndataexplorerData!=null){
    				var childrens=scope.drilldowndataexplorerData.children;
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
    				/*for (var c = 0; c < childrens.length; c++) {
    					childrens[c].total = sumChildresValue(childrens[c].name, childrens[c]);
    				}*/
    				console.log("childrens", childrens);
    			}	
    			
    			scope.tableData = new Array();
    			for (var c = 0; c < childrens.length; c++) {
    				//childrens[c].total = $yuccaHelpers.render.safeNumber(childrens[c].total, decimalValue, scope.isEuroValue(),formatBigNumber);
					scope.tableData.push(childrens[c]);
				}
    			

    			
    			console.log("navigable tableData", scope.tableData);           	
    		};
        	
        	scope.drillUp = function(){
    			if(scope.path.length>1){
    				scope.path.pop();
    				browseData();
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.browse",  {"path":scope.path});
					event.eventControlId = eventControlId;
		        	$rootScope.$broadcast ('yucca-widget-event', event);
    			}
    		}
        	
        	scope.drillDown = function(key){
				scope.path.push(key);
				browseData();
				var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.browse",  {"path":scope.path});
				event.eventControlId = eventControlId;
	        	$rootScope.$broadcast ('yucca-widget-event', event);
    		}
        	
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
	/*$templateCache.put("template/dataset_treemap_chart.html",
		    '<div class="yucca-dataset-drilldowndataexplorer-chart" id="{{widgetId}}">\n' +
		    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
		    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
		    '    <div class="yucca-dataset-drilldowndataexplorer-chart-content">\n' +
		    '        <section>\n' +
		    '           <div ng-if="isLoading" class="yucca-dataset-drilldowndataexplorer-chart-loading" >\n' +
		    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
		    '           </div>\n' +
		    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
		    '             <p>{{infoMessage}}</p>\n' +
		    '           </div>\n' +
		    '        	<div ng-if="!isLoading" class="yucca-dataset-drilldowndataexplorer-chart-chart" >\n' +
		    '        		<div><treemap-chart data="treemapData" show_legend_="false" width="{{chartWidth}}" height="{{chartHeight}}" widgetId="{{widgetId}}"></treemap-chart>\n' +

		    '				</div>\n' +
		    '       	</div>\n' +
		    '        </section>\n' +
		    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
		    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
		    '        </section>\n' +
		    '    </div>\n' +
		    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
		    '</div>\n'
		    );*/
  /*$templateCache.put("template/dataset_drilldowndataexplorer_chart.html",
    '<div class="yucca-widget yucca-dataset-drilldowndataexplorer-chart" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-drilldowndataexplorer-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-drilldowndataexplorer-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-drilldowndataexplorer-chart-chart" >\n' +
    '        		<div>{{drilldowndataexplorerData}} </div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );*/
	
	$templateCache.put("template/dataset_drilldowndataexplorer_chart.html",
		    '<div class="yucca-widget yucca-dataset-drilldowndataexplorer-chart" id="{{widgetId}}">\n' +
		    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
		    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
		    '    <div class="yucca-dataset-drilldowndataexplorer-chart-content">\n' +
		    '        <section>\n' +
		    '         <div ng-if="isLoading" class="yucca-dataset-drilldowndataexplorer-chart-loading" >\n' +
		    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
		    '         </div>\n' +
		    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
		    '             <p>{{infoMessage}}</p>\n' +
		    '           </div>\n' +
		    '           <div class="yucca-dataset-dataexplorer-breadcrumbs" >' +
		    '              <span class="yucca-dataset-dataexplorer-breadcrumbs-item" ng-repeat="p in path track by $index">'+
		    '                 <span ng-if="!$last">{{p}} {{$last ? "": "&rarr;"}} </span><a ng-click="drillUp()" href ng-if="$last">{{p}}</a>'+
		    '              </span>'+
		    '           </div>\n' +
		    '			<table ng-if="!isLoading"  class="yucca-dataset-dataexplorer-table" ng-if="!isLoading">\n'+
		    '             <tbody>\n' +
		    '                   <th ng-repeat="element in treeColumns " class="yucca-dataset-dataexplorer-key-column">{{element}} </th>' +
		    '                   <th ng-repeat="valueElement in valueColumns " class="yucca-dataset-dataexplorer-value-column">{{valueElement.key}} </th>' +			    
		    '                 <tr ng-repeat="row in tableData " class="yucca-dataset-dataexplorer-table-row" style="{{row.highlight}}">\n' +
//		    '                   <td class="yucca-dataset-dataexplorer-key-column"><a href ng-click="drillDown(row.name)" ng-if="row.children">{{row.name}}</a><span ng-if="row.value">{{row.name}}</span></td>'+
		    '                   <td ng-repeat="element in treeColumns " class="yucca-dataset-dataexplorer-key-column"><a href ng-click="drillDown(row.name)" ng-if="row.children">{{row[element].substr(0,20)}} </a><span ng-if="row.children == null">{{row[element].substr(0,20)}} </span></td>' +
		    '                   <td ng-repeat="valueElement in valueColumns " class="yucca-dataset-dataexplorer-value-column"><a href ng-click="drillDown(row.name)" ng-if="row.children">{{row[valueElement.key]}} </a><span ng-if="row.children == null">{{row[valueElement.key]}} </span></td>' +		    
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetForcedirectedChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_forcedirected_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetForcedirectedChart';
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            
            $timeout(function(){
            	scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            	scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            	console.log("chartWidth",scope.chartWidth);
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-dataset-forcedirected-chart-chart" ));
            	console.log("width",chartContentElement[0].offsetWidth);
            	scope.forcedirectedWidth = chartContentElement[0].offsetWidth;
            	scope.forcedirectedHeight = scope.chartHeight;
            });
           
            scope.nodeTypes =  scope.$eval(attr.nodeTypes);
            scope.linkLine = $yuccaHelpers.attrs.safe(attr.linkLine, null);
            var relations = scope.$eval(attr.relations);
            
            //var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");

            //scope.columns = scope.$eval(attr.columns);
            //var render = scope.$eval(attr.render);

            //if(typeof scope.treeColumns != 'Array' )
        	//	scope.debugMessages.push("Invalid columns");
            
           // var valueColumn = $yuccaHelpers.attrs.safe(attr.valueColumn, null);
           // if(valueColumn==null &&  countingMode=='sum')
           //		scope.debugMessages.push("To sum value you must enter a valid valueColum");

        	var filterMap = {};
        	
//        	scope.$on('yucca-forcedirected-event', function(e, event) {  
// 		       console.log("yucca-forcedirected-event fuori", event);  
// 		       if(event.sourceId == scope.widgetId){
// 		    	  event.data.datasetcode = datasetcode;
// 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
// 	        	  console.log("event",event);
// 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
// 		       }
//        	});
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);

       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
		    	   if(!event.data.datasetcode || event.data.datasetcode == datasetcode){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data.value;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
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
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("forcedirectedchart:loadData", result);
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
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			var colors = $yuccaHelpers.render.safeColors(relations.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			
	    			//scope.forcedirectedData = $yuccaHelpers.data.aggregationNodesLinks(allData, scope.columns, valueColumn, countingMode, render, mainChartColor,colors);
	    			scope.forcedirectedLinks = $yuccaHelpers.data.aggregationForcedirected(allData, relations, colors);
	    			
	    			console.log("forcedirected fuori", scope.forcedirectedLinks);

	    			  
//	    			for (var i = 0; i < scope.forcedirectedLinks.children.length; i++) {
//	    				scope.forcedirectedLinks.children[i].color = colors[i];
//					}
	    			
	    	        console.log("chartData",scope.forcedirectedLinks);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_forcedirected_chart.html",
    '<div class="yucca-widget yucca-dataset-forcedirected-chart" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-forcedirected-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-forcedirected-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-forcedirected-chart-chart" >\n' +
    '        	    <forcedirected-chart links="forcedirectedLinks" node_types={{nodeTypes}} width="{{chartWidth}}" link_line="{{linkLine}}" height="{{chartHeight}}"  widgetId="{{widgetId}}" />' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetFunnelChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_funnel_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetFunnelChart';
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
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
			var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
			
			var showValues =  $yuccaHelpers.attrs.safe(attr.showValues, false);
			scope.mouth =  $yuccaHelpers.attrs.safe(attr.mouth, false);
			

            scope.isEuroValue = function(){
            	return euroValue == "true";
            };

			
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	if(! scope.chartWidth)
            		 scope.chartWidth = elem[0].offsetWidth;
        		if(scope.chartWidth<1)
        			scope.chartWidth = 300;
            	if(!scope.chartHeight){
            		scope.chartHeight= elem[0].offsetHeight;
            		if(scope.chartHeight<1)
            			scope.chartHeight = 300;
            		

            	} 
            	//scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");

            
        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		var legend = {margin: legendAttr.position};
        	}

			scope.chartData = new Array();
			scope.colors  = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
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
				}
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
	    			var sliceCount=0;
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData,apiDataUrl,cache).then( function(result) {
	                  console.info("funnelchart:loadData", result);
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
        	
        	var prepareData = function(){
    			console.log("prepareData", odataResult);

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			scope.chartData = $yuccaHelpers.data.aggregationKeyValue(allData, valueColumn, groupByColumn.key, scope.$eval(attr.chartColors),attr.mainChartColor);
							for(var i=0; i<scope.chartData.length; i++){
								if(showValues){
									scope.chartData[i].label = scope.chartData[i].label + " - " + $yuccaHelpers.render.safeNumber(scope.chartData[i].value, decimalValue, scope.isEuroValue(),formatBigNumber);
								}
							}

					scope.chartData = scope.chartData.sort(function(a,b) {
						return a.value < b.value ? 1 : a.value > b.value ? -1 : 0;
					});
					console.log("funnel chartData",scope.chartData);
					scope.colors = $yuccaHelpers.render.safeColors(scope.chartData.length, chartColors,mainChartColor,.3);
					console.log("funnel colors ",scope.colors);

	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareKeyValue(groupByColumn.label, valueColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
							console.log("funnel chartData",scope.chartData);
							for(var i=0; i<scope.chartData.length; i++){
								if(showValues){
									scope.chartData[i].label = scope.chartData[i].label + " " + $yuccaHelpers.render.safeNumber(scope.chartData[i].value, decimalValue, scope.isEuroValue(),formatBigNumber);
								}
							}
							scope.colors = $yuccaHelpers.render.safeColors(scope.chartData.length, chartColors,mainChartColor,.3);
							console.log("funnel colors ",scope.colors);

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
			/*
				scope.chartData  =  [{"label":"Leads","value":"70"},
				{"label":"Phone Calls","value":"61"},
				{"label":"Pitches","value":"46"},
				{"label":"Negotiations","value":"29"},
				{"label":"Final Closure","value":"15"}
			];
			*/


			console.log("scope.colors", scope.colors);
			console.log("attrs", attr);

        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_funnel_chart.html",
    '<div class="yucca-widget yucca-dataset-funnel-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-funnel-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><funnel-chart data="chartData" colors="colors" mouth="mouth" width="{{chartWidth}}" height="{{chartHeight}}"></funnel-chart></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetHeatmapMapChart', ['metadataService','dataService', '$yuccaHelpers', '$http', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_heatmap_map_chart.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaControlMapChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


			var colors = new Array();

            
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
          
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            var areaColor = $yuccaHelpers.attrs.safe(attr.areaColor, "#cccccc");
            var highlightColor = $yuccaHelpers.attrs.safe(attr.highlightColor, "#ffffff");
            
            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            var width = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            var height = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            
            var gradient = scope.$eval(attr.gradient);
            if(!gradient){
            	gradient = {0.4: 'blue',0.6: 'cyan',0.7: 'lime',0.8: 'yellow',1.0: 'red'}
            }
            
            
            var radius = $yuccaHelpers.attrs.num(attr.radius, null, null, 8);
            var blur = $yuccaHelpers.attrs.num(attr.blur, null, null, 15);
            
        	scope.legend = scope.$eval(attr.mapLegend);
        	if(!scope.legend){
        		scope.	legend = {show: false}
        	}
        	else{
        		//background-image: linear-gradient(to top, blue 40%, cyan 60%, lime 70%, yellow 80%, red 100%);
        		var orderedKeys = Object.keys(gradient).sort(function(a, b){return parseFloat(a) - parseFloat(b);});
        		console.log("orderedGradient k", orderedKeys);
        		scope.legendStyle = 'background-image: linear-gradient(to top, ';
        		for(var i=0;i<orderedKeys.length; i++){
        			var percent = parseFloat(orderedKeys[i])*100;
        		    scope.legendStyle += gradient[orderedKeys[i]] + " " + percent + "%,"; 
        		}
        		scope.legendStyle = scope.legendStyle.replace(/.$/,")");
        	}

            
            
			var svg,canvas, context, mapLayer, svgOverlay, mapOverlay;

            $timeout(function(){
            	//var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId));
            	//console.log("YuccaControlMapChart",chartContentElement)
            	console.log("elem",elem)
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));

            	if(!width)
            		width = chartContentElement[0].offsetWidth; //elem[0].offsetWidth;
//            	if(!height){
//            		height= elem[0].offsetHeight;
//            		if(height<1)
//            			height = 300;
//            	} 
            	var canvasLayer = d3.select('#' + scope.widgetId+ ' canvas').attr('id', 'heatmap').attr('width', width).attr('height', height);
            	canvas = canvasLayer.node(),
                context = canvas.getContext("2d");
//            	canvas.onmousemove = function(e) {
//            		console.log("canvas", e);
//            	};
            	
    			svg = d3.select('#' + scope.widgetId+ ' svg#mapLayer').attr('width', width).attr('height', height).on("click", stopped, true);
    			//var g = svg.append('g');
    			mapLayer = svg.append('g').classed('map-layer', true);
    			
    			svgOverlay = d3.select('#' + scope.widgetId+ ' svg#mapOverlay').attr('width', width).attr('height', height).on("click", stopped, true);
    			mapOverlay = svgOverlay.append('g').classed('map-overlay', true);
    			
    			//svg.call(zoom).call(zoom.event);
    			loadGeojson();
    			//loadData();
            });
            
            var valueColumn = scope.$eval(attr.valueColumn);
            var labelColumn = scope.$eval(attr.labelColumn);

            var latColumn = $yuccaHelpers.attrs.safe(attr.latColumn,'lat');
            var lngColumn = $yuccaHelpers.attrs.safe(attr.lngColumn,'lng');

            var borderColor =  $yuccaHelpers.attrs.safe(attr.borderColor, "#fff");
            scope.controlMapMapId = "controlMap"+new Date().getTime();

            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            var geoprojection = $yuccaHelpers.attrs.safe(attr.geoprojection, "mercator");
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	g = $yuccaHelpers.geo.initGeojson(g);
            	
			}
            var geojson_data = null;
            
            

            
            scope.geojson= null;
            var mapLatLngs = null;
			scope.isLoading = true;

			var activeGeojson = 0;

			var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		  if(event.eventtype == 'dataset.change.value_column'){
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
//	    		   else if(event.eventtype == 'dataset.highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetHeatmapMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//			    				 layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
//	    					   }
//	    				   });
//	    			   });
//	    		   }
//	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
//	    			   leafletData.getMap(scope.datasetHeatmapMapMapId).then(function(map) {
//	    				   map.eachLayer(function(layer){
//	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
//	    			               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
//	    			            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
//	    					   }
//	    				   });
//	    			   });
//	    		   }		    	   
		       }
		       
       		});

			var maxValue = null;
			var minValue = null;
			scope.geojson= null;
			var mapLatLngs = null;
			scope.tableData = [];
			scope.isLoading = true;
   
   

			var zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 8]).on("zoom", zoomed);
			var zoomedScale = 1
			function zoomed() {
			  console.log("zoomed", d3.event.scale);
			  zoomedScale = d3.event.scale;
			  g.style("stroke-width", 1.5 / d3.event.scale + "px");
			  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}
			
			function stopped() {
				if (d3.event.defaultPrevented) d3.event.stopPropagation();
			}
			
			var projectionScale, projectionCenter, projectionTranslate;

			var loadGeojson = function(){
				d3.json(geojsons[activeGeojson].url, function(error, mapData) {
					
					var geofit = $yuccaHelpers.geo.fitGeojson(mapData, width, height, geoprojection);

					d3.select('#' + scope.widgetId+ ' canvas').attr('height', geofit.height);
	    			svg.attr('height', geofit.height);
	    			svgOverlay.attr('height', geofit.height);
					height = geofit.height;
	            	scope.width = width;
	            	scope.height = height;
					console.log("geofit", geofit);
					var path = geofit.path;
					projectionScale = geofit.projectionScale;
					projectionCenter = geofit.projectionCenter;
					projectionTranslate = geofit.projectionTranslate;

					// Update color scale domain based on data
					console.log("data[0]",data);
					mapLayer.selectAll('path')
					.data(mapData.features)
					.enter().append('path')
					.attr('d', path)
					.attr('vector-effect', 'non-scaling-stroke')
					.style('fill', areaColor)
					.style('stroke', borderColor);
					//.on('mouseover', highlightFeature)
					//.on('mouseout', resetHighlight)
					//.on('click', onAreaClick);
					//.on('dblclick', onAreaDblclick);
					
					mapOverlay.selectAll('path')
					.data(mapData.features)
					.enter().append('path')
					.attr('d', path)
					.attr('vector-effect', 'non-scaling-stroke')
					//.style('fill', "#ff0000")
					.style('stroke', highlightColor)
					.style('fill-opacity',0)
					.style('stroke-opacity', 0)
					.on('mouseover', highlightFeature)
					.on('mouseout', resetHighlight)
					.on('click', onAreaClick);



					//mapLayer.append("rect").attr('width', width).attr('height', height);
					// Draw each province as a path
					loadData()
					scope.isLoading = false;
				});
			};
			
			

			scope.info = {"show": false};
			scope.updateInfo = function(show, content){
				$timeout(function(){
					scope.info.show= show;
					scope.info.content = content;
				},100);
			}

			
//			var highlightBubble = function(d) {
//				d.attr("fill-opacity","0.4");
//				var label = d.attr("label");
//				var value = $yuccaHelpers.render.safeNumber(d.attr("value"), decimalValue, scope.isEuroValue(),formatBigNumber);
//				scope.updateInfo(true, label + ": " + value);
//			};
//			
//			var resetHighlightBubble = function(d) {
//				d.attr("fill-opacity","0.2");
//				scope.updateInfo(false, "");
//			};

			var highlightFeature = function(d) {
				var color = $yuccaHelpers.d3color.darker(areaColor, 0.3);
				d3.select(this).style('stroke-opacity', 1);
				scope.updateInfo(true, d.properties[geojsons[activeGeojson].key]);
          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", 
          				{"key": d.properties[geojsons[activeGeojson].key], "color" :color}, eventControlId);
	        	$rootScope.$broadcast ('yucca-widget-event', event);				
			};

			var resetHighlight = function(d) {
				scope.updateInfo(false, "");
				if(d){
					//mapLayer.selectAll('path').style('fill', areaColor);
					mapOverlay.selectAll('path').style('stroke-opacity', 0);
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", 
							{"key": d.properties[geojsons[activeGeojson].key]}, eventControlId);
					$rootScope.$broadcast ('yucca-widget-event', event);					
				}
			};
             
             scope.filter = {};
             var currentSelected = null;
             function onAreaClick(d){
             	console.log("onAreaClick", d);
            	console.log("groupByColumn", groupByColumn);
            	
            	if(currentSelected!=null){
            		 currentSelected.properties.selected = false;
            	}
            	d.properties.selected = !d.properties.selected;
            	currentSelected = d;
            	if($yuccaHelpers.utils.isTouchDevice)
            		highlightFeature(d);
            	else
            		resetHighlight();

          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", {"column": groupByColumn.key, "value" :d.properties[geojsons[activeGeojson].key]}, eventControlId);
				event.eventControlId = eventControlId;
         		$rootScope.$broadcast ('yucca-widget-event', event); 
			 }
             
             var active = d3.select(null);
             
             function onAreaDblclick(d){
            	 if (active.node() === this) return reset();
            	  active.classed("active", false);
            	  active = d3.select(this).classed("active", true);

            	  var bounds = path.bounds(d),
            	      dx = bounds[1][0] - bounds[0][0],
            	      dy = bounds[1][1] - bounds[0][1],
            	      x = (bounds[0][0] + bounds[1][0]) / 2,
            	      y = (bounds[0][1] + bounds[1][1]) / 2,
            	      scale = Math.max(1, Math.min(8, 0.85 / Math.max(dx / width, dy / height))),
            	      translate = [width / 2 - scale * x, height / 2 - scale * y];

            	  svg.transition()
            	      .duration(750)
            	      .call(zoom.translate(translate).scale(scale).event);
             }
             
             function reset() {
            	  active.classed("active", false);
            	  active = d3.select(null);

            	  svg.transition()
            	      .duration(750)
            	      .call(zoom.translate([0, 0]).scale(1).event);
            	}


			 var odataResult = null;
			 var columnDataTypeMap = {};
			 var loadData = function(){
				console.log("map - loadData", datasetcode);
				scope.isLoading = true;
				odataResult = null;
				dataService.getDataEntities(datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
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
						console.info("heatmapMapChart:loadData", result);
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

			var data = new Array();
			
			//var minValue, maxValue;
			var prepareData  = function(){
				//var dataMap = {};
				data = new Array();

				console.log("prepareData", odataResult);
				//var sliceCount=0;
	
				if(odataResult != null){
					scope.isLoading = true;
					for(var i=0; i<odataResult.length; i++){
						for(var j=0;j<odataResult[i].data.d.results.length; j++){
							data.push(odataResult[i].data.d.results[j]);
							if(!minValue){
								minValue = odataResult[i].data.d.results[j][valueColumn.key];
								maxValue = odataResult[i].data.d.results[j][valueColumn.key];
							}
							else{
								if(minValue>odataResult[i].data.d.results[j][valueColumn.key])
									minValue = odataResult[i].data.d.results[j][valueColumn.key];
								if(maxValue<odataResult[i].data.d.results[j][valueColumn.key])
									maxValue = odataResult[i].data.d.results[j][valueColumn.key];
							}
								
						}
					}
					console.log("discrete mapData",data);

					
					mapLayer.selectAll('rect').remove();

					console.log("data",data)
					if(data.length>0){
						var heatData = new Array();
						for(var j=0; j<data.length; j++){
						  var d = data[j];
						  //console.debug("d", d);
						  
						  var coordinates = $yuccaHelpers.geo.pointProjection([d[lngColumn],d[latColumn]],projectionScale, projectionCenter, projectionTranslate,geoprojection);
						  mapLayer.append('svg:rect')
						  .attr('x', coordinates[0])
						  .attr('y', coordinates[1])
						  .attr('width', 1)
						  .attr('height', 1)
						  .attr('stroke', mainChartColor)
						  .attr("stroke-width",0)
						  .attr("fill",mainChartColor)
						  .attr("fill-opacity","1")
						  .attr("value", d[valueColumn.key])
						  .attr("label", labelColumn?d[labelColumn.key]:"")
						  .attr("vector-effect","non-scaling-stroke");
						  //.on('mouseover', function(){highlightBubble(d3.select(this));})
						  //.on('mouseout', function(){resetHighlightBubble(d3.select(this));});	
						  
						  heatData.push([coordinates[0], coordinates[1], parseInt(d[valueColumn.key])])
						}
						
						
						console.log("heatData", heatData);
						var rUnit = width/500;
						radius = parseInt(radius*rUnit);	
						var heat = simpleheat(canvas);
						
						if(gradient)
							heat.gradient(gradient);
						heat.data(heatData);
						heat.radius(radius, blur);
						heat.max(maxValue);
						heat.draw(0.05);
						scope.maxValue = $yuccaHelpers.render.safeNumber(maxValue, decimalValue, scope.isEuroValue(),formatBigNumber);
						console.log("scope.maxValue", maxValue);

					}
					console.log("colors", colors);

						scope.isLoading = false;
				}
				  
				  scope.isLoading = false;
			}
	
			//loadGeojson();

			//loadData();


             console.log("attrs", attr);
             scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);


yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_heatmap_map_chart.html",
    '<div class="yucca-widget  yucca-heatmap-map-chart" id="{{widgetId}}" >\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div class="heatmap-container" style="width: {{width}}px;height: {{height}}px;">' +	
    '               <div class="heatmap-legend" ng-if="legend.show && !isLoading" style="top:{{legend.position.top}}px;left:{{legend.position.left}}px;bottom:{{legend.position.bottom}}px;right:{{legend.position.right}}px ">'+
    '                   <div class="heatmap-legend-values">' +
    '                     <div class="heatmap-legend-max">{{maxValue}}</div>' +
    '                     <div class="heatmap-legend-min">0</div>' +
    '                   </div> ' +
    '                   <div class="heatmap-legend-bar" style="{{legendStyle}}"></div>' +
    '               </div> ' +
    '           	<svg id="mapLayer" ng-show="!isLoading" preserveAspectRatio="xMinYMin meet"></svg>\n' + 
    '           	<canvas ng-show="!isLoading"></canvas>\n' + 
    '           	<svg id="mapOverlay" ng-show="!isLoading" preserveAspectRatio="xMinYMin meet"></svg>\n' + 
    '           </div>\n' +
    '           <div class="info-panel" ng-show="info.show"><span>{{info.content}}</span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetHorizontalmultibarChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_horizontalmultibar_chart.html',
        link: function(scope, elem, attr) {
        	console.debug("elem", elem);

            var widgetType = 'YuccaBasicDatasetHorizontalmultibarChart';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl-" + scope.widgetId);


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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
            
            var serieColumns = scope.$eval(attr.serieColumns);
            var serieFromColums =  serieColumns!=null;
            console.log("serieColumns",serieColumns);
            
            var valueColumn =scope.$eval(attr.valueColumn);
            if(!serieFromColums && valueColumn==null)
        		scope.debugMessages.push("Insert valueColumn");

            var valueColumns = scope.$eval(attr.valueColumns);


            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            
            var valuesSide = scope.$eval(valuesSide);
            
            
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: ""};

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
    		
        	scope.options = {
    			chart: {
    				type: 'multiBarHorizontalChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){return d.label;},
	                y: function(d){return d.value;},
	                valueFormat: function(d){
	                	return $yuccaHelpers.render.safeNumber(d<0?-1*d:d, decimalValue, scope.isEuroValue(),formatBigNumber);
	                },	         
	                showValues: attr.showValues==="false"?false:true,
	                reduceXTicks: attr.reduceXTicks == "true",
	                multibar: {
	        			dispatch: {
	        				//chartClick: function(e) {console.log("! chart Click !")},
	        				//elementClick: function(e) {},
	        				//elementDblClick: function(e) {console.log("! element Double Click !")},
	        				elementMouseout: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				},
	        				elementMouseover: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				}
	        			}
	        		}
    			},
	        };
			if(attr.stacked == 'true')
				scope.options.chart.stacked = true;
			
			
			if(!yAxisAttr.hide){
				scope.options.chart.showXAxis=true;
				scope.options.chart.xAxis = {
	            	//tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
	    			axisLabel:yAxisAttr.label?yAxisAttr.label:"",
	    			staggerLabels: yAxisAttr.staggerLabels?true:false
				};
			}
			else
				scope.options.chart.showXAxis=false;

			if(!xAxisAttr.hide){
				scope.options.chart.showYAxis=true;
				scope.options.chart.yAxis = {
					tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d<0?-1*d:d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
	            	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
		            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
					staggerLabels: xAxisAttr.staggerLabels?true:false
				};
			}
			else
				scope.options.chart.showYAxis=false;

			
        	// range 0->1
        	console.log("yAxisAttr", yAxisAttr.hide);
        	console.log("scope.options",scope.options);

        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		
        		//var legend = {margin:{top: legendAttr.position.top,right: legend.position.right,bottom: legend.position.bottom,left: legend.position.left}};
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.debug("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		   if(event.eventtype == 'dataset.change.group_by_column'){
	    			   groupByColumn = event.data;
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   prepareData();
	    			   
	    		   }
//	    		   else if(event.eventtype == 'dataset.change.value_column' && valueColumn && valueColumn.key){
//	    			   valueColumn.key = event.data.key;
//	    			   valueColumn.label = event.data.label;
//	    			   if(groupedQuery)	
//	    				   loadDataGrouped();
//	    			   else
//	    				   prepareData();
//	    		   }
	    		   else if(event.eventtype == 'dataset.filter.text'){
	    			   filterMap[event.sourceId] = event.data;
	    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
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
		    	   
		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("horizontalmultibarchart:loadData", result);
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
    			//var dataMap = {};
    			console.log("prepareData", odataResult);
    			//var sliceCount=0;

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			if(serieFromColums){
	    				var chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, serieColumns, groupByColumn.key, chartColors,attr.mainChartColor);
	    				
						for (var j = 0; j< chartData.length; j++) {
							if(chartData[j].side && chartData[j].side=='L'){
								for (var m = 0; m < chartData[j].values.length; m++) {
									chartData[j].values[m].value *= -1;
								}
							}
						}
	    				
	    				
	    				
//	    				for (var i = 0; i < serieColumns.length; i++) {
//	    					var serieKey = serieColumns[i].key;
//	    					if(serieColumns[i].side && serieColumns[i].side=='L'){
//	    						for (var j = 0; j< chartData.length; j++) {
//	    							if(chartData[j].realKey==serieKey){
//	    								for (var m = 0; m < chartData[j].values; m++) {
//	    									chartData[j].values[m] *= -1;
//	    								}
//	    								break;
//	    							}
//	    						}
//	    						
//	    					}
//	    				}
	    				
	    				scope.chartData = chartData;
	    			}
	    			else{
	    				var chartData = $yuccaHelpers.data.aggregationValuesValueKey(allData,valueColumns, valueColumn, groupByColumn, chartColors,attr.mainChartColor);
	    				for (var j = 0; j< chartData.length; j++) {
	    					console.log("chartData", chartData[j]);
	    					if(chartData[j].side && chartData[j].side=='L'){
								for (var m = 0; m < chartData[j].values.length; m++) {
									chartData[j].values[m].value *= -1;
								}
							}
						}
	    				scope.chartData = chartData;
	    			}
	    			
	    	        console.log("horizontalmultibar chartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesKeyValue(groupByColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
			    			console.log("horizontalmultibar chartData",scope.chartData);
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
  $templateCache.put("template/dataset_horizontalmultibar_chart.html",
    '<div class="yucca-widget yucca-dataset-horizontalmultibar-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-horizontalmultibar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetLineChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_line_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetLineChart';
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
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  timeColumn= scope.$eval(attr.timeColumn);
            if(timeColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var serieColumns = scope.$eval(attr.serieColumns);
            if(serieColumns==null)
        		scope.debugMessages.push("Insert serieColumns");
            console.log("linechart - serieColumns", serieColumns);
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: ""};

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
    		
            //var serieStyles = scope.$eval(attr.serieStyles);

        	scope.options = {
    			chart: {
    				type: 'lineChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){ return d.x; },
	                y: function(d){ return d.y; },
	                useInteractiveGuideline: true,
	                valueFormat: function(d){return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);},
	                showValues: attr.showValues==="false"?false:true,
	                yAxis:{
	                	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
    	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
    	    			axisLabel:yAxisAttr.label?yAxisAttr.label:"",
    	    			staggerLabels: yAxisAttr.staggerLabels?true:false
					},
	                xAxis:{
	                	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
	    	            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
	    				staggerLabels: xAxisAttr.staggerLabels?true:false

	                			
					},
					showXAxis:!xAxisAttr.hide,
	    	        showYAxis:!yAxisAttr.hide,
	    	    	reduceXTicks: attr.reduceXTicks == "true",
	     
	            }
	        };
        	// range 0->1

        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		
        		//var legend = {margin:{top: legendAttr.position.top,right: legend.position.right,bottom: legend.position.bottom,left: legend.position.left}};
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		   if(event.eventtype == 'dataset.change.group_by_column'){
	    			   timeColumn = event.data;
	    			   if(groupedQuery)	
	    				   loadDataGrouped();
	    			   else
	    				   prepareData();
	    		   }

//		    		   else if(event.eventtype == 'dataset.browse'){
//		    			   console.log("dataset.browse", event.data);
//		    			   filterMap = $yuccaHelpers.event.clearArrayTextFilter(filterMap, event.sourceId);
//
//		    			   if(event.data.browseHistory){
//			    			   for (var i = 0; i < event.data.browseHistory.length; i++) {
//			    				   event.data.browseHistory[i].advanced = 'eq';
//				    			   filterMap[event.sourceId+i] = event.data.browseHistory[i];
//		    				   }
//		    			   }
//		    			   filterMap[event.sourceId] = event.data;
//		    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
//		    			   loadData();
//		    		   }
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
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("linechart:loadData", result);
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
    			
  	          	scope.chartData = new Array();
  	          	
    			var allData = new Array();

	    		if(odataResult != null){

	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			
	    			var colors = $yuccaHelpers.render.safeColors(serieColumns.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			console.log("colors", colors);

	    			
	    			scope.isLoading = true;
	    			// [key: "serie 1", values: [{x:1, y:1, series:1}]...
	    			//TODO Optimize
//	    			for (var s = 0; s < serieColumns.length; s++) {
//	        			var dataMap = {};
//
//	    				var serie = angular.copy(serieColumns[s])//{key:serieColumns[s].key, values: new Array()};
//	    				serie.values = new Array();
//		        		if(colors.length>0 && typeof serie.color == 'undefined'){
//		        			serie.color = colors[s];
//		        		}
//		    			
//		    			for(var i=0; i<odataResult.length; i++){
//							for(var j=0; j<odataResult[i].data.d.results.length; j++){
//								if(!dataMap[odataResult[i].data.d.results[j][timeColumn.key]] ){
//									dataMap[odataResult[i].data.d.results[j][timeColumn.key]]  = 0;
//								}
//								if(serieColumns[s].countingMode=='sum')
//									dataMap[odataResult[i].data.d.results[j][timeColumn.key]] += odataResult[i].data.d.results[j][serieColumns[s].key];
//								else
//									dataMap[odataResult[i].data.d.results[j][timeColumn.key]]++;
//								
//							}
//			    	        var sIndex = 0;
//			    	        console.log("linechart dataMap",timeColumn);
//
//					        for (var key in dataMap) {
//					        	if (dataMap.hasOwnProperty(key)) {
//					        		console.log("s",d);
//					        		var d = {"x": parseInt(key), "y": dataMap[key]};
//					        			
//					        	   // if(colors.length>0)
//					        	   // 	d.color=colors[sIndex];
//					        	    serie.values.push(d);
//					        	    sIndex++;
//					        	}
//					        } 
//					        
//					        console.log("linechart serie",serie);
//		    			}
//		    			serie.key = serie.label;
//		    			scope.chartData.push(serie);
//	    			}
	    			scope.chartData = $yuccaHelpers.data.aggregationSeriesXY(allData, timeColumn, serieColumns, colors);

		    			  
	    	         // scope.chartData = [{"key":"first", "values":new Array()}];
	    
	    	        console.log("chartData line",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};

        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesXY(timeColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
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
  $templateCache.put("template/dataset_line_chart.html",
    '<div class="yucca-widget yucca-dataset-line-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-line-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetMultiChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';
    

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_multi_chart.html',
        link: function(scope, elem, attr) {
        	console.debug("elemmulti", elem);

            var widgetType = 'YuccaBasicMultiChart';
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
            
//            var euroValueX = $yuccaHelpers.attrs.safe(attr.euroValueX, false);
//            var decimalValueX = $yuccaHelpers.attrs.safe(attr.decimalValueX, 2);
//            var formatBigNumberX = $yuccaHelpers.attrs.safe(attr.formatBigNumberX, false);
//            scope.isEuroValueX = function(){
//            	return euroValueX == "true";
//            };
//            var euroValueY = $yuccaHelpers.attrs.safe(attr.euroValueY, false);
//            var decimalValueY = $yuccaHelpers.attrs.safe(attr.decimalValueY, 2);
//            var formatBigNumberY = $yuccaHelpers.attrs.safe(attr.formatBigNumberY, false);
//            scope.isEuroValueY = function(){
//            	return euroValueY == "true";
//            };
//
//            var euroValueY2 = $yuccaHelpers.attrs.safe(attr.euroValueY2, false);
//            var decimalValueY2 = $yuccaHelpers.attrs.safe(attr.decimalValueY2, 2);
//            var formatBigNumberY2 = $yuccaHelpers.attrs.safe(attr.formatBigNumberY2, false);
//            scope.isEuroValueY2 = function(){
//            	return euroValueY2 == "true";
//            };

            
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var groupByDatetime = $yuccaHelpers.attrs.safe(attr.groupByDatetime, false);
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {show:false, label: ""};

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {show:false, label: ""};

            var yAxisAttr2 = scope.$eval(attr.y2Axis);
            if(typeof yAxisAttr2 == 'undefined')
            	yAxisAttr2 = {show:false, label: ""};

            var serieStyles = scope.$eval(attr.serieStyles);
            
            console.log("serieStyles",serieStyles);
            
            var serieColumns = scope.$eval(attr.serieColumns);
            if(serieColumns==null)
        		scope.debugMessages.push("Insert serieColumns");
            
            console.log("serieColumns",serieColumns);
            
            scope.options = {
                    chart: {
                        type: 'multiChart',
                        duration: 500,
    	                valueFormat: function(d){
    	                	return  d;//$yuccaHelpers.render.safeNumber(d, decimalValueY, scope.isEuroValueY(),formatBigNumberY);
    	                },
    	                //line1:{padData:true},
    	                yAxis1:{
    	                	tickFormat:(function (d) {
	    	            		return $yuccaHelpers.render.safeNumber(d, 
	    	            				yAxisAttr.decimal_value, 
	    	            				yAxisAttr.is_euro_value,
	    	            				yAxisAttr.format_big_number);
    	                		}),
        	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
        	    			axisLabel:yAxisAttr.label?yAxisAttr.label:"",
        	    			staggerLabels: yAxisAttr.staggerLabels?true:false
    					},
    	                xAxis:{
    	                	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
    	    	            rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
    	    				staggerLabels: xAxisAttr.staggerLabels?true:false,
    	    	            tickFormat:(function (d) {
    	    	            	if(groupByDatetime)
    	    	            		return $yuccaHelpers.utils.formatDate(d);
    	    	            	else
    	    	            		return $yuccaHelpers.render.safeNumber(d, 
    	    	            				xAxisAttr.decimal_value, 
    	    	            				xAxisAttr.is_euro_value,
    	    	            				xAxisAttr.format_big_number);
    	    	            }),
    					},
    	                yAxis2:{
    	                	tickFormat:(function (d) {
	    	            		return $yuccaHelpers.render.safeNumber(d, 
	    	            				yAxisAttr2.decimal_value, 
	    	            				yAxisAttr2.is_euro_value,
	    	            				yAxisAttr2.format_big_number);

    	                	}),
    						axisLabel:yAxisAttr.label?yAxisAttr.label:""
    					},
    	    	        //reduceXTicks: attr.reduceXTicks == "true",

                    }
                };
          
            


            // fix right margin 
            $timeout(function(){
    			var maxLabel = "";
    			if(scope.chartData && scope.chartData.length>0){
    				for (var j = 0; j < scope.chartData.length; j++) {
    					if(scope.chartData[j].yAxis == "2"){
    						for(var i=0; i<scope.chartData[j].values.length; i++){
    							var label = $yuccaHelpers.render.safeNumber(scope.chartData[j].values[i].y, 
    									yAxisAttr2.decimal_value, 
	    	            				yAxisAttr2.is_euro_value,
	    	            				yAxisAttr2.format_big_number);
    							if(label.length>maxLabel.length)
    								maxLabel = label;
    						}
    						
    					}
    				}
    				var fakeText = d3.select("#"+ scope.widgetId + "-fake").insert("svg").append("text").text(maxLabel);
    				if(!scope.options.chart.margin)
    					scope.options.chart.margin = {};
    				scope.options.chart.margin.right = fakeText.node().getComputedTextLength()+6;
    				console.log("maxLabel",maxLabel, fakeText.node().getComputedTextLength());
    				d3.select("#"+ scope.widgetId + "-fake svg").remove();
    			}

            	
            	
            	scope.options.chart.margin={right: 100}});
            
            
        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){        		
        		//var legend = {margin:{top: legendAttr.position.top,right: legend.position.right,bottom: legend.position.bottom,left: legend.position.left}};
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
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
		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null,apiDataUrl,cache).then(function(firstData){
        			console.log("loadData multichart", firstData);
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
		                console.info("multichart:loadData", result);
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
    			//var dataMap = {};
    			console.log("prepareData", odataResult);
    			//var sliceCount=0;

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			
	    			console.log("allData multichart",allData);
	    				
	    			//scope.chartData = $yuccaHelpers.data.multiChartSeriesKeyValue(allData, serieStyles, serieColumns,groupByColumn.key);
	    			//var colors = $yuccaHelpers.render.safeColors(serieColumns.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			scope.chartData = $yuccaHelpers.data.aggregationSeriesXY(allData, groupByColumn, serieColumns, chartColors, groupByDatetime);

	    	        console.log("multi chartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesXY(groupByColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};

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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
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
  $templateCache.put("template/dataset_multi_chart.html",
    '<div class="yucca-widget yucca-dataset-discretebar-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '           <div id="{{widgetId}}-fake" class="nvd3"></div>' + 
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetMultibarChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';
    

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_multibar_chart.html',
        link: function(scope, elem, attr) {
        	console.debug("elemmulti", elem);

            var widgetType = 'YuccaBasicMultibarChart';
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            
            var chartType = attr.chartDirection=='horizontal'?'multiBarHorizontalChart':'multiBarChart';
            


            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
			
			var seriesDescriptionColumn = scope.$eval(attr.seriesDescriptionColumn);

            //var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var xAxisAttr = scope.$eval(attr.axis);
            if(typeof xAxisAttr == 'undefined')
            	xAxisAttr = {hide:false, label: "", };
            
            console.log("xAxisAttr",xAxisAttr);

            var yAxisAttr = scope.$eval(attr.yAxis);
            if(typeof yAxisAttr == 'undefined')
            	yAxisAttr = {hide:false, label: ""};
            
//            var serieStyles = scope.$eval(attr.serieStyles);
//            
//            console.log("serieStyles",serieStyles);
//            
            var serieColumns = scope.$eval(attr.serieColumns);
            if(serieColumns==null)
        		scope.debugMessages.push("Insert serieColumns");
            //var groupBySeries =  attr.groupBySeries==="true"?true:false;
            var seriesFromValues =  attr.seriesFromValues==="true"?true:false;
            
            console.log("serieColumns",serieColumns);
            var tooltipGenerator = function (d) {
                var tooltipTitle = d.data.description?d.data.description:d.value ;
                var tooltip = "";

                tooltip += "<table>";
                tooltip += "<thead>";
                tooltip += "<tr><td colspan='3'><strong class='x-value'>" + tooltipTitle + "</strong></td></tr>";
                tooltip += "</thead>";
                tooltip += "<tbody>";
                
                var textAfter = "";
                var isEuro = scope.isEuroValue();
                var decimal = decimalValue;
                var bigNumber = formatBigNumber;
                if(!seriesFromValues && serieColumns[d.index]){
                	console.log("serieColumns[d.index]", serieColumns[d.index]);
                	if(serieColumns[d.index].text_after)
                		textAfter = " " + serieColumns[d.index].text_after + " ";
                	if(serieColumns[d.index].euro_value)
                		isEuro = serieColumns[d.index].euro_value;
                	if(serieColumns[d.index].decimal_value)
                		decimal = serieColumns[d.index].decimal_value;
                	if(serieColumns[d.index].format_big_number)
                		bigNumber = serieColumns[d.index].format_big_number;
                	console.log("isEuro", isEuro);
                	console.log("decimal", decimal);
                	console.log("bigNumber", bigNumber);
                }
                
                for(var i in d.series) {
                	
                	var currentSeries = d.series[i];
                	var color = currentSeries.color;
                    var key = currentSeries.key;
                    var value = currentSeries.value;
                    

                    tooltip += "<tr>";
                    tooltip += "   <td class='legend-color-guide'>";
                    tooltip += "      <div style='background-color: " + color + ";'></div>";
                    tooltip += "   </td>";
                    tooltip += "   <td class='key'>" + key + "</td>";
                    tooltip += "   <td class='value'>" + $yuccaHelpers.render.safeNumber(value, decimal, isEuro,bigNumber) + textAfter + "</td>";
                    tooltip += "</tr>";
                }

                tooltip += "</tbody>";
                tooltip += "</table>";

                return tooltip;
            }
            
            scope.options = {
                    chart: {
                        type: chartType,
						duration: 500,
						//margin: {left:10},
    	                //height: scope.chartHeight(),
    	                //margin: {top: 20,right:20,bottom: 45,left:245},
    	                x: function(d){return d.label;},
    	                y: function(d){return d.value;},
//    	                valueFormat: function(d){
//    	                	return  $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);
//    	                },	         
						showValues: attr.showValues==="false"?false:true,
						wrapLabels: true,
		                tooltip:{
		                	contentGenerator: tooltipGenerator
		                },
//						tooltip: {
//							contentGenerator: tooltipGenerator,
//							//valueFormatter: function(d, i, e){console.log("DDD",d);return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber) + "ciao" + e;}
//						},
						yAxis:{
    	                	tickFormat:(function (d) {return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}),
    						axisLabel:yAxisAttr.label?yAxisAttr.label:"",
        	                rotateLabels:yAxisAttr.rotateLabels?yAxisAttr.rotateLabels:0,
        	    			staggerLabels: yAxisAttr.staggerLabels?true:false
    					},
    	                xAxis:{
    	                	//tickFormat: function(d){return wrapFn(d);},
    	                	axisLabel:xAxisAttr.label?xAxisAttr.label:"",
    	                	rotateLabels:xAxisAttr.rotateLabels?xAxisAttr.rotateLabels:0,
    	        			staggerLabels: xAxisAttr.staggerLabels?true:false

    					},
    					showXAxis:!xAxisAttr.hide,
    	    	        showYAxis:!yAxisAttr.hide,
    	    	        reduceXTicks: attr.reduceXTicks == "true",
    	        		multibar1: {
    	        			dispatch: {
    	        				//chartClick: function(e) {console.log("! chart Click !")},
    	        				//elementClick: function(e) {},
    	        				//elementDblClick: function(e) {console.log("! element Double Click !")},
    	        				elementMouseout: function(e) {
    	        					var eventData = e.data;
    	        					eventData.groupByColumn = groupByColumn;
    	        					eventData.valueColumn = valueColumn;
    	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
    	        					event.eventControlId = eventControlId;
    	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
    	        				},
    	        				elementMouseover: function(e) {
    	        					console.log(e.data);
    	        					var eventData = e.data;
    	        					eventData.groupByColumn = groupByColumn;
    	        					eventData.valueColumn = valueColumn;
    	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
    	        					event.eventControlId = eventControlId;
    	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
    	        				}
    	        			}
    	        		}
        			},
    	        };
            
          

			if(attr.stacked == 'true')
				scope.options.chart.stacked = true;

        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		
        		//var legend = {margin:{top: legendAttr.position.top,right: legend.position.right,bottom: legend.position.bottom,left: legend.position.left}};
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
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
	    			   filter = $yuccaHelpers.event.updateTextFilter(attr.filter, filterMap, columnDataTypeMap);
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
		    	   
		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, orderby).then(function(firstData){
        			console.log("loadData multichart", firstData);
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
		                console.info("multichart:loadData", result);
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
    			//var dataMap = {};
    			console.log("prepareData", odataResult);
    			//var sliceCount=0;

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    			
	    			console.log("allData multichart",allData);
	    				
	    			//scope.chartData = $yuccaHelpers.data.multibarChartSeriesKeyValue(allData,serieStyles,serieColumns,groupByColumn.key);
	    			//var colors = $yuccaHelpers.render.safeColors(serieColumns.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			//scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, serieColumns, groupByColumn.key,chartColors,attr.mainChartColor);
					var preparedData; 
					if(!seriesFromValues)
						preparedData = $yuccaHelpers.data.aggregationSeriesValueKey(allData, serieColumns, groupByColumn.key,chartColors,attr.mainChartColor);
	    			else
						preparedData = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, serieColumns, groupByColumn.key,chartColors,attr.mainChartColor,seriesDescriptionColumn);
					
					if(chartType == 'multiBarHorizontalChart'){
						var maxLabel = maxYLabel(preparedData[0].values);
						var fakeText = d3.select("#"+ scope.widgetId + "-fake").insert("svg").append("text").text(maxLabel);
						if(!scope.options.chart.margin)
							scope.options.chart.margin = {};
						scope.options.chart.margin.left = fakeText.node().getComputedTextLength()+6;
						console.log("maxLabel",maxLabel, fakeText.node().getComputedTextLength());
						d3.select("#"+ scope.widgetId + "-fake").remove();
					}	
					
					scope.chartData = preparedData;


					//$timeout(function(){fixYAxisTick();});	
					console.log("multibarchartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}

        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareSeriesKeyValue(groupByColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
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
			/*

			var fixYAxisTick = function(){
				//scope.options.chart.margin.left = 300;

				var maxTextLength = 0;
				d3.selectAll(".nv-x.nv-axis .tick text").each(function(i, e) {
					console.log("tttt",i,e, scope.chartData[0].values.length-1);
					var text = d3.select(this);
					if(text.node().getComputedTextLength() > maxTextLength)
						maxTextLength = text.node().getComputedTextLength();

					if(e==scope.chartData[0].values.length-1){
						var marginLeft = parseInt(maxTextLength);
						console.log("tttt",marginLeft);
						scope.options.chart.margin.left = marginLeft;
						console.log("tttt",maxTextLength, scope.options);
					}
				});
			};
			var fixYAxisTick = function(){
				d3.selectAll(".nv-x.nv-axis .tick text").each(function(i, e) {
					var text = d3.select(this),
					  words = text.text().split(/\s+/).reverse(),
					  word, line = [],
					  lineNumber = 0,
					  lineHeight = 1.1, // ems
					  y = text.attr("y"),
					  dy = parseFloat(text.attr("dy")),
					  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
				  
					while (word = words.pop()) {
					  line.push(word);
					  tspan.text(line.join(" "));
					  // TDOD : Make 80 a dynamic value based on the bar width/height
					  if (tspan.node().getComputedTextLength() > 80) {
						line.pop();
						tspan.text(line.join(" "));
						line = [word];
						tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					  }
					}
				  });
			};*/
			


        	if(groupedQuery)
        		loadDataGrouped();
        	else
        		loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_multibar_chart.html",
    '<div class="yucca-widget yucca-dataset-discretebar-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
	'           </div>\n' +
	'           <div id="{{widgetId}}-fake" class="nvd3"></div>' + 
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


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
		 		       }
			       }
		       });   
       		});
       		
       		scope.tableData = [];
       		var odataResult = null;
       		scope.totalResult = 0;
        	var loadData = function(){
        		scope.tableData = [];
    			scope.isLoading = true;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null,apiDataUrl,cache).then(function(firstData){
        			console.log("loadData", firstData);
	    			var maxData = firstData.data.d.__count>10000?10000:firstData.data.d.__count;
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
	        			if(tree.children[i].children)
		    				return sumChildresValue(tree.children[i].name, tree.children[i], valueIndex);
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
						total = tree.value2;
					else
						total = tree.value;
        			
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetPieChart', ['metadataService','dataService', '$yuccaHelpers', '$rootScope','$timeout',
    function (metadataService, dataService,$yuccaHelpers, $rootScope, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_pie_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetPieChart';
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
            var labelType =  $yuccaHelpers.attrs.safe(attr.labelType, "key");
            if(attr.showValues && attr.showValues==="false")
            	labelType = 'none';
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
            

            
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
            $timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
            	console.log("height",chartContentElement[0].offsetHeight);
            	scope.options.chart.height = chartContentElement[0].offsetHeight;
            	scope.options.chart.width = chartContentElement[0].offsetWidth;
            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            //if(valueColumn==null &&  countingMode=='sum')
        	//	scope.debugMessages.push("To sum value you must enter a valid valueColum");

            
        	scope.options = {
    			chart: {
    				type: 'pieChart',
	                duration: 500,
	                //height: scope.chartHeight(),
	                x: function(d){return d.key;},
	                y: function(d){return d.value;},
	                showLegend: attr.showLegend==="false"?false:true,
	                showLabels: attr.showLabels==="false"?false:true,
	                labelType: labelType,
	                labelSunbeamLayout: attr.labelSunbeamLayout==="false"?false:true,
	                valueFormat: function(n){
	                	if(labelType=='value'){
	                		return  $yuccaHelpers.render.safeNumber(n, decimalValue, scope.isEuroValue(),formatBigNumber);	
	                	}else{
	                		return n;
	                	}
	                },
					tooltip: {
						valueFormatter: function(d){return $yuccaHelpers.render.safeNumber(d, decimalValue, scope.isEuroValue(),formatBigNumber);}
					},
	                		
	                // donut: attr.donut==="true"?true:false,
	        		pie: {
	        			dispatch: {
	        				//chartClick: function(e) {console.log("! chart Click !")},
	        				//elementClick: function(e) {},
	        				//elementDblClick: function(e) {console.log("! element Double Click !")},
	        				elementMouseout: function(e) {
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				},
	        				elementMouseover: function(e) {
	        					console.log("e", e);
	        					var eventData = e.data;
	        					eventData.groupByColumn = groupByColumn;
	        					eventData.valueColumn = valueColumn;
	        					eventData.color = $yuccaHelpers.utils.rgb2Hex(e.color);
	        					console.log("rgb",eventData.color);
	        					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
	        					event.eventControlId = eventControlId;
	        		        	$rootScope.$broadcast ('yucca-widget-event', event);
	        				}
	        			}
	        		}
	            }
	        };
        	// range 0->1
        	
        	
        	if(attr.labelThreshold) scope.options.chart.labelThreshold =  attr.labelThreshold;
        	
        	console.log("attr.render", attr.render)

        	var render = scope.$eval(attr.render);
        	console.log("render", render)
        	if(render){
        		// donut
        		if(render.donut === true){
        			scope.options.chart.donut = true;
        			if(typeof render.donutRatio != 'undefined')
        				scope.options.chart.donutRatio = render.donutRatio;
        			else
        				delete scope.options.chart.donutRatio;
        		}
        		else{
    				delete scope.options.chart.donut;
    				delete scope.options.chart.donutRatio;
        		}
        		
        		// angles
        		if(render.halfPie){
        			if(!render.rotation)
        				render.rotation = 1;
        			scope.options.chart.startAngle = function(d) { return d.startAngle/2 -  render.rotation*Math.PI/2};
        			scope.options.chart.endAngle = function(d) { return d.endAngle/2 -  render.rotation*Math.PI/2};
        		}
        		else if(render.section || render.rotation){
        			if(typeof render.section == 'undefined')
        				render.section = 1;
        			if(typeof render.rotation== 'undefined')
        				render.rotation = 0;
        			scope.options.chart.startAngle = function(d) { return d.startAngle/render.section -  render.rotation*Math.PI/10};
        			scope.options.chart.endAngle = function(d) { return d.endAngle/render.section -  render.rotation*Math.PI/10};
        		}
        		
        		if(typeof render.cornerRadius!= 'undefined')
        			scope.options.chart.cornerRadius = render.cornerRadius;
        		else
        			delete scope.options.chart.cornerRadius;
        			
        		
        	}
        	
//        	if(attr.donutRatio) scope.options.chart.donutRatio =  attr.donutRatio;
//        	if(attr.startAngle && attr.endAngle){
//        		scope.options.chart.startAngle =function(d) { return d.startAngle/2 - attr.startAngle };
//        		scope.options.chart.endAngle =  function(d) { return d.endAngle/2 -attr.endAngle };
//        	}
//        	else if(attr.halfPie==="true"){
//        		scope.options.chart.startAngle =function(d) { return d.startAngle/2 - Math.PI/2 };
//        		scope.options.chart.endAngle =  function(d) { return d.endAngle/2 -Math.PI/2  };
//        	}
        	
        	var legendAttr= scope.$eval(attr.chartLegend);
        	if(legendAttr && legendAttr.show){
        		var legend = {margin: legendAttr.position};
        		scope.options.chart.legend = legend;
        		scope.options.chart.showLegend = true;
        	}
        	else
        		scope.options.chart.showLegend = false;

        	scope.chartData = new Array();
        	
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        		
        	
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
		    	   
		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
	    			var sliceCount=0;
	    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData,apiDataUrl,cache).then( function(result) {
	                  console.info("piechart:loadData", result);
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
        	
        	var prepareData = function(){
    			console.log("prepareData", odataResult);

	    		if(odataResult != null){
	    			scope.isLoading = true;
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			scope.chartData = $yuccaHelpers.data.aggregationKeyValue(allData, valueColumn, groupByColumn.key, scope.$eval(attr.chartColors),attr.mainChartColor);

	    	        console.log("pie chartData",scope.chartData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	};
        	
        	scope.downloadData = function(){
        		if(scope.chartData){
        			console.log("downloadData",scope.chartData);
        			var csvData = $yuccaHelpers.csv.prepareKeyValue(groupByColumn.label, valueColumn.label, scope.chartData);
        			$yuccaHelpers.csv.downloadCSV(csvData, 'data.csv');
        		}
        	};
        	
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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
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
  $templateCache.put("template/dataset_pie_chart.html",
    '<div class="yucca-widget yucca-dataset-pie-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <div class="yucca-widget-download-csv" ng-if="!isLoading"><a href ng-click="downloadData()">Data</a></div>\n' + 
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-pie-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-widget-chart" >\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetSankeyChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_sankey_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetSankeyChart';
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
            
            scope.numberFormat = {"euro": euroValue == "true", decimal: decimalValue, bigNumber: formatBigNumber};

            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            
            $timeout(function(){
            	//scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].offsetParent.clientWidth);
            	console.log("chartWidth",scope.chartWidth);
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-dataset-sankey-chart-content" ));
            	scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].offsetParent.clientHeight);
            	scope.chartWidth = chartContentElement[0].offsetWidth;
            	console.log("width",chartContentElement[0].offsetWidth);
            	scope.sankeyWidth = chartContentElement[0].offsetWidth;
            	scope.sankeyHeight = scope.chartHeight;
            });
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");

            var node_columns = scope.$eval(attr.nodeColumns);
            var render = scope.$eval(attr.nodeRender);

//            if(typeof scope.treeColumns != 'Array' )
//        		scope.debugMessages.push("Invalid columns");
            
            var valueColumn =scope.$eval(attr.valueColumn);
//            if(valueColumn==null &&  countingMode=='sum')
//        		scope.debugMessages.push("To sum value you must enter a valid valueColum");

        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};
        	
//        	scope.$on('yucca-sankey-event', function(e, event) {  
// 		       console.log("yucca-sankey-event fuori", event);  
// 		       if(event.sourceId == scope.widgetId){
// 		    	  event.data.datasetcode = datasetcode;
// 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
// 	        	  console.log("event",event);
// 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
// 		       }
//        	});
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
	 		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
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
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("sankeychart:loadData", result);
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
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			//var colors = $yuccaHelpers.render.safeColors(scope.columns.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			//scope.collapsibletreeData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, treeColumns, valueColumn.key, valueColumn.countingMode);
	    			scope.sankeyData = $yuccaHelpers.data.aggregationNodesLinks(allData, node_columns, valueColumn.key, valueColumn.countingMode, render, mainChartColor);
	    			console.log("sankey fuori", scope.sankeyData);

	    			  
//	    			for (var i = 0; i < scope.sankeyData.children.length; i++) {
//	    				scope.sankeyData.children[i].color = colors[i];
//					}
	    			
	    	        console.log("chartData",scope.sankeyData);
	    	        
	    		}
    			  
      			scope.isLoading = false;
        	}
        	
        	loadData();
            console.log("attrs", attr);


        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_sankey_chart.html",
    '<div class="yucca-widget yucca-dataset-sankey-chart" id="{{widgetId}}" style="height: {{chartHeight}}px;width: {{chartWidth}}px;">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-sankey-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-sankey-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-sankey-chart-chart" >\n' +
    '        	    <sankey-chart data="sankeyData"  number_format="numberFormat" width="{{sankeyWidth}}" height="{{sankeyHeight}}"  widgetId="{{widgetId}}"></sankey-chart>\n' +
    '				<div><nvd3 options="options" data="chartData" ></nvd3></div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetSingledata', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_singledata_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetSingledataChart';
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
            var skip  = $yuccaHelpers.attrs.num(attr.skip, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");

            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
            
            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");


            var valueColumn =scope.$eval(attr.valueColumn);
            scope.hideLabel = attr.hideLabel && attr.hideLabel  == 'true';
            console.log("hideLabel ",scope.hideLabel );
            scope.textafter = $yuccaHelpers.attrs.safe(attr.textAfter, null);
            
            console.log("singledata valuecolumn", valueColumn);
            var growAnimation  = scope.$eval(attr.growAnimation);
            

            var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	


            
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
				       }
			       }
		       });
		       
       		});
       		
       		scope.label  = valueColumn.label;
       		scope.value  = "";
       		
       		var delta = 1;
       		var v0 = 0;
       		var growloop = function() {
       			$timeout(function () {
       				v0 += delta;
       				scope.value = $yuccaHelpers.render.safeNumber(v0, decimalValue, euroValue,formatBigNumber);
       				
       				if ((delta>0 && v0<v)||(delta<0 && v0>v)) {
       					growloop();
       				}
       				else
       					scope.value = $yuccaHelpers.render.safeNumber(v, decimalValue, euroValue,formatBigNumber);
       			},1);
       		};
       		
       		var v;
        	var loadData = function(){
        		scope.tableData = [];
    			scope.isLoading = true;
        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, 1, null,apiDataUrl,cache).then(function(firstData){
        			console.log("loadData", firstData);
        			v = firstData.data.d.results[0][valueColumn.key];
        			v = 1*v;
        			if(!isNaN(parseFloat(v))){
        				if(growAnimation){
        					delta = parseInt(v/100);
        					scope.value = 0;
        					growloop();
        				}
        				else
        					scope.value =  $yuccaHelpers.render.safeNumber(v, decimalValue, euroValue,formatBigNumber);
        			}
        			else
        				scope.value = v;
	   				scope.isLoading = false;
	           },function(result){
	   				scope.isLoading = false;
	   				console.error("Load data error",result);
	   				scope.debugMessages.push("Load data error " +result );
	           });
        		
        		
        	};
       		var odataResult = null;

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
			    			scope.chartData = $yuccaHelpers.data.aggregationSeriesKeyValue(result.data.d.results, [valueColumn4GroupBy], groupByColumn.key, chartColors,attr.mainChartColor);
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
  $templateCache.put("template/dataset_singledata_chart.html",
    '<div class="yucca-widget yucca-dataset-singledata" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-content">\n' +
    '       <section>\n' +
    '         <div ng-if="isLoading" class="yucca-dataset-dataexplorer-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' +
    '         <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '           <p>{{infoMessage}}</p>\n' +
    '         </div>\n' +
    '		  <div ng-if="!isLoading"  class="yucca-widget-singledata-content" ng-if="!isLoading">\n'+
    '             <div ng-if="!hideLabel" class="yucca-widget-singledata-label" >{{label}}</div>\n' +
    '             <div class="yucca-widget-singledata-value" >{{value}}</div>\n' +
    '             <div class="yucca-widget-singledata-textafter" >{{textafter}}</div>\n' +
    '         </div>\n' +
    '       </section>\n' +
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

	
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetSinglepercentageChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile','$http', '$sce','$location',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $http,$sce,$location) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_singlepercentage_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem ok", elem);
        	//console.log("document.currentScript.src",document.currentScript.src);
        	// https://github.com/encharm/Font-Awesome-SVG-PNG
        	var scripts = document.getElementsByTagName("script");
        	var svgBaseUrl  =  $location.absUrl().split('#')[0] + "lib/yucca-angular-widgets/dist/img/svg/";
        	for (var i = 0; i < scripts.length; i++) {
				if(scripts[i].src.indexOf("yucca-angular-widgets")>0){
					svgBaseUrl =scripts[i].src.substring(0, scripts[i].src.indexOf("yucca-angular-widgets")) + "yucca-angular-widgets/dist/img/svg/";
					break;
				}
			}
        	console.log("svgBaseUrl",svgBaseUrl);
        	var shapes = {'rectangle': {type: 'basic', tag: 'rect', attrs:{'x':'1', 'y':'1', 'stroke-width':'1'}},
					'ellipse': {type: 'basic', tag: 'ellipse', attrs:{'x':'1', 'y':'1', 'stroke-width':'1'}},
					'circle': {type: 'basic', tag: 'circle', attrs:{'x':'1', 'y':'1', 'stroke-width':'1'}},
					'star': {type: 'polygon', tag: 'polygon', attrs:{'x':'1', 'y':'1', 'stroke-width':'1', 'points':"119,0 148,86 238,86 166,140 192,226 119,175 46,226 72,140 0,86 90,86"}},
					'hexagon': {type: 'polygon', tag: 'polygon', attrs:{'x':'1', 'y':'1', 'stroke-width':'1', 'points':"108,1 216,62.5 216,187.5 108,250 1,187.6 1,62.5"}},
					//'heart': {type: 'polygon', tag: 'polygon', attrs:{'x':'1', 'y':'1', 'stroke-width':'1', 'points':"100 100, 150 150, 200 100, 200 75, 185 60, 165 60, 150 75, 135 60, 115 60, 100 75, 100 100"}},
					'yucca_domain_agriculture':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/AGRICULTURE.svg', attrs:{}},
					'yucca_domain_culture':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/CULTURE.svg', attrs:{}},
					'yucca_domain_economy':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/ECONOMY.svg', attrs:{}},
					'yucca_domain_employment_training':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/EMPLOYMENT_TRAINING.svg', attrs:{}},
					'yucca_domain_energy':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/ENERGY.svg', attrs:{}},
					'yucca_domain_environment':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/ENVIRONMENT.svg', attrs:{}},
					'yucca_domain_government':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/GOVERNMENT.svg', attrs:{}},
					'yucca_domain_health':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/HEALTH.svg', attrs:{}},
					'yucca_domain_population':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/POPULATION.svg', attrs:{}},
					'yucca_domain_production':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/PRODUCTION.svg', attrs:{}},
					'yucca_domain_school':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SCHOOL.svg', attrs:{}},
					'yucca_domain_science_technology':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SCIENCE_TECHNOLOGY.svg', attrs:{}},
					'yucca_domain_security':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SECURITY.svg', attrs:{}},
					'yucca_domain_smart_community':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/SMART_COMMUNITY.svg', attrs:{}},
					'yucca_domain_territory':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TERRITORY.svg', attrs:{}},
					'yucca_domain_tourism_sport':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TOURISM_SPORT.svg', attrs:{}},
					'yucca_domain_transport':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TRANSPORT.svg', attrs:{}},
					'yucca_domain_trade':{type: 'custom', 'url':svgBaseUrl +'yucca/domain/TRADE.svg', attrs:{}},					
					'common_cloud':{type: 'custom', 'url':svgBaseUrl +'common/cloud.svg', attrs:{"stroke-width":20}},
					'common_comment':{type: 'custom', 'url':svgBaseUrl +'common/comment.svg', attrs:{"stroke-width":20}},
					'common_female':{type: 'custom', 'url':svgBaseUrl +'common/female.svg', attrs:{"stroke-width":20}},
//					'common_pasta':{type: 'custom', 'url':svgBaseUrl +'common/pasta.svg', attrs:{}},
					'common_industry':{type: 'custom', 'url':svgBaseUrl +'common/industry.svg', attrs:{"stroke-width":20}},
//					'common_internet':{type: 'custom', 'url':svgBaseUrl +'common/internet.svg', attrs:{}},
					'common_leaf':{type: 'custom', 'url':svgBaseUrl +'common/leaf.svg', attrs:{"stroke-width":20}},
					'common_male':{type: 'custom', 'url':svgBaseUrl +'common/male.svg', attrs:{"stroke-width":20}},
					'common_mars':{type: 'custom', 'url':svgBaseUrl +'common/mars.svg', attrs:{"stroke-width":20}},
					'common_pagelines':{type: 'custom', 'url':svgBaseUrl +'common/pagelines.svg', attrs:{"stroke-width":20}},
					'common_paw':{type: 'custom', 'url':svgBaseUrl +'common/paw.svg', attrs:{"stroke-width":20}},
					'common_subway':{type: 'custom', 'url':svgBaseUrl +'common/subway.svg', attrs:{"stroke-width":20}},
					'common_train':{type: 'custom', 'url':svgBaseUrl +'common/train.svg', attrs:{"stroke-width":20}},
					'common_tree':{type: 'custom', 'url':svgBaseUrl +'common/tree.svg', attrs:{"stroke-width":20}},
					'common_trophy':{type: 'custom', 'url':svgBaseUrl +'common/trophy.svg', attrs:{"stroke-width":20}},
					'common_truck':{type: 'custom', 'url':svgBaseUrl +'common/truck.svg', attrs:{"stroke-width":20}},
					'common_umbrella':{type: 'custom', 'url':svgBaseUrl +'common/umbrella.svg', attrs:{"stroke-width":20}},
					'common_plane':{type: 'custom', 'url':svgBaseUrl +'common/plane.svg', attrs:{"stroke-width":20}},
					'common_rocket':{type: 'custom', 'url':svgBaseUrl +'common/rocket.svg', attrs:{"stroke-width":20}},
					'common_heart':{type: 'custom', 'url':svgBaseUrl +'common/heart.svg', attrs:{"stroke-width":20}},
					'common_child':{type: 'custom', 'url':svgBaseUrl +'common/child.svg', attrs:{"stroke-width":20}},
					'common_venus':{type: 'custom', 'url':svgBaseUrl +'common/venus.svg', attrs:{"stroke-width":20}},	
					'meteo_cloud':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud.svg', attrs:{}},
					'meteo_cloud_flash':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_flash.svg', attrs:{}},
					'meteo_cloud_flash_alt':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_flash_alt.svg', attrs:{}},
					'meteo_cloud_flash_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_flash_inv.svg', attrs:{}},
					'meteo_cloud_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_inv.svg', attrs:{}},
					'meteo_cloud_moon':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_moon.svg', attrs:{}},
					'meteo_cloud_moon_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_moon_inv.svg', attrs:{}},
					'meteo_clouds':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds.svg', attrs:{}},
					'meteo_clouds_flash':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_flash.svg', attrs:{}},
					'meteo_clouds_flash_alt':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_flash_alt.svg', attrs:{}},
					'meteo_clouds_flash_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_flash_inv.svg', attrs:{}},
					'meteo_clouds_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/clouds_inv.svg', attrs:{}},
					'meteo_cloud_sun':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_sun.svg', attrs:{}},
					'meteo_cloud_sun_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/cloud_sun_inv.svg', attrs:{}},
					'meteo_compass':{type: 'custom', 'url':svgBaseUrl +'meteo/compass.svg', attrs:{}},
					'meteo_drizzle':{type: 'custom', 'url':svgBaseUrl +'meteo/drizzle.svg', attrs:{}},
					'meteo_drizzle_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/drizzle_inv.svg', attrs:{}},
					'meteo_eclipse':{type: 'custom', 'url':svgBaseUrl +'meteo/eclipse.svg', attrs:{}},
					'meteo_fog':{type: 'custom', 'url':svgBaseUrl +'meteo/fog.svg', attrs:{}},
					'meteo_fog_cloud':{type: 'custom', 'url':svgBaseUrl +'meteo/fog_cloud.svg', attrs:{}},
					'meteo_fog_moon':{type: 'custom', 'url':svgBaseUrl +'meteo/fog_moon.svg', attrs:{}},
					'meteo_fog_sun':{type: 'custom', 'url':svgBaseUrl +'meteo/fog_sun.svg', attrs:{}},
					'meteo_hail':{type: 'custom', 'url':svgBaseUrl +'meteo/hail.svg', attrs:{}},
					'meteo_hail_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/hail_inv.svg', attrs:{}},
					'meteo_mist':{type: 'custom', 'url':svgBaseUrl +'meteo/mist.svg', attrs:{}},
					'meteo_moon':{type: 'custom', 'url':svgBaseUrl +'meteo/moon.svg', attrs:{}},
					'meteo_moon_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/moon_inv.svg', attrs:{}},
					'meteo_rain':{type: 'custom', 'url':svgBaseUrl +'meteo/rain.svg', attrs:{}},
					'meteo_rain_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/rain_inv.svg', attrs:{}},
					'meteo_snow':{type: 'custom', 'url':svgBaseUrl +'meteo/snow.svg', attrs:{}},
					'meteo_snow_alt':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_alt.svg', attrs:{}},
					'meteo_snowflake':{type: 'custom', 'url':svgBaseUrl +'meteo/snowflake.svg', attrs:{}},
					'meteo_snow_heavy':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_heavy.svg', attrs:{}},
					'meteo_snow_heavy_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_heavy_inv.svg', attrs:{}},
					'meteo_snow_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/snow_inv.svg', attrs:{}},
					'meteo_sun':{type: 'custom', 'url':svgBaseUrl +'meteo/sun.svg', attrs:{}},
					'meteo_sun_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/sun_inv.svg', attrs:{}},
					'meteo_sunrise':{type: 'custom', 'url':svgBaseUrl +'meteo/sunrise.svg', attrs:{}},
					'meteo_temperature':{type: 'custom', 'url':svgBaseUrl +'meteo/temperature.svg', attrs:{}},
					'meteo_wind':{type: 'custom', 'url':svgBaseUrl +'meteo/wind.svg', attrs:{}},
					'meteo_windy':{type: 'custom', 'url':svgBaseUrl +'meteo/windy.svg', attrs:{}},
					'meteo_windy_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/windy_inv.svg', attrs:{}},
					'meteo_windy_rain':{type: 'custom', 'url':svgBaseUrl +'meteo/windy_rain.svg', attrs:{}},
					'meteo_windy_rain_inv':{type: 'custom', 'url':svgBaseUrl +'meteo/windy_rain_inv.svg', attrs:{}}
			};

					
            var widgetType = 'YuccaBasicDatasetSinglepercentageChart';
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
            var skip  = $yuccaHelpers.attrs.num(attr.skip, null, null, 1);
            var datasetcode = $yuccaHelpers.attrs.safe(attr.datasetcode, null);
            if(datasetcode==null )
        		scope.debugMessages.push("Invalid dataset code");

            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
            var decimalValue = $yuccaHelpers.attrs.safe(attr.decimalValue, 2);
            var formatBigNumber = $yuccaHelpers.attrs.safe(attr.formatBigNumber, false);
            scope.isEuroValue = function(){
            	return euroValue == "true";
            };
			var labelColumn = scope.$eval(attr.labelColumn);
			var valueColumn = scope.$eval(attr.valueColumn);
			
			var maxValueLabelColumn = scope.$eval(attr.maxValueLabelColumn);
			var maxValueColumn = scope.$eval(attr.maxValueColumn);

			var targetLabelColumn = scope.$eval(attr.targetLabelColumn);
			var targetValueColumn = scope.$eval(attr.targetValueColumn);
			var rows = $yuccaHelpers.attrs.safe(attr.numRows, 1);

			scope.showLabel = !attr.showLabel || attr.showLabel  == 'true';
			scope.showValue = !attr.showValue || attr.showValue  == 'true';
			scope.showMaxValueLabel = !attr.showMaxValueLabel || attr.showMaxValueLabel == 'true';
			scope.showMaxValue = !attr.showMaxValue || attr.showMaxValue == 'true';
			
			console.log("hideLabel ",scope.hideLabel );
			
			var maxValue = $yuccaHelpers.attrs.safe(attr.maxValue, 100);
			var targetValue = $yuccaHelpers.attrs.safe(attr.targetValue, 100);
            scope.textAfter = $yuccaHelpers.attrs.safe(attr.textAfter, null);
            
            
            console.log("singlepercentage valuecolumn", valueColumn);
            var growAnimation  = scope.$eval(attr.growAnimation);
			

			var shape = $yuccaHelpers.attrs.safe(attr.shape, 'rectangle');
			var orientation= $yuccaHelpers.attrs.safe(attr.orientation, 'horizontal');

			var fullColor =  $yuccaHelpers.attrs.safe(attr.fullColor, "#bbb");
			var emptyColor =  $yuccaHelpers.attrs.safe(attr.emptyColor, "#fff");
			var strokeColor = $yuccaHelpers.attrs.safe(attr.strokeColor, fullColor);
			var fontSize =  $yuccaHelpers.attrs.safe(attr.fontSize, 24);

			$timeout(function(){
            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-content" ));
            	console.log("width",chartContentElement[0].offsetWidth);
            	var parentWidth = chartContentElement[0].offsetWidth;
            	var height = shape=='rectangle' && !attr.externalShapeUrl?parentWidth/10:parentWidth;
            	scope.width = parseInt($yuccaHelpers.attrs.num(attr.widgetWidth, null, null, parentWidth));
            	scope.height = parseInt($yuccaHelpers.attrs.num(attr.widgetHeight, null, null, height));
            });
			

			
            var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	

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
				       }
			       }
		       });
		       
       		});
       		
       		scope.label  = valueColumn.label;
       		//scope.values  = new Array();
       		scope.charts = new Array();
			var v, label, maxValueLabel,targetLabel;

			var xmlSerializer = new XMLSerializer();

        	var loadData = function(){
        		scope.tableData = [];
    			scope.isLoading = true;
           		scope.charts = new Array();

        		dataService.getDataEntities(attr.datasetcode,user_token,filter,  0, rows, orderby).then(function(result){
					console.log("loadData", result);
					$timeout(function(){
						if(rows>result.data.d.__count)
							rows=result.data.d.__count;
						for(var valueIndex=0; valueIndex<rows;valueIndex++){
							
				            var svgId = "svg_"+valueIndex+"_" + +new Date().getTime();


							v = result.data.d.results[valueIndex][valueColumn.key];
							v = 1*v;
							if(labelColumn)
								label = result.data.d.results[valueIndex][labelColumn.key];
							else
								label = $yuccaHelpers.attrs.safe(attr.label, "");
							
							if(maxValueLabelColumn)
								maxValueLabel = result.data.d.results[valueIndex][maxValueLabelColumn.key];
							else
								maxValueLabel = $yuccaHelpers.attrs.safe(attr.maxValueLabel, "");
							if(targetLabelColumn)
								targetLabel = result.data.d.results[valueIndex][targetLabelColumn.key];
							else
								targetLabelColumn = $yuccaHelpers.attrs.safe(attr.targetLabel, "");
							
							if(maxValueColumn)
								maxValue = result.data.d.results[valueIndex][maxValueColumn.key];
							if(targetValueColumn)
								targetValue = result.data.d.results[valueIndex][targetValueColumn.key];
							var percentage = v/maxValue;
							console.log("percentage",v, maxValue, percentage);
							//scope.values.push(percentage);
							var defs = $yuccaHelpers.svg.createPercentage(svgId, percentage, fullColor, emptyColor, strokeColor, orientation);

							var currentShape = angular.copy(shapes[shape]);
							if(attr.externalShapeUrl)
								currentShape =  {type: 'custom', 'url':attr.externalShapeUrl, attrs:{}};
							else if(!currentShape)
								currentShape = angular.copy(shapes['rectangle']);
								
							

							console.log(currentShape);
							var svg;
							currentShape.attrs["fill"] ="url(#" + svgId +"bg)";
							currentShape.attrs["stroke"] ="url(#" + svgId +"stroke)";
							
							//var textAttrs = {'x':'50%', 'y':'50%', 'dominant-baseline':'middle',  'text-anchor':'middle',
							//		'fill': emptyColor, 'stroke': strokeColor};
							//if(fontSize)
							//	textAttrs['font-size'] = fontSize;

							if(currentShape.type == 'basic' || currentShape.type== 'polygon'){
								
								var svgAttrs = {'width':scope.width+2, 'height':scope.height+2};
								if(currentShape.type == 'polygon'){
									var size = $yuccaHelpers.svg.baseSize(currentShape.attrs.points);
									var viewBox = "1 1 " + size[0] + " " + size[1];
									var strokeW = scope.width/size[0];
									var strokeH = scope.height/size[1];
									
									currentShape.attrs["stroke-width"] = 1/(strokeW>strokeH?strokeH:strokeW);
									svgAttrs['viewBox'] = viewBox;
									
									//currentShape.attrs["viewBox"] = scope.viewBox; 
								}
								var sizeAttrs = $yuccaHelpers.svg.sizeAttrs(currentShape.tag, scope.width, scope.height);
								for (var attrKey in sizeAttrs) {
									if (sizeAttrs.hasOwnProperty(attrKey)) {
										currentShape.attrs[attrKey] = sizeAttrs[attrKey];
									}
								}
								console.log("currentShape",currentShape);
								
								svg = $yuccaHelpers.svg.createSvg(svgAttrs, currentShape.tag, currentShape.attrs, defs);
								scope.charts.push({"svg":$sce.trustAsHtml(xmlSerializer.serializeToString(svg)), 
									"label":label, 
									"value": $yuccaHelpers.render.safeNumber(v, decimalValue, scope.isEuroValue(),formatBigNumber), 
									"maxValueLabel":maxValueLabel, 
									"maxValue":$yuccaHelpers.render.safeNumber(maxValue, decimalValue, scope.isEuroValue(),formatBigNumber)
								});
								//scope.ssvg  =  $sce.trustAsHtml(xmlSerializer.serializeToString(svg));
								//angular.element(document.getElementById('svg-wrapper' + valueIndex)).append(svg);
						}
						else{
							$http.get(currentShape.url).then(function(svgString) {
								//console.log("data", data);
								//var svgAttrs = {'width':scope.width+2, 'height':scope.height+2};
								var svgAttrs = {'width': "100%", 'height': scope.height};
								//var viewBox = "1 1 " + scope.width + " " + scope.height;
								//svgAttrs['viewBox'] = viewBox;

								svg = $yuccaHelpers.svg.updateSvg(svgString.data, svgAttrs, currentShape.attrs,defs);
								console.log("svg", svg);
								scope.charts.push({"svg":$sce.trustAsHtml(xmlSerializer.serializeToString(svg)), 
									"label":label, 
									"value": $yuccaHelpers.render.safeNumber(v, decimalValue, scope.isEuroValue(),formatBigNumber), 
									"maxValueLabel":maxValueLabel, 
									"maxValue":$yuccaHelpers.render.safeNumber(maxValue, decimalValue, scope.isEuroValue(),formatBigNumber)								});
								//angular.element(document.getElementById('svg-wrapper'+ valueIndex)).append(svg);
							},function(result){
								console.error("Load svg error",result);
								scope.debugMessages.push("Load svg error " +result );
						});
						}
						/*
						if(!isNaN(parseFloat(v))){
							if(growAnimation){
							}
							else
								scope.values.push($yuccaHelpers.render.safeNumber(v, decimalValue, euroValue,formatBigNumber));
						}
						else
							scope.values.push(v);*/
					}
					console.log("charts", scope.charts);
					scope.isLoading = false;
				});

	           },function(result){
	   				scope.isLoading = false;
	   				console.error("Load data error",result);
	   				scope.debugMessages.push("Load data error " +result );
	           });
        		
        		
        	};

        	loadData();
            console.log("attrs", attr);
			
        }
		
	};
	
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_singlepercentage_chart.html",
    '<div class="yucca-widget yucca-dataset-singlepercentage" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-content">\n' +
    '       <section>\n' +
    '         <div ng-if="isLoading" class="yucca-dataset-dataexplorer-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '         </div>\n' +
    '         <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '           <p>{{infoMessage}}</p>\n' +
    '         </div>\n' +
	'		  <div ng-if="!isLoading">\n'+
	'             <div ng-repeat="chart in charts track by $index"  class="yucca-widget-singlepercentage-content">'+
    //'             	<div ng-if="!hideLabel" class="yucca-widget-singlepercentage-label" >{{label}}</div>\n' +
	'				<div class="yucca-widget-singlepercentage-label-content"><span class="yucca-widget-label" ng-if="showLabel">{{chart.label}}</span>'+ 
	'					<span class="yucca-widget-value" ng-if="showValue">{{chart.value}}</span>' +
	'					<span class="yucca-widget-max-value-label" ng-if="showMaxValueLabel">{{chart.maxValueLabel}}</span>' +
	'					<span class="yucca-widget-max-value" ng-if="showMaxValue">{{chart.maxValue}}</span>' +
	'					<span class="yucca-widget-text-after-value" >{{textAfter}}</span>' +
	
	'				</div>'+
	'             	<div ng-bind-html="chart.svg" class="yucca-widget-singlepercentage-chart-content"></div>'+			
    '         	  </div>\n' +
    '         </div>\n' +
    '       </section>\n' +
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

	
/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
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
        	var apiDataUrl = attr.apiDataUrl;
        	var cache = attr.cache==="true"?true:false;
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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetTreemapChart', ['metadataService','dataService', '$yuccaHelpers', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers, $timeout, $compile, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_treemap_chart.html',
        link: function(scope, elem, attr) {
        	console.log("elem", elem);

            var widgetType = 'YuccaBasicDatasetTreemapChart';
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;

            scope.numberFormat = {"euro": euroValue, decimal: decimalValue, bigNumber: formatBigNumber};

            var euroValue2 = $yuccaHelpers.attrs.safe(attr.euroValue2, false);
            var decimalValue2 = $yuccaHelpers.attrs.safe(attr.decimalValue2, 2);
            var formatBigNumber2 = $yuccaHelpers.attrs.safe(attr.formatBigNumber2, false);
            scope.isEuroValue2 = function(){
            	return euroValue2 == "true";
            };
            scope.numberFormat2 = {"euro": euroValue2, decimal: decimalValue2, bigNumber: formatBigNumber2};

            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            var showLegend =  attr.showLegend==="false"?false:true;
          
            var chartColors =  scope.$eval(attr.chartColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            console.log("wwww", elem[0].parentElement);
            
            var widgetSize = $timeout(function(){
            	var widgetSize = $yuccaHelpers.render.widgetSize(elem[0],$timeout);
            	scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 300, null, widgetSize.w);
            	scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, widgetSize.h);
            	loadData();
            });
            
            //scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, 100, null, elem[0].parentElement.clientWidth-parentPaddingWidth);
            //scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, 300, null, elem[0].parentElement.clientHeight-parentPaddingHeight);
            
            var rootLabel =  $yuccaHelpers.attrs.safe(attr.rootLabel, "");

            var treeColumns = scope.$eval(attr.treeColumns);
//            if(typeof treeColumns != 'Array' )
//        		scope.debugMessages.push("Invalid tree columns");
            
            var valueColumn =scope.$eval(attr.valueColumn);
//            if(valueColumn==null &&  countingMode=='sum')
//        		scope.debugMessages.push("To sum value you must enter a valid valueColum");
            var valueColumn2 =scope.$eval(attr.valueColumn2);

        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);

        	var filterMap = {};
        	scope.$on('yucca-treemap-event', function(e, event) {  
 		       console.log("yucca-treemap-event fuori", event);  
 		       if(event.sourceId == scope.widgetId){
 		    	  event.data.datasetcode = datasetcode;
 	         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,event.eventtype, event.data);
				  event.eventControlId = eventControlId;
 	        	  console.log("event",event);
 	        	  $rootScope.$broadcast ('yucca-widget-event', event);
 		       }
        	});
        	
        	
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("treeee yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId){
	 		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){

		    		   if(event.eventtype == 'dataset.change.value_column'){
		    			   valueColumn = event.data;
		    			   prepareData();
		    		   }
		    		   else if(event.eventtype == 'dataset.filter.text'){
		    			   filterMap[event.sourceId] = event.data;
		    			   filter = $yuccaHelpers.event.updateTextFilter(attr.Filter, filterMap, columnDataTypeMap);
		    			   loadData();
		    		   }
		    		   else if(event.data.datasetcode == datasetcode && event.eventtype == "dataset.browse"){
			    		   var path = event.data.path;
			    		   $rootScope.$broadcast ('yucca-widget-event-'+scope.widgetId, {"type":"browse", "path":path,"eventControlId":eventControlId});
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
		    	   

		    	   
		    	   
//		    	   if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.filter.column"){
//		    		   scope.selected = event.data.value.toUpperCase();
//		    	   }
//		    	   else if(event.data.datasetcode == attr.datasetcode && event.eventtype == "dataset.change.column"){
//		    		   valueColumn = event.data.column;
//		    		   groupData(allData);
//		    	   }
		       }
		       
       		});
       		
       		
       		var odataResult = null;
       		var columnDataTypeMap = {};
        	var loadData = function(){
    			scope.isLoading = true;
           		odataResult = null;
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
		                console.info("treemapchart:loadData", result);
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
    			var dataMap = {};
    			console.log("prepareData", odataResult);
    			var sliceCount=0;

    			scope.isLoading = true;
	    		if(odataResult != null){
	    			
	    			var allData = new Array();
	    			for(var i=0; i<odataResult.length; i++)
	    				allData = allData.concat(odataResult[i].data.d.results);
	    				
	    			scope.treemapData = $yuccaHelpers.data.aggregationTree(rootLabel, allData, treeColumns, valueColumn, valueColumn2);
	    			console.log("tree fuori", scope.treemapData);

	    			  
	    			var colors = $yuccaHelpers.render.safeColors(scope.treemapData.children.length, scope.$eval(attr.chartColors),attr.mainChartColor);
	    			for (var i = 0; i < scope.treemapData.children.length; i++) {
	    				if(attr.mainChartColor && valueColumn2)
	    					scope.treemapData.children[i].color = $yuccaHelpers.d3color.darker(attr.mainChartColor, .2);
	    				else
	    					scope.treemapData.children[i].color = colors[i];
					}
	    			
	    	        console.log("chartData",scope.treemapData);
	    	        $rootScope.$broadcast('yucca-widget-ready', {"widgetId":scope.widgetId, "widgetType":"yucca-treemap", "eventControlId":eventControlId});
	    	        console.log("broadcast yucca-widget-ready");
	    	        
	    		}

      			scope.isLoading = false;
      			
        	};
        	scope.isLoading = true;
            console.log("attrs", attr);
        }

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_treemap_chart.html",
    '<div class="yucca-widget yucca-dataset-treemap-chart" id="{{widgetId}}" style="min-height: {{chartHeight}}px; min-width: {{chartWidth}}px;">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-dataset-treemap-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-treemap-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <div ng-if="infoMessage!=null" class="yucca-chart-info-message" >\n' +
    '             <p>{{infoMessage}}</p>\n' +
    '           </div>\n' +
    '        	<div ng-if="!isLoading" class="yucca-dataset-treemap-chart-chart" >\n' +
    '        		<div><treemap-chart data="treemapData" width="{{chartWidth}}" height="{{chartHeight}}" widgetId="{{widgetId}}" number_format2="numberFormat2" number_format="numberFormat"></treemap-chart>\n' +

    '				</div>\n' +
    '       	</div>\n' +
    '        </section>\n' +
    '        <section class="yucca-widget-debug" ng-if="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


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


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaControlFilterDataDiscrete', ['$yuccaHelpers', '$rootScope',
    function ($yuccaHelpers,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/control_filter_data_discrete.html',
        link: function(scope, elem, attr) {
        	console.log("ngYuccaControlFilter - attr", attr);

          var widgetType = 'ngYuccaControlFilter';
          scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
          var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");


          scope.label =  $yuccaHelpers.attrs.safe(attr.label, null);
          scope.hint =  $yuccaHelpers.attrs.safe(attr.hint, null);
          scope.debug = attr.debug==="true"?true:false;
          scope.debugMessages = [];

          scope.discreteFilterType = $yuccaHelpers.attrs.safe(attr.filterType, 'multi'); // multi - unique
	      scope.columns =  attr.valueColumns?scope.$eval(attr.valueColumns):null;
	      if(scope.columns){
	    	  for (var i = 0; i < scope.columns.length; i++) {
	    		  if(scope.columns[i].selected){
	    			  scope.columns[i].selectedText = scope.columns[i].key;
	    		  }
	    	  }
	      }

          scope.flexDirection = $yuccaHelpers.attrs.safe(attr.direction, null) == null?'':'yucca-control-direction-' + attr.direction;
          scope.flexAlignItems = $yuccaHelpers.attrs.safe(attr.alignItems, null) == null?'yucca-control-align-items-center':'yucca-control-align-items-' + attr.alignItems;

          scope.filter = {};
          var override = attr.override=="true"?true:false;
          var oldFilterValue = null;
          
 		  scope.render = $yuccaHelpers.attrs.safe(attr.render, 'control'); // control button
		  if(scope.render == 'control'){
			  scope.render = scope.discreteFilterType == 'multi'?'checkbox':'radio';
		  }
          //var filters = []; 
		  scope.select = function(columnIndex){
			  console.log("columns",scope.columns );
			  //scope.columns[columnIndex].selected = true;
			  refreshFilter();
			  
		  }

		  scope.toggleSelect = function(columnIndex){
			  console.log("columns",scope.columns );
			  if(scope.discreteFilterType != 'multi'){
				for(var i=0; i<scope.columns.length; i++)
					scope.columns[i].selected = false;
			  }
			  scope.columns[columnIndex].selected = !scope.columns[columnIndex].selected;
			  refreshFilter();
		  }

		  
          var refreshFilter = function(){
			 console.log("filterText",scope.filter, oldFilterValue);
			 var  logicOperator = " or "; 
			 var filter = ""; 
			 for(var i=0; i<scope.columns.length; i++){
				 if(scope.columns[i].selected){
					 filter += scope.columns[i].filter + logicOperator;
				 }
			 }
			 filter = filter.substring(0,filter.length - logicOperator.length);

			 if(!angular.equals(oldFilterValue,filter)){
				 var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.odata", {"filter":filter,"override":override}, eventControlId);
				 $rootScope.$broadcast ('yucca-widget-event', event);
	        	 oldFilterValue = angular.copy(filter);
			 }
		  }
		  

		  
		}

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/control_filter_data_discrete.html",
		'<div class="yucca-widget yucca-control-filter-data-discrete" id="{{widgetId}}">\n' +
		'   <div class="yucca-control-main-header">'+
		'     <div class="yucca-control-main-label" for="yucca-control-{{widgetId}}">{{label}}</div>' + 
		'     <div class="yucca-control-main-hint">{{hint}}</div>' +
		'   </div>'+
		'	<div class="yucca-control-type-radio" ng-if="render==\'radio\' || render==\'checkbox\'">' +
		'      <div class="yucca-control-items {{flexDirection}} {{flexAlignItems}}">' +
		' 	   <div class="{{render}} yucca-control-item" ng-repeat="c in columns track by $index">' + 
		'          <label><input type="{{render}}" ng-click="toggleSelect($index)" name="yucca-control-{{widgetId}}" ng-value="c.key" ng-model="c.selectedText" selected="{{c.selected}}"} >' + 
		'     	      <span class="cr"><!--<span class="cr-img"></span>--><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>{{c.label}}<span>'+
		'          </label>'+
	    '       </div>'+
	    '     </div>' +
		'	</div>\n' + 
		'	<div class="yucca-control-type-button" ng-if="render==\'button\'">' +
		'     <div class="yucca-control-items {{flexDirection}} {{flexAlignItems}}">' +
		' 	  	<div class="yucca-control-select-button" ng-repeat="c in columns track by $index" ng-class="{\'active\': c.selected}">' + 
		'     		<a href ng-click="toggleSelect($index)">{{c.label}}</a>'+
	    '   	</div>'+
	    '     </div>'+
		'</div>\n' + 

		
        '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaControlFilter', ['$yuccaHelpers', '$rootScope',
    function ($yuccaHelpers,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/control_filter.html',
        link: function(scope, elem, attr) {
        	console.log("ngYuccaControlFilter - attr", attr);

          var widgetType = 'ngYuccaControlFilter';
          scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
          var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

          scope.label =  $yuccaHelpers.attrs.safe(attr.label, null);
          scope.placeholder =  $yuccaHelpers.attrs.safe(attr.placeholder, (scope.label==null?"":scope.label));
          scope.hint =  $yuccaHelpers.attrs.safe(attr.hint, null);
          scope.debug = attr.debug==="true"?true:false;
          scope.debugMessages = [];

          scope.filterType = $yuccaHelpers.attrs.safe(attr.filterType, 'text');
          scope.advancedFilter =  $yuccaHelpers.attrs.safe(attr.advancedFilter, 'none');

          scope.doubleRangeValues=[0,100];
          scope.filter = {};
//          scope.rangeSteps = new Array();
//          scope.selectedSteps = [-1,11];
//          for (var i = 0; i < 10; i++) {
//        	  scope.rangeSteps.push({"stepIndex":i, "selected": true, "style": "selected"});
//          }
//          
//          scope.selectRangeStep = function(index){
//        	  console.log("selectRangeStep ", index);
//        	  //scope.rangeSteps[index].selected = !scope.rangeSteps[index].selected;
//        	  if(scope.selectedSteps[0]==-1)
//        		  scope.selectedSteps[0] = index;
//        	  else if(scope.selectedSteps[1] == 11)
//        		scope.selectedSteps[1] = index;
//        	  else if(index<scope.selectedSteps[1])
//        		scope.selectedSteps[0] = index
//        	  else
//        	  	scope.selectedSteps[1] = index;
//        		  
//        	  console.log("s",scope.selectedSteps);
//        	  
//        	  refreshStepStyle();
//        	  //scope.rangeSteps[index].style = scope.rangeSteps[index].selected?"selected":"";
//          }
//          
//          scope.rangeStepHover  = function(index){
//        	  scope.rangeSteps[index].hover = true;
//        	  refreshStepStyle();
//          };
//
//          scope.rangeStepOut  = function(index){
//        	  scope.rangeSteps[index].hover = false;
//        	  refreshStepStyle();
//          };
//          
//          var refreshStepStyle  = function(){
//        	  var hoverIndex = -1
//        	  var beforeMin = false;
//        	  var afterMax = false;
//        	  for (var i = 0; i < scope.rangeSteps.length; i++) {
//        		  if(scope.rangeSteps[i].hover){
//        			  hoverIndex = i;
//        			  beforeMin
//        			  break;
//        		  }
//        	  }
//          		
//        	  for (var i = 0; i < scope.rangeSteps.length; i++) {
//        		  var step = scope.rangeSteps[i];
//        		  if(hoverIndex>0){
//        			  if(i<scope.selectedSteps[0] || i<hoverIndex)
//        				  scope.rangeSteps[i].style = "";
//        			  else if(i>scope.selectedSteps[1] || i>hoverIndex){
//        				  scope.rangeSteps[i].style = "";
//        			  }
//        			  else{ scope.rangeSteps[i].style = "selected";}
//        		  }
//        		  else{
//        			  if(i<scope.selectedSteps[0] || i>scope.selectedSteps[1])
//        				  scope.rangeSteps[i].style = "";
//        			  else{
//        				  scope.rangeSteps[i].style = "selected";
//        			  }
//        		  }
//        	  }
//          };
        		  
          var oldFilterValue = null;
		  scope.filterText = function(){
			 console.log("filterText",scope.filter, oldFilterValue);
			 if(!angular.equals(oldFilterValue,scope.filter)){
				 var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", {"column": attr.column, "value" :scope.filter.value}, eventControlId);
				 if(scope.advancedFilter)
					 event.data.advanced = scope.filter.advanced;
				 $rootScope.$broadcast ('yucca-widget-event', event);
	        	 oldFilterValue = angular.copy(scope.filter);
			 }
		  }
		  
		  scope.filterRange = function(){
			  console.log("filterRange",scope.doubleRangeValues);
			  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.range", {"values": scope.doubleRangeValues});
			  $rootScope.$broadcast ('yucca-widget-event', event);
		  }
		  
		  scope.resetAdvanced = function(){
			  scope.filter = {};
			  scope.filterText();
		  }
		  
		}

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/control_filter.html",
		'<div class="yucca-widget yucca-control-filter" id="{{widgetId}}">\n' +
		'	<div class="yucca-control-type-select" ng-if="filterType==\'text\'">' +
		'     <div class="yucca-control-main-label" for="yucca-filter-text-{{widgetId}}">{{label}}</div>' + 
		'     <div class="yucca-control-main-hint">{{hint}}</div>' + 
		'	  <input type="text" class="yucca-control-filter-text" ng-blur="filterText()" ng-model="filter.value" name="yucca-filter-text" id="yucca-filter-text-{{widgetId}}" placeholder="{{placeholder}}"/>' + 
		'     <div class="yucca-control-filter-text-advanced" ng-if="advancedFilter==\'text\'">'+
		'       <div class="radio">' + 
		'          <label><input type="radio" name="adv_text_radio_{{widgetId}}" value="exact" ng-model="filter.advanced" ng-change="filterText()" >' + 
		'     	      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>Exact<span>'+
		'          </label>'+
	    '       </div>'+
		'       <div class="radio">' + 
		'          <label><input type="radio" name="adv_text_radio_{{widgetId}}" value="startWith" ng-model="filter.advanced" ng-change="filterText()" >' + 
		'     	      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>Start with<span>'+
		'          </label>'+
	    '       </div>'+
		'       <div class="radio">' + 
		'          <label><input type="radio" name="adv_text_radio_{{widgetId}}" value="endWith" ng-model="filter.advanced" ng-change="filterText()" >' + 
		'     	      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>End with<span>'+
		'          </label>'+
	    '       </div>'+
	    '       <div class="yucca-control-reset-link"><a href ng-click="resetAdvanced()">Reset</a></div>' +
		'    </div> '	+
		'    <div class="yucca-control-filter-text-advanced" ng-if="advancedFilter==\'numeric\'">'+
		'       <div class="radio">' + 
		'          <label><input type="radio" name="adv_text_radio_{{widgetId}}" value="gt" ng-model="filter.advanced" ng-change="filterText()" >' + 
		'     	      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>&gt;<span>'+
		'          </label>'+
	    '       </div>'+
		'       <div class="radio">' + 
		'          <label><input type="radio" name="adv_text_radio_{{widgetId}}" value="ge" ng-model="filter.advanced" ng-change="filterText()" >' + 
		'     	      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>&ge;<span>'+
		'          </label>'+
	    '       </div>'+
		'       <div class="radio">' + 
		'          <label><input type="radio" name="adv_text_radio_{{widgetId}}" value="lt" ng-model="filter.advanced" ng-change="filterText()" >' + 
		'     	      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>&lt;<span>'+
		'          </label>'+
	    '       </div>'+
		'       <div class="radio">' + 
		'          <label><input type="radio" name="adv_text_radio_{{widgetId}}" value="le" ng-model="filter.advanced" ng-change="filterText()" >' + 
		'     	      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>&le;<span>'+
		'          </label>'+
	    '       </div>'+
	    '       <div class="yucca-control-reset-link"><a href ng-click="resetAdvanced()">Reset</a></div>' +
		'     </div> '	+
		'	</div>\n' + 
		'	<div class="yucca-control-type-select" ng-if="filterType==\'range\'">' +
		'     <div class="yucca-control-select-title">'+
		'        <span class="yucca-control-select-label">{{label}}</span>' + 
		'        <span class="yucca-control-select-hint">{{hint}}</span>'+
		'     </div>' + 
		'     <div class="yucca-widget-range">'+ 
		'	      <label for="yucca-filter-range-1-{{widgetId}}" class="yucca-widget-double-range-value">Min</label>' +
		'         <input type="range" class="yucca-widget-filter-range" ng-change="filterRange()" ng-model-options="{ debounce: 1500 }"  ng-model="doubleRangeValues[0]" name="yucca-filter-range-1" id="yucca-filter-range-1-{{widgetId}}"/>' + 
		'         <div class="yucca-widget-range-value">{{doubleRangeValues[0]}} %</div>'+
		'     </div>' +
		'     <div class="yucca-widget-range">'+ 
		'	      <label for="yucca-filter-range-2-{{widgetId}}" class="yucca-widget-double-range-value">Max</label>' +
		'         <input type="range" class="yucca-widget-filter-range" ng-change="filterRange()" ng-model-options="{ debounce: 1500 }"  ng-model="doubleRangeValues[1]" name="yucca-filter-range-2" id="yucca-filter-range-2-{{widgetId}}"/>' + 
		'         <div class="yucca-widget-range-value">{{doubleRangeValues[1]}} %</div>'+
		'     </div>' +
		'	</div>\n' + 
		'	<div class="yucca-control-type-select" ng-if="filterType==\'range2\'">' +
		'     <div class="yucca-control-select-title">'+
		'        <span class="yucca-control-select-label">{{label}}</span>' + 
		'        <span class="yucca-control-select-hint">{{hint}}</span>'+
		'     </div>' + 
		'     <div class="yucca-widget-double-range">'+ 
		'	      <input type="range" class="yucca-widget-filter-range yucca-widget-double-range-first" ng-change="filterRange()" max="{{doubleRangeValues[1]}}" ng-model="doubleRangeValues[0]" name="yucca-filter-text" id="yucca-filter-text-{{widgetId}}"/>' + 
		'	      <input type="range" class="yucca-widget-filter-range yucca-widget-double-range-second" ng-change="filterRange()" min="{{doubleRangeValues[0]}}" ng-model="doubleRangeValues[1]" name="yucca-filter-text" id="yucca-filter-text-{{widgetId}}" />' + 
		'     </div>' +
		'     <div class="yucca-widget-double-range-values">'+
		'         <div class="yucca-widget-double-range-values-first">Min: {{doubleRangeValues[0]}} %</div>'+
		'         <div class="yucca-widget-double-range-values-second">Max: {{doubleRangeValues[1]}} %</div>'+
		'     </div>' +
		'	</div>\n' + 
		'	<div class="yucca-control-type-select" ng-if="filterType==\'range1\'">' +
		'     <div class="yucca-control-select-title">'+
		'        <span class="yucca-control-select-label">{{label}}</span>' + 
		'        <span class="yucca-control-select-hint">{{hint}}</span>'+
		'     </div>' + 
		'     <div class="yucca-widget-slide">'+ 
		'	      <div class="yucca-widget-slide-step {{r.style}}" ng-mouseover="rangeStepHover($index)" ng-mouseout="rangeStepOut($index)" ng-click="selectRangeStep($index)" ng-repeat="r in rangeSteps track by $index">&nbsp;</div>'+ 
		'     </div>' +
		'     <div class="yucca-widget-double-range-values">'+
		'         <div class="yucca-widget-double-range-values-first">Min: {{selectedSteps[0]}} %</div>'+
		'         <div class="yucca-widget-double-range-values-second">Max: {{selectedSteps[1]}} %</div>'+
		'     </div>' +
		'	</div>\n' + 
		
        '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaControlMapFilter', ['metadataService','dataService', '$yuccaHelpers', '$http',  '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/control_map_filter.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaControlMapFilter';
            var widgetId = widgetType+new Date().getTime();
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

            scope.label =  $yuccaHelpers.attrs.safe(attr.label, null);
            scope.hint =  $yuccaHelpers.attrs.safe(attr.hint, null);
            
            var width = $yuccaHelpers.attrs.num(attr.width, null, null, 300);
            var height = $yuccaHelpers.attrs.num(attr.height, null, null, 400);

            var centered;
            
        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

            var borderColor =  $yuccaHelpers.attrs.safe(attr.borderColor, "#fff");
            var selectedColor =  $yuccaHelpers.attrs.safe(attr.selectedColor, "#aaa");
            var unselectedColor =  $yuccaHelpers.attrs.safe(attr.unselectedColor, "#ddd");

            scope.controlMapMapId = "controlMap"+new Date().getTime();

            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	if(!g.url)
            		g.url="lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json";
            	if(!g.key)
            		g.key = "name";
            	if(!g.render)
            		g.render = {};
            	if(!g.render.line)
            		g.render.line = {}
            	if(!g.render.line.weight)
            		g.render.line.weight = 1;
            	if(!g.render.line.opacity)
            		g.render.line.opacity = 1;
            	if(!g.render.line.dashcolor)
            		g.render.line.dashcolor = '#0e232e';
            	if(!g.render.line.dasharray)
            		g.render.line.dasharray = 1;
            	if(!g.render.areas)
            		g.render.areas = {}
            	if(!g.render.areas.fillopacity)
            		g.render.areas.fillopacity = .7;
            	
			}
            var geojson_data = null;
            

            
            scope.geojson= null;
            var mapLatLngs = null;
			scope.isLoading = true;

			var activeGeojson = 0;
			
			
			var svg = d3.select('svg').attr('width', width).attr('height', height);
			var g = svg.append('g');
			var mapLayer = g.append('g').classed('map-layer', true);

			d3.json(geojsons[activeGeojson].url, function(error, mapData) {
				// create a first guess for the projection
				 for (var k in mapData.features) {
					 mapData.features[k].properties.selected=false;
            	 }
			     var center = d3.geo.centroid(mapData)
			     var scale  = 1;
			     var offset = [width/2, height/2];
			     var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);

			     // create the path
			     var path = d3.geo.path().projection(projection);

			      // using the path determine the bounds of the current map and use 
			      // these to determine better values for the scale and translation
			     var bounds  = path.bounds(mapData);
			     console.log("bounds", bounds);
			     scale = 1 / Math.max((bounds[1][0]-bounds[0][0])*1.1/width, (bounds[1][1]-bounds[0][1])*1.1/height);
			     offset  = [width - (bounds[0][0] + bounds[1][0])/2,height*1.1-(bounds[0][1] + bounds[1][1])/2];
			      // new projection
			     projection = d3.geo.mercator().center(center).scale(scale).translate(offset);
			     path = path.projection(projection);				
				 // Update color scale domain based on data
				 //color.domain([0, d3.max(features, nameLength)]);

				 //mapLayer.append("rect").attr('width', width).attr('height', height);
				 // Draw each province as a path
				 mapLayer.selectAll('path')
				      .data(mapData.features)
				      .enter().append('path')
				      .attr('d', path)
				      .attr('vector-effect', 'non-scaling-stroke')
				      .style('fill', fillFn)
				      .style('stroke', borderColor)
				      .on('mouseover', highlightFeature)
				      .on('mouseout', resetHighlight)
				      .on('click', onAreaClick);
				  
				 scope.isLoading = false;
			});

			function fillFn(d){return unselectedColor;}
			
			scope.info = {"show": true};
			scope.updateInfo = function(show, content){
				$timeout(function(){
					scope.info.show= show;
					scope.info.content = content;
				},100);
			}
			var resetAllSelection = function(){
        	   console.log("reset",scope.geojson);
        	   for (var k in scope.geojson.data.features) {
        		   scope.geojson.data.features[k].properties.selected=false;
        	   }
			};

			var highlightFeature = function(d) {
        	   d3.select(this).style('fill', selectedColor);
        	   scope.updateInfo(true, d.properties.code + " " + d.properties.name);
			};

			var resetHighlight = function(d) {
        	  	mapLayer.selectAll('path').style('fill', function(d){return d.properties.selected?selectedColor: unselectedColor;});
        	  	scope.updateInfo(false, "");
			};
             
             var switchOnLayer = function(layer){
            	 layer.setStyle({weight: 1, dashArray: '', fillOpacity: 0.7, fillColor: selectedColor});
             }

             var switchOffLayer = function(layer){
            	 layer.setStyle({weight: 1, dashArray: '', fillOpacity: 0.7, fillColor: unselectedColor});
             }

             
             scope.filter = {};
             var currentSelected = null;
             function onAreaClick(d){
            	 console.log("onAreaClick", d);
            	 if(currentSelected!=null){
            		 currentSelected.properties.selected = false;
            	 }
            	 d.properties.selected = !d.properties.selected;
            	 currentSelected = d;
            	 resetHighlight();
//            	 if(selectedLayer){
//            		 selectedLayer.feature.properties.selected = false;
//            		 switchOffLayer(selectedLayer);
//            	 }
//            	 e.target.feature.properties.selected = true;
            	
//                selectedLayer = e.target;
//                switchOnLayer(e.target);

          		var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", {"column": attr.column, "value" :d.properties[geojsons[activeGeojson].key]}, eventControlId);
         		$rootScope.$broadcast ('yucca-widget-event', event);
            	 
             }
             console.log("attrs", attr);
             scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);


yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/control_map_filter.html",
    '<div class="yucca-widget  yucca-control-map-filter">\n' +
	'    <div class="yucca-control-main-label" for""yucca-filter-text-{{widgetId}}"">{{label}}</div>' + 
	'    <div class="yucca-control-main-hint">{{hint}}</div>' + 
    '    <div class="yucca-widget-control-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <svg ng-show="!isLoading"></svg>\n' + 
    '           <div class="info-panel" ng-show="info.show"><span>{{info.content}}</span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaControlSelect', ['$yuccaHelpers', '$rootScope',
    function ($yuccaHelpers,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/control_select.html',
        link: function(scope, elem, attr) {
        	console.log("ngYuccaControlSelect - attr", attr);

          var widgetType = 'ngYuccaControlSelect';
          scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());

          var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");
          scope.label =  $yuccaHelpers.attrs.safe(attr.label, null);
          scope.hint =  $yuccaHelpers.attrs.safe(attr.hint, null);
		  scope.selectEmptyLabel = $yuccaHelpers.attrs.safe(attr.selectEmptyLabel,null);
          scope.debug = attr.debug==="true"?true:false;
          scope.debugMessages = [];
          scope.selected = {};
          scope.selected.key = attr.selectedValue;
          scope.flexDirection = $yuccaHelpers.attrs.safe(attr.direction, null) == null?'':'yucca-control-direction-' + attr.direction;
          scope.flexAlignItems = $yuccaHelpers.attrs.safe(attr.alignItems, null) == null?'yucca-control-align-items-center':'yucca-control-align-items-' + attr.alignItems;
          
          
		  scope.columns = null;
		  var eventType = null;
		  var eventData = null;
		  if(attr.groupByColumns){
			  scope.columns =  attr.groupByColumns?scope.$eval(attr.groupByColumns):null;
			  eventType = "dataset.change.group_by_column";
		  }
		  else if(attr.valueColumns){		
		      scope.columns =  attr.valueColumns?scope.$eval(attr.valueColumns):null;
			  eventType = "dataset.change.value_column";
		  }
			
		  if(scope.selected.key){
			  for (var i = 0; i < scope.columns.length; i++) {
				  if(scope.columns[i].key == scope.selected.key){
					  scope.selectedIndex = i;
					  break;
				  }
			  }
		  }
		  console.log("columns", scope.columns);
		  scope.render = $yuccaHelpers.attrs.safe(attr.render, 'select'); // select, radio, button


		  scope.select = function(key){
			  console.log("select",key);
			  scope.selected.key = key;
			  var eventValue = null;
			  for (var i = 0; i < scope.columns.length; i++) {
				if(scope.columns[i].key == key)
					eventValue = scope.columns[i];
			  }
         	  var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,eventType, eventValue, eventControlId);
        	  console.log("event",event);
        	  $rootScope.$broadcast ('yucca-widget-event', event);

		  }
		}

    };
}]);

yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/control_select.html",
		'<div class="yucca-widget yucca-control-select" id="{{widgetId}}">\n' +
		'   <div class="yucca-control-main-header">'+
		'     <div class="yucca-control-main-label" for="yucca-control-{{widgetId}}">{{label}}</div>' + 
		'     <div class="yucca-control-main-hint">{{hint}}</div>' +
//		'	  <div class="yucca-control-reset-link"><a href ng-click="reset()">Reset</a></div>' +
		'   </div>'+
		'	<div class="yucca-control-type-select" ng-if="render==\'select\'">' +
		'	  <select ng-change="select(selected.key)" class="yucca-select" ng-model="selected.key" id="yucca-control-{{widgetId}}">'+
		'       <option disabled selected value>{{selectEmptyLabel}}</option>' +
		'		<option ng-repeat="c in columns  track by $index" value="{{c.key}}">{{c.label}}</option>'+ 
		'	  </select>' + 
		'	</div>\n' + 
		'	<div class="yucca-control-type-radio" ng-if="render==\'radio\'">' +
		'      <div class="yucca-control-items {{flexDirection}} {{flexAlignItems}}">' +
		' 	   <div class="radio yucca-control-item" ng-repeat="c in columns track by $index">' + 
		'          <label><input type="radio" ng-change="select(c.key)" name="yucca-control-{{widgetId}}" ng-value="c.key" ng-model="selected.key" >' + 
		'     	      <span class="cr"><!--<span class="cr-img"></span>--><i class="cr-icon glyphicon glyphicon-ok"></i></span><span>{{c.label}}<span>'+
		'          </label>'+
	    '       </div>'+
	    '     </div>' +
		'	</div>\n' + 
		'	<div class="yucca-control-type-button" ng-if="render==\'button\'">' +
		'     <div class="yucca-control-items {{flexDirection}} {{flexAlignItems}}">' +
		' 	  	<div class="yucca-control-select-button" ng-repeat="c in columns track by $index" ng-class="{\'active\': c.key==selected.key}">' + 
		'     		<a href ng-click="select(c.key)">{{c.label}}</a>'+
	    '   	</div>'+
	    '     </div>'+
		'</div>\n' + 
    '</div>\n'
    );
}]);


/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

yuccaWidgetsModule.directive('ngYuccaDatasetChoroplethMap', ['metadataService','dataService', '$yuccaHelpers', '$http', 'leafletData', '$timeout', '$compile', '$rootScope',
    function (metadataService, dataService,$yuccaHelpers,$http,leafletData,$timeout,$compile,$rootScope) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        templateUrl:'template/dataset_choropleth_map.html',
        link: function(scope, elem, attr) {

            var widgetType = 'YuccaDatasetChoroplethMap';
            scope.widgetId = $yuccaHelpers.attrs.safe(attr.widgetId,widgetType+new Date().getTime());
            
            var eventControlId = $yuccaHelpers.attrs.safe(attr.eventControlId,"EventControl");

            scope.widgetTitle=  $yuccaHelpers.attrs.safe(attr.widgetTitle, null);
            scope.widgetSubtitle=  $yuccaHelpers.attrs.safe(attr.widgetSubtitle, null);
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);

        	scope.debug = attr.debug==="true"?true:false;
            scope.debugMessages = [];

        	var user_token =  attr.usertoken;
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
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            //var countingMode  = $yuccaHelpers.attrs.safe(attr.countingMode, "count");
            //var groupOperation = $yuccaHelpers.attrs.safe(attr.groupOperation, "sum");
            //var showLegend =  attr.showLegend==="false"?false:true;
          
            var rangeColors = scope.$eval(attr.rangeColors);
            var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");

            var groupedQuery = $yuccaHelpers.attrs.safe(attr.groupedQuery, false);
        	var legendAttr= scope.$eval(attr.chartLegend);

            scope.chartWidth = $yuccaHelpers.attrs.num(attr.widgetWidth, null, null, null);
            scope.chartHeight = $yuccaHelpers.attrs.num(attr.widgetHeight, null, null, null);
//            $timeout(function(){
//            	var chartContentElement = angular.element( document.querySelector('#' + scope.widgetId+ " .yucca-widget-chart-content" ));
//            	scope.options.chart.height = chartContentElement[0].offsetHeight;
//            });
            
            var  groupByColumn= scope.$eval(attr.groupByColumn);
            if(groupByColumn==null )
        		scope.debugMessages.push("Invalid group by column");
            
            var valueColumn =scope.$eval(attr.valueColumn);
            
            
            scope.datasetChoroplethMapMapId = "map"+new Date().getTime();

            
            var geojsons = scope.$eval(attr.geojsons);
            if(!geojsons || !geojsons.length || geojsons.lenght==0)
            	geojsons = [{}];
            
            for (var gIndex = 0; gIndex < geojsons.length; gIndex++) {
            	var g = geojsons[gIndex];
            	if(!g.url)
            		g.url="lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json";
            	if(!g.key)
            		g.key = "code";
            	if(!g.render)
            		g.render = {};
            	if(!g.render.line)
            		g.render.line = {}
            	if(!g.render.line.weight)
            		g.render.line.weight = 1;
            	if(!g.render.line.opacity)
            		g.render.line.opacity = 1;
            	if(!g.render.line.dashcolor)
            		g.render.line.dashcolor = '#0e232e';
            	if(!g.render.line.dasharray)
            		g.render.line.dasharray = 1;
            	if(!g.render.areas)
            		g.render.areas = {}
            	if(!g.render.areas.fillopacity)
            		g.render.areas.fillopacity = .7;
            	
			}
//            if(!geojsons){
//            	geojsons = [{url:"lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json", 
//            				 key:"name",
//            				 render: {line:{weight:1,opacity:1, dashcolor: '#0e232e',dasharray:1},areas:{fillopacity:.7}}
//            			   }];
//            }
//            
//            
            //var geojsonAreasKey =  $yuccaHelpers.attrs.safe(attr.geojsonAreasKey, "name");
            //var geojsonUrl = $yuccaHelpers.attrs.safe(attr.geojsonUrl, "lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json");
            
//            var mapRender = scope.$eval(attr.mapRender);
//            if(!mapRender)
//            	mapRender = {};
//            if(!mapRender.line)
//            	mapRender.line={weight:1,opacity:1, dashcolor: '#0e232e',dasharray:1}
//            else{
//            	if(!mapRender.line.weigth) mapRender.line.weigth = 1;
//            	if(!mapRender.line.opacity) mapRender.line.opacity = 1;
//            	if(!mapRender.line.dashcolor) mapRender.line.dashcolor = '#0e232e';
//            	if(!mapRender.line.dasharray) mapRender.line.dasharray = 1;
//            }
//            
//            if(!mapRender.areas || !mapRender.areas.fillopacity)
//            	mapRender.areas={fillopacity:.7}

            //var mapLineWeight =  $yuccaHelpers.attrs.safe(attr.mapLineWeight, 1);
            //var mapLineOpacity =  $yuccaHelpers.attrs.safe(attr.mapLineOpacity, 1);
            //var mapLineDashColor =  $yuccaHelpers.attrs.safe(attr.mapLineDashColor, '#0e232e');
            //var mapLineDashArray =  $yuccaHelpers.attrs.safe(attr.mapLineDashArray, 1);
            //var mapAreasFillOpacity =  $yuccaHelpers.attrs.safe(attr.mapAreasFillOpacity, .7);

            //var mainChartColor =  $yuccaHelpers.attrs.safe(attr.mainChartColor, "#00bbf0");
            
            
            var mapTilesUrl = $yuccaHelpers.attrs.safe(attr.mapTilesUrl, Constants.MAP_TILES_CARTO_DB_POSITRON_URL);
            scope.mapTiles = {url: mapTilesUrl};
            var euroValue = $yuccaHelpers.attrs.safe(attr.euroValue, false);
                        
            var geojson_data = null;
            
            var skipZeroValues =  attr.skipZeroValues==="true"?true:false;
            var zoomControl = attr.zoomControl==="false"?false:true;
            var scrollWheelZoom = attr.scrollWheelZoom==="false"?false:true;
            //scope.mapControls = {"zoomControl": showZoomControl}
            scope.defaults = {
            		zoomControl: zoomControl,
            		scrollWheelZoom: scrollWheelZoom
            }
            
        	var eventConfig = $yuccaHelpers.event.readWidgetEventAttr(attr);
        	console.log("eventConfig", eventConfig);
        	var filterMap = {};
       		scope.$on('yucca-widget-event', function(e, event) {  
		       console.log("yucca-widget-event", event);  
		       if(typeof event != undefined && event!=null && event.sourceId != scope.widgetId && !$yuccaHelpers.event.ignoreEvent(event, eventConfig)){
	    		  if(event.eventtype == 'dataset.change.value_column'){
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
	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
	    				   map.eachLayer(function(layer){
	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
			    				 layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
	    					   }
	    				   });
	    			   });
	    		   }
	    		   else if(event.eventtype == 'dataset.de_highlight.group_by_column'){
	    			   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
	    				   map.eachLayer(function(layer){
	    					   if(layer.feature && layer.feature.properties[geojsons[activeGeojson].key]==event.data.key){
	    			               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
	    			            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
	    					   }
	    				   });
	    			   });
	    		   }		    	   
		       }
		       
       		});

            
            var maxValue = null;
            var minValue = null;
            scope.geojson= null;
            var mapLatLngs = null;
            scope.tableData = [];
			scope.isLoading = true;

			var activeGeojson = 0
            $http.get(geojsons[activeGeojson].url).then(function(data) {
            	geojson_data = data.data;
            	mapLatLngs = computeBound(geojson_data.features);
            	loadData();
            },function(result){
   				scope.isLoading = false;
   				console.error("Load geojson error",result);
   				scope.debugMessages.push("Load geojson error " +result );
           });
			
			
			
            
   		var odataResult = null;

   		var columnDataTypeMap = {};
        var loadData = function(){
        	console.log("map - loadData", datasetcode);
			scope.isLoading = true;
       		odataResult = null;
    		dataService.getDataEntities(datasetcode,user_token,filter,  0, 1, null).then(function(firstData){
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
    			dataService.getMultipleDataEnties(attr.datasetcode, user_token, filter,  orderby, maxData).then( function(result) {
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
			//var dataMap = {};
			console.log("prepareData", odataResult);
			//var sliceCount=0;

    		if(odataResult != null){
    			scope.isLoading = true;
    			var allData = new Array();
    			for(var i=0; i<odataResult.length; i++)
    				allData = allData.concat(odataResult[i].data.d.results);
    				
    			var data = $yuccaHelpers.data.aggregationSeriesKeyValue(allData, [valueColumn], groupByColumn.key, null,attr.mainChartColor);

    	        console.log("discrete mapData",data);
    	        if(data[0].values.length>0){
                    for(var j=0; j<data[0].values.length; j++){
                      var d = data[0].values[j];
                      console.log("d", d);
                      for(var k=0; k<geojson_data.features.length;k++){
                    	  if(d.key.toUpperCase() == geojson_data.features[k].properties[geojsons[activeGeojson].key].toUpperCase()){
                        	
                        	geojson_data.features[k].properties.value = d.value;
                        	geojson_data.features[k].properties.color = d.color;
//                        	if(typeof geojson_data.features[k].properties.value == 'undefined')
//                        		geojson_data.features[k].properties.value = 0;
//                        	if(countingMode == "count")
//                        		geojson_data.features[k].properties.value++;
//                        	else
//                        		geojson_data.features[k].properties.value += parseFloat(d[datasetAreasValueColumn]);
                        }
                      }
                    }
                    // compute statistic
                    for(var m=0; m<geojson_data.features.length; m++){
	                    //scope.tableData.push({"key": geojson_data.features[m].properties[geojsonAreasKey], "value": geojson_data.features[m].properties.value});
	                    if(geojson_data.features[m].properties.value!=0){
	                      if(maxValue==null || geojson_data.features[m].properties.value>maxValue)
	                        maxValue = geojson_data.features[m].properties.value;
	                      if(minValue==null || geojson_data.features[m].properties.value<minValue)
	                        minValue = geojson_data.features[m].properties.value;
	                    }
                    }

                    scope.geojson= {};
                    console.info("geojson_data",geojson_data);
                    scope.geojson.data = geojson_data;
                    scope.geojson.style = styleChoroplethMap;
                    scope.geojson.onEachFeature = onEachChoroplethMapFeature;
                    leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
                    	map.fitBounds(mapLatLngs);
                    });
                    if(legendAttr && legendAttr.show)
                    	createLegend();
                  }
      			  scope.isLoading = false;
    		}
			  
  			scope.isLoading = false;
    	}
            
           var computeBound = function(features){
               var latlngs = [];
               for (var k in features) {
                  if(features[k].geometry.type=="MultiPolygon"){
                	  for(var m in features[k].geometry.coordinates)
                		  for (var i in features[k].geometry.coordinates[m]){
                			  var coord = features[k].geometry.coordinates[m][i];
                			  for (var j in coord) 
                     			latlngs.push(L.GeoJSON.coordsToLatLng(coord[j]));
                		  }
                  }
                  else{
   	               	for (var i in features[k].geometry.coordinates) {
   	               		var coord = features[k].geometry.coordinates[i];
   	               		for (var j in coord) 
                  			latlngs.push(L.GeoJSON.coordsToLatLng(coord[j]));
   	               	}
                	  
                  }
               }
               return latlngs;

           };
           
           
           var refreshStyleMap = function(){
        	   leafletData.getMap(scope.datasetChoroplethMapMapId).then(function(map) {
				   map.eachLayer(function(layer){
					   if(layer.feature){
						   	 //var color = getChoropletColor(  layer.feature.properties[geojsons[activeGeojson].key]
		    				 layer.setStyle({fillColor: getChoropletColor(layer.feature.properties.value),
		    		         	  weight: geojsons[activeGeojson].render.line.weight, 
		    		         	  opacity: geojsons[activeGeojson].render.line.opacity, 
		    		         	  color: geojsons[activeGeojson].render.line.dashcolor, 
		    		         	  dashArray: geojsons[activeGeojson].render.line.dasharray,
		    		         	  fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity
		    		         });
  					   }
				   });
        	   });
           }
           
           var styleChoroplethMap = function(feature) {
              return {fillColor: getChoropletColor(feature.properties.value),
            	  weight: geojsons[activeGeojson].render.line.weight, 
            	  opacity: geojsons[activeGeojson].render.line.opacity, 
            	  color: geojsons[activeGeojson].render.line.dashcolor, 
            	  dashArray: geojsons[activeGeojson].render.line.dasharray,
            	  fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity};
           };

           var getChoropletColor = function(d) {
               var result = "#ddd";
        	   if(skipZeroValues &&  d==0){
               }
               else {
            	 if(rangeColors){
            		for(var c = 0; c<rangeColors.length;c++){ // [4,5,100,300
            			result = rangeColors[c].color;
            			if(d<=rangeColors[c].limit)
            				break;
            		}
            	 }  
            	 else{
	                 var percent = -1*((d-minValue)/(maxValue - minValue)-0.5)*1.8;
	                 result =  $yuccaHelpers.render.colorLuminance(mainChartColor, percent);
            	 }
               }
        	   return result;
           };
           
           
           
           var onEachChoroplethMapFeature = function(feature, layer) {
        	   console.log(feature, layer);
               layer.on({
                   mouseover: highlightFeature,
                   mouseout: resetHighlight,
                   click: onAreaClick,
              });
           };
                      
           scope.info = {"show": false}
           var highlightFeature = function(e) {
        	   console.log("e.target", e.target);
               var layer = e.target;
               layer.setStyle({weight: 3, dashArray: '', fillOpacity: 0.7});
               if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) 
            	   layer.bringToFront();
               scope.info.top = e.layerPoint.y+30;
               scope.info.left = e.layerPoint.x+20;
               var val = $yuccaHelpers.render.safeNumber(layer.feature.properties.value, scope.decimalValue, scope.isEuroValue());
               //console.log("layer.feature.properties",layer.feature.properties);
               scope.info.content = "<strong>" + groupByColumn.label + "</strong>: " + layer.feature.properties[geojsons[activeGeojson].key] + " <br>" +
               "<strong>" + valueColumn.label  +"</strong>: " + val;
               scope.info.show = true;
               if(!$yuccaHelpers.event.ignoreEvent({eventtype: "evtHighlightGroupbycolumn"}, eventConfig)){ 
	   				var eventData = {};
					eventData.key = layer.feature.properties[geojsons[activeGeojson].key];
					eventData.value = layer.feature.properties.value;
					eventData.color = getChoropletColor(layer.feature.properties.value);
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.highlight.group_by_column", eventData);
					event.eventControlId = eventControlId;
		        	$rootScope.$broadcast ('yucca-widget-event', event);
               }
             };

             function resetHighlight(e) {
            	 var layer = e.target;
               layer.setStyle({weight: geojsons[activeGeojson].render.line.weight, opacity: geojsons[activeGeojson].render.line.opacity, 
            	   color: geojsons[activeGeojson].render.line.dashcolor, dashArray: geojsons[activeGeojson].render.line.dasharray,fillOpacity:  geojsons[activeGeojson].render.areas.fillopacity});
               scope.info.show = false;
               if(!$yuccaHelpers.event.ignoreEvent({eventtype: "evtHighlightGroupbycolumn"}, eventConfig)){ 
	   				var eventData = {};
					eventData.key = layer.feature.properties[geojsons[activeGeojson].key];
					eventData.value = layer.feature.properties.value;
					eventData.color = getChoropletColor(layer.feature.properties.value);
					var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.de_highlight.group_by_column", eventData);
					event.eventControlId = eventControlId;
		        	$rootScope.$broadcast ('yucca-widget-event', event);
              }
             };
             
             
             function onAreaClick(e){
            	 console.log("onAreaClick", e);
            	 if(datasetcode){
	            	 //var event = $yuccaHelpers.event.createEvent(widgetId,
	            	//		 widgetType,
	            	//		 "dataset.filter.column", 
	            	//		 {"datasetcode": datasetcode, "column": groupByColumn.key, "value": e.target.feature.properties[geojsons[activeGeojson].key]});
            		 var event = $yuccaHelpers.event.createEvent(scope.widgetId,widgetType,"dataset.filter.text", 
            				 {"datasetcode": datasetcode,"column": groupByColumn.key, "value" :e.target.feature.properties[geojsons[activeGeojson].key]});
 					event.eventControlId = eventControlId;
              		 $rootScope.$broadcast ('yucca-widget-event', event);
            		 console.log("event",event);
	            	 $rootScope.$broadcast ('yucca-widget-event', event);
            	 }
            	 
             }
             
             var createLegend = function(){
            	 var legendColors = [];
            	 var legendLabels = [];
       
            	 if(rangeColors){
            		 legendColors.push(rangeColors[0].color);
            		 legendLabels.push("<" + $yuccaHelpers.render.safeNumber(rangeColors[0].limit, scope.decimalValue, scope.isEuroValue()));
	            	 for(var i=1;i<rangeColors.length-1; i++){
		            	 legendColors.push(rangeColors[i].color);
		            	 legendLabels.push("" + $yuccaHelpers.render.safeNumber(rangeColors[i-1].limit, scope.decimalValue, scope.isEuroValue()) + " - " 
		            			 + $yuccaHelpers.render.safeNumber(rangeColors[i].limit, scope.decimalValue, scope.isEuroValue()));
	            	 }
            		 legendColors.push(rangeColors[rangeColors.length-1].color);
            		 legendLabels.push(">" + $yuccaHelpers.render.safeNumber(rangeColors[rangeColors.length-1].limit, scope.decimalValue, scope.isEuroValue()));
	        	 }
            	 else{
	            	 var step = (maxValue - minValue)/5;
	            	 for(var i=0;i<5; i++){
	                	 var percent = -0.9*(i-2);
	                    
		            	 legendColors.push($yuccaHelpers.render.colorLuminance(mainChartColor, percent));
		            	 if(i==0)
		            		 legendLabels.push("<" + $yuccaHelpers.render.safeNumber(step+minValue, scope.decimalValue, scope.isEuroValue()));
		            	 else if(i==5-1)
		            		 legendLabels.push(">" + $yuccaHelpers.render.safeNumber(maxValue-step, scope.decimalValue, scope.isEuroValue()));
		            	 else
		            		 legendLabels.push("" + $yuccaHelpers.render.safeNumber(minValue + step*i, scope.decimalValue, scope.isEuroValue()) + " - " + $yuccaHelpers.render.safeNumber(minValue + step*(i+1), scope.decimalValue, scope.isEuroValue()));
	
	            		 
	            	 }
            	 }
                 scope.legend =  {
                         position: legendAttr.position,
                         colors: legendColors,
                         labels: legendLabels
                     };
            	 
             };
             

        	//loadIds();
            console.log("attrs", attr);
            scope.widgetTitle = attr.widgetTitle;
            scope.widgetIntro = $yuccaHelpers.attrs.safe(attr.widgetIntro, null);
        	scope.MAP_PIEDMONT_CENTER =  {lat: 45.3522366, lng: 7.515388499999972, zoom: 7};


        }

    };
}]);



yuccaWidgetsTemplatesModule.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dataset_choropleth_map.html",
    '<div class="yucca-widget yucca-dataset-choropleth-map" id="{{widgetId}}">\n' +
    '    <widget-header widget-title="{{widgetTitle}}" widget-subtitle="{{widgetSubtitle}}" ></widget-header>\n' +
    '    <div class="yucca-widget-intro" ng-if="widgetIntro!=null">{{widgetIntro}}</div>\n' +
    '    <div class="yucca-widget-chart-content">\n' +
    '        <section>\n' +
    '           <div ng-if="isLoading" class="yucca-dataset-discretebar-chart-loading" >\n' +
    '             <div class="yucca-widget-spinner"><div class="bullet1"></div><div class="bullet2"></div><div class="bullet3"></div></div>\n' +
    '           </div>\n' +
    '           <leaflet ng-attr-id="{{datasetChoroplethMapMapId}}"  defaults="defaults" tiles="mapTiles" bounds="mapBounds" geojson="geojson" class="yucca-dataset-choropleth-map-map" ng-if="geojson!=null" legend="legend" controls="mapControls"></leaflet>\n' + 
    '           <div class="info-panel" ng-show="info.show" style="top:{{info.top}}px; left:{{info.left}}px"><span ng-bind-html="info.content"></span></div>  '+ 
    '        </section>\n' + 
    '        <section class="yucca-widget-debug" ng-show="debug && debugMessages.length>0">\n' +
    '          	<ul><li ng-repeat="m in debugMessages track by $index">{{m}}</li></ul>\n' +
    '        </section>\n' +
    '    </div>\n' +
    '    <widget-footer ng-if="showFooter" widget-footer-text="{{footerText}}"><widget-footer>\n' +
    '</div>\n'
    );
}]);

