'use strict';

app.controller('ComposerCtrl', ['$scope', '$compile', '$uibModal','readFilePreview','metadataapiAPIservice', '$timeout', 'localStorageService','$location',
	function($scope, $compile, $uibModal,readFilePreview,metadataapiAPIservice,$timeout,localStorageService,$location) {

	$scope.widgets = Widgets;
	$scope.current = null;
	
	$scope.dashboardsDraftList = new Array();
	
	var loadDashboardsDraftList = function(){
		var lsKeys = localStorageService.keys();
		console.log("lsKeys",lsKeys);
		$scope.dashboardsDraftList = new Array();
		if(lsKeys){
			for (var i = 0; i < lsKeys.length; i++) {
				if(lsKeys[i].startsWith("yucca-dashboard-")){
					var lsItem = localStorageService.get(lsKeys[i]);
					$scope.dashboardsDraftList.push({key:lsKeys[i], name:lsKeys[i].substr("yucca-dashboard-".length), date: lsItem.lastupdate, dashboard: lsItem.dashboard});
				}				
			}
		}
	
	};
	
	$scope.loadDashboardDraft = function(draftIndex){
		if($scope.dashboardsDraftList[draftIndex]){
			console.log("loadDashboardDraft",$scope.dashboardsDraftList[draftIndex]);
			console.log("loadDashboardDraft",$scope.accordions.opendashboard);
			$scope.dashboard = retrocompatibilityFix($scope.dashboardsDraftList[draftIndex].dashboard);
			
			$timeout(function(){$scope.accordions.opendashboard = !$scope.accordions.opendashboard;});
		}
	};

	$scope.deleteDashboardDraft = function(draftIndex){
		if($scope.dashboardsDraftList[draftIndex]){
			localStorageService.remove($scope.dashboardsDraftList[draftIndex].key);
			loadDashboardsDraftList();
		}
	};
	
	var retrocompatibilityFix = function(loadedDashboard){
		console.log("$scope.widgets",$scope.widgets, loadedDashboard);
		console.log("loadedDashboard",loadedDashboard);
		var fixedDashboard = loadedDashboard;
		if(loadedDashboard){
			for (var i = 0; i < loadedDashboard.components.length; i++) {
				
				// get current widget
				var currentWidget = null;
				for (var wKey in $scope.widgets) {
					if ($scope.widgets.hasOwnProperty(wKey) && $scope.widgets[wKey][loadedDashboard.components[i].content.key]) {
						currentWidget = $scope.widgets[wKey][loadedDashboard.components[i].content.key];
						break;
					}
				}
				if(currentWidget){					
					for (var pSectionKey in currentWidget.params) {
						if (currentWidget.params.hasOwnProperty(pSectionKey)) {
							if(!loadedDashboard.components[i].content.params[pSectionKey]){
								loadedDashboard.components[i].content.params[pSectionKey] = angular.copy(currentWidget.params[pSectionKey])
							}
							else{
								for (var pKey in currentWidget.params[pSectionKey]) {
									if (currentWidget.params[pSectionKey].hasOwnProperty(pKey) && !loadedDashboard.components[i].content.params[pSectionKey][pKey]
									) {
										loadedDashboard.components[i].content.params[pSectionKey][pKey] = angular.copy(currentWidget.params[pSectionKey][pKey]);
									}
								}
							}
							
						}
					}
				}

				
			}

		}
		return fixedDashboard;
	}
	
	loadDashboardsDraftList();
//	$scope.allTenant = [];
//	metadataapiAPIservice.loadTenants().then(
//		function(result){
//			if(result && result!=null){
//				try{
//					var tenantItems = result.data.facetCount.facetFields.tenantCode.facetItems;
//					angular.forEach(tenantItems, function(count, tenantcode) {
//						if(count>0)
//							$scope.allTenant.push(tenantcode);
//					});
//					$scope.allTenant.sort();
//				}
//				catch(err){
//					console.warn("loadTenants error" , err);
//				} 			
//			}
//		},
//		function(result){
//			console.error("loadTenants error", result);
//		}
//	);
	
	var mainContainerElement = document.getElementById("content");
	
	
	
	$scope.dashboard = {"name": "New Dashboard", "components": new Array(), "style": null};
	
	$scope.$watch('dashboard', function(newValue, oldValue) {
		if(newValue!==oldValue) 
			refreshPreviewPage();
	}, true);
	
	$scope.openDashboardConfigDialog = function(){
		var modalInstance = $uibModal.open({
			animation: true, backdrop  : 'static',
			size: 'lg',
		    templateUrl: 'partials/modal/DashboardConfigDialog.html',
		    controller: 'DashboardConfigDialogInstanceCtrl',
		    resolve: {
		    	dashboard: function () {return $scope.dashboard;},
		    }
		});
		
		modalInstance.result.then(function (dashboard) {
			console.log("DashboardConfigDialog result dashboard",dashboard);
			if(dashboard){
				$scope.dashboard = angular.copy(dashboard);
				refreshDashboardStyle();
			}
				
		}, function () {
		});
	};

	var refreshDashboardStyle = function(){
		var style = "";
		if($scope.dashboard.styles)
			for (var k in $scope.dashboard.styles) {
				if ($scope.dashboard.styles.hasOwnProperty(k)) {
					style += k + ":" + $scope.dashboard.styles[k] + ";";
				}
		    }

		$scope.dashboard.styleGlobal = "";
		if($scope.dashboard.fontTitleName || $scope.dashboard.fontTextName){
			var fontNames = new Array();
			if($scope.dashboard.fontTitleName)
				fontNames.push($scope.dashboard.fontTitleName.split(' ').join('+'));
			if($scope.dashboard.fontTextName)
				fontNames.push($scope.dashboard.fontTextName.split(' ').join('+'));
			
			$scope.dashboard.styleGlobal += "@import url(https://fonts.googleapis.com/css?family=" + fontNames.join("|") + ");"

			if($scope.dashboard.fontTitleName)
				$scope.dashboard.styleGlobal += "h1,h2{font-family:'"+ $scope.dashboard.fontTitleName + "'}";
			
			if($scope.dashboard.fontTextName)
				$scope.dashboard.styleGlobal += "body{font-family:'"+ $scope.dashboard.fontTextName + "'}";
			
		}
		
		

//		if($scope.dashboard.background)
//			style += "background-color: " + $scope.dashboard.background + ";"
		
		if($scope.dashboard.widgetPositionType == "absolute"){
			style += "position: relative;";
			for (var i = 0; i < $scope.dashboard.components.length; i++) {
				var c = $scope.dashboard.components[i];
				var cElement = document.getElementById(c.componentId );
				console.log("", cElement.offsetTop);
				c.styles["top"] = cElement.offsetTop  - mainContainerElement.offsetTop + "px";
				c.styles["left"] = cElement.offsetLeft  - mainContainerElement.offsetLeft + "px";
			}
		}
		else{
			for (var i = 0; i < $scope.dashboard.components.length; i++) {
				var c = $scope.dashboard.components[i];
				delete  c.styles["top"];
				delete  c.styles["left"];
			}
			
			if($scope.dashboard.widgetPositionType == "grid"){
				style += "display: grid;" + $scope.dashboard.grid.style;
					
				var counter = 0;
				var gridNames = [];
				for (var i = 0; i < $scope.dashboard.grid.rows.length; i++) {
					for (var j = 0; j < $scope.dashboard.grid.rows[i].length; j++) {
						if(gridNames.indexOf($scope.dashboard.grid.rows[i][j])<0){
							if(!$scope.dashboard.components[counter]){
								var emptyComponent = {"componentId": "component_"+counter, "type": "yucca-empty", 
										"content": {}, 
										"styles": {}
								};
								$scope.dashboard.components.push(emptyComponent);
							}
							
							$scope.dashboard.components[counter].gridName=$scope.dashboard.grid.rows[i][j];
							counter++;
							gridNames.push($scope.dashboard.grid.rows[i][j]);
						}
					}
				}
								
				for (var i = 0; i < $scope.dashboard.components.length; i++) {
					var c = $scope.dashboard.components[i];
					$scope.dashboard.styleGlobal += "#" + c.componentId + "{grid-area: " + c.gridName + "}";
					$scope.dashboard.styleGlobal += "#composer-content #content .component-card {margin: 0}";
				}
				$scope.dashboard.style = style;
			}
		}
		console.log("dashboard",$scope.dashboard);
		
	};
	
	$scope.getDashboardCss = function(){
		var css = "";
		if($scope.dashboard){
			//console.log("getDashboardCss",$scope.dashboard);
			if($scope.dashboard.styleGlobal)
				css += $scope.dashboard.styleGlobal; 
			css += "#composer-content #content{" + $scope.dashboard.style + "}";
			if($scope.dashboard.components){
				for (var cKey in $scope.dashboard.components) {
				    if ($scope.dashboard.components.hasOwnProperty(cKey) ) {
				    	css += "#" + $scope.dashboard.components[cKey].componentId + "{";
						for (var sKey in $scope.dashboard.components[cKey].styles) {
						    if ($scope.dashboard.components[cKey].styles.hasOwnProperty(sKey) ) {
						    	css += sKey + ":" + $scope.dashboard.components[cKey].styles[sKey]+";";
						    }
						}
				    	css += "}";
				    }
				}
			}
		}
		return css;
	};

	// LaReteDistri_3267
	// StudentiPiem_2096
	// PosizioneGiu_2088
	// StudentiStra_2089

//	$scope.htmlelements = [
//			{
//				key: 'text',	
//				name: 'html_text',
//				html: function(){return '<div class="yucca-html_text">' + this.params.content.values + '</div>';},
//				params: {'content': {'name':'content','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'Text', 'default':'','custom':''}},
//				advancedParams: {},
//				styles: {'yucca-html_text':{'name':'yucca-html_text','desc':'yucca-html_text','custom':''}}
//			},{
//				key: 'image',	
//				name: 'html_image',
//				html: function(){return '<img src="' + this.params.imageurl.values + '" />';},
//				params: {'imageurl': {'name':'imageurl','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'/images/img-placeholder.png', 'default':'','custom':''}},
//				advancedParams: {},
//				styles: {'yucca-html_text':{'name':'yucca-html_text','desc':'yucca-html_text','custom':''}}
//			}
//		];
	
	$scope.dragdrop = {isDragging:false};

	var componentCounter = 0;
	$scope.onDropComponent = function($data,$event){
		console.log("onDropComponent", $data, $event);
		console.log("offsetLeft", $event.element[0].offsetLeft);
		console.log("offsetTop", $event.element[0].offsetTop);
		console.log("onDropCompoennt Left Top", $event.element[0].getBoundingClientRect().left, $event.element[0].getBoundingClientRect().top);

		
		//var x = $event.x - $event.target.offsetParent.offsetLeft- $event.target.offsetLeft;
	    //var y = $event.y - $event.target.offsetParent.offsetTop - $event.target.offsetTop;
		$scope.addWidget($data, $scope.currentElementCoordinates.x, $scope.currentElementCoordinates.y);
	};
	
	$scope.composerCoordinates = {x:0,y:0}
	$scope.captureCoordinate = function($event){
		$scope.composerCoordinates.x = parseInt($event.x - mainContainerElement.getBoundingClientRect().left);
		$scope.composerCoordinates.y = parseInt($event.y -  mainContainerElement.getBoundingClientRect().top);
	};
	
	$scope.currentElementCoordinates = {x:0,y:0}

	$scope.addWidget = function($data, x, y){
		console.log("addWidget", x, y);
		
		var index = 0;
		if($scope.dragdrop.isDragging){
			if($data &&  typeof $data.componentId == 'undefined'){ // new component
				var component_type = $data.name.split("_")[0];
				console.log("component_type",component_type)
				var newComponent = {"componentId": "component_"+componentCounter, "type": "yucca-"+component_type,
						"content": angular.copy($data), 
						"styles": {}};

				if($scope.dashboard.widgetPositionType == "absolute"){
					//newComponent.content.styles["common"]["yucca_widget"].custom = "margin: 0;";

					newComponent.styles["top"] = y + "px;";
					newComponent.styles["left"] = x + "px";
					newComponent.styles["position"] = "absolute";
					newComponent.styles["margin"] = "0";
					
				}
				if($scope.dashboard.widgetPositionType == "grid"){
					for (var i = 0; i < $scope.dashboard.components.length; i++) {
						if($scope.dashboard.components[i].componentId == newComponent.componentId){
							newComponent.gridName = $scope.dashboard.components[i].gridName;
							$scope.dashboard.components[i]= newComponent;
							break;
						}
					}
				}
				else
					$scope.dashboard.components.push(newComponent);
				$scope.current = newComponent;
				$scope.editComponentConfig(newComponent);
				componentCounter++;
				
			}
			else{
				if(typeof $data != 'undefined' && $data != null && typeof $data.componentId != 'undefined' && $scope.dashboard.widgetPositionType == "absolute"){
					index = parseInt($data.componentId.replace("component_",""));
					//$scope.dashboard.components[index].content.styles["common"]["yucca_widget"].custom = "margin: 0;";

					$scope.dashboard.components[index].styles["top"] = y + "px";
					$scope.dashboard.components[index].styles["left"] = x + "px";
					$scope.dashboard.components[index].styles["position"] = "absolute";
					$scope.dashboard.components[index].styles["margin"] = "0";
					$scope.current = $scope.dashboard.components[index];

				}
				
			}
			
			$scope.dragdrop.isDragging=false;
		}
		
//		if($scope.dashboard.widgetPositionType == "absolute"){
//			
//			if(typeof $data != 'undefined' && $data != null && typeof $data.componentId != 'undefined')
//				index = parseInt($data.componentId.replace("component_",""));
//			
//			var originalX = parseInt($scope.dashboard.components[index].styles["left"].replace("px",""));
//			var originalY = parseInt($scope.dashboard.components[index].styles["top"].replace("px",""));
//			
//			//$scope.dashboard.components[index].styles["top"] = (y + originalY) + "px";
//			//$scope.dashboard.components[index].styles["left"] = (x + originalX) + "px";
//		}
	};
	
	$scope.accordions = {"widget": {"basic":true}, "htmlelement": false, "params": {"mandatory_params":true}, "events": {"event_listening":true, "event_sending": true}, "export": false, "opendashboard": false};
	
	$scope.onMoveDropComplete = function (index, obj, evt) {
		console.log("evy", index, obj, evt);
		if($scope.dashboard.widgetPositionType != "absolute"){
	        var otherObj = $scope.dashboard.components[index];
	        var otherIndex = $scope.dashboard.components.indexOf(obj);
	        if(otherIndex>0){
	        	$scope.dashboard.components[index] = obj;
	        	$scope.dashboard.components[otherIndex] = otherObj;
	        	if($scope.dashboard.widgetPositionType == "grid"){
	        		var gridNameTmp = $scope.dashboard.components[index].gridName;
	        		$scope.dashboard.components[index].gridName = $scope.dashboard.components[otherIndex].gridName;
	        		$scope.dashboard.components[otherIndex].gridName = gridNameTmp;
	        		refreshDashboardStyle();
	        	}
	        	if($scope.isResizing)
	        		$scope.isResizing = false;
	        }
		}
	};
	
    var refreshPreviewPage = function(){
    	localStorageService.set("yucca-dashboard-"+$scope.dashboard.name,{lastupdate: new Date().getTime(), dashboard:  $scope.dashboard} )
    	localStorageService.set("yucca-widget-preview", $scope.dashboard);
    };
    
	
	var currentResizeStart = {w:0,h:0, x:0, y:0};
	
	$scope.isResizing=false;
	
	$scope.onStartResizeComponent = function($data,$event, type){

		console.warn("start");
		currentResizeStart.type = type;
		currentResizeStart.w=document.getElementById($data.componentId).clientWidth;
		currentResizeStart.h=document.getElementById($data.componentId).clientHeight;
		currentResizeStart.x=$event.x;
		currentResizeStart.y=$event.y; 
		$scope.isResizing = true;
	};
	
	$scope.onFinishResizeComponent = function(){
		console.warn("end");
		$scope.isResizing = false;
	};

	$scope.onResizeComponent = function($data,$event){
		//console.log("onDropCompoennt Left Top", $event.element[0].getBoundingClientRect().left, $event.element[0].getBoundingClientRect().top);
		$scope.currentElementCoordinates.x = parseInt($event.element[0].getBoundingClientRect().left - mainContainerElement.getBoundingClientRect().left);
		$scope.currentElementCoordinates.y = parseInt($event.element[0].getBoundingClientRect().top -  mainContainerElement.getBoundingClientRect().top);
		
		if($scope.isResizing){
			var newWidth = currentResizeStart.w + ($event.x - currentResizeStart.x)
			var newHeight = currentResizeStart.h + ($event.y - currentResizeStart.y)
	//		var newX = $event.x;
	//		var newY = $event.y;
			if(currentResizeStart.type == "width" || currentResizeStart.type == "both" )
				$data.content.params.common.widget_width.values = newWidth;
			if(currentResizeStart.type == "height" || currentResizeStart.type == "both" )
				$data.content.params.common.widget_height.values = newHeight;
		}
		return false;
	  	
	};
	
	$scope.resetSizeComponent  = function (c){
		delete c.content.params.common.widget_width.values 
		delete c.content.params.common.widget_height.values;
	};
	
	$scope.isComponentReady = function(c){
		var isReady  = true;
		if(c && c.content && c.content.params){
			for (var paramSectionKey in c.content.params) {
			    if (c.content.params.hasOwnProperty(paramSectionKey)) {
			    	var paramSection = c.content.params[paramSectionKey];
					for (var paramKey in paramSection) {
					    if (paramSection.hasOwnProperty(paramKey)) {
			    	
					    	var v = paramSection[paramKey].values;
					    	if(paramSection[paramKey].mandatory == "true" && (v == null || v.length==0 || v == "")){
					    		isReady  = false;
					    		break;
					    	}
					    }
					}
			    }
			}
			
		}
		if(isReady && c.type=='yucca-html'){
			c.content.htmlstring = HtmlElementWidgets[c.content.key].html(c.content);
		}
		return isReady;
	}
	
	$scope.removeComponent = function(componentIndex){
		$scope.dashboard.components.splice(componentIndex,1);
		$scope.current = null;
	};
	
	$scope.getStyle  =function(c){
		//console.log("c",c);
		//var out ="";
		// size
		if(Utils.has(c, 'content.params.common.widget_width.values') && c.content.params.common.widget_width.values
				&& c.content.params.common.widget_width.values!=null && c.content.params.common.widget_width.values!="")
			c.styles["width"]  =  c.content.params.common.widget_width.values +"px";
		if(Utils.has(c, 'content.params.common.widget_height.values') && c.content.params.common.widget_height.values 
				&& c.content.params.common.widget_height.values!=null && c.content.params.common.widget_height.values!="")
			c.styles["height"]  = c.content.params.common.widget_height.values +"px";
		
		// position
		if($scope.dashboard.widgetPositionType == "absolute"){
			c.styles["position"] =  "absolute";
		}
		else
			delete c.styles["position"];
		

		var out = "";
		for (var k in c.styles) {
			if (c.styles.hasOwnProperty(k)) {
				out += k + ":" + c.styles[k] + ";";
			}
	    }

		return out;
	};
	
	$scope.debug  = function(){
		console.log("dashboard", $scope.dashboard);
		console.log("current", $scope.current);
		console.log("components", $scope.dashboard.components);
	};
	
	$scope.showWidgetCode = function(c){
		var widgetCodeRaw = $scope.getHtmlContent(c);
		var widgetCode = Utils.render.prettifyHtml(widgetCodeRaw);
		var widgetStyleRaw = $scope.getCssContent(c);
		var widgetStyle = Utils.render.prettifyCss(widgetStyleRaw);
		console.log("showWidgetCode", widgetCode);
		$uibModal.open({
			animation: true, backdrop  : 'static',
		    templateUrl: 'WidgetCodeDialog.html',
		    controller: 'WidgetCodeDialogCtrl',
		    resolve: {
		    	widgetCode: function () {return widgetCode;},
		    	widgetCodeRaw: function(){return widgetCodeRaw},
				widgetStyle: function () {return widgetStyle;},
		    	widgetStyleRaw: function(){return widgetStyleRaw}
		    }
		});

	};
	
	
//	var prettifyHtml = function(code){
//		var prettycodeTokens = code.replace("<","&lt;").replace("/>","").replace(/\s\s+/g, ' ').split(' ');
//		prettycodeTokens[0] = "<span class='tag'>"+prettycodeTokens[0] +"</span><br>"
//		for (var i = 1; i < prettycodeTokens.length; i++) {
//			prettycodeTokens[i] = "&nbsp;&nbsp;<span class='atn'>"+prettycodeTokens[i].replace("=","</span>=<span class='pun'>") + "</span><br>";
//		}
//		
//		prettycodeTokens.push("<span class='tag'>/&gt;</span>");
//		return prettycodeTokens.join(" ");
//		
//	}
	
	$scope.getHtmlContent = function(c){
		
		return Utils.widget.getWidgetCodeRaw(c);
//		var out = "";
//		if(c && (c.type=='yucca-widget' || c.type=='yucca-control')){
//			out += "<"+c.content.directive;
//			angular.forEach(c.content.params, function(param_section, param_section_key){
//				angular.forEach(param_section, function(p, p_key){
//			    	if(p.values != null && p.values !="")
//			    		out += " " +p.name + "='"+p.values+"'"; 
//			    });
//			});
//			angular.forEach(c.content.events, function(event_section, event_section_key){
//				angular.forEach(event_section, function(e, e_key){
//			    	if(e.values != null && e.values !="")
//			    		out += " " +e.name + "='"+e.values+"'"; 
//			    });
//			});
////			for (var property in c.content.advancedParams) {
////			    if (c.content.advancedParams.hasOwnProperty(property)) {
////			    	var p = c.content.advancedParams[property];
////			    	if(p.values != null && p.values !="")
////			    		out += " " +p.name + "='"+p.values+"'"; 
////			    }
////			}
//			out += "/>";
//			
//		}
//		else if(c && c.type=='yucca-html'){
//			out = c.content.html();
//		}
//		return out;
	};
	
//	var prettifyCss = function(code){
//		var out = "";
//		if(code){
//			var rows = code.split("\n");
//			for (var i = 0; i < rows.length; i++) {
//				if(rows[i]!=""){
//					var selector = rows[i].split("{")[0];
//					var rules = rows[i].split("{")[1].replace("}","");
//					out += "<div><span class='slc'>"+selector+"</span>{" +  Utils.prettifyCss(rules) + "}</div>";
//				}
//			}
//		}
//		return out;
//		
//	}
	
	$scope.getCssContent = function(c){
		return Utils.widget.getWidgetCssRaw(c);
//		var out = "";
//		if(c && c.type=='yucca-widget'){
//			angular.forEach(c.content.styles, function(style_section, style_section_key){
//				angular.forEach(style_section, function(s, s_key){
//			    	if(s.custom != null && s.custom !="")
//			    		out += ".yucca-widget " +s.selector+ "{"+s.custom+"}\n";
//			    	
//			    });
//			});
//		}
//		else if(c && c.type=='yucca-html'){
//			out = c.content.html();
//		}
//		return out;
	};
	
	var getParamValue = function(c,p){
		return null;
	};
	
	$scope.editDashboardTitle = function(startEdit){
		console.log("editDashboardTitle", startEdit);
		$scope.isEditingTitle = startEdit;
	}
	
	$scope.saveDashboard = function(){
	    var json = new Blob([JSON.stringify($scope.dashboard)], {type: "text/json"});
	    var  downloadLink = document.createElement("a");
	    downloadLink.download = $scope.dashboard.name + ".json";
	    downloadLink.href = window.URL.createObjectURL(json);
	    downloadLink.style.display = "none";
	    document.body.appendChild(downloadLink);
	    downloadLink.click();
		document.body.removeChild(downloadLink);
	};
	
	var checkComponentsId = function(){
		var max=0;
		var ids = new Array();
		for (var i = 0; i < $scope.dashboard.components.length; i++) {
			ids.push(parseInt($scope.dashboard.components[i].componentId.replace("component_","")));
		}
		
		var sorted_ids = ids.slice().sort(); 
		var foundDuplicate = false;
		for (var i = 0; i < sorted_ids.length - 1; i++) {
			if (sorted_ids[i + 1] == sorted_ids[i]) {
				foundDuplicate = true;
				break;
			}
		}
		if(foundDuplicate){
			for (var i = 0; i < $scope.dashboard.components.length; i++) {
				$scope.dashboard.components[i].componentId = "component_"+componentCounter;
				componentCounter++;
			}
		}
		else
			componentCounter = sorted_ids[sorted_ids.length-1]  +1;

	};
	
	$scope.loadDashboard = function($file){
		console.log("loadDashboard",$file);
		readFilePreview.readTextFile($file[0], 100000, 'UTF-8').then(function(contents){
			console.log("loadDashboard content", contents);
			$scope.dashboard = JSON.parse(contents);
			console.log("$scope.dashboard", $scope.dashboard);
			checkComponentsId();
			
		}, function(error){
			console.error("loadDashboard error", error);
		});
		
		$timeout(function(){$scope.accordions.opendashboard = !$scope.accordions.opendashboard;});


		
	};
	

	
	
	$scope.downloadProject = function(){
		var promise = new JSZip.external.Promise(function (resolve, reject) {
			var templateBaseUrl = $location.absUrl().split('#')[0];
		    JSZipUtils.getBinaryContent(templateBaseUrl + 'template/embedProject.zip', function(err, data) {
		        if (err) {
		            reject(err);
		        } else {
		        	console.log("resolve");
		            resolve(data);
		        }
		    });
		});
		
		var embedProjectZip;
		promise.then(JSZip.loadAsync)                     // 2) chain with the zip promise
		.then(function(zip) {
			 embedProjectZip = zip;
			 return embedProjectZip.file("dashboard.html").async("string");
		}).then(function success(html) {     
			console.log("html");
			html = html.replace("##DASHBOARD_HTML##", exportDashboardHtml());
			embedProjectZip.file("dashboard.html",html);
			return embedProjectZip.file("css/yucca-dashboard.css").async("string");
		}).then(function success(css) {     
			console.log("css");
			css = css.replace("##DASHBOARD_CSS##", exportDashboardCss());
			embedProjectZip.file("css/yucca-dashboard.css",css);
			return embedProjectZip.file("js/yucca-dashboard.js").async("string");
		}).then(function success(js) {   
			console.log("js");
			js = js.replace("##DASHBOARD_JS##", exportDashboardJs());
			embedProjectZip.file("js/yucca-dashboard.js",js);
			embedProjectZip.generateAsync({type:"blob"})
			.then(function(content) {
			   var downloadLink = document.createElement("a");
			    downloadLink.download = $scope.dashboard.name + ".zip";
			    downloadLink.href = window.URL.createObjectURL(content);
			    downloadLink.style.display = "none";
			    document.body.appendChild(downloadLink);
			    downloadLink.click();
				document.body.removeChild(downloadLink);
			});
		});
		
		
		
//		var zip = new JSZip();
//		zip.file("Hello.txt", "Hello World\n");
//		var img = zip.folder("images");
//		img.file("smile.gif", imgData, {base64: true});
//		zip.generateAsync({type:"blob"})
//		.then(function(content) {
//		    // see FileSaver.js
//		    saveAs(content, "example.zip");
//		});
	};
	
	
	
	var exportDashboardHtml = function(){
		
		var out="";
		for (var i = 0; i < $scope.dashboard.components.length; i++) {
			var  c = $scope.dashboard.components[i];
			out +=  '<div class="yucca-dashboard-component-card" id="'+c.componentId+'">\n';
			out += '    <'+c.content.directive + ' ';
			if(typeof c.content.params != 'undefined' && c.content.params!=null){
				for (var sectionKey in c.content.params) {
				    if (c.content.params.hasOwnProperty(sectionKey) ) {
						var s = c.content.params[sectionKey];
						for (var property in s) {
						    if (s.hasOwnProperty(property) ) {
						    	var p = s[property];
								console.log("p",p);
								if(p.values != ""){
									out += p.name + ' ="{{'+ c.componentId + '.' + p.name + '}}" ';
								}
						    }
						}						
				    }
				}
			}
//			if(typeof c.content.advancedParams != 'undefined' && c.content.advancedParams!=null){
//				for (var property in c.content.advancedParams) {
//				    if (c.content.advancedParams.hasOwnProperty(property) ) {
//						var p = c.content.advancedParams[property];
//						console.log("p",p);
//						if(p.values != ""){
//							out += p.name + ' ="{{'+ c.componentId + '.' + p.name + '}}" ';
//						}
//				    }
//				}
//			}
			out += ' />\n';
			out += '</div>\n';
		}
		
		return out;
		
	};
	
	var exportDashboardCss = function(){
		var out="";
		out += $scope.getDashboardCss();

		for (var i = 0; i < $scope.dashboard.components.length; i++) {
			var cardStyle = '';
			var  c = $scope.dashboard.components[i];
			if(typeof c.content.styles != 'undefined' && c.content.styles!=null){
				for (var sectionKey in c.content.styles) {
				    if (c.content.styles.hasOwnProperty(sectionKey) ) {
						var s = c.content.styles[sectionKey];
						for (var property in s) {
						    if (s.hasOwnProperty(property) ) {
						    	var style = s[property];
						    	if(style.custom!=""){
						    		out += style.selector + '{' + style.custom+ '}\n';
						    	}
						    }
						}
				    }
				}
			}
			
		}
//		out += "body{" + $scope.dashboard.style + "}";
//		if($scope.dashboard.components){
//			for (var cKey in $scope.dashboard.components) {
//			    if ($scope.dashboard.components.hasOwnProperty(cKey) ) {
//			    	out += "#" + $scope.dashboard.components[cKey].componentId + "{";
//					for (var sKey in $scope.dashboard.components[cKey].styles) {
//					    if ($scope.dashboard.components[cKey].styles.hasOwnProperty(sKey) ) {
//					    	out += sKey + ":" + $scope.dashboard.components[cKey].styles[sKey]+";";
//					    }
//					}
//			    	out += "}";
//			    }
//			}
//		}
		
		
		return out;
	};
	
	var exportDashboardJs = function(){
		var out="";
		out += "  $scope.dashboardTitle = '" + $scope.dashboard.name + "';\n";
		for (var i = 0; i < $scope.dashboard.components.length; i++) {
			var  c = $scope.dashboard.components[i];
			out += '  $scope.' + c.componentId + ' = {};\n'
			if(typeof c.content.params != 'undefined' && c.content.params!=null){
				for (var sectionKey in c.content.params) {
				    if (c.content.params.hasOwnProperty(sectionKey) ) {
						var s = c.content.params[sectionKey];
						for (var property in s) {
						    if (s.hasOwnProperty(property) ) {
						    	var p = s[property];
								if(p.values != ""){
									out += '  $scope.' + c.componentId + '.' + p.name + ' =\'' + p.values + '\';\n';
								}
						    }
						}
				    }
				}
			}
			
		}

		return out;
	};

	$scope.editComponentConfig = function(c){
		console.log("editComponentConfig", c, $scope.current);
		if(typeof c != 'undefined')
			$scope.current = c;
		
		if($scope.current){
			$scope.isEditingComponentConfig = false;
			$scope.isEditingComponentEvent = false;
			$scope.isEditingComponentStyle = false;

			$timeout(function(){$scope.isEditingComponentConfig = true;});
		}
	};
	
	$scope.editComponentEvent = function(c){
		console.log("editComponentEvent", c, $scope.current);
		if(typeof c != 'undefined')
			$scope.current = c;
		
		if($scope.current){
			$scope.isEditingComponentConfig = false;
			$scope.isEditingComponentEvent = false;
			$scope.isEditingComponentStyle = false;

			$timeout(function(){$scope.isEditingComponentEvent = true;});
		}
	};

	$scope.editComponentStyle = function(c){
		console.log("editComponentConfig", c);
		if(typeof c != 'undefined')
			$scope.current = c;
		
		if($scope.current){
			$scope.isEditingComponentConfig = false;
			$scope.isEditingComponentEvent = false;
			$scope.isEditingComponentStyle = false;
			
			$timeout(function(){$scope.isEditingComponentStyle = true;});
		}
	};

	$scope.openMultipleParamDialog = function(p){
		console.log("openMultipleParamDialog", p);
		var openMultipleParamDialogInstance = $uibModal.open({
			animation: true, backdrop  : 'static',
		    templateUrl: 'partials/modal/MultipleParamDialog.html',
		    controller: 'MultipleParamDialogInstanceCtrl',
		    resolve: {
		    	p: function () {return p;}
		    }
		});
		
		openMultipleParamDialogInstance.result.then(function (res) {
			console.log("result",res);
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};
	

	$scope.prettifyCss = Utils.prettifyCss;
	$scope.changedParams = false;
	
	$scope.currentmillis = new Date().getTime();

	
	$scope.changeParamEvent = function(){
		$scope.changedParams = true;
	};
	
	$scope.refreshPreview = function(widgetKey){
		var changedDirectiveUrl = Widgets[widgetKey].directiveUrl+'?t='+new Date().getTime();
		Widgets[widgetKey].directiveUrl = changedDirectiveUrl;
		$scope.changedParams = false;
	}; 

	$scope.changedStyle = "";
	$scope.openChangeStyleDialog = function(widgetKey, styleSection, styleName, customDialog){
		console.log(widgetKey, styleName,$scope.current.content.styles);
		if(!customDialog)
			customDialog = 'ChangeStyle';
		var modalInstance = $uibModal.open({
			animation: true, backdrop  : 'static',
		    templateUrl: 'partials/modal/' + customDialog + 'Dialog.html',
		    controller: customDialog + 'DialogInstanceCtrl',
		    resolve: {
		    	widgetKey: function () {return widgetKey;},
		    	styleSection: function () {return styleSection;},
		    	styleName: function () {return styleName;},
		    	existingRules: function(){return $scope.current.content.styles[styleSection][styleName].custom;},
		    	current: function(){return $scope.current;}
		    }
		});
		
		modalInstance.result.then(function (res) {
			console.log("result",res,  $scope.current);
			if(res.rule)
				$scope.current.content.styles[res.styleSection][res.styleName].custom = res.rule;
			else if(res.rules){
				for (var i = 0; i < res.rules.length; i++) {
					var name = 'supercustom_' + i
					$scope.current.content.styles[res.styleSection][name]={"name":name, "selector":res.rules[i].selector,"custom":res.rules[i].rule}
				}
			}
				
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};

	
}]);


app.controller('WidgetCodeDialogCtrl', function ($scope, $uibModalInstance,widgetCode,widgetCodeRaw,widgetStyle, widgetStyleRaw, $timeout) {
	$scope.widgetCode = widgetCode;
	$scope.widgetCodeRaw = widgetCodeRaw;
	$scope.widgetStyle = widgetStyle;
	$scope.widgetStyleRaw = widgetStyleRaw;

	
	$scope.copyToClipboard = function(value){
	    console.log("copyToClipboard", value);
	    
	    var copyElement = document.createElement("span");
	    copyElement.appendChild(document.createTextNode(value));
	    copyElement.id = 'tempCopyToClipboard';
	    angular.element(document.body.append(copyElement));
	    
	    var range = document.createRange();
	    range.selectNode(copyElement);
	    window.getSelection().removeAllRanges();
	    window.getSelection().addRange(range);

	    // copy & cleanup
	    document.execCommand('copy');
	    window.getSelection().removeAllRanges();
        document.execCommand("copy");
        $scope.copyToClipboardFeedback = "copy_to_clipboard_feedback_ok";
        $timeout(function(){$scope.copyToClipboardFeedback = "";}, 1200);
        
        console.log("copied");
	};
	
	$scope.ok = function () {
	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});

app.controller('MultipleParamDialogInstanceCtrl', function ($scope, $uibModalInstance,p) {
	console.log("p" ,p);	 
	$scope.p = p;
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
		$scope.newValues =new Array();
	else{
		$scope.newValues = JSON.parse($scope.p.values);
		//$scope.newValues = $scope.p.values.replace("[","").replace("]","").replace(/"/g, "").split(",");
	}
	$scope.addValue = function(value){
		$scope.newValues.push(value);
		$scope.newValue = null;
	};
	
	$scope.removeValue = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};
	
	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		$scope.p.values = JSON.stringify($scope.newValues);

	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});

app.controller('GeojsonsDialogInstanceCtrl', function ($scope, $uibModalInstance,p) {
	console.log("p" ,p);	 
	$scope.p = p;
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
		$scope.newValues =new Array();
	else{
		$scope.newValues = JSON.parse($scope.p.values);
		//$scope.newValues = $scope.p.values.replace("[","").replace("]","").replace(/"/g, "").split(",");
	}
	$scope.addGeojson = function(geojson){
		$scope.newValues.push(geojson);
		$scope.newGeojson = null;
	};
	
	$scope.removeGeojson = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};
	
	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		$scope.p.values = JSON.stringify($scope.newValues);

	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});



app.controller('LegendParamDialogInstanceCtrl', function ($scope, $uibModalInstance,p, type) {
	console.log("p" ,p, type);	 
	$scope.p = p;
	$scope.type = type;
	
	$scope.updateVisibility = function(){	
		if(!$scope.show)
			$scope.position = {};
		else{
			if(type=='chart')
				$scope.position = {top: 12, right: -1, bottom: -1, left: 12};
			else
				$scope.position = 'topleft';
			$scope.updatePosition();
		}
	};
	
	
	$scope.presetPosition = function(top,right,bottom,left,mapposition){
		if($scope.show){
			if(type=='chart'){
				$scope.position.top = top;
				$scope.position.right = right;
				$scope.position.bottom = bottom;
				$scope.position.left = left;
				$scope.updatePosition();
			}
			else{
				$scope.position = mapposition;
				$scope.previewPosition = "";
				if(mapposition=='topleft')
					$scope.previewPosition += "top: 24px; left: 24px";
				else if(mapposition=='topright')
					$scope.previewPosition += "top: 24px; right: 24px";
				else if(mapposition=='bottomleft')
					$scope.previewPosition += "bottom: 24px; left: 24px";
				else if(mapposition=='bottomright')
					$scope.previewPosition += "bottom: 24px; right: 24px";
				
			}
		}
	}
	
	$scope.updatePosition = function(){
		$scope.previewPosition = "";
		if($scope.position.top>0)
			$scope.previewPosition += "top: " + $scope.position.top*2 + "px; ";
		if($scope.position.right>0)
			$scope.previewPosition += "right: " + $scope.position.right*2 + "px; ";
		if($scope.position.bottom>0)
			$scope.previewPosition += "bottom: " + $scope.position.bottom*2 + "px; ";
		if($scope.position.left>0)
			$scope.previewPosition += "left: " + $scope.position.left*2 + "px; ";
	};
	
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values == ""){
		$scope.show = false;
		$scope.position = {};
	}
	else{
		var parsed = JSON.parse($scope.p.values);
		$scope.show = parsed.show;
		$scope.position = parsed.position;		
		$scope.updatePosition();

	}
	
	$scope.ok = function () {
		var result = {show: $scope.show, position: {}};
		if($scope.show){
			if(type=='chart'){
				if($scope.position.top>0)
					result.position.top = $scope.position.top
				if($scope.position.right>0)
					result.position.right = $scope.position.right;
				if($scope.position.bottom>0)
					result.position.bottom = $scope.position.bottom;
				if($scope.position.left>0)
					result.position.left = $scope.position.left;
			}
			else
				result.position = $scope.position;
		}
		$scope.p.values = JSON.stringify(result);
	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});


app.controller('PiechartrenderDialogInstanceCtrl', function ($scope, $uibModalInstance,$timeout, p) {
	console.log("p" ,p);	 
	$scope.p = p;
	$scope.piechartrender = {a:1, r:0};
	
	// cornerRadius da aggiungere al widget
	// arch radius	{"inner":0.6,"outer":0.8}
	
	
	$scope.piechartrender_data = [{key:"One",y:5, color:'#647687'},{key:"Two",y:2, color:'#808e9c'},{key:"Three",y:9, color:'#9ca7b2'},
		{key:"Four",y:7, color:'#b8c0c8'},{key:"Five",y:4, color:'#d4d9de'}];
	
	$scope.piechartrender_options = {chart: {type: 'pieChart',height: 240,width: 240,showLegend: false,showLabels: false,duration: 500,legendPosition: true,
			startAngle:function(d) { return d.startAngle/$scope.piechartrender.a -  $scope.piechartrender.r*Math.PI/10},
			endAngle: function(d) { return d.endAngle/$scope.piechartrender.a -  $scope.piechartrender.r*Math.PI/10}}};
	
	$scope.updateAngles = function(){
		console.log("updateHalfPie",$scope.piechartrender.angleTypes );
		if($scope.piechartrender.angleTypes=='half'){
			$scope.piechartrender.a = 2;
			//$scope.piechartrender.r = 5;
		}
		else{
			$scope.piechartrender.a = 1;
			//$scope.piechartrender.r = 0;
		}
		$scope.updateRender();
	};
	
	$scope.updateRender = function(){	
		$scope.piechartrender_options.legendPosition = !$scope.piechartrender_options.legendPosition;
		//console.log("updateRender options", $scope.piechartrender_options);

	};
	$scope.updateRender();
	
	
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values == ""){
	}
	else{
		var parsed = JSON.parse($scope.p.values);

		$scope.piechartrender_options.chart.donut = parsed.donut;
		$scope.piechartrender_options.chart.donutRatio = parsed.donutRatio;
		$scope.piechartrender_options.chart.cornerRadius = parsed.cornerRadius;
		
		if(parsed.halfPie === true){
			$scope.piechartrender.angleTypes = 'half';
			$scope.piechartrender.a = 2;
			if(!parsed.rotation)
				parsed.rotation = 0;
		}
		else if(parsed.section){
			$scope.piechartrender.angleTypes = 'custom';
			$scope.piechartrender.a = parsed.section;
			if(!parsed.rotation)
				parsed.rotation = 0;
		}	
		
		if(parsed.rotation)
			$scope.piechartrender.r = parsed.rotation;
		
		$scope.piechartrender_options.donut = parsed.donut;		
	}
	
	$scope.ok = function () {
		var result = {};
		if($scope.piechartrender_options.chart.donut === true){
			result["donut"] = true; 
			if($scope.piechartrender_options.chart.donutRatio)
				result["donutRatio"] = $scope.piechartrender_options.chart.donutRatio; 
		}
		if($scope.piechartrender.angleTypes=='half'){
			result["halfPie"] = true;
		}
		else if($scope.piechartrender.angleTypes=='custom'){
			result["section"] = $scope.piechartrender.a;
		}
		
		if($scope.piechartrender.r)
			result["rotation"] = $scope.piechartrender.r;

		if($scope.piechartrender_options.chart.cornerRadius)
			result.cornerRadius = $scope.piechartrender_options.chart.cornerRadius;
		
		$scope.p.values = JSON.stringify(result);
	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});


app.controller('DatasetColumnParamDialogInstanceCtrl', function ($scope, metadataapiAPIservice, $uibModalInstance, $translate, p, current, isValuecolumn) {
	console.log("p" ,p);	 
	$scope.p = p;
	$scope.isValuecolumn = isValuecolumn;
	if(p.values){
		$scope.column = $scope.$eval(p.values);
	}
	
	$scope.columnsList  = "";
	var columnsMap = {};
	var loadColumns = function(){
		metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
    		for (var i = 0; i < response.data.components.length; i++) {
				columnsMap[response.data.components[i].name] = response.data.components[i].alias;
				$scope.columnsList += response.data.components[i].name + " - " + response.data.components[i].alias + "\n";
			}
	    },
		function(result){
			console.error("loadDatasets error", result);
		});
	};

	var datasetcode = null
	if(Utils.has(current, 'content.params.mandatory.datasetcode.values') && current.content.params.mandatory.datasetcode.values){
		datasetcode = current.content.params.mandatory.datasetcode.values;
		console.log("datasetcode", datasetcode);
		loadColumns();
	}
	else
		$scope.columnsList  = $translate.instant("dataset_column_no_datasetcode_hint");
	
    $scope.getColumns = function(val) {
		var allColumns = new Array();
		
		if(datasetcode){
			for (var columnName in columnsMap) {
				if (columnsMap.hasOwnProperty(columnName) && columnName.toLowerCase().includes(val.toLowerCase()))
					allColumns.push(columnName);
		    }
		}
		return allColumns;
	};
	  
	$scope.updateColumnLabel = function(){
		if($scope.column && columnsMap[$scope.column.key])
			$scope.column.label = columnsMap[$scope.column.key];
	}
	  
	$scope.ok = function () {
		var countingMode = "";
		if(isValuecolumn)
			countingMode = ', "countingMode":"'+$scope.column.countingMode+'"';
		$scope.p.values = '{"key":"'+$scope.column.key+'","label":"'+$scope.column.label+'"'+countingMode+'}';
	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});

app.controller('DatasetcolumnsDialogInstanceCtrl', function ($scope, $uibModalInstance, $translate,metadataapiAPIservice, p, current) {
	console.log("p" ,p);	 
	console.log("current" ,current);	 
	$scope.p = p;
	
	$scope.isCollapsibletreeboxes = current.content.key == 'basicDatasetCollapsibletreeboxesChart';

	$scope.newValue = {};
	$scope.columnsList  = "";
	var columnsMap = {};
	var loadColumns = function(){
		metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
    		for (var i = 0; i < response.data.components.length; i++) {
				columnsMap[response.data.components[i].name] = response.data.components[i].alias;
				$scope.columnsList += response.data.components[i].name + " - " + response.data.components[i].alias + "\n";
			}
	    },
		function(result){
			console.error("loadDatasets error", result);
		});
	};

	var datasetcode = null
	if(Utils.has(current, 'content.params.mandatory.datasetcode.values') && current.content.params.mandatory.datasetcode.values){
		datasetcode = current.content.params.mandatory.datasetcode.values;
		console.log("datasetcode", datasetcode);
		loadColumns();
	}
	else
		$scope.columnsList  = $translate.instant("dataset_column_no_datasetcode_hint");
	
    $scope.getColumns = function(val) {
		var allColumns = new Array();
		
		if(datasetcode){
			for (var columnName in columnsMap) {
				if (columnsMap.hasOwnProperty(columnName) && columnName.toLowerCase().includes(val.toLowerCase()))
					allColumns.push(columnName);
		    }
		}
		return allColumns;
	};

//	var columnsMap = {};
//	$scope.getColumns = function(val) {
//		var datasetcode = null
//		if(Utils.has(current, 'content.params.mandatory.datasetcode.values'))
//			datasetcode = current.content.params.mandatory.datasetcode.values;
//		console.log("datasetcode datasetcode datasetcode datasetcode ",datasetcode );
//		if(datasetcode){
//	    	return metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
//	    		var allColumns = new Array();
//	    		for (var i = 0; i < response.data.components.length; i++) {
//					if(response.data.components[i].name.includes(val)){
//						allColumns.push(response.data.components[i].name);
//						columnsMap[response.data.components[i].name] = response.data.components[i].alias;
//					}
//				}
//	    		return allColumns;
//		    },
//			function(result){
//				console.error("loadDatasets error", result);
//			});
//		}
//	};
	  
	$scope.updateColumnLabel = function(){
		if(columnsMap[$scope.newValue.key])
			$scope.newValue.label = columnsMap[$scope.newValue.key];
	}
	
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
		$scope.newValues =new Array();
	else{
		$scope.newValues = JSON.parse($scope.p.values);
	}
	
	$scope.addValue = function(value){
		$scope.newValues.push(value);
		$scope.newValue = null;
	};
	
	$scope.removeValue = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};
	
	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		$scope.p.values = JSON.stringify($scope.newValues);

	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});



app.controller('DatasetSerieColumnsParamDialogInstanceCtrl', function ($scope,metadataapiAPIservice, $uibModalInstance,$translate, p, current, $uibModal ){
	console.log("p" ,current);	 
	$scope.p = p;
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
		$scope.newValues =new Array();
	else{
		$scope.newValues = JSON.parse($scope.p.values);
	}
	$scope.newValue = {};
	
	$scope.isLineChart = current.content.key == 'basicDatasetLineChart';
	$scope.isMultibarChart = current.content.key == 'basicDatasetMultibarChart';
	$scope.isHorizontalmultibarChart = current.content.key == 'basicDatasetHorizontalmultibarChart';
	

	if($scope.isLineChart)
		$scope.newValue = {type: 'line'};
	else if($scope.isMultibarChart)
		$scope.newValue = {type: 'bar'};
	else if($scope.isHorizontalmultibarChart)
		$scope.newValue = {type: 'bar'};
		

//	var columnsMap = {};
//    $scope.getColumns = function(val) {
//		var datasetcode = null
//		if(Utils.has(current, 'content.params.mandatory.datasetcode.values'))
//			datasetcode = current.content.params.mandatory.datasetcode.values;
//		
//		if(datasetcode){
//	    	return metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
//	    		var allColumns = new Array();
//	    		for (var i = 0; i < response.data.components.length; i++) {
//					if(response.data.components[i].name.includes(val)){
//						allColumns.push(response.data.components[i].name);
//						columnsMap[response.data.components[i].name] = response.data.components[i].alias;
//					}
//				}
//	    		return allColumns;
//		    },
//			function(result){
//				console.error("loadDatasets error", result);
//			});
//		}
//	};
	$scope.columnsList  = "";
	var columnsMap = {};
	var loadColumns = function(){
		metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
    		for (var i = 0; i < response.data.components.length; i++) {
				columnsMap[response.data.components[i].name] = response.data.components[i].alias;
				$scope.columnsList += response.data.components[i].name + " - " + response.data.components[i].alias + "\n";
			}
	    },
		function(result){
			console.error("loadDatasets error", result);
		});
	};

	var datasetcode = null
	if(Utils.has(current, 'content.params.mandatory.datasetcode.values') && current.content.params.mandatory.datasetcode.values){
		datasetcode = current.content.params.mandatory.datasetcode.values;
		console.log("datasetcode", datasetcode);
		loadColumns();
	}
	else
		$scope.columnsList  = $translate.instant("dataset_column_no_datasetcode_hint");
	
    $scope.getColumns = function(val) {
		var allColumns = new Array();
		
		if(datasetcode){
			for (var columnName in columnsMap) {
				if (columnsMap.hasOwnProperty(columnName) && columnName.toLowerCase().includes(val.toLowerCase()))
					allColumns.push(columnName);
		    }
		}
		return allColumns;
	};
	  
	
	
	$scope.updateColumnLabel = function(){
		if(columnsMap[$scope.newValue.key])
			$scope.newValue.label = columnsMap[$scope.newValue.key];
	};
	
	$scope.openInterpolationHelp = function(){
		console.log("openInterpolationHelp");
		$uibModal.open({
			animation: true, backdrop  : 'static',
			templateUrl: 'partials/help/InterpolationHelpDialog.html',
		    controller: 'CommonHelpDialogInstanceCtrl',
		    size: 'sm',
		});
	};
	  
	$scope.validateAdd = true;
	$scope.addValue = function(value){
		$scope.validateAdd = true;
		if(!value || !value.key || !value.label || !value.countingMode || (!$scope.isLineChart && !$scope.isMultibarChart  && !$scope.isHorizontalmultibarChart && !value.yAxis))
			$scope.validateAdd = false;
		else{
			$scope.newValues.push(value);
			$scope.newValue = {};
			if($scope.isLineChart)
				$scope.newValue = {type: 'line'};
			else if($scope.isMultibarChart)
				$scope.newValue = {type: 'bar'};
			else if($scope.isHorizontalmultibarChart)
				$scope.newValue = {type: 'bar'};
		}
	};
	
	$scope.removeValue = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};
	
	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		$scope.p.values = JSON.stringify($scope.newValues);

	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});
app.controller('DatasetValueColumnsParamDialogInstanceCtrl', function ($scope,metadataapiAPIservice, $uibModalInstance,$translate, p, current, $uibModal ){
	console.log("p" ,current);	 
	$scope.p = p;
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
		$scope.newValues =new Array();
	else{
		$scope.newValues = JSON.parse($scope.p.values);
	}
	$scope.newValue = {};
	
	$scope.columnsList  = "";
	var columnsMap = {};

	$scope.validateAdd = true;
	$scope.addValue = function(value){
		$scope.validateAdd = true;
		if(!value || !value.key || !value.label)
			$scope.validateAdd = false;
		else{
			$scope.newValues.push(value);
			$scope.newValue = {};
		}
	};
	
	$scope.removeValue = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};
	
	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		$scope.p.values = JSON.stringify($scope.newValues);

	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});

app.controller('NodesrenderDialogInstanceCtrl', function ($scope, $uibModalInstance,p, current) {
	console.log("p" ,p);	 
	console.log("current" ,current);	 
	$scope.p = p;


	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null || p.values == "")
		$scope.newValues =new Array();
	else{
		var finalValue = JSON.parse($scope.p.values);
		$scope.newValues = new Array();
		angular.forEach(finalValue, function(value, key) {

			$scope.newValues.push({"column": key.split("_")[0], "value":  key.split("_")[1], "color":value.color, "fades": value.fades});

		});

		//$scope.newValues = $scope.p.values.replace("[","").replace("]","").replace(/"/g, "").split(",");
	}

	$scope.nodeColumns = new Array();
	if(Utils.has(current, 'content.params.mandatory.node_columns.values') && current.content.params.mandatory.node_columns.values){
		var allColumns = JSON.parse(current.content.params.mandatory.node_columns.values);
		for (var i = 0; i < allColumns.length; i++) {
			$scope.nodeColumns.push(allColumns[i].key);
		}
	}
	console.log("nodeColumns", $scope.nodeColumns);

	$scope.validateAdd = true;
	$scope.addValue = function(){
		if(!$scope.newValue || !$scope.newValue.column || !$scope.newValue.value || !$scope.newValue.color)
			$scope.validateAdd = false;
		else{
			$scope.newValues.push($scope.newValue);
			$scope.newValue = null;
		}
	};

	$scope.removeValue = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};

	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		var finalValue = {};
		for (var i = 0; i < $scope.newValues.length; i++) {
			finalValue[$scope.newValues[i].column + "_" + $scope.newValues[i].value] = {color:$scope.newValues[i].color};
			if($scope.newValues.fades)
				finalValue[$scope.newValues[i].column + "_" + $scope.newValues[i].value].fades = true;
		}

		console.log("final value", finalValue);
		$scope.p.values = JSON.stringify(finalValue);


	    $uibModalInstance.close();
	};

	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};

});

app.controller('DatasetColumnsRelationsDialogInstanceCtrl', function ($scope, $uibModalInstance,metadataapiAPIservice,$translate, p, current) {
	console.log("p" ,p);	 
	console.log("current" ,current);	 
	$scope.p = p;
	
	
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
		$scope.newValues =new Array();
	else{
		$scope.newValues = JSON.parse($scope.p.values);
		//$scope.newValues = $scope.p.values.replace("[","").replace("]","").replace(/"/g, "").split(",");
	}
	
//	var columnsMap = {};
//    $scope.getColumns = function(val) {
//		var datasetcode = null
//		if(Utils.has(current, 'content.params.mandatory.datasetcode.values'))
//			datasetcode = current.content.params.mandatory.datasetcode.values;
//		
//		if(datasetcode){
//	    	return metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
//	    		var allColumns = new Array();
//	    		for (var i = 0; i < response.data.components.length; i++) {
//					if(response.data.components[i].name.includes(val)){
//						allColumns.push(response.data.components[i].name);
//						columnsMap[response.data.components[i].name] = response.data.components[i].alias;
//					}
//				}
//	    		return allColumns;
//		    },
//			function(result){
//				console.error("loadDatasets error", result);
//			});
//		}
//	};
	
	$scope.columnsList  = "";
	var columnsMap = {};
	var loadColumns = function(){
		metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
    		for (var i = 0; i < response.data.components.length; i++) {
				columnsMap[response.data.components[i].name] = response.data.components[i].alias;
				$scope.columnsList += response.data.components[i].name + " - " + response.data.components[i].alias + "\n";
			}
	    },
		function(result){
			console.error("loadDatasets error", result);
		});
	};

	var datasetcode = null
	if(Utils.has(current, 'content.params.mandatory.datasetcode.values') && current.content.params.mandatory.datasetcode.values){
		datasetcode = current.content.params.mandatory.datasetcode.values;
		console.log("datasetcode", datasetcode);
		loadColumns();
	}
	else
		$scope.columnsList  = $translate.instant("dataset_column_no_datasetcode_hint");
	
    $scope.getColumns = function(val) {
		var allColumns = new Array();
		
		if(datasetcode){
			for (var columnName in columnsMap) {
				if (columnsMap.hasOwnProperty(columnName) && columnName.toLowerCase().includes(val.toLowerCase()))
					allColumns.push(columnName);
		    }
		}
		return allColumns;
	};
	
	$scope.updateSourceColumnLabel  = function(){
		if($scope.newValue && $scope.newValue.source)
			 $scope.newValue.sourceType = columnsMap[$scope.newValue.source];
	}

	$scope.updateTargetColumnLabel  = function(){
		if($scope.newValue && $scope.newValue.target)
			 $scope.newValue.targetType = columnsMap[$scope.newValue.target];
	}

	$scope.validateAdd = true;
	$scope.addValue = function(){
		if(!$scope.newValue || !$scope.newValue.source || !$scope.newValue.target)
			$scope.validateAdd = false;
		else{
			$scope.newValues.push($scope.newValue);
			$scope.newValue = null;
		}
	};
	
	$scope.removeValue = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};
	
	$scope.ok = function () {
		$scope.p.values = JSON.stringify($scope.newValues);
	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});

app.controller('DateFormatDialogInstanceCtrl', function ($scope, metadataapiAPIservice, $uibModalInstance, dateformat) {	
	var currentDate = new Date();
	$scope.df = {}
	if(dateformat)
		$scope.df = dateformat;
	$scope.previewDate = new Date();
	
	
	$scope.refreshPreview = function(){
		console.log("refreshPreview", $scope.df);
		$scope.previewDate = currentDate.toLocaleDateString(undefined, $scope.df)
	};
	
	$scope.hideDateElement = function(key){
		if($scope.df)
			delete $scope.df[key];
	};
	
	$scope.ok = function () {
		//$scope.p.values = JSON.stringify($scope.columns);
	    $uibModalInstance.close($scope.df);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

});


app.controller('DataColumnsParamDialogInstanceCtrl', function ($scope, metadataapiAPIservice, $uibModalInstance,$uibModal, p, current) {
	console.log("p" ,p);	 
	$scope.p = p;
	var datasetcode = null
	
	$scope.loadColumns = function(){
		if(Utils.has(current, 'content.params.mandatory.datasetcode.values') && current.content.params.mandatory.datasetcode.values!=""){
			datasetcode = current.content.params.mandatory.datasetcode.values;

			$scope.columns = new Array();
			metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
	    		for (var i = 0; i < response.data.components.length; i++) {
					response.data.components[i].label = response.data.components[i].alias;
					$scope.columns.push(response.data.components[i]);
				}
		    },
			function(result){
				console.error("loadDatasets error", result);
			});
		}
	};

	var previewDate = new Date();
	$scope.dateFormatPreview = function(columnIndex){
		return previewDate.toLocaleDateString(undefined, $scope.columns[columnIndex].dateFormat);
	};
	
	$scope.chooseDateFormat = function(columnIndex){
		console.log("MultipleOdataFilterParamDialogInstanceCtrl");
		var dateFormatDialogInstance = $uibModal.open({
			animation: true, backdrop  : 'static',
			templateUrl: 'partials/modal/DateFormatDialog.html',
			controller: 'DateFormatDialogInstanceCtrl',
			resolve: {
				dateformat: function () {return $scope.columns[columnIndex].dateFormat;},
			}
		});
		
		dateFormatDialogInstance.result.then(function (value) {
			console.log("result",value);
			$scope.columns[columnIndex].dateFormat = value;
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
		
	};

	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1){
		$scope.loadColumns();
	}
	else{
		$scope.columns = JSON.parse($scope.p.values);
		//retrocompatibility fix
		console.log("columns", $scope.columns);
		for (var i = 0; i < $scope.columns.length; i++) {
			if($scope.columns[i].skip){
				$scope.columns[i].skip = {table: true, detail: true}
			}
			
		}
	}

	$scope.ok = function () {
		var countingMode = "";
		$scope.p.values = JSON.stringify($scope.columns);
	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});


app.controller('DashboardConfigDialogInstanceCtrl', function ($scope, $uibModalInstance, extAPIservice, dashboard) {
	console.log("dashboard" ,dashboard);	 
	$scope.dashboard = angular.copy(dashboard);

	var loadGoogleFonts = function(){
		extAPIservice.getGooglefontsList().then(function(data){
			console.log("loadGoogleFonts data",data);
		}, function(error){
			console.error("loadGoogleFonts error",error);
		});
	};
	if(!$scope.dashboard.grid){
		
		$scope.dashboard.grid = {items:{}, rows: new Array()};
	}

	$scope.refreshGridPrevew = function(){
		console.log("refreshGridPrevew ", $scope.dashboard);
		if($scope.dashboard.grid.numRow>0 && $scope.dashboard.grid.numColumn>0){
			var counter = 1;
			var gridStyle = "";
			var gridNames = "";
			$scope.dashboard.grid.items = {};
			if($scope.dashboard.grid.numRow<$scope.dashboard.grid.rows.length)
				$scope.dashboard.grid.rows.length = $scope.dashboard.grid.numRow;
			
			for(var i=0; i<$scope.dashboard.grid.numRow; i++){
				if(!$scope.dashboard.grid.rows[i])
					$scope.dashboard.grid.rows.push(new Array());
				if($scope.dashboard.grid.numColumn<$scope.dashboard.grid.rows[i].length)
					$scope.dashboard.grid.rows[i].length = $scope.dashboard.grid.numColumn

				for(var j=0; j<$scope.dashboard.grid.numColumn; j++){
					if(!$scope.dashboard.grid.rows[i][j])
						$scope.dashboard.grid.rows[i][j] = "item_"+ i + "_" + j;
					counter++;
				}
				gridNames += "'" + $scope.dashboard.grid.rows[i].join(" ") + "'";
			}
			for (var i = 0; i < $scope.dashboard.grid.rows.length; i++) {
				for (var j = 0; j < $scope.dashboard.grid.rows[i].length; j++) {
					if(!$scope.dashboard.grid.items[$scope.dashboard.grid.rows[i][j]])
						$scope.dashboard.grid.items[$scope.dashboard.grid.rows[i][j]] = {
							name: $scope.dashboard.grid.rows[i][j], 
							label: $scope.dashboard.grid.rows[i][j].replace("item_","").replace("_",":"), 
							row:i,
							col:j,
							selected:false};	
						gridStyle += "#"+$scope.dashboard.grid.rows[i][j]+"{grid-area: " + $scope.dashboard.grid.rows[i][j] + "}";
					};
			}
			console.log("grid", $scope.dashboard.grid);
			
			$scope.gridPreviewStyle = ".grid-layout-preview{grid-template-areas:"  +gridNames + "}" + gridStyle;
			$scope.dashboard.grid.style = "grid-template-areas:"  +gridNames + ""

			}
	};
	
	

	
	$scope.seedGridKey = null;
	$scope.selectGridItem = function(itemKey){
		console.log("selectGridItem",$scope.dashboard.grid);
		$scope.dashboard.grid.items[itemKey].selected=!$scope.dashboard.grid.items[itemKey].selected;
		if($scope.dashboard.grid.items[itemKey].selected && $scope.seedGridKey == null )
			$scope.seedGridKey = itemKey;
		if(!$scope.dashboard.grid.items[itemKey].selected  && $scope.seedGridKey == itemKey)
			$scope.seedGridKey = null;		
	};
	
	
	
	$scope.gridItemStyle = function(key){
		return $scope.dashboard.grid.items[key].selected?"selected":"";
	};
	
	$scope.clearGroupGridItems = function(){
		$scope.dashboard.grid.rows = new Array();
		$scope.seedGridKey = null;
		$scope.refreshGridPrevew();
	};
	
	
	$scope.groupGridItems = function(){
		console.log("groupGridItems",$scope.dashboard.grid);

		for (var itemKey in $scope.dashboard.grid.items) {
			if ($scope.dashboard.grid.items.hasOwnProperty(itemKey)){ 
				var item = $scope.dashboard.grid.items[itemKey];
				if(item.selected){
					$scope.dashboard.grid.rows[item.row][item.col] = $scope.seedGridKey;
				}
			}			
		}
		$scope.seedGridKey = null;
		$scope.refreshGridPrevew();
		
	};
	
	$scope.ungroupGridItems = function(){
		
		for (var i = 0; i < $scope.dashboard.grid.rows.length; i++) {
			for (var j = 0; j < $scope.dashboard.grid.rows[i].length; j++) {
				if($scope.dashboard.grid.rows[i][j] == $scope.seedGridKey)
					$scope.dashboard.grid.rows[i][j] = "item_"+ i + "_" + j;
			}
		}
		$scope.seedGridKey = null;
		$scope.refreshGridPrevew();
	};
	
	//loadGoogleFonts();
	
	$scope.ok = function () {
	    $uibModalInstance.close($scope.dashboard);
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});

app.controller('OdatafilterParamDialogInstanceCtrl', function ($scope, $uibModalInstance, $translate,metadataapiAPIservice, p, current) {
	console.log("p" ,p);	 
	$scope.p = p;
		
	$scope.conditionGroups = new Array();
	$scope.newConditionGroup = new Array();
	$scope.newCondition = new Array();	
	
//	var parseCurrentValue = function(){
//		if($scope.p.values && columnsMap){
//			var blocks =  $scope.p.values.split(/[()]+/).filter(function(e) { return e; });
//			for (var i = 0; i < blocks.length; i += 2) {
//				$scope.newCondition = {column: columnsMap[]};
//				// column
//				if
//				$scope.addNewCondition();
//				
//			}
//		}
//		
//	};
//	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
//		$scope.newValues =new Array();
//	else{
//		$scope.newValues = JSON.parse($scope.p.values);
//	}
	
	$scope.columnsList  = "";
	var columnsMap = {};
	$scope.hasColumns = false;
	var loadColumns = function(){
		metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
    		for (var i = 0; i < response.data.components.length; i++) {
				columnsMap[response.data.components[i].name] = response.data.components[i];
				$scope.columnsList += response.data.components[i].name + " - " + response.data.components[i].alias + "\n";
				$scope.hasColumns = true;
			}
    		//parseCurrentValue();
	    },
		function(result){
			console.error("loadDatasets error", result);
		});
	};

	var datasetcode = null
	if(Utils.has(current, 'content.params.mandatory.datasetcode.values') && current.content.params.mandatory.datasetcode.values){
		datasetcode = current.content.params.mandatory.datasetcode.values;
		console.log("datasetcode", datasetcode);
		loadColumns();
	}
	else
		$scope.columnsList  = $translate.instant("dataset_column_no_datasetcode_hint");
	
    $scope.getColumns = function(val) {
		var allColumns = new Array();
		
		if(datasetcode){
			for (var columnName in columnsMap) {
				if (columnsMap.hasOwnProperty(columnName) && columnName.toLowerCase().includes(val.toLowerCase()))
					allColumns.push(columnsMap[columnName]);
		    }
		}
		return allColumns;
	};
	
	var operators_date = [{"value":"eq", "label":"=", "valueDelimiter": "", "isFunction": false, "isDate": true},
        {"value":"ne", "label":"!=", "valueDelimiter": "", "isFunction": false, "isDate": true},
        {"value":"ge", "label":">=", "valueDelimiter": "", "isFunction": false, "isDate": true},
        {"value":"gt", "label":">", "valueDelimiter": "", "isFunction": false, "isDate": true},
        {"value":"lt", "label":"<", "valueDelimiter": "", "isFunction": false, "isDate": true},
        {"value":"le", "label":"<=", "valueDelimiter": "", "isFunction": false, "isDate": true}];

	var operators_number = [{"value":"eq", "label":"=", "valueDelimiter": "", "isFunction": false, "isDate": false},
	          {"value":"ne", "label":"!=", "valueDelimiter": "", "isFunction": false, "isDate": false},
	          {"value":"ge", "label":">=", "valueDelimiter": "", "isFunction": false, "isDate": false},
	          {"value":"gt", "label":">", "valueDelimiter": "", "isFunction": false, "isDate": false},
	          {"value":"lt", "label":"<", "valueDelimiter": "", "isFunction": false, "isDate": false},
	          {"value":"le", "label":"<=", "valueDelimiter": "", "isFunction": false, "isDate": false}];
	
	var operators_string = [{"value":"eq", "label":"equals", "valueDelimiter": "%27", "isFunction": false, "isDate": false},
	          {"value":"ne", "label":"not equals", "valueDelimiter": "%27", "isFunction": false, "isDate": false},
	          {"value":"startswith", "label":"start with", "valueDelimiter": "%27", "isFunction": true, "isDate": false},
	          {"value":"endswith", "label":"end with", "valueDelimiter": "%27", "isFunction": true, "isDate": false},
	          {"value":"substringof", "label":"contains", "valueDelimiter": "%27", "isFunction": true, "isDate": false}];

	$scope.operators = operators_number;
	
	$scope.selectColumn = function(column){
		console.log("selectColumn",column);
		switch (column.datatype) {
			case "string":
				$scope.operators = operators_string;					
				break;
			case "boolean":
				$scope.operators = operators_boolean;					
				break;
			case "date":
				$scope.operators = operators_date;					
				break;
			default:
				$scope.operators = operators_number;
				break;
		}
		
	}
	
	
	
	
	
	
	$scope.addNewCondition = function(logic){
		if($scope.newCondition && $scope.newCondition.column && $scope.newCondition.operator && $scope.newCondition.value){
			$scope.newConditionGroup.push({condition: $scope.newCondition});

			if(logic)
				$scope.newConditionGroup[$scope.newConditionGroup.length-2].logic = logic;
			$scope.newCondition = new Array();			
		}
	};

	$scope.addNewGroup = function(logic){
		if($scope.newConditionGroup.length>0){
			$scope.conditionGroups.push({conditions:$scope.newConditionGroup});
			if(logic)
				$scope.conditionGroups[$scope.conditionGroups.length-2].logic = logic;
			$scope.newConditionGroup = new Array();			
		}
		refreshOdatafilter();
	};

	var formatCondition = function(conditions){
		var condition = "";
		if(conditions.length>0){
			for (var i = 0; i < conditions.length; i++) {
				var c = conditions[i].condition;
				if(c.operator.isDate){ // time ge datetimeoffset'2014-08-01T07:00:00+01:00'
					var d = new Date(c.value);
					var dateToParam =  d.getFullYear() + "-"+ (d.getMonth()+1) + "-" + d.getDate() + 'T' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() +"%2B00:00";
					condition += c.column.name + " " + c.operator.value + " datetimeoffset'"+ dateToParam + "'";
				}else if(c.operator.value == "substringof"){  // c=substringof(Name, 'urn')
					condition += "(" + c.operator.value + "(" +c.operator.valueDelimiter +  c.value + c.operator.valueDelimiter+ "," +c.column.name  +") eq true)";
				}
				else if(c.operator.isFunction){  
					condition += c.operator.value + "(" +c.column.name + "," + c.operator.valueDelimiter +  c.value + c.operator.valueDelimiter+")";
				}
				else if(c.operator.value == "eq"){
					condition +=  c.operator.valueDelimiter +  c.value + c.operator.valueDelimiter + " " + c.operator.value + " " +c.column.name;
				}
				else{//c= Entry_No gt 610
					condition += c.column.name + " " + c.operator.value + " " +c.operator.valueDelimiter +  c.value + c.operator.valueDelimiter;
				}

				if(i<conditions.length-1)
					condition += " " + conditions[i].logic + " ";
			}
		}
		return condition;
		
	};

	$scope.odatafilter = "";
	var refreshOdatafilter = function(){
		$scope.odatafilter = "";
		if($scope.conditionGroups.length>0){
			for (var i = 0; i < $scope.conditionGroups.length; i++) {
				var block  = "";
				block += formatCondition($scope.conditionGroups[i].conditions);
				$scope.odatafilter += "(" + block + ") ";
				if(i<$scope.conditionGroups.length-1)
					$scope.odatafilter += " " + $scope.conditionGroups[i].logic + " ";
			}
		}
	};

	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		$scope.p.values = $scope.odatafilter;

	    $uibModalInstance.close($scope.odatafilter);
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	
});

app.controller('SvgShapeDialogInstanceCtrl', function ($scope, $uibModalInstance,$location,p, current) {
	console.log("p" ,p);	 
	$scope.p = p;
	$scope.svgBasic = [{key:"rectangle", text:"▬"}, // ● https://graphemica.com/search?q=circle
		{key:"circle", text:"●"}, 
		{key:"ellipse", text:"⬬"}, 
		{key:"hexagon", text:"⬣"}, 
		{key:"star", text:"★"}, 
	];
	
	var svgBaseUrl  =  $location.absUrl().split('#')[0] + "lib/yucca-angular-widgets/dist/img/svg/";
	var scripts = document.getElementsByTagName("script");
	for (var i = 0; i < scripts.length; i++) {
		if(scripts[i].src.indexOf("yucca-angular-widgets")>0){
			svgBaseUrl =scripts[i].src.substring(0, scripts[i].src.indexOf("yucca-angular-widgets")) + "yucca-angular-widgets/dist/img/svg/";
			break;
		}
	}
	
	$scope.svgYucca = [
		{key:'yucca_domain_agriculture', 'url':svgBaseUrl + 'yucca/domain/AGRICULTURE.svg'},
		{key:'yucca_domain_culture', 'url':svgBaseUrl + 'yucca/domain/CULTURE.svg'},
		{key:'yucca_domain_economy', 'url':svgBaseUrl + 'yucca/domain/ECONOMY.svg'},
		{key:'yucca_domain_employment_training', 'url':svgBaseUrl + 'yucca/domain/EMPLOYMENT_TRAINING.svg'},
		{key:'yucca_domain_energy', 'url':svgBaseUrl + 'yucca/domain/ENERGY.svg'},
		{key:'yucca_domain_environment', 'url':svgBaseUrl + 'yucca/domain/ENVIRONMENT.svg'},
		{key:'yucca_domain_government', 'url':svgBaseUrl + 'yucca/domain/GOVERNMENT.svg'},
		{key:'yucca_domain_health', 'url':svgBaseUrl + 'yucca/domain/HEALTH.svg'},
		{key:'yucca_domain_population', 'url':svgBaseUrl + 'yucca/domain/POPULATION.svg'},
		{key:'yucca_domain_production', 'url':svgBaseUrl + 'yucca/domain/PRODUCTION.svg'},
		{key:'yucca_domain_school', 'url':svgBaseUrl + 'yucca/domain/SCHOOL.svg'},
		{key:'yucca_domain_science_technology', 'url':svgBaseUrl + 'yucca/domain/SCIENCE_TECHNOLOGY.svg'},
		{key:'yucca_domain_security', 'url':svgBaseUrl + 'yucca/domain/SECURITY.svg'},
		{key:'yucca_domain_smart_community', 'url':svgBaseUrl + 'yucca/domain/SMART_COMMUNITY.svg'},
		{key:'yucca_domain_territory', 'url':svgBaseUrl + 'yucca/domain/TERRITORY.svg'},
		{key:'yucca_domain_tourism_sport', 'url':svgBaseUrl + 'yucca/domain/TOURISM_SPORT.svg'},
		{key:'yucca_domain_transport', 'url':svgBaseUrl + 'yucca/domain/TRANSPORT.svg'},
		{key:'yucca_domain_trade', 'url':svgBaseUrl + 'yucca/domain/TRADE.svg'}
	];
	
	$scope.svgCommon = [
		{key:'common_female', 'url':svgBaseUrl + 'common/female.svg'},
		{key:'common_male', 'url':svgBaseUrl + 'common/male.svg'},
		{key:'common_child', 'url':svgBaseUrl + 'common/child.svg'},
		{key:'common_venus', 'url':svgBaseUrl + 'common/venus.svg'},
		{key:'common_mars', 'url':svgBaseUrl + 'common/mars.svg'},
		{key:'common_tree', 'url':svgBaseUrl + 'common/tree.svg'},
		{key:'common_leaf', 'url':svgBaseUrl + 'common/leaf.svg'},
		{key:'common_pagelines', 'url':svgBaseUrl + 'common/pagelines.svg'},
		{key:'common_paw', 'url':svgBaseUrl + 'common/paw.svg'},
		{key:'common_industry', 'url':svgBaseUrl + 'common/industry.svg'},
		{key:'common_subway', 'url':svgBaseUrl + 'common/subway.svg'},
		{key:'common_train', 'url':svgBaseUrl + 'common/train.svg'},
		{key:'common_truck', 'url':svgBaseUrl + 'common/truck.svg'},
		{key:'common_plane', 'url':svgBaseUrl + 'common/plane.svg'},
		{key:'common_rocket', 'url':svgBaseUrl + 'common/rocket.svg'},
		{key:'common_heart', 'url':svgBaseUrl + 'common/heart.svg'},
		//{key:'common_umbrella', 'url':svgBaseUrl + 'common/umbrella.svg'},
		{key:'common_comment', 'url':svgBaseUrl + 'common/comment.svg'},
		{key:'common_trophy', 'url':svgBaseUrl + 'common/trophy.svg'},
	];
	
	$scope.svgMeteo = [
		{key:'meteo_cloud', 'url':svgBaseUrl + 'meteo/cloud.svg'},
		{key:'meteo_cloud_flash', 'url':svgBaseUrl + 'meteo/cloud_flash.svg'},
		{key:'meteo_cloud_flash_alt', 'url':svgBaseUrl + 'meteo/cloud_flash_alt.svg'},
		{key:'meteo_cloud_flash_inv', 'url':svgBaseUrl + 'meteo/cloud_flash_inv.svg'},
		{key:'meteo_cloud_inv', 'url':svgBaseUrl + 'meteo/cloud_inv.svg'},
		{key:'meteo_cloud_moon', 'url':svgBaseUrl + 'meteo/cloud_moon.svg'},
		{key:'meteo_cloud_moon_inv', 'url':svgBaseUrl + 'meteo/cloud_moon_inv.svg'},
		{key:'meteo_clouds', 'url':svgBaseUrl + 'meteo/clouds.svg'},
		{key:'meteo_clouds_flash', 'url':svgBaseUrl + 'meteo/clouds_flash.svg'},
		{key:'meteo_clouds_flash_alt', 'url':svgBaseUrl + 'meteo/clouds_flash_alt.svg'},
		{key:'meteo_clouds_flash_inv', 'url':svgBaseUrl + 'meteo/clouds_flash_inv.svg'},
		{key:'meteo_clouds_inv', 'url':svgBaseUrl + 'meteo/clouds_inv.svg'},
		{key:'meteo_cloud_sun', 'url':svgBaseUrl + 'meteo/cloud_sun.svg'},
		{key:'meteo_cloud_sun_inv', 'url':svgBaseUrl + 'meteo/cloud_sun_inv.svg'},
		{key:'meteo_compass', 'url':svgBaseUrl + 'meteo/compass.svg'},
		{key:'meteo_drizzle', 'url':svgBaseUrl + 'meteo/drizzle.svg'},
		{key:'meteo_drizzle_inv', 'url':svgBaseUrl + 'meteo/drizzle_inv.svg'},
		{key:'meteo_eclipse', 'url':svgBaseUrl + 'meteo/eclipse.svg'},
		{key:'meteo_fog', 'url':svgBaseUrl + 'meteo/fog.svg'},
		{key:'meteo_fog_cloud', 'url':svgBaseUrl + 'meteo/fog_cloud.svg'},
		{key:'meteo_fog_moon', 'url':svgBaseUrl + 'meteo/fog_moon.svg'},
		{key:'meteo_fog_sun', 'url':svgBaseUrl + 'meteo/fog_sun.svg'},
		{key:'meteo_hail', 'url':svgBaseUrl + 'meteo/hail.svg'},
		{key:'meteo_hail_inv', 'url':svgBaseUrl + 'meteo/hail_inv.svg'},
		{key:'meteo_mist', 'url':svgBaseUrl + 'meteo/mist.svg'},
		{key:'meteo_moon', 'url':svgBaseUrl + 'meteo/moon.svg'},
		{key:'meteo_moon_inv', 'url':svgBaseUrl + 'meteo/moon_inv.svg'},
		{key:'meteo_rain', 'url':svgBaseUrl + 'meteo/rain.svg'},
		{key:'meteo_rain_inv', 'url':svgBaseUrl + 'meteo/rain_inv.svg'},
		{key:'meteo_snow', 'url':svgBaseUrl + 'meteo/snow.svg'},
		{key:'meteo_snow_alt', 'url':svgBaseUrl + 'meteo/snow_alt.svg'},
		{key:'meteo_snowflake', 'url':svgBaseUrl + 'meteo/snowflake.svg'},
		{key:'meteo_snow_heavy', 'url':svgBaseUrl + 'meteo/snow_heavy.svg'},
		{key:'meteo_snow_heavy_inv', 'url':svgBaseUrl + 'meteo/snow_heavy_inv.svg'},
		{key:'meteo_snow_inv', 'url':svgBaseUrl + 'meteo/snow_inv.svg'},
		{key:'meteo_sun', 'url':svgBaseUrl + 'meteo/sun.svg'},
		{key:'meteo_sun_inv', 'url':svgBaseUrl + 'meteo/sun_inv.svg'},
		{key:'meteo_sunrise', 'url':svgBaseUrl + 'meteo/sunrise.svg'},
		{key:'meteo_temperature', 'url':svgBaseUrl + 'meteo/temperature.svg'},
		{key:'meteo_wind', 'url':svgBaseUrl + 'meteo/wind.svg'},
		{key:'meteo_windy', 'url':svgBaseUrl + 'meteo/windy.svg'},
		{key:'meteo_windy_inv', 'url':svgBaseUrl + 'meteo/windy_inv.svg'},
		{key:'meteo_windy_rain', 'url':svgBaseUrl + 'meteo/windy_rain.svg'},
		{key:'meteo_windy_rain_inv', 'url':svgBaseUrl + 'meteo/windy_rain_inv.svg'},
	];

	
	$scope.selectSvg = function (key) {
		$scope.p.values = key;
	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});


app.controller('MultipleOdataFilterParamDialogInstanceCtrl', function ($scope, $uibModal, $uibModalInstance,p) {
	console.log("p" ,p);	 
	$scope.p = p;
	if(typeof $scope.p.values == 'undefined' || $scope.p.values == null  || $scope.p.values.length<1)
		$scope.newValues =new Array();
	else{
		$scope.newValues = JSON.parse($scope.p.values);
		//$scope.newValues = $scope.p.values.replace("[","").replace("]","").replace(/"/g, "").split(",");
	}

	$scope.newValue = {};
	$scope.openNewFilterDialog = function(){
		console.log("MultipleOdataFilterParamDialogInstanceCtrl");
		var odataFilterParamDialogInstance = $uibModal.open({
			animation: true, backdrop  : 'static',
			size: 'lg',
			templateUrl: 'partials/modal/OdatafilterParamDialog.html',
			controller: 'OdatafilterParamDialogInstanceCtrl',
			resolve: {
				p: function () {return {};},
				current: function(){return $scope.current}
			}
		});
		
		odataFilterParamDialogInstance.result.then(function (value) {
			console.log("result",value);
			$scope.newValue.filter = value;
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};
	
	
	$scope.addValue = function(){
		if($scope.newValue.label && $scope.newValue.filter){
			$scope.newValues.push($scope.newValue);
			$scope.newValue = null;			
		}
		else{
			
		}
		
	};
	
	$scope.removeValue = function(valueIndex){
		if(typeof $scope.p.values!='undefined' && $scope.p.values!=null)
			$scope.newValues.splice(valueIndex,1);
	};
	
	$scope.ok = function () {
		//$scope.p.values = '["'+$scope.newValues.join('\",\"')+'"]';
		$scope.p.values = JSON.stringify($scope.newValues);

	    $uibModalInstance.close();
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
});