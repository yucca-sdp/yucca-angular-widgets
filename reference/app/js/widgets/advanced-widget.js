'use strict';

var AdvancedWidgets = AdvancedWidgets || {};


var currentmillis = new Date().getTime();
var codeBaseUrl  = 'https://github.com/csipiemonte/yucca-angular-widgets/tree/builder/angular-yucca/src/js/widgets/';
var storeBaseUrl  = 'https://userportal.smartdatanet.it/userportal/#/dataexplorer/detail/';

var streamTweetStatsWidget = {
	key: 'streamTweetStats',	
	name: 'widget_social',
	directive: 'ng-yucca-stream-tweet-stats',
	codeUrl: codeBaseUrl + 'yucca-streams-tweet-stats.js',
	storeUrl: function(){return storeBaseUrl + this.params["tenant_code"].custom + "/" + this.params["stream_code"].custom },
	//directiveUrl: function(){return 'widget/'+this.key+'.html';},
	directiveUrl: 'widget/streamTweetStats.html?time='+currentmillis,
	features: ['social', 'chart'],
	params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Staistiche dei Tweet su '},
			 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
			 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'smartlab'},
			 'stream_code':{'name':'stream_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'lavenaria'},
		     'smartobject_code': {'name':'smartobject_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'SmartdatanetEventi'},
	},
	advancedParams: {
			'landing_panel':{'name':'landing_panel','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['chart','lastTweet','mostRetweet'], 'default':'chart','custom':''},
			'time_range':{'name':'time_range','multiple': 'false', 'key_value': 'false','mandatory':'false','values':Constants.timeRangeValues, 'default':'today','custom':'yesterday'},
			'time_min_date':{'name':'time_min_date','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			'time_max_date':{'name':'time_max_date','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			 'chart_type':{'name':'chart_type','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['lineChart', 'discreteBarChart'], 'default':'lineChart','custom':''},
			 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'300','custom':''},
			 'chart_colors':{'name':'chart_colors','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':Constants.chartColorsDefault},
		     'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
		     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
			},
	styles: {'yucca-stream-tweet-stats':{'name':'yucca-stream-tweet-stats','desc':'yucca_stream_tweet_stats','custom':''},
			'yucca-stream-tweet-stats-header':{'name':'yucca-stream-tweet-stats-header','desc':'yucca_stream_tweet_stats_header','custom':''},
			'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
			'yucca-stream-tweet-stats-content':{'name':'yucca-stream-tweet-stats-content','desc':'yucca_stream_tweet_stats_content','custom':''},
			'yucca-stream-tweet-stats-chart':{'name':'yucca-stream-tweet-stats-chart','desc':'yucca_stream_tweet_stats_chart','custom':''},
			'yucca-stream-tweet-stats-xaxis-label':{'name':'yucca-stream-tweet-stats-xaxis-label','desc':'yucca_stream_tweet_stats_xaxis_label','custom':''},
			'yucca-stream-tweet-stats-data':{'name':'yucca-stream-tweet-stats-data','desc':'yucca_stream_tweet_stats_data','custom':''},
			'yucca-stream-tweet-stats-table':{'name':'yucca-stream-tweet-stats-table','desc':'yucca_stream_tweet_stats_table','custom':''},
			'yucca-stream-tweet-stats-value':{'name':'yucca-stream-tweet-stats-value','desc':'yucca_stream_tweet_stats_value','custom':''},
			'yucca-stream-tweet-stats-label':{'name':'yucca-stream-tweet-stats-label','desc':'yucca_stream_tweet_stats_label','custom':''},
			'yucca-stream-tweet-stats-toolbar':{'name':'yucca-stream-tweet-stats-toolbar','desc':'yucca_stream_tweet_stats_toolbar','custom':''},
			'active':{'name':'active','desc':'active','custom':''},
			'yucca-credits-intro':{'name':'yucca-credits-intro','desc':'yucca_credits_intro','custom':''},
			'yucca-stream-tweet-stats-tooltip':{'name':'yucca-stream-tweet-stats-tooltip','desc':'yucca_stream_tweet_stats_tooltip','custom':''},
			'yucca-stream-tweet-stats-tooltip-header':{'name':'yucca-stream-tweet-stats-tooltip-header','desc':'yucca_stream_tweet_stats_tooltip_header','custom':''},
			'tweet-profile-image':{'name':'tweet-profile-image','desc':'tweet_profile_image','custom':''},
			'tweet-message':{'name':'tweet-message','desc':'tweet_message','custom':''},
			'tweet-author':{'name':'tweet-author','desc':'tweet_author','custom':''},
			'tweet-text':{'name':'tweet-text','desc':'tweet_text','custom':''},
			'tweet-user':{'name':'tweet-user','desc':'tweet_user','custom':''},
			'tweet-hashtag':{'name':'tweet-hashtag','desc':'tweet_hashtag','custom':''},
			'tweet-retweet':{'name':'tweet-retweet','desc':'tweet_retweet','custom':''},
			'tweet-favorite':{'name':'tweet-favorite','desc':'tweet_favorite','custom':''},
			'tweet-info':{'name':'tweet-info','desc':'tweet_info','custom':''},
			'tweet-statistic-icons':{'name':'tweet-statistic-icons','desc':'tweet_statistic_icons','custom':''},
			'tweet-date':{'name':'tweet-date','desc':'tweet_date','custom':''},
		}
};
	
//AdvancedWidgets['streamTweetStats'] = streamTweetStatsWidget;
	
var datasetImageGalleryWidget = {
	key: 'datasetImageGallery',	
	name: 'widget_gallery',
	directive: 'ng-yucca-dataset-image-gallery',
	directiveUrl: 'widget/datasetImageGallery.html?time='+currentmillis,
	codeUrl: codeBaseUrl + 'yucca-datasets-image-gallery.js',
	storeUrl: function(){return storeBaseUrl + this.params["tenant_code"].custom + "/" + this.params["dataset_code"].custom },

	features: ['map', 'images'],
	params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false', 'values':'', 'default':'','custom':'Immagini della coltura di vigneti, dal progetto CIRCE'},
			 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
		 	 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'circe'},
		 	 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Fotoagro_576'},
		 	 'image_columns':{'name':'image_columns','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'["Immagine"]'},
		 	 'image_title_column':{'name':'image_title_columns','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Descrizione'},
		 	 'position_columns':{'name':'position_columns','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'["Latitudine","Longitudine"]'},
	},
	advancedParams: {
			 'show_title':{'name':'show_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'true','custom':''},
			 'landing_panel':{'name':'landing_panel','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['map','slideshow'], 'default':'slideshow','custom':''},
		 	 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
		 	 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':'23'},
		 	 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'10','custom':'8'},
		 	 'interval':{'name':'interval','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'2000','custom':'3000'},
		 	 'marker_as_image':{'name':'marker_as_image','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'false'},
		 	 'marker_url':{'name':'marker_url','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
		     'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
		     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
	},
	styles: {'yucca-dataset-image-gallery':{'name':'yucca-dataset-image-gallery','desc':'yucca_dataset_image_gallery','custom':''},
			 'yucca-dataset-image-gallery-header':{'name':'yucca-dataset-image-gallery-header','desc':'yucca_dataset_image_gallery_header','custom':''},
			 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
			 'yucca-dataset-image-gallery-content':{'name':'yucca-dataset-image-gallery-content','desc':'yucca_dataset_image_gallery_content','custom':''},
			 'yucca-dataset-image-gallery-map':{'name':'yucca-dataset-image-gallery-map','desc':'yucca_dataset_image_gallery_map','custom':''},
			 'yucca-dataset-image-gallery-slideshow':{'name':'yucca-dataset-image-gallery-slideshow','desc':'yucca_dataset_image_gallery_slideshow','custom':''},
			 'yucca-dataset-image-gallery-content':{'name':'yucca-dataset-image-gallery-content','desc':'yucca_dataset_image_gallery_content','custom':''},
			 'yucca-dataset-image-gallery-slide-title':{'name':'yucca-dataset-image-gallery-slide-title','desc':'yucca_dataset_image_gallery_slide_title','custom':''},
			 'yucca-dataset-image-gallery-bullets-panel':{'name':'yucca-dataset-image-gallery-bullets-panel','desc':'yucca_dataset_image_gallery_bullets_panel','custom':''},
			 'yucca-dataset-image-gallery-bullet':{'name':'yucca-dataset-image-gallery-bullet','desc':'yucca_dataset_image_gallery_bullet','custom':''},
			 'yucca-dataset-image-gallery-data':{'name':'yucca-dataset-image-gallery-data','desc':'yucca_dataset_image_gallery_data','custom':''},
			 'yucca-dataset-image-gallery-total-count':{'name':'yucca-dataset-image-gallery-total-count','desc':'yucca_dataset_image_gallery_total_count','custom':''},
			 'yucca-dataset-image-gallery-toolbar':{'name':'yucca-dataset-image-gallery-toolbar','desc':'yucca_dataset_image_gallery_toolbar','custom':''},
			 'active':{'name':'active','desc':'active','custom':''},
	}
};
		
AdvancedWidgets['datasetImageGallery'] = datasetImageGalleryWidget;
		
//
//var datasetMultidataStatsWidget_index = 0;
//var datasetMultidataStatsWidget_firstGroupColumn = ['Prov', 'Province'];
//var datasetMultidataStatsWidget_secondGroupColumn = [['PosteggiOccupatialimentari','PosteggiOccupatinonAlimentari','PosteggiOccupatiproduttoriagricoli'],
//                                                     ['FrazioneOrganicaTA','SfalciEPotatureTA','CartaECartoneTA', 'VetroTA','MultiMaterialeTA','PlasticaTA','LegnoTA','TessiliTA']];
//var datasetMultidataStatsWidget_secondGroupLabel = [['Alimentari','Non Alimentari', 'Produttori Agricoli'],
//                        ['Organico','Potature','Carta', 'Vetro','Misto','Plastica','Legno','Tessili']];
//var datasetMultidataStatsWidget_tenant = ['regpie', 'regpie'];
//var datasetMultidataStatsWidget_dataset_code = ['Mercati_1216','Produzione_r_1192'];
//var datasetMultidataStatsWidget_thirdGroupColumn = ['DenominazioneComune','Comune'];
//var datasetMultidataStatsWidget_grouping_way = ['stacked', 'stacked'];

var datasetMultidataStatsWidget_index = 0;
var datasetMultidataStatsWidget_firstGroupColumn = ['Prov', 'Province'];
var datasetMultidataStatsWidget_secondGroupColumn = [['PosteggiOccupatialimentari','PosteggiOccupatinonAlimentari','PosteggiOccupatiproduttoriagricoli'],
                                                     ['FrazioneOrganicaTA','SfalciEPotatureTA','CartaECartoneTA', 'VetroTA','MultiMaterialeTA','PlasticaTA','LegnoTA','TessiliTA']];
var datasetMultidataStatsWidget_secondGroupLabel = [['Alimentari','Non Alimentari', 'Produttori Agricoli'],
                        ['Organico','Potature','Carta', 'Vetro','Misto','Plastica','Legno','Tessili']];
var datasetMultidataStatsWidget_tenant = ['regpie', 'regpie'];
var datasetMultidataStatsWidget_dataset_code = ['Mercati_1216','Produzione_r_1192'];
var datasetMultidataStatsWidget_thirdGroupColumn = ['DenominazioneComune','Comune'];
var datasetMultidataStatsWidget_grouping_way = ['stacked', 'stacked'];

var datasetMultidataStatsWidget = {
		key: 'datasetMultidataStats',	
		name: 'widget_multidata',
		codeUrl: codeBaseUrl + 'yucca-datasets-multidata-stats.js',
		storeUrl: function(){return storeBaseUrl + this.params["tenant_code"].custom + "/" + this.params["dataset_code"].custom },
		directive: 'ng-yucca-dataset-multidata-stats',
		directiveUrl: 'widget/datasetMultidataStats.html?time='+currentmillis,
		features: ['dataexplorer', 'chart'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Open Data sulle aree mercatali in Piemonte'},
			     'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'LaReteDistri_3267'},
				 'first_group_column':{'name':'first_group_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Provincia'},
				 'histogram_group_column': {'name':'histogram_group_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'histogram_group_value_column': {'name':'histogram_group_value_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'second_group_column':{'name':'second_group_column','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':["N_farmacie","N_imp_distr_carb","N_edicole_esclus"]},
				 'third_group_column':{'name':'third_group_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'DenominazioneComune'},
		},
		advancedParams: {
    			 'landing_panel':{'name':'landing_panel','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['chart','data'], 'default':'chart','custom':''},
				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'first_group_colors':{'name':'first_group_colors','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':Constants.chartColorsDefault},
				 'second_group_label':{'name':'second_group_label','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':["Farmacie","Distributori","Edicole"]},
				 'counting_mode':{'name':'counting_mode','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['count','sum'], 'default':'count','custom':'sum'},
				 'chart_type':{'name':'chart_type','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['multiBarChart', 'multiBarHorizontalChart'], 'default':'multiBarChart','custom':''},
				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'300','custom':'300'},
				 'grouping_way': {'name':'grouping_way','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['grouped','stacked'], 'default':'grouped','custom':datasetMultidataStatsWidget_grouping_way[datasetMultidataStatsWidget_index]},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: {'yucca-dataset-multidata-stats':{'name':'yucca-dataset-multidata-stats','desc':'yucca_dataset_multidata_stats','custom':''},
				 'yucca-dataset-multidata-stats-header':{'name':'yucca-dataset-multidata-stats-header','desc':'yucca_dataset_multidata_stats_header','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-dataset-multidata-stats-content':{'name':'yucca-dataset-multidata-stats-content','desc':'yucca_dataset_multidata_stats_content','custom':''},
				 'yucca-dataset-multidata-stats-chart':{'name':'yucca-dataset-multidata-stats-chart','desc':'yucca_dataset_multidata_stats_chart','custom':''},
				 'yucca-dataset-multidata-stats-data':{'name':'yucca-dataset-multidata-stats-data','desc':'yucca_dataset_multidata_stats_data','custom':''},
				 'yucca-dataset-multidata-stats-table':{'name':'yucca-dataset-multidata-stats-table','desc':'yucca_dataset_multidata_stats_table','custom':''},
				 'yucca-dataset-multidata-stats-tooltip':{'name':'yucca-dataset-multidata-stats-tooltip','desc':'yucca_dataset_multidata_stats_tooltip','custom':''},
				 'yucca-dataset-multidata-stats-tooltip_header':{'name':'yucca-dataset-multidata-stats-tooltip_header','desc':'yucca_dataset_multidata_stats_tooltip_header','custom':''},
				 'yucca-dataset-multidata-stats-tooltip_label':{'name':'yucca-dataset-multidata-stats-tooltip_label','desc':'yucca_dataset_multidata_stats_tooltip_label','custom':''},
				 'yucca-dataset-multidata-stats-tooltip_value':{'name':'yucca-dataset-multidata-stats-tooltip_value','desc':'yucca_dataset_multidata_stats_tooltip_value','custom':''},
				 'yucca-dataset-multidata-stats-toolbar':{'name':'yucca-dataset-multidata-stats-toolbar','desc':'yucca_dataset_multidata_stats_toolbar','custom':''},
				 'active':{'name':'active','desc':'active','custom':''},
				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
		}
};
			
AdvancedWidgets['datasetMultidataStats'] = datasetMultidataStatsWidget;






































//var streamMultistreamValueWidget_streams = [{"tenantCode":"csp", "streamCode":"H", "smartobjectCode":"a3de712d-6801-5cc4-84b6-a10bd830469d", "components": [{"name":"value","label": "Humidity", "minWarning":"10","minCritical":"0","maxWarning":"30","maxCritical":"50"} ]},
//											{"tenantCode":"sandbox", "streamCode":"dati", "smartobjectCode":"611b5e80-e678-55a7-b120-7a06657b4f92", "components": [{"name":"d1","label": "Temperatura","minWarning":"10","minCritical":"0","maxWarning":"30","maxCritical":"50"},
//											                                                                                                                       {"name":"secondo","label": "Ciao","minWarning":"10","minCritical":"0","maxWarning":"30","maxCritical":"50"}]}];
var streamMultistreamValueWidget_streams = [{"tenantCode":"csp", "streamCode":"H", "smartobjectCode":"a3de712d-6801-5cc4-84b6-a10bd830469d", "components": [{"name":"value","label": "Humidity", "minWarning":"30","minCritical":"20","maxWarning":"70","maxCritical":"80"} ]},
                                            {"tenantCode":"csp", "streamCode":"Light", "smartobjectCode":"a3de712d-6801-5cc4-84b6-a10bd830469d", "components": [{"name":"value","label": "Light", "minWarning":"100","minCritical":"50","maxWarning":"400","maxCritical":"600"} ]},
                                            {"tenantCode":"csp", "streamCode":"T", "smartobjectCode":"a3de712d-6801-5cc4-84b6-a10bd830469d", "components": [{"name":"value","label": "Temperature", "minWarning":"17","minCritical":"14","maxWarning":"26","maxCritical":"30"} ]},
                                            {"tenantCode":"csp", "streamCode":"VOC", "smartobjectCode":"a3de712d-6801-5cc4-84b6-a10bd830469d", "components": [{"name":"value","label": "Volatile Organic Compounds", "minWarning":"10","minCritical":"0","maxWarning":"1200","maxCritical":"2500"} ]},
                                            {"tenantCode":"csp", "streamCode":"FrmHyd", "smartobjectCode":"a3de712d-6801-5cc4-84b6-a10bd830469d", "components": [{"name":"value","label": "Formaldeide", "minWarning":"0","minCritical":"0","maxWarning":"0.1","maxCritical":"0.2"}]}];

var streamMultistreamValueWidget = {
		key: 'streamMultistreamValue',	
		name: 'widget_detection',
		directive: 'ng-yucca-stream-multistream-value',
		directiveUrl: 'widget/streamMultistreamValue.html?time='+currentmillis,
		features: ['websocket'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Rilevamento della qualita\' dell\'aria nelle scuole, dal progetto HALADIN\'s@schools'},
			 	 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'HALADINs - Ist. Castigliano'},
				 'streams':{'name':'streams','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':streamMultistreamValueWidget_streams},
		},
		advancedParams: {
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: {'yucca-stream-multistream-value':{'name':'yucca-stream-multistream-value','desc':'yucca_stream_multistream_value','custom':''},
				 'yucca-stream-multistream-value-header':{'name':'yucca-stream-multistream-value-header','desc':'yucca_stream_multistream_value_header','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-stream-multistream-value-content':{'name':'yucca-stream-multistream-value-content','desc':'yucca_stream_multistream_value_content','custom':''},
				 'yucca-stream-multistream-value-data':{'name':'yucca-stream-multistream-value-data','desc':'yucca_stream_multistream_value_data','custom':''},
				 'yucca-stream-multistream-value-table':{'name':'yucca-stream-multistream-value-table','desc':'yucca_stream_multistream_value_table','custom':''},
				 'yucca-stream-multistream-value-stream-row':{'name':'yucca-stream-multistream-value-stream-row','desc':'yucca_stream_multistream_value_stream_row','custom':'display:none;'},
				 'yucca-stream-multistream-value-component':{'name':'yucca-stream-multistream-value-component','desc':'yucca_stream_multistream_value_component','custom':''},
				 'yucca-stream-multistream-value-component_bullet':{'name':'yucca-stream-multistream-value-component_bullet','desc':'yucca_stream_multistream_value_component_bullet','custom':''},
				 'yucca-stream-multistream-value-bullet':{'name':'yucca-stream-multistream-value-bullet','desc':'yucca_stream_multistream_value_bullet','custom':''},
				 'bullet_ok':{'name':'bullet_ok','desc':'bullet_ok','custom':''},
				 'bullet_warning':{'name':'bullet_warning','desc':'bullet_warning','custom':''},
				 'bullet_critical':{'name':'bullet_critical','desc':'bullet_critical','custom':''},
				 'yucca-stream-multistream-value-component_value':{'name':'yucca-stream-multistream-value-component_value','desc':'yucca_stream_multistream_value_component_value','custom':''},
				 'yucca_stream_multistream_component_measureunit':{'name':'yucca_stream_multistream_component_measureunit','desc':'yucca_stream_multistream_component_measureunit','custom':''},
				 'yucca-stream-multistream-value-lastupdate_bar':{'name':'yucca-stream-multistream-value-lastupdate_bar','desc':'yucca_stream_multistream_value_lastupdate_bar','custom':''},
				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
		}
};
			
AdvancedWidgets['streamMultistreamValue'] = streamMultistreamValueWidget;

// sandbox dati 611b5e80-e678-55a7-b120-7a06657b4f92  configured with dch 
// limpid/d9842127-528b-4bbd-a10b-6ccf54616645/BT_device_statistics with multiple components
// arpa_rumore/internal/s_tutti
// csp/H/a3de712d-6801-5cc4-84b6-a10bd830469d  a lot of data
// private smartlab/185001fe-62e3-4b99-a8ba-93cba2202d3d/condivisoONDE  !!! INTEGRAZIONE !!!
//sandbox/95f0ee0a-da92-463d-ca73-81643e9a36f9/stream_csv  multicomponents

var streamLastValueWidget = {  
		key: 'streamLastValue',	
		name: 'widget_lastvalue',
		directive: 'ng-yucca-stream-last-value',
		directiveUrl: 'widget/streamLastValue.html?time='+currentmillis,
		features: ['websocket', 'chart'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Rilevamento dell\'inquinamento acustico, dal progetto QIUES'},
    			 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'quies'},
				 'stream_code':{'name':'stream_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'quies'},
			     'smartobject_code': {'name':'smartobject_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'quies'}
		},
		advancedParams: {
				 'labels':{'name':'labels','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':['Rumore']},
				 'components':{'name':'components','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':['livello_rumore']},
				 'chart_type':{'name':'chart_type','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['lineChart', 'discreteBarChart'], 'default':'lineChart','custom':''},
				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'60','custom':''},
				 'chart_width':{'name':'chart_width','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'200','custom':''},
				 'chart_color':{'name':'chart_color','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'#0050ef','custom':'#aa00ff'},
				 'show_lastupdate': {'name':'show_lastupdate','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['true', 'false'], 'default':'false','custom':''},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: { 'yucca-stream-last-value':{'name':'yucca-stream-last-value','desc':'yucca_stream_last_value','custom':''},
				 'yucca-stream-last-value-header ':{'name':'yucca-stream-last-value-header ','desc':'yucca_stream_last_value_header ','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-stream-last-value-content':{'name':'yucca-stream-last-value-content','desc':'yucca_stream_last_value_content','custom':''},
				 'yucca-stream-last-value-data':{'name':'yucca-stream-last-value-data','desc':'yucca_stream_last_value_data','custom':''},
				 'yucca-stream-last-value-panel':{'name':'yucca-stream-last-value-panel','desc':'yucca_stream_last_value_panel','custom':''},
				 'yucca-stream-last-value-panel-single':{'name':'yucca-stream-last-value-panel-{{component.name}}','desc':'yucca_stream_last_value_panel_single','custom':''},
				 'yucca-stream-last-value-panel-separator':{'name':'yucca-stream-last-value-panel-separator','desc':'yucca_stream_last_value_panel_separator','custom':''},
				 'yucca-stream-last-value-component-name':{'name':'yucca-stream-last-value-component-name','desc':'yucca_stream_last_value_component_name','custom':'display:none'},
				 'yucca-stream-last-value-component-value':{'name':'yucca-stream-last-value-component-value','desc':'yucca_stream_last_value_component_value','custom':''},
				 'yucca-stream-last-component-measureunit':{'name':'yucca-stream-last-component-measureunit','desc':'yucca_stream_last_component_measureunit','custom':''},
				 'yucca-stream-last-value-component-panel':{'name':'yucca-stream-last-value-component-panel','desc':'yucca_stream_last_value_component_panel','custom':''},
				 'yucca-stream-last-value-component-value-info':{'name':'yucca-stream-last-value-component-value-info','desc':'yucca_stream_last_value_component_value_info','custom':''},
				 'yucca-stream-last-value-component-trend':{'name':'yucca-stream-last-value-component-trend','desc':'yucca_stream_last_value_component_trend','custom':''},
				 'yucca-stream-last-value-component-chart':{'name':'yucca-stream-last-value-component-chart','desc':'yucca_stream_last_value_component_chart','custom':''},
				 'yucca-stream-last-value-component-chart-x-xAxis':{'name':'yucca-stream-last-value-component-chart-x-xAxis','desc':'yucca_stream_last_value_component_chart_x_xAxis','custom':''},
				 'yucca-stream-last-value-lastupdate-bar':{'name':'yucca-stream-last-value-lastupdate-bar','desc':'yucca_stream_last_value_lastupdate_bar','custom':''},

		}
};

		
AdvancedWidgets['streamLastValue'] = streamLastValueWidget;


// sandbox/95f0ee0a-da92-463d-ca73-81643e9a36f9/stream_csv  multicomponents
// csi_ambiente/meteo_arpa_sede_to/pressione
// arpa_rumore/internal/rumore2
var streamMonitorWidget = {  
		key: 'streamMonitor',	
		name: 'widget_monitor',
		directive: 'ng-yucca-stream-monitor',
		directiveUrl: 'widget/streamMonitor.html?time='+currentmillis,
		features: ['websocket', 'chart'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Rilevamento dell\'inquinamento acustico, dal progetto Fonometri di ARPA Piemonte'},
			 	 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Stazione meteo presso sede ARPA Torino - via Pio VII, 9'},
				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'csi_ambiente'},
				 'stream_code':{'name':'stream_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'pressione'},
			     'smartobject_code': {'name':'smartobject_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'meteo_arpa_sede_to'}
		},
		advancedParams: {
			 	 'landing_panel':{'name':'landing_panel','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['chart','data'], 'default':'chart','custom':''},
				 'components':{'name':'components','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':["pressione_atmosferica", "pressione_media_ora","pressione_max_ora","pressione_min_ora"]},
				 'labels':{'name':'labels','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':["Atmosferica","Media","Massima","Minima"]},
				 'chart_type':{'name':'chart_type','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['lineChart', 'discreteBarChart'], 'default':'lineChart','custom':''},
				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'60','custom':''},
				 'chart_width':{'name':'chart_width','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'200','custom':''},
				 'chart_color':{'name':'chart_color','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'#0050ef','custom':'#aa00ff'},
				 'show_lastupdate': {'name':'show_lastupdate','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['true', 'false'], 'default':'false','custom':''},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: { 'yucca-stream-monitor':{'name':'yucca-stream-monitor','desc':'yucca_stream_monitor','custom':''},
				 'yucca-stream-monitor-header ':{'name':'yucca-stream-monitor-header ','desc':'yucca_stream_monitor_header ','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-stream-monitor-content':{'name':'yucca-stream-monitor-content','desc':'yucca_stream_monitor_content','custom':''},
				 'yucca-stream-monitor-chart':{'name':'yucca-stream-monitor-chart','desc':'yucca_stream_monitor_chart','custom':''},
				 'yucca-stream-monitor-chart-x-xAxis':{'name':'yucca-stream-monitor-chart-x-xAxis','desc':'yucca_stream_monitor_chart_x_xAxis','custom':''},
				 'yucca-stream-monitor-data':{'name':'yucca-stream-monitor-data','desc':'yucca_stream_monitor_data','custom':''},
				 'yucca-stream-monitor-data-table':{'name':'yucca-stream-monitor-table','desc':'yucca_stream_monitor_table','custom':''},
				 'yucca-stream-monitor-toolbar':{'name':'yucca-stream-monitor-toolbar','desc':'yucca_stream_monitor_toolbar','custom':''},
				 'active':{'name':'active','desc':'active','custom':''},
				 'yucca-stream-monitor-lastupdate-bar':{'name':'yucca-stream-monitor-lastupdate-bar','desc':'yucca_stream_monitor_lastupdate_bar','custom':''},
		}
};

//AdvancedWidgets = {};

		
AdvancedWidgets['streamMonitor'] = streamMonitorWidget;




//csp/88c8dfb2-6323-5445-bf7d-6af67f0166b6/TrFl
//csp/f07f098e-2be4-50df-9753-cdc3905f4c41/TrFl
var streamMultistreamMapWidget_streams = [{"tenantCode":"csp", "streamCode":"H", "smartobjectCode":"a3de712d-6801-5cc4-84b6-a10bd830469d", "components": [{"name":"value","minWarning":"10","minCritical":"0","maxWarning":"30","maxCritical":"50"} ]},
										  {"tenantCode":"sandbox", "streamCode":"dati", "smartobjectCode":"611b5e80-e678-55a7-b120-7a06657b4f92", "components": [{"name":"d1","minWarning":"10","minCritical":"0","maxWarning":"30","maxCritical":"50"},
											                                                                                                                       {"name":"secondo","minWarning":"10","minCritical":"0","maxWarning":"30","maxCritical":"50"}]}];
var streamMultistreamMapWidget = {
		key: 'streamMultistreamMap',	
		name: 'widget_map',
		directive: 'ng-yucca-stream-multistream-map',
		directiveUrl: 'widget/streamMultistreamMap.html?time='+currentmillis,
		features: ['map', 'chart', 'dataexplorer'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Multistream'},
			     'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
				 'streams':{'name':'streams','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'csp'},
				 'domain':{'name':'domain','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'search_query':{'name':'search_query','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'TrafficFlow'},
		},
		advancedParams: {
			     'landing_panel':{'name':'landing_panel','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['map','data'], 'default':'map','custom':''},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: {'yucca-stream-multistream-map':{'name':'yucca-stream-multistream-map','desc':'yucca_stream_multistream_value','custom':''},
				 'yucca-stream-multistream-map-header':{'name':'yucca-stream-multistream-map-header','desc':'yucca_stream_multistream_value_header','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-stream-multistream-map-content':{'name':'yucca-stream-multistream-map-content','desc':'yucca_stream_multistream_value_content','custom':''},
				 'yucca-stream-multistream-map-data':{'name':'yucca-stream-multistream-map-data','desc':'yucca_stream_multistream_value_data','custom':''},
				 'yucca-stream-multistream-map-table':{'name':'yucca-stream-multistream-map-table','desc':'yucca_stream_multistream_value_table','custom':''},
				 'yucca-stream-multistream-map-stream_row':{'name':'yucca-stream-multistream-map-stream_row','desc':'yucca_stream_multistream_value_stream_row','custom':''},
				 'yucca-stream-multistream-map-component':{'name':'yucca-stream-multistream-map-component','desc':'yucca_stream_multistream_value_component','custom':''},
				 'yucca-stream-multistream-map-component_bullet':{'name':'yucca-stream-multistream-map-component_bullet','desc':'yucca_stream_multistream_value_component_bullet','custom':''},
				 'yucca-stream-multistream-map-bullet':{'name':'yucca-stream-multistream-map-bullet','desc':'yucca_stream_multistream_value_bullet','custom':''},
				 'yucca-stream-multistream-map-toolbar':{'name':'yucca-stream-multistream-map-toolbar','desc':'yucca_stream_multistream_value_toolbar','custom':''},
				 'active':{'name':'active','desc':'active','custom':''},
				 'bullet_ok':{'name':'bullet_ok','desc':'bullet_ok','custom':''},
				 'bullet_warning':{'name':'bullet_warning','desc':'bullet_warning','custom':''},
				 'bullet_critical':{'name':'bullet_critical','desc':'bullet_critical','custom':''},
				 'yucca-stream-multistream-map-component_value':{'name':'yucca-stream-multistream-map-component_value','desc':'yucca_stream_multistream_value_component_value','custom':''},
				 'yucca_stream_multistream_component_measureunit':{'name':'yucca_stream_multistream_component_measureunit','desc':'yucca_stream_multistream_component_measureunit','custom':''},
				 'yucca-stream-multistream-map-lastupdate_bar':{'name':'yucca-stream-multistream-map-lastupdate_bar','desc':'yucca_stream_multistream_value_lastupdate_bar','custom':''},
				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
		}
};
	


//AdvancedWidgets['streamMultistreamMap'] = streamMultistreamMapWidget;

var streamMultistreamStatsWidgetDatasets  = [['csp', 'ds_Trfl_2'],  ['csp', 'ds_Trfl_4'],  ['csp', 'ds_Trfl_18']];

var streamMultistreamStatsWidget = {
		key: 'streamMultistreamStats',
		name: 'widget_map',
		directive: 'ng-yucca-stream-multistream-stats',
		directiveUrl: 'widget/streamMultistreamStats.html?time='+currentmillis,
		features: ['map', 'dataexplorer'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Rilevamento del traffico sul territorio, dal progetto Trasporti di CSP'},
			 	 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
				 'datasets': {'name':'datasets','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':streamMultistreamStatsWidgetDatasets}
				},
		advancedParams: {
				 'landing_panel':{'name':'landing_panel','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['map','data'], 'default':'map','custom':''},
				 'orderby': {'name':'orderby','multiple': 'false', 'key_value': 'false','mandatory':'true','values':'', 'default':'','custom':'hour desc'},
				 'time_range':{'name':'time_range','multiple': 'false', 'key_value': 'false','mandatory':'false','values':Constants.timeRangeValues, 'default':'today','custom':''},
				 'time_min_date':{'name':'time_min_date','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'time_max_date':{'name':'time_max_date','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'top': {'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'true','values':'', 'default':'150','custom':'24'},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: {'yucca-stream-multistream-stats':{'name':'yucca-stream-multistream-stats','desc':'Widget Panel','custom':''},
				 'yucca-stream-multistream-stats-header':{'name':'yucca-stream-multistream-stats-header','desc':'Widget Header','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-stream-multistream-stats-stream-name':{'name':'yucca-stream-multistream-stats-stream-name','desc':'Stream Name','custom':''},
				 'yucca-stream-multistream-stats-content':{'name':'yucca-stream-multistream-stats-content','desc':'Widget Content','custom':''},
				 'yucca-stream-multistream-stats-chart':{'name':'yucca-stream-multistream-stats-chart','desc':'Chart link','custom':''},
				 'yucca-stream-multistream-stats-data':{'name':'yucca-stream-multistream-stats-data','desc':'Table data link','custom':''},
				 'yucca-stream-multistream-stats-table':{'name':'yucca-stream-multistream-stats-table','desc':'Table data','custom':''},
				 'yucca-stream-multistream-stats-component':{'name':'yucca-stream-multistream-stats-component','desc':'Stream Compent','custom':''},
				 'yucca-stream-multistream-stats-component-key':{'name':'yucca-stream-multistream-stats-component-key','desc':'Stream Component measure key','custom':''},
				 'yucca-stream-multistream-stats-component-value':{'name':'yucca-stream-multistream-stats-component-value','desc':'Stream Component measure value','custom':''},
				 'yucca-stream-multistream-stats-component-measure-unit':{'name':'yucca-stream-multistream-stats-component-measure-unit','desc':'Stream Component measure unit','custom':''},
				 'yucca-stream-multistream-stats-data':{'name':'yucca-stream-multistream-stats-data','desc':'Data table','custom':''},
				 'yucca-stream-multistream-stats-total-count':{'name':'yucca-stream-multistream-stats-total-count','desc':'Total Data Count','custom':''},
				 'yucca-stream-multistream-stats-toolbar':{'name':'yucca-stream-multistream-stats-toolbar','desc':'Bottom Toolbar ','custom':''},
				 'active':{'name':'active','desc':'active','custom':''},
				 'yucca-credits-intro':{'name':'yucca-credits-intro','desc':'Footer credits label','custom':''}
				}	
	};

AdvancedWidgets['streamMultistreamStats'] = streamMultistreamStatsWidget;



var dataset_treemap_first_level_render = { "1":{"label":"Farmaceutica convenzionata", "color": "#008a00"},
		"2":{"label":"Farmaci Distribuzione Diretta", "color": "#60a917"},
		"3":{"label":"Farmaci Distribuzione per Conto", "color": "#a4c400"},
		"4":{"label":"Visite specialistiche", "color": "#0050ef"},
		"5":{"label":"Pronto Soccorso", "color": "#a20025"},
		"6":{"label":"Ricovero", "color": "#ffda00"}
	};

var dataset_treemap_second_level_render = { "1":{"label":"Farmaceutica convenzionata"},
"2":{"label":"Farmaci Distribuzione Diretta"},
"3":{"label":"Farmaci Distribuzione per Conto"},
"4":{"label":"Visite specialistiche"},
"5":{"label":"Esito"},
"6":{"label":"Fasce di et�"},
"7":{"label":"Tipo di erogatore"},
"8":{"label":"Regime di ricovero"}

};

//var datasetTreemapWidget = {
//		key: 'datasetTreemap',	
//		name: 'widget_treemap',
//		directive: 'ng-yucca-dataset-treemap',
//		directiveUrl: 'widget/datasetTreemap.html?time='+currentmillis,
//		features: ['dataexplorer', 'chart'],
//		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Mercati per provincia e giorno di mercato'},
//			 	 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
//				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
//				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'StudentiStra_2089'},
//				 'chart_title': {'name':'chart_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Mercati'},
//				 'first_level_column':{'name':'first_level_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Provincia'},
//				 'first_level_render':{'name':'first_level_render','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'second_level_column':{'name':'second_level_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'GradoScolastico'},
//				 'second_level_render':{'name':'second_level_render','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'third_level_column':{'name':'third_level_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'third_level_render':{'name':'third_level_render','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'value_column':{'name':'value_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'TotaleStudenti'},
//		},
//		advancedParams: {
//				 'landing_panel':{'name':'landing_panel','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['chart','data'], 'default':'chart','custom':'chart'},
//				 'euro_value':{'name':'euro_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'decimal_value':{'name':'decimal_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
//				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'counting_mode':{'name':'counting_mode','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['count','sum'], 'default':'count','custom':'sum'},
//				 'chart_width':{'name':'chart_width','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'500','custom':'500'},
//				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'400','custom':'400'},
//				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
//				},
//		styles: {'yucca-dataset-treemap':{'name':'yucca-dataset-treemap','desc':'yucca_dataset_treemap','custom':''},
//				 'yucca-dataset-treemap-header':{'name':'yucca-dataset-treemap-header','desc':'yucca_dataset_treemap_header','custom':''},
//				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
//				 'yucca-dataset-treemap-content':{'name':'yucca-dataset-treemap-content','desc':'yucca_dataset_treemap_content','custom':''},
//				 'yucca-dataset-treemap-chart':{'name':'yucca-dataset-treemap-chart','desc':'yucca_dataset_treemap_chart','custom':''},
//				 'yucca-dataset-treemap-chart-message':{'name':'yucca-dataset-treemap-chart-message','desc':'yucca_dataset_treemap_chart_message','custom':''},
//				 'yucca-dataset-treemap-data':{'name':'yucca-dataset-treemap-data','desc':'yucca_dataset_treemap_data','custom':''},
//				 'yucca-dataset-treemap-table':{'name':'yucca-dataset-treemap-table','desc':'yucca_dataset_treemap_table','custom':''},
//				 'yucca-dataset-treemap-toolbar':{'name':'yucca-dataset-treemap-toolbar','desc':'yucca_dataset_treemap_toolbar','custom':''},
//				 'active':{'name':'active','desc':'active','custom':''},
//				 'legend':{'name':'legend','desc':'legend','custom':''},
//				 'legend-label':{'name':'legend-label','desc':'legend_label','custom':''},
//				 'legend-bullet':{'name':'legend-bullet','desc':'legend_bullet','custom':''},
//				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
//		}
//
//};
//			
//AdvancedWidgets['datasetTreemap'] = datasetTreemapWidget;


var datasetMultidataTreemapWidget_index = 1;
var datasetMultidataTreemapWidget_firstGroupColumn = [['PosteggiOccupatialimentari','PosteggiOccupatinonAlimentari','PosteggiOccupatiproduttoriagricoli'],
                                                     ['FrazioneOrganicaTA','SfalciEPotatureTA','CartaECartoneTA', 'VetroTA','MultiMaterialeTA','PlasticaTA','LegnoTA','TessiliTA']];
var datasetMultidataTreemapWidget_secondGroupColumn = ['Prov', 'Province'];
var datasetMultidataTreemapWidget_firstGroupLabel = [['Alimentari','Non Alimentari', 'Produttori Agricoli'],
                        ['Organico','Potature','Carta', 'Vetro','Misto','Plastica','Legno','Tessili']];
var datasetMultidataTreemapWidget_tenant = ['regpie', 'regpie'];
var datasetMultidataTreemapWidget_dataset_code = ['Mercati_1216','Produzione_r_1192'];
var datasetMultidataTreemapWidget_thirdGroupColumn = ['DenominazioneComune','Comune'];
var datasetMultidataTreemapWidget_fourthGroupColumn = ['','Rd'];
var datasetMultidataTreemapWidget_grouping_way = ['', 'stacked'];

var datasetMultidataTreemapWidget = {
		key: 'datasetMultidataTreemap',	
		name: 'widget_multidata_treemap',
		directive: 'ng-yucca-dataset-multidata-treemap',
		directiveUrl: 'widget/datasetMultidataTreemap.html?time='+currentmillis,
		codeUrl: codeBaseUrl + 'yucca-datasets-multidata-treemap.js',
		storeUrl: function(){return storeBaseUrl + this.params["tenant_code"].custom + "/" + this.params["dataset_code"].custom },
		features: ['dataexplorer', 'chart'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Open Data sulla raccolta differenziata dei rifiuti in Piemonte'},
			 	 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':datasetMultidataTreemapWidget_tenant[datasetMultidataTreemapWidget_index]},
				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':datasetMultidataTreemapWidget_dataset_code[datasetMultidataTreemapWidget_index]},
				 'chart_title': {'name':'chart_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Rifiuti'},
				 'first_group_column':{'name':'first_group_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':datasetMultidataTreemapWidget_firstGroupColumn[datasetMultidataTreemapWidget_index]},
				 'second_group_column':{'name':'second_group_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':datasetMultidataTreemapWidget_secondGroupColumn[datasetMultidataTreemapWidget_index]},
				 'third_group_column':{'name':'third_group_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':datasetMultidataTreemapWidget_thirdGroupColumn[datasetMultidataTreemapWidget_index]},
				 'fourth_group_column':{'name':'fourth_group_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':datasetMultidataTreemapWidget_fourthGroupColumn[datasetMultidataTreemapWidget_index]},
				 'euro_value':{'name':'euro_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
				 'decimal_value':{'name':'decimal_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
		},
		advancedParams: {
				 'landing_panel':{'name':'landing_panel','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['chart','data'], 'default':'chart','custom':''},
				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'colors':{'name':'colors','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':Constants.chartColorsDefault},
				 'first_group_label':{'name':'first_group_label','false': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':datasetMultidataTreemapWidget_firstGroupLabel[datasetMultidataTreemapWidget_index]},
				 'counting_mode':{'name':'counting_mode','multiple': 'true', 'key_value': 'false','mandatory':'false','values':['count','sum'], 'default':'count','custom':'sum'},
				 'chart_width':{'name':'chart_width','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'500','custom':'500'},
				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'400','custom':'400'},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: {'yucca-dataset-multidata-treemap':{'name':'yucca-dataset-multidata-treemap','desc':'yucca_dataset_multidata_treemap','custom':''},
				 'yucca-dataset-multidata-treemap-header':{'name':'yucca-dataset-multidata-treemap-header','desc':'yucca_dataset_multidata_treemap_header','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-dataset-multidata-treemap-content':{'name':'yucca-dataset-multidata-treemap-content','desc':'yucca_dataset_multidata_treemap_content','custom':''},
				 'yucca-dataset-multidata-treemap-chart':{'name':'yucca-dataset-multidata-treemap-chart','desc':'yucca_dataset_multidata_treemap_chart','custom':''},
				 'yucca-dataset-multidata-treemap-chart-message':{'name':'yucca-dataset-multidata-treemap-chart-message','desc':'yucca_dataset_multidata_treemap_chart_message','custom':''},
				 'yucca-dataset-multidata-treemap-data':{'name':'yucca-dataset-multidata-treemap-data','desc':'yucca_dataset_multidata_treemap_data','custom':''},
				 'yucca-dataset-multidata-treemap-table':{'name':'yucca-dataset-multidata-treemap-table','desc':'yucca_dataset_multidata_treemap_table','custom':''},
				 'yucca-dataset-multidata-treemap-toolbar':{'name':'yucca-dataset-multidata-treemap-toolbar','desc':'yucca_dataset_multidata_treemap_toolbar','custom':''},
				 'active':{'name':'active','desc':'active','custom':''},
				 'legend':{'name':'legend','desc':'legend','custom':''},
				 'legend-label':{'name':'legend-label','desc':'legend_label','custom':''},
				 'legend-bullet':{'name':'legend-bullet','desc':'legend_bullet','custom':''},
				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
		}

};
			

AdvancedWidgets['datasetMultidataTreemap'] = datasetMultidataTreemapWidget;























// TORINO 56a5f1a884ae69d01376db9d
// ALESSANDRIA 56a5f1a884ae69d01376d7f6
// ASTI  56a5f1a884ae69d01376d8ba
// BIELLA 56a5f1a884ae69d01376d92c
// CUNEO 56a5f1a884ae69d01376da19
// NOVARA 56a5f1a884ae69d01376da8b
// VERBANO CUSIO OSSOLA
// VERCELLI 56a5f1a984ae69d01376dca9


//var idsForBulletChart = ['56a5f1a884ae69d01376db9d','56a5f1a884ae69d01376d7f6','56a5f1a884ae69d01376d8ba','56a5f1a884ae69d01376d92c','56a5f1a884ae69d01376da19','56a5f1a884ae69d01376da8b','56a5f1a984ae69d01376dca9'];
//var idsForBulletChart = ['59c0dd6090eee6e6ad48b3e8','59c0dd6090eee6e6ad48b3e7','59c0dd6090eee6e6ad48b3e6','59c0dd6090eee6e6ad48b3e5','59c0dd6090eee6e6ad48b3e4','59c0dd6090eee6e6ad48b3e3','59c0dd6090eee6e6ad48b3e2','59c0dd6090eee6e6ad48b3e1'];
var idsForBulletChart = ['5a0efffd90eea2ad84a6de0e', '5a0efffd90eea2ad84a6df1a', '5a0efffd90eea2ad84a6da66', '5a0efffd90eea2ad84a6db9c', '5a0efffd90eea2ad84a6dcfb', '5a0efffd90eea2ad84a6dec2',  '5a0efffd90eea2ad84a6dc89', '5a0efffd90eea2ad84a6db2a'];
var datasetBulletChartWidget = {
		key: 'datasetBulletChart',	
		name: 'widget_bulletchart',
		directive: 'ng-yucca-dataset-bullet-chart',
		directiveUrl: 'widget/datasetBulletChart.html?time='+currentmillis,
		features: ['chart'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Raccolta differenziata kg/abitante'},
			     'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Produzione_r_1192'},
				 'internal_ids':{'name':'internal_ids','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':idsForBulletChart},
				 'filter_ids':{'name':'filter_ids','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'\'2166\' eq Istat'},
				 'current_value_column':{'name':'current_value_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'RdKg_ab'},
				 'range_values':{'name':'range_values','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':['1', '22', '444']},
				 'range_column_values':{'name':'range_column_values','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'bar_title_column':{'name':'bar_title_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'Comune'},
				 'bar_subtitle_colum':{'name':'bar_subtitle_colum','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
		},
		advancedParams: {
				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'previous_value_column':{'name':'previous_value_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'bar_colors':{'name':'bar_colors','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'bar_title_label':{'name':'bar_title_label','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'bar_subtitle_label':{'name':'bar_subtitle_label','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'Rd kg/ab'},
				 'average_values':{'name':'average_values','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['true', 'false'], 'default':'false','custom':''},
				 'range_labels':{'name':'range_labels','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'euro_value':{'name':'euro_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
				 'decimal_value':{'name':'decimal_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
				 'measure_labels':{'name':'measure_labels','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'custom_markers':{'name':'custom_markers','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'custom_marker_columns':{'name':'custom_marker_columns','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'marker_labels':{'name':'marker_labels','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: {
			'yucca-dataset-bullet-chart':{'name':'yucca-dataset-bullet-chart','desc':'yucca_dataset_bullet_chart','custom':''},
			'yucca-dataset-bullet-chart-header':{'name':'yucca-dataset-bullet-chart-header','desc':'yucca_dataset_bullet_chart_header','custom':''},
			'yucca-dataset-bullet-chart-content':{'name':'yucca-dataset-bullet-chart-content','desc':'yucca_dataset_bullet_chart_content','custom':''},
			'yucca-dataset-bullet-chart-chart':{'name':'yucca-dataset-bullet-chart-chart','desc':'yucca_dataset_bullet_chart_chart','custom':''},
			'yucca-dataset-bullet-chart-tooltip':{'name':'yucca-dataset-bullet-chart-tooltip','desc':'yucca_dataset_bullet_chart_tooltip','custom':''},
		    'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
		}
};


			
AdvancedWidgets['datasetBulletChart'] = datasetBulletChartWidget;




//var datasetSankeyChartWidget = {
//		key: 'datasetSankeyChart',	
//		name: 'widget_sankeychart',
//		directive: 'ng-yucca-dataset-sankey-chart',
//		directiveUrl: 'widget/datasetSankeyChart.html?time='+currentmillis,
//		features: ['chart'],
//		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Scuole Piemontesi'},
//			     'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
//				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
//				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'ScuolePiemon_1282'},
//				 'node_columns':{'name':'node_columns','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':['Provincia','AmbitoFunzionale','GradoScolastico','TipoDiGestione']},
//
//		},
//		advancedParams: {
//				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
//				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'sankey_node_render':{'name':'sankey_node_render','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'base_color':{'name':'base_color','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'counting_mode':{'name':'counting_mode','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'value_column':{'name':'value_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'euro_value':{'name':'euro_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'decimal_value':{'name':'decimal_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'chart_width':{'name':'chart_width','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'500','custom':'550'},
//				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'400','custom':'400'},
//				 'sankey_nodes':{'name':'sankey_nodes','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'sankey_links':{'name':'sankey_links','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
//				},
//		styles: {
//			'yucca-dataset-sankey':{'name':'yucca-dataset-sankey','desc':'yucca_dataset_sankey','custom':''},
//			'yucca-dataset-sankey-header':{'name':'yucca-dataset-sankey-header','desc':'yucca_dataset_sankey_header','custom':''},
//			'yucca-dataset-sankey-loading':{'name':'yucca-dataset-sankey-loading','desc':'yucca_dataset_sankey_loading','custom':''},
//			'yucca-dataset-sankey-content':{'name':'yucca-dataset-sankey-content','desc':'yucca_dataset_sankey_content','custom':''},
//			'yucca-dataset-sankey-chart':{'name':'yucca-dataset-sankey-chart','desc':'yucca_dataset_sankey_chart','custom':''},
//			'yucca-dataset-sankey-chart-tooltip':{'name':'yucca-dataset-sankey-chart-tooltip','desc':'yucca_dataset_sankey_chart_tooltip','custom':''},
//		    'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
//		}
//};
//
//
//AdvancedWidgets['datasetSankeyChart'] = datasetSankeyChartWidget;


var datasetPopulationPyramidWidget = {
		key: 'datasetPopulationPyramid',	
		name: 'widget_population_pyramid',
		directive: 'ng-yucca-dataset-population-pyramid',
		directiveUrl: 'widget/datasetPopulationPyramid.html?time='+currentmillis,


		features: ['dataexplorer', 'chart'],
		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':' Operatori sanitari suddivisi per azienda sanitaria'},
			     'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'ElencoMedciE_1078'},
				 'gender_column':{'name':'gender_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Sesso'},
				 'gender_values':{'name':'gender_values','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'F, M','custom':["F", "M"]},
				 'age_column':{'name':'age_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'Denominaz_azienda'},
				 'age_values':{'name':'age_values','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
				 'value_column':{'name':'value_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
		},
		advancedParams: {
    			 'landing_panel':{'name':'landing_panel','multiple': 'true', 'key_value': 'false','mandatory':'false','values':'', 'default':'chart','custom':''},
				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'gender_colors':{'name':'gender_colors','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'pink, light blue','custom':''},
				 'gender_labels':{'name':'gender_labels','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'age_labels':{'name':'age_labels','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
				 'counting_mode':{'name':'counting_mode','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'count','custom':''},
				 'chart_type':{'name':'chart_type','multiple': 'true', 'key_value': 'false','mandatory':'false','values':'', 'default':'multiBarChart','custom':''},
				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'300','custom':'300'},
				 'grouping_way': {'name':'grouping_way','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['grouped','stacked'], 'default':'grouped','custom':''},
				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
				},
		styles: {'yucca-dataset-population-pyramid':{'name':'yucca-dataset-population-pyramid','desc':'yucca_dataset_population_pyramid','custom':''},
				 'yucca-dataset-population-pyramid-header':{'name':'yucca-dataset-population-pyramid-header','desc':'yucca_dataset_population_pyramid_header','custom':''},
				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
				 'yucca-dataset-population-pyramid-content':{'name':'yucca-dataset-population-pyramid-content','desc':'yucca_dataset_population_pyramid_content','custom':''},
				 'yucca-dataset-population-pyramid-chart':{'name':'yucca-dataset-population-pyramid-chart','desc':'yucca_dataset_population_pyramid_chart','custom':''},
				 'yucca-dataset-population-pyramid-data':{'name':'yucca-dataset-population-pyramid-data','desc':'yucca_dataset_population_pyramid_data','custom':''},
				 'yucca-dataset-population-pyramid-table':{'name':'yucca-dataset-population-pyramid-table','desc':'yucca_dataset_population_pyramid_table','custom':''},
				 'yucca-dataset-population-pyramid-tooltip':{'name':'yucca-dataset-population-pyramid-tooltip','desc':'yucca_dataset_population_pyramid_tooltip','custom':''},
				 'yucca-dataset-population-pyramid-tooltip_header':{'name':'yucca-dataset-population-pyramid-tooltip_header','desc':'yucca_dataset_population_pyramid_tooltip_header','custom':''},
				 'yucca-dataset-population-pyramid-tooltip_label':{'name':'yucca-dataset-population-pyramid-tooltip_label','desc':'yucca_dataset_population_pyramid_tooltip_label','custom':''},
				 'yucca-dataset-population-pyramid-tooltip_value':{'name':'yucca-dataset-population-pyramid-tooltip_value','desc':'yucca_dataset_population_pyramid_tooltip_value','custom':''},
				 'yucca-dataset-population-pyramid-loading':{'name':'yucca-dataset-population-pyramid-loading','desc':'yucca_dataset_population_pyramid_loading','custom':''},
				 'yucca-dataset-population-pyramid-toolbar':{'name':'yucca-dataset-population-pyramid-toolbar','desc':'yucca_dataset_population_pyramid_toolbar','custom':''},
				 'active':{'name':'active','desc':'active','custom':''},
				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
		}
};
			
//AdvancedWidgets = {};

//AdvancedWidgets['datasetPopulationPyramid'] = datasetPopulationPyramidWidget;

//var datasetChoroplethMapWidget = {
//		key: 'datasetChoroplethMap',	
//		name: 'widget_choropleth_map',
//		directive: 'ng-yucca-dataset-choropleth-map',
//		directiveUrl: 'widget/datasetChoroplethMap.html?time='+currentmillis,
//		
//
//		features: ['map','dataexplorer'],
//		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Totale Posteggi nei Mercati'},
//			     'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
//				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
//				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Mercati_1216'},
//				 'geojson_url':{'name':'geojson_url','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'/data/piemonte_province_geojson.json','custom':''},
//				 'geojson_areas_key':{'name':'geojson_areas_key','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'provincia','custom':'name_alias'},
//				 'dataset_areas_key_column':{'name':'dataset_areas_key_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Prov'},
//				 'dataset_areas_value_column':{'name':'dataset_areas_value_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'TotalePosteggi'},
//				 'area_base_color':{'name':'area_base_color','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'#00bbf0','custom':'#00607a'},
//				 'counting_mode':{'name':'counting_mode','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['count','sum'], 'default':'count','custom':''},
//		},
//		advancedParams: {
//				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
//				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'skip_zero_values':{'name':'skip_zero_values','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':''},
//				
//				 'euro_value':{'name':'euro_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'decimal_value':{'name':'decimal_value','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'zoom_control':{'name':'zoom_control','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['true', 'false'], 'default':'true','custom':''},
//				 'scroll_wheel_zoom':{'name':'scroll_wheel_zoom','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['true', 'false'], 'default':'true','custom':''},
//				 
//				 'show_legend':{'name':'show_legend','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'true','custom':''},
//				 'legend_position':{'name':'legend_position','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['bottomleft','bottomright','topleft','topright'], 'default':'bottomleft','custom':''},
//				 'map_tiles_url':{'name':'map_tiles_url','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'CartoDB Positron','custom':''},
//				 'map_line_weight':{'name':'map_line_weight','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'1','custom':''},
//				 'map_line_opacity':{'name':'map_line_opacity','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'1','custom':''},
//				 'map_line_dash_color':{'name':'map_line_dash_color','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'#0e232e','custom':''},
//				 'map_line_dash_array':{'name':'map_line_dash_array','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'1','custom':''},
//				 'map_areas_fill_opacity':{'name':'map_areas_fill_opacity','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'1','custom':''},
//				 'dataset_areas_key_label':{'name':'dataset_areas_key_label','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'dataset_areas_value_label':{'name':'dataset_area_values_label','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
//				},
//		styles: {'yucca-dataset-choropleth-map':{'name':'yucca-dataset-choropleth-map','desc':'yucca_dataset_choropleth_map','custom':''},
//				 'yucca-dataset-choropleth-map-header':{'name':'yucca-dataset-choropleth-map-header','desc':'yucca_dataset_choropleth_map_header','custom':''},
//				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
//				 'yucca-dataset-choropleth-map-content':{'name':'yucca-dataset-choropleth-map-content','desc':'yucca_dataset_choropleth_map_content','custom':''},
//				 'yucca-dataset-choropleth-map-map':{'name':'yucca-dataset-choropleth-map-map','desc':'yucca_dataset_choropleth_map_map','custom':''},
//				 'yucca-dataset-choropleth-map-data':{'name':'yucca-dataset-choropleth-map-data','desc':'yucca_dataset_choropleth_map_data','custom':''},
//				 'yucca-dataset-choropleth-map-table':{'name':'yucca-dataset-choropleth-map-table','desc':'yucca_dataset_choropleth_map_table','custom':''},
//				 'yucca-dataset-choropleth-map-toolbar':{'name':'yucca-dataset-choropleth-map-toolbar','desc':'yucca_dataset_choropleth_map_toolbar','custom':''},
//				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
//		}	
//};
//			
////AdvancedWidgets = {};
//
//AdvancedWidgets['datasetChoroplethMap'] = datasetChoroplethMapWidget;

//var forcedirectedFilter = "	'POLICLINICO DI MONZA PRESIDIO SALUS' eq Denom_struttura or 'CASA DI CURA I CEDRI' eq Denom_struttura or 'CASA DI CURA VILLA CRISTINA' eq Denom_struttura ";
////var forcedirectedFilter = "'CASA DI CURA VILLA IGEA' eq Denom_struttura or 'POLICLINICO DI MONZA PRESIDIO SALUS' eq Denom_struttura or 'CASA DI CURA I CEDRI' eq Denom_struttura or 'CASA DI CURA VILLA CRISTINA' eq Denom_struttura ";
//var datasetForcedirectedChartWidget = {
//		key: 'datasetForcedirectedChart',	
//		name: 'widget_forcedirected_chart',
//		directive: 'ng-yucca-dataset-forcedirected-chart',
//		directiveUrl: 'widget/datasetForcedirectedChart.html?time='+currentmillis,
//		
//		features: ['chart'],
//		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Scuole Piemontesi'},
//			     'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
//				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
//				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'StruttureRic_1191'},
//				 'node_columns':{'name':'node_columns','multiple': 'true', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':['Denom_struttura','Descr_discipl', 'Denom_asr']},
//				 'node_labels':{'name':'node_labels','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'provincia','custom':['Struttura ospedaliera','Disciplina', 'Asr']},
//				 'node_type_column':{'name':'node_type_column','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Denom_asr'},
//				 'node_icon':{'name':'node_icon','multiple': 'false', 'key_value': 'false','mandatory':'true','values':['circle', 'hexagon'], 'default':'circle','custom':'circle'},
//				 'link_line':{'name':'link_line','multiple': 'false', 'key_value': 'false','mandatory':'false','values':['bezier','arc', 'straight'], 'default':'bezier','custom':''},
//				 'chart_width':{'name':'chart_width','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'550'},
//				 'chart_height':{'name':'chart_height','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':'500'},
//		},
//		advancedParams: {
//				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':forcedirectedFilter},
//				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
//				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'compute_statistic':{'name':'compute_statistic','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':''},
//				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
//				},
//		styles: {'yucca-dataset-forcedirected-chart':{'name':'yucca-dataset-forcedirected-chart','desc':'yucca_dataset_forcedirected_chart','custom':''},
//				 'yucca-dataset-forcedirected-chart-header':{'name':'yucca-dataset-forcedirected-chart-header','desc':'yucca_dataset_forcedirected_chart_header','custom':''},
//				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
//				 'yucca-dataset-forcedirected-chart-content':{'name':'yucca-dataset-forcedirected-chart-content','desc':'yucca_dataset_forcedirected_chart_content','custom':''},
//				 'yucca-dataset-forcedirected-chart-chart':{'name':'yucca-dataset-forcedirected-chart-chart','desc':'yucca_dataset_forcedirected_chart_chart','custom':''},
//				 'yucca-dataset-forcedirected-loading':{'name':'yucca-dataset-forcedirected-loading','desc':'yucca_dataset_forcedirected_loading','custom':''},
//				 'forcedirected-chart':{'name':'forcedirected-chart','desc':'forcedirected_chart','custom':''},
//				 'forcedirected-legend':{'name':'forcedirected-legend','desc':'forcedirected_legend','custom':''},
//				 'forcedirected-legend-block':{'name':'forcedirected-legend-block','desc':'forcedirected_legend_block','custom':''},
//				 'forcedirected-legend-block-title':{'name':'forcedirected-block-title','desc':'forcedirected_block_title','custom':''},
//				 'forcedirected-legend-item':{'name':'forcedirected-legend-item','desc':'forcedirected_legend_item','custom':''},
//				 'forcedirected-legend-bullet':{'name':'forcedirected-legend-bullet','desc':'forcedirected_legend_bullet','custom':''},
//				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
//		}	
//};
//			
////AdvancedWidgets = {};
//
//AdvancedWidgets['datasetForcedirectedChart'] = datasetForcedirectedChartWidget;
//
//var datasetDataexplorerWidget = {
//		key: 'datasetDataexplorer',	
//		name: 'widget_dataexplorer',
//		directive: 'ng-yucca-dataset-dataexplorer',
//		directiveUrl: 'widget/datasetDataexplorer.html?time='+currentmillis,
//		features: ['dataexplorer', 'chart'],
//		params: {'widget_title': {'name':'widget_title','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':'Mercati per provincia e giorno di mercato'},
//			 	 'widget_intro': {'name':'widget_intro','multiple': 'false', 'key_value': 'false','mandatory':'false','values':'', 'default':'','custom':''},
//				 'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'regpie'},
//				 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':'Mercati_1216'},
//				 'filtered_columns':{'name':'filtered_columns','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//		},
//		advancedParams: {
//				 'filter':{'name':'filter','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'skip':{'name':'skip','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'0','custom':''},
//				 'top':{'name':'top','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'user_token': {'name':'user_token','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
//				},
//		styles: {'yucca-dataset-dataxplorer':{'name':'yucca-dataset-dataxplorer','desc':'yucca_dataset_dataxplorer','custom':''},
//				 'yucca-dataset-dataxplorer-header':{'name':'yucca-dataset-dataxplorer-header','desc':'yucca_dataset_dataxplorer_header','custom':''},
//				 'yucca-widget-intro':{'name': 'yucca-widget-intro','desc':'yucca_widget_intro','custom':''},
//				 'yucca-dataset-dataxplorer-content':{'name':'yucca-dataset-dataxplorer-content','desc':'yucca_dataset_dataxplorer_content','custom':''},
//				 'yucca-dataset-dataxplorer-data':{'name':'yucca-dataset-dataxplorer-data','desc':'yucca_dataset_dataxplorer_data','custom':''},
//				 'yucca-dataset-dataxplorer-table':{'name':'yucca-dataset-dataxplorer-table','desc':'yucca_dataset_dataxplorer_table','custom':''},
//				 'yucca_credits_intro':{'name':'yucca_credits_intro','desc':'yucca_credits_intro','custom':''},
//		}
//
//};
//			
//AdvancedWidgets['datasetDataexplorer'] = datasetDataexplorerWidget;
//
//
//var datasetControlFilterWidget = {
//		key: 'datasetControlFilter',	
//		name: 'widget_controlfilter',
//		directive: 'ng-yucca-dataset-control-filter',
//		directiveUrl: 'widget/datasetControlFilter.html?time='+currentmillis,
//		features: ['dataexplorer', 'chart'],
//		params: {'tenant_code':{'name':'tenant_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//			 	 'dataset_code':{'name':'dataset_code','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//			 	 'dataset_column':{'name':'dataset_column','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'action_type':{'name':'action_type','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'control_type':{'name':'control_type','multiple': 'false', 'key_value': 'false','mandatory':'true','values':[], 'default':'','custom':''},
//				 'text_placeholder':{'name':'text_placeholder','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'text_apply_button':{'name':'text_apply_button','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'multiple_values':{'name':'multiple_values','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//				 'multiple_labels':{'name':'multiple_labels','multiple': 'true', 'key_value': 'false','mandatory':'false','values':[], 'default':'','custom':''},
//		},
//		advancedParams: {
//			     'debug': {'name':'debug','multiple': 'false', 'key_value': 'false','mandatory':'false','values':[], 'default':'false','custom':'true'}
//				},
//		styles: {'yucca-widget yucca-dataset-control-filter':{'name':'yucca-dataset-control-filter','desc':'yucca_dataset_control_filter','custom':''},
//			 'yucca-widget yucca-dataset-control-filter-text':{'name':'yucca-dataset-control-filter-text','desc':'yucca_dataset_control_filter_text','custom':''},
//			 'yucca-widget yucca-dataset-control-filter-radio':{'name':'yucca-dataset-control-filter-radio','desc':'yucca_dataset_control_filter_radio','custom':''},
//		}
//
//};
//
//AdvancedWidgets['datasetControlFilter'] = datasetControlFilterWidget;


var widgetsIndex = 0;
for (var property in AdvancedWidgets) {
    if (AdvancedWidgets.hasOwnProperty(property)) {
    	AdvancedWidgets[property].index = widgetsIndex;
    	widgetsIndex++;
    }
}


