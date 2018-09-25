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

	$router->post('claim', function (\Illuminate\Http\Request $request) {
		$parentGuid = $request->get('parentGuid');
		$nodeLR = $request->get('nodeLR');
		$accountGuid = $request->get('accountGuid');

		$parentNode = nodeDao()->selectByGuid($parentGuid);

		nodeDao()->insertNode([

		]);
	});

	$router->get('get/{location}', function ($guid) {
		$result = [
			'node' => null,
			'left' => null,
			'right' => null,
			'parent' => null,
		];

		$result['node'] = nodeDao()->selectByGuid(urldecode($guid));

		if ($result['node']) {
			$location = $result['node']->location;
			$result['left'] = nodeDao()->selectByLocation($location . 'L');
			$result['right'] = nodeDao()->selectByLocation($location . 'R');
			$result['parent'] = strlen($location) > 1 ? nodeDao()->selectByLocation(substr($location, 0, -1)) : null;
		}

		return webResponse(cleanRecord($result));
	});
});
