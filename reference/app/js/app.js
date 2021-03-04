'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('YuccaReference', [
	'ngRoute',
	'ngSanitize',
	'ui.bootstrap',
	'pascalprecht.translate',
	'yucca.plugin',
	'ngDraggable',
	'angular-bind-html-compile',
	'ngFileUpload',
	'LocalStorageModule'
]);


var supportedLanguages = ['it', 'en'];
/** config */
app.config(['$translateProvider', function ($translateProvider) {
	// add translation table
	$translateProvider
		.translations('en', translations_en)
		.translations('it', translations_it)
		.preferredLanguage('it');
}]);

app.config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {
	$routeProvider.when('/home', { templateUrl: 'partials/home.html' });
	$routeProvider.when('/install', { templateUrl: 'partials/install.html', currentSection: 'install' });
	$routeProvider.when('/widget', { templateUrl: 'partials/widgets.html', controller: 'WidgetCtrl', currentSection: 'widget' });
	$routeProvider.when('/widget/:selected_section/:selected_widget', { templateUrl: 'partials/widget.html', controller: 'WidgetCtrl', currentSection: 'widget' });
	$routeProvider.when('/composer/', { templateUrl: 'partials/composer.html', controller: 'ComposerCtrl', currentSection: 'composer' });
	$routeProvider.when('/advancedwidget/', { templateUrl: 'partials/advanced-widgets.html', controller: 'AdvancedWidgetCtrl', currentSection: 'advancedwidget' });
	$routeProvider.when('/advancedwidget/:selected_widget', { templateUrl: 'partials/advanced-widget.html', controller: 'AdvancedWidgetCtrl', currentSection: 'advancedwidget' });
	$routeProvider.when('/api', { templateUrl: 'partials/api.html', currentSection: 'api' });
	$routeProvider.otherwise({ redirectTo: '/home' });
}]);



app.run(function ($rootScope, $location, $anchorScroll) {
	$rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
		if ($location.hash()) $anchorScroll();
	});
});

app.run(['$rootScope', 'userportalAPIservice',
	function ($rootScope, userportalAPIservice, toastService) {

		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			console.log("$routeChangeSuccess");
			if (!$rootScope.currentUser) {
				userportalAPIservice.getCurrentUser().then(function (result) {
					$rootScope.currentUser = result.data;
					console.log("currenUser", $rootScope.currentUser);
				}, function (error) {
					console.error("getCurrentUser Error", error);
				});
			}
		})
	}]);
/** directive */
app.directive('mainHeader', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/main-header.html',
	};
});

app.directive('mainFooter', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/main-footer.html',
	};
});

app.directive('colorPicker', function () {
	return {
		restrict: 'E',
		template: '<div class="color-picker-widget-param input-group input-group-sm" >' +
			'  <input type="color" ng-model="colorvalue" class="form-control input-xs" > ' +
			'  <div class="input-group-btn" uib-dropdown> ' +
			'    <button type="button" class="btn dropdown-toggle" uib-dropdown-toggle>' +
			'  	   <span class="caret"></span>' +
			'    </button>' +
			'    <ul class="dropdown-menu" role="menu" uib-dropdown-menu >' +
			'      <li ng-repeat="line in defaultColors track by $index">' +
			'        <div class="default-color-box" ng-repeat="c in line track by $index" style="background-color: {{c}}" ng-click="selectColor(c)"></div>' +
			'      </li>' +
			'      <li><a href ng-click="clearColor()"><i class="fa fa-clear"></i>Reset</a></li>' +
			'    </ul>' +
			'  </div>' +
			'</div>',
		scope: {
			colorvalue: '=',
		},
		link: function (scope, element, attrs) {
			console.log("colorPicker");

			scope.defaultColors = [["#fce94f", "#edd400", "#c4a000"],
			["#fcaf3e", "#f57900", "#ce5c00"],
			["#e9b96e", "#c17d11", "#8f5902"],
			["#8ae234", "#73d216", "#4e9a06"],
			["#729fcf", "#3465a3", "#204a87"],
			["#ad7fa8", "#75507b", "#5c3566"],
			["#ef2929", "#cc0000", "#a40000"]];
			//				 ["#eeeeec","#d3d7cf","#babdb6"],
			//				 ["#888a85","#555753","#2e3436"]];

			scope.defaultColors2 = [["#19aeff", "#0047c8", "#005c94"],
			["#ccff42", "#9ade00", "#009100"],
			["#ffff3e", "#ff9900", "#ff6600"],
			["#eccd84", "#d49725", "#804d00"],
			["#ff4141", "#dc0000", "#b50000"],
			["#f1caff", "#d76cff", "#ba00ff"],
			["#9eabb0", "#364e59", "#0e232e"],
			["#cccccc", "#999999", "#666666"]];

			scope.defaultColors1 = [["#9e4d44", "#f7786b", "#fbc1bb"],
			["#5d6c85", "#91a8d0", "#ccd7e9"],
			["#023354", "#034f84", "#8baec6"],
			["#a08f26", "#fae03c", "#fdf1a5"],
			["#618d8e", "#98ddde", "#d0eff0"],
			["#616069", "#9896a4", "#d0cfd5"],
			["#8d2a20", "#dd4132", "#efa8a1"],
			["#715c44", "#b18f6a", "#dbccbb"],
			["#4d7f35", "#79c753", "#c1e5b0"]];

			scope.selectColor = function (color) {
				scope.colorvalue = color;
			}
			scope.clearColor = function () {
				scope.colorvalue = null;
			}
		}
	}
});

app.directive('typeaheadFocus', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attr, ngModel) {
			element.bind('click', function () {
				var viewValue = ngModel.$viewValue;
				if (ngModel.$viewValue == ' ') {
					ngModel.$setViewValue(null);
				}
				ngModel.$setViewValue(' ');
				ngModel.$setViewValue(viewValue || ' ');
			});

			scope.emptyOrMatch = function (actual, expected) {
				if (expected == ' ') {
					return true;
				}
				return actual.indexOf(expected) > -1;
			};
		}
	};
});

//app.directive('helpIstant',function(){
//    return  {
//       restrict: 'A',
//       link: function(scope, element, attrs) {
//    	   angular.element(element).append('<div class="instant-help-panel">test</div>');
//       }
//     }
//})
app.directive('helpInstantRefId', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			console.log("attrs", attrs, element);

			var el = document.getElementById(attrs.helpInstantRefId);
			console.log("el.offsetTop", el.offsetTop);
			console.log("el.clientTop", el.clientTop);
			console.log("el.pageYOffset ", el.getBoundingClientRect().top);
			console.log("el.offsetTop", el.offsetTop);
			var top = el.getBoundingClientRect().top + el.offsetHeight + 6;
			element.css("top", top + "px");
			element.css("left", el.offsetLeft + "px");
		}
	}
})

/** filter */
app.filter('arr2Str', function () {
	return function (input) {
		var res = input;
		if (input && input != null) {
			res = input.toString();
		}
		return res;
	};
});

app.filter('datatype', function () {
	return function (input) {
		var res = input;
		if (input) {
			if (input == 'string')
				res = 'ABC';
			else if (input == 'long' || input == 'int')
				res = '123';
			else if (input == 'float' || input == 'double')
				res = '1.2';
			else if (input == 'boolean')
				res = 'true';
			else if (input == 'dateTime')
				res = 'Date';
			else if (input == 'longitude' || input == 'latitude')
				res = 'GPS';
			else if (input == 'binary')
				res = 'Bin';





		}
		return res;
	};
});

app.filter('minus2underscore', function () {
	return function (input) {
		var res = input;
		if (input && input != null) {
			res = input.replace(/-/g, '_');
		}
		return res;
	};
});

app.filter('string_ellipse', function () {
	return function (text, length, end) {

		if (typeof text === "undefined" || text == null)
			text = "";

		if (isNaN(length))
			length = 10;

		if (end === undefined)
			end = "...";

		if (text.length <= length || text.length - end.length <= length) {
			return text;
		}
		else {
			return String(text).substring(0, length - end.length) + end;
		}
	};
});

app.filter('isEmpty', [function () {
	return function (object) {
		return angular.equals({}, object);
	}
}]);

/** controller */
app.controller('GlobalCtrl', ['$scope', '$translate', '$location', '$route', '$uibModal', 'userportalAPIservice', '$rootScope', '$interval',
	function ($scope, $translate, $location, $route, $uibModal, userportalAPIservice, $rootScope, $interval) {

		$scope.currentLang = 'it';
		var langParam = $location.search().lang;
		if (typeof langParam != 'undefined' && supportedLanguages.indexOf(langParam) >= 0) {
			$scope.currentLang = langParam;
			$translate.use(langParam);
		}


		$scope.changeLanguage = function (langKey) {
			$translate.use(langKey);
			$scope.currentLang = langKey;
		};

		$scope.changeActiveTenant = function (tenant) {
			userportalAPIservice.getCurrentUser(tenant).then(function (result) {
				$rootScope.currentUser = result.data;
				//localStorageService.set("lastActiveTenant",info.getActiveTenantCode());
			}, function (error) {
				console.error("changeActiveTenant Error", error);
			});

		};
		$scope.help = { istant: false };
		$scope.toggleHelpIstant = function () {
			$scope.help.istant = !$scope.help.istant;
		};

		$scope.currentSection = function () { return $route.current.currentSection; };

		$scope.widgetsForMenu = Widgets;

		$scope.featureStyle = function (feature) {
			var style = "";
			switch (feature) {
				case "social":
					style = 'fa fa-twitter';
					break;
				case "chart":
					style = 'fa fa-bar-chart';
					break;
				case "images":
					style = 'fa fa-picture-o';
					break;
				case "map":
					style = 'fa fa-map-marker';
					break;
				case "websocket":
					style = 'fa fa-rss widget-feature-icon-websocket';
					break;
				case "dataexplorer":
					style = 'fa fa-table';
					break;
				default:
					break;
			}
			return style;
		};

		// session manteiner
		$interval(function () {
			userportalAPIservice.getCurrentUser().then(function (result) {
				$rootScope.currentUser = result.data;
				console.log("currenUser", $rootScope.currentUser);
			}, function (error) {
				console.error("getCurrentUser Error", error);
			});
		}, 600000);



		$scope.openWidgetHelp = function (widgetKey) {
			$uibModal.open({
				animation: true,
				templateUrl: 'partials/modal/WidgetHelpDialog.html',
				controller: 'WidgetHelpDialogInstanceCtrl',
				//size: 'lg',
				resolve: {
					widgetKey: function () { return widgetKey; }
				}
			});
		};

	}]);

app.controller('WidgetCtrl', ['$scope', '$compile', '$route', '$uibModal', '$location', '$timeout', 'metadataapiAPIservice',
	function ($scope, $compile, $route, $uibModal, $location, $timeout, metadataapiAPIservice) {

		//$scope.widgetsReady = false;
		$scope.widgets = Widgets;
		console.log("widgets", $scope.widgets);
		$scope.showWidget = false;
		$timeout(function () { $scope.showWidget = true; });
		//$scope.widgetsReady = true;
		if ($route.current.params.selected_section) {
			$scope.widget = $scope.widgets[$route.current.params.selected_section][$route.current.params.selected_widget];
			if (WidgetsDemo[$scope.widget.key]) {
				for (var sectionKey in WidgetsDemo[$scope.widget.key]) {
					if (WidgetsDemo[$scope.widget.key].hasOwnProperty(sectionKey)) {
						for (var paramKey in WidgetsDemo[$scope.widget.key][sectionKey]) {
							if (WidgetsDemo[$scope.widget.key][sectionKey].hasOwnProperty(paramKey)) {
								console.log("sectionKey", sectionKey);
								$scope.widget.params[sectionKey][paramKey].values = WidgetsDemo[$scope.widget.key][sectionKey][paramKey];
							}
						}
					}
				}
			}
			//		else
			//			$scope.widget = null;
			$scope.current = { type: "yucca-widget", content: $scope.widget };
		}

		var datasetcode = Utils.has($scope.widget, "params.mandatory.datasetcode.values") ? $scope.widget.params.mandatory.datasetcode.values : null;
		var usertoken = Utils.has($scope.widget, "params.advanced.usertoken.values") ? $scope.widget.params.advanced.usertoken.values : null;

		$scope.datasetMetadata = null;
		var loadMetadata = function () {
			console.log("loadMetadata datasetcode, usertoken", datasetcode, usertoken);

			if (datasetcode)
				metadataapiAPIservice.loadDatasetDetail(datasetcode, usertoken).then(
					function (metadata) {
						console.log("loadMetadata data", metadata);
						$scope.datasetMetadata = metadata.data;
					},
					function (error) { console.error("loadMetadata error", error); }
				);
		};

		loadMetadata();


		//	$scope.prettifyCss = Utils.prettifyCss;
		//	$scope.changedParams = false;

		$scope.currentmillis = new Date().getTime();
		//	$scope.accordions = {"widget": {"basic":true}, "htmlelement": false, "params": {"mandatory_params":true}, "events": {"event_listening":true, "event_sending": true}, "export": false};


		//	$scope.changeParamEvent = function(){
		//		$scope.changedParams = true;
		//	};

		//	$scope.refreshPreview = function(widgetKey){
		//		var changedDirectiveUrl = Widgets[widgetKey].directiveUrl+'?t='+new Date().getTime();
		//		Widgets[widgetKey].directiveUrl = changedDirectiveUrl;
		//		$scope.changedParams = false;
		//	}; 

		//	for (var i = 0; i < 16; i++) {
		//		console.log("- ", i, i%4);
		//	}
		//	$scope.borderInGrid = function(cellIndex){
		//		var style = "";
		//		if(cellIndex%4 != 0)
		//			style += "widget-menu-item-border-left ";
		//		if(cellIndex>3)
		//			style += "widget-menu-item-border-top ";
		//		return style;
		//	}

		//	$scope.changedStyle = "";
		//	$scope.openChangeStyleDialog = function(widgetKey, styleSection, styleName){
		//		console.log(widgetKey, styleName);
		//		if(!customDialog)
		//			customDialog = 'ChangeStyle';
		//		var modalInstance = $uibModal.open({
		//			animation: true,
		//		    templateUrl: 'partials/modal/' + customDialog + 'Dialog.html',
		//		    controller: customDialog + 'DialogInstanceCtrl',
		//		    resolve: {
		//		    	widgetKey: function () {return widgetKey;},
		//		    	styleSection: function () {return styleSection;},
		//		    	styleName: function () {return styleName;},
		//		    	existingRules: function(){return $scope.widget.styles[styleSection][styleName].custom;}
		//		    }
		//		});
		//		
		//		modalInstance.result.then(function (res) {
		//			console.log("result",res);
		//		    $scope.widget.styles[styleSection][res.styleName].custom = res.rule;
		//		}, function () {
		//			$log.info('Modal dismissed at: ' + new Date());
		//		});
		//	};
		//	


		//	$scope.isComponentReady = function(c){
		//		var isReady  = true;
		//		if(c && c.content && c.content.params){
		//			for (var paramSectionKey in c.content.params) {
		//			    if (c.content.params.hasOwnProperty(paramSectionKey)) {
		//			    	var paramSection = c.content.params[paramSectionKey];
		//					for (var paramKey in paramSection) {
		//					    if (paramSection.hasOwnProperty(paramKey)) {
		//			    	
		//					    	var v = paramSection[paramKey].values;
		//					    	
		//					    	if(paramSection[paramKey].mandatory == "true" && (v == null || v.length==0)){
		//					    		isReady  = false;
		//					    		break;
		//					    	}
		//					    }
		//					}
		//			    }
		//			}
		//			
		//		}
		//		return isReady;
		//	}

		$scope.chooseWidget = function (widgetSection, widgetKey) {
			$location.path("/widget/" + widgetSection + "/" + widgetKey);
		};

		//	$scope.widgetCode = function(){
		//		return Utils.widget.getWidgetCodeRaw($scope.current);
		//	};

		$scope.widgetCode = function () {
			if ($scope.current.content) {
				$scope.widgetCodeRaw = Utils.widget.getWidgetCodeRaw($scope.current);
				return Utils.render.prettifyHtml($scope.widgetCodeRaw, 30);
			}
		};
		$scope.widgetStyle = function () {
			if ($scope.current.content) {
				var widgetCssRaw = Utils.widget.getWidgetCssRaw($scope.current);
				return Utils.render.prettifyCss(widgetCssRaw);
			}
		};

		$scope.getHtmlContent = function () {
			//console.log("getHtmlContent", c)
			//console.log("getHtmlContent", Utils.widget.getWidgetCodeRaw(c));
			if ($scope.current.content)
				return Utils.widget.getWidgetCodeRaw($scope.current);
		}



	}]);

app.controller('AdvancedWidgetCtrl', ['$scope', '$compile', '$route', '$uibModal', '$location', function ($scope, $compile, $route, $uibModal, $location) {
	$scope.widgets = {};
	$scope.widgets["advanced"] = AdvancedWidgets;
	console.log("AdvancedWidgetCtrl", $scope.widgets);
	$scope.chooseAdvancedWidget = function (widgetKey) {
		console.log("chooseAdvancedWidget", widgetKey);
		$location.path("/advancedwidget/" + widgetKey);
	};


	if ($route.current.params.selected_widget) {
		$scope.widget = $scope.widgets["advanced"][$route.current.params.selected_widget];
		angular.forEach($scope.widget.params, function (value, key) {
			$scope.widget.params[key].values = $scope.widget.params[key].custom;
		});

		angular.forEach($scope.widget.advancedParams, function (value, key) {
			$scope.widget.advancedParams[key].values = $scope.widget.advancedParams[key].custom;
		});


		console.log("chooseAdvancedWidget", $scope.widget);

	}

	$scope.widgetCode = "";

	$scope.getHtmlContent = function (c) {
		c.type = 'yucca-advanced-widget';
		var widgetCodeRaw = Utils.widget.getWidgetCodeRaw(c);
		$scope.widgetCode = Utils.render.prettifyHtml(widgetCodeRaw);
		return widgetCodeRaw;
	}


}]);

app.controller('WidgetHelpDialogInstanceCtrl', function ($scope, $uibModalInstance, widgetKey) {

	console.log("WidgetHelpDialogInstanceCtrl - widgetKey", widgetKey);

	$scope.widgetKey = widgetKey;
	$scope.ok = function () {
		$uibModalInstance.close();
	};
});

app.controller('CommonHelpDialogInstanceCtrl', function ($scope, $uibModalInstance) {
	$scope.ok = function () {
		$uibModalInstance.close();
	};
});


app.controller('ChangeStyleDialogInstanceCtrl', function ($scope, $uibModalInstance, widgetKey, styleSection, styleName, existingRules) {

	console.log("widgetKey,  styleName", widgetKey, styleSection, styleName, existingRules);

	var createCssRule = function (key, value, append) {
		var rule = "";
		if (typeof value != 'undefined' && value != null && value != '') {
			rule = key + ":" + value + append + ";";
		}
		return rule + " ";
	};



	var updateRules = function () {
		var rule = "";
		if ($scope.customStyle) {
			if ($scope.customStyle.font) {
				if ($scope.customStyle.font.size)
					rule += createCssRule("font-size", $scope.customStyle.font.size, "px");
				if ($scope.customStyle.font.weight)
					rule += createCssRule("font-weight", "bold", "");
				if ($scope.customStyle.font.style)
					rule += createCssRule("font-style", "italic", "");
			}
			if ($scope.customStyle.textAlign)
				rule += createCssRule("text-align", $scope.customStyle.textAlign, "");
			if ($scope.customStyle.color) {
				if ($scope.customStyle.color.foreground)
					rule += createCssRule("color", $scope.customStyle.color.foreground, "");
				if ($scope.customStyle.color.background)
					rule += createCssRule("background", $scope.customStyle.color.background, "");

			}

			if ($scope.customStyle.border && $scope.customStyle.border.position) {
				if (!$scope.customStyle.border.width)
					$scope.customStyle.border.width = 1;
				if (!$scope.customStyle.border.color)
					$scope.customStyle.border.color = "#000";
				if (!$scope.customStyle.border.style)
					$scope.customStyle.border.style = 'solid';

				rule += createCssRule("border-color", $scope.customStyle.border.color, "");
				rule += createCssRule("border-style", $scope.customStyle.border.style, "");

				if ($scope.customStyle.border.position == 'top')
					rule += createCssRule("border-width", $scope.customStyle.border.width + "px 0 0 0", "");
				else if ($scope.customStyle.border.position == 'right')
					rule += createCssRule("border-width", "0 " + $scope.customStyle.border.width + "px 0 0", "");
				else if ($scope.customStyle.border.position == 'bottom')
					rule += createCssRule("border-width", "0 0 " + $scope.customStyle.border.width + "px 0", "");
				else if ($scope.customStyle.border.position == 'left')
					rule += createCssRule("border-width", "0 0 0 " + $scope.customStyle.border.width + "px", "");
				else if ($scope.customStyle.border.position == 'top-bottom')
					rule += createCssRule("border-width", $scope.customStyle.border.width + "px 0", "");
				else if ($scope.customStyle.border.position == 'left-right')
					rule += createCssRule("border-width", " 0 " + $scope.customStyle.border.width + "px", "");
				else if ($scope.customStyle.border.position == 'all')
					rule += createCssRule("border-width", $scope.customStyle.border.width + "px", "");
				else if ($scope.customStyle.border.position == 'none')
					rule += createCssRule("border", "none", "");



			}

			if ($scope.customStyle.margin) {
				if ($scope.customStyle.margin.top)
					rule += createCssRule("margin-top", $scope.customStyle.margin.top, "px");
				if ($scope.customStyle.margin.right)
					rule += createCssRule("margin-right", $scope.customStyle.margin.right, "px");
				if ($scope.customStyle.margin.bottom)
					rule += createCssRule("margin-bottom", $scope.customStyle.margin.bottom, "px");
				if ($scope.customStyle.margin.left)
					rule += createCssRule("margin-left", $scope.customStyle.margin.left, "px");
			}
			if ($scope.customStyle.padding) {
				if ($scope.customStyle.padding.top)
					rule += createCssRule("padding-top", $scope.customStyle.padding.top, "px");
				if ($scope.customStyle.padding.right)
					rule += createCssRule("padding-right", $scope.customStyle.padding.right, "px");
				if ($scope.customStyle.padding.bottom)
					rule += createCssRule("padding-bottom", $scope.customStyle.padding.bottom, "px");
				if ($scope.customStyle.padding.left)
					rule += createCssRule("padding-left", $scope.customStyle.padding.left, "px");
			}
		}
		return rule;
	};

	$scope.refreshPreview = function () {
		$scope.rulesPreview = updateRules();
		if ($scope.rulesPreview)
			$scope.rulesCodePreview = $scope.rulesPreview.replace(new RegExp("; ", 'g'), ";<br>");
	};

	if (existingRules) {
		try {
			$scope.customStyle = { font: {}, color: {}, border: {}, margin: {}, padding: {} };
			var ruleArr = existingRules.split("; ");
			for (var i = 0; i < ruleArr.length; i++) {
				var r = ruleArr[i].split(":");
				if (r[0] == 'font-size')
					$scope.customStyle.font.size = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'font-weight')
					$scope.customStyle.font.weight = true;
				else if (r[0] == 'font-style')
					$scope.customStyle.font.style = true;
				else if (r[0] == 'text-align')
					$scope.customStyle.textAlign = r[1];
				else if (r[0] == 'color')
					$scope.customStyle.color.foreground = r[1];
				else if (r[0] == 'background')
					$scope.customStyle.color.background = r[1];
				else if (r[0] == 'text-align')
					$scope.customStyle.textAlign = r[1];
				else if (r[0] == 'border-color')
					$scope.customStyle.border.color = r[1];
				else if (r[0] == 'border-style')
					$scope.customStyle.border.style = r[1];
				else if (r[0] == 'border' && r[1] == 'none')
					$scope.customStyle.border.position = r[1];
				else if (r[0] == 'border-width') {
					var borderWidths = r[1].split(" ");
					if (borderWidths.length == 1) {
						$scope.customStyle.border.width = parseInt(borderWidths[0].replace("px", ""));
						$scope.customStyle.border.position = 'all';
					}
					else if (borderWidths.length == 2) {
						if (borderWidths[0] == 0) {
							$scope.customStyle.border.width = parseInt(borderWidths[1].replace("px", ""));
							$scope.customStyle.border.position = 'left-right';
						}
						else if (borderWidths[1] == 0) {
							$scope.customStyle.border.width = parseInt(borderWidths[0].replace("px", ""));
							$scope.customStyle.border.position = 'top-bottom';
						}
					}
					else if (borderWidths.length == 4) {
						var borderPosition = ['top', 'right', 'bottom', 'left'];
						for (var j = 0; j < borderWidths.length; j++) {
							if (borderWidths[j] != 0) {
								$scope.customStyle.border.width = parseInt(borderWidths[j].replace("px", ""));
								$scope.customStyle.border.position = borderPosition[j];
								break;
							}
						}
					}
				}
				else if (r[0] == 'margin-top')
					$scope.customStyle.margin.top = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'margin-right')
					$scope.customStyle.margin.right = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'margin-bottom')
					$scope.customStyle.margin.bottom = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'margin-left')
					$scope.customStyle.margin.left = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'padding-top')
					$scope.customStyle.padding.top = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'padding-right')
					$scope.customStyle.padding.right = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'padding-bottom')
					$scope.customStyle.padding.bottom = parseInt(r[1].replace("px", ""));
				else if (r[0] == 'padding-left')
					$scope.customStyle.padding.left = parseInt(r[1].replace("px", ""));


			}
			$scope.refreshPreview();
		}
		catch (e) {
			console.error("ChangeStyleDialogInstanceCtrl error in parsing existing rule", existingRules);
		}



	}



	$scope.ok = function () {
		$uibModalInstance.close({ "widgetKey": widgetKey, "styleSection": styleSection, "styleName": styleName, "rule": updateRules() });
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});



app.controller('ForceDirectedLegendPositionDialogInstanceCtrl', function ($scope, $uibModalInstance, widgetKey, styleSection, styleName, existingRules) {

	console.log("widgetKey,  styleName", widgetKey, styleSection, styleName, existingRules);

	var createCssRule = function (key, value, append) {
		var rule = "";
		if (!append)
			append = "";
		if (typeof value != 'undefined' && value != null && value != '') {
			rule = key + ":" + value + append + ";";
		}
		return rule + " ";
	};

	if (existingRules) {
		try {
			if (existingRules.split(":")[1].replace(";", "").replace(" ", "") == "column-reverse")
				$scope.legend = { position: 'top' };
		}
		catch (e) {
			console.error("ChangeStyleDialogInstanceCtrl error in parsing existing rule", existingRules);
		}
	}

	$scope.ok = function () {
		var rule = "";
		if ($scope.legend.position == 'top')
			rule = createCssRule("flex-direction", "column-reverse");
		else
			rule = createCssRule("flex-direction", "column");
		$uibModalInstance.close({ "widgetKey": widgetKey, "styleSection": styleSection, "styleName": styleName, "rule": rule });
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});


app.controller('DashboardWidgetStylesDialogInstanceCtrl', function ($scope, $uibModalInstance, widgetKey, styleSection, styleName, existingRules) {

	console.log("widgetKey,  styleName", widgetKey, styleSection, styleName, existingRules);

	var createCssRule = function (key, value, append) {
		var rule = "";
		if (!append)
			append = "";
		if (typeof value != 'undefined' && value != null && value != '') {
			rule = key + ":" + value + append + ";";
		}
		return rule + " ";
	};

	if (existingRules) {
		try {
			if (existingRules && existingRules.split(":")[1].replace(";", "").replace(" ", ""))
				$scope.dashboard = { flexgrow: parseInt(existingRules.split(":")[1].replace(";", "").replace(" ", "")) };
		}
		catch (e) {
			console.error("ChangeStyleDialogInstanceCtrl error in parsing existing rule", existingRules);
		}
	}

	$scope.ok = function () {
		var rule = "";
		if (!$scope.dashboard.flexgrow)
			$scope.dashboard.flexgrow = 0;
		rule = createCssRule("flex-grow", $scope.dashboard.flexgrow);
		$uibModalInstance.close({ "widgetKey": widgetKey, "styleSection": styleSection, "styleName": styleName, "rule": rule });
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ForceDirectedNodesLinksDialogInstanceCtrl', function ($scope, $uibModalInstance, widgetKey, styleSection, styleName, existingRules, current) {

	console.log("widgetKey,  styleName", widgetKey, styleSection, styleName, existingRules);
	console.log("current", current);

	var relations = new Array();
	if (Utils.has(current, 'content.params.mandatory.relations.values') && current.content.params.mandatory.relations.values != "")
		relations = JSON.parse(current.content.params.mandatory.relations.values);

	$scope.nodes = {};
	$scope.links = {};
	for (var i = 0; i < relations.length; i++) {
		if (!$scope.nodes[relations[i].sourceType])
			$scope.nodes[relations[i].sourceType] = { name: relations[i].sourceType };
		if (!$scope.nodes[relations[i].targetType])
			$scope.nodes[relations[i].targetType] = { name: relations[i].targetType };
		if (!$scope.links[relations[i].relationType])
			$scope.links[relations[i].relationType] = { name: relations[i].relationType };
	}


	var createCssRule = function (key, value, append) {
		var rule = "";
		if (!append)
			append = "";
		if (typeof value != 'undefined' && value != null && value != '') {
			rule = key + ":" + value + append + ";";
		}
		return rule + " ";
	};

	if (existingRules) {
		try {
			if (existingRules.split(":")[1].replace(";", "").replace(" ", "") == "column-reverse")
				$scope.legend = { position: 'top' };
		}
		catch (e) {
			console.error("ChangeStyleDialogInstanceCtrl error in parsing existing rule", existingRules);
		}
	}

	$scope.ok = function () {
		var rules = new Array;
		for (var nodeKey in $scope.nodes) {
			if ($scope.nodes.hasOwnProperty(nodeKey)) {
				var node = $scope.nodes[nodeKey];
				var r = "";
				if (node.size)
					r += createCssRule("stroke-width", node.size, "px");
				if (node.color)
					r += createCssRule("stroke", node.color, "");
				if (node.bgcolor)
					r += createCssRule("fill", node.bgcolor, "");
				if (r != "")
					rules.push({ selector: ".forcedirected-chart .node." + node.name, "rule": r });
			}
		}
		for (var linkKey in $scope.links) {
			if ($scope.links.hasOwnProperty(linkKey)) {
				var link = $scope.links[linkKey];
				var r = "";
				if (link.size)
					r += createCssRule("stroke-width", link.size, "px");
				if (link.color)
					r += createCssRule("stroke", link.color, "");
				if (link.style && link.style == 'dashed')
					r += createCssRule("stroke-dasharray", "5, 5", "");
				if (r != "")
					rules.push({ selector: ".forcedirected-chart .link.link_" + link.name, "rule": r });
			}
		}

		$uibModalInstance.close({ "widgetKey": widgetKey, "styleSection": styleSection, "styleName": styleName, "rule": null, "rules": rules });
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});



app.factory('readFilePreview', function ($q) {
	return {
		readTextFile: function (file, previewSize, encoding) {
			var deferread = $q.defer();
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				var reader = new FileReader();
				console.log("file", file);
				if ((file !== undefined) && (file !== null)) {
					reader.onload = function (event) {

						deferread.resolve(event.target.result);
					};
					var firstBytes = file.slice(0, previewSize + 1);
					reader.readAsText(firstBytes, encoding);
				} else {
					console.log("reject", file);
					deferread.reject("You need to pass a file.");
				}
			} else {
				deferread.reject("Your browser don't support File api.");
			}

			return deferread.promise;
		},
		readImageFile: function (file) {
			var deferread = $q.defer();
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				var reader = new FileReader();
				console.log("file", file);
				if ((file !== undefined) && (file !== null)) {
					reader.onload = function (event) {
						deferread.resolve(event.target.result);
					};
					reader.readAsDataURL(file);
				} else {
					console.log("reject", file);
					deferread.reject("You need to pass a file.");
				}
			} else {
				deferread.reject("Your browser don't support File api.");
			}

			return deferread.promise;
		}
	};
});