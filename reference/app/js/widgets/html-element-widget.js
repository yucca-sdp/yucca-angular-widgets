'use strict';

var HtmlElementWidgets = HtmlElementWidgets || {};

var htmlTechnicalParams = {'widget_id': {'name':'html_id','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		'html_classes': {'name':'html_class','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''}};

var text = {
	key: 'html_text',	
	name: 'html_text',
	html: function(c){
		var componentId = c.params.advanced.widget_id.values?" id='" + c.params.advanced.widget_id.values + "'":""; 
		var html = '<div ' + componentId + '  class="yucca-html_text ' + c.params.advanced.html_classes.values + '">' + 
			c.params.mandatory.html_text_content.values + '</div>';
		return html;
	},
	params: {
		mandatory:{'html_text_content': {'name':'content','type':'inputtextarea','mandatory':'true','values':'', 'default':'','custom':''}},
		advanced: angular.extend({}, htmlTechnicalParams),
	},
		
	styles: {html_element:{'yucca-html_text':{'name':'yucca-html_text','desc':'yucca-html_text','selector':'.yucca-html_text','custom':''}}}
};

var title = {
		key: 'html_title',	
		name: 'html_title',
		//html: function(c){return '<'+c.params.mandatory.html_title_tag.values+' class="yucca-html_title">' + c.params.mandatory.html_title_content.values + '</'+c.params.mandatory.html_title_tag+'>';},
		html: function(c){
			var componentId = c.params.advanced.widget_id.values?" id='" + c.params.advanced.widget_id.values + "'":""; 
			var html = '<'+c.params.mandatory.html_title_tag.values+ componentId + '  class="yucca-html_title ' +
				c.params.advanced.html_classes.values + '">' + 
				c.params.mandatory.html_title_content.values + '<'+c.params.mandatory.html_title_tag.values+'>';
			return html;
		},
		params: {mandatory:
			{	'html_title_content': {'name':'content','type':'inputtext','mandatory':'true','values':'', 'default':'','custom':''},
				'html_title_tag': {'name':'tag', 'type':'inputselect','mandatory':'true','values':'', 'default':'','data':['h1','h2','h3','h4','h5','h6']},
			},
			advanced: angular.extend({}, htmlTechnicalParams)
		},
		styles: {html_element:{'yucca-html_title':{'name':'yucca-html_title','desc':'yucca-html_title','selector':'.yucca-html_title','custom':''}}}
	};


var image = {
	key: 'html_image',	
	name: 'html_image',
	html: function(c){
		var componentId = c.params.advanced.widget_id.values?" id='" + c.params.advanced.widget_id.values + "'":""; 
		var html = '<img ' + componentId + '  class="yucca-html_image ' + c.params.advanced.html_classes.values + 
		'" src="' + c.params.mandatory.html_image_src.values + '"  title="' + c.params.mandatory.html_image_title.values +' " />';
		return html;
	},
	params: {mandatory:
		{'html_image_src': {'name':'imagesrc','type':'inputimage','mandatory':'true','values':'', 'default':'','custom':''},
			'html_image_title': {'name':'imagetitle','type':'inputtext','mandatory':'false','values':'', 'default':'','custom':''},
		},
		advanced: angular.extend({}, htmlTechnicalParams)
	},
	styles: {html_element:{'yucca-html_image':{'name':'yucca-html_image','desc':'yucca-html_image','selector':'.yucca-html_image','custom':''}}}

};

var link = {
		key: 'html_link',	
		name: 'html_link',
		html: function(c){
			var componentId = c.params.advanced.widget_id.values?" id='" + c.params.advanced.widget_id.values + "'":""; 
			var html = '<a '+ componentId + '  class="yucca-html_link ' + c.params.advanced.html_classes.values + 
			'" href="' + c.params.mandatory.html_link_url.values + '"';
			if(c.params.mandatory.link_new_window.values)
				html += ' target="_blank" ';
			html +=  'title="' + c.params.mandatory.html_link_title.values +'">'+ c.params.mandatory.html_link_label.values+'</a>';
			return html;
		},
		params: {mandatory:
			{	'html_link_url': {'name':'url','type':'inputtext','mandatory':'true','values':'', 'default':'','custom':''},
				'html_link_label': {'name':'label','type':'inputtext','mandatory':'true','values':'', 'default':'','custom':''},
				'html_link_title': {'name':'title','type':'inputtext','mandatory':'true','values':'', 'default':'','custom':''},
				'link_new_window':{'name':'newwindow','type':'inputboolean','mandatory':'false','values':'', 'default':'','custom':''},
			},
			advanced: angular.extend({}, htmlTechnicalParams)		
		},
		styles: {html_element:{'yucca-html_image':{'name':'yucca-html_link','desc':'yucca-html_link','selector':'.yucca-html_link','custom':''}}}
	};

HtmlElementWidgets['html_title'] = title;
HtmlElementWidgets['html_text'] = text;
HtmlElementWidgets['html_image'] = image;
HtmlElementWidgets['html_link'] = link;
	
//
//var basicDatasetDiscretebarChart = {
//		key: 'basicDatasetDiscretebarChart',	
//		name: 'widget_basic_discretebar',
//		directive: 'ng-yucca-dataset-discretebar-chart',
//		//directiveUrl: function(){return 'widget/'+this.key+'.html';},
//		directiveUrl: 'widget/basic/basicDatasetDiscretebarChart.html?time='+currentmillis,
//		features: ['chart'],
//		params: {mandatory: basicDatasetDiscretebarChartParams,
//				common: commonParams,
//				chart: chartParams,
//				odatafilter: odataFilterParam,
//				number_format: formatNumberParams,
//				advanced: advancedParams},
//		events: {
//			'event_listening':{
//				'evt_change_valuecolumn':{'name':'evt_change_valuecolumn','type':'changecolumn', 'values':'{"enabled":true}'},
//				'evt_change_groupbycolumn':{'name':'evt_change_groupbycolumn','type':'changecolumn', 'values':'{"enabled":true}'},
//				'evt_filter_text':{'name':'evt_filtertext','type':'onlyenable', 'values':'{"enabled":true}'},
//			},
//			'event_sending':{
//				'evt_highlight_groupbycolumn':{'name':'evt_highlight_groupbycolumn','type':'onlyenable', 'values':'{"enabled":true}'},
//			}
//		},
//		styles: {
//			common: commonStyles,
//			chart: chartStyles
//		}
//	};
//		


