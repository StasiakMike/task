<?php
	// remove for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	$url ="http://api.geonames.org/countryInfoJSON?formatted=true&country=" . $_REQUEST['country'] . "&lang=" . $_REQUEST['lang'] . "&username=flightltd&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$result = curl_exec($ch);
	$decode = json_decode($result, true);
	curl_close($ch);

	$output['status']['code'] = "200";
	$output['status']['name'] = "OK";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['geonames'];

	header("Content-Type: application/json; charset=UTF-8");
	echo json_encode($output);