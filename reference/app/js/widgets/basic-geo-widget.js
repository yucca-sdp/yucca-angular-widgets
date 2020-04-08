'use strict';

var BasicGeoWidgets = BasicGeoWidgets || {};


var mapParams = {'main_chart_color':{'name':'main_chart_color','type':'inputcolor','mandatory':'false','values':'', 'default':'','custom':''},
					'range_colors':{'name':'range_colors','type':'multiplerangecolor', 'mandatory':'false','values':[], 'default':'','custom':''},
					'zoom_control':{'name':'zoom_control','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
					'scroll_wheel_zoom':{'name':'scroll_wheel_zoom','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
					'map_legend':{'name':'map_legend','type':'maplegend','mandatory':'false','values':'', 'default':'','custom':''}
				};


// styles
var commonStyles = {'yucca_widget_header_title':{'name':'yucca_widget_header_title','selector':'.yucca-widget-header','custom':''},
					'yucca_widget_header_subtitle':{'name':'yucca_widget_header_subtitle','selector':'.yucca-widget-header small','custom':''},
					'yucca_widget_intro':{'name':'yucca_widget_intro','selector':'.yucca-widget-intro','custom':''},
					'yucca_widget_footer':{'name':'yucca_widget_footer','selector':'.yucca-widget-footer','custom':''},		
					'yucca_widget_footer_text':{'name':'yucca_widget_footer_text','selector':'.yucca-widget-footer-text','custom':''},		
};

var chartStyles = {'yucca-widget-chart-content':{'name':'yucca-widget-chart-content','selector':'.yucca-widget-chart-content','custom':''},
					'yucca-widget-chart':{'name':'yucca-widget-chart','selector':'.yucca-widget-chart','custom':''}		
		};



var basicDatasetChoropletMapParams = {
		'value_column':{'name':'value_column','type':'datasetvaluecolumn','mandatory':'true','values':'', 'default':'','custom':''},
		'group_by_column':{'name':'group_by_column','type':'datasetcolumn','mandatory':'true','values':'', 'default':'','custom':''},
};

;


var basicGeoChoropletMapParams = {'geojsons':{'name':'geojsons','type':'geojsons','mandatory':'false','values':'', 'default':'','custom':''}};

var basicGeoChoropletMap = {
	key: 'basicGeoChoropletMap',	
	name: 'widget_basic_choropletmap',
	directive: 'ng-yucca-dataset-choropleth-map',
	//directiveUrl: function(){return 'widget/'+this.key+'.html';},
	//directiveUrl: 'widget/basic/basicDatasetDiscretebarChart.html?time='+currentmillis,
	badge: 'beta',
	features: ['map'],
	params: {mandatory: angular.extend({},datasetParams, basicDatasetChoropletMapParams, basicGeoChoropletMapParams),
			common: angular.extend({}, commonParams,commonSizeParams),
			map: angular.extend({}, mapParams),
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
	
BasicGeoWidgets['basicGeoChoropletMap'] = basicGeoChoropletMap;
	

