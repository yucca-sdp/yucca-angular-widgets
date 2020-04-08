var translations_it = {

	LANG_KEY: 'it',

	events_section_event_listening_no_values: 'Questo widget non ascolta eventi',
	events_section_event_sending_no_values: 'Questo widget non rilancia eventi',

	/* common */
	Welcome: 'Benvenuti',
	Preview: 'Anteprima',
	getting_started: 'Per iniziare',
	composer: 'Composer',
	advaced_widget: 'Widget Avanzati',
	yucca_credits_intro: 'Footer',
	active: 'css class for the active menu item',
	yes: 'Si',
	not_visible: 'Non visibile',
	color: 'Colore',
	login: 'Accedi',
	logout: 'Esci',
	
	image_chooser_intro: 'Carica un immagine o indica la url da dove prenderla',
	drop_image_here: 'Rilascia l\'immagine qui',
	click_to_choose_image: 'O clicca per scegliere',
	remove_image: 'Rimuovi',
	
	menu_show_help_istant: 'Aiuto veloce',
	menu_show_help_tour: 'Tour guidato',

	widget_social: 'Social',
	widget_gallery: 'Galleria',
	widget_multidata: 'Multidata',
	widget_lastvalue: 'Ultimo valore',
	widget_detection: 'Rilevamento',
	widget_monitor: 'Andamento',
	widget_map: 'Mappa',
	widget_treemap: 'Treemap',
	widget_multidata_treemap: 'Treemap Multidata',
	widget_bulletchart: 'Bullet chart',
	widget_sankeychart: 'Diagramma di Sankey',
	widget_population_pyramid: 'Piramide delle et&agrave;',
	widget_choropleth_map: 'Mappa coropletica',
	widget_forcedirected_chart: 'Diagramma force-directed',
	widget_dataexplorer: 'Data Explorer',
	widget_controlfilter: 'Filtro sui dati',

	widget_reposotory_source: 'Repository dei sorgenti del widget',
	widget_yucca_data_source: 'Dataset di yucca utilizzato',
	widget_the_widget: 'Il Widget',
	widget_preview_useddata: 'Dati utilizzati per il Widget',


	widget_badge_certified:	'Verificato',
	widget_badge_certified_hint:'Questo widget è stato utilizzato su almeno una dashboard in esercizio',

	widget_badge_beta:	'Beta',
	widget_badge_beta_hint:'Questo widget non è consolidato, ma ancora in fase beta',

	/* widget cards */
	widget_info_tab_use: 'Utilizzo',
	widget_info_tab_params: 'Parametri',
	widget_info_tab_advanced_params: 'Avanzate',
	widget_info_tab_customize: 'Configura',
	widget_info_tab_style: 'Personalizza',
	widget_info_change_param_warning: 'Hai cambiato dei parametri, aggiorna la preview',

	widget_intro: '<p>Yucca si arricchisce di una famiglia di widget che gli sviluppatori potranno utilizzare per rappresentare i dati di interesse.</p>'
		+ '<p>Tutti i widget sono altamente personalizzabili, nella scelta dei dati da visualizzare, e nell\'aspetto finale dei widget. Nella pagina di ogni singolo wiget o attraverso il <strong>Composer (versione beta)</strong>'
		+ ' &egrave; possibile provare a modificare i parametri e lo stile del widget, e vederne il risultato in tempo reale. Una volta completata la personalizzazione si pu&ograve; copiare il codice da inserire nella propria webapp, o se si è utilizzato il composer, scaricare una webapp intera</p>'
		+ '<p>Ogni widget ha il parametro <code><strong>user_token</strong></code> che permette di accedere ai dati privati, e un parametro'
		+ '<code><strong>debug</strong></code>, da utilizzare in fase di installazione, che permette di vedere eventuali errori di configurazione direttamente nel widget stesso'
		+ '<p>Se si utilizzano pi&ugrave; widget nella stessa pagina, &egrave; importante che siano separati in pannelli diversi</p>',


	/* Change syle dialog */
	change_style_dialog_title: 'Personalizza',
	change_style_dialog_text: 'Testo',
	change_style_dialog_text_align: 'Allineamento',
	change_style_dialog_text_size: 'Dimensione',
	change_style_dialog_text_style: 'Stile',
	change_style_dialog_colors: 'Colori',
	change_style_dialog_borders: 'Bordi',
	change_style_dialog_spacing: 'Spaziature',
	change_style_dialog_spacing_margin: 'Spaziatura esterna al pannello',
	change_style_dialog_spacing_padding: 'Spaziatura interna al pannello',
	yucca_widget_intro: 'Descrizione introduttiva',

	/* *********** */
	/* TWEET STATS */
	/* *********** */
	streamTweetStats_intro: '<p>Widget pensato per la visualizzazione delle statistiche legate agli <strong>stream social twitter</strong></p>'
		+ '<p>Si presenta con <strong>un grafico che visualizza il numero di tweet  in un asse temporale</strong>, con la possibilit&agrave; '
		+ 'di specificare il range desiderato (ultimo mese, ultimo giorno...), o un intervallo preciso di date. '
		+ 'In assenza di specifiche, il widget elabora i tweet del giorno, il widget elabora i tweet del giorno</p>'
		+ '<p>In evidenza vengono inoltre proposti due pannelli he visualizzano gli <strong>ultimi tweet</strong> e i <strong>tweet pi&ugrave; ritwittati</strong></p>',

	/* params */
	streamTweetStats_widget_title: 'Titolo del widget',
	streamTweetStats_widget_intro: 'Descrizione introduttiva',
	streamTweetStats_tenant_code: 'Codice tenant dello stream',
	streamTweetStats_stream_code: 'Codice dello stream',
	streamTweetStats_smartobject_code: 'Codice dello Smartobject',
	streamTweetStats_landing_panel: 'Pannello visualizzato al caricamento del widget',
	streamTweetStats_time_range: 'Intervallo di tempo su cui calcolare la statistica, in alternativa ai parametri di data minima  e data massima',
	streamTweetStats_time_min_date: 'Data iniziale dell\intervallo su cui calcolare la statistica in formato ISO: YYYY-MM-DD o YYYY-MM-DDTHH:MM:SS',
	streamTweetStats_time_max_date: 'Data finale dell\intervallo su cui calcolare la statistica in formato ISO: YYYY-MM-DD o YYYY-MM-DDTHH:MM:SS',
	streamTweetStats_chart_type: 'Tipo di grafico: linea o istogramma',
	streamTweetStats_chart_height: 'Altezza del grafico',
	streamTweetStats_chart_colors: 'Array di colori usati nel grafico',
	streamTweetStats_user_token: 'Usertoken, da utilizzare in caso di stream privati',

	/* styles */
	yucca_stream_tweet_stats: 'Pannello principale',
	yucca_stream_tweet_stats_header: 'Header',
	yucca_stream_tweet_stats_content: 'Body',
	yucca_stream_tweet_stats_chart: 'Pannello grafico',
	yucca_stream_tweet_stats_xaxis_label: 'Asse x',
	yucca_stream_tweet_stats_data: 'Pannello statistiche',
	yucca_stream_tweet_stats_table: 'Tabella statistiche',
	yucca_stream_tweet_stats_value: 'Valore statistica',
	yucca_stream_tweet_stats_label: 'Etichetta statistica',
	yucca_stream_tweet_stats_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',
	yucca_stream_tweet_stats_tooltip: 'Tooltip: pannello principale',
	yucca_stream_tweet_stats_tooltip_header: 'Tooltip: header',
	tweet_profile_image: 'Tooltip: Immagine profilo twitter',
	tweet_message: 'Tooltip: pannello tweet',
	tweet_author: 'Tooltip: autore',
	tweet_text: 'Tooltip: tweet',
	tweet_user: 'Tooltip: utente citato nel tweet',
	tweet_hashtag: 'Tooltip: hastag nel tweet',
	tweet_retweet: 'Tooltip: num retweet',
	tweet_favorite: 'Tooltip: num favorite',
	tweet_info: 'Tooltip: footer con info',
	tweet_statistic_icons: 'Tooltip: pannello con icone info',
	tweet_date: 'Tooltip: data del tweet',

	/* ************* */
	/* IMAGE GALLERY */
	/* ************* */
	datasetImageGallery_intro: '<p>Widget pensato per i dataset che contengono <strong>immagini</strong></p>'
		+ '<p>Si presenta come uno <strong>slideshow</strong> di immagini, dopo avere indicato la (o le) colonne desiderate.</p>'
		+ '<p>Se le immagini sono <strong>geolocalizzate</strong>, indicando le colonne con latitudine e longitudine, verr&grave; creato un secondo pannello contenente una mappa che riporta i luoghi delle immagini</p>',

	/* params */
	datasetImageGallery_widget_title: 'Titolo del widget',
	datasetImageGallery_widget_intro: 'Descrizione introduttiva',
	datasetImageGallery_tenant_code: 'Codice tenant del dataset',
	datasetImageGallery_dataset_code: 'Codice del dataset',
	datasetImageGallery_image_columns: 'Colonne del dataset che contengono le immagini da visualizzare',
	datasetImageGallery_image_title_column: 'Colonna del dataset con il titolo dell\'immagine',
	datasetImageGallery_landing_panel: 'Pannello visualizzato al caricamento del widget',
	datasetImageGallery_position_columns: 'Colonne del dataset con le coordinate dell\'immagine. Se presenti viene visualizzata una mappa con le immagini',
	datasetImageGallery_filter: 'Filtro per selezionare le immagini da visualizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetImageGallery_skip: 'Numero immagine da cui iniziare l\'estrazione ',
	datasetImageGallery_top: 'Numero di immagini da estrarre (max 50)',
	datasetImageGallery_interval: 'Intervallo di tempo per lo slideshow (ms)',
	datasetImageGallery_show_title: 'Flag per visualizzare/nascondere il titolo dell\'immagine nello slideshow ',
	datasetImageGallery_marker_as_image: 'Visualizzare una miniatura dell\'immagine nella mappa',
	datasetImageGallery_marker_url: 'Marker da utilizzare',
	datasetImageGallery_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetImageGallery_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_dataset_image_gallery: 'Pannello principale',
	yucca_dataset_image_gallery_header: 'Header',
	yucca_dataset_image_gallery_content: 'Body',
	yucca_dataset_image_gallery_map: 'Mappa',
	yucca_dataset_image_gallery_slideshow: 'Slideshow',
	yucca_dataset_image_gallery_slide_title: 'Titolo immagine nello slideshow',
	yucca_dataset_image_gallery_bullets_panel: 'Pannello con bullet per lo slideshow',
	yucca_dataset_image_gallery_bullet: 'Singolo bullet nello slideshow',
	yucca_dataset_image_gallery_data: 'Pannello statistiche',
	yucca_dataset_image_gallery_total_count: 'Totale dati',
	yucca_dataset_image_gallery_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',

	/* *************** */
	/* MULTIDATA STATS */
	/* *************** */
	datasetMultidataStats_intro: '<p>Widget pensato per visualizzare con un <strong>istogramma dati e statistiche</strong> relativi a dataset con colonne raggruppabili.</p>'
		+ '<p>Si possono indicare fino a tre gruppi di dati</p>'
		+ '<p>Si presenta con un istogramma con tante colonne quante sono le serie di dati indicati e un secondo pannello con una tabella navigabile contente i dati.</p>',

	/* params */
	datasetMultidataStats_widget_title: 'Titolo del widget',
	datasetMultidataStats_widget_intro: 'Descrizione introduttiva',
	datasetMultidataStats_tenant_code: 'Codice tenant del dataset',
	datasetMultidataStats_dataset_code: 'Codice del dataset',
	datasetMultidataStats_first_group_column: 'Colonna del dataset da cui fare il raggruppamento principale',
	datasetMultidataStats_first_group_colors: 'Colori da utilizzare nel grafico per distinguere la prima serie',
	datasetMultidataStats_histogram_group_column: 'Colonna da usare per per ottenere pi&ugrave; istogrammi raggruppando i valori della colonna indicata (un istogramma per occorrenza del valore). Da usare in alternativa al parametro \'second_group_column\'. ATTENZIONE: usando questo parametro le statistiche vengono effettuate solo sul conteggio, se si vuole sommare i valori &egrave; necessario indicare la colonna da sommare (parametro \'histogram_group_value_column\')',
	datasetMultidataStats_histogram_group_value_column: 'Colonna che indica i valori da sommare nel caso si sia specificato la creazione automatica degli istogrammi (parametro \'histogram_group_column\') e utilizzato il metodo conteggo \'somma\' (parametro \'counting_mode\')',
	datasetMultidataStats_second_group_column: 'Lista delle colonne per il secondo raggruppamento. Se omessa viene considerata solo la prima serie',
	datasetMultidataStats_second_group_label: 'Lista delle etichette da visualizzare per la seconda serie. Se omessa viene utilizzato la colonna stessa',
	datasetMultidataStats_third_group_column: 'Colonna del dataset per cui effettuare il terzo raggruppamento. Questo raggruppamento viene utilizzato solo nella tabella dei dati',
	datasetMultidataStats_counting_mode: 'Metodo di calcolo delle statistiche: se i dati della seconda serie sono numerici, si possono sommare indicando \'sum\', in alternativa vengono contati i valori',
	datasetMultidataStats_landing_panel: 'Pannello visualizzato al caricamento del widget',
	datasetMultidataStats_chart_height: 'Altezza del grafico',
	datasetMultidataStats_chart_type: 'Tipo di grafico: istogramma verticale o orizzontale',
	datasetMultidataStats_filter: 'Filtro per selezionare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetMultidataStats_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetMultidataStats_top: 'Numero di righe da estrarre',
	datasetMultidataStats_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetMultidataStats_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_dataset_multidata_stats: 'Pannello principale',
	yucca_dataset_multidata_stats_header: 'Header',
	yucca_dataset_multidata_stats_content: 'Body',
	yucca_dataset_multidata_stats_chart: 'Pannello grafico',
	yucca_dataset_multidata_stats_data: 'Pannello dati',
	yucca_dataset_multidata_stats_table: 'Tabella dati',
	yucca_dataset_multidata_stats_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',
	yucca_dataset_multidata_stats_tooltip: 'Tooltip: pannello principale',
	yucca_dataset_multidata_stats_tooltip_header: 'Tooltip: header',
	yucca_dataset_multidata_stats_tooltip_label: 'Tooltip: etichetta nella tabella',
	yucca_dataset_multidata_stats_tooltip_value: 'Tooltip: valore nella tabella',

	/* *************** */
	/* MULTISTREAM VALUE */
	/* *************** */
	streamMultistreamValue_intro: '<p>Widget pensato per visualizzare <strong>l\'ultimo valore</strong> relativi ai componenti di uno o pi&ugrave stream</p>'
		+ '<p>Per ogni componente verr&agrave; visualizzato un <strong>semaforo che indica il livello di guardia dei valori</strong></p>'
		+ '<p>Il widget si connette tramite <strong>Web Socket</strong>, con aggiornamento  automatico  all\'arrivo di un nuovo valore, senza bisogno di ricaricare la pagina</p>',

	/* params */
	streamMultistreamValue_widget_title: 'Titolo del widget',
	streamMultistreamValue_widget_intro: 'Descrizione introduttiva',
	streamMultistreamValue_streams: '<p class="text-left" style="font-size: 11px">Array javascript che indica gli stream da ascoltare. <br>Ogni elemento dell\array &egrave; un oggetto javascript con queste propriet&agrave;:</p>'
		+ '<ul class="text-left"><li><strong>tenantCode</strong>: codice tenant dello stream</li>'
		+ '<li><strong>streamCode</strong>: codice stream</li>'
		+ '<li><strong>smartobjectCode</strong>: codice smartobject dello stream</li>'
		+ '<li><strong>components</strong>: Array con i componenti da visualizzare</li></ul>'
		+ '<p class="text-left">Ogni componente &egrave; a sua volta un oggetto con queste propriet&agrave;:</p>'
		+ '<ul  class="text-left"><li><strong>name</strong>: nome del componente </li>'
		+ '<li><strong>minWarning</strong>: soglia minima sotto la quale il semaforo diventa giallo (livello di warning)</li>'
		+ '<li><strong>minCritical</strong>: soglia minima sotto la quale il semaforo diventa rosso (livello critico)</li>'
		+ '<li><strong>maxWarning</strong>: soglia massima oltre la quale il semaforo diventa giallo (livello di warning)</li>'
		+ '<li><strong>maxCritical</strong>: soglia massima oltre la quale il semaforo diventa rosso (livello critico)</li></ul>'
		+ '<p class="text-left">Esempio di oggetto stream</p>'
		+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">[<br>&nbsp;{"tenantCode":"csp",<br>&nbsp;&nbsp;"streamCode":"H",<br>&nbsp;&nbsp;"smartobjectCode":"a3de712d-6801-5cc4-84b...",<br>&nbsp;&nbsp;"components":'
		+ '[<br>&nbsp;&nbsp;&nbsp;&nbsp;{"name":"value",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"minWarning":"10",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"minCritical":"0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"maxWarning":"30",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"maxCritical":"50"<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;]<br>&nbsp;},<br>...<br>]'
		+ '</code></pre>',
	streamMultistreamValue_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	streamMultistreamValue_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_stream_multistream_value: 'Pannello principale',
	yucca_stream_multistream_value_header: 'Header',
	yucca_stream_multistream_value_content: 'Body',
	yucca_stream_multistream_value_data: 'Pannello dati',
	yucca_stream_multistream_value_table: 'Tabella dati',
	yucca_stream_multistream_value_stream_row: 'Riga che contiene il nome dello stream',
	yucca_stream_multistream_value_component: 'Riga che contiene i dati di un componente',
	yucca_stream_multistream_value_component_bullet: 'Pannello contenente il semaforo',
	bullet_ok: 'Classe del semaforo verde',
	bullet_warning: 'Classe del semaforo giallo',
	bullet_critical: 'Classe del semaforo rosso',
	yucca_stream_multistream_value_component_value: 'Pannello contenente il valore del dato',
	yucca_stream_multistream_component_measureunit: 'Pannello contenente l\'unit&agrave; di misura',
	yucca_stream_multistream_value_lastupdate_bar: 'Pannello contenente la data ultimo aggiornamento',

	/* *************** */
	/* LAST VALUE */
	/* *************** */
	streamLastValue_intro: '<p>Widget pensato per visualizzare <strong>l\'ultimo valore</strong> relativi a uno o  pi&ugrave; compoenti di uno stream</p>'
		+ '<p>Ogni pannello che ha una classe css unica, che permette di <strong>personalizzare</strong> ogni singolo componente (o eventualmente di nasconderlo)</p>',

	/* params */
	streamLastValue_widget_title: 'Titolo del widget, se omesso non viene visualizzato l\'header per dare maggiorre compattezza al widget',
	streamLastValue_widget_intro: 'Descrizione introduttiva',
	streamLastValue_tenant_code: 'Codice tenant dello stream',
	streamLastValue_stream_code: 'Codice dello stream',
	streamLastValue_smartobject_code: 'Codice dello Smartobject',
	streamLastValue_show_lastupdate: 'Flag che indica se visualizzare la data di aggiornamento. La data &egrave; comunque indicata in un tooltip sul valore del dato',
	streamLastValue_labels: 'Array contenente le etichette da visualizzare per ogni componente, in alternativa al nome componente. La dimensione dell\'array deve essere la stessa del numero di componenti visualizzati.',
	streamLastValue_components: 'Array contenente i nomi dei componenti dello stream che si vogliono visualizzare. Se non si indica nulla, vengono visualizzati tutti',
	streamLastValue_chart_type: 'Tipo di grafico: linea o istogramma',
	streamLastValue_chart_height: 'Altezza del grafico',
	streamLastValue_chart_width: 'Larghezza del grafico',
	streamLastValue_chart_color: 'Colore usato nel grafico',
	streamLastValue_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	streamLastValue_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_stream_last_value: 'Pannello principale',
	yucca_stream_last_value_header: 'Header (default nascosto)',
	yucca_stream_last_value_content: 'Body',
	yucca_stream_last_value_data: 'Pannello contenitore dati',
	yucca_stream_last_value_panel: 'Pannello singolo componente',
	yucca_stream_last_value_panel_single: 'Pannello specifico del componente, classe creata dinamicamente partendo da name del componente',
	yucca_stream_last_value_panel_separator: 'Pannello che separa i singoli componenti (visibile solo se ci sono pi&ugrave; componenti)',
	yucca_stream_last_value_component_name: 'Pannello contenente il nome del componente',
	yucca_stream_last_value_component_panel: 'Pannello contenente il valore del dato',
	yucca_stream_last_value_component_value: 'Valore del dato ',
	yucca_stream_last_value_component_value_info: 'Pannello contenente le informazioni realtive al dato: trend di crescita e unit&agrave; di misura',
	yucca_stream_last_value_component_trend: 'Pannello contenente il trend di crescita: a seconda del trend sono poi associate tre ulteriori classi: \'trend_up\' se il dato cresce, ' +
		'\'trend_down\' se il dato decresce, \'trend_stable\' se il dato &egrave; stabile',
	yucca_stream_last_value_component_chart: 'Pannello contenente il grafico dell\'andamento del dati',
	yucca_stream_last_value_component_chart_x_xAxis: 'Asse X del grafico: vengono visualizzati solo il primo e ultimo valore a cui sono associate rispettivamente le classi \'min_value\' e \'max_value\'. ' +
		'Il valore indicato &egrave; una data che &egrave; suddivisa in ora e giorno, a cui sono associate rispettivamente le classi \'value_hour\' e \'value_date\'',
	yucca_stream_last_component_measureunit: 'Pannello contenente l\'unit&agrave; di misura',
	yucca_stream_last_value_lastupdate_bar: 'Pannello contenente la data ultimo aggiornamento (default nascosto)',


	/* *************** */
	/* STREAM MONITOR */
	/* *************** */
	streamMonitor_intro: '<p>Widget pensato per visualizzare <strong>l\'andamento in tempo reale </strong> di a uno o  pi&ugrave; componenti di uno stream</p>'
		+ '<p>Si presenta con un pannello con il grafico e un pannello con una tabella contenente i dati</p>',

	/* params */
	streamMonitor_widget_title: 'Titolo del widget',
	streamMonitor_widget_intro: 'Descrizione introduttiva',
	streamMonitor_tenant_code: 'Codice tenant dello stream',
	streamMonitor_stream_code: 'Codice dello stream',
	streamMonitor_smartobject_code: 'Codice dello Smartobject',
	streamMonitor_components: 'Array contenente i nomi dei componenti dello stream che si vogliono visualizzare. Se non si indica nulla, vengono visualizzati tutti',
	streamMonitor_labels: 'Array contenente le etichette da visualizzare per ogni componente, in alternativa al nome componente. La dimensione dell\'array deve essere la stessa del numero di componenti.',
	streamMonitor_show_lastupdate: 'Flag che indica se visualizzare la data di aggiornamento. La data &egrave; comunque indicata in un tooltip sul valore del dato',
	streamMonitor_chart_type: 'Tipo di grafico: linea o istogramma',
	streamMonitor_landing_panel: 'Pannello visualizzato al caricamento del widget',
	streamMonitor_chart_height: 'Altezza del grafico',
	streamMonitor_chart_width: 'Larghezza del grafico',
	streamMonitor_chart_colors: 'Colori usati nel grafico',
	streamMonitor_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	streamMonitor_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_stream_monitor: 'Pannello principale',
	yucca_stream_monitor_header: 'Header (default nascosto)',
	yucca_stream_monitor_content: 'Body',
	yucca_stream_monitor_chart: 'Pannello contenitore del grafico',
	yucca_stream_monitor_component_chart: 'Pannello contenente il grafico dell\'andamento del dati',
	yucca_stream_monitor_component_chart_x_xAxis: 'Asse X del grafico: vengono visualizzati solo il primo e ultimo valore a cui sono associate rispettivamente le classi \'min_value\' e \'max_value\'. ' +
		'Il valore indicato &egrave; una data che &egrave; suddivisa in ora e giorno, a cui sono associate rispettivamente le classi \'value_hour\' e \'value_date\'',
	yucca_stream_monitor_data: 'Pannello contenitore dati',
	yucca_stream_monitor_table: 'Tabella contentente i dati',
	yucca_stream_monitor_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',
	yucca_stream_monitor_lastupdate_bar: 'Pannello contenente la data ultimo aggiornamento (default nascosto)',

	/* *********************** */
	/* MULTI STREAM   STATS    */
	/* *********************** */

	streamMultistreamStats_intro: '<p>Widget pensato per una visualizzare sulla mappa l\'andamento di uno o pi&ugrave; stream nel tempo.</p>' +
		'<p>Gli stream devono essere omogenei fra di loro, e avere i dati geolocalizzati, inoltre sotto la mappa &egrave; presente uno <strong>slider che permette di scorrere nel tempo</strong></p>' +
		'<p>&Egrave; possibile specificare un range temporale da analizzare (se non viene specificato si considera l\'ultimo giorno)</p>',

	/* params */
	streamMultistreamStats_widget_title: 'Titolo del widget, se omesso non viene visualizzato l\'header per dare maggiorre compattezza al widget',
	streamMultistreamStats_widget_intro: 'Descrizione introduttiva',
	streamMultistreamStats_datasets: 'Codici dei datasets',
	streamMultistreamStats_landing_panel: 'Pannello visualizzato al caricamento del widget',
	streamMultistreamStats_orderby: 'Clausola di ordinamento',
	streamMultistreamStats_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	streamMultistreamStats_time_range: 'Intervallo di tempo su cui calcolare la statistica, in alternativa ai parametri di data minima  e data massima',
	streamMultistreamStats_time_min_date: 'Data iniziale dell\intervallo su cui calcolare la statistica',
	streamMultistreamStats_time_max_date: 'Data finale dell\intervallo su cui calcolare la statistica',
	streamMultistreamStats_top: 'Numero di righe da estrarre',

	/* styles */
	yucca_stream_multistream_stats: 'Widget Panel',
	yucca_stream_multistream_stats_header: 'Widget Header',
	yucca_stream_multistream_stats_stream_name: 'Stream Name',
	yucca_stream_multistream_stats_content: 'Widget Content',
	yucca_stream_multistream_stats_chart: 'Pannello contenente il grafico',
	yucca_stream_multistream_stats_data: 'Pannello contenente i dati',
	yucca_stream_multistream_stats_table: 'Tabella conentente i dati',
	yucca_stream_multistream_stats_component: 'Stream Compent',
	yucca_stream_multistream_stats_component_key: 'Stream Component measure key',
	yucca_stream_multistream_stats_component_value: 'Stream Component measure value',
	yucca_stream_multistream_stats_component_measure_unit: 'Stream Component measure unit',
	yucca_stream_multistream_stats_total_count: 'Totale dati',
	yucca_stream_multistream_stats_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',

	/* *********************** */
	/* TREEMAP      */
	/* *********************** */

	datasetTreemap_intro: '<p>Widget pensato per visualizzare <strong>su una treemap</strong> i dati relativi a un dataset con colonne raggruppabili</p>'
		+ '<p>Sono previsti 3 livelli di navigazione nella treemap.</p>'
		+ '<p>Si presenta con un pannello contente una treemap composta da tanti rettangoli quanti sono i dati del primo livello. '
		+ 'Cliccando sui rettangoli si entra nel dettaglio del secondo livello, dove si pu&ograve; scendere ancora a un terzo livello. </p>'
		+ 'Nel dataset di esempio  c\'&egrave; la suddivisione per provincia, comune e giorno di mercato dei mercati urbani <ul><li>primo livello: la provincia</li>'
		+ '<li>secondo livello: giorno di mercato</li>'
		+ '<li>terzo livello: il comune</li>'
		+ '</ul>',
	/* params */
	datasetTreemap_widget_title: 'Titolo del widget',
	datasetTreemap_widget_intro: 'Descrizione introduttiva',
	datasetTreemap_tenant_code: 'Codice tenant del dataset',
	datasetTreemap_dataset_code: 'Codice del dataset',
	datasetTreemap_chart_title: 'Titolo principale del grafico',
	datasetTreemap_landing_panel: 'Pannello visualizzato al caricamento del widget',
	datasetTreemap_first_level_column: 'Colonna del dataset da cui raggruppare i dati per il primo livello',
	datasetTreemap_first_level_render: '<p class="text-left" style="font-size: 11px">Oggetto javascript che descrive come visualizzare i dati del primo livello.<br> '
		+ 'L\'oggetto ha una propriet&agrave; per ogni valore raggruppato, e a ogni propriet&agrave; &egrave; associato un oggetto che descrive l\'etichetta da usare e il colore. </p>'
		+ '<p class="text-left">Ad esempio se il dataset ha una colonna Provincia in cui sono presenti le sigle delle province, ma sul grafico si volesse il nome, l\'oggetto render &egrave;:</p>'
		+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"TO":{"label":"Torino", "color":"#ffee00"},<br>&nbsp;'
		+ ' "AT":{"label":"Asti", "color":"#67ff77"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
		+ '</code></pre>',
	datasetTreemap_second_level_column: 'Colonna del dataset da cui raggruppare i dati per il secondo livello',
	datasetTreemap_second_level_render: '<p class="text-left" style="font-size: 11px">Oggetto javascript che descrive come visualizzare i dati del secondo livello.<br> '
		+ 'L\'oggetto ha una propriet&agrave; per ogni valore raggruppato, e a ogni propriet&agrave; &egrave; associato un oggetto che descrive l\'etichetta da usare</p>'
		+ '<p class="text-left">Ad esempio se il dataset ha una colonna ISTAT in cui sono presenti i codici istat, ma sul grafico si volesse il nome del comune, l\'oggetto render &egrave;:</p>'
		+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"001272":{"label":"Torino"},<br>&nbsp;'
		+ ' "005005":{"label":"Asti"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
		+ '</code></pre>',
	datasetTreemap_third_level_column: 'Colonna del dataset da cui raggruppare i dati per il terzo livello',
	datasetTreemap_third_level_render: '<p class="text-left" style="font-size: 11px">Oggetto javascript che descrive come visualizzare i dati del terzo livello.<br> '
		+ 'L\'oggetto ha una propriet&agrave; per ogni valore raggruppato, e a ogni propriet&agrave; &egrave; associato un oggetto che descrive l\'etichetta da usare</p>'
		+ '<p class="text-left">Ad esempio se il dataset ha una colonna ISTAT in cui sono presenti i codici istat, ma sul grafico si volesse il nome del comune, l\'oggetto render &egrave;:</p>'
		+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"001272":{"label":"Torino"},<br>&nbsp;'
		+ ' "005005":{"label":"Asti"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
		+ '</code></pre>',
	datasetTreemap_value_column: 'Colonna del dataset da cui ricavare i valori da sommare o contare',
	datasetTreemap_euro_value: 'Indica se il valore conteggiato &egrave; in euro (formatta adeguatamente i valori)',
	datasetTreemap_decimal_value: 'Numero di cifre da usare in caso di valori decimali (default 2)',
	datasetTreemap_counting_mode: 'Metodo di calcolo delle statistiche: se i dati della seconda serie sono numerici, si possono sommare indicando \'sum\', in alternativa vengono contati i valori',
	datasetTreemap_chart_width: 'Larghezza del grafico',
	datasetTreemap_chart_height: 'Altezza del grafico',
	datasetTreemap_filter: 'Filtro per selezionare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetTreemap_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetTreemap_top: 'Numero di righe da estrarre',
	datasetTreemap_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetTreemap_debug: 'Visualizzare le informazioni di debug',


	/* styles */
	yucca_dataset_treemap: 'Pannello principale',
	yucca_dataset_treemap_header: 'Header',
	yucca_dataset_treemap_content: 'Body',
	yucca_dataset_treemap_chart: 'Pannello del grafico',
	yucca_dataset_treemap_chart_message: 'Messaggi nel pannello del grafico visualizzati in fase di caricamento (loading&hellip;) o se non sono presenti dati',
	yucca_dataset_treemap_data: 'Pannello dati',
	yucca_dataset_treemap_table: 'Tabella dati',
	yucca_dataset_treemap_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',
	legend: 'Pannello contenente la legenda del grafico. Contenuto in un pannello con id <strong>treemapPanel</strong>',
	legend_label: 'Etichetta con valore minimo e massimo nella legenda. Contenuto in un pannello con id <strong>treemapPanel</strong>',
	legend_bullet: 'Box con colore della legenda. Contenuto in un pannello con id <strong>treemapPanel</strong>',

	/* *********************** */
	/* MULTI DATA TREEMAP      */
	/* *********************** */

	datasetMultidataTreemap_intro: '<p>Widget pensato per visualizzare <strong>su una treemap</strong> i dati relativi a dataset con dati raggruppabili suddivisi su pi&ugrave; colonne</p>'
		+ '<p>Sono previsti 3 livelli di navigazione nella treemap pi&ugrave; un (opzionale) valore realtivo a una percentuale sull\'ultimo livello.</p>'
		+ '<p>Si presenta con un pannello contente una treemap composta da tanti rettangoli quanti sono i dati del primo livello. '
		+ 'Cliccando sui rettangoli si entra nel dettaglio del secondo livello, dove si pu&ograve; scendere ancora a un terzo livello. Il valore percentuale (eventuale) viene visualizzato tramite la luminosit&agrave; dei rettangoli al terzo livello.</p>'
		+ 'Nel dataset di esempio  c\'&egrave; la suddivisione per comune del riciclo dei rifiuti urbani <ul><li>primo livello: tipo di rifiuto (vetro, carta &hellip;)</li>'
		+ '<li>secondo livello: quantit&agrave; suddivisa per provincia</li>'
		+ '<li>terzo livello: quantit&agrave; suddivisa per comune</li>'
		+ '<li>quarto livello: percentuale di riciclo per comune</li></ul>',
	/* params */
	datasetMultidataTreemap_widget_title: 'Titolo del widget',
	datasetMultidataTreemap_widget_intro: 'Descrizione introduttiva',
	datasetMultidataTreemap_tenant_code: 'Codice tenant del dataset',
	datasetMultidataTreemap_dataset_code: 'Codice del dataset',
	datasetMultidataTreemap_chart_title: 'Titolo principale del grafico',
	datasetMultidataTreemap_euro_value: 'Indica se il valore conteggiato &egrave; in euro (formatta adeguatamente i valori)',
	datasetMultidataTreemap_decimal_value: 'Numero di cifre da usare in caso di valori decimali (default 2)',
	datasetMultidataTreemap_landing_panel: 'Pannello visualizzato al caricamento del widget',
	datasetMultidataTreemap_first_group_column: 'Lista delle colonne del dataset da cui fare il raggruppamento principale',
	datasetMultidataTreemap_colors: 'Colori da utilizzare nel grafico per distinguere la prima serie',
	datasetMultidataTreemap_first_group_label: 'Lista delle etichette da visualizzare per la seconda serie. Se omessa viene utilizzato la colonna stessa',
	datasetMultidataTreemap_second_group_column: 'Colonna del dataset per il secondo raggruppamento',
	datasetMultidataTreemap_third_group_column: 'Colonna del dataset per cui effettuare il terzo raggruppamento',
	datasetMultidataTreemap_fourth_group_column: 'Colonna indicate il valore in percentuale da rappresentare nell\'ultimo livello',
	datasetMultidataTreemap_counting_mode: 'Metodo di calcolo delle statistiche: se i dati della seconda serie sono numerici, si possono sommare indicando \'sum\', in alternativa vengono contati i valori',
	datasetMultidataTreemap_chart_width: 'Larghezza del grafico',
	datasetMultidataTreemap_chart_height: 'Altezza del grafico',
	datasetMultidataTreemap_filter: 'Filtro per selezionare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetMultidataTreemap_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetMultidataTreemap_top: 'Numero di righe da estrarre',
	datasetMultidataTreemap_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetMultidataTreemap_debug: 'Visualizzare le informazioni di debug',




	/* styles */
	yucca_dataset_multidata_treemap: 'Pannello principale',
	yucca_dataset_multidata_treemap_header: 'Header',
	yucca_dataset_multidata_treemap_content: 'Body',
	yucca_dataset_multidata_treemap_chart: 'Pannello del grafico',
	yucca_dataset_multidata_treemap_chart_message: 'Messaggi nel pannello del grafico visualizzati in fase di caricamento (loading&hellip;) o se non sono presenti dati',
	yucca_dataset_multidata_treemap_data: 'Pannello dati',
	yucca_dataset_multidata_treemap_table: 'Tabella dati',
	yucca_dataset_multidata_treemap_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',
	legend: 'Pannello contenente la legenda del grafico. Contenuto in un pannello con id <strong>treemapPanel</strong>',
	legend_label: 'Etichetta con valore minimo e massimo nella legenda. Contenuto in un pannello con id <strong>treemapPanel</strong>',
	legend_bullet: 'Box con colore della legenda. Contenuto in un pannello con id <strong>treemapPanel</strong>',

	/* *************** */
	/* MULTIDATA STATS */
	/* *************** */
	datasetMultidataStats_intro: '<p>Widget pensato per visualizzare con un <strong>istogramma dati e statistiche</strong> relativi a dataset con colonne raggruppabili.</p>'
		+ '<p>Si possono indicare fino a tre gruppi di dati</p>'
		+ '<p>Si presenta con un istogramma con tante colonne quante sono le serie di dati indicati e un secondo pannello con una tabella navigabile contente i dati.</p>',




	/* params */
	datasetMultidataStats_widget_title: 'Titolo del widget',
	datasetMultidataStats_widget_intro: 'Descrizione introduttiva',
	datasetMultidataStats_tenant_code: 'Codice tenant del dataset',
	datasetMultidataStats_dataset_code: 'Codice del dataset',
	datasetMultidataStats_first_group_column: 'Colonna del dataset da cui fare il raggruppamento principale',
	datasetMultidataStats_first_group_colors: 'Colori da utilizzare nel grafico per distinguere la prima serie',
	datasetMultidataStats_second_group_column: 'Lista delle colonne per il secondo raggruppamento. Se omessa viene considerata solo la prima serie',
	datasetMultidataStats_second_group_label: 'Lista delle etichette da visualizzare per la seconda serie. Se omessa viene utilizzato la colonna stessa',
	datasetMultidataStats_third_group_column: 'Colonna del dataset per cui effettuare il terzo raggruppamento. Questo raggruppamento viene utilizzato solo nella tabella dei dati',
	datasetMultidataStats_counting_mode: 'Metodo di calcolo delle statistiche: se i dati della seconda serie sono numerici, si possono sommare indicando \'sum\', in alternativa vengono contati i valori',
	datasetMultidataStats_landing_panel: 'Pannello visualizzato al caricamento del widget',
	datasetMultidataStats_chart_height: 'Altezza del grafico',
	datasetMultidataStats_chart_type: 'Tipo di grafico: istogramma verticale o orizzontale',
	datasetMultidataStats_filter: 'Filtro per selezionare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetMultidataStats_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetMultidataStats_top: 'Numero di righe da estrarre',
	datasetMultidataStats_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetMultidataStats_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_dataset_multidata_stats: 'Pannello principale',
	yucca_dataset_multidata_stats_header: 'Header',
	yucca_dataset_multidata_stats_content: 'Body',
	yucca_dataset_multidata_stats_chart: 'Pannello grafico',
	yucca_dataset_multidata_stats_data: 'Pannello dati',
	yucca_dataset_multidata_stats_table: 'Tabella dati',
	yucca_dataset_multidata_stats_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',
	yucca_dataset_multidata_stats_tooltip: 'Tooltip: pannello principale',
	yucca_dataset_multidata_stats_tooltip_header: 'Tooltip: header',
	yucca_dataset_multidata_stats_tooltip_label: 'Tooltip: etichetta nella tabella',
	yucca_dataset_multidata_stats_tooltip_value: 'Tooltip: valore nella tabella',

	/* ******************** */
	/* DATASET BULLET CHART */
	/* ******************** */
	datasetBulletChart_intro: '<p>Widget pensato per visualizzare uno o pi&ugrave; <strong>bullet chart</strong> relativi a <strong>singoli</strong> dati di un dataset</p>'
		+ '<p>Si possono specificare uno o pi&ugrave; dati su cui creare il grafico, indicando la colonna da prendere in cosiderazione per visualizzare il valore corrente.</p>'
		+ '<p>&Egrave; possibile <strong>specificare il range</strong> da visualizzare (valore minimo, valore massimo e valore medio), o lasciare che questi valori siano <strong>calcolati</strong> dal widget utilizzando i primi 10.000 record</p>'
		+ '<p>&Egrave; possibile indicare <strong>altri marker</strong> da inserire sulla barra indicatrice, con le relative etichette</p>',

	/* params */
	datasetBulletChart_widget_title: 'Titolo del widget',
	datasetBulletChart_widget_intro: 'Descrizione introduttiva',
	datasetBulletChart_tenant_code: 'Codice tenant del dataset',
	datasetBulletChart_dataset_code: 'Codice del dataset',
	datasetBulletChart_internal_ids: 'Internal ID dei dataset da considerare.',
	datasetBulletChart_filter_ids: 'Filtro OData per effetture una query e ricavare i singoli dati su cui disegnare il grafico. Ogni dato ha un suo grafico. La query &egrave; limitata a un massimo di 50 record. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetBulletChart_current_value_column: 'Colonna indicante il valore da visualizzare',
	datasetBulletChart_range_values: 'Array con i range: valore minimo, valore medio e valore massimo. Se non specificato e non specificato l\'array delle colonne (parametro successivo), vengono calcolati fra i primi 10.000 dati del dataset',
	datasetBulletChart_range_column_values: 'Array con le colonne da cui recuperare i valori dei range: colonna per valore minimo, colonna per valore medio e colonna per valore massimo.  Se non specificato e non specificato l\'array dei valori (parametro precedente), vengono calcolati fra i primi 10.000 dati del dataset',
	datasetBulletChart_bar_title_column: 'Colonna del dataset da cui prendere l\'etichetta per il titolo della barra',
	datasetBulletChart_bar_subtitle_colum: 'Colonna del dataset da cui prendere l\'etichetta per il sottotitolo della barra',
	datasetBulletChart_filter: 'Filtro per selezionare i dati da analizzare, si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetBulletChart_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetBulletChart_top: 'Numero di righe da estrarre',
	datasetBulletChart_euro_value: 'Indica se il valore conteggiato &egrave; in euro (formatta adeguatamente i valori)',
	datasetBulletChart_decimal_value: 'Numero di cifre da usare in caso di valori decimali (default 2)',
	datasetBulletChart_previous_value_column: 'Colonna indicante il valore precedente da visualizzare',
	datasetBulletChart_bar_colors: 'Lista dei colori da usare per i bullet chart. I colori vengono usati uno per grafico ciclicamente',
	datasetBulletChart_bar_title_label: 'Etichetta per il titolo della barra (da usare in alternativa a datasetBulletChart_bar_title_column)',
	datasetBulletChart_bar_subtitle_label: 'Etichetta per il sottotitolo della barra (da usare in alternativa a datasetBulletChart_bar_subtitle_colum)',
	datasetBulletChart_average_values: 'Effettua la media dei valori, restituendo un unico bullet chart. <strong>Se specificati gli Internal ID (paramentro \'internal_ids\'), la media NON viene calcolata, ma viene creato un bullet chart per ogni dato</strong>',
	datasetBulletChart_range_labels: 'Etichetta da utilizzare nel tooltip per indicare il valore minimo, massimo e medio. Default: Minumum, Mean, Maximun',
	datasetBulletChart_measure_labels: 'Etichetta da utilizzare nel tooltip per indicare il valore corrente. Default: Current',
	datasetBulletChart_custom_markers: 'Lista di valori per ulteriori marker da inserire sulla barra',
	datasetBulletChart_custom_marker_columns: 'Colonne i cui valori verranno visualizzati come marker',
	datasetBulletChart_marker_labels: 'Etichette relative ai marker aggiuntivi',
	datasetBulletChart_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetBulletChart_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_dataset_bullet_chart: 'Pannello principale',
	yucca_dataset_bullet_chart_header: 'Header',
	yucca_dataset_bullet_chart_content: 'Body',
	yucca_dataset_bullet_chart_chart: 'Pannello del grafico',
	yucca_dataset_bullet_chart_tooltip: 'Pannello del tooltip',


	/* ******************** */
	/* DATASET SANKEY CHART */
	/* ******************** */
	datasetSankeyChart_intro: '<p>Widget pensato per visualizzare un diagramma di Sankey realtivamente ai dati di un dataset</p>'
		+ '<p>Si possono <strong>specificare due o pi&ugrave; colonne</strong> e il widget <strong>calcola in automatico</strong> i link fra di esse, rispettando l\'ordine di inserimento.</p>'
		+ '<p>&Egrave; possibile <strong>specificare direttamente i nodi e link</strong> con cui creare il diagramma, in questo caso la piattaforma Yucca non viene contattata, e i dati visualizzati sono esclusivamente quelli in input</p>',

	/* params */
	datasetSankeyChart_widget_title: 'Titolo del widget',
	datasetSankeyChart_widget_intro: 'Descrizione introduttiva',
	datasetSankeyChart_tenant_code: 'Codice tenant del dataset',
	datasetSankeyChart_dataset_code: 'Codice del dataset',

	datasetSankeyChart_node_columns: 'Colonne da considerare nel calcolo automatico dei nodi',
	datasetSankeyChart_filter: 'Filtro per selezionare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetSankeyChart_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetSankeyChart_top: 'Numero di righe da estrarre',
	datasetSankeyChart_chart_width: 'Larghezza del grafico in pixel (default 600px)',
	datasetSankeyChart_chart_height: 'Altezza del grafico in pixel (default 400px)',
	datasetSankeyChart_sankey_nodes: 'Nodi da usare, se specificato insieme ai link (parametro successivo),la piattaforma yucca non viene contattata e vengono visualizzati nodi e link indicati. <a href="./sankeyDemoData.json" target="_blank">Esempio di formattazione dei nodi/link</a>',
	datasetSankeyChart_sankey_links: 'Link da usare, se specificato insieme ai nodi (parametro precedente),la piattaforma yucca non viene contattata e vengono visualizzati nodi e link indicati. <a href="./sankeyDemoData.json" target="_blank">Esempio di formattazione dei nodi/link</a>',
	datasetSankeyChart_sankey_node_render: '<p class="text-left" style="font-size: 11px">Oggetto javascript che descrive come visualizzare i nodi.<br> '
		+ 'L\'oggetto ha una propriet&agrave; con chiave <i>nome_colonna_valore_nodo</i> a cui &egrave; associato un oggetto che descrive l\'etichetta da usare e il colore, e se sfumare il colore (fader). </p>'
		+ '<p class="text-left">Ad esempio se il dataset ha una colonna Provincia in cui sono presenti le sigle delle province, ma sul grafico si volesse il nome, l\'oggetto render &egrave;:</p>'
		+ '<pre  style="font-size: 12px!important;" class="text-left"><code  style="width:100%; font-size: 12px;">{<br>&nbsp;{"Prov_TO":{"label":"Torino", "color":"#ffee00", "fader": "true"},<br>&nbsp;'
		+ ' "Prov_AT":{"label":"Asti", "color":"#67ff77", "fader": "true"}<br>&nbsp;&nbsp; &hellip;<br>&nbsp;}<br>}'
		+ '</code></pre>',
	datasetSankeyChart_base_color: 'Colore base da usare per i nodi quando non viene specificato il colore nel render',
	datasetSankeyChart_counting_mode: 'Metodo di calcolo delle statistiche: se i dati della seconda serie sono numerici, si possono sommare indicando \'sum\', in alternativa vengono contati i valori',
	datasetSankeyChart_value_column: 'Colonna del dataset da cui ricavare i valori da sommare o contare',
	datasetSankeyChart_euro_value: 'Indica se il valore conteggiato &egrave; in euro (formatta adeguatamente i valori)',
	datasetSankeyChart_decimal_value: 'Numero di cifre da usare in caso di valori decimali (default 2)',
	datasetSankeyChart_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetSankeyChart_debug: 'Visualizzare le informazioni di debug',

	/* styles */
	yucca_dataset_sankey: 'Pannello principale',
	yucca_dataset_sankey_header: 'Header',
	yucca_dataset_sankey_loading: 'Pannello loading',
	yucca_dataset_sankey_content: 'Body',
	yucca_dataset_sankey_chart: 'Pannello del grafico',


	/* ****************** */
	/* POULATION PYRAMID  */
	/* ****************** */
	datasetPopulationPyramid_intro: '<p>Widget pensato per visualizzare una <strong>piramide della popolazione</strong> relativi a dataset i cui dati siano suddivisibili in 2 gruppi (maschi e femmine), e raggruppabili per un\'altra colonna (le et&agrave;).</p>'
		+ '<p>Si presenta con due istogrammi orizzontali disposti in maniera speculare e un secondo pannello con una tabella navigabile contente i dati.</p>',

	/* params */
	datasetPopulationPyramid_widget_title: 'Titolo del widget',
	datasetPopulationPyramid_widget_intro: 'Descrizione introduttiva',
	datasetPopulationPyramid_tenant_code: 'Codice tenant del dataset',
	datasetPopulationPyramid_dataset_code: 'Codice del dataset',
	datasetPopulationPyramid_gender_column: 'Colonna del dataset in cui &egrave; indicato il genere (maschio o femmina), in generale colonna in cui ci sono i due valori su cui fare i due istogrammi speculari',
	datasetPopulationPyramid_age_column: 'Colonna del dataset in cui vengono indicate le fasce di et&agrave;, in generale colonna in cui ci sono i valori da raggruppare',
	datasetPopulationPyramid_age_values: 'Valori da prendere in considerazione per la suddivisione in fasce di et&agrave;. Utile nel caso si vogliano solo considerare alcune fasce, o si voglia avere un ordinamento delle fasce',
	datasetPopulationPyramid_gender_values: 'Valori usati per distinguere il genere (default M, F), in generale valori usati per distinguere i dati per i due istogrammi speculari',
	datasetPopulationPyramid_gender_colors: 'Colori usati per i due istogrammi speculari (default rosa e azzurro)',
	datasetPopulationPyramid_gender_labels: 'Etichette usate per i due istogrammi speculari (default F e M)',
	datasetPopulationPyramid_age_labels: 'Etichette usate per le fasce di et&agrave; (default i valori trovati)',
	datasetPopulationPyramid_counting_mode: 'Metodo di calcolo delle statistiche: \'count\'conta le occorrenze, \'sum\' somma i valori nella colonna specificata dal parametro \'value_column\'',
	datasetPopulationPyramid_value_column: 'Colonna contenente i valori da sommare se il tipo di conteggio &egrave; di tipo somma (parametro counting_mode = \'sum\')',
	datasetPopulationPyramid_landing_panel: 'Pannello visualizzato al caricamento del widget',
	datasetPopulationPyramid_chart_height: 'Altezza del grafico',
	datasetPopulationPyramid_chart_type: 'Tipo di grafico: istogramma verticale o orizzontale',
	datasetPopulationPyramid_filter: 'Filtro per selezionare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetPopulationPyramid_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetPopulationPyramid_top: 'Numero di righe da estrarre',
	datasetPopulationPyramid_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetPopulationPyramid_debug: 'Visualizzare le informazioni di debug',


	/* styles */
	yucca_dataset_population_pyramid: 'Pannello principale',
	yucca_dataset_population_pyramid_header: 'Header',
	yucca_dataset_population_pyramid_content: 'Body',
	yucca_dataset_population_pyramid_chart: 'Pannello grafico',
	yucca_dataset_population_pyramid_data: 'Pannello dati',
	yucca_dataset_population_pyramid_table: 'Tabella dati',
	yucca_dataset_population_pyramid_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',
	yucca_dataset_population_pyramid_tooltip: 'Tooltip: pannello principale',
	yucca_dataset_population_pyramid_tooltip_header: 'Tooltip: header',
	yucca_dataset_population_pyramid_tooltip_label: 'Tooltip: etichetta nella tabella',
	yucca_dataset_population_pyramid_tooltip_value: 'Tooltip: valore nella tabella',


	/* ****************** */
	/* CHOROPLETH MAP  */
	/* ****************** */
	datasetChoroplethMap_intro: '<p>Widget pensato per visualizzare una <strong>Mappa coropletica</strong> relativa a un dataset contenente il risultato di calcoli statistici suddivisi per aree (es densit&agrave; popolazione per province).</p>'
		+ '<p>Le aree della mappa devono essere disponibili a una url raggiungibile, in formato <strong>GeoJson</strong>. Il widget mette a disposizione le aree relative alle province del Piemonte</p>'
		+ '<p>Nelle features del file GeoJson delle aree, deve essere presente una properties che identifica l\'area (es provincia:Torino), che deve corrispondere al valore di una delle colonne del dataset (esempio nel dataset ci sar&agrave; una colonna chiamata provincia che avr&agrave; al suo interno un dato con valore Torino).</p>'
		+ '<p>Nella configurazione si dovr&agrave; indicare il nome della colonna relativa alla chiave dell\'area e il nome della colonna relativa al valore da rappresentare (la densit&agrave;)</p>'
		+ '<p>Tramite parametri di configurazione &egrave; possibile <strong>personalizzare la mappa nei colori, nelle linee nello sfondo</strong></p>',

	/* params */
	datasetChoroplethMap_widget_title: 'Titolo del widget',
	datasetChoroplethMap_widget_intro: 'Descrizione introduttiva',
	datasetChoroplethMap_tenant_code: 'Codice tenant del dataset',
	datasetChoroplethMap_dataset_code: 'Codice del dataset',
	datasetChoroplethMap_geojson_url: 'Url del file GeoJson da utilizzare (se non specificato verranno usate le province del Piemonte)',
	datasetChoroplethMap_geojson_areas_key: 'Chiave per identificare le aree all\interno del file GeoJson. Il valore delle chiavi dovr&agrave; corrispondere a quello presente nel dataset',
	datasetChoroplethMap_dataset_areas_key_column: 'Colonna del dataset  al cui interno c\'&egrave; il dato per identificare l\area sulla mappa. Il valore dovr&agrave; corrispondere a quello presente nel file GeoJson',
	datasetChoroplethMap_dataset_areas_value_column: 'Colonna del dataset con il dato da rappresentare sulla mappa',
	datasetChoroplethMap_area_base_color: 'Colore di base della mappa. I valori modificando la luminosit&agrave;',
	datasetChoroplethMap_skip_zero_values: 'Flag per indicare se nel calcolo dei colori, si devono escludere i dati con valore zero (che verranno rappresentati in grigio sulla mappa)',
	datasetChoroplethMap_counting_mode: 'Metodo di calcolo delle statistiche: se i dati della seconda serie sono numerici, si possono sommare indicando \'sum\', in alternativa vengono contati i valori',
	datasetChoroplethMap_show_legend: 'Flag per indicare se visualizzare la legenda',
	datasetChoroplethMap_euro_value: 'Indica se il valore conteggiato &egrave; in euro (formatta adeguatamente i valori)',
	datasetChoroplethMap_decimal_value: 'numero di cifre da usare in caso di valori decimali (default 2)',
	datasetChoroplethMap_zoom_control: 'Flag per indicare se visualizzare i controlli per lo zoom',
	datasetChoroplethMap_scroll_wheel_zoom: 'Flag per indicare effettuare lo zoom tramite la rotella del mouse',
	datasetChoroplethMap_legend_position: 'Posizione della legenda',
	datasetChoroplethMap_map_tiles_url: 'Url delle tiles (grafica) da utilizzare sulla mappa. Se si indica una url non valida la mappa resta grigia, ma le aree colorate vengono visualizzate ugualmente',
	datasetChoroplethMap_map_line_weight: 'Spessore della riga che separa le aree (confini)',
	datasetChoroplethMap_map_line_opacity: 'Trasparenza della riga che separa le aree (confini)',
	datasetChoroplethMap_map_line_dash_color: 'Colore della riga che separa le aree (confini)',
	datasetChoroplethMap_map_line_dash_array: 'Livello di tratteggio della riga che separa le aree (confini)',
	datasetChoroplethMap_map_areas_fill_opacity: 'Trasparenza del colore sull\'area',
	datasetChoroplethMap_filter: 'Filtro per selezionare i dati da analizzare. Si utilizza il formato OData: sono validi gli operatori \'eq, ne, gt, ge, lt, le, and, or\'. Esempio: nome_colonna eq valore_dato',
	datasetChoroplethMap_dataset_areas_key_label: 'Etichetta da utilizzare per visualizzare la chiave nel tooltip',
	datasetChoroplethMap_dataset_areas_values_label: 'Etichetta da utilizzare per visualizzare il dato nel tooltip ',
	datasetChoroplethMap_skip: 'Numero riga da cui iniziare l\'estrazione ',
	datasetChoroplethMap_top: 'Numero di righe da estrarre',
	datasetChoroplethMap_user_token: 'Usertoken, da utilizzare in caso di stream privati',
	datasetChoroplethMap_debug: 'Visualizzare le informazioni di debug',


	/* Discretebar Chart */
	basicDatasetDiscretebarChart: 'Grafico a barre',

	help_intro_basicDatasetDiscretebarChart: 'Con questo widget si rappresenta la distribuzione in classi di un carattere continuo',
	help_datasource_basicDatasetDiscretebarChart: 'Il widget si aspetta un dataset che abbia una colonna su cui raggruppare i dati che sar&agrave; rappresentata' +
		'sull\'asse X ("Colonna su cui raggruppare"), e una colonna con i valori da conteggiare, che verr&agrave; rappresentata sull\'asse Y ("Colonna con il valore"). Questa seconda colonna potr&agrave; avere dei valori da sommare, o ' +
		' anche semplicemente delle occorrenze non sommabili da conteggiare',
	help_datasource_example_basicDatasetDiscretebarChart: '<p>Nell\'esempio dell\'immagine, il dataset analizzato aveva una serie di righe con \
								conteggi arrivi turistici, per provincia, anno e settore, nel grafico si &egrave; scelto raggruppare per provincia</p>\
	<table class="table help-widget-table-example"><thead>\
		<tr class="params-hint"><th>&nbsp;</th><th>Colonna su cui raggruppare</th><th>Colonne con i valori</th><th>&nbsp;</th></tr>\
		<tr><th>Anno</th><th><span class="help-widget-serie-1">Provincia</span></th><th>Arrivi Totali</th></tr>\
		</thead>\
	<tbody><tr><td>2008</td><td>BI</td><td>642</td></tr>\
	       <tr><td>2014</td><td>NO</td><td>670</td></tr>\
		   <tr><td>2018</td><td>CN</td><td>506</td></tr>\
		</tbody></table>',
	//		   <tr><td>2005</td><td>AT</td><td>SETTORE EXTRALBERGHIERO</td><td>8004</td></tr>\
	//		   <tr><td>2008</td><td>TO</td><td>SETTORE ALBERGHIERO</td><td>1000466</td></tr>\
	//		   <tr><td>2014</td><td>CN</td><td>SETTORE EXTRALBERGHIERO</td><td>9422</td></tr>\
	help_listen_events_basicDatasetDiscretebarChart: '<ul><li>Cambio colonna su cui raggruppare</li><li>Cambio colonna su cui contare</li><li>Cambio criteri di filtro oData</li></ul>',
	help_sent_events_basicDatasetDiscretebarChart: '<ul><li>Evidenziazione di una barra del diagramma</li></ul>',
	help_related_widget_basicDatasetDiscretebarChart: '<ul><li>Tabella distribuzioni</li><li>Data explorer</li></ul>',

	/* Pie Chart */
	basicDatasetPieChart: 'Grafico a torta/ciambella',

	help_intro_basicDatasetPieChart: 'Con questo widget si rappresenta la distribuzione di dati in classi di categorie non ordinabili. La rappresentazione grafica \
		potrà essere personalizzata, nella scelta dei colori e della forma (torta, ciambella, spicchio di torta/ciambella)',
	help_datasource_basicDatasetPieChart: 'Il widget si aspetta un dataset che abbia una colonna su cui raggruppare i dati \
		(indicata dal parametro "Colonna su cui raggruppare"), e una colonna con i valori (indicata dal parametro "Colonna con il valore")',
	help_datasource_example_basicDatasetPieChart: '<table class="table help-widget-table-example"><thead>\
		<tr class="params-hint"><th>Colonna ignorata</th><th>Colonna su cui raggruppare</th><th>Colonna ignorata</th><th>Colonna con i valori</th></tr>\
		<tr><th>Anno</th><th><span class="help-widget-serie-1">Provincia</span></th><th>Settore</th><th>Arrivi Totali</th></tr></thead>\
	<tbody><tr><td>2008</td><td>BI</td><td>SETTORE EXTRALBERGHIERO</td><td>642</td></tr>\
	       <tr><td>2014</td><td>NO</td><td>SETTORE EXTRALBERGHIERO</td><td>670</td></tr>\
		   <tr><td>2018</td><td>CN</td><td>SETTORE EXTRALBERGHIERO</td><td>506</td></tr>\
		</tbody></table>',
	help_listen_events_basicDatasetPieChart: '<ul><li>Cambio colonna su cui raggruppare</li><li>Cambio colonna su cui contare</li><li>Cambio criteri di filtro oData</li></ul>',
	help_sent_events_basicDatasetPieChart: '<ul><li>Evidenziazione di una fetta di torta</li></ul>',
	help_related_widget_basicDatasetPieChart: '<ul><li>Tabella distribuzioni</li><li>Data explorer</li></ul>',

	/* linechart */
	basicDatasetLineChart: 'Grafico a linea',
	help_intro_basicDatasetLineChart: 'Con questo Widget si rappresenta l\'andamento nel tempo di una o più serie di valori',
	help_datasource_basicDatasetLineChart: 'Il widget si aspetta un dataset in cui ci sia una colonna per il tempo con dati numeric (identificata dal parametro "Colonna del tempo") e una o più colonne con dei valori numerici (identificate dal parametro "Colonne con i valori")',
	help_datasource_example_basicDatasetLineChart: '<table class="table help-widget-table-example"><thead>\
		<tr class="params-hint"><th>Colonna del tempo</th><th colspan="2">Colonne con i valori</th><th>&nbsp;</th></tr>\
		<tr><th>Anno</th><th><span class="help-widget-serie-1">Arrivi italiani</span></th><th><span class="help-widget-serie-3">Arrivi Stranieri</span></th></tr></thead>\
		<tbody><tr><td>2008</td><td>123555</td><td>52344</td></tr>\
		       <tr><td>2014</td><td>130696</td><td>42365</td></tr>\
			   <tr><td>2018</td><td>156852</td><td>68221</td></tr>\
			</tbody></table>',
	help_listen_events_basicDatasetLineChart: '<ul><li>Cambio colonna raggruppamento</li><li>Filtro query oData</li></ul>',
	help_sent_events_basicDatasetLineChart: '<i>Questo widget non rilancia eventi</i>',
	help_related_widget_basicDatasetLineChart: '<ul><li>Data explorer</li></ul>',


	/* multichart */
	basicDatasetMultiChart: 'Grafico multiplo',
	help_listen_events_basicDatasetMultiChart: '<ul><li>Cambio colonna raggruppamento</li><li>Filtro query oData</li></ul>',
	help_sent_events_basicDatasetMultiChart: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicDatasetMultiChart: 'Con questo Widget si possono visualizzare più serie di dati in modo da poterne confrontare i risultati.\
		Per ogni serie di dati si può personalizzare il tipo di grafico (linea, istogramma, area), i colori, il tipo di tratteggio, l\'asse Y a cui fare rifermento (è possibile specificare 2 assi Y diversi, con scale diverse)',
	help_datasource_basicDatasetMultiChart: 'Il grafico necessita di una colonna per il tempo che sarà visualizzata sull\'asse X indicata dal parametro "Colonna su cui raggruppare"\
		e una colonna con i valori per ogni serie di dati indicate nel parametro "Colonne con i valori"',
	help_datasource_example_basicDatasetMultiChart: '<table class="table help-widget-table-example"><thead>\
			<tr class="params-hint"><th>Colonna su cui raggruppare</th><th colspan="3">Colonne con i valori</th><th>&nbsp;</th></tr>\
			<tr><th>Anno</th><th><span class="help-widget-serie-1">Dati Istogramma</span></th><th><span class="help-widget-serie-2">Dati Line</span></th><th><span class="help-widget-serie-3">Dati Area</span></th></tr></thead>\
			<tbody><tr><td>2008</td><td>123555</td><td>52344</td><td>32429</td></tr>\
			       <tr><td>2014</td><td>130696</td><td>42365</td><td>45302</td></tr>\
				   <tr><td>2018</td><td>156852</td><td>68221</td><td>2134</td></tr>\
				</tbody></table>',
	help_related_widget_basicDatasetMultiChart: '<ul><li>Tabella distribuzioni</li><li>Data explorer</li></ul>',


		
	/* multibarchart */
	basicDatasetMultibarChart: 'Grafico a barre multiplo',
	help_listen_events_basicDatasetMultibarChart: '<ul><li>Cambio colonna raggruppamento</li><li>Filtro query oData</li></ul>',
	help_sent_events_basicDatasetMultibarChart: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicDatasetMultibarChart: 'Con questo Widget si possono confrontare più serie di dati raggruppate per categoria',
	help_datasource_basicDatasetMultibarChart: 'Sono previste due modalità di raggruppamento dei dati<br><strong>Raggruppamento per colonne</strong><br>\
    	Le serie vengono identificate in base a diverse colonne del dataset indicate nel parametro "Colonne per serie di dati" e raggruppate \
		in base ai valori presenti nella colonna indicata dal parametro "Colonna su cui raggruppare".<br><br>\
		<strong>Serie da valori raggruppamento</strong><br>\
    	Le serie vengono identificate in base ai valori ottenuti dal raggruppamento dei dati in base alla colonna indicata dal parametro "Colonna su cui raggruppare" \
		e successivamente ulteriormente raggruppate utilizzando le colonne indicate nel parametro "Colonne con le serie"<br>Per questa modalià è \
		previsto un ulteriore parametro opzionale per specificare la label da utilizzare per le serie ricavate', 
    
    	
    	help_datasource_example_basicDatasetMultibarChart:'<p><strong>Raggruppamento per valori</strong><br></p>\
    	<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th>Colonna su cui raggruppare</th><th colspan="3">Colonne con i valori</th></tr>\
    	<tr><th>Professione</th><th>2015</th><th>2016</th><th>2017</th></tr></thead>\
    	<tbody><tr><td><span class="help-widget-serie-2">Impiegato</span></td><td>14</td><td>92</td><td>21</td></tr>\
    		<tr><td><span class="help-widget-serie-1">Operaio</span></td><td>73</td><td>90</td><td>18</td></tr>\
    		<tr><td><span class="help-widget-serie-3">Imprenditore</span></td></td><td>27</td><td>11</td><td>43</td></tr>\
    		<tr><td><span class="help-widget-serie-3">Imprenditore</span></td></td><td>32</td><td>44</td><td>9</td></tr>\
    	</tbody></table>\
    		<p><strong>Serie da valori raggruppamento</strong><br></p>\
        	<table class="table help-widget-table-example"><thead>\
        	<tr class="params-hint"><th>Colonna su cui raggruppare</th><th colspan="2">Colonne per serie di dati</th><th>&nbsp;</th></tr>\
        	<tr><th>Anno</th><th><span class="help-widget-serie-2">Uomini</span></th><th><span class="help-widget-serie-1">Donne</span></th><th><span class="help-widget-serie-3">Professione</span></th></tr></thead>\
        	<tbody><tr><td>2015</td><td>124</td><td>62</td><td>Operaio</td></tr>\
    			<tr><td>2015</td><td>124</td><td>132</td><td>Impiegato</td></tr>\
        		<tr><td>2015</td><td>48</td><td>42</td><td>Imprenditore</td></tr>\
        		<tr><td>2016</td><td>102</td><td>52</td><td>Operaio</td></tr>\
        	</tbody></table>',
        	
	help_related_widget_basicDatasetMultibarChart: '<ul><li>Tabella distribuzioni</li><li>Data explorer</li></ul>',
	/* horizontalmultibarchart */
	basicDatasetHorizontalmultibarChart: 'Grafico a barre orizzontale',

	param_horizontalmultibar_serie_columns: 'Colonne per serie di dati',
	help_inline_horizontalmultibar_value_columns: 'Le serie di dati visualizzati verranno calcolate a partire dalle colonne indicate',
	param_horizontalmultibar_value_columns: 'Valori per serie di dati',
	help_inline_horizontalmultibar_serie_columns: 'Le serie di dati visualizzati verranno calcolate in base al valori della colonna indicata ("Colonna con il valore")<br>E\' possibile personalizzare la visualizzazione indicando colori, lato di visualizzazione',
	param_config_horizontal_side: 'Lato',
	param_config_horizontal_side_hint: 'Lato di visualizzazione',
	
	
	help_intro_basicDatasetHorizontalmultibarChart: 'Con questo Widget si possono confrontare più serie di dati raggruppate per categorie, impostando una o più serie su un lato del grafico, e una o più serie sull\'altro. Un uso tipico di questa tipologia di grafico è\
		 la piramide delle età, dove si i dati vengono raggruppati per range di età, e da un lato vengono visualizzati i conteggi per il sesso femminile, e dall\'altro per quello maschile.',
	
    help_datasource_basicDatasetHorizontalmultibarChart: 'Sono previste due tipologie di dataset<br><strong>Raggruppamento per colonne</strong><br>\
    	Le serie vengono identificate in base a diverse colonne del dataset indicate nel parametro "Colonne per serie di dati".<br><br><strong>Raggruppamento per valori</strong><br>\
    	Le serie vengono identificate in base al raggruppamento dei singoli valori presenti nella colonna indicata nel paramentro \
    	"Colonna con il valore"<br><br>\
    	In entrambi i casi, poi i dati vengono raggruppati in base ai valori presenti nella colonna indicata dal parametro "Colonna su cui raggruppare". Questo raggruppamento viene rappresentato sull\'asse delle ordinate.<br><br>\
    	A differenza del Widget "Grafico a Barre Multiplo", è possibile scegliere per ogni serie di dati il lato su cui rappresentarlo.', 
    
    help_datasource_example_basicDatasetHorizontalmultibarChart: 
    	'<p><strong>Raggruppamento per colonne</strong><br></p>\
    	<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th>Colonna su cui raggruppare</th><th colspan="2">Colonne per serie di dati</th><th>&nbsp;</th></tr>\
    	<tr><th>Anno</th><th><span class="help-widget-serie-3">Uomini</span></th><th><span class="help-widget-serie-1">Donne</span></th><th>Professione</th></tr></thead>\
    	<tbody><tr><td>2007</td><td>124</td><td>62</td><td>Operaio</td></tr>\
			<tr><td>2007</td><td>124</td><td>132</td><td>Impiegato</td></tr>\
    		<tr><td>2007</td><td>48</td><td>42</td><td>Imprenditore</td></tr>\
    		<tr><td>2008</td><td>102</td><td>52</td><td>Operaio</td></tr>\
    	</tbody></table>\
    	<p><strong>Raggruppamento per valori</strong><br></p>\
    	<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th>Colonna su cui raggruppare</th><th>Colonna con il valore</th><th colspan="2">Colonne ignorate</th></tr>\
    	<tr><th>Anno</th><th>Sesso</th><th>Professione</th><th>Nascita</th></tr></thead>\
    	<tbody><tr><td>2007</td><td><span class="help-widget-serie-3">Uomo</span></td><td>Impiegato</td><td>Torino</td></tr>\
    		<tr><td>2007</td><td><span class="help-widget-serie-3">Uomo</span></td><td>Operaio</td><td>Milano</td></tr>\
    		<tr><td>2008</td><td><span class="help-widget-serie-1">Donna</span></td><td>Imprenditore</td><td>Genova</td></tr>\
    	</tbody></table>',

    help_listen_events_basicDatasetHorizontalmultibarChart: '<ul><li>Cambio colonna su cui raggruppare</li><li>Cambio criteri di filtro oData</li></ul>',
    help_sent_events_basicDatasetHorizontalmultibarChart: '<ul><li>Evidenziazione di una barra del diagramma</li></ul>',
    help_related_widget_basicDatasetHorizontalmultibarChart: '<ul><li>Tabella distribuzioni</li><li>Data explorer</li></ul>',
 	
	dataset_value_columns_param_dialog_title: 'Serie di dati da valori',
	dataset_value_columns_param_dialog_intro: 'I le serie da visualizzare per il grafico selezionato verranno ricavate in base ai valori presenti nella colonna indicata dal parametro \'Colonna valore\'. In questa finestra è possibile indicare della personalizzazioni di visualizzazione del grafico, aggiungere una riga per ogni valore atteso, indicando il colore e il lato del grafico su cui farlo apparire.\
		Le righe che avranno valori non compresi nella lista indicata qui, verranno ignorati. Ad esempio se la colonna indica il genere di un record: Maschio, Femmina, Organizzazione e qui si specificano solo i valori Maschio e Femmina, le righe relative all\'organizzazioni non verranno conteggiate',
	dataset_value_columns_mandatory_warning: 'Inserire Valore',
	
	

	/* treemap */
	basicDatasetTreemapChart: 'Treemap',
	param_tree_columns: 'Colonne da navigare',
	param_root_label: 'Etichetta radice',
	help_listen_events_basicDatasetTreemapChart: '<ul><li>Cambio colonna valore</li><li>Filtro query oData</li><li>Navigazione nei dati</li></ul>',
	help_sent_events_basicDatasetTreemapChart: '<ul><li>Evidenziare colonna raggruppamento</li><li>Navigazione nei dati</li></ul>',
	help_intro_basicDatasetTreemapChart: 'Con questo Widget si possono rappresentare dati gerarchici usando rettangoli innestati.\
		Ogni singolo rettangolo generato ha una specifica classe css, tramite cui sarà possibile personalizzare il colore del rettangolo stesso',
	help_datasource_basicDatasetTreemapChart: 'Il Widget si aspetta una serie di colonne su cui navigare i dati (indicate dal parametro "Colonne da navigare") \
		a loro volta raggruppati in base ai valori di una colonna (indicata dal parametro "Colonna con il valore"). \
		E\' possibile indicare un ulteriore colonna su cui raggruppare i dati (indicata dal parametro "Colonna con un secondo valore"). Nella visualizzazione finale \
		l\'area dei rettangoli sarà proporzionale ai valori rispetto al primo raggruppamento, mentre l\'intensità dei colori sarà relativa al secondo raggruppamento',
	help_datasource_example_basicDatasetTreemapChart: '<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th colspan="2">Colonne Colonne da navigare</th><th>Colonna con il valore</th></tr>\
		<tr><th><span class="help-widget-serie-1">Provincia</span></th><th>Comune</th><th>Arrivi</th></tr></thead>\
			<tbody><tr><td>TO</td><td>Torino</td><td>19555</td></tr>\
	       <tr><td>TO</td><td>Susa</td><td>3696</td></tr>\
		   <tr><td>TO</td><td>Pinerolo</td><td>1852</td></tr>\
		   <tr><td>AT</td><td>Asti</td><td>6852</td></tr>\
		</tbody></table>',
	help_related_widget_basicDatasetTreemapChart: '<ul><li>Tabella navigabile</li><li>Data explorer</li></ul>',
	

	/* Collapsibletree */
	basicDatasetCollapsibletreeChart: 'Albero collassabile',
	param_hide_values: 'Nascondi valori',
	param_value_not_colored: 'Valori non colorati',
	param_row_height: 'Altezza righe',
	param_row_depth:'Distanza orizzontale nodi',
	param_collapsibletree_node_radius:'Raggio del nodo',
	param_start_closed:'Albero chiuso all\'inizio',
	param_node_offset_x:'Offset orizzontale dei nodi',

	help_inline_row_height: 'Altezza in pixel delle righe dell\'albero',
	help_inline_row_depth:'Distanza orizzontale nodi per l\'ultimo livello. Per i livelli precedenti la distanza viene calcolata',
	help_inline_collapsibletree_node_radius:'Raggio del nodo in pixel',
	help_inline_start_closed:'Se selezionato il widget si presenta solo con il primo nodo e l\'eventuale etichetta',
	help_inline_node_offset_x:'Distanza inizale a aggiungere alla distanza orizzontale dei nodi che viene calcolata in base alle etichette',
	
	
	help_inline_hide_values: 'I valori vengono visualizzati nell\'ultima foglia. Selezionare se non si intende mostrarli',
	help_inline_value_not_colored: 'I valori vengono colorati con il colore usato nel primo livello. Selezionare se non si vogliono colorare',
	
	help_intro_basicDatasetCollapsibletreeChart: 'Con questo widget si possono rappresentare dati gerarchici usando una struttura ad albero. \
		Ogni singolo nodo dell\'albero generato ha una specifica classe css, tramite cui sarà possibile personalizzare il colore del nodo stesso',
	help_datasource_basicDatasetCollapsibletreeChart: 'Il Widget si aspetta una serie di colonne su cui navigare i dati (indicate dal parametro "Colonne da navigare")\
		a loro volta raggruppati in base ai valori di una colonna (indicata dal parametro "Colonna con il valore").',
	
	help_datasource_example_basicDatasetCollapsibletreeChart: '<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th colspan="2">Colonne Colonne da navigare</th><th>Colonna con il valore</th></tr>\
		<tr><th><span class="help-widget-serie-1">Provincia</span></th><th>Anno</th><th>Arrivi</th></tr></thead>\
			<tbody><tr><td>TO</td><td>Torino</td><td>2016</td></tr>\
	       <tr><td>TO</td><td>Susa</td><td>2016</td></tr>\
		   <tr><td>TO</td><td>Pinerolo</td><td>2016</td></tr>\
		   <tr><td>AT</td><td>Asti</td><td>2017</td></tr>\
		</tbody></table>',
	help_listen_events_basicDatasetCollapsibletreeChart: '<ul><li>Cambio colonna valore</li><li>Filtro query oData</li><li>Navigazione nei dati</li></ul>',
	help_sent_events_basicDatasetCollapsibletreeChart: '<ul><li>Navigazione nei dati</li></ul>',
	help_related_widget_basicDatasetCollapsibletreeChart: '<ul><li>Tabella navigabile</li><li>Data explorer</li></ul>',
	
	/* Collapsibletreeboxes */
	basicDatasetCollapsibletreeboxesChart: 'Albero a blocchi',
	param_box_radius: 'Raggio angolo blocco',
	param_box_shadow: 'Ombra blocco',
	param_collapsibletreeboxes_row_depth: 'Larghezza blocchi',
	help_inline_box_radius: 'Raggio in pixel del rettangolo che rappresenta un blocco',
	help_inline_box_shadow: 'Visualizzazione di un effetto ombra sul blocco',
	help_inline_collapsibletreeboxes_row_depth: 'Larghezza blocchi in pixel',
	help_intro_basicDatasetCollapsibletreeboxesChart: 'Con questo widget si possono rappresentare dati gerarchici usando una struttura ad albero. \
		Ogni singolo nodo dell\'albero generato ha una specifica classe css, tramite cui sarà possibile personalizzare il colore del nodo stesso',
	help_datasource_basicDatasetCollapsibletreeboxesChart: 'Il Widget si aspetta una serie di colonne su cui navigare i dati (indicate dal parametro "Colonne da navigare")\
		a loro volta raggruppati in base ai valori di una colonna (indicata dal parametro "Colonna con il valore").',
	
	help_datasource_example_basicDatasetCollapsibletreeboxesChart: '<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th colspan="2">Colonne Colonne da navigare</th><th>Colonna con il valore</th></tr>\
		<tr><th><span class="help-widget-serie-1">Risorse</span></th><th>Operazioi</th><th>Importi</th></tr></thead>\
			<tbody><tr><td>AMBIENTE</td><td>Pianificazione</td><td>12.000,00 €</td></tr>\
	       <tr><td>RICAMBIO GENERAZIONALE</td><td>Pianificazione</td><td>5.000,00 €</td></tr>\
		   <tr><td>AMBIENTE</td><td>Miglioramento Infrastrutture</td><td>430,00 €</td></tr>\
		   <tr><td>SVILUPPO LOCALE</td><td>Strategie Sviluppo</td><td>7.800,00 €</td></tr>\
		</tbody></table>',
	help_listen_events_basicDatasetCollapsibletreeboxesChart: '<ul><li>Cambio colonna valore</li><li>Filtro query oData</li><li>Navigazione nei dati</li></ul>',
	help_sent_events_basicDatasetCollapsibletreeboxesChart: '<ul><li>Navigazione nei dati</li></ul>',
	help_related_widget_basicDatasetCollapsibletreeboxesChart: '<ul><li>Tabella navigabile</li><li>Data explorer</li></ul>',
	/* Sankey */
	basicDatasetSankeyChart: 'Sankey',
	param_node_columns: 'Colonne',

	nodesrender_param_dialog_title: 'Personalizzazione nodi',
	nodesrender_param_dialog_intro: 'E\' possibile personalizzare la grafica dei singoli nodi, indicando la colonna da cui vengono ricavati e il valore previsto.<br> ' +
		'Ad esempio se un dataset ha una colonna chiamata provincia che contiene le sigle delle <strong>province</strong> e se si volesse evidenziare ' +
		'di <strong>rosso</strong> il nodo rappresentante la provincia di <strong>Torino</strong>, indicare:<br><br>' +
		'&bull; nel campo colonna &rarr; <strong>provincie</strong><br>&bull; nel campo valore &rarr; <strong>TO</strong><br>' +
		'&bull;  nel campo colore &rarr; scelgiere il <strong>rosso</strong><br><br>',
	nodesrender_param_column: 'colonna',
	nodesrender_param_value: 'valore',
	nodesrender_param_color: 'colore',
	nodesrender_param_fades: 'dissolvenza',
	nodesrender_mandatory_warning: 'Inserire il nome colonna, il valore previsto e il colore',
	help_inline_node_columns: 'Colonne per cui raggruppare verticalmente',
	help_intro_basicDatasetSankeyChart: 'Con questo widget si rappresenta un diagramma di flusso in cui la dimensione dei nodi è proporzionale alla quantità di flusso.\
		Il diagramma di Sankey è utile quando si desidera individuare le sezioni più significative in un flusso generale. \
		Il diagramma è utile anche quando si desidera mostrare quantità specifiche mantenute entro i confini di un sistema definito.',
		
	help_listen_events_basicDatasetSankeyChart: '<ul><li>Filtro query oData</li></ul>',
	help_sent_events_basicDatasetSankeyChart: '<ul><li>Evidenziare colonna raggruppamento</li></ul>',
	help_datasource_basicDatasetSankeyChart: 'Il widget si aspetta due o più colonne per cui raggruppare verticalmente i nodi (indicate nel parametro "Colonne")\
		e una colonna che rappresenti i valori da contare nei flussi (indicata dal parametro "Colonna con il valore") ',
	help_datasource_example_basicDatasetSankeyChart: '<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th colspan="4">Colonne</th><th>Colonna con il valore</th></tr>\
		<tr><th>Titolo di studio</th><th>Lavoro Svolto</th><th>Settore</th><th>Provincia</th><th><span class="help-widget-serie-1">Totale</span></th></tr></thead>	\
		<tbody><tr><td>Laurea</td><td>Capo Progetto</td><td>Informatica</td><td>TO</td><td>1324</td></tr>\
		<tr><td>Laurea</td><td>Cuoco</td><td>Turismo</td><td>TO</td><td>331</td></tr>\
		<tr><td>Laurea</td><td>Architetto</td><td>Edilizia</td><td>TO</td><td>782</td></tr></tbody></table>',
	help_related_widget_basicDatasetSankeyChart: '<i>Questo widget non rilancia eventi</i>',

	/* Forcedirected */
	basicDatasetForcedirectedChart: 'Force Directed',
	param_node_types: 'Tipologie di nodi',
	param_relations: 'Relazioni',
	help_listen_events_basicDatasetForcedirectedChart: '<ul><li>Filtro query oData</li></ul>',
	help_sent_events_basicDatasetForcedirectedChart: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicDatasetForcedirectedChart: 'Con questo widget si rappresenta un grafo tramite nodi e collegamenti in uno spazio bidimensionale',
	help_datasource_basicDatasetForcedirectedChart:'Il widget si aspetta delle colonne con dati relazionati fra di loro ("Relazioni"): ogni relazione ha un dato sorgente, \
		un dato destinazione e un etichetta che identifica la relazione. Nodi e collegamenti possono essere personalizzati nei colori e nella forma tramite le classi css del foglio di stile, \
		perchè per ogni nodo/relazione viene associato una classe speficica che va a livello di dato (ad esempio se ho dei nodi che identificano le nazioni del mondo e volessi colorare di arancione l\'Italia	\
		posso farlo tramite class css, in quanto il nodo Italia avrà la classe <code>"node Nazione Italia"</code> dove Nazione è il nome della colonna e Italia e il valore ',
	help_datasource_example_basicDatasetForcedirectedChart: '<p>Nel dataset di esempio vengono messe in relazione le nazioni con le associazioni</p><table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th>Colonna non utilizzata</th><th colspan="2">Relazioni</th></tr>\
		<tr><th>Continente</th><th>Nazione</th><th>Organizzazione</th></tr></thead>	\
		<tbody><tr><td>Europa</td><td>Italia</td><td>NATO</td></tr>\
		<tr><td>America</td><td>Stati Uniti d\'America</td><td>NATO</td></tr>\
		<tr><tr><td>Europa</td><td>Italia</td><td>Unione Europea</td></tr></tbody></table>',
	help_related_widget_basicDatasetForcedirectedChart: '<ul><li>Data explorer</li></ul>',

	columnsrelations_param_dialog_title: 'Definizione delle relazioni',
	columnsrelations_param_dialog_intro: 'Definire le relazioni che intercorrono fra i vari dati delle colonne del dataset.<br>' +
		'E\' necessario indicare la colonna sorgente delle relazone, la colonna destinazione e la tipologia di relazione.<br> ' +
		'Per ogni valore presente nella colonna sorgente verrà creato un nodo che sarà collegato a tutti i valori presenti nella colonna destinazione, che a loro volta saranno rappresentati da nodi<br><br>' +
		'Per ogni relazione (la linea che congiunge i nodi) è possibile definire una tipologia e un colore<br><br>',
	columnsrelations_param_relation_source: 'Nodo Sorgente',
	columnsrelations_param_relation_target: 'Nodo Destinazione',
	columnsrelations_param_relation: 'Relazione',
	columnsrelations_param_relation_link_type: 'Etichetta',
	columnsrelations_mandatory_warning: 'Inserire la colonna sorgente e quella destinazione',
	param_config_link_line: 'Linea',
	param_config_link_line_arc: 'Linea ad arco',
	param_config_link_line_straight: 'Linea dritta',
	param_config_link_line_bezier: 'Linea a curva bezier',

	style_forcedirected_legend_position: 'Posizione legenda',
	forcedirected_legend_position_dialog_title: 'Personalizzazione posizione legenda',
	forcedirected_legend_position_dialog_intro: 'Indicare se si vuole la legenda sopra il grafico (top) o sotto (bottom)',

	style_forcedirected_nodes_links: 'Nodi e relazioni',

	forcedirected_nodes_links_dialog_title: 'Personalizzazione nodi e relazioni',
	forcedirected_nodes_links_no_realtions_message: 'Definire delle relazioni nel pannello \'Configurazione\'',
	forcedirected_relation_nodes: 'Nodi',
	forcedirected_relation_links: 'Relazioni',
	
	/* funnel chart */
	basicDatasetFunnelChart: 'Grafico Funnel',
	param_mouth: 'Grafico a imbuto',
	help_inline_mouth: 'Visualizzazione della sezione più in basso come il collo di un imbuto',
	help_listen_events_basicDatasetFunnelChart: '<ul><li>Filtro query oData</li></ul>',
	help_sent_events_basicDatasetFunnelChart: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicDatasetFunnelChart: 'Con questo widget viene rappresentato un grafico a imbuto. Solitamente si usa questo tipo di grafico per rappresentare un processo \
		lineare caratterizzato da fasi in sequenza. Ad esempio un processo di selezione del personale in cui ci sono varie fasi in cui si scremano i candidati',
	help_datasource_basicDatasetFunnelChart:'Sono previsti 2 tipologie di dataset<br><br><strong>Dati non raggruppati</strong><br>\
		il dataset deve avere una colonna che rappresenta la fase del diagramma ("Colonna su cui raggruppare"), e le righe sono i vari elementi da contare. Il wiget si preoccuperà di raggruppare i risultati \
		in base al valore della colonna. Nel parametro "Colonna con il valore" si può mettere una colonna qualsiasi\
		<br><br><strong>Dati già raggruppati</strong><br>\
		il dataset deve avere un numero di righe pari alle fasi, una colonna che indica la fase ("Colonna su cui raggruppare") e una che indica il valore ("Colonna con il valore")',
	help_datasource_example_basicDatasetFunnelChart: '<p><strong>Dati non raggruppati</strong></p>\
		<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th colspan="2">Colonne non utilizzate</th><th colspan="2">Colonna su cui raggruppare</th></tr>\
		<tr><th>First Name</th><th>Last Name</th><th><span class="help-widget-serie-1">Recruitment Status</span></th></tr></thead>	\
		<tbody><tr><td>Albert</td><td>Freeman</td><td>CVs received</td></tr>\
		<tr><td>Jordain</td><td>Dacks</td><td>CVs received</td></tr>\
		<tr><td>Aluino</td><td>Sergent</td><td>Interviews</td></tr>\
		<tr><td>Danya</td><td>Altree</td><td>New hires</td></tr></tbody></table>\
		<p><strong>Dati raggruppati</strong></p>\
		<table class="table help-widget-table-example"><thead>\
    	<tr class="params-hint"><th>Colonna su cui raggruppare</th><th>Colonna con il valore</th></tr>\
		<tr><th><span class="help-widget-serie-1">Recruitment Status</span></th><th>Count</th></tr></thead>	\
		<tbody><tr><td>CVs received</td><td>380</td></tr>\
		<tr><td>Interviews</td><td>156</td></tr>\
		<tr><td>Prospects</td><td>92</td></tr>\
		<tr><td>Aptitude test</td><td>56</td></tr>\
		<tr><td>New hires</td><td>13</td></tr></tbody></table>',
	help_related_widget_basicDatasetFunnelChart: '<ul><li>Data explorer</li></ul>',
	
	

	/* distribution table */
	basicDistributionTable: 'Tabella distribuzioni',
	help_intro_basicDistributionTable: 'Con questo widget a tabella si rappresentano i dati calcolati per una distribuzione in classi di un carattere continuo',
	help_datasource_basicDistributionTable: 'Il widget si aspetta un dataset che abbia una colonna su cui raggruppare i dati che sar&agrave; la prima colonna ' +
		'della tabella, e una colonna con i valori da conteggiare, sar&agrave; la seconda colonna della tabella. Questa seconda colonna potr&agrave; avere dei valori da sommare, o ' +
		' anche semplicemente delle occorrenze non sommabili da conteggiare',
	help_datasource_example_basicDistributionTable: '<p>Nell\'esempio dell\'immagine, il dataset analizzato aveva una serie di righe con \
								una voce di spesa, per provincia, anno e settore, nel grafico si &egrave; scelto raggruppare per provincia</p>\
	<table class="table help-widget-table-example"><thead><tr><th>Anno</th><th>Provincia</th><th>Settore</th><th>Spesa</th></tr></thead>\
	<tbody><tr><td>2008</td><td>BI</td><td>SETTORE EXTRALBERGHIERO</td><td>642</td></tr>\
	       <tr><td>2014</td><td>NO</td><td>SETTORE EXTRALBERGHIERO</td><td>670</td></tr>\
		   <tr><td>2018</td><td>CN</td><td>SETTORE EXTRALBERGHIERO</td><td>506</td></tr>\
		</tbody></table>',
	//		   <tr><td>2005</td><td>AT</td><td>SETTORE EXTRALBERGHIERO</td><td>8004</td></tr>\
	//		   <tr><td>2008</td><td>TO</td><td>SETTORE ALBERGHIERO</td><td>1000466</td></tr>\
	//		   <tr><td>2014</td><td>CN</td><td>SETTORE EXTRALBERGHIERO</td><td>9422</td></tr>\
	help_listen_events_basicDistributionTable: '<ul><li>Cambio colonna su cui raggruppare</li><li>Cambio colonna su cui contare</li><li>Cambio criteri di filtro oData</li></ul>',
	help_sent_events_basicDistributionTable: '<ul><li><i>nessuno</i></li></ul>',
	help_related_widget_basicDistributionTable: '<ul><li>Grafico a barre</li><li>Grafico a torta</li><li>Data explorer</li></ul>',

	/*basicDatasetSinglepercentageChart */
	basicDatasetSinglepercentageChart: 'Visualizzazione percentuale',
	help_intro_basicDatasetSinglepercentageChart: 'Con questo widget rappresenta la percentuale di un valore rispetto a un valore massimo. \
		Il grafico sarà una forma riempita in maniera percentuale. E\' possibile scegliere fra una serie di forme, che vanno dai forme semplici (cerchio, rettangoli), a forme comuni (un albero, un cuore&hellip;), a forme tipiche delle previsioni metereologiche\
		In alternativa è anche possibile specificare la url da dove caricare un file svg esterno a yucca. E\' importante che il file svg sia privo in bianco e nero, e che le eventuali forme dell\'svg siano contenute in un unico gruppo',
	help_datasource_basicDatasetSinglepercentageChart: 'Il widget si aspetta un dataset che abbia una colonna in cui è indicato il valore percentuale \
		("Colonna con il valore") e una colonna con il valore massimo ("Colonna con valore massimo"). \
		In mancanza della colonna con il valore massimo è possibile specificare direttamente il valore ("Valore massimo"). E\' possibile anche indicare una colonna dove trovare un eventuale etichetta da visualizzare ("Colonna etichetta").\
		Il grafico prende in considerazione la prima riga del dataset caricato, in maniera casuale, quindi se si vuole otterene il grafico di una riga specifica occorre \
		specificare un filtro odata ("Filtro OData"). E\' anche possibile analizzare più righe dello stesso dataset ("Numero di righe"), nel caso verranno visualizzati una serie di grafici incolonnati.',
	help_datasource_example_basicDatasetSinglepercentageChart: '<table class="table help-widget-table-example"><thead>\
		<tr class="params-hint"><th>Colonna etichetta</th><th>Colonna con il valore</th><th>Colonna con valore massimo</th></tr>\
		<tr><th>Country</th><th><span class="help-widget-serie-1">Won</span></th><th>Total</th></tr>\
		</thead>\
	<tbody><tr><td>England</td><td>1</td><td>12</td></tr>\
	       <tr><td>West Indies</td><td>2</td><td>12</td></tr>\
		   <tr><td>Australia</td><td>5</td><td>12</td></tr>\
		</tbody></table>',
	help_listen_events_basicDatasetSinglepercentageChart: '<ul><li>Cambio criteri di filtro oData</li></ul>',
	help_sent_events_basicDatasetSinglepercentageChart: '<i>Nessuno</i>',
	help_related_widget_basicDatasetSinglepercentageChart: '<ul><li>Singolo dato</li><li>Data explorer</li></ul>',

	
	param_shape: 'Forma da visualizzare' ,
	param_external_shape_url: 'Url forma svg esterna',
	param_orientation: 'Orientamento riempimento',
	param_full_color: 'Colore area piena', 
	param_empty_color: 'Colore area vuota', 
	param_stroke_color: 'Colore bordo',
	param_show_value: 'Mostra valore',
	param_chart_label_type: 'Visualizzazione etichetta',
	label_type_key: 'Chiave',
	label_type_value: 'Valore',
	label_type_percent: 'Percentuale',
	
	param_show_label: 'Mostra etichetta',
	param_label_column: 'Colonna etichetta',
	param_max_value_column: 'Colonna con valore massimo',
	param_max_value: 'Valore massimo',
	param_show_max_value_label: 'Mostra etichetta per il valore massimo',
	param_max_value_label: 'Etichetta valore massimo',
	param_show_max_value: 'Valore massimo',
	param_num_rows: 'Numero di righe',
	param_textafter: 'Testo dopo valore',
	help_inline_show_max_value_label:'Eventuale etichetta da assoaciare al valore massimo',
	help_inline_max_value_label:'Eventuale etichetta da assoaciare al valore massimo',
	help_inline_show_max_value: 'Selezionare per mostrare il valore massimo',
	help_inline_external_shape_url: 'E\' possibile indicare la url di un file svg esterno a Yucca. Si consiglia di usare svg semplici, e monocromatici.', 
	
	help_inline_shape: 'E\' la forma che verrà visualizzata e colorata per la percentuale calcolata del valore rispetto al valore massimo' ,
	help_inline_orientation: 'E\' l\'orientamento con cui sarà colorata la percentuale piena',
	help_inline_full_color: 'Colore con cui riempire l\'area piena (default grigio)', 
	help_inline_empty_color: 'Colore con cui riempire l\'area vuota (default bianco)', 
	help_inline_stroke_color: 'Colore del bordo (default lo stesso colore usato per il pieno',
	help_inline_show_value: 'Mostra il valore sopra il grafico',
	help_inline_show_label: 'Mostra etichetta mostra l\'etichetta sopra il grafico',
	help_inline_label_column: 'Colonna da cui recuperare l\'etichetta',
	help_inline_max_value_column: 'Colonna da cui recuperare il valore massimo che puo\' assumere il dato (default 100)',
	help_inline_max_value: 'Valore massimo che puo\' assumere il dato, da indicare nel caso non ci sia una colonna dedicata (parametro precendente). Nel caso si utilizzi questo parametro, il valore sarà comune a tutte le righe del dataset',
	help_inline_num_rows: 'Numero di righe da leggere: per ogni riga verrà creato un grafico con riempimento in percentuale al valore della riga stessa',
	help_inline_textafter: 'Eventuale testo da scrivere dopo il valore (ad esempio il simbolo %)',

	horentation_vertical: 'Verticale',
	horentation_horizontal: 'Orizzontale',

	singlepercent_shapesvg_modal_title: 'Forma grafico',
	singlepercent_shapesvg_modal_intro: 'Seleziona la forma da usare per indicare la percentuale',
	shapesvg_basic_title: 'Forme base',
	shapesvg_yucca_domain_title: 'Ambiti di yucca',
	shapesvg_common_title: 'Forme generiche',
	shapesvg_meteo_title: 'Forme meteo',

	svgshape_: '',
	svgshape_rectangle: 'Rettangolo',
	svgshape_circle: 'Cerchio',
	svgshape_ellipse: 'Ellisse',
	svgshape_hexagon: 'Esagono',
	svgshape_star: 'Stella',
	svgshape_yucca_domain_agriculture: 'Agricoltura',
	svgshape_yucca_domain_culture: 'Cultura',
	svgshape_yucca_domain_economy: 'Economia',
	svgshape_yucca_domain_employment_training: 'Lavoro',
	svgshape_yucca_domain_energy: 'Energia',
	svgshape_yucca_domain_environment: 'Ambiente',
	svgshape_yucca_domain_government: 'Pubblica Amministrazione',
	svgshape_yucca_domain_health: 'Salute',
	svgshape_yucca_domain_population: 'Popolazione',
	svgshape_yucca_domain_production: 'Attività produttive',
	svgshape_yucca_domain_school: 'Scuola',
	svgshape_yucca_domain_science_technology: 'Tecnologia',
	svgshape_yucca_domain_security: 'Sicurezza',
	svgshape_yucca_domain_smart_community: 'Smart Community',
	svgshape_yucca_domain_territory: 'Territorio',
	svgshape_yucca_domain_tourism_sport: 'Turismo',
	svgshape_yucca_domain_transport: 'Trasporti',
	svgshape_yucca_domain_trade: 'Commercio',
	svgshape_common_comment: 'Commento',
	svgshape_common_child: 'Bambino',
	svgshape_common_female: 'Donna',
	svgshape_common_industry: 'Fabbrica',
	svgshape_common_leaf: 'Foglia',
	svgshape_common_male: 'Uomo',
	svgshape_common_mars: 'Maschio',
	svgshape_common_pagelines: 'Foglie',
	svgshape_common_paw: 'Orma',
	svgshape_common_subway: 'Metropolitana',
	svgshape_common_train: 'Treno',
	svgshape_common_tree: 'Albero',
	svgshape_common_trophy: 'Trofeo',
	svgshape_common_truck: 'Camion',
	svgshape_common_umbrella: 'Ombrello',
	svgshape_common_venus: 'Femmina',
	svgshape_common_heart: 'Cuore',
	svgshape_common_plane: 'Aereo',
	svgshape_common_rocket: 'Razzo',
	svgshape_meteo_hail_inv: 'Grandine (inv.)',
	svgshape_meteo_mist: 'Foschia',
	svgshape_meteo_moon: 'Luna',
	svgshape_meteo_moon_inv: 'Luna (inv.)',
	svgshape_meteo_rain: 'Pioggia',
	svgshape_meteo_rain_inv: 'Pioggia (inv.)',
	svgshape_meteo_snow: 'Neve',
	svgshape_meteo_snow_alt: 'Neve (alt.)',
	svgshape_meteo_snowflake: 'Fiocco di neve',
	svgshape_meteo_snow_heavy: 'Neve (alt.)',
	svgshape_meteo_snow_heavy_inv: 'Neve (alt. inv.)',
	svgshape_meteo_snow_inv: 'Neve (inv.)',
	svgshape_meteo_sun: 'Sole',
	svgshape_meteo_sun_inv: 'Sole (inv.)',
	svgshape_meteo_sunrise: 'Alba',
	svgshape_meteo_temperature: 'Temperatura',
	svgshape_meteo_wind: 'Vento',
	svgshape_meteo_windy: 'Ventoso',
	svgshape_meteo_windy_inv: 'Ventoso (inv.)',
	svgshape_meteo_windy_rain: 'Vento Pioggia',
	svgshape_meteo_windy_rain_inv: 'Vento Pioggia (inv.)',
	
	
	
	
	
	
	
	/* basicDatasetChoropletMapChart */
	basicDatasetChoropletMapChart: 'Mappa Coropletica',
	help_intro_basicDatasetChoropletMapChart:'Con questo widget si rappresenta mappa tematica in cui le aree sono colorate in base al risultato della statistica calcolata',
	help_datasource_basicDatasetChoropletMapChart: 'Il widget si aspetta un dataset che abbia una colonna su cui raggruppare i dati ("Colonna su cui raggruppare"), \
		una colonna con i valori da conteggiare ("Colonna con il valore"). \
		Nel parametro "Geojson da utilizzare" si dovrà specificare il file geojson da utilizzare per rappresentare la mappa. Nel file geojson ogni area \
		della mappa è indicata da un elemento di tipo Feature, che ha come attributi, le coordinate del poligono da rappresentare \
		e almeno un codice per identificare il poligono stesso (ad esempio la sigla di una provincia). Questo codice deve coincidere con il valore indicato nella colonna del dataset "Colonna su cui raggruppare"\
		A seconda del file Geojson utilizzato si potrà specificare anche la proiezione geografica adatta ("Proiezioni geografica")',
	help_datasource_example_basicDatasetChoropletMapChart: '<table class="table help-widget-table-example"><thead>\
		<tr class="params-hint"><th>Colonna ignorata</th><th>Colonna su cui raggruppare</th><th>Colonna ignorata</th><th>Colonna con i valori</th></tr>\
		<tr><th>Anno</th><th><span class="help-widget-serie-1">Provincia</span></th><th>Settore</th><th>Arrivi Totali</th></tr></thead>\
	<tbody><tr><td>2008</td><td>BI</td><td>SETTORE EXTRALBERGHIERO</td><td>642</td></tr>\
	       <tr><td>2014</td><td>NO</td><td>SETTORE EXTRALBERGHIERO</td><td>670</td></tr>\
		   <tr><td>2018</td><td>CN</td><td>SETTORE EXTRALBERGHIERO</td><td>506</td></tr>\
		</tbody></table>',
		help_listen_events_basicDatasetChoropletMapChart: '<ul><li>Cambio colonna su cui raggruppare</li><li>Cambio colonna su cui contare</li><li>Cambio criteri di filtro oData</li></ul>',
		help_sent_events_basicDatasetChoropletMapChart: '<ul><li>Evidenziazione di un\'area della mappa</li><li>Cambio colonna su cui raggruppare</li></ul>',
		help_related_widget_basicDatasetChoropletMapChart: '<ul><li>Tabella distribuzioni</li><li>Data explorer</li></ul>',

	
	/* dataexplorer table */
	basicDataexplorerTable: 'Data Explorer',
	param_dataexplorer_columns: 'Colonne del dataset',
	param_dataexplorer_show_detail: 'Mostra dettaglio',
	param_dataexplorer_hellip: 'Abbrevia',

	help_listen_events_basicDataexplorerTable: '<ul><li>Filtro query oData</li><li>Evidenziare colonna raggruppamento</li></ul>',
	help_sent_events_basicDataexplorerTable: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicDataexplorerTable: 'Una tabella per visualizzare dati',
	help_datasource_basicDataexplorerTable: 'Qualsiasi tabella',

	/* select control */
	basicControlSelect: 'Controllo selezione valori',
	help_intro_basicControlSelect: 'Con questo widget di controllo &egrave; possibile modificare la colonne prese in esame da altri widget',
	help_datasource_basicControlSelect: '&Egrave; possible impostare una lista di colonne di un dataset fra cui l\'utente potr&agrave; sciegliere. Le colonne proposte potranno essere sia quelle su cui raggruppare i dati, sia quelle su cui conteggiare/sommare i valori.\
		Il widget non si connette alle api per i dati, quindi &egrave; necessario conoscere a priori la struttura del dataset di cui si vuole indicare la scelta di colonne',
	help_datasource_example_basicControlSelect: '<i>Il widget non analizza dati</i>',
	help_listen_events_basicControlSelect: '<i>nessuno</i>',
	help_sent_events_basicControlSelect: '<ul><li>Cambio colonna su cui raggruppare</li><li>Cambio colonna su cui contare</li></ul>',
	help_related_widget_basicControlSelect: '<ul><li>Grafico a barre</li><li>Grafico a torta</li><li>Tabella distribuzioni</li></ul>',

	dataexplorer_datacolumns_modal_title: 'Colonne da visualizzare',
	dataexplorer_datacolumns_no_dataset_message: 'Selezionare il dataset da visualizzare',
	param_column_skip: 'Ignora',
	param_column_skip_table: 'Nascondi nella tabella',
	param_column_skip_detail: 'Nascondi nel dettaglio',

	/* filter control */
	basicControlFilter: 'Filtro sui dati - Libero',
	param_filter_type: 'Tipo di filtro',
	param_placeholder: 'Placeholder',
	param_advanced_filter: 'Filtro avanzato',
	help_inline_filter_type: 'Al momento è presente solo il tipo di filtro testuale',
	help_inline_placeholder: 'Testo proposto come esempio',
	help_inline_advanced_filter: 'Pannello con i controlli per il filtro avanzato, se il dato filtrato è numerico vengono presentati filtri per range di numeri, se è testuale vengono presentati filtri tipo "inizia con..." oppure "contiene" ecc.',
	help_listen_events_basicControlFilter: '<i>Questo widget non ascolta eventi</i>',
	help_sent_events_basicControlFilter: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicControlFilter: 'Permette di filtrare i dati visualizzati',
	help_datasource_example_basicControlFilter: '<i>Il widget non analizza dati</i>',

	filter_type_text: 'Testuale',
	advanced_filter_none: 'Non visualizzare',
	advanced_filter_text: 'Dato di tipo testuale',
	advanced_filter_numeric: 'Dato di tipo numerico',

	/* map filter control */
	basicControlMapFilter: 'Filtro sui dati - Mappa',
	param_column: 'Colonna',
	param_selected_color: 'Colore area selezionata',
	param_unselected_color: 'Colore area non selezionata',
	param_border: 'Colore dei confini',
	param_width: 'Larghezza',
	param_height: 'Altezza',
	help_listen_events_basicControlMapFilter: '<i>Questo widget non ascolta eventi</i>',
	help_sent_events_basicControlMapFilter: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicControlMapFilter: 'Permette di filtrare i dati con l\'utilizzo di una mappa',
	help_datasource_example_basicControlMapFilter: '<i>Il widget non analizza dati</i>',

	/* singledata */
	basicSingledata: 'Singolo dato',
	param_hide_label: 'Nascondi etichetta',
	param_text_after: 'Testo dopo il valore',
	param_grow_animation: 'Animazione numero in crescita',
	help_listen_events_basicSingledata: '<ul><li>Filtro query oData</li><li>Evidenziare colonna raggruppamento</li></ul>',
	help_sent_events_basicSingledata: '<i>Questo widget non rilancia eventi</i>',
	help_intro_basicSingledata: 'Visualizza un dato',
	help_datasource_basicSingledata: 'Qualsiasi dato',

	help_inline_hide_label: 'Non visualizza l\'etichetta prima del valore',
	help_inline_text_after: 'Testo da mostrare dopo il valore',
	help_inline_grow_animation: 'Visualizza un effetto animato di un secondo in cui il numero cresce fino a raggiungere il valore corrente. Nel caso il valore sia negativo, il numero descresce',

	styles_section_singledata: 'Singolo dato',
	style_yucca_widget_singledata_content: 'Pannello del dato',
	style_yucca_widget_singledata_label: 'Etichetta',
	style_yucca_widget_singledata_value: 'Valore',
	style_yucca_widget_singledata_textafter: 'Testo dopo il dato',

	/* basicNavigableexplorerTable */
	basicNavigableexplorerTable: 'Tabella navigabile',
	help_listen_events_basicNavigableexplorerTable: '<ul><li>Cambio colonna valore</li><li>Navigazione nei dati</li><li>Filtro query oData</li></ul>',
	help_sent_events_basicNavigableexplorerTable: '<ul><li>Evidenziare colonna raggruppamento</li><li>Navigazione nei dati</li></ul>',

	/* Choroplet Map */
	basicGeoChoropletMap: 'Mappa Coropletica Geo',
	help_listen_events_basicGeoChoropletMap: '<ul><li>Cambio colonna valore</li><li>Filtro query oData</li><li>Evidenziare colonna raggruppamento</li></ul>',
	help_sent_events_basicGeoChoropletMap: '<ul><li>Evidenziare colonna raggruppamento</li></ul>',
	help_intro_basicGeoChoropletMap: 'È una mappa tematica in cui le aree sono colorate o rappresentate con diversi schemi che evidenziano i risultati di calcoli statistici effettuate su di esse. Vengono utilizzate per esempio per mostrare su una mappa la densità di popolazione o la distribuzione del reddito pro capite.',


	/* inline help */

	help_inline_tenantcode: '&Egrave; il codice dell\'area di lavoro di cui fa parte il dataset/stream',
	help_inline_datasetcode: '&Egrave; il codice del dataset',
	help_inline_value_column: '&Egrave; le colonna del dataset che contiene il valore da prendere in considerazione',
	help_inline_group_by_column: '&Egrave; la colonna del dataset su cui fare il raggruppamento',
	help_inline_widget_title: '&Egrave; il titolo del widget',
	help_inline_widget_subtitle: '&Egrave; il sottotitolo del widget',
	help_inline_widget_intro: '&Egrave; un testo descrittivo introduttivo',

	help_inline_value_column2: '&Egrave; le colonna del dataset che contiene un secondo valore da prendere in considerazione',

	help_inline_main_chart_color: '&Egrave; il colore primario da usare nel widget, da cui vengono ricavati eventuali sfumature grafiche. Se si specificano i singoli colori (parametro successivo), questo colore viene ignorato',
	help_inline_chart_colors: 'Sono i colori da usare nel widget, se il numero di colori è minore alle categorie visualizzate, i colori si ripetono. Specificando questi colori, il colore principale (parametro precendente) viene ignorato',
	help_inline_chart_height: 'Altezza in pixel del wiget',
	help_inline_chart_width: 'Larghezza in pixel del widget',
	help_inline_show_values: 'Mostra i valori sul grafico',
	help_inline_chart_legend: 'Visibilit&agrave; e posizione nel widget della legenda',
	help_inline_x_axis: 'Visibilit&agrave; e etichetta da usare per l\'asse X',
	help_inline_y_axis: 'Visibilit&agrave; e etichetta da usare per l\'asse X',
	help_inline_grouped_query: 'Da usare se le colonne da conteggiare sono state metadatate come raggruppabili',
	help_inline_filter: '&Egrave; il filtro da usare per le chiamate oData',
	help_inline_skip: '&Egrave; numero di righe da cui partire nelle chiamate oData ',
	help_inline_top: '&Egrave; il limite massimo di righe nelle chiamate oData (se non impostato estrae massimo 10.000 righe)',
	help_inline_orderby: '&Egrave; l\'ordinamento con cui si vogliono ottenere i risultati. Indicare il nome della colonna.',
	help_inline_euro_value: 'Selezionare se il dato va formattato come Euro',
	help_inline_format_big_number: 'Formattazione dei numeri grossi con abbreviazioni<br><strong>Esempi</strong><br> 2400 &rarr; 2,4K <br>3200000 &rarr; 3,2M <br><strong>Attenzione</strong> selezionando questo tipo di formattazione saranno ignorate le formattazioni dei numeri decimali o degli euro',
	help_inline_decimal_value: 'Indicare il numero di cifre decimali da visualizzare',
	help_inline_usertoken: 'Token per la visualizzazione di dataset/stream privati.<br><i class="fa fa-warning"></i> <strong>Attenzione</strong> Il token impostato qui sar&agrave; visible sul codice sorgente della pagina contenente il widget. Utilizzare solo in caso di sviluppo, o se si tratta di dashboard private. In caso di dashboard pubbliche impostare il token nella componente server.',
	help_inline_debug: 'Visualizza eventuali messaggi di errore nel widget stesso, si consiglia di utilizzarlo solo nella fase di sviluppo',

	help_inline_reduce_x_ticks: 'Riduce il numero di etichette visibili sull\'asse x per migliorare la visibilità',
	help_inline_rotate_labels: 'Angolo di rotazione delle etichette',
	
	help_inline_evt_change_valuecolumn: 'Evento di cambio della colonna valore, rilanciato da altri widget (grafici o di controllo). Se si specifica "solo stesso dataset", il widget ascolterà solo gli eventi lanciati da altri widget che operano sullo stesso codice dataset o da eventi lanciati dai widget di tipo controllo.',
	help_inline_evt_change_groupbycolumn: 'Evento di cambio della colonna raggruppamento, rilanciato da altri widget (grafici o di controllo)',
	help_inline_evt_filtertext: 'Evento di cambio filtro della query odata con cui vengono recuperati i dati, rilanciato da altri widget di controllo',
	help_inline_evt_highlight_groupbycolumn: 'Evento di evidenziazione di un dato o di un elemento del grafico',

	help_style_css_selector: 'Selettore CSS',
	help_inline_yucca_widget_header_title: 'Titolo del widget',
	help_inline_yucca_widget_header_subtitle: 'Sottotitolo del widget',
	help_inline_yucca_widget_intro: 'Paragrafo introduttivo',
	help_inline_yucca_widget_footer: 'Pannello contenitore del footer',
	help_inline_yucca_widget_footer_text: 'Testo contenuto nel footer',

	help_inline_label_threshold: 'Percentuale di etichette da mostrare nel grafico',
	help_inline_render: 'Personalizza il tipo di visualizzazione',
	help_inline_time_column: 'Colonna che rappresenta l\'asse X',
	help_inline_serie_columns: 'Colonna/e che rappresenta l\'asse Y',
	help_inline_tree_columns: 'Colonne per cui raggruppare',
	help_inline_root_label: 'Titolo da inserire in alto al grafico',
	help_inline_evt_data_browse: 'Abilita la navigazione drill-down',
	help_inline_node_render: 'Personalizza la visualizzazione dei nodi',
	param_node_render: 'Visualizzazione nodi',
	help_inline_relations: 'Relazioni tra i nodi',
	help_inline_geojsons: 'Configurazione geojson',
	help_inline_range_colors: 'Configurazione colori per valore',
	help_inline_zoom_control: 'Abilita zoom sulla mappa',
	help_inline_scroll_wheel_zoom: 'Abilita zoom sulla mappa tramite rotella del mouse',
	help_inline_map_legend: 'Aggiungi legenda',
	help_inline_dataexplorer_columns: 'Seleziona le colonne da visualizzare e il loro layout',
	help_inline_dataexplorer_show_detail: 'Se abilitato, cliccando su una riga del dataexplorer viene aperto un pannello con i dati di dettaglio. Nel pannello di configurazione colonne è possibile specificare quali colonne vedere in tabella e quali nel dettaglio',
	help_inline_dataexplorer_hellip: 'Indicare il numero di caratteri dopo cui viene abbreviato il testo inserendo tre puntini',

	help_inline_value_columns: 'Colonne per cui filtrare',
	help_inline_label: 'Titolo da inserire in alto al widget',
	help_inline_hint: 'Descrizione widget',
	help_inline_selected_value: 'Valore di default del filtro',
	help_inline_select_empty_label: 'Valore di default del menù',
	param_border_color: 'Colore dei bordi',
	help_inline_border_color: 'Scegli il colore dei bordi',
	help_inline_selected_color: 'Colore area selezionata',
	help_inline_unselected_color: 'Colore area non selezionata',
	help_inline_width: 'Larghezza widget',
	help_inline_height: 'Altezza widget',
	help_inline_no_data_color: 'Colore da usare per le aree dove non sono presenti dati',
	help_inline_geoprojection: '<div class="help_inline_geoprojection"><div><img src="images/help/geo/azimuthalEqualArea.png" /><br>Azimutale equivalente</div>\
		<div><img src="images/help/geo/azimuthalEquidistant.png" /><br>Azimutale equidistante</div>\
		<div><img src="images/help/geo/conicConformal.png" /><br>Conica conforme</div>\
		<div><img src="images/help/geo/conicEqualArea.png" /><br>Conica equivalente</div>\
		<div><img src="images/help/geo/conicEquidistant.png" /><br>Conica equidistante</div>\
		<div><img src="images/help/geo/equirectangular.png" /><br>Cilindrica equidistante</div>\
		<div><img src="images/help/geo/gnomonic.png" /><br>Gnomonica</div>\
		<div><img src="images/help/geo/orthographic.png" /><br>Ortografica</div>\
		<div><img src="images/help/geo/stereographic.png" /><br>Stereografica</div>\
		<div><img src="images/help/geo/mercator.png" /><br>Mercatore</div></div>',

	widget_code_dialog_title: 'Codice del widget',
	
	
	widget_code_title: 'Codice',
	widget_metadata_title: 'Struttura dataset',
	widget_metadata_column_name: 'Nome',
	widget_metadata_column_alias: 'Alias',
	widget_metadata_column_type: 'Tipo',
	widget_data_title: 'Dati',

	widget_demo_title:'Esempio con dati reali',
	widget_demo_intro:'Qui puoi vedere un esempio di utilizzo del widget, confrontando il codice da utilizzare con il risultato ottenuto, osservando la struttura del dataset e i suoi dati',
	
	reload_columns: 'Ricarica colonne',

	/* styles */
	yucca_dataset_choropleth_map: 'Pannello principale',
	yucca_dataset_choropleth_map_header: 'Header',
	yucca_dataset_choropleth_map_content: 'Body',
	yucca_dataset_choropleth_map_map: 'Pannello mappa',
	yucca_dataset_choropleth_map_data: 'Pannello dati',
	yucca_dataset_choropleth_map_table: 'Tabella dati',
	yucca_dataset_choropleth_map_toolbar: 'Toolbar con men&ugrave per cambio pannello da visualizzare',


	/* composer */

	copy_to_clipboard_feedback_ok: 'Copiato negli appunti',
	components_section_dataset: 'Grafici per Dataset',
	components_section_geo: 'Mappe',
	components_section_table: 'Visualizzazione dati',
	components_section_control: 'Controlli e Filtri',
	components_section_advanced: 'Widget avanzati',
	components_section_htmlelement: 'Elementi',

	widget_config_section_config: 'Configurazione',
	widget_config_section_event: 'Eventi',
	widget_config_section_style: 'Stile',

	render_select: 'Menù a tendina',
	render_radio: 'Radio Button',
	render_button: 'Tab Button',
	render_control: 'Controlli (radio button o checkbox)',

	direction_rows: 'In riga',
	direction_columns: 'In colonna',

	optional: 'opzionale',
	params_section_mandatory: 'Parametri',
	params_section_common: 'Personalizzazioni',
	params_section_chart: 'Personalizzazioni Grafico',
	params_section_chart_text: 'Personalizzazioni etichette',
	params_section_odatafilter: 'Filtri OData',
	params_section_number_format: 'Formato numeri',
	params_section_number_format2: 'Formato numeri secondo valore',
	params_section_advanced: 'Parametri avanzati',
	params_section_map: 'Personalizzazioni Mappa',
	param_tenantcode: 'Codice area di lavoro',
	param_datasetcode: 'Codice del dataset',
	param_value_column: 'Colonna con il valore',
	param_group_by_column: 'Colonna su cui raggruppare',
	param_time_column: 'Colonna del tempo',
	param_serie_columns: 'Colonne con i valori',

	param_value_column2: 'Colonna con un secondo valore',

	param_widget_title: 'Titolo',
	param_widget_subtitle: 'Sottotitolo',
	param_widget_intro: 'Descrizione',
	param_main_chart_color: 'Colore principale',
	param_chart_colors: 'Colori da usare',
	param_widget_height: 'Altezza del widget',
	param_widget_width: 'Larghezza del widget',

	param_geojsons: 'Geojson da utilizzare',
	param_range_colors: 'Colori da usare',
	param_zoom_control: 'Zoom sulla mappa',
	param_scroll_wheel_zoom: 'Zoom tramite rotella',
	param_map_legend: 'Legenda',
	param_no_data_color: 'Colore no data',
	param_geoprojection: 'Proiezioni geografica',
	geoprojection_azimuthalEqualArea : 'Azimutale equivalente',
	geoprojection_azimuthalEquidistant : 'Azimutale equidistante',
	geoprojection_conicConformal : 'Conica conforme',
	geoprojection_conicEqualArea : 'Conica equivalente',
	geoprojection_conicEquidistant : 'Conica equidistante',
	geoprojection_equirectangular : 'Cilindrica equidistante',
	geoprojection_gnomonic : 'Gnomonica',
	geoprojection_orthographic : 'Ortografica',
	geoprojection_stereographic : 'Stereografica',
	geoprojection_mercator : 'Mercatore',

	param_show_values: 'Mostra valori',
	param_label_sunbeam_layout: 'Etichette a raggio', 
	param_stacked: 'Visualizzazione stacked',
	param_chart_direction: 'Direzione grafico',
	
	param_chart_legend: 'Legenda',
	param_x_axis: 'Asse X',
	param_y_axis: 'Asse Y',
	param_hide_axis: 'Nascondi',
	param_axis_label: 'Etichetta da visualizzare',
	param_reduce_x_ticks: 'Riduzione etichette asse',
	param_rotate_labels: 'Rotazione etichette assi',

	param_euro_value: 'Valori in euro',
	param_decimal_value: 'Cifre decimali',
	param_decimal_value_short: 'Decimali',
	param_format_big_number: 'Formattazione numeri grandi',

	param_usertoken: 'Usertoken',
	param_debug: 'Informazioni di debug',

	param_column_hide: 'Nascondi',
	param_column_format_number: 'Formattaz, numeri',
	param_column_format_date: 'Formattaz. date/stringhe',


	param_grouped_query: 'Query con raggruppamenti',
	param_filter: 'Filtro OData',
	param_skip: 'Righe da saltare',
	param_top: 'Numero di righe',
	param_orderby: 'Ordinamento risultati',
	param_orderby_desc: 'Discendente',

	param_donut: 'Grafico a ciambella',
	param_label_threshold: 'Soglia visualizzazione etichette',


	param_value_columns: 'Colonne',
	param_label: 'Etichetta',
	param_hint: 'Descrizione',
	param_selected_value: 'Valore inizialmente selezionato',
	param_select_empty_label: 'Etichetta quando non è selezionato nulla ',
	param_render: 'Tipo di visualizzazione',
	param_direction: 'Direzione',

	styles_section_common: 'Contenitore, header e footer',
	styles_section_chart: 'Area del grafico',
	styles_section_table: 'Tabella dati',
	styles_section_dashboard:'Personalizzazioni nella dashboard',

	styles_section_common_basic_control: 'Titolo e introduzione',
	styles_section_basic_control_radio: 'Controllo di tipo radio',
	styles_section_basic_control_tabbutton: 'Controllo di tipo tab button',
	styles_section_basic_control_select: 'Controllo di tipo select',

	style_yucca_control_select_radio_panel: 'Pannello contenitore',
	style_yucca_control_select_radio_item: 'Elementi Radio',

	style_yucca_control_select_tabbutton_panel: 'Pannello contenitore',
	style_yucca_control_select_tabbutton_item: 'Elemento Tab',
	style_yucca_control_select_tabbutton_item_selected: 'Elemento Tab Selezionato',

	style_yucca_control_select_select_panel: 'Pannello contenitore',
	style_yucca_control_select_select: 'Menù a tendina		',

	style_yucca_widget: 'Pannello contenitore del widget',
	style_yucca_widget_header_title: 'Titolo',
	style_yucca_widget_header_subtitle: 'Sottotitolo',
	style_yucca_widget_intro: 'Introduzione',
	style_yucca_widget_footer: 'Footer',
	style_yucca_widget_footer_text: 'Testo nel footer',

	style_yucca_widget_chart_content: 'Pannello contenente il grafico',
	style_yucca_widget_chart: 'Grafico',

	style_yucca_widget_table_content: 'Pannello contenente la tabella',
	style_yucca_widget_table: 'Tabella',
	style_yucca_widget_table_header_row: 'Riga dell\'header',
	style_yucca_widget_table_header_cell: 'Celle dell\'header',
	style_yucca_widget_table_body_row: 'Riga dei dati',
	style_yucca_widget_table_body_cell: 'Cella dei dati',
	
	styles_section_html_element: 'Stile elemento',
	style_yucca_html_text: 'Testo',
	style_yucca_html_title: 'Titolo',
	style_yucca_html_image: 'Immagine',
	style_yucca_html_link: 'Link',
	
	param_hellip_text: 'Abbrevia',
	param_widget_id: 'Id widget',
	help_inline_widget_id: 'Id del tag html del widget, se omesso viene generato un id casuale.<br><i class="fa fa-warning"></i> <strong>Attenzione</strong>: l\'id deve essere univoco all\interno della dashboard',
	
	
	date_format_dialog_title:'Formato data',
	date_format_choose: 'Scegli',
	date_format_weekday:'Giorno della settimana',
	date_format_day:'Giorno',
	date_format_month:'Mese',
	date_format_year:'Anno',
	date_format_hour:'Ore',
	date_format_minutes:'Minuti',
	date_format_seconds:'Secondi',
	date_format_numeric: 'Numerico',
	date_format_2_digit:'Doppia cifra',
	date_format_long: 'Lungo',
	date_format_short: 'Corto',
	date_format_none:'Non mostrare',
	style_yucca_widget_dashboard: 'Personalizzazione nella dashboard',	
	
	dashboard_widget_styles_dialog_title: 'Personalizzazione widget all\interno della dashboard',
	dashboard_widget_styles_dialog_intro: 'Qui è possibile effettuare delle personalizzazioni relativi alla distribuzione dei widget internamente a una dashboard creata con il composer.<br>'+
	'<div class="help-block"><i class="fa fa-warning"></i> <strong>Attenzione</strong> le personalizzazioni definite in questa sezione non hanno effetto se il widget viene utilizzato su pagine diverse dalla dashboard creata con il composer</div>',

	dashboard_widget_styles_dialog_flex_grow: 'Peso widget', 
	dashboard_widget_styles_dialog_flex_grow_help: 'Il peso del widget indica lo spazio che il widget deve occupare nella dashboard, rispetto agli altri widget sulla stessa riga. ' +  
	'Il peso viene indicato con un numero intero, più è alto il numero e più sarà lo spazio occupato dal widget. \
	Se ad esempio su una riga ci sono 2 widget, un grafico e una tabella, e si vuole che la tabella si espanda il più possibile, \
	inserire il valore 1 nel widget della tabella e non inserire nulla nel widget del grafico. In questo modo il grafico prenderà la dimensione \
	che gli serve, e tutto il resto dello spazio sarà occupato dalla tabella. Se nessuno dei widget della riga ha valorizzato il peso, i widget \
	occuperanno tutti lo stesso spazio',
	
	dashboard_fonts: 'Font da utilizzare',
	dashboard_font_title: 'Titoli',
	dashboard_font_text: 'Testo normale',
	dashboard_font_title_placeholder: 'Nome del font per il titolo',
	dashboard_font_text_placeholder: 'Nome del font per il testo',
	dashboard_background_fonts_help: 'E\' possibile personalizzare i font da utilizzare nella dashboard tramite i Google Fonts. \
		Guarda sul sito di Google i font adatti per i titoli e per i testi, e poi copia e incolla i nomi dei font nei corrispondenti campi',  
	
	multiple_color_param_dialog_title: 'Inserimento di colori multipi',
	multiple_color_param_value: 'Colore',
	multiple_color_limit_param_value: 'per valori minori di ',
	multiple_keylabel_param_key: 'Colonna',
	multiple_keylabel_param_label: 'Etichetta',
	multiple_keylabel_param_direction: 'Frecce',
	arrow_direction_none: 'Nessuna',
	arrow_direction_left: 'Sinistra',
	arrow_direction_right: 'Destra',
	arrow_direction_both: 'Destra e sinistra',
	
	multiple_param_dialog_title: 'Inserimento di valori multipi',
	multiple_param_dialog_intro: 'Aggiungi dei valori per il parametro ',
	multiple_param_value: 'Valore',
	multiple_param_add: 'Aggiungi',
	multivalue_empty: 'Nessun valore',

	param_config_column_modal_title: 'Colonna',
	param_config_column_key: 'Nome',
	param_config_column_label: 'Etichetta',
	param_config_column_countingmode_short: 'Mod. conteggio',
	param_config_column_countingmode: 'Modalità conteggio',
	param_config_column_countingmode_hint: 'La modalit&agrave; di conteggio dipende dal tipo di query oData<ul><li>Query non raggruppate: <strong> count, sum</strong></li><li>Query raggruppate: <strong>sum, avg, min, max</strong></li></ul>',
	param_config_column_key_placeholder: 'Attributo name del componente',
	param_config_column_label_placeholder: 'Etichetta da visualizzare',

	dataset_column_no_datasetcode_hint: 'La lista delle colonne disponibili è visibile solo se si sceglie un\'area di lavoro e un dataset',

	basicControlFilterDataDiscrete: 'Filtro sui dati - Controllato',
	param_odata_filters: 'Filtri odata',
	param_filter_type_discrete: 'Tipo di filtro', 
	filter_type_unique: 'Scelta singola',
	filter_type_multi: 'Scelta multipla',
	param_config_direction: 'Disposizione opzioni',
	direction_row: 'In riga',
	direction_column: 'In colonna',

	help_inline_direction: 'Nel caso di visualizzaione con radio button  o checkbox, indica se visualizzarli in fila su un unica riga, o incolonnati uno sotto l\'altro',
	
	multiple_odatafilter_param_dialog_title: 'Filtri odata',
	multiple_odatafilter_add_filter_create: 'Crea filtro',
	multiple_odatafilter_filter_empty: 'Nessun filtro impostato',
	multiple_odatafilter_param_label: 'Etichetta',
	multiple_odatafilter_param_filter: 'Filtro',
	multiple_odatafilter_dialog_intro: 'Aggiungi i filtri odata con le relative etichette',

	param_geojsons_title: 'Geojson da utilizzare',
	geojson_piedmont: 'Province Piemonte',
	geojson_italy: 'Regioni Italia',
	geojson_europe: 'Nazioni europa',
	geojson_world: 'Nazioni Mondo',

	multiple_param_geojsons_dialog_intro: 'Il widget utilizza il formato Geojson per rappresentare le aree sulla mappa. \
		&Egrave; possibile indicare le informazioni di uno o pi&ugrave; file geojson.<br><br>Se non viene specificata una url per il geojson verrà utilizzata la mappa\
		del Piemonte suddivisa in province. La cui chiave si chiama \'code\' e ha come valore le sigle delle province in maiuscolo',

	new_geojson: 'Nuovo Geojson',
	existing_geojson: 'Geojson configurati',
	geojson_url_param: 'Url',
	geojson_url_param_hint: 'Url dove &egrave; presente il file geojson',
	geojson_url_param_on_yucca: 'Scegli fra i geojson presenti su Yucca',
	
	geojson_key_param: 'Chiave',
	geojson_url_param_placeholder: 'lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json',
	geojson_key_param_hint: 'Attributo interno al file geojson da mettere in relazione con la colonna del dataset da contare',
	geojson_key_param_placeholder: 'code',
	geojson_render_line_param: 'Linea che separa le varie aree',
	geojson_render_line_weight_param: 'Spessore',
	geojson_render_line_opacity_param: 'Opacit&agrave;',
	geojson_render_line_dashcolor_param: 'Colore',
	geojson_render_line_dasharray_param: 'Tratteggio',
	geojson_render_areas_param: 'Aree',
	geojson_render_areas_fillopacity_param: 'Opacit&agrave;',


	odatafilter_param_dialog_title: 'Filtro OData per i dati',
	odataparam_param_dialog_intro: 'Si può comporre il filtro da usare a blocchi di condizioni, messe in sequenza con logica di AND o OR. Il compositore di ' +
		'fitri gestisce un solo livello di blocchi, se si vogliono filtri con blocchi annidati, scrivere direttamente il filtro in formato odata',
	odataparam_condition_intro: 'Nuova condizione',
	odataparam_current_group_intro: 'Gruppo di condizioni in lavorazione',
	odataparam_current_group_empty: 'Inserire almeno una condizione',
	odataparam_group_intro: 'Gruppi di condizioni pronti',
	odataparam_group_empty: 'Inserire almeno un gruppo',

	odatafilter_column: 'Colonna',
	odatafilter_column_name: 'Nome Colonna',
	odatafilter_column_type: 'Tipo', 	
	odatafilter_operator: 'Operatore',
	odatafilter_value: 'Valore',
	odatafilter_add_new_condition: 'Aggiungi',
	odatafilter_add_new_condition_or: 'Aggiungi in OR',
	odatafilter_add_new_condition_and: 'Aggiungi in AND',

	odatafilter_add_new_group: 'Aggiungi gruppo',
	odatafilter_add_new_group_or: 'Aggiungi gruppo in OR',
	odatafilter_add_new_group_and: 'Aggiungi gruppo in AND',

	odataparam_odatafilter_intro: 'Filtro odata',

	/* piechart render */
	piechartrender_param_dialog_title: 'Personalizzazione grafico a torta',
	piechartrender_donut_title: 'Grafico a ciambella',
	piechartrender_donut: 'Si',
	piechartrender_donutratio: 'Rapporto raggio (%)',
	piechartrender_piesection_title: 'Sezione torta',
	piechartrender_fullpie: 'Completa',
	piechartrender_halfpie: 'Mezza',
	piechartrender_angles: 'Custom',
	piechartrender_angles_section: 'Sezione',
	piechartrender_angles_rotation: 'Rotazione',
	piechartrender_radius_title: 'Rotazione e spigoli',
	piechartrender_corner_radius: 'Arrotondamento',

	/* linechart */
	dataset_serie_columns_param_dialog_title: 'Scelta colonne per serie di dati',
	dataset_serie_columns_param_dialog_intro: 'Selezionare le colonne del dataset con i valori per le linee del grafico, in base al tipo di visualizzazione scelta verranno proposte ulteriori personalizzazioni (opzionali)',

	serie_columns_counting_mode_info: 'Le configurazioni "Fattore di scala", "Testo dopo" il formato dei numeri e il colore non hanno effetto se si sceglie di creare le Serie dai valori di raggruppamento',
	param_config_series_column: 'Colonna',
	param_config_series_style: 'Stile',

	dataset_serie_columns_mandatory_warning: 'Inserire Nome, Etichetta e tipo di contenggio',


	/* multichart */
	param_config_series_visualization_type: 'Tipo di visualizzazione',
	visualization_type_area: 'Grafico ad area',
	visualization_type_bar: 'Grafico ad barre',
	visualization_type_line: 'Grafico a linea',
	visualization_type_scatter: 'Visualizzazione a dispersione',

	param_config_visualization_interpolation: 'Interpolazione',
	param_config_area_color: 'Colore area',

	param_config_scatter_shape: 'Forma',
	param_config_column_y_axis: 'Asse Y',

	param_config_scale_value: 'Fattore di scala',
	param_config_scale_value_hint: 'Inserire un numero per cui si vuole moltiplicare.\nE\' utile per i casi in cui le varie serie hanno scale molto diverse.\nAd esempio se si vogliono paragonare importi e conteggi,\nsi possono esprimere gli importi in migliaia,\nmoltiplicando per un fattore di scala di 0.001',
	param_config_text_after: 'Testo dopo',
	param_config_text_after_hint: 'Testo da visualizzare dopo il valore.\nE\' utile nel caso in cui si è usato un fattore di scala, per indicare che fattore si è usato.\nAd esempio se si è indicato come fattore 0.001 si puoi inserire come testo dopo "migliaia" ',
	param_series_from_values: 'Serie da valori raggruppamento',
	help_inline_series_from_values: 'Utilzza i valori ricavati dal raggruppamento come serie di dati: il risultato finale saranno tanti istogrammi, uno per valore di raggruppamento, raggruppati per le colonne delle serie',
	
	param_config_number_format:'Formato numeri',
	
	chart_direction_vertical:'Barre in verticale',
	chart_direction_horizontal:'Barre in orizzontale',
	param_serie_columns_multibar: 'Colonne con le serie',
	help_inline_serie_columns_multibar: 'per ogni colonna verrà creato un diagramma a barre, basato sul raggruppamento indicato nell\'attributo "Colonna su cui raggruppare"',
	param_series_description_columns_multibar: 'Colonne descrizioni serie',
	help_inline_series_description_columns_multibar: 'Colonne da cui leggere le descrizione delle serie visualizzate nel tooltip. Se non viene specificata, si visualizzaranno le etichette delle serie',
	
	events_section_event_listening: 'Eventi ascoltati dal widget',
	events_section_event_sending: 'Eventi rilanciati dal widget',

	event_evt_change_valuecolumn: 'Cambio colonna valore',
	event_evt_change_groupbycolumn: 'Cambio colonna raggruppamento',
	event_evt_filtertext: 'Filtro query oData',
	event_evt_highlight_groupbycolumn: 'Evidenziare colonna raggruppamento',
	event_evt_data_browse: 'Navigazione nei dati',

	event_enabled: 'Abilitato',
	event_only_same_dataaset: 'Solo stesso dataset',
	event_evt_accepted_control_ids: 'Id controlli/filtri accettati',
	help_inline_evt_accepted_control_ids: 'Indicare gli id dei controlli/filtri che questo widget deve ascoltare. Questo serve nel caso che il widget debba ascoltare solo alcuni specifici controlli o filtri e non tutti quelli presenti nella pagina.<br><strong>Se si lascia vuoto, il widget ascolta tutti i controlli/filtri della pagina</strong>',
	
	dashboard_config: 'Preferenze Dashboard',
	dashboard_preview: 'Anteprima',
	dashboard_preview_hint: 'Visualizza l\'anteprima della dashboard in un\'altra pagina',
	dashboard_draft: 'Bozze',
	dashboard_save: 'Salva',
	dashboard_load_title: 'File salvati',
	dashboard_load: 'Apri',
	dashboard_embed: 'Esporta',
	dashboard_embed_static_page: 'Pagina Statica',
	dashboard_embed_webapp: 'Web Application',
	dashboard_draft_no_items: 'Non sono presenti bozze',

	dashboard_config_dialog_title: 'Preferenze',
	dashboard_name: 'Nome della dashboard',
	dashboard_config_name_help: 'Il nome della dashboard serve per identificare i file prodotti dal composer, il sorgente della dashboard e i pacchetti generati',
	dashboard_widget_position_type: 'Posizione dei widget',
	dashboard_widget_position_type_help: 'I widget possono essere posizionati in maniera assoluta, o flessibile. Posizionandoli in modalità flessibile i widget andranno a capo quando non ci sarà più posto sullo schermo, quindi a seconda della risoluzione del monitor potrebbero essere posizionati in maniera diversa.',
	dashboard_widget_position_type_absolute: 'Assoluta',
	dashboard_widget_position_type_flex: 'Flessibile',
	dashboard_widget_position_type_grid: 'Griglia',
	dashboard_background_color: 'Colore dello sfondo',
	dashboard_background_color_help: 'E\' possibile impostare un colore per lo sfondo della dashboard generata',
	dashboard_widget_flex_direction:'Direzione widget',
	dashboard_widget_flex_direction_row:'Righe',
	dashboard_widget_flex_direction_row_reverse:'Righe inverse: disposizione dei widget da destra a sinistra ',
	dashboard_widget_flex_direction_column:'Colonne',
	dashboard_widget_flex_direction_column_reverse:'Colonne inverse: disposizione dei widget dal basso verso l\'alto',
	
	dashboard_widget_flex_wrap: 'Widget a capo',
	dashboard_widget_flex_wrap_no: 'Non va a capo (se i widget superano la dimensione dello schermo, compare la scrollbar)',
	dashboard_widget_flex_wrap_normal: 'A capo dall\'alto verso il basso',
	dashboard_widget_flex_wrap_reverse: 'A capo dal basso verso l\'alto',
	
	dashboard_widget_flex_justify: 'Allineamento orizzontale',
	dashboard_widget_flex_justify_start: 'Allineamento a destra',
	dashboard_widget_flex_justify_end: 'Allineamento a sinistra',
	dashboard_widget_flex_justify_center: 'Allineamento al centro',
	dashboard_widget_flex_justify_justify: 'Allineamento giustificato',
	
	dashboard_widget_flex_align_items: 'Allineamento verticale',
	dashboard_widget_flex_align_items_start: 'In alto',
	dashboard_widget_flex_align_items_end: 'In basso',
	dashboard_widget_flex_align_items_center: 'In centro',
	dashboard_widget_flex_align_items_stretch: 'Allungato per tutta l\'altezza',

	dashboard_widget_flex_align_content: 'Distribuzione widget',
	dashboard_widget_flex_align_content_start_hint: 'Widget aggiunti a partire dall\'alto',
	dashboard_widget_flex_align_content_end_hint: 'Widget aggiunti a partire dal basso',
	dashboard_widget_flex_align_content_center_hint: 'Widget aggiunti a partire in centro',
	dashboard_widget_flex_align_content_stretch_hint: 'Widget allungati per occupare tutta l\altezza',
	dashboard_widget_flex_align_content_space_between_hint: 'Widget distribuiti in modo giustificato, senza alterare l\'altezza del widget',

	dashboard_widget_flex_align_content_start: 'Alto',
	dashboard_widget_flex_align_content_end: 'Basso',
	dashboard_widget_flex_align_content_center: 'Centro',
	dashboard_widget_flex_align_content_stretch: 'Allungati',
	dashboard_widget_flex_align_content_space_between: 'Giustificati',
	
	dashboard_grid_num_column: 'N° colonne',
	dashboard_grid_num_row: 'N° righe',
	dashboard_grid_group_ungroup: 'Unisci/Separa',
	dashboard_grid_group_hint: 'Unisci celle',
	dashboard_grid_ungroup: 'Separa',
	dashboard_grid_ungroup_hint: 'Separa celle',
	dashboard_grid_reset: 'Reset',
	dashboard_grid_reset_hint: 'Annulla tutti i raggruppamenti',


	legend_param_dialog_title: 'Configurazione legenda',
	
	param_select_control_value_columns: 'Filtro su colonna valore',
	param_select_control_group_by_columns: 'Filtro su colonna raggruppamento',
	help_inline_select_control_value_columns: 'Aggiungere i nomi delle colonne del dataset su cui si vuole permettere la scelta del valore da contare. Se si indica questo tipo di filtro (su colonna valore), non indicare il filtro sulla colonna raggruppamento',
	help_inline_select_control_group_by_columns: 'Aggiungere i nomi delle colonne del dataset su cui si vuole permettere di raggruppare.  Se si indica questo tipo di filtro (su colonna raggruppamento), non indicare il filtro sulla colonna valore',

	param_event_control_id:'Id controllo',
	event_event_control_id:'Id controllo',
	help_inline_event_control_id: 'E\' una stringa univoca per identificare questo controllo/filtro nella pagina. Serve nel caso si voglia inserire un controllo specifico solo per alcuni widget: nella configurazione dei widget si potrà indicare quali controlli/filtri vanno ascoltati, tramite l\'attributo "Accetta solo da"', 
	
	legend_position: 'Posizione della legenda',
	legend_param_preset_position_label: 'Posizioni predefinite',
	legend_param_custom_position_label: 'Posizioni personalizzate',

	help_datasource: 'Datasource necessario',
	help_datasource_example: 'Esempio di dati',
	help_listen_events: 'Eventi ascoltati',
	help_sent_events: 'Eventi rilanciati',
	help_related_widget: 'Altri widget strettamente correlati',

	help_interpolation_title: 'Tipi di interpolazione',


	/* advanced widget */
	advanced_widget_intro: 'Di seguito si possono trovare alcuni widget sviluppati in maniera specifica in base al dataset utilizzato. <br>' +
		'Questi dataset sono degli esempi di possibili visualizzazioni avanzate, partendo dai dati presenti in Yucca. ' +
		'Per ogni widget viene quindi indicato dove è possibile consultare il codice sorgente',


	/* html */
	html_title: 'Titolo',
	param_html_title_content: 'Testo del titolo',
	param_html_title_tag: 'Stile',
	help_inline_html_title_content: 'Testo del titolo',
	help_inline_html_title_tag: 'Imposta lo stile del titolo',
	tag_h1: 'Titolo 1',
	tag_h2: 'Titolo 2',
	tag_h3: 'Titolo 3',
	tag_h4: 'Titolo 4',
	tag_h5: 'Titolo 5',
	tag_h6: 'Titolo 6',
	
	params_section_technical: 'Paramentri tecnici',
	param_html_id: 'Id componente',
	param_html_classes: 'Classi css',
	help_inline_html_id: 'Id html del componente',
	help_inline_html_classes: 'Classi css da aggiungere al componente',
	
	html_text: 'Testo',
	param_html_text_content: 'Testo',
	help_inline_html_text_content: 'Testo da visualizzare',
	
	html_image: 'Immagine',
	param_html_image_url: 'Url immagine',
	param_html_image_title: 'Tooltip',
	param_html_image_src: 'Immagine',
	
	help_inline_html_image_url: 'Url da cui caricare l\'immagine, da usare in alternativa all\'upload dell\'immagine',
	help_inline_html_image_title: 'Tooltip mostrato sull\'immagine',
	help_inline_html_image_data: 'E\' possibile caricare direttamente l\'immagine nel codice del widget, da usare in alternativa all\'indicazione della url dell\'immagine',

	html_link: 'Link',
	param_html_link_url: 'Url link',
	param_html_link_label: 'Etichetta',
	param_html_link_title:'Tooltip',
	param_link_new_window: 'Nuova finestra',
	help_inline_html_link_url: 'Url link',
	help_inline_html_link_label: 'Etichetta da visualizzare',
	help_inline_html_link_title:'Tooltip mostrato sul link',
	help_inline_link_new_window: 'Apre il link in una nuova finestra',
	
		
	/* TEXT */
	help_intro_text: 'È un elemento che visualizza testo semplice',
	help_datasource_text: 'Qualsiasi stringa di testo'

};
