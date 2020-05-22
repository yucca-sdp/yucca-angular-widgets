<?php
	//include_once 'functions.php';
	//include_once 'constants.php';
    // Request URL: https://api.smartdatanet.it/api/Flussi_turistici_provincia_6054/DataEntities?$format=json&$top=1&callback=JSON_CALLBACK

//	header('Content-Type: application/json');
	//echo 'REQUEST_URI|'.$_SERVER['REQUEST_URI'].'<br>';
	//echo 'QUERY_STRING|'.$_SERVER['QUERY_STRING'].'<br>';
	
	$API_METADATA_URL = "//api.smartdatanet.it/metadataapi/api/";
	$API_DATA_URL = "http://api.smartdatanet.it/api/";
	
	$datasetQuery = substr($_SERVER['REQUEST_URI'], strpos($_SERVER['REQUEST_URI'], '.php')+5);
	
	$response ="";
	if($_SERVER['REQUEST_METHOD']=='GET') {
	    $response = json_decode(file_get_contents($API_DATA_URL.$datasetQuery, false, $context), TRUE);
	}
	
	/*
	$start = $milliseconds = round(microtime(true) * 1000);
	if(array_key_exists('q', $_GET)){
		switch ($_GET['q']) {
			case "soggetto":
				$soggetto = loadSoggettoFromCodiceFiscale($user["codicefiscale"]);
				$response["soggetto"]  = $soggetto;
				$response["benchmark"]  = array("elapsed"=>$milliseconds = round(microtime(true) * 1000) - $start, "odata_call"=>2);
				break;
			case "famiglia":
				$famiglia = loadFamiglia($user["codicefiscale"]);
				$response["famiglia"]  = $famiglia;
				$response["benchmark"]  = array("elapsed"=>$milliseconds = round(microtime(true) * 1000) - $start, "odata_call"=>5);
				break;
			case "tari":
				$tari = loadTari($user["codicefiscale"]);
				$response["tari"]  = $tari;
				$response["benchmark"]  = array("elapsed"=>$milliseconds = round(microtime(true) * 1000) - $start, "odata_call"=>3);
				break;
		}
	}
    */
	print json_encode ($response);
?>

	