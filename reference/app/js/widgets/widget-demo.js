'use strict';

var WidgetsDemo = WidgetsDemo || {};

WidgetsDemo["basicDatasetDiscretebarChart"] = {
	mandatory : {
		tenantcode : 'smartlab',
		datasetcode : 'NobelPrizeByWinner_9081',
		value_column : '{key:id, label:id, countingMode:"count"}',
		group_by_column : '{"key":"category","label":"Category"}',
	},
	common : {},
	chart : {
		main_chart_color : '#0066cc',
		x_axis :'{"hide":false,"label":"","rotateLabels":15}'
	},
	odatafilter : {
		filter : '(%27female%27 eq gender) '
	},
	number_format : {
		decimal_value : '0',
	},
	advanced : {
		usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
	}
};

WidgetsDemo["basicDatasetMultiChart"] = {
	mandatory : {
		tenantcode : 'smartlab',
		datasetcode : 'Australianforeignstudents20072009_9501',
		serie_columns : '[{"key":"Total","label":"Total","countingMode":"sum","yAxis":"1","type":"area","color":"#e0e0e0"},{"key":"GenderMale","label":"Male","countingMode":"sum","yAxis":"1","type":"bar","color":"#2da9d9"},{"key":"GenderFemale","label":"Female","countingMode":"sum","yAxis":"1","type":"bar","color":"#b73377"},{"key":"SudAmerica","label":"Sud America","countingMode":"sum","yAxis":"1","type":"line","color":"#ff8585","strokeWidth":4,"classed":"solid","interpolate":"basis"},{"key":"NorthAmerica","label":"North America","countingMode":"sum","yAxis":"1","type":"line","color":"#dc0000","strokeWidth":4,"classed":"solid","interpolate":"basis"},{"key":"Europe","label":"Europe","countingMode":"sum","yAxis":"1","type":"line","color":"#9ade00","strokeWidth":4,"classed":"solid","interpolate":"basis"},{"key":"Africa","label":"Africa","countingMode":"sum","yAxis":"1","type":"line","color":"#333333","strokeWidth":4,"classed":"solid","interpolate":"basis"},{"key":"Asia","label":"Asia","countingMode":"sum","yAxis":"1","type":"line","color":"#fbb32e","strokeWidth":4,"classed":"solid","interpolate":"basis"}]',
		group_by_column : '{"key":"Year","label":"Year"}',
	},
	common : {},
	number_format : {
		format_big_number: 'true',
		decimal_value : '0',
	},
	advanced : {
		usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
	}
};

WidgetsDemo["basicDatasetMultibarChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'Australianforeignstudents20072009_9501',
			serie_columns_multibar : '[{"type":"bar","key":"GenderMale","label":"Male","countingMode":"sum","decimal_value":0,"format_big_number":true,"color":"#2da9d9"},{"type":"bar","key":"GenderFemale","label":"Female","countingMode":"sum","decimal_value":0,"format_big_number":true,"color":"#b73377"}]',
			group_by_column : '{"key":"Year","label":"Year"}',
			series_from_values: 'true' 
		},
		common : {},
		number_format : {
			format_big_number: 'true',
			decimal_value : '0',
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};

WidgetsDemo["basicDatasetLineChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'Australianforeignstudents20072009_9501',
			serie_columns : '[{"type":"line","key":"Jurisprudence","label":"Jurisprudence","countingMode":"sum","color":"#fbb32e","strokeWidth":2,"interpolate":"linear","classed":"solid"},{"type":"line","key":"Physics","label":"Physics","countingMode":"sum","color":"#2ea42e","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"Mathematics","label":"Mathematics","countingMode":"sum","color":"#0080ff","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"Medicine","label":"Medicine","countingMode":"sum","color":"#d20000","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"History","label":"History","countingMode":"sum","color":"#804040","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"Chemistry","label":"Chemistry","countingMode":"sum","color":"#9fcfff","strokeWidth":2,"classed":"solid","interpolate":"linear"}]',
			time_column : '{"key":"Year","label":"Year"}',
		},
		common : {},
		number_format : {
			decimal_value : '0',
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};


WidgetsDemo["basicDatasetPieChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'NobelPrizeByWinner_9081',
			value_column:'{"key":"id","label":"id", "countingMode":"count"}',
			group_by_column:'{"key":"category","label":"Category"}'
		},
		chart : {
			render:'{"donut":true,"donutRatio":"0.4","cornerRadius":"5"}',
			main_chart_color:'#0066cc',
			label_sunbeam_layout:'false'
		},
		odatafilter : {
			filter : '(%27IT%27 eq bornCountryCode)'
		},
		number_format : {
			decimal_value : '0',
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};

WidgetsDemo["basicDatasetHorizontalmultibarChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'Australianforeignstudents20072009_9501',
			horizontalmultibar_serie_columns : '[{"key":"GenderMale","label":"M","countingMode":"sum","color":"#2da9d9", side:"L"},{"key":"GenderFemale","label":"F","countingMode":"sum","color":"#b73377"}]',
			group_by_column: '{"key":"Year","label":"Anno"}',
		},
		number_format : {
			decimal_value : '0',
			format_big_number:'true'
		},
		chart : {
			stacked: true
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};


WidgetsDemo["basicDatasetTreemapChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'NobelPrizeByWinner_9081',
			value_column:'{"key":"id","label":"id", "countingMode":"count"}',
			tree_columns:'[{"key":"category","label":"Category"},{"key":"bornCountry","label":"Born Country"},{"key":"gender","label":"Gender"}]',
		},
		number_format : {
			decimal_value : '0',
		},
		chart : {
			main_chart_color:'#0066cc',
			root_label:'Nobel Prize'
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};

WidgetsDemo["basicDatasetCollapsibletreeChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'NobelPrizeByWinner_9081',
			value_column:'{"key":"id","label":"id", "countingMode":"count"}',
			tree_columns:'[{"key":"category","label":"Category"},{"key":"gender","label":"Gender"}]',
		},
		number_format : {
			decimal_value : '0',
		},
		chart : {
			main_chart_color:'#0066cc',
			root_label:'Nobel Prize'
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};


WidgetsDemo["basicDatasetCollapsibletreeboxesChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'NobelPrizeByWinner_9081',
			value_column:'{"key":"id","label":"id", "countingMode":"count"}',
			tree_columns:'[{"key":"category","label":"Category"},{"key":"gender","label":"Gender"}]',
		},
		number_format : {
			decimal_value : '0',
		},
		chart : {
			main_chart_color:'#0066cc',
			root_label:'Nobel Prize'
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};

WidgetsDemo["basicDatasetSankeyChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'CanadianPostgraduateProfessions_9667',
			value_column:'{"key":"COUNTS","label":"Counts", "countingMode":"sum"}',
			node_columns:'[{"key":"HIGHESTLEVELOFSTUDY","label":"Highest level of study"},{"key":"FIELDOFSTUDYSHORT","label":"Field of study short"},{"key":"WOULDCHOOSESAMEFIELDOFSTUDYCOMPLETEDAGAIN","label":"Would choose same field of study completed again"}]',
		},
		chart : {
			main_chart_color:'#0066cc'
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};
//[{"key":"HIGHESTLEVELOFSTUDY","label":"Highest level of study"},{"key":"FIELDOFSTUDYSHORT","label":"Field of study short"},{"key":"WOULDCHOOSESAMEFIELDOFSTUDYCOMPLETEDAGAIN","label":"Would choose same field of study completed again"}]' widget_width='510' main_chart_color='#0066cc' usertoken='LRulMu0Ie7nC2auw1q_x4MDNLkca' />


WidgetsDemo["basicDatasetChoropletMapChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'EuropeanStructuralInvestmentFunds_9661',
			value_column:'{"key":"TotalAmount","label":"Total Amount", "countingMode":"sum"}',
			group_by_column:'{"key":"State","label":"State"}',
			geojsons:'[{"key":"iso_a2","url":"lib/yucca-angular-widgets/dist/data/europe_countries_geojson.json"}]'
		},
		map : {
			main_chart_color:'#0066cc'
		},
		number_format : {
			decimal_value : '0',
			format_big_number:'true'
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};

WidgetsDemo["basicDatasetSinglepercentageChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'CricketWorldCup_9670',
			value_column:'{"key":"Won","label":"Won"}',
			max_value_column:'{"key":"Total","label":"Total"}',
		},
		chart : {
			//shape:'common_trophy',
			external_shape_url: 'https://int-userportal.smartdatanet.it/reference/lib/yucca-angular-widgets/dist/img/svg/common/trophy.svg',
			orientation:'vertical',
			full_color:'#0066cc',
			empty_color:'#ffffff',
			stroke_color:'#0066cc',			
		},
		number_format : {
			decimal_value : '0',
		},
		chart_text: {
			show_label:'true',
			label_column:'{"key":"Country","label":"Country"}',
			show_value:'true',
			show_max_value_label:'true',
			max_value_label:'/',
			show_max_value:'true'
		},
		odatafilter : {
			filter : '(%27Australia%27 eq Country) '
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};

WidgetsDemo["basicDatasetForcedirectedChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'InternationalOrganization_9668',
			relations:'[{"source":"Name","sourceType":"Name","target":"Country","targetType":"Country","relationType":"Indian Ocean Organization","linkLine":"bezier"}]'
		},
		odatafilter : {
			filter : '(%27Oceano Indiano%27 eq Continent) '
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};

WidgetsDemo["basicDatasetFunnelChart"] = {
		mandatory : {
			tenantcode : 'smartlab',
			datasetcode : 'RecruitmentProcess_9671',
			value_column : '{"key":"FirstName","label":"First Name", "countingMode":"count"}',
			group_by_column : '{"key":"RecruitmentStatus","label":"Recruitment Status"}',
		},
		common : {},
		chart : {
			main_chart_color : '#0066cc',
		},
		number_format : {
			decimal_value : '0',
		},
		advanced : {
			usertoken : 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
		}
	};
