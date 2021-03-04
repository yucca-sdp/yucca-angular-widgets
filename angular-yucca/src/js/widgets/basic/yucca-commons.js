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