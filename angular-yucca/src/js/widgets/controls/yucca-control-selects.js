/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
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

