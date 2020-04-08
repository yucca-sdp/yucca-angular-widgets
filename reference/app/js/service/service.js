'use strict';

/* Services */

app.factory('metadataapiAPIservice',["$http","$q", "$rootScope", function($http, $q, $rootScope) {

	var metadataapiAPI = {};
	
	
	
	metadataapiAPI.loadTenants = function(){

		var headers_with_token = {};
		var metadataapiUrl = 'https://api.smartdatanet.it/metadataapi/api/v02/search?rows=0&facet.field=tenantCode';
		if($rootScope.currentUser && $rootScope.currentUser.user.loggedIn)
			headers_with_token = {'Authorization': "Bearer "+$rootScope.currentUser.user.token};
		
		return $http({
			cache: true,
			method : 'GET',
			url : metadataapiUrl,
			headers: headers_with_token
		});
		
	};

	metadataapiAPI.loadDatasets = function(tenantcode){

		var headers_with_token = {};
		var metadataapiUrl = 'https://api.smartdatanet.it/metadataapi/api/v02/search?rows=1000';
		if(tenantcode)
			metadataapiUrl += '&tenant=' +tenantcode;
		if($rootScope.currentUser && $rootScope.currentUser.user.loggedIn)
			headers_with_token = {'Authorization': "Bearer "+$rootScope.currentUser.user.token};
		
		return $http({
			cache: true,
			method : 'GET',
			url : metadataapiUrl,
			headers: headers_with_token
		});
		
	};
	
	metadataapiAPI.loadDatasetDetail = function(datasetcode, usertoken){
		if(datasetcode){
			var headers_with_token = {};
			var metadataapiUrl = 'https://api.smartdatanet.it/metadataapi/api/v02/detail/' + datasetcode;
			if(!usertoken && $rootScope.currentUser && $rootScope.currentUser.user.loggedIn)
				usertoken = $rootScope.currentUser.user.token;
			if(usertoken)
				headers_with_token = {'Authorization': "Bearer "+usertoken};
			
			return $http({
				cache: true,
				method : 'GET',
				url : metadataapiUrl,
				headers: headers_with_token
			});
		}
	};
	
	var search = function(apiVersion,q, lang, pagination,filter, geolocalization, facet) {
		if(apiVersion==null)
			apiVersion= 'v02';
		
		var metadataapiUrl = Constants.API_METADATA_URL + apiVersion + '/search?';
		
		
		
		
		if(q!=null) 
			metadataapiUrl += '&q='+q;
		
		if(lang!=null) 
			metadataapiUrl += '&lang='+lang;
		
		if(pagination!=null){
			if(typeof pagination.start != 'undefined' && pagination.start!=null) 
				metadataapiUrl += '&start='+pagination.start;
			if(typeof pagination.rows != 'undefined' && pagination.rows!=null) 
				metadataapiUrl += '&rows='+pagination.rows;
			if(typeof pagination.sort != 'undefined' && pagination.sort!=null) 
				metadataapiUrl += '&sort='+pagination.sort;
		}
		
		if(filter!=null){
			console.log("filter", filter);
			if(typeof filter.tenantCode != 'undefined' && filter.tenantCode!=null && filter.tenantCode.length>0) 
				metadataapiUrl += '&tenant='+encodeURIComponent(filter.tenantCode.join(","));
			if(typeof filter.organizationCode != 'undefined' && filter.organizationCode!=null && filter.organizationCode.length>0) 
				metadataapiUrl += '&organization='+encodeURIComponent(filter.organizationCode.join(","));
			if(typeof filter.domainCode != 'undefined' && filter.domainCode!=null && filter.domainCode.length>0) 
				metadataapiUrl += '&domain='+encodeURIComponent(filter.domainCode.join(","));
			if(typeof filter.subdomainCode != 'undefined' && filter.subdomainCode !=null && filter.subdomainCode.length>0) 
				metadataapiUrl += '&subdomain='+encodeURIComponent(filter.subdomainCode.join(","));
			if(typeof filter.tagCode != 'undefined' && filter.tagCode!=null && filter.tagCode.length>0) 
				metadataapiUrl += '&tags='+encodeURIComponent(filter.tagCode.join(","));
			if(typeof filter.opendata != 'undefined' && filter.opendata!=null) 
				metadataapiUrl += '&opendata='+opendata;
			
			if(typeof filter.visibility != 'undefined' && filter.visibility!=null) 
				metadataapiUrl += '&visibility='+filter.visibility;
			if(typeof filter.opendata != 'undefined' && filter.opendata!=null) 
				metadataapiUrl += '&opendata='+opendata;
			if(typeof filter.isSearchExact != 'undefined' && filter.isSearchExact!=null) 
				metadataapiUrl += '&isSearchExact='+filter.isSearchExact;
			if(typeof filter.includeSandbox != 'undefined' && filter.includeSandbox!=null) 
				metadataapiUrl += '&includeSandbox='+filter.includeSandbox;
			if(typeof filter.hasStream != 'undefined' && filter.hasStream!=null) 
				metadataapiUrl += '&hasStream='+hasStream;
			if(typeof filter.hasDataset != 'undefined' && filter.hasDataset!=null) 
				metadataapiUrl += '&hasDataset='+hasDataset;

			if(typeof filter.entityType != 'undefined' && filter.entityType!=null){
				for (var entityTypeIndex = 0; entityTypeIndex < filter.entityType.length; entityTypeIndex++) {
					if(filter.entityType[entityTypeIndex] == 'stream')
						metadataapiUrl += '&hasStream=true';
					if(filter.entityType[entityTypeIndex] == 'dataset')
						metadataapiUrl += '&hasDataset=true';
						
				}
			}
				
		}
		
		console.log("filter", filter);
		
		if(geolocalization!=null){
			if(typeof geolocalization.geolocalized != 'undefined' && geolocalization.geolocalized!=null) 
				metadataapiUrl += '&geolocalized='+geolocalization.geolocalized;
			if(typeof geolocalization.minLat != 'undefined' && geolocalization.minLat!=null) 
				metadataapiUrl += '&minLat='+geolocalization.minLat;
			if(typeof geolocalization.minLon != 'undefined' && geolocalization.minLon!=null) 
				metadataapiUrl += '&minLon='+geolocalization.minLon;
			if(typeof geolocalization.maxLat != 'undefined' && geolocalization.maxLat!=null) 
				metadataapiUrl += '&maxLat='+geolocalization.maxLat;
			if(typeof geolocalization.maxLon != 'undefined' && geolocalization.maxLon!=null) 
				metadataapiUrl += '&maxLon='+geolocalization.maxLon;
		}

		
		
	
		if(facet!=null){
			if(typeof facet.field != 'undefined' && facet.field!=null) 
				metadataapiUrl += '&facet.field='+ facet.field;
			if(typeof facet.prefix != 'undefined' && facet.prefix!=null) 
				metadataapiUrl += '&facet.prefix='+ facet.prefix;
			if(typeof facet.sort != 'undefined' && facet.sort!=null) 
				metadataapiUrl += '&facet.sort='+ facet.sort;
			if(typeof facet.contains != 'undefined' && facet.contains!=null){
				metadataapiUrl += '&facet.contains='+ facet.contains;
				if(typeof facet.contains.ignoreCase != 'undefined' && facet.contains.ignoreCase!=null) 
					metadataapiUrl += '&facet.contains.ignoreCase='+ facet.contains.ignoreCase;
			}
			if(typeof facet.limit != 'undefined' && facet.limit!=null)
				metadataapiUrl += '&facet.limit='+ facet.limit;
			if(typeof facet.offset != 'undefined' && facet.offset!=null) 
				metadataapiUrl += '&facet.offset='+ facet.offset;
			if(typeof facet.mincount != 'undefined' && facet.mincount!=null) 
				metadataapiUrl += '&facet.mincount='+ facet.mincount;
			if(typeof facet.missing != 'undefined' && facet.missing!=null) 
				metadataapiUrl += '&facet.missing='+ facet.missing;
			if(typeof facet.pivot != 'undefined' && facet.pivot!=null) {
				metadataapiUrl += '&facet.pivot='+ facet.pivot;
				if(typeof facet.pivot.mincount != 'undefined' && facet.pivot.mincount!=null) 
					metadataapiUrl += '&facet.pivot.mincount='+ facet.pivot.mincount;
			}

		}
		

		console.log("metadataapiAPI.search - metadataapiUrl", metadataapiUrl);
		var token = info.getStoreToken();
		console.log("metadataapiAPI.search - storeToken", info.getStoreToken());

		var headers_with_token = {};
		if($rootScope.currentUser && $rootScope.currentUser.user.loggedIn)
			headers_with_token = {'Authorization': "Bearer "+$rootScope.currentUser.user.token};
		return $http({
			method : 'GET',
			url : metadataapiUrl,
			headers: headers_with_token
		});
	};
	
	metadataapiAPI.detailStream = function(apiVersion,tenantCode, soCode, streamCode) {
		if(apiVersion==null)
			apiVersion= 'v02';
		//http://localhost:8080/metadataapi/api/v02/detail/smartlab/SmartdatanetEventi/artissimaTorino
		var metadataapiUrl = Constants.API_METADATA_URL + apiVersion + '/detail/' + tenantCode + '/' + soCode + '/' + streamCode + '?';

		console.log("metadataapiAPI.detailStream - metadataapiUrl", metadataapiUrl);
		var token = info.getStoreToken();
		console.log("metadataapiAPI.search - storeToken", info.getStoreToken());

		var headers_with_token = {};
		if($rootScope.currentUser && $rootScope.currentUser.user.loggedIn)
			headers_with_token = {'Authorization': "Bearer "+$rootScope.currentUser.user.token};
		return $http({
			method : 'GET',
			url : metadataapiUrl,
			headers: headers_with_token
		});
	};
	
	metadataapiAPI.detailDataset = function(apiVersion,datasetCode) {
		if(apiVersion==null)
			apiVersion= 'v02';
		//http://localhost:8080/metadataapi/api/v02/detail/smartlab/SmartdatanetEventi/artissimaTorino
		var metadataapiUrl = Constants.API_METADATA_URL + apiVersion + '/detail/' + datasetCode + '?';

		console.log("metadataapiAPI.detailDataset - metadataapiUrl", metadataapiUrl);
		var token = info.getStoreToken();
		console.log("metadataapiAPI.search - storeToken", info.getStoreToken());

		var headers_with_token = {};
		if($rootScope.currentUser && $rootScope.currentUser.user.loggedIn)
			headers_with_token = {'Authorization': "Bearer "+$rootScope.currentUser.user.token};
		return $http({
			method : 'GET',
			url : metadataapiUrl,
			headers: headers_with_token
		});
	};


	return metadataapiAPI;
}]);

app.factory('userportalAPIservice',["$http","$q", function($http, $q) {

	var userportalAPI = {};
	var userportalUrl = 'https://userportal.smartdatanet.it/userportal';
	
	
	
	userportalAPI.getCurrentUser = function(activeTenant){

		var currentUserUrl = userportalUrl+'/api/info?callback=JSON_CALLBACK';
		if(typeof activeTenant!='undefined' && activeTenant!=null)
			currentUserUrl += "&activeTenant="+activeTenant.tenantcode;

		return $http({
			method : 'JSONP',
			url : currentUserUrl
		});
		
	};
	
	userportalAPI.loadUsertokens = function(){

		var currentUserUrl = userportalUrl+'/api/proxy/store/site/blocks/secure/subscription.jag?action=getAllSubscriptions&application=s&callback=JSON_CALLBACK';

		return $http({
			method : 'JSONP',
			url : currentUserUrl
		});
		
	};

	return userportalAPI;
}]);

app.factory('extAPIservice',["$http","$q", function($http, $q) {

	var extAPI = {};
	
	
	
	extAPI.getGooglefontsList = function(){

		var googlefontUrl = 'https://fonts.google.com/metadata/fonts';
		return $http({
			method : 'JSONP',
			url : googlefontUrl
		});
		
	};


	return extAPI;
}]);