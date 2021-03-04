/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 - 2021 Regione Piemonte
 */

var Constants = Constants || {};


//Constants.SDP_BASE_RESOURCES_URL = '//localhost:8001';
//Constants.SDP_BASE_RESOURCES_URL = '//int-';
//prova

Constants.API_METADATA_URL = "//api.smartdatanet.it/metadataapi/api/";
Constants.API_DATA_URL = "//api.smartdatanet.it/api/";

//Constants.API_METADATA_SERVICES_URL = Constants.SDP_BASE_URL + "api/proxy/services/";
//Constants.API_METADATA_STREAM_URL = Constants.API_METADATA_SERVICES_URL + "streams/";
//Constants.API_ODATA_URL = Constants.SDP_BASE_URL + "api/proxy/odata/";
//Constants.API_DISCOVERY_URL = Constants.SDP_BASE_URL +"api/proxy/discovery/";


//Constants.SDP_IMAGES_BASE_URL = Constants.SDP_BASE_URL + 'img/' ;

//Constants.SDP_ICONS_STREAM_URL = Constants.SDP_IMAGES_BASE_URL+"icons/stream_icon_white.png";
//Constants.SDP_ICONS_DOMAIN_BASE_URL = Constants.SDP_IMAGES_BASE_URL+"domain/";
//Constants.SDP_STREAM_LOGO_BASE_URL = Constants.SDP_BASE_URL+ "api/proxy/resources/stream/icon/";

Constants.SDP_WEB_SOCKET_BASE_URL = 'wss://stream.smartdatanet.it/wss/';
Constants.WEB_SOCKET_USER = 'guest';
Constants.WEB_SOCKET_SECRET = 'Aekieh6F';
Constants.SDP_WEBSOCKET_CONNECTING = 'Connecting';
Constants.SDP_WEBSOCKET_CONNECTED = 'Connected';
Constants.SDP_WEBSOCKET_NOT_CONNECTED = 'Not Connected';

Constants.LINE_CHART_COLORS = ["#004586","#0084d1", "#d01e2a", "#f37a1f", "#f3c414", "#3d9e00", "#a6d615","#8f69c2","#e4477e"];

Constants.Time = {};
Constants.Time.ONE_MINUTE = 60000;
Constants.Time.ONE_HOUR = 3600000;
Constants.Time.ONE_DAY = 86400000;
Constants.Time.ONE_MONTH = 2678400000;
Constants.Time.ONE_YEAR = 31536000000;

Constants.MAP_TILES_CARTO_DB_POSITRON_URL = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";



