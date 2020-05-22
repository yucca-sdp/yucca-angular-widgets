'use strict';

// Declare app level module which depends on views, and components
var app  = angular.module('YuccaReferenceWidgetPreview', [
  'yucca.plugin',
  'angular-bind-html-compile',
  'ngSanitize',
  'LocalStorageModule'
]);
  


//app.config(['$routeProvider', '$translateProvider', function($routeProvider, $translateProvider) {
//	//$routeProvider.when('/home', {templateUrl: 'partials/home.html'});
//	$routeProvider.when('/install', {templateUrl: 'partials/install.html', currentSection: 'install'});
//	$routeProvider.when('/widget', {templateUrl: 'partials/widgets.html',controller: 'WidgetCtrl', currentSection: 'widget'});
//	$routeProvider.when('/widget/:selected_section/:selected_widget', {templateUrl: 'partials/widget.html',controller: 'WidgetCtrl', currentSection: 'widget'});
//	$routeProvider.when('/composer/', {templateUrl: 'partials/composer.html',controller: 'ComposerCtrl', currentSection: 'composer'});
//	$routeProvider.otherwise({redirectTo: '/install'});
//}]);



app.controller('PreviewCtrl', ['$scope', 'localStorageService','$interval',
		function($scope,localStorageService,$interval ) {
	console.log("preview");
	
	$scope.dashboard = localStorageService.get("yucca-widget-preview");
	$scope.isComponentReady_old = function(c){
		var isReady  = true;
		if(c && c.content && c.content.params){
			for (var paramSectionKey in c.content.params) {
			    if (c.content.params.hasOwnProperty(paramSectionKey)) {
			    	var paramSection = c.content.params[paramSectionKey];
					for (var paramKey in paramSection) {
					    if (paramSection.hasOwnProperty(paramKey)) {
			    	
					    	var v = paramSection[paramKey].values;
					    	
					    	if(paramSection[paramKey].mandatory == "true" && (v == null || v.length==0)){
					    		isReady  = false;
					    		break;
					    	}
					    }
					}
			    }
			}
			
		}
		return isReady;
	}
	
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
		return isReady;
	};

	$scope.getHtmlContent = function(c){
		return Utils.widget.getWidgetCodeRaw(c);
	};
	
	$scope.getCssContent = function(c){
		return Utils.widget.getWidgetCssRaw(c);
	};
	
	$scope.getDashboardCss_old = function(){
		var css = "";
		if($scope.dashboard){
			//console.log("getDashboardCss",$scope.dashboard);
			if($scope.dashboard.styleGlobal)
				css += $scope.dashboard.styleGlobal; 
			css += "#yucca-dashboard{" + $scope.dashboard.style + "}";
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
	
	$scope.getDashboardCss = function(){
		var css = "";
		if($scope.dashboard){
			//console.log("getDashboardCss",$scope.dashboard);
			if($scope.dashboard.styleGlobal)
				css += $scope.dashboard.styleGlobal; 
			css += "#yucca-dashboard{" + $scope.dashboard.style + "}";
			if($scope.dashboard.widgetPositionType == "grid")
				css += "#yucca-dashboard{grid-template-areas:" + $scope.dashboard.grid.templateAreas + "}";
				
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
			
			if($scope.dashboard.styleGrid && $scope.dashboard.styleGrid.panel){
				for (var pKey in $scope.dashboard.styleGrid.panel) {
				    if ($scope.dashboard.styleGrid.panel.hasOwnProperty(pKey) ) {
				    	css += "." + pKey + ".grid-panel{";
						for (var k in $scope.dashboard.styleGrid.panel[pKey]) {
						    if ($scope.dashboard.styleGrid.panel[pKey].hasOwnProperty(k)) {
						    	css += k + ":" + $scope.dashboard.styleGrid.panel[pKey][k] + ";";
						    }
						}
						css += "}";
				    }
				}
			}
		}
		return css;
	};
	
	$scope.refresh = function(){
		var loadedDashboard = localStorageService.get("yucca-widget-preview");
		if(JSON.stringify(loadedDashboard) != JSON.stringify($scope.dashboard)){
			$scope.dashboard = localStorageService.get("yucca-widget-preview");
		}
	};
	
	$interval( function(){
         if($scope.automatichRefresh)
        	 $scope.refresh();
     }, 2000);

}]);

