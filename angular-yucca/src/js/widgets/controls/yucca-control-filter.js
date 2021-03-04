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
			 if(attr.textcase == "uppercase")
				 scope.filter.value = scope.filter.value.toUpperCase();
			 else if(attr.textcase == "lowercase")
				 scope.filter.value = scope.filter.value.toLowerCase();
			 
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
		'	  <input type="text" class="yucca-control-filter-text" ng-blur="filterText()" ng-enter="filterText()" ng-model="filter.value" name="yucca-filter-text" id="yucca-filter-text-{{widgetId}}" placeholder="{{placeholder}}"/>' + 
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

