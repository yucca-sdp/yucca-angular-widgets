'use strict';

var BasicDatasetWidgets = BasicDatasetWidgets || {};


// var currentmillis = new Date().getTime();

// params
var commonParams = {'widget_title': {'name':'widget_title','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
					'widget_subtitle': {'name':'widget_subtitle','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
					'widget_intro': {'name':'widget_intro','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''}
					};

var commonSizeParams = {'widget_width':{'name':'widget_width','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'widget_height':{'name':'widget_height','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''}
		};


var datasetParams = {'tenantcode':{'name':'tenantcode','type':'tenantcode','mandatory':'true','values':'', 'default':'','custom':''},
		 			 'datasetcode':{'name':'datasetcode','type':'datasetcode','mandatory':'true','values':'', 'default':'','custom':''}
					};

var odataFilterParam = {'grouped_query':{'name':'grouped_query','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
						'filter':{'name':'filter','type':'odatafilter','mandatory':'false','values':'', 'default':'','custom':''},
						'skip':{'name':'skip','type':'inputnumber','mandatory':'false','values':'', 'default':'0','custom':''},
						'top':{'name':'top','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
						'orderby':{'name':'orderby','type':'datasetcolumnkey','mandatory':'false','values':'', 'default':'','custom':''}
				};

var formatNumberParams = {'euro_value':{'name':'euro_value','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
						 'decimal_value':{'name':'decimal_value','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
						 'format_big_number':{'name':'format_big_number','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
					};
var formatNumberParams2= {'euro_value':{'name':'euro_value2','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		 'decimal_value':{'name':'decimal_value2','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		 'format_big_number':{'name':'format_big_number2','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''}
	};


var formatNumberTextAfterParams =  {'text_after':{'name':'text_after','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''}};

var chartParams = {'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
					'chart_colors':{'name':'chart_colors','type':'multipleinputcolor', 'mandatory':'false','values':'', 'default':'','custom':''},
					'show_values':{'name':'show_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
					'chart_label_type':{'name':'label_type','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'','data':['key','value','percent']},
					'chart_legend':{'name':'chart_legend','type':'chartlegend','mandatory':'false','values':'', 'default':'','custom':''}
				};
var chartAxisParams = {'x_axis':{'name':'x_axis','type':'chartaxis','mandatory':'false','values':'', 'default':'','custom':''},
					'reduce_x_ticks':{'name':'reduce_x_ticks','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
					'rotate_labels':{'name':'rotate_labels','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
					'y_axis':{'name':'y_axis','type':'chartaxis','mandatory':'false','values':'', 'default':'','custom':''}
			};

var advancedParams = {'widget_id':{'name':'widget_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
						'usertoken':{'name':'usertoken','type':'usertoken','mandatory':'false','values':'', 'default':'','custom':''},
						'api_data_url':{'name':'api_data_url','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
						'api_metadata_url':{'name':'api_metadata_url','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
						'cache':{'name':'cache','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
						'debug':{'name':'debug','type':'inputboolean', 'mandatory':'false','values':'', 'default':'','custom':''}
					 };

// styles
var commonStyles = {'yucca_widget':{'name':'yucca_widget','selector':'','custom':''},
					'yucca_widget_header_title':{'name':'yucca_widget_header_title','selector':'.yucca-widget-header','custom':''},
					'yucca_widget_header_subtitle':{'name':'yucca_widget_header_subtitle','selector':'.yucca-widget-header small','custom':''},
					'yucca_widget_intro':{'name':'yucca_widget_intro','selector':'.yucca-widget-intro','custom':''},
					'yucca_widget_footer':{'name':'yucca_widget_footer','selector':'.yucca-widget-footer','custom':''},		
					'yucca_widget_footer_text':{'name':'yucca_widget_footer_text','selector':'.yucca-widget-footer-text','custom':''},		
					'yucca-widget-dashboard':{'name':'yucca-widget-dashboard','selector':'','custom':'','custom_dialog':'DashboardWidgetStyles'}
					};

var chartStyles = {'yucca-widget-chart-content':{'name':'yucca-widget-chart-content','selector':'.yucca-widget-chart-content','custom':''},
					'yucca-widget-chart':{'name':'yucca-widget-chart','selector':'.yucca-widget-chart','custom':''}		
		};


//var positionStyles = {'yucca-widget-position':{'name':'yucca-widget-position','selector':'','custom':''}	
//}





var basicDatasetDiscretebarChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};

var basicDatasetBoxplotChart = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};


basicDatasetDiscretebarChartParams = angular.extend({},datasetParams, basicDatasetDiscretebarChartParams);


var basicDatasetDiscretebarChart = {
	key: 'basicDatasetDiscretebarChart',	
	name: 'widget_basic_discretebar',
	directive: 'ng-yucca-dataset-discretebar-chart',
	features: ['table'],
	badge: 'certified',
	params: {mandatory: basicDatasetDiscretebarChartParams,
			common: angular.extend({}, commonParams,commonSizeParams),
			chart: angular.extend({},chartParams,chartAxisParams),
			odatafilter: odataFilterParam,
			number_format: formatNumberParams,
			advanced: advancedParams},
	events: {
		'event_listening':{
			'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
			'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
			'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
		},
		'event_sending':{
			'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', },
		}
	},
	styles: {
		common: commonStyles,
		chart: chartStyles,
	}
};
	


// Piechart	
var basicDatasetPieChartParams = {
	'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
	'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''}
};

var basicDatasetPieChartChartParams = {
	'render':{'name':'render','type':'piechartrender','mandatory':'false','values':'', 'default':'','custom':''},
	'label_sunbeam_layout':{'name':'label_sunbeam_layout','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
	'label_threshold':{'name':'label_threshold','type':'inputpercent','mandatory':'false','values':'', 'default':'','custom':''},

}

basicDatasetPieChartParams = angular.extend({},datasetParams, basicDatasetPieChartParams);
var basicDatasetPieChart = {
		key: 'basicDatasetPieChart',	
		name: 'widget_basic_piechart',
		directive: 'ng-yucca-dataset-pie-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: basicDatasetPieChartParams,
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetPieChartChartParams,chartParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};



// linechart
var basicDatasetLineChartParams = {
		'time_column':{'name':'time_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'serie_columns':{'name':'serie_columns','type':'datasetseriecolumns','mandatory':'true','values':'', 'default':'','custom':''},
};

var basicDatasetLineChartChartParams = {
		'show_values':{'name':'show_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'interpolate':{'name':'interpolate','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'','data':['linear','step-before','step-after','basis','basis-open','basis-closed','bundle','cardinal','cardinal-open','cardinal-closed','monotone']},
}

var basicDatasetLineChart = {
		key: 'basicDatasetLineChart',	
		name: 'widget_basic_linechart',
		directive: 'ng-yucca-dataset-line-chart',
		features: ['chart'],
		params: {mandatory: angular.extend({},datasetParams, basicDatasetLineChartParams),
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetLineChartChartParams,chartParams, chartAxisParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			//	'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				//'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};



//multichart
var basicDatasetMultiChartParams = {
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_datetime':{'name':'group_by_datetime','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'serie_columns':{'name':'serie_columns','type':'datasetseriecolumns','mandatory':'true','values':'', 'default':'','custom':''}
};

var basicDatasetMultiChartChartParams = {
		'show_values':{'name':'show_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'interpolate':{'name':'interpolate','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'','data':['linear','step-before','step-after','basis','basis-open','basis-closed','bundle','cardinal','cardinal-open','cardinal-closed','monotone']},
}

var basicDatasetMultiChart = {
		key: 'basicDatasetMultiChart',	
		name: 'widget_basic_multichart',
		directive: 'ng-yucca-dataset-multi-chart',
		features: ['chart'],
		params: {mandatory: angular.extend({},datasetParams, basicDatasetMultiChartParams),
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetMultiChartChartParams,chartParams, chartAxisParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			//	'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				//'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};


//multibar

var basicDatasetMultibarChartParams = {
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'serie_columns_multibar':{'name':'serie_columns','type':'datasetseriecolumns','mandatory':'true','values':'', 'default':'','custom':''},
		'series_description_columns_multibar':{'name':'series_description_column','type':'datasetcolumn','mandatory':'false','values':'', 'default':'','custom':''},
		'series_from_values':{'name':'series_from_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''}
};

var basicDatasetMultibarChartChartParams = {
		'show_values':{'name':'show_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'chart_direction':{'name':'chart_direction','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'', 'data':['vertical','horizontal']},
		'stacked':{'name':'stacked','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''}
		
}

var basicDatasetMultibarChart = {
		key: 'basicDatasetMultibarChart',	
		name: 'widget_basic_discretebar',
		directive: 'ng-yucca-dataset-multibar-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: angular.extend({},datasetParams, basicDatasetMultibarChartParams),
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetMultibarChartChartParams,chartParams, chartAxisParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			//	'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				//'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};


// treemap
var basicDatasetTreemapChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'value_column2':{'name':'value_column2','type':'datasetvaluecolumn','mandatory':'false','values':'', 'default':'','custom':''},
		'tree_columns':{'name':'tree_columns','type':'datasetcolumns','mandatory':'true','values':'', 'default':'','custom':''}
};

var basicDatasetTreemapChartChartParams = {
		'root_label':{'name':'root_label','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},

}

basicDatasetTreemapChartParams = angular.extend({},datasetParams, basicDatasetTreemapChartParams);
var basicDatasetTreemapChart = {
		key: 'basicDatasetTreemapChart',	
		name: 'widget_basic_treemap',
		directive: 'ng-yucca-dataset-treemap-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: basicDatasetTreemapChartParams,
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetTreemapChartChartParams,chartParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				number_format2: formatNumberParams2,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};


//collapsibletree
var basicDatasetCollapsibletreeChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'tree_columns':{'name':'tree_columns','type':'datasetcolumns','mandatory':'true','values':'', 'default':'','custom':''}
};


var basicDatasetCollapsibletreeChartChartParams = {
		'root_label':{'name':'root_label','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'hide_values':{'name':'hide_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'value_not_colored':{'name':'value_not_colored','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'row_height':{'name':'row_height','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'row_depth':{'name':'row_depth','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'collapsibletree_node_radius':{'name':'radius','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'start_closed':{'name':'start_closed','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'node_offset_x':{'name':'node_offset_x','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'chart_colors':{'name':'chart_colors','type':'multipleinputcolor', 'mandatory':'false','values':'', 'default':'','custom':''},
}

basicDatasetCollapsibletreeChartParams = angular.extend({},datasetParams, basicDatasetCollapsibletreeChartParams);
var basicDatasetCollapsibletreeChart = {
		key: 'basicDatasetCollapsibletreeChart',	
		name: 'widget_basic_collapsibletree',
		directive: 'ng-yucca-dataset-collapsibletree-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: basicDatasetCollapsibletreeChartParams,
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetCollapsibletreeChartChartParams),
				odatafilter: odataFilterParam,
				number_format: angular.extend({},formatNumberParams,formatNumberTextAfterParams),
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};


//collapsibletreeboxes
var basicDatasetCollapsibletreeboxesChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'tree_columns':{'name':'tree_columns','type':'datasetcolumns','mandatory':'true','values':'', 'default':'','custom':''}
};


var basicDatasetCollapsibletreeboxesChartChartParams = {
		'root_label':{'name':'root_label','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'hide_values':{'name':'hide_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'value_not_colored':{'name':'value_not_colored','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'collapsibletreeboxes_row_depth':{'name':'row_depth','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'box_shadow':{'name':'box_shadow','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'box_radius':{'name':'box_radius','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'chart_colors':{'name':'chart_colors','type':'multipleinputcolor', 'mandatory':'false','values':'', 'default':'','custom':''},
		
}

basicDatasetCollapsibletreeboxesChartParams = angular.extend({},datasetParams, basicDatasetCollapsibletreeboxesChartParams);

var basicDatasetCollapsibletreeboxesChart = {
		key: 'basicDatasetCollapsibletreeboxesChart',	
		name: 'widget_basic_collapsibletreeboxes',
		directive: 'ng-yucca-dataset-collapsibletreeboxes-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: basicDatasetCollapsibletreeboxesChartParams,
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetCollapsibletreeboxesChartChartParams),
				odatafilter: odataFilterParam,
				number_format: angular.extend({},formatNumberParams,formatNumberTextAfterParams),
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_data_browse':{'name':'evt_data_browse','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};


//sankey
var basicDatasetSankeyChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'node_columns':{'name':'node_columns','type':'datasetcolumns','mandatory':'true','values':'', 'default':'','custom':''}
};


var basicDatasetSankeyChartChartParams = {
		'node_render':{'name':'node_render','type':'nodesrender','mandatory':'false','values':'', 'default':'','custom':''},
}
basicDatasetSankeyChartParams = angular.extend({},datasetParams, basicDatasetSankeyChartParams);

var basicDatasetSankeyChart = {
		key: 'basicDatasetSankeyChart',	
		name: 'widget_basic_sankey',
		directive: 'ng-yucca-dataset-sankey-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: basicDatasetSankeyChartParams,
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetSankeyChartChartParams,chartParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};



//forcedirected

var basicDatasetForcedirectedChartParams = {
	'relations':{'name':'relations','type':'datasetcolumnsrelations','mandatory':'true','values':'', 'default':'','custom':''}
};


//var basicDatasetForcedirectedChartChartParams = {
//		'node_render':{'name':'node_render','type':'nodesrender','mandatory':'false','values':'', 'default':'','custom':''},
//}
basicDatasetForcedirectedChartParams = angular.extend({},datasetParams, basicDatasetForcedirectedChartParams);


var forceDirectedChartStyles = {'forcedirected-legend-position':{'name':'forcedirected-legend-position','selector':'.forcedirected-chart','custom_dialog':'ForceDirectedLegendPosition'},
		'forcedirected-nodes-links':{'name':'forcedirected-nodes-links','selector':'.yucca-widget-chart','custom_dialog':'ForceDirectedNodesLinks'}		
};
var basicDatasetForcedirectedChart = {
		key: 'basicDatasetForcedirectedChart',	
		name: 'widget_basic_forcedirected',
		directive: 'ng-yucca-dataset-forcedirected-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: basicDatasetForcedirectedChartParams,
				common: angular.extend({}, commonParams,commonSizeParams),
				//chart: angular.extend({},chartParams),
				odatafilter: odataFilterParam,
				//number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
			}
		},
		styles: {
			common: commonStyles,
			chart: angular.extend({}, chartStyles, forceDirectedChartStyles)
		}
	};


//singlepercentage

var basicDatasetSinglepercentageChartParams = {
	'value_column':{'name':'value_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
	'max_value_column':{'name':'max_value_column','type':'datasetcolumn','mandatory':'false','values':'', 'default':'','custom':''},
	'max_value':{'name':'max_value','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
};


var basicDatasetSinglepercentageChartTextParams = {
		'show_label':{'name':'show_label','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'label_column':{'name':'label_column','type':'datasetcolumn','mandatory':'false','values':'', 'default':'','custom':''},
		'show_value':{'name':'show_value','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'show_max_value_label':{'name':'show_max_value_label','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'max_value_label':{'name':'max_value_label','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'show_max_value':{'name':'show_max_value','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'show_value':{'name':'show_value','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'num_rows':{'name':'num_rows','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'text_after':{'name':'text_after','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
};

var basicDatasetSinglepercentageChartChartParams = {
	'grow_animation':{'name':'grow_animation','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
	'shape':{'name':'shape','type':'svgshape','mandatory':'false','values':'', 'default':'','custom':''},
	'external_shape_url':{'name':'external_shape_url','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
	'orientation': {'name':'orientation','type':'inputselect','mandatory':'false','values':'', 'default':'','data':['horizontal','vertical']},
		'full_color':{'name':'full_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'empty_color':{'name':'empty_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'stroke_color':{'name':'stroke_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
}



basicDatasetSinglepercentageChartParams = angular.extend({},datasetParams, basicDatasetSinglepercentageChartParams);


//var forceSinglepercentageStyles = {'singlepercentage-legend-position':{'name':'singlepercentage-legend-position','selector':'.singlepercentage-chart','custom_dialog':'ForceDirectedLegendPosition'},
//		'singlepercentage-nodes-links':{'name':'singlepercentage-nodes-links','selector':'.yucca-widget-chart','custom_dialog':'ForceDirectedNodesLinks'}		
//};
var basicDatasetSinglepercentageChart = {
		key: 'basicDatasetSinglepercentageChart',	
		name: 'widget_basic_singlepercentage',
		directive: 'ng-yucca-dataset-singlepercentage-chart',
		features: ['chart'],
		badge: 'certified',
		params: {mandatory: angular.extend({},basicDatasetSinglepercentageChartParams),
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetSinglepercentageChartChartParams),
				chart_text: angular.extend({},basicDatasetSinglepercentageChartTextParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
			}
		},
		styles: {
			common: commonStyles,
			chart: angular.extend({}, chartStyles, forceDirectedChartStyles)
		}
	};



var basicDatasetChoropletMapChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};
var mapChartParams = {'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'range_colors':{'name':'range_colors','type':'multiplerangecolor', 'mandatory':'false','values':[], 'default':'','custom':''},
		'no_data_color':{'name':'no_data_color','type':'inputcolor', 'mandatory':'false','values':[], 'default':'','custom':''},
		'geoprojection':{'name':'geoprojection','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'', 'data':['azimuthalEqualArea','azimuthalEquidistant','conicConformal','conicEqualArea','conicEquidistant','equirectangular','gnomonic','mercator','orthographic','stereographic']},
		'map_legend':{'name':'map_legend','type':'maplegend','mandatory':'false','values':'', 'default':'','custom':''}
};

var basicChoropletMapChartParams = {'geojsons':{'name':'geojsons','type':'geojsons','mandatory':'false','values':'', 'default':'','custom':''}};


var basicDatasetChoropletMapChart = {
		key: 'basicDatasetChoropletMapChart',	
		name: 'widget_basic_choropletmap_chart',
		directive: 'ng-yucca-dataset-choropleth-map-chart',
		//directiveUrl: function(){return 'widget/'+this.key+'.html';},
		//directiveUrl: 'widget/basic/basicDatasetDiscretebarChart.html?time='+currentmillis,
		features: ['map'],
		badge: 'certified',
		params: {mandatory: angular.extend({},datasetParams, basicDatasetChoropletMapChartParams, basicChoropletMapChartParams),
				common: angular.extend({}, commonParams,commonSizeParams),
				map: angular.extend({}, mapChartParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				//'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};


var basicDatasetHorizontalmultibarChartParams = {
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'value_column':{'name':'value_column','type':'datasetcolumn','mandatory':'false','values':'', 'default':'','custom':''},
		'horizontalmultibar_serie_columns':{'name':'serie_columns','type':'datasetseriecolumns','mandatory':'false','values':'', 'default':'','custom':''},
		'horizontalmultibar_value_columns':{'name':'value_columns','type':'datasetvaluecolumns','mandatory':'false','values':'', 'default':'','custom':''},
		
};

basicDatasetHorizontalmultibarChartParams = angular.extend({},datasetParams, basicDatasetHorizontalmultibarChartParams);
var basicDatasetHorizontalmultibarChartChartParams = {
		'stacked':{'name':'stacked','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''}
}


var basicDatasetHorizontalmultibarChart = {
	key: 'basicDatasetHorizontalmultibarChart',	
	name: 'widget_basic_discretebar',
	directive: 'ng-yucca-dataset-horizontalmultibar-chart',
	features: ['table'],
	badge: 'beta',
	params: {mandatory: basicDatasetHorizontalmultibarChartParams,
			common: angular.extend({}, commonParams,commonSizeParams),
			chart: angular.extend({},chartParams,chartAxisParams, basicDatasetHorizontalmultibarChartChartParams),
			odatafilter: odataFilterParam,
			number_format: formatNumberParams,
			advanced: advancedParams},
	events: {
		'event_listening':{
			'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
			'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
		},
		'event_sending':{
			'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', },
		}
	},
	styles: {
		common: commonStyles,
		chart: chartStyles,
	}
};

var basicDatasetFunnelChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};

basicDatasetFunnelChartParams = angular.extend({},datasetParams, basicDatasetFunnelChartParams);

var basicDatasetFunnelChartChartParams = {
		'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'chart_colors':{'name':'chart_colors','type':'multipleinputcolor', 'mandatory':'false','values':'', 'default':'','custom':''},
		'mouth':{'name':'mouth','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'show_values':{'name':'show_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
};




var basicDatasetFunnelChart = {
	key: 'basicDatasetFunnelChart',	
	name: 'widget_basic_funnel',
	directive: 'ng-yucca-dataset-funnel-chart',
	features: ['table'],
	badge: 'beta',
	params: {mandatory: basicDatasetFunnelChartParams,
			common: angular.extend({}, commonParams,commonSizeParams),
			chart: angular.extend({},basicDatasetFunnelChartChartParams),
			odatafilter: odataFilterParam,
			number_format: formatNumberParams,
			advanced: advancedParams},
	events: {
		'event_listening':{
			'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
			'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
			'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
		},
		'event_sending':{
			'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
			'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', },
		}
	},
	styles: {
		common: commonStyles,
		chart: chartStyles,
	}
};

var basicDatasetBoxplotChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'is_data_aggregate':{'name':'is_data_aggregate','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
		'boxplot_columns':{'name':'boxplot_columns','type':'boxplotcolumns','mandatory':'false','values':'', 'default':'','custom':''},
};

basicDatasetBoxplotChartParams = angular.extend({},datasetParams, basicDatasetBoxplotChartParams);

var basicDatasetBoxplotChartChartParams = {
		'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'chart_colors':{'name':'chart_colors','type':'multipleinputcolor', 'mandatory':'false','values':'', 'default':'','custom':''},
		'show_values':{'name':'show_values','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
};

var basicDatasetBoxplotChart = {
		key: 'basicDatasetBoxplotChart',	
		name: 'widget_box_plot',
		directive: 'ng-yucca-dataset-boxplot-chart',
		features: ['table'],
		badge: 'beta',
		params: {mandatory: basicDatasetBoxplotChartParams,
				common: angular.extend({}, commonParams,commonSizeParams),
				chart: angular.extend({},basicDatasetBoxplotChartChartParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', },
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles,
		}
	};

var basicDatasetBubblesMapChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'label_column':{'name':'label_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};
var mapChartParams = {'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'area_color':{'name':'area_color','type':'inputcolor', 'mandatory':'false','values':[], 'default':'','custom':''},
		'geoprojection':{'name':'geoprojection','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'', 'data':['azimuthalEqualArea','azimuthalEquidistant','conicConformal','conicEqualArea','conicEquidistant','equirectangular','gnomonic','mercator','orthographic','stereographic']},
		'lat_column':{'name':'lat_column','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'lng_column':{'name':'lng_column','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		//'map_legend':{'name':'map_legend','type':'maplegend','mandatory':'false','values':'', 'default':'','custom':''},
		'radius':{'name':'radius','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''}
};

var basicBubblesMapChartParams = {'geojsons':{'name':'geojsons','type':'geojsons','mandatory':'false','values':'', 'default':'','custom':''}};


var basicDatasetBubblesMapChart = {
		key: 'basicDatasetBubblesMapChart',	
		name: 'widget_basic_bubbles_chart',
		directive: 'ng-yucca-dataset-bubbles-map-chart',
		//directiveUrl: function(){return 'widget/'+this.key+'.html';},
		//directiveUrl: 'widget/basic/basicDatasetDiscretebarChart.html?time='+currentmillis,
		features: ['map'],
		badge: 'beta',
		params: {mandatory: angular.extend({},datasetParams, basicDatasetBubblesMapChartParams, basicBubblesMapChartParams),
				common: angular.extend({}, commonParams,commonSizeParams),
				map: angular.extend({}, mapChartParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				//'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};

var basicDatasetHeatmapMapChartParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'label_column':{'name':'label_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};
var heatmapChartParams = {'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
		'area_color':{'name':'area_color','type':'inputcolor', 'mandatory':'false','values':[], 'default':'','custom':''},
		'highlight_color':{'name':'highlight_color','type':'inputcolor', 'mandatory':'false','values':[], 'default':'','custom':''},
		'geoprojection':{'name':'geoprojection','type':'inputselect','mandatory':'false','values':'', 'default':'','custom':'', 'data':['azimuthalEqualArea','azimuthalEquidistant','conicConformal','conicEqualArea','conicEquidistant','equirectangular','gnomonic','mercator','orthographic','stereographic']},
		'lat_column':{'name':'lat_column','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'lng_column':{'name':'lng_column','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'map_legend':{'name':'map_legend','type':'maplegend','mandatory':'false','values':'', 'default':'','custom':''},
		'radius':{'name':'radius','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'blur':{'name':'blur','type':'inputnumber','mandatory':'false','values':'', 'default':'','custom':''},
		'heatmap_gradient':{'name':'gradient','type':'heatmapgradient','mandatory':'false','values':'', 'default':'','custom':''}
};

var basicHeatmapMapChartParams = {'geojsons':{'name':'geojsons','type':'geojsons','mandatory':'false','values':'', 'default':'','custom':''}};


var basicDatasetHeatmapMapChart = {
		key: 'basicDatasetHeatmapMapChart',	
		name: 'widget_basic_heatmap_chart',
		directive: 'ng-yucca-dataset-heatmap-map-chart',
		//directiveUrl: function(){return 'widget/'+this.key+'.html';},
		//directiveUrl: 'widget/basic/basicDatasetDiscretebarChart.html?time='+currentmillis,
		features: ['map'],
		badge: 'beta',
		params: {mandatory: angular.extend({},datasetParams, basicDatasetHeatmapMapChartParams, basicHeatmapMapChartParams),
				common: angular.extend({}, commonParams,commonSizeParams),
				map: angular.extend({}, heatmapChartParams),
				odatafilter: odataFilterParam,
				number_format: formatNumberParams,
				advanced: advancedParams},
		events: {
			'event_listening':{
				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				//'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'', 'default':'{"enabled":true}'},
				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
				'evt_accepted_control_ids':{'name':'evt_accepted_control_ids','type':'multipleinputtext', 'values':''},
			},
			'event_sending':{
				'event_control_id': {'name':'event_control_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'', 'default':'{"enabled":true}'},
			}
		},
		styles: {
			common: commonStyles,
			chart: chartStyles
		}
	};
		
BasicDatasetWidgets['basicDatasetDiscretebarChart'] = basicDatasetDiscretebarChart;
BasicDatasetWidgets['basicDatasetMultiChart'] = basicDatasetMultiChart;
BasicDatasetWidgets['basicDatasetMultibarChart'] = basicDatasetMultibarChart;
BasicDatasetWidgets['basicDatasetHorizontalmultibarChart'] = basicDatasetHorizontalmultibarChart;

BasicDatasetWidgets['basicDatasetLineChart'] = basicDatasetLineChart;
BasicDatasetWidgets['basicDatasetPieChart'] = basicDatasetPieChart;
BasicDatasetWidgets['basicDatasetFunnelChart'] = basicDatasetFunnelChart;
BasicDatasetWidgets['basicDatasetBoxplotChart'] = basicDatasetBoxplotChart;
BasicDatasetWidgets['basicDatasetTreemapChart'] = basicDatasetTreemapChart;
BasicDatasetWidgets['basicDatasetCollapsibletreeChart'] = basicDatasetCollapsibletreeChart;
BasicDatasetWidgets['basicDatasetCollapsibletreeboxesChart'] = basicDatasetCollapsibletreeboxesChart;

BasicDatasetWidgets['basicDatasetSankeyChart'] = basicDatasetSankeyChart;
BasicDatasetWidgets['basicDatasetForcedirectedChart'] = basicDatasetForcedirectedChart;
BasicDatasetWidgets['basicDatasetSinglepercentageChart'] = basicDatasetSinglepercentageChart;
BasicDatasetWidgets['basicDatasetChoropletMapChart'] = basicDatasetChoropletMapChart;
BasicDatasetWidgets['basicDatasetBubblesMapChart'] = basicDatasetBubblesMapChart;
BasicDatasetWidgets['basicDatasetHeatmapMapChart'] = basicDatasetHeatmapMapChart;
