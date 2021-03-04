var translations_en = {

	LANG_KEY: 'en', 

	/* common */
	Welcome : 'Welcome ',
	Preview: 'Preview',
	getting_started: 'Getting started',
	menu_api: 'Rest API',
	composer: 'Composer',
	yucca_credits_intro : 'Footer',
	active: 'classe associata alla voce di men&ugrave; attivo',

	widget_social:'Social',
	widget_gallery:'Gallery',
	widget_multidata:'Multidata',
	widget_lastvalue:'Last value',
	widget_detection:'Detection',
	widget_monitor:'Monitor',
	widget_map:'Map',
	widget_treemap:'Treemap',
	widget_multidata_treemap:'Treemap Multidata',
	widget_bulletchart:'Bullet chart',
	widget_sankeychart:'Sankey Diagram',
	widget_population_pyramid:'Population Pyramid',
	widget_choropleth_map:'Choropleth Map',

	/* widget cards */
	widget_info_tab_use : 'Use',
	widget_info_tab_params : 'Parametes',
	widget_info_tab_advanced_params : 'Advanced',
	widget_info_tab_customize : 'Configure',
	widget_info_tab_style : 'Customize',
	widget_info_change_param_warning : 'You have change some params, refresh the preview',

	widget_intro : '<p>Yucca provides customizable widgets ready to be used in AngularJS portal</p>'
			+ '<p>In the <strong>parameters</strong>  and <strong>advanced</strong> panels you can enter the parameters to be used for the widget configuration, some parameters are required, '
			+ 'such as, for example, the dataset or the stream code, others are optional. After entering the parameters, under the widget preview you can find the code to <strong>embed</strong> in the html page '
			+ '<p>All widgets are highly customizable, from the choices of data to be displayed to the style appearance.  Via the <strong>Customize</strong> panel, you can try to change the widget style, and see the result in real time. '
			+ 'Once complete the customization you can copy the code to insert into your own style sheet</p>'
			+ '<p>Each widget has the <code><strong>user_token</strong></code> parameter that allows access to private data, and a parameter '
			+ '<code><strong>debug</strong></code>, to be used during installation, which allows you to see any configuration errors directly in the widget itself'
			+ '<p>If you have multiple widgets on the same page, it is important that they are separated into different panels</p>',
			
	/* Change syle dialog */
	change_style_dialog_title: 'Customize',
	change_style_dialog_text: 'Text',
	change_style_dialog_text_align: 'Align',
	change_style_dialog_text_size: 'Size',
	change_style_dialog_text_style: 'Style',
	change_style_dialog_colors: 'Colors',

	yucca_widget_intro: 'Introduction',

	/* *********** */
	/* TWEET STATS */
	/* *********** */
	streamTweetStats_intro : '<p>Widget designed for the display of statistics related to  <strong>stream social twitter</strong></p>'
			+ '<p>There is a <strong>chart with the number of tweets over time</strong>, '
			+ 'you can specify a time range (last month, last day ...), or a specific date range. If you do not specify any indication, the widget processes the tweet of the day</p>'
			+ '<p>There are other two panel  containing the <strong>latest tweets</strong>, and the most <strong>retweeted tweet</strong></p>',

	/* params */
	streamTweetStats_widget_title : 'Widget title',
	streamTweetStats_widget_intro: 'Introduction',
	streamTweetStats_tenant_code : 'Stream tenant code',
	streamTweetStats_stream_code : 'Stream code',
	streamTweetStats_smartobject_code : 'Smartobject code',
	streamTweetStats_landing_panel: 'First panel visualized when the widget is loaded',
	streamTweetStats_time_range : 'Time range on which calculate the statistic, in alternatively of the parameters of minimum and maximum date',
	streamTweetStats_time_min_date : 'Initial date used to calculate the statistic in ISO format:  YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS',
	streamTweetStats_time_max_date : 'Final date used to calculate the statistic in ISO format:  YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS',
	streamTweetStats_chart_type: 'Chart type: line or histogram',
	streamTweetStats_chart_height: 'Chart height',
	streamTweetStats_chart_colors: 'Array of colors used in the chart',
	streamTweetStats_user_token : 'Usertoken, to be used in case of private stream',

	/* styles */
	yucca_stream_tweet_stats : 'Main panel',
	yucca_stream_tweet_stats_header : 'Header',
	yucca_stream_tweet_stats_content : 'Body',
	yucca_stream_tweet_stats_chart : 'Chart panel',
	yucca_stream_tweet_stats_xaxis_label: 'X Axis',
	yucca_stream_tweet_stats_data : 'Statistic panel',
	yucca_stream_tweet_stats_table : 'Statistic table',
	yucca_stream_tweet_stats_value : 'Statistic value',
	yucca_stream_tweet_stats_label : 'Statistic label',
	yucca_credits_intro : 'Footer',
	yucca_stream_tweet_stats_tooltip : 'Tooltip: main panel',
	yucca_stream_tweet_stats_tooltip_header : 'Tooltip: header',
	tweet_profile_image : 'Tooltip: twitter profile image',
	tweet_message : 'Tooltip: tweet panel',
	tweet_author : 'Tooltip: author',
	tweet_text : 'Tooltip: tweet',
	tweet_user : 'Tooltip: user cite in the tweet',
	tweet_hashtag : 'Tooltip: hastag in the tweet',
	tweet_retweet : 'Tooltip: num retweet',
	tweet_favorite : 'Tooltip: num favorite',
	tweet_info : 'Tooltip: footer with info',
	tweet_statistic_icons : 'Tooltip: panel with info and icon',
	tweet_date : 'Tooltip: tweet date',

	/* ************* */
	/* IMAGE GALLERY */
	/* ************* */
	datasetImageGallery_intro : '<p>Widget designed for the dataset that contain <strong>images</strong></p>'
			+ '<p>Configuring the column(s) containing the pictures, you will see a <strong>slideshow</strong></p>'
			+ '<p>If the images are <strong>geolocated</strong>, indicating the columns with latitude and longitude, it will be created a second panel contains a map showing the places of images</p>',
	
	/* params */
	datasetImageGallery_widget_title : 'Widget title',
	datasetImageGallery_widget_intro: 'Introduction',
	datasetImageGallery_tenant_code : 'Tenant code of the dataset',
	datasetImageGallery_dataset_code : 'Dataset code',
	datasetImageGallery_image_columns : 'Dataset columns that contains the images that are to be displayed',
	datasetImageGallery_image_title_column : 'Dataset Column with the image title',
	streamTweetStats_landing_panel: 'First panel visualized when the widget is loaded',
	datasetImageGallery_position_columns : 'Dataset columns that contains the coordinates of the images. If present a map will be displayed with images',
	datasetImageGallery_filter : 'Filter to choose the image to be displayed. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetImageGallery_skip : 'First image to be extracted',
	datasetImageGallery_top : 'Number of images to extract (max 50)',
	datasetImageGallery_interval : 'Time range for the slideshow (ms)',
	datasetImageGallery_show_title : 'Flag to show/hide the image title in the slideshow ',
	datasetImageGallery_marker_as_image : 'Show a thumb of the image in the map',
	datasetImageGallery_marker_url : 'Marker used in the map',
	datasetImageGallery_user_token : 'Usertoken, to be used in case of private stream',
	datasetImageGallery_debug : 'Show debug information',

	/* styles */
	yucca_dataset_image_gallery : 'Main panel',
	yucca_dataset_image_gallery_header : 'Header',
	yucca_dataset_image_gallery_content : 'Body',
	yucca_dataset_image_gallery_map : 'Mappa',
	yucca_dataset_image_gallery_slideshow : 'Slideshow',
	yucca_dataset_image_gallery_slide_title : 'Image title in the slideshow',
	yucca_dataset_image_gallery_bullets_panel : 'Panel with bullet for the slideshow',
	yucca_dataset_image_gallery_bullet : 'Single bullet in the slideshow',
	yucca_dataset_image_gallery_data : 'Statistic panel',
	yucca_dataset_image_gallery_total_count : 'Total count of data',
	yucca_dataset_image_gallery_toolbar : 'Toolbar to choose which panel display',

	/* *************** */
	/* MULTIDATA STATS */
	/* *************** */
	datasetMultidataStats_intro : '<p>Widget designed to display <strong>data and statistics</strong> related to dataset with the possiblity of grouping columns</p>'
			+ '<p>You can configure up to three groups of data to be grouped</p>'
			+ '<p>You will see a panel that contains a chart with many histograms as there are sets of given data and a second panel with a navigable table containing the data</p>',
			
	/* params */
	datasetMultidataStats_widget_title : 'Widget title',
	datasetMultidataStats_widget_intro: 'Introduction',
	datasetMultidataStats_tenant_code : 'Tenant code of the dataset',
	datasetMultidataStats_dataset_code : 'Dataset code',
	datasetMultidataStats_first_group_column : 'Dataset column for the main grouping',
	datasetMultidataStats_first_group_colors : 'Color used in the chart to identify the first series',
	datasetMultidataStats_histogram_column : 'Column used to create different histograms based on grouping the values of the column (one histogram for each different value). Use as an alternative to the parameter \'second_group_column\'. WARNING: Using this parameter the statistic will be computed counting the element, if you want to sum the values, specify the column that contain the value to sum (parameter \'histogram_group_value_column\')',
	datasetMultidataStats_histogram_group_value_column : 'Column with the laues to sum if was specified the automatic creation of the histograms (parameter \'histogram_group_column\') and choose the counting mode \'sum\' (parameter \'counting_mode\')',
	datasetMultidataStats_second_group_column : 'Column list for the second grouping. If omitted it will be considered only the first serie',
	datasetMultidataStats_second_group_label : 'Label list used for the second series. If omitted it will be used the column name',
	datasetMultidataStats_third_group_column : 'Dataset column for the third grouping. This grouping is used only in the data table',
	datasetMultidataStats_counting_mode : 'Way of computing statistic: if the data are numerical is possible sum it, using \'sum\', otherway it will be count the values',
	datasetMultidataStats_landing_panel: 'First panel visualized when the widget is loaded',
	datasetMultidataStats_chart_height : 'Chart height',
	datasetMultidataStats_chart_type : 'Chart type: horizontal histogram or vertical',
	datasetMultidataStats_filter : 'Filter on data to analyze. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetMultidataStats_skip : 'First row for pagination',
	datasetMultidataStats_top : 'Number of row for pagination',
	datasetMultidataStats_user_token : 'Usertoken, to be used in case of private stream',
	datasetMultidataStats_debug : 'Show debug information',

	/* styles */
	yucca_dataset_multidata_stats : 'Main panel',
	yucca_dataset_multidata_stats_header : 'Header',
	yucca_dataset_multidata_stats_content : 'Body',
	yucca_dataset_multidata_stats_chart : 'Chart panel',
	yucca_dataset_multidata_stats_data : 'Data panel',
	yucca_dataset_multidata_stats_table : 'Data table',
	yucca_dataset_multidata_stats_toolbar: 'Toolbar with the visualization menu panel',
	yucca_dataset_multidata_stats_tooltip : 'Tooltip: main panel',
	yucca_dataset_multidata_stats_tooltip_header : 'Tooltip: header',
	yucca_dataset_multidata_stats_tooltip_label : 'Tooltip: label in the table',
	yucca_dataset_multidata_stats_tooltip_value : 'Tooltip: value in the table',

	/* *************** */
	/* MULTISTREAM VALUE */
	/* *************** */
	streamMultistreamValue_intro : '<p>Widget designed to display the <strong>last value</strong> relative to any components of one or more stream</p>'
			+ '<p>You can specify individual components of the various streams shown, for each component you will see a <strong>traffic light</strong> that indicates the danger level of values</strong></p>'
			+ '<p>The widget connects via <strong>Web Socket</strong>, then the page will automatically updated when a new value arrive, without having to reload the page</p>',
	
	/* params */
	streamMultistreamValue_widget_title : 'Widget title',
	streamMultistreamValue_widget_intro: 'Introduction',
	streamMultistreamValue_streams : '<p class="text-left" style="font-size: 11px">Javascript array  with the stream. <br>Each element of the array is a javascript object with these properties:</p>'
			+ '<ul class="text-left"><li><strong>tenantCode</strong>: tenant code of the stream</li>'
			+ '<li><strong>streamCode</strong>: stream code</li>'
			+ '<li><strong>smartobjectCode</strong>: smartobject code of the stream</li>'
			+ '<li><strong>components</strong>: Array with the components to show</li></ul>'
			+ '<p class="text-left">Each component is a javascript object with these properties:</p>'
			+ '<ul  class="text-left"><li><strong>name</strong>: of the compoente</li>'
			+ '<li><strong>minWarning</strong>:  minimum threshold below which the light turns yellow (warning level)</li>'
			+ '<li><strong>minCritical</strong>: minimum threshold below which the light turns red (critical level)</li>'
			+ '<li><strong>maxWarning</strong>: maximum threshold beyond which the light turns yellow (warning level)</li>'
			+ '<li><strong>maxCritical</strong>: maximum threshold beyond which the light turns red (critical level)</li></ul>'
			+ '<p class="text-left">Stream object example</p>'
			+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">[<br>&nbsp;{"tenantCode":"csp",<br>&nbsp;&nbsp;"streamCode":"H",<br>&nbsp;&nbsp;"smartobjectCode":"a3de712d-6801-5cc4-84b...",<br>&nbsp;&nbsp;"components":'
			+ '[<br>&nbsp;&nbsp;&nbsp;&nbsp;{"name":"value",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"minWarning":"10",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"minCritical":"0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"maxWarning":"30",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"maxCritical":"50"<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;]<br>&nbsp;},<br>...<br>]'
			+ '</code></pre>',
	streamMultistreamValue_user_token : 'Usertoken, to be used in case of private stream',
	streamMultistreamValue_debug : 'Show debug information',

	/* styles */
	yucca_stream_multistream_value : 'Main panel',
	yucca_stream_multistream_value_header : 'Header',
	yucca_stream_multistream_value_content : 'Body',
	yucca_stream_multistream_value_data : 'Data panel',
	yucca_stream_multistream_value_table : 'Data table',
	yucca_stream_multistream_value_stream_row : 'Row with the name of the stream',
	yucca_stream_multistream_value_component : 'Row with the data of a component',
	yucca_stream_multistream_value_component_bullet : 'Panel with the traffic light',
	bullet_ok : 'Green traffic light',
	bullet_warning : 'Yellow traffic light',
	bullet_critical : 'Red traffic light',
	yucca_stream_multistream_value_component_value : 'Panel with the value of the data',
	yucca_stream_multistream_component_measureunit : 'Pannel with the measure unit',
	yucca_stream_multistream_value_lastupdate_bar : 'Pannel with the last update date',
	yucca_credits_intro : 'Footer',
	
	/* *************** */
	/* LAST VALUE */
	/* *************** */
	streamLastValue_intro: '<p>Widget designed to display the <strong>the last value</strong> relating to one or more of any components of a stream</p>'
		+ '<p>Each panel has a unique css class, which allows you to <strong>customize</strong> each component (or even hide it)</p>',
		
	/* params */
	streamLastValue_widget_title : 'Widget title, if omitted the title will not show, to give more firmness to the widget',
	streamLastValue_widget_intro: 'Introduction',
	streamLastValue_tenant_code : 'Stream tenant code',
	streamLastValue_stream_code : 'Stream code',
	streamLastValue_smartobject_code : 'Smartobject code',
	streamLastValue_labels: 'Array with labels to display for each component, as an alternative to the component name. The size of array must be the same as the number of components.',
	streamLastValue_components: 'Array with the names of the stream components to display. If you do not specify anything, are all  displayed',
	streamLastValue_show_lastupdate : 'Flag for hide/show the lastupdate date.This date is anyway show in a tooltip on the data value',
	streamLastValue_chart_type: 'Chart type: line o histogram',
	streamLastValue_chart_height: 'Chart height',
	streamLastValue_chart_width: 'Chart width',
	streamLastValue_chart_color: 'Color used in the chart',
	streamLastValue_user_token : 'Usertoken, to be used in case of private stream',
	streamLastValue_debug : 'Show debug information',
		
	/* styles */
	yucca_stream_last_value: 'Main panel',
	yucca_stream_last_value_header: 'Header (default hide)',
	yucca_stream_last_value_content: 'Body',
	yucca_stream_last_value_data: 'Data Panel',
	yucca_stream_last_value_panel: 'Single component pannel',
	yucca_stream_last_value_panel_single: 'Specific component panel, this class is created dynamically from the compoent name',
	yucca_stream_last_value_panel_separator: 'Panel separating the individual components (visible only if there are more than one components)',
	yucca_stream_last_value_component_name: 'Panel with the name of the compoent',
	yucca_stream_last_value_component_panel: 'Pannel with the data value',
	yucca_stream_last_value_component_value: 'Data value',
	yucca_stream_last_value_component_value_info: 'Panel with data info: growth trends and unit of measure',
	yucca_stream_last_value_component_trend: 'Panel with growth trends: depending on the trend are then associated to the three additional classes: \'trend_up\' if is growing, ' +
	'\'trend_down\' if it decreases, \'trend_stable\' if it is stable',
	yucca_stream_last_value_component_chart: 'Panel with the chart',
	yucca_stream_last_value_component_chart_x_xAxis: 'X Axys of the chart: it will be shown only the first and the last value, with the class \'min_value\' and \'max_value\'. '+
	'The value is a date, divided in hour and day, with respectively the classes \'value_hour\' and \'value_date\'',
	yucca_stream_last_component_measureunit: 'Panel with unit of measure',
	yucca_stream_last_value_lastupdate_bar: 'Panel with the lastupdate date (default hide)',
	
	
	/* *************** */
	/* STREAM MONITOR */
	/* *************** */
	streamMonitor_intro: '<p>Widget designed to display the trend <strong>real time trend </strong> relating to one or more components of a stream</p>'
		+ '<p>There is a panel with a chart and a panel with the data</p>',
	
	/* params */
	streamMonitor_widget_title : 'Widget title',
	streamMonitor_widget_intro: 'Introduction',
	streamMonitor_tenant_code : 'Stream tenant code',
	streamMonitor_stream_code : 'Stream code',
	streamMonitor_smartobject_code : 'Smartobject code',
	streamMonitor_show_lastupdate : 'Flag to hide/show the lastupdate date. This date is anyway show in a tooltip on the data value',
	streamMonitor_labels: 'Array with labels to display for each component, as an alternative to the component name. The size of array must be the same as the number of components.',
	streamMonitor_components: 'Array with the names of the stream components to display. If you do not specify anything, are all  displayed',
	streamMonitor_chart_type: 'Chart type: line o histogram',
	streamMonitor_landing_panel: 'First panel visualized when the widget is loaded',
	streamMonitor_chart_height: 'Chart height',
	streamMonitor_chart_width: 'Chart width',
	streamMonitor_chart_colors: 'Color usded in the chart',
	streamMonitor_user_token : 'Usertoken, to be used in case of private stream',
	streamMonitor_debug : 'Show debug information',
		
	/* styles */
	yucca_stream_monitor: 'Main panel',
	yucca_stream_monitor_header: 'Header (default hide)',
	yucca_stream_monitor_content: 'Body',
	yucca_stream_monitor_chart: 'Chart panel',
	yucca_stream_monitor_component_chart: 'Panel with the chart of the trend of data',
	yucca_stream_monitor_component_chart_x_xAxis: 'X Axys of the chart: it will be shown only the first and the last value, with the class \'min_value\' and \'max_value\'. '+
	'The value is a date, divided in hour and day, with respectively the classes \'value_hour\' and \'value_date\'',
	yucca_stream_monitor_data: 'Data panel',
	yucca_stream_monitor_table: 'Data table',
	yucca_stream_monitor_toolbar: 'Bottom Toolbar ',
	yucca_stream_monitor_lastupdate_bar: 'Panel with the lastupdate date (default hide)',
	
	/* *********************** */
	/* MULTI STREAM   STATS    */
	/* *********************** */
	
	streamMultistreamStats_intro: '<p>Widgets designed for show on a map the <strong>trend of one or more streams over time</strong>.</p>' +
	'<p>The streams must be homogeneous between them, and have geo-localized data, below the map there is a slider that allows scroll the time</p>'+
	'<p>Is possible specify a time range for analysis (if not specified it will considered the last day)</p>',
	
	/* params */
	streamMultistreamStats_widget_title: 'Widget title, if omitted the title will not show, to give more firmness to the widget',
	streamMultistreamStats_widget_intro: 'Introduction',
	streamMultistreamStats_datasets: 'Datasets code',
	streamMultistreamStats_landing_panel: 'First panel visualized when the widget is loaded',
	streamMultistreamStats_orderby: 'Order by',
	streamMultistreamStats_user_token: 'Usertoken, to be used in case of private stream',
	streamMultistreamStats_time_range: 'Time range on which calculate the statistic, in alternatively of the parameters of minimum and maximum date',
	streamMultistreamStats_time_min_date : 'Initial date used to calculate the statistic',
	streamMultistreamStats_time_max_date : 'Final date used to calculate the statistic',
	streamMultistreamStats_top: 'Number of row extracted',

	/* styles */
	yucca_stream_multistream_stats: 'Widget Panel',
	yucca_stream_multistream_stats_header:'Widget Header',
	yucca_stream_multistream_stats_stream_name:'Stream Name',
	yucca_stream_multistream_stats_content:'Widget Content',
	yucca_stream_multistream_stats_chart:'Chart panel',
	yucca_stream_multistream_stats_data:'Data panel',
	yucca_stream_multistream_stats_table:'Data table',
	yucca_stream_multistream_stats_component:'Stream Compent',
	yucca_stream_multistream_stats_component_key:'Stream Component measure key',
	yucca_stream_multistream_stats_component_value:'Stream Component measure value',
	yucca_stream_multistream_stats_component_measure_unit:'Stream Component measure unit',
	yucca_stream_multistream_stats_total_count:'Total count',
	yucca_stream_multistream_stats_toolbar:'Bottom Toolbar ',
	
	
	
	/* *********************** */
	/* TREEMAP      */
	/* *********************** */


	datasetTreemap_intro : 
		 '<p>Widget designed to display on a <strong>treemap</strong> data of datasets with grouped columns</p>'
		+ '<p>There are 3 levels of navigation in the treemap.</p>'
		+ '<p>You will see a panel containing a treemap containing as many rectangles as there are of top-level data. By clicking on the rectangles you enter in the details of the second level, where you can go down again to a third level. </p>'
		+ 'In the sample dataset there is the partition by district, town and market day for the urban market<ul><li>first level: district</li>'
		+ '<li>second level: market day</li>'
		+ '<li>third level: town</li>'
		+ '</ul>',
	/* params */
	datasetTreemap_widget_title : 'Widget title',
	datasetTreemap_widget_intro: 'Introduction',
	datasetTreemap_tenant_code : 'Tenant code of the dataset',
	datasetTreemap_dataset_code : 'Dataset code',
	datasetTreemap_chart_title : 'Main chart title',
	datasetTreemap_first_level_column:'Dataset column from which group the data for the first level',
	datasetTreemap_first_level_render:'<p class="text-left" style="font-size: 11px">Javascript object that describes how to display the first level data.<br> '
			+ 'The object has a property for each grouped value, and each property has an object that describes the label to use and the color. </p>'
			+ '<p class="text-left">For example if the dataset has been a column in which there are the abbreviations of the states but on the chart you wanted the name,the \'render\' object:</p>'
			+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"I":{"label":"Italy", "color":"#ffee00"},<br>&nbsp;'
			+ ' "SGP":{"label":"Singapore", "color":"#67ff77"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
			+ '</code></pre>',
	datasetTreemap_second_level_column:'Dataset column from which group the data for the second level',
	datasetTreemap_second_level_render:'<p class="text-left" style="font-size: 11px">Javascript object that describes how to display the second level data.<br> '
		+ 'The object has a property for each grouped value, and each property has an object that describes the label to use.</p>'
		+ '<p class="text-left">For example if the dataset has been a column in which there are the abbreviations of the states but on the chart you wanted the name,the \'render\' object:</p>'
		+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"I":{"label":"Italy"},<br>&nbsp;'
		+ ' "SGP":{"label":"Singapore"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
		+ '</code></pre>',
	datasetTreemap_third_level_column:'Dataset column from which group the data for the third level',
	datasetTreemap_third_level_render:'<p class="text-left" style="font-size: 11px">Javascript object that describes how to display the third level data.<br> '
		+ 'The object has a property for each grouped value, and each property has an object that describes the label to use.</p>'
		+ '<p class="text-left">For example if the dataset has been a column in which there are the abbreviations of the states but on the chart you wanted the name,the \'render\' object:</p>'
		+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"I":{"label":"Italy"},<br>&nbsp;'
		+ ' "SGP":{"label":"Singapore"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
		+ '</code></pre>',
	datasetTreemap_value_column:'Dataset column with the values to be sum or count',
	datasetTreemap_euro_value:'Indicates whether the value is in euro currency',
	datasetTreemap_decimal_value:'Number of decimal to use (default 2)',	
	datasetTreemap_landing_panel: 'First panel visualized when the widget is loaded',
	datasetTreemap_counting_mode : 'Way of computing statistic: if the data are numerical is possible sum it, using \'sum\', otherway it will be count the values',
	datasetTreemap_chart_width : 'Chart width',
	datasetTreemap_chart_height : 'Chart height',
	datasetTreemap_filter : 'Filter on data to analyze. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetTreemap_skip : 'First row for pagination',
	datasetTreemap_top : 'Number of row for pagination',
	datasetTreemap_user_token : 'Usertoken, to be used in case of private stream',
	datasetTreemap_debug : 'Show debug information',


	
	
	/* styles */
	yucca_dataset_treemap : 'Main panel',
	yucca_dataset_treemap_header : 'Header',
	yucca_dataset_treemap_content : 'Body',
	yucca_dataset_treemap_chart : 'Chart panel',
	yucca_dataset_treemap_chart_message : 'Message in the chart panel, as Loading (loading&hellip;) or if there is no data',
	yucca_dataset_treemap_data : 'Data panel',
	yucca_dataset_treemap_table : 'Data table',
	yucca_credits_intro: 'Footer',
	legend: 'Panel containing the chart legend. It is inside  a panel with id <strong>treemapPanel</strong>',
	legend_label: 'Label with min and max value of the legend. It is inside  a panel with id <strong>treemapPanel</strong>',
	legend_bullet: 'Box with the color of the legend. It is inside  a panel with id <strong>treemapPanel</strong>',
	

	/* *********************** */
	/* MULTI DATA TREEMAP      */
	/* *********************** */


	datasetMultidataTreemap_intro : '<p>Widget designed to display on a treemap data of datasets with grouped columns</p>'
		+ '<p>There are 3 levels of navigation in the treemap,  plus an (optional) fourth level related tu value to a percentage.</p>'
		+ '<p>You will see a panel containing a treemap containing as many rectangles as there are of top-level data. By clicking on the rectangles you enter in the details of the second level, where you can go down again to a third level. The percentage value (if present) is displayed by the brightness of the rectangles on the third level.</p>'
		+ 'In the sample dataset there is the partition by town of the recycling of urban waste <ul><li>irst level: type of waste (glass, paper ...)</li>'
		+ '<li>second level: quantity divided by province</li>'
		+ '<li>third level: quantity divided by town</li>'
		+ '<li>fourth level: percentage of recycling by town</li></ul>',
	/* params */
	datasetMultidataTreemap_widget_title : 'Widget title',
	datasetMultidataTreemap_widget_intro: 'Introduction',
	datasetMultidataTreemap_tenant_code : 'Tenant code of the dataset',
	datasetMultidataTreemap_dataset_code : 'Dataset code',
	datasetMultidataTreemap_chart_title : 'Main chart title',
	datasetMultidataTreemap_landing_panel: 'First panel visualized when the widget is loaded',
	datasetMultidataTreemap_first_group_column : 'Column list for the main grouping',
	datasetMultidataTreemap_colors : 'Colors for the first grouping',
	datasetMultidataTreemap_first_group_label : 'Label list used for the first series. If omitted it will be used the column name',
	datasetMultidataTreemap_second_group_column : 'Dataset column for the second grouping.',
	datasetMultidataTreemap_euro_value :'Indicates whether the value is in euro currency',
	datasetMultidataTreemap_decimal_value:'Number of decimal to use (default 2)',	
	datasetMultidataTreemap_third_group_column : 'Dataset column for the third grouping.',
	datasetMultidataTreemap_fourth_group_column : 'Column with the percentage value, used in the last level',
	datasetMultidataTreemap_counting_mode : 'Way of computing statistic: if the data are numerical is possible sum it, using \'sum\', otherway it will be count the values',
	datasetMultidataTreemap_chart_width : 'Chart width',
	datasetMultidataTreemap_chart_height : 'Chart height',
	datasetMultidataTreemap_filter : 'Filter on data to analyze. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetMultidataTreemap_skip : 'First row for pagination',
	datasetMultidataTreemap_top : 'Number of row for pagination',
	datasetMultidataTreemap_user_token : 'Usertoken, to be used in case of private stream',
	datasetMultidataTreemap_debug : 'Show debug information',


	
	
	/* styles */
	yucca_dataset_multidata_treemap : 'Main panel',
	yucca_dataset_multidata_treemap_header : 'Header',
	yucca_dataset_multidata_treemap_content : 'Body',
	yucca_dataset_multidata_treemap_chart : 'Chart panel',
	yucca_dataset_multidata_treemap_chart_message : 'Message in the chart panel, as Loading (loading&hellip;) or if there is no data',
	yucca_dataset_multidata_treemap_data : 'Data panel',
	yucca_dataset_multidata_treemap_table : 'Data table',
	yucca_credits_intro: 'Footer',
	legend: 'Panel containing the chart legend. It is inside  a panel with id <strong>treemapPanel</strong>',
	legend_label: 'Label with min and max value of the legend. It is inside  a panel with id <strong>treemapPanel</strong>',
	legend_bullet: 'Box with the color of the legend. It is inside  a panel with id <strong>treemapPanel</strong>',
	
	/* *************** */
	/* MULTIDATA STATS */
	/* *************** */
	datasetMultidataStats_intro : '<p>Widget pensato per visualizzare con un <strong>istogramma dati e statistiche</strong> relativi a dataset con colonne raggruppabili.</p>'
			+ '<p>Si possono indicare fino a tre gruppi di dati</p>'
			+ '<p>Si presenta con un istogramma con tante colonne quante sono le serie di dati indicati e un secondo pannello con una tabella navigabile contente i dati.</p>',
			
			
			

	/* params */
	datasetMultidataStats_widget_title : 'Widget title',
	datasetMultidataStats_widget_intro: 'Introduction',
	datasetMultidataStats_tenant_code : 'Tenant code of the dataset',
	datasetMultidataStats_dataset_code : 'Dataset code',
	datasetMultidataStats_first_group_column : 'Colonna del dataset da cui fare il raggruppamento principale',
	datasetMultidataStats_first_group_colors : 'Colori da utilizzare nel grafico per distinguere la prima serie',
	datasetMultidataStats_second_group_column : 'Lista delle colonne per il secondo raggruppamento. Se omessa viene considerata solo la prima serie',
	datasetMultidataStats_second_group_label : 'Lista delle etichette da visualizzare per la seconda serie. Se omessa viene utilizzato la colonna stessa',
	datasetMultidataStats_third_group_column : 'Colonna del dataset per cui effettuare il terzo raggruppamento. Questo raggruppamento viene utilizzato solo nella tabella dei dati',
	datasetMultidataStats_counting_mode : 'Metodo di calcolo delle statistiche: se i dati della seconda serie sono numerici, si possono sommare indicando \'sum\', in alternativa vengono contati i valori',
	datasetMultidataStats_landing_panel: 'Pannello visualizzato al caricamento del widget',
	datasetMultidataStats_chart_height : 'Altezza del grafico',
	datasetMultidataStats_chart_type : 'Tipo di grafico: istogramma verticale o orizzontale',
	datasetMultidataStats_filter : 'Filtro per selezioare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetMultidataStats_skip : 'Numero riga da cui iniziare l\'estrazione ',
	datasetMultidataStats_top : 'Numero di righe da estrarre',
	datasetMultidataStats_user_token : 'Usertoken, da utilizzare in caso di stream privati',
	datasetMultidataStats_debug : 'Visualizzare le informazioni di debug',
	datasetMultidataStats_user_token : 'Usertoken, to be used in case of private stream',
	datasetMultidataStats_debug : 'Show debug information',


	/* styles */
	yucca_dataset_multidata_stats : 'Pannello principale',
	yucca_dataset_multidata_stats_header : 'Header',
	yucca_dataset_multidata_stats_content : 'Body',
	yucca_dataset_multidata_stats_chart : 'Pannello grafico',
	yucca_dataset_multidata_stats_data : 'Pannello dati',
	yucca_dataset_multidata_stats_table : 'Tabella dati',
	yucca_dataset_multidata_stats_toolbar: 'Toolbar with the visualization menu panel',
	yucca_dataset_multidata_stats_tooltip : 'Tooltip: pannello principale',
	yucca_dataset_multidata_stats_tooltip_header : 'Tooltip: header',
	yucca_dataset_multidata_stats_tooltip_label : 'Tooltip: etichetta nella tabella',
	yucca_dataset_multidata_stats_tooltip_value : 'Tooltip: valore nella tabella',

	/* ******************** */
	/* DATASET BULLET CHART */
	/* ******************** */
	datasetBulletChart_intro : '<p>Widget designed to display one or more <strong>bullet chart</strong> relating to <strong>individual</strong> data of a dataset</p>'
			+ '<p>You can specify one or more data, for each data it will be created a bullet chart, with the current value taken from the colum choosen.</p>'
			+ '<p>You can specify the<strong> range</strong> to be displayed (minimum value, maximum value and average value), or you can indicate the <strong>columns of the dataset</strong> that contain this values. If columns or values are not specified,  these values are <strong>calculated by the widget</strong> using the first 10,000 records.</p>'
			+ '<p>You can specify <strong>other custom markers</strong> to be showed on the indicator bar, with their own labels.</p>',
			
			
	/* params */
	datasetBulletChart_widget_title : 'Widget title',
	datasetBulletChart_widget_intro: 'Introduction',
	datasetBulletChart_tenant_code: 'Tenant code of the dataset',
	datasetBulletChart_dataset_code: 'Dataset code',
	datasetBulletChart_internal_ids: 'Internal ID of the datasets to be considered.',
	datasetBulletChart_filter_ids: 'OData filter to query and extract single data on which draw the chart. To use as an alternative to the internal_ids (previous parameter).Each data has his own chart. The query is limited to 50 results. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetBulletChart_current_value_column: 'Column with the current value',
	datasetBulletChart_range_values: 'Array with the ranges: minimun value, mean value and maximum value. If not specified and if not specified the range columns (next parameter), they are calculated among the first 10,000 row of the dataset',
	datasetBulletChart_range_column_values: 'Array with the columns used to retreive the ranges: column with minimun value, column with mean value and column with maximum value. If not specified and if not specified the range values (previous parameter), they are calculated among the first 10,000 row of the dataset', 
	datasetBulletChart_bar_title_column: 'Dataset column used for the title of the bar',
	datasetBulletChart_bar_subtitle_colum: 'Dataset column used for the subtitle of the bar',
	datasetBulletChart_filter : 'Filter on data to analyze. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetBulletChart_skip : 'First row for pagination',
	datasetBulletChart_previous_value_column : 'Number of row for pagination',
	datasetBulletChart_euro_value:'Indicates whether the value is in euro currency',
	datasetBulletChart_decimal_value:'Number of decimal to use (default 2)',	
	datasetBulletChart_previous_value_column: 'Column with the previous value',
	datasetBulletChart_bar_colors: 'Color list, one color for each chart. Lista dei colori da usare per i bullet chart. The colors are used cyclically',
	datasetBulletChart_bar_title_label: 'Label for the title of the bar (To use as an alternative to the param datasetBulletChart_bar_title_column)',
	datasetBulletChart_bar_subtitle_label: 'Label for the subtitle of the bar (To use as an alternative to the param datasetBulletChart_bar_subtitle_colum)',
	datasetBulletChart_average_values: 'Made the average of the values, returning a single bullet chart. If specified the Internal ID (parameter \'internal_ids\'),  the average is NOT calculated, but it will be created a bullet chart for any single data',
	datasetBulletChart_range_labels: 'Label used in the tooltip for the minimum, medium and maximum value. Default: Minumum, Mean, Maximun',
	datasetBulletChart_measure_labels: 'Label used in the tooltip for the current value. Default: Current',
	datasetBulletChart_custom_markers: 'List of custom markers to be display on the chart',
	datasetBulletChart_custom_marker_columns: 'Column whose values will be visualized as marker',
	datasetBulletChart_marker_labels: 'List of the labels of the custom markers ',
	datasetBulletChart_user_token : 'Usertoken, to be used in case of private stream',
	datasetBulletChart_debug : 'Show debug information',

	/* styles */
	yucca_dataset_bullet_chart : 'Main panel',
	yucca_dataset_bullet_chart_header : 'Header',
	yucca_dataset_bullet_chart_content : 'Body',
	yucca_dataset_bullet_chart_chart : 'Chart panel',
	yucca_dataset_bullet_chart_tooltip : 'Tooltip panel',

	
	
	/* ******************** */
	/* DATASET SANKEY CHART */
	/* ******************** */
	datasetSankeyChart_intro: '<p>Widget designed to display a <strong>Sankey diagram </strong> relating to a dataset</p>'
		+ '<p>You can specify <strong>two or more columns</strong> and the widget  il widget <strong>automatically calculates</strong> the links between them, respecting the insertion order.</p>'
		+ '<p>You can <strong>specify directly the javascript objects rappresenting nodes and links</strong>. In this case the Yucca platform is not contacted, and the data displayed are only those input</p>',

	/* params */
	datasetSankeyChart_widget_title : 'Widget title',
	datasetSankeyChart_widget_intro: 'Introduction',
	datasetSankeyChart_tenant_code: 'Tenant code of the dataset',
	datasetSankeyChart_dataset_code: 'Dataset code',

	datasetSankeyChart_node_columns: 'Column used in the automatic calculation of the nodes',
	datasetSankeyChart_filter : 'Filter on data to analyze. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetSankeyChart_skip : 'First row for pagination',
	datasetSankeyChart_top : 'Number of row for pagination',	
	datasetSankeyChart_chart_width: 'Chart width in pixel (default 600px)',
	datasetSankeyChart_chart_height: 'Chart height in pixel (default 400px)',
	datasetSankeyChart_sankey_node_render:'<p class="text-left" style="font-size: 11px">Javascript object that describes how to display the first level data.<br> '
	+ 'The object has a property with key <i>columnName_nodeValue</i> that has an object that describes the label to use and the color and if fader color. </p>'
	+ '<p class="text-left">For example if the dataset has been a column in which there are the abbreviations of the states but on the chart you wanted the name,the \'render\' object:</p>'
	+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"State_I":{"label":"Italy", "color":"#ffee00", "fader": "true"},<br>&nbsp;'
	+ ' "State_SGP":{"label":"Singapore", "color":"#67ff77", "fader": "true"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
	+ '</code></pre>', 
	datasetSankeyChart_base_color: 'Base color for nodes when not specified in param render', 
	datasetSankeyChart_counting_mode: 'Way of computing statistic: if the data are numerical is possible sum it, using \'sum\', otherway it will be count the values', 
	datasetSankeyChart_value_column:'Dataset column with the values to be sum or count',
	datasetSankeyChart_euro_value:'Indicates whether the value is in euro currency',	
	datasetSankeyChart_decimal_value:'Number of decimal to use (default 2)',	
	datasetSankeyChart_sankey_nodes: 'Nodes to be used, if specified with the sankey_links (next parameter), yucca platform is not contacted and are displayed nodes and links below. <a href="./sankeyDemoData.json" target="_blank"> Example node / link objects</a>',
	datasetSankeyChart_sankey_links: 'Links to be used, if specified with the sankey_nodes(prevoius parameter), yucca platform is not contacted and are displayed nodes and links below. <a href="./sankeyDemoData.json" target="_blank"> Example node / link objects</a>',
	datasetSankeyChart_user_token : 'Usertoken, to be used in case of private stream',
	datasetSankeyChart_debug : 'Show debug information',

	/* styles */
	yucca_dataset_sankey : 'Main panel',
	yucca_dataset_sankey_header : 'Header',
	yucca_dataset_sankey_loading : 'Pannello loading',
	yucca_dataset_sankey_content : 'Body',
	yucca_dataset_sankey_chart: 'Chart panel',

	/* ****************** */
	/* POPULATION PYRAMID */
	/* ****************** */
	datasetPopulationPyramid_intro : '<p>Widget designed to display <strong>population pyramid</strong> related to dataset whose data can be divided into 2 groups (males and females), and can be grouped on a different column (ages)</p>'
			+ '<p>You will see a panel that contains two horizontal histograms arranged in a specular manner and a second panel with a navigable table containing the data</p>',
			
	/* params */
	datasetPopulationPyramid_widget_title : 'Widget title',
	datasetPopulationPyramid_widget_intro: 'Introduction',
	datasetPopulationPyramid_tenant_code : 'Tenant code of the dataset',
	datasetPopulationPyramid_dataset_code : 'Dataset code',
	datasetPopulationPyramid_gender_column : 'Dataset column with the gender (male or female), in general column with the two values used in the two mirror histograms',
	datasetPopulationPyramid_age_column : 'Dataset column with the age groups, in general the column where there are values to be grouped',
	datasetPopulationPyramid_age_values: 'Values (optional) to use for the division into age groups. Useful if you want to consider only certain ages, or want to have order',
	datasetPopulationPyramid_gender_values : 'Values used for discriminate the gender (default M, F), in general the values used to distinguish data for the two specular histograms',
	datasetPopulationPyramid_gender_colors : 'Colours used for the two mirror-image histograms (default pink)',
	datasetPopulationPyramid_gender_labels : 'Labels used for the two mirror-image histograms (default F e M)',
	datasetPopulationPyramid_age_labels : 'Labels used for the ages (default the value found)',
	datasetPopulationPyramid_counting_mode : 'Way of computing statistic: \'count\' count the occurrences, \'sum\' sum  the values in the column specified by the parameter \'value_column\'',
	datasetPopulationPyramid_value_column:'Column with the values to sum if the count type is sum (parameter \'counting_mode\')',
	datasetPopulationPyramid_landing_panel: 'First panel visualized when the widget is loaded',
	datasetPopulationPyramid_chart_height : 'Chart height',
	datasetPopulationPyramid_chart_type : 'Chart type: horizontal histogram or vertical',
	datasetPopulationPyramid_filter : 'Filter on data to analyze. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetPopulationPyramid_skip : 'First row for pagination',
	datasetPopulationPyramid_top : 'Number of row for pagination',
	datasetPopulationPyramid_user_token : 'Usertoken, to be used in case of private stream',
	datasetPopulationPyramid_debug : 'Show debug information',

	/* styles */
	yucca_dataset_population_pyramid : 'Main panel',
	yucca_dataset_population_pyramid_header : 'Header',
	yucca_dataset_population_pyramid_content : 'Body',
	yucca_dataset_population_pyramid_chart : 'Chart panel',
	yucca_dataset_population_pyramid_data : 'Data panel',
	yucca_dataset_population_pyramid_table : 'Data table',
	yucca_dataset_population_pyramid_toolbar: 'Toolbar with the visualization menu panel',
	yucca_dataset_population_pyramid_tooltip : 'Tooltip: main panel',
	yucca_dataset_population_pyramid_tooltip_header : 'Tooltip: header',
	yucca_dataset_population_pyramid_tooltip_label : 'Tooltip: label in the table',
	yucca_dataset_population_pyramid_tooltip_value : 'Tooltip: value in the table',
	
	/* ****************** */
	/* CHOROPLETH MAP  */
	/* ****************** */
	datasetChoroplethMap_intro : '<p>Widget designed to display a <strong>choropleth map</strong> on a dataset containing the result of statistical calculations divided by areas (eg population density in districts).</p>'
			+ '<p>The map areas must be available from a valid url in  <strong>GeoJSON format</strong>. If not specified the widget provides the areas relating to the districts of Piedmont</p>'
			+'<p>In the features properties of the GeoJSON files, there must be a properties that identifies the area (eg province: Torino), which must correspond to the value of one of the columns of the dataset (eg in the dataset there will be there a column called province that will have inside a value with Torino).</p>'
			+'<p>In the configuration you must specify the column name on the key area and the name of the column for the value to be represented (the density)</p>'
			+'<p>Through the configuration parameters you can <strong>customize the map in colors, lines and background</strong></p>',
			
	/* params */
	datasetChoroplethMap_widget_title : 'Widget title',
	datasetChoroplethMap_widget_intro: 'Introduction',
	datasetChoroplethMap_tenant_code : 'Tenant code of the dataset',
	datasetChoroplethMap_dataset_code : 'Dataset code',
	datasetChoroplethMap_geojson_url:'GeoJson file Url (if not specified will be used the file with the Piedmont districts)',
	datasetChoroplethMap_geojson_areas_key:'Key to identify areas in the GeoJSON file. The key value must match with the one in the dataset',
	datasetChoroplethMap_dataset_areas_key_column:'Dataset column with the data used to identify the area on the map. The value must match with the one in the GeoJSON file',
	datasetChoroplethMap_dataset_areas_value_column:'Dataset column with the data to be represented on the map',
	datasetChoroplethMap_area_base_color:'Base color used in the map. The values are rapresented by changing the brightness',
	datasetChoroplethMap_skip_zero_values:'Flag used to exclude the zero value data from  the calculation of color, (that data will be shown in gray on the map)',
	datasetChoroplethMap_counting_mode : 'Way of computing statistic: if the data are numerical is possible sum it, using \'sum\', otherway it will be count the values',
	datasetChoroplethMap_show_legend:'Flag to show legend',
	datasetChoroplethMap_euro_value :'Indicates whether the value is in euro currency',
	datasetChoroplethMap_decimal_value:'Number of decimal to use (default 2)',	
	datasetChoroplethMap_zoom_control:'Flag for show zoom control',
	datasetChoroplethMap_scroll_wheel_zoom:'Whether the map can be zoomed by using the mouse wheel.',
	datasetChoroplethMap_legend_position:'Legend position',
	datasetChoroplethMap_map_tiles_url:'Url for tiles (graphic) used on the map. If the url is invalid, the background of the map will be gray, but  colored areas will be  displayed',
	datasetChoroplethMap_map_line_weight:'Thickness of the line that separates the areas (boundaries)',
	datasetChoroplethMap_map_line_opacity:'Opacity of the line that separates the areas (boundaries)',
	datasetChoroplethMap_map_line_dash_color:'Color of the line that separates the areas (boundaries)',
	datasetChoroplethMap_map_line_dash_array:'Dash level of the line that separates the areas (boundaries)',
	datasetChoroplethMap_map_areas_fill_opacity:'Opacity of the area color',
	datasetChoroplethMap_dataset_areas_key_label: 'Label for the key in the tooltip',
	datasetChoroplethMap_dataset_areas_values_label: 'Label for the data in the tooltip',
	datasetChoroplethMap_filter : 'Filter on data to analyze. OData format: valid operators \'eq, ne, gt, ge, lt, the, and, or \'. Example: column_name eq data_values',
	datasetChoroplethMap_skip : 'First row for pagination',
	datasetChoroplethMap_top : 'Number of row for pagination',
	datasetChoroplethMap_user_token : 'Usertoken, to be used in case of private stream',
	datasetChoroplethMap_debug : 'Show debug information',

	/* styles */
	yucca_dataset_choropleth_map : 'Main panel',
	yucca_dataset_choropleth_map_header : 'Header',
	yucca_dataset_choropleth_map_content : 'Body',
	yucca_dataset_choropleth_map_map : 'Map panel',
	yucca_dataset_choropleth_map_data : 'Data panel',
	yucca_dataset_choropleth_map_table : 'Data table',
	yucca_dataset_choropleth_map_toolbar: 'Toolbar with the visualization menu panel',


	
};
