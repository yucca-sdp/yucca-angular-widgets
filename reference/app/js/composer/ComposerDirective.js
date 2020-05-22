'use strict';

app.directive('paramConfig', function($compile) {
	return {
		restrict : 'E',
		 scope:{
	          directiveType:'@',
	          param: "=", current: "="
	        },
	        link:function(scope,elem, attrs){
		      console.debug("paramConfig",scope.directiveType);
	          var template='<' + scope.directiveType + ' param="param" current="current"></'+ scope.directiveType + '>';
	          template= $compile(template)(scope);
	          elem.replaceWith(template);
	        }
	};
});

app.directive('paramConfigInputtext', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<input type="text" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" ng-model-options="{debounce: 750}">', 
	}
});

app.directive('paramConfigInputtextarea', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<textarea class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" ng-model-options="{debounce: 750}" rows="3">', 
	}
});

app.directive('paramConfigInputnumber', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<input type="number" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" ng-model-options="{debounce: 750}">', 
	}
});

app.directive('paramConfigInputpercent', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<div class="input-range input-range-widget-param">' + 
	        		'<input string-to-number type="range" min="0" max="100" step="1" ng-change="updateValues()" class="form-control input-xs" id="i_{{param.name}}" ng-model="par.values" ng-model-options="{debounce: 750}">'+
	        		'<small ng-if="param.values" class="mute nowrap">{{par.values}} &percnt;</small>' +
	        		'</div>', 
	        link:function(scope,elem, attrs){
	        	if(scope.param.values)
	        		scope.par = {values:parseInt(scope.param.values*100)};
	        	
	        	scope.updateValues = function(){
	        		if(scope.par.values)
	        		scope.param.values = scope.par.values/100;
	        	}
	        }
	}
});


app.directive('paramConfigInputboolean', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },  //ng-change='changePrivacy(privacyAcceptance)'
	        template:'<div class="checkbox checkbox-widget-param"><label>'+
				'<input type="checkbox" ng-model="param.values">'+
				'	<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
				'	<span translate-cloak translate>yes</span>'+
				'</label></div>', 
	}
});


app.directive('paramConfigInputselect', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },  
	        template:'<select ng-model="param.values"  class="form-control input-xs" ng-change="selectChanged(param.values)">'+
				'	<option ng-repeat="opt in param.data track by $index" value="{{opt}}">{{param.name+ "_" +opt|translate}}</option>'+
				'</select>', 
	}
});

app.directive('paramConfigChartaxis', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<div class="inline-input-widget"><div class="checkbox checkbox-widget-param"><label>'+
			'<input type="checkbox" ng-model="par.hide" ng-change="updateValues()">'+
			'	<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
			'	<span translate-cloak translate title="{{\'param_hide_axis\'|translate}}"><i class="fa fa-eye-slash"></i></span>'+
			'  </label></div>' +
			'  <div class="checkbox checkbox-widget-param"><label>'+
			'   <input type="checkbox" ng-model="par.staggerLabels" ng-change="updateValues()">'+
			'	<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
			'	<span translate-cloak translate title="{{\'param_stagger_labels_axis\'|translate}}"><i class="fa fa-exchange fa-rotate-90"></i></span>'+
			'  </label></div>'+
			'  <label class="ng-hide" translate>param_axis_label</label> '+
			'  <input type="text" ng-model="par.label"  style="width:8em" ng-change="updateValues()" ng-disabled="par.hide" placeholder="{{\'param_axis_label\'|translate}}">'+
			'  <label class="ng-hide" translate>param_rotate_labels</label> '+
			'  <div class="input-group"> '+
			'	 <span class="input-group-addon" title="{{\'param_rotate_labels\'|translate}}" style="font-size: 16px;border: none;background-color: white;font-weight: bold;padding-right:4px">&angmsd;</span>'  +
			'    <input type="number" class="form-control" ng-model="par.rotateLabels" style="width:4.5em" ng-change="updateValues()" ng-disabled="par.hide" placeholder="0">'+
			'  </div>' +
			'</div>', 
	        link:function(scope,elem, attrs){
		        //console.log("paramConfigTenantcode",scope,elem, attrs);
	        	if(scope.param.values)
	        		scope.par = scope.$eval(scope.param.values);
	        	else
	        		scope.par= {"hide":false, label: ""};
	        	
	        	scope.updateValues = function(){
	        		if(scope.par.hide)
	        			scope.par.label="";
	        		scope.param.values = JSON.stringify(scope.par);
	        	}
	        }
	}
});

app.directive('paramConfigChartlegend', function($uibModal) {
	return {
		  restrict: 'E',
		  template: '<div  class=" form-control form-control-label-button">'+
			'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
			'	<a href ng-click="openMultipleLegendDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
			'</div>',
		  scope: {
			param: '=',
		  },
		  link: function(scope, element, attrs){
			  console.log("legend");
			  scope.openMultipleLegendDialog = function(p){
					console.log("openLegendParamDialog", p);
					$uibModal.open({
						animation: true, backdrop  : 'static',
					    templateUrl: 'partials/modal/LegendParamDialog.html',
					    controller: 'LegendParamDialogInstanceCtrl',
					    resolve: {
					    	p: function () {return p;},
					    	type: function(){return 'chart';}
					    }
					});
				};
	      }
		}
});

app.directive('paramConfigMaplegend', function($uibModal) {
	return {
		  restrict: 'E',
		  template: '<div  class=" form-control form-control-label-button">'+
			'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
			'	<a href ng-click="openMultipleLegendDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
			'</div>',
		  scope: {
			param: '=',
		  },
		  link: function(scope, element, attrs){
			  console.log("legend");
			  scope.openMultipleLegendDialog = function(p){
					console.log("openLegendParamDialog", p);
					$uibModal.open({
						animation: true, backdrop  : 'static',
					    templateUrl: 'partials/modal/LegendParamDialog.html',
					    controller: 'LegendParamDialogInstanceCtrl',
					    resolve: {
					    	p: function () {return p;},
					    	type: function(){return 'map';}
					    }
					});
				};
	      }
		}
});


app.directive('paramConfigInputcolor', function() {
	return {
	  restrict: 'E',
	  template: '<color-picker colorvalue="param.values" />',
	  scope: {
		param: '=', current: '@'
	  },
	}
});

app.directive('paramConfigMultipleinputtext', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openMultipleParamDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("colorPicker");
		  scope.openMultipleParamDialog = function(p){
				console.log("openMultipleParamDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
				    templateUrl: 'partials/modal/MultipleParamDialog.html',
				    controller: 'MultipleParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;}
				    }
				});
			};
      }
	}
});


app.directive('paramConfigMultiplekeylabeltext', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openMultiplekeylabelDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigMultiplekeylabeltext");
		  scope.openMultiplekeylabelDialog = function(p){
				console.log("openMultiplekeylabelDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/MultipleKeyLabelParamDialog.html',
				    controller: 'MultipleParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;}
				    }
				});
			};
      }
	}
});


app.directive('paramConfigMultipleinputcolor', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0">'+
		'     <div ng-repeat="c in colors track by $index" class="form-contro-multiple-color-item" style="background-color: {{c}}" title="{{c}}">&nbsp;</div>'+
		'	</div>'+
		'	<a href ng-click="openMultipleParamDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigMultipleinputcolor");
		  scope.colors = new Array();
		  scope.openMultipleParamDialog = function(p){
				console.log("openMultipleParamDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
				    templateUrl: 'partials/modal/MultipleColorParamDialog.html',
				    controller: 'MultipleParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	inputtype: function(){return 'inputcolor';}
				    }
				});
				openMultipleParamDialogInstance.result.then(function (res) {
					if(scope.param.values)
						scope.colors = scope.$eval(scope.param.values);
					else
						scope.colors = new Array();
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
			};
			
      }
	}
});

app.directive('paramConfigMultiplerangecolor', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0">'+
		'     <div ng-repeat="c in colors track by $index" class="form-contro-multiple-color-item" style="background-color: {{c}}" title="{{c}}">&nbsp;</div>'+
		'	</div>'+
		'	<a href ng-click="openMultipleParamDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigMultiplerangecolor");
		  scope.colors = new Array();
		  scope.openMultipleParamDialog = function(p){
				console.log("openMultipleParamDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
				    templateUrl: 'partials/modal/MultipleRangeColorParamDialog.html',
				    controller: 'MultipleParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	inputtype: function(){return 'inputcolor';}
				    }
				});
				openMultipleParamDialogInstance.result.then(function (res) {
					if(scope.param.values)
						scope.colors = scope.$eval(scope.param.values);
					else
						scope.colors = new Array();
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
			};
			
      }
	}
});

app.directive('paramConfigTenantcode', function(metadataapiAPIservice) {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<div class="input-with-feedback">' +
	        		 '<input type="text" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" ' + 
	        		 'uib-typeahead="tenantCode for tenantCode in allTenant | filter:$viewValue:caseinsensitive | limitTo:8" typeahead-loading="loadingTenants">'+
	        		 '<i class="fa fa-circle-o-notch fa-spin input-feedback" title="Loading..." ng-show="loadingTenants"></i></div>', 
	        link:function(scope,elem, attrs){
		        console.debug("paramConfigTenantcode param", scope.param);
	        	scope.allTenant = [];
	        	metadataapiAPIservice.loadTenants().then(
	        		function(result){
	        			if(result && result!=null){
	        				try{
	        					var tenantItems = result.data.facetCount.facetFields.tenantCode.facetItems;
	        					angular.forEach(tenantItems, function(count, tenantcode) {
	        						if(count>0)
	        							scope.allTenant.push(tenantcode);
	        					});
	        					scope.allTenant.sort();
	        					console.log("scope.allTenant", scope.allTenant);
	        				}
	        				catch(err){
	        					console.warn("loadTenants error" , err);
	        				} 			
	        			}
	        		},
	        		function(result){
	        			console.error("loadTenants error", result);
	        		}
	        	);
	        	
	        	
	        	scope.caseinsensitive = function(item, viewValue) {
	        		return item.toLowerCase().indexOf(viewValue.toLowerCase()) !== -1;
	        	}
	        }
	};
});

app.directive('paramConfigDatasetcode', function(metadataapiAPIservice) {
	return {
		restrict : 'E',
		 scope:{
			 param: "=", current: "="
	        },
	        template:'<div class="input-with-feedback"><input type="text" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" typeahead-wait-ms="300"' +
	        	' uib-typeahead="datasetCode as datasetCode  for datasetCode in  getDatasets($viewValue) | limitTo:8" typeahead-loading="loadingDatasets">' + 
	        	'<i class="fa fa-circle-o-notch fa-spin input-feedback" title="Loading Datasets..." ng-show="loadingDatasets"></i></div>', 
	        link:function(scope,elem, attrs){
		        console.debug("paramConfigDatasetcode param", scope.current);
		        
		        scope.getDatasets = function(val) {
		        	console.log("paramConfigDatasetcode::getDatasets", val, scope.current);
		        	var tenantcode = null;
		        	if(Utils.has(scope.current, 'content.params.mandatory.tenantcode.name'))
		        		tenantcode = scope.current.content.params.mandatory.tenantcode.values;
		        	return metadataapiAPIservice.loadDatasets(tenantcode).then(function(response){
		        		console.log("loadDatasets response",response);
		        		var allDataset = new Array();
		        		for (var i = 0; i < response.data.metadata.length; i++) {
		        			console.debug("response.data.metadata", response.data.metadata[i]);
							if(response.data.metadata[i].dataset && response.data.metadata[i].dataset.code.toLowerCase().includes(val.toLowerCase()))
								allDataset.push(response.data.metadata[i].dataset.code);
						}
		        		return allDataset;
				    },
	        		function(result){
	        			console.error("loadDatasets error", result);
	        		});
				  };
		        
	        }
	};
});

app.directive('paramConfigUsertoken', function(metadataapiAPIservice, userportalAPIservice) {
	return {
		restrict : 'E',
		 scope:{
			 param: "=", current: "="
	        },
	        template:'<div class="input-with-feedback"><input type="text" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" typeahead-wait-ms="300"' +
	        	' uib-typeahead="usertoken.prodKey as usertoken.name  for usertoken in  getUsertokens($viewValue) | limitTo:8" typeahead-loading="loadingUsertokens">' + 
	        	'<i class="fa fa-info input-feedback" title="{{usertokenList}}" ></i></div>', 
	        	//'<span class="input-group-addon" id="basic-addon2"  title="{{columnsList}}"><i class="fa fa-info"></i>', 
	        link:function(scope,elem, attrs){
		        console.debug("paramConfigUsertoken param", scope.current);
		        
		        scope.usertokenList  = "";
		    	var usertokensMap = {};
		        var loadUsertokes = function() {
		        	return userportalAPIservice.loadUsertokens().then(function(response){
		        		console.log("loadUsertokens response",response);
		        		var allUsertokens = new Array();
		        		for (var i = 0; i < response.data.subscriptions.length; i++) {
		        			usertokensMap[response.data.subscriptions[i].prodKey] = {"name":response.data.subscriptions[i].name, "prodKey":response.data.subscriptions[i].prodKey};
		    				scope.usertokenList += response.data.subscriptions[i].name + " - " + response.data.subscriptions[i].prodKey + "\n";
						}
				    },
	        		function(result){
	        			console.error("loadUsertokens error", result);
	        		});
				};
				
				loadUsertokes();
				
				scope.getUsertokens= function(val) {
					var allUsertokens = new Array();
					for (var usertokenName in usertokensMap) {
						if (usertokensMap.hasOwnProperty(usertokenName) && (usertokenName.includes(val) || usertokensMap[usertokenName].name.includes(val)))
							allUsertokens.push(usertokensMap[usertokenName]);
				    }
					console.log("allUsertokens",allUsertokens);
					return allUsertokens;
				};
	        }
	};
});


app.directive('paramConfigDatasetcolumn', function(metadataapiAPIservice, $uibModal) {
	return {
		restrict : 'E',
		 scope:{
			 param: "=", current: "="
	        },
	        template:'<div  class=" form-control form-control-label-button">'+
			'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
			'	<a href ng-click="openDatasetColumnDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
			'</div>', 
	        link:function(scope,elem, attrs){
		        //console.log("paramConfigTenantcode",scope,elem, attrs);
		        console.debug("paramConfigDatasetcode param", scope.current);
		        
		        scope.openDatasetColumnDialog = function(p){
					console.log("openDatasetColumnDialog", p);
					var openMultipleParamDialogInstance = $uibModal.open({
						animation: true, backdrop  : 'static',
					    templateUrl: 'partials/modal/DatasetColumnParamDialog.html',
					    controller: 'DatasetColumnParamDialogInstanceCtrl',
					    resolve: {
					    	p: function () {return p;},
					    	current: function(){return scope.current},
					    	isValuecolumn: function () {return false;}
					    }
					});
				};
		        		       
	        }
	};
});

app.directive('paramConfigDatasetcolumnkey', function(metadataapiAPIservice) {
	return {
		restrict : 'E',
		 scope:{
			 param: "=", current: "="
	        },
	        template:'<div class="inline-input-widget input-with-feedback">'+
	        	'<input type="text" class="form-control input-xs" style="width:8em; margin-right: 1em;"  id="i_{{param.name}}" ng-model="par.value"' +
	        	' uib-typeahead="columnKey for columnKey in  columns | filter:$viewValue:caseinsensitive | limitTo:8" ng-blur="updateValues()" placehoder="Column name">' + 
	        	'<div class="checkbox checkbox-widget-param"><label>'+
				'<input type="checkbox" ng-model="par.desc" ng-change="updateValues()">'+
				'	<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
				'	<span translate-cloak translate>param_orderby_desc</span>'+
				'  </label></div>'+
				'</div>', 
	        link:function(scope,elem, attrs){
		        console.debug("paramConfigDatasetcode param", scope.current);
		        
		        scope.columns = new Array();
		        scope.par = {}
		        if(scope.param && scope.param.values){
		        	var splitted = scope.param.values.split(" ");
		        	scope.par.value = splitted[0];
		        	if(splitted[1])
		        		scope.par.desc = true;
		        }
		        
		        var loadColumns = function(){
		    		metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
		        		for (var i = 0; i < response.data.components.length; i++) {
		    				scope.columns.push(response.data.components[i].name);
		    			}
		    	    },
		    		function(result){
		    			console.error("loadDatasets error", result);
		    		});
		    	};
		    	
		    	//loadColumns();
		    	
		    	var datasetcode = null
		    	if(Utils.has(scope.current, 'content.params.mandatory.datasetcode.values') && scope.current.content.params.mandatory.datasetcode.values){
		    		datasetcode = scope.current.content.params.mandatory.datasetcode.values;
		    		console.log("datasetcode", datasetcode);
		    		loadColumns();
		    	}
		    	
				scope.caseinsensitive = function(item, viewValue) {
					return item.toLowerCase().indexOf(viewValue.toLowerCase()) !== -1;
				}

		    	
		    	scope.updateValues = function(){
		    		scope.param.values = scope.par.value;
		    		if(scope.par.desc)
		    			scope.param.values += " desc"; 
		    	}
		    	
		    	
		    	
	        }
	};
});


app.directive('paramConfigDatasetcolumns', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openDatasetcolumnsDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=', current: "="
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigMultiplekeylabeltext");
		  scope.openDatasetcolumnsDialog = function(p){
				console.log("openDatasetcolumnsDialog", p);
				var openDatasetcolumnsDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/DatasetColumnsParamDialog.html',
				    controller: 'DatasetcolumnsDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	current: function(){return scope.current},
				    }
				});
			};
      }
	}
});


app.directive('paramConfigDatasetvaluecolumn', function(metadataapiAPIservice, $uibModal) {
	return {
		restrict : 'E',
		 scope:{
			 param: "=", current: "="
	        },
	        template:'<div  class=" form-control form-control-label-button">'+
			'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
			'	<a href ng-click="openDatasetColumnDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
			'</div>', 
	        link:function(scope,elem, attrs){
		        //console.log("paramConfigTenantcode",scope,elem, attrs);
		        console.debug("paramConfigDatasetcode param", scope.current);
		        
		        scope.openDatasetColumnDialog = function(p){
					console.log("openDatasetColumnDialog", p);
					var openMultipleParamDialogInstance = $uibModal.open({
						animation: true, backdrop  : 'static',
					    templateUrl: 'partials/modal/DatasetColumnParamDialog.html',
					    controller: 'DatasetColumnParamDialogInstanceCtrl',
					    resolve: {
					    	p: function () {return p;},
					    	current: function(){return scope.current},
					    	isValuecolumn: function () {return true;}
					    }
					});
				};
		        		       
	        }
	};
});

// key: 'presenza_stranieri','label':'Presenze Stranieri', 'classed':'dashed', color: '#333333',strokeWidth: 2
app.directive('paramConfigDatasetseriecolumns', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openSeriecolumnsDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=', current: "=",
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigDatasetseriecolumns");
		  scope.openSeriecolumnsDialog = function(p){
				console.log("openSeriecolumnsDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/DatasetSerieColumnsParamDialog.html',
				    controller: 'DatasetSerieColumnsParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	current: function(){return scope.current}
				    }
				});
			};
      }
	}
});

app.directive('paramConfigDatasetvaluecolumns', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openValuecolumnsDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=', current: "=",
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigDatasetvaluecolumns");
		  scope.openValuecolumnsDialog = function(p){
				console.log("openValuecolumnsDialog", p);
				var openValuecolumnsDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/DatasetValueColumnsParamDialog.html',
				    controller: 'DatasetValueColumnsParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	current: function(){return scope.current}
				    }
				});
			};
      }
	}
});

app.directive('paramConfigBoxplotcolumns', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openBoxPlotcolumnsDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=', current: "=",
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigDatasetseriecolumns");
		  scope.openBoxPlotcolumnsDialog = function(p){
				console.log("openSeriecolumnsDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					//size: 'lg',
				    templateUrl: 'partials/modal/DatasetBoxplotColumnsParamDialog.html',
				    controller: 'DatasetBoxplotColumnsParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	current: function(){return scope.current}
				    }
				});
			};
      }
	}
});

app.directive('paramConfigHeatmapgradient', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openHeatmapgradientDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=', current: "=",
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigHeatmapgradient");
		  scope.openHeatmapgradientDialog = function(p){
				console.log("openSeriecolumnsDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					//size: 'lg',
				    templateUrl: 'partials/modal/DatasetHeatmapgradientParamDialog.html',
				    controller: 'DatasetHeatmapgradientParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	current: function(){return scope.current}
				    }
				});
			};
      }
	}
});

app.directive('paramConfigPiechartrender', function($uibModal) {
	return {
	  restrict: 'E',
      template:'<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openPiechartrenderDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>', 
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("openPiechartrenderDialog");
		  scope.openPiechartrenderDialog = function(p){
				console.log("openPiechartrenderDialog", p);
				var openMultipleGeojsonDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/PiechartrenderDialog.html',
				    controller: 'PiechartrenderDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;}
				    }
				});
			};
      }
	}
});

app.directive('paramConfigGeojsons', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openGeojsonsParamDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("geojsonsDialog");
		  scope.openGeojsonsParamDialog = function(p){
				console.log("openGeojsonsDialog", p);
				var openMultipleGeojsonDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
				    templateUrl: 'partials/modal/GeojsonsParamDialog.html',
				    controller: 'GeojsonsDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;}
				    }
				});
			};
      }
	}
});

app.directive('eventConfigInputtext', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<input type="text" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" ng-model-options="{debounce: 750}">', 
	}
});


app.directive('eventConfigChangecolumn', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<div class="inline-input-widget"><div class="checkbox checkbox-widget-param"><label>'+
			'<input type="checkbox" ng-model="evt.enabled" ng-change="updateValues()">'+
			'	<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
			'	<span translate-cloak translate>event_enabled</span>'+
			'</label></div>' +
			'<div class="checkbox checkbox-widget-param"><label>'+
			'<input type="checkbox" ng-model="evt.onlySameDataset"   ng-change="updateValues()" ng-disabled="!evt.enabled">'+
			'	<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
			'	<span translate-cloak translate ng-class="{\'disabled\': !evt.enabled}">event_only_same_dataaset</span>'+
			'</label></div></div>',
	        link:function(scope,elem, attrs){
		        //console.log("paramConfigTenantcode",scope,elem, attrs);
	        	if(scope.param.values)
	        		scope.evt = scope.$eval(scope.param.values);
	        	else
	        		scope.evt = {"enabled":true};
	        	
	        	scope.updateValues = function(){
	        		if(!scope.evt.enabled)
	        			scope.evt.onlySameDataset=false;
	        		scope.param.values = JSON.stringify(scope.evt);
	        	}
	        }

	}
});

app.directive('eventConfigOnlyenable', function() {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<div class="inline-input-widget"><div class="checkbox checkbox-widget-param"><label>'+
			'<input type="checkbox" ng-model="evt.enabled" ng-change="updateValues()">'+
			'	<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
			'	<span translate-cloak translate>event_enabled</span>'+
			'</label></div></div>',
	        link:function(scope,elem, attrs){
	        	if(scope.param.values)
	        		scope.evt = scope.$eval(scope.param.values);
	        	else
	        		scope.evt = {"enabled":true};
	        	
	        	scope.updateValues = function(){
	        		scope.param.values = JSON.stringify(scope.evt);
	        		console.log("cope.param.values",scope.param.values);
	        	}
	        }
	}
});


app.directive('eventConfigMultipleinputtext', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openMultipleParamDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("eventConfigMultipleinputtext");
		  scope.openMultipleParamDialog = function(p){
				console.log("openMultipleParamDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
				    templateUrl: 'partials/modal/MultipleParamDialog.html',
				    controller: 'MultipleParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;}
				    }
				});
			};
      }
	}
});



app.directive('paramConfigNodesrender', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openNodesrenderDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=', current: '='
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigNodesrender");
		  scope.openNodesrenderDialog = function(p){
				console.log("openNodesrenderDialog", p);
				var openNodesrenderDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/NodesrenderDialog.html',
				    controller: 'NodesrenderDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	current: function () {return scope.current;}
				    }
				});
			};
      }
	}
});

app.directive('paramConfigDatasetcolumnsrelations', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openDatasetcolumnsrelationsDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=', current: '='
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigDatasetcolumnsrelations");
		  scope.openDatasetcolumnsrelationsDialog = function(p){
				console.log("openDatasetcolumnsrelationsDialog", p);
				var openDatasetcolumnsrelationsInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/DatasetColumnsRelationsDialog.html',
				    controller: 'DatasetColumnsRelationsDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	current: function () {return scope.current;}
				    }
				});
			};
      }
	}
});

app.directive('paramConfigDatacolumns', function(metadataapiAPIservice, $uibModal) {
	return {
		restrict : 'E',
		 scope:{
			 param: "=", current: "="
	        },
	        template:'<div  class=" form-control form-control-label-button">'+
			'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
			'	<a href ng-click="openDataColumnsDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
			'</div>', 
	        link:function(scope,elem, attrs){
		        //console.log("paramConfigTenantcode",scope,elem, attrs);
		        console.debug("paramConfigDatasetcode param", scope.current);
		        
		        scope.openDataColumnsDialog = function(p){
					console.log("openDataColumnsDialog", p);
					var openMultipleParamDialogInstance = $uibModal.open({
						animation: true, backdrop  : 'static',
						size: 'max-width',
					    templateUrl: 'partials/modal/DataColumnsParamDialog.html',
					    controller: 'DataColumnsParamDialogInstanceCtrl',
					    resolve: {
					    	p: function () {return p;},
					    	current: function(){return scope.current}
					    }
					});
				};
		        		       
	        }
	};
});


template:'<div  class=" form-control form-control-label-button">'+
'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
'	<a href ng-click="openDatasetColumnDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
'</div>', 

app.directive('paramConfigSvgshape', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" title="{{param.values}}">{{"svgshape_" + param.values|translate|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openChooseSvgshapeDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigSvgshape");
		  scope.colors = new Array();
		  scope.openChooseSvgshapeDialog = function(p){
				console.log("openChooseSvgshapeDialog", p);
				var openSvgShapeParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/SvgShapeParamDialog.html',
				    controller: 'SvgShapeDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
						current: function(){return scope.current}
				    }
				});
			
			};
			
      }
	}
});




//app.directive('paramConfigDatasetcolumn', function(metadataapiAPIservice) {
//	return {
//		restrict : 'E',
//		 scope:{
//			 param: "=", current: "="
//	        },
//	        template:'<input type="text" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" ' +
//	        	' uib-typeahead="datasetCode as datasetCode  for datasetCode in  getColumns($viewValue) | limitTo:8">', 
//	        link:function(scope,elem, attrs){
//		        //console.log("paramConfigTenantcode",scope,elem, attrs);
//		        console.debug("paramConfigDatasetcode param", scope.current);
//		        
//		        scope.getColumns = function(val) {
//		        	console.debug("paramConfigDatasetcode  getColumns", val, scope.current);
//		        	var datasetcode = null
//		        	if(Utils.has(scope.current, 'content.params.mandatory_params.datasetcode.values'))
//		        		datasetcode = scope.current.content.params.mandatory_params.datasetcode.values;
//		        	
//		        	if(datasetcode){
//			        	return metadataapiAPIservice.loadDatasetDetail(datasetcode).then(function(response){
//			        		var allColumns = new Array();
//			        		for (var i = 0; i < response.data.components.length; i++) {
//								if(response.data.components[i].name.includes(val))
//									allColumns.push(response.data.components[i].name);
//							}
//			        		return allColumns;
//					    },
//		        		function(result){
//		        			console.error("loadDatasets error", result);
//		        		});
//		        	}
//				  };
//		        
//		       
//	        }
//	};
//});

app.directive('paramConfigOdatafilter', function($uibModal) {
	return {
		restrict : 'E',
		 scope:{
			 param: "=", current: "="
	        },
	        template: '<div  class=" form-control form-control-label-button">'+
				'	<div class="form-control-label" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
				'	<a href ng-click="openOdatafilterDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
				'</div>',
			link: function(scope, element, attrs){
				  console.log("legend");
				  scope.openOdatafilterDialog = function(p){
						console.log("openOdatafilterParamDialog", p);
						$uibModal.open({
							animation: true, backdrop  : 'static',
							size: 'lg',
						    templateUrl: 'partials/modal/OdatafilterParamDialog.html',
						    controller: 'OdatafilterParamDialogInstanceCtrl',
						    resolve: {
						    	p: function () {return p;},
						    	current: function(){return scope.current}
						    }
						});
					};
		    }
	}
});


app.directive('paramConfigMultipleodatafilter', function($uibModal) {
	return {
	  restrict: 'E',
	  template: '<div  class=" form-control form-control-label-button">'+
		'	<div class="form-control-label" ng-if="param.values.length<1"><i translate>multivalue_empty</i></div>'+
		'	<div class="form-control-label" ng-if="param.values.length>0" title="{{param.values}}">{{param.values|string_ellipse: 44}}</div>'+
		'	<a href ng-click="openMultipleParamDialog(param)" class="form-control-button "><i class="fa fa-pencil"></i></a>'+
		'</div>',
	  scope: {
		param: '=',
	  },
	  link: function(scope, element, attrs){
		  console.log("paramConfigMultiplerangecolor");
		  scope.colors = new Array();
		  scope.openMultipleParamDialog = function(p){
				console.log("openMultipleParamDialog", p);
				var openMultipleParamDialogInstance = $uibModal.open({
					animation: true, backdrop  : 'static',
					size: 'lg',
				    templateUrl: 'partials/modal/MultipleOdataFilterParamDialog.html',
				    controller: 'MultipleOdataFilterParamDialogInstanceCtrl',
				    resolve: {
				    	p: function () {return p;},
				    	inputtype: function(){return 'inputcolor';}
				    }
				});
				openMultipleParamDialogInstance.result.then(function (res) {
					if(scope.param.values)
						scope.colors = scope.$eval(scope.param.values);
					else
						scope.colors = new Array();
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
			};
			
      }
	}
});

app.directive('paramConfigInputimage', function(readFilePreview) {
	return {
		restrict : 'E',
		 scope:{
			 param: "="
	        },
	        template:'<div class="input-image-widget-param">' +
	        		'  <div ng-if="!param.values"><small translate>image_chooser_intro</small></div>'+
	        		'  <div class="input-image-url" ng-if="!param.values">' + 
	        		'    <input type="text" class="input-xs" id="i_{{param.name}}" ng-model="param.values" ng-model-options="{debounce: 750}" placeholder="url image" />' +
	        		'  </div>' + 
	        		'  <div class="input-image-droparea" ng-if="!param.values" ngf-drop="onImageSelect($files)" ngf-drag-over-class="\'input-image-droparea-hover\'" ' + 
	        		'    ngf-select="onImageSelect($files)" data-multiple="false" title="select file" ngf-pattern="\'image/*\'" onclick="this.value = null" >' + 
	        		'    <strong translate>drop_image_here</strong><br><span translate>click_to_choose_image</span></div>' + 
	        		'  <div class="input-image-preview" ng-if="param.values"><img ng-src="{{param.values}}" /><a href ng-click="clearImage()" translate>remove_image</a></div>'+
	        		'  <div ng-if="uploadImageError" style="color: red">{{uploadImageError}}</div>' +
	        		'</div>', 
	        link:function(scope,elem, attrs){
	        	if(scope.param.values)
	        		scope.par = {values:parseInt(scope.param.values*100)};
	        	
	        	scope.onImageSelect = function($files) {
					scope.selectedIcon = $files[0];
					scope.uploadImageError = null;
					readFilePreview.readImageFile($files[0]).then(
							function(contents){
								console.log("contents" , contents);
								scope.param.values  = contents;
							}, 
							function(error){
								scope.uploadImageError = "Error while upload image";
								Helpers.util.scrollTo();
							}
						);

	        	};
	        	scope.clearImage = function(){
	        		scope.param.values  =  null;
	        	};
	        	
	        	scope.updateValues = function(){
	        		if(scope.par.values)
	        		scope.param.values = scope.par.values/100;
	        	}
	        }
	}
});

// demo suggest with template
//app.directive('paramConfigDatasetcode', function(metadataapiAPIservice) {
//	return {
//		restrict : 'E',
//		 scope:{
//			 param: "=", current: "="
//	        },
//	        template:'<script type="text/ng-template" id="datasetcodeCustomSuggest.html"><a><span>{{match.model.datasetcode}}</span> - <i class="mute">{{match.model.description}}</i></script>'+
//	        	'<input type="text" class="form-control input-xs" id="i_{{param.name}}" ng-model="param.values" ' +
//	        	' typeahead-template-url="datasetcodeCustomSuggest.html" uib-typeahead="datasetCode as datasetCode.datasetcode  for datasetCode in  getDatasets($viewValue) | limitTo:8">', 
//	        link:function(scope,elem, attrs){
//		        //console.log("paramConfigTenantcode",scope,elem, attrs);
//		        console.log("paramConfigDatasetcode param", scope.current);
//		        
//		        scope.getDatasets = function(val) {
//		        	console.log("vak", val, scope.current);
//		        	var tenantcode = null;
//		        	if(Utils.has(scope.current, 'content.params.mandatory_params.tenantcode.name'))
//		        		tenantcode = scope.current.content.params.mandatory_params.tenantcode.values;
//				    console.log("tenatn", tenantcode);
//		        	return metadataapiAPIservice.loadDatasets(tenantcode).then(function(response){
//		        		console.log("re",response);
//		        		var allDataset = new Array();
//		        		for (var i = 0; i < response.data.metadata.length; i++) {
//							if(response.data.metadata[i].dataset.code.includes(val))
//								allDataset.push({datasetcode:response.data.metadata[i].dataset.code,description: response.data.metadata[i].description});
//						}
//		        		return allDataset;
//				    },
//	        		function(result){
//	        			console.error("loadDatasets error", result);
//	        		});
//				  };
//		        
//		       
//	        }
//	};
//});
