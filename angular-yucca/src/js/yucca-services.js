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

