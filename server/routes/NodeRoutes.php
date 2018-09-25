<?php

require_once('WebResponse.php');
require_once('dao/NodeDao.php');

$router->group(['prefix' => 'node'], function () use ($router) {

	/**
	 * create a new node with a new passphrase
	 *
	 * @return object the new account
	 */
	function newNode() {
		do {
			$adjective = selectRandomWord('adjective');
			$noun = selectRandomWord('noun');
			$number = mt_rand(10, 99);

			$phrase = "$adjective$noun$number";

			$account = DB::table('accounts')->where('phrase', '=', $phrase)->get();
		} while (count($account));

		$guid = uniqid();
		DB::table('accounts')->insert(['guid' => $guid, 'phrase' => $phrase]);

		return DB::table('accounts')->where(FIELD_GUID, $guid)->first();
	}

	$router->get('get/{location}', function ($location) {
		return webResponse(cleanRecord(nodeDao()->selectByLocation(urldecode($location))));
	});
});
