'use strict';

var BasicControlWidgets = BasicControlWidgets || {};




//var currentmillis = new Date().getTime();

// params
var commonBasicControlParams = {'label': {'name':'label','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
	'hint': {'name':'hint','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''}
};

// styles
var commonBasicControlStyles = {'yucca-control-header-title':{'name':'yucca-control-header-title','selector':'.yucca-control-main-header .yucca-control-main-label','custom':''},
					'yucca-control-header-subtitle':{'name':'yucca-control-header-subtitle','selector':'.yucca-control-main-header .yucca-control-main-hint','custom':''}
};

var advancedControlParams = {'widget_id':{'name':'widget_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''}};


// basic control select
var basicControlSelectMandatoryParams = {'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'select_control_value_columns':{'name':'value_columns','type':'multiplekeylabeltext','mandatory':'false','values':'', 'default':'','custom':''},
		'select_control_group_by_columns':{'name':'group_by_columns','type':'multiplekeylabeltext','mandatory':'false','values':'', 'default':'','custom':''},
		'render': {'name':'render','type':'inputselect','mandatory':'true','values':'', 'default':'','data':['select','radio','button']},
};

var basicControlSelectParams = {'selected_value': {'name':'selected_value','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'select_empty_label': {'name':'select_empty_label','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'direction': {'name':'direction','type':'inputselect','mandatory':'false','values':'', 'default':'','data':['row','column']},
		};

basicControlSelectParams = angular.extend({},commonBasicControlParams, basicControlSelectParams);


var commonBasicControlSelectRadioStyles = {
		'yucca-control-select-radio-panel':{'name':'yucca-control-select-radio-panel','selector':'.yucca-control-type-radio  .yucca-control-items','custom':''},
		'yucca-control-select-radio-item':{'name':'yucca-control-select-radio-item','selector':'.yucca-control-type-radio  .radio.yucca-control-item','custom':''},
};

var commonBasicControlSelectTabbuttonStyles = {
		'yucca-control-select-tabbutton-panel':{'name':'yucca-control-select-tabbutton-panel','selector':'.yucca-control-type-button  .yucca-control-items','custom':''},
		'yucca-control-select-tabbutton-item':{'name':'yucca-control-select-tabbutton-item','selector':'.yucca-control-type-radio  .yucca-control-select-button','custom':''},
		'yucca-control-select-tabbutton-item-selected':{'name':'yucca-control-select-tabbutton-item-selected','selector':'.yucca-control-type-radio  .yucca-control-select-button .active','custom':''},
};

var commonBasicControlSelectSelectStyles = {
		'yucca-control-select-select-panel':{'name':'yucca-control-select-select-panel','selector':'.yucca-control-type-select','custom':''},
		'yucca-control-select-select':{'name':'yucca-control-select-select','selector':'.yucca-control-type-select  .yucca-select-select-button','custom':''},
};


/* select */

var basicControlSelect = {
	key: 'basicControlSelect',	
	name: 'control_basic_select',
	directive: 'ng-yucca-control-select',
	//directiveUrl: function(){return 'widget/'+this.key+'.html';},
	//directiveUrl: 'widget/basic/basicDatasetDiscretebarChart.html?time='+currentmillis,
	features: ['control'],
	params: {mandatory: basicControlSelectMandatoryParams,
			common: basicControlSelectParams,
			advanced: advancedControlParams},
			
	events: {},
	styles: {
		common_basic_control: commonBasicControlStyles,
		basic_control_radio: commonBasicControlSelectRadioStyles,
		basic_control_tabbutton: commonBasicControlSelectTabbuttonStyles,
		basic_control_select: commonBasicControlSelectSelectStyles,
	}
};
	
BasicControlWidgets['basicControlSelect'] = basicControlSelect;

/* filter */

var basicControlFilterMandatoryParams = {'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'column':{'name':'column','type':'inputtext','mandatory':'true','values':'', 'default':'','custom':''},
		'filter_type':{'name':'filter_type','type':'inputselect','mandatory':'true','values':'', 'default':'','custom':'','data':['text']},
		'placeholder':{'name':'placeholder','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'advanced_filter':{'name':'advanced_filter','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'','data':['none', 'text','numeric']},
};

var basicControlFilter = {
		key: 'basicControlFilter',	
		name: 'control_basic_filter',
		directive: 'ng-yucca-control-filter ',
		features: ['control'],
		params: {mandatory: basicControlFilterMandatoryParams,
				common: commonBasicControlParams,
				advanced: advancedControlParams},
		events: {},
		styles: {
			common_basic_control: commonBasicControlStyles,
//			basic_control_radio: commonBasicControlFilterRadioStyles,
//			basic_control_tabbutton: commonBasicControlFilterTabbuttonStyles,
//			basic_control_select: commonBasicControlFilterFilterStyles,
		}
};
		
BasicControlWidgets['basicControlFilter'] = basicControlFilter;
	
/* map filter */

var basicControlMapFilterMandatoryParams = {'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
			'column':{'name':'column','type':'inputtext','mandatory':'true','values':'', 'default':'','custom':''}
};

var sizeParams = {'width':{'name':'width','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'height':{'name':'height','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''}
		};

var basicControlMapFilterOtherParams = {
		'border_color':{'name':'border_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'selected_color':{'name':'selected_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'unselected_color':{'name':'unselected_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'geojsons':{'name':'geojsons','type':'geojsons','mandatory':'false','values':'', 'default':'','custom':''},
};


	var basicControlMapFilter = {
			key: 'basicControlMapFilter',	
			name: 'control_basic_map_filter',
			directive: 'ng-yucca-control-map-filter ',
			features: ['control'],
			params: {mandatory: basicControlMapFilterMandatoryParams,
					common: commonBasicControlParams,
					map: angular.extend({},basicControlMapFilterOtherParams,sizeParams),
					advanced: advancedControlParams},
			events: {},
			styles: {
				common_basic_control: commonBasicControlStyles,
//				basic_control_radio: commonBasicControlFilterRadioStyles,
//				basic_control_tabbutton: commonBasicControlFilterTabbuttonStyles,
//				basic_control_select: commonBasicControlFilterFilterStyles,
			}
		};
		
		BasicControlWidgets['basicControlMapFilter'] = basicControlMapFilter;
		
		/* Filter Data Discrete */
		
		var basicControlFilterDataDiscreteMandatoryParams = {'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
			'odata_filters':{'name':'value_columns','type':'multipleodatafilter','mandatory':'true','values':'', 'default':'','custom':''},
			'filter_type_discrete':{'name':'filter_type','type':'inputselect','mandatory':'true','values':'', 'default':'','custom':'','data':['unique','multi']},
			'render': {'name':'render','type':'inputselect','mandatory':'true','values':'', 'default':'','data':['control','button']},
			'direction': {'name':'direction','type':'inputselect','mandatory':'false','values':'', 'default':'','data':['row','column']},
		};

var basicControlFilterDataDiscrete = {
	key: 'basicControlFilterDataDiscrete',	
	name: 'control_basic_filter_data_discrete',
	directive: 'ng-yucca-control-filter-data-discrete ',
	features: ['control'],
	params: {mandatory: basicControlFilterDataDiscreteMandatoryParams,
			common: commonBasicControlParams,
			advanced: advancedControlParams},
	events: {},
	styles: {
		common_basic_control: commonBasicControlStyles,
	}
};

BasicControlWidgets['basicControlFilterDataDiscrete'] = basicControlFilterDataDiscrete;
