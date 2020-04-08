/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
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

