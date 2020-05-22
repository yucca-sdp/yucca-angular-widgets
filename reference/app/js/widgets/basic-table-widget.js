'use strict';

var BasicTableWidgets = BasicTableWidgets || {};

// params
//var advancedParams = {'usertoken':{'name':'usertoken','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
//						'debug':{'name':'debug','type':'inputboolean', 'mandatory':'false','values':'', 'default':'','custom':''}
//					 };

// styles
var tableStyles = {'yucca-widget-table-content':{'name':'yucca-widget-table-content','selector':'.yucca-widget-table-content','custom':''},
		'yucca-widget-table':{'name':'yucca-widget-table','selector':'.yucca-widget-table','custom':''},	
		'yucca-widget-table-header-row':{'name':'yucca-widget-table-header-row','selector':'.yucca-widget-table thead tr','custom':''},	
		'yucca-widget-table-header-cell':{'name':'yucca-widget-table-header-cell','selector':'.yucca-widget-table  thead th','custom':''},	
		'yucca-widget-table-body-row':{'name':'yucca-widget-table-body-row','selector':'.yucca-widget-table  tbody tr','custom':''},	
		'yucca-widget-table-body-cell':{'name':'yucca-widget-table-body-cell','selector':'.yucca-widget-table tbody td','custom':''},	
};



/* distribution table */

var basicTableDistributionParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};

basicTableDistributionParams = angular.extend({},datasetParams, basicTableDistributionParams);

var basicDistributionTable = {
	key: 'basicDistributionTable',	
	name: 'widget_basic_distribution',
	directive: 'ng-yucca-distribution-table',
	//directiveUrl: function(){return 'widget/'+this.key+'.html';},
	features: ['chart'],
	params: {mandatory: basicTableDistributionParams,
			common: commonParams,
			odatafilter: odataFilterParam,
			number_format: formatNumberParams,
			advanced: advancedParams},
	events: {
		'event_listening':{
			'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'{"enabled":true}'},
			'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'{"enabled":true}'},
			'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'{"enabled":true}'},
		},
		'event_sending':{
			'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'{"enabled":true}'},
		}
	},
	styles: {
		common: commonStyles,
		table: tableStyles
	}
};
	
BasicTableWidgets['basicDistributionTable'] = basicDistributionTable;

/* dataexplorer table */

var basicTableDataexplorerParams = {
	'dataexplorer_columns':{'name':'dataexplorer_columns','type':'datacolumns','mandatory':'false','values':'', 'default':'','custom':''},
	'dataexplorer_show_detail': {'name':'show_detail','type':'inputboolean', 'mandatory':'false','values':'', 'default':'','custom':''},
	'dataexplorer_hellip': {'name':'hellip','type':'inputnumber', 'mandatory':'false','values':'', 'default':'','custom':''},
};

var basicDataexplorerTable = {
	key: 'basicDataexplorerTable',	
	name: 'widget_basic_dataexplorer',
	directive: 'ng-yucca-dataset-dataexplorer-table', 
	//directiveUrl: function(){return 'widget/'+this.key+'.html';},
	features: ['table'],
	badge: 'beta',
	params: {mandatory: angular.extend({},datasetParams,basicTableDataexplorerParams),
			common: commonParams,
			odatafilter: odataFilterParam,
			advanced: advancedParams},
	events: {
		'event_listening':{
			'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'{"enabled":true}'},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'{"enabled":true}'},
		},
		'event_sending':{
		}
	},
	styles: {
		common: commonStyles,
		table: tableStyles
	}
};
	
BasicTableWidgets['basicDataexplorerTable'] = basicDataexplorerTable;

/* singledata */		
var basicSingledataParams = {
		'value_column':{'name':'value_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''}
}
var basicSingledataCommonParams = {
		'hide_label':{'name':'hide_label','type':'inputboolean', 'mandatory':'false','values':'', 'default':'','custom':''},
		'text_after':{'name':'text_after','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'grow_animation':{'name':'grow_animation','type':'inputboolean', 'mandatory':'false','values':'', 'default':'','custom':''}
};

var singledataStyles = {'yucca-widget-singledata-content':{'name':'yucca-widget-singledata-content','selector':'.yucca-widget-singledata-content','custom':''},
		'yucca-widget-singledata-label':{'name':'yucca-widget-singledata-label','selector':'.yucca-widget-singledata-label','custom':''},	
		'yucca-widget-singledata-value':{'name':'yucca-widget-singledata-value','selector':'.yucca-widget-singledata-value','custom':''},	
		'yucca-widget-singledata-textafter':{'name':'yucca-widget-singledata-textafter','selector':'.yucca-widget-singledata-textafter','custom':''}
};


var basicSingledata = {
	key: 'basicSingledata',	
	name: 'widget_basic_singledata',
	directive: 'ng-yucca-dataset-singledata', 
	//directiveUrl: function(){return 'widget/'+this.key+'.html';},
	features: ['table'],
	badge: 'certified',
	params: {mandatory: angular.extend({},datasetParams,basicSingledataParams),
			common: angular.extend({},commonParams,basicSingledataCommonParams),
			odatafilter: odataFilterParam,
			number_format: formatNumberParams,
			advanced: advancedParams},
	events: {
		'event_listening':{
			'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'{"enabled":true}'},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'{"enabled":true}'},
		},
		'event_sending':{
		}
	},
	styles: {
		common: commonStyles,
		singledata: singledataStyles
	}
};
	
BasicTableWidgets['basicSingledata'] = basicSingledata;


/* navigableexplorer table */
var basicTableNavigableexplorerParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'value_column2':{'name':'value_column2','type':'datasetvaluecolumn','mandatory':'false','values':'', 'default':'','custom':''},
		'tree_columns':{'name':'tree_columns','type':'datasetcolumns','mandatory':'true','values':'', 'default':'','custom':''},
		'root_label':{'name':'root_label','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
};

basicTableNavigableexplorerParams = angular.extend({},datasetParams, basicTableNavigableexplorerParams);

var basicNavigableexplorerTable = {
	key: 'basicNavigableexplorerTable',	
	name: 'widget_basic_navigableexplorer',
	directive: 'ng-yucca-dataset-navigableexplorer-table',
	//directiveUrl: function(){return 'widget/'+this.key+'.html';},
	features: ['table'],
	params: {mandatory: basicTableNavigableexplorerParams,
			common: commonParams,
			odatafilter: odataFilterParam,
			number_format: formatNumberParams,
			number_format2: formatNumberParams2,
			advanced: advancedParams},
	events: {
		'event_listening':{
			'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'{"enabled":true}'},
			'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'{"enabled":true}'},
			'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'{"enabled":true}'},
		},
		'event_sending':{
			'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'{"enabled":true}'},
			'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'{"enabled":true}'},
		}
	},
	styles: {
		common: commonStyles,
		table: tableStyles
	}
};
	
BasicTableWidgets['basicNavigableexplorerTable'] = basicNavigableexplorerTable;
