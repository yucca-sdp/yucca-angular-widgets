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

