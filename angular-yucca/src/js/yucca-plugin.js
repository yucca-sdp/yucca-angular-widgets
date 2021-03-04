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

yuccaWidgetsModule.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
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
