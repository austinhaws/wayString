<?php

require_once('WebResponse.php');
require_once('dao/NodeDao.php');
require_once('dao/AccountDao.php');

$router->group(['prefix' => 'node'], function () use ($router) {

	$router->post('claim', function (\Illuminate\Http\Request $request) {
		$parentGuid = $request->get('parentGuid');
		$parentNode = nodeDao()->selectByGuid($parentGuid);

		$accountGuid = $request->get('accountGuid');
		$account = accountDao()->selectByGuid($accountGuid);

		$nodeLR = $request->get('nodeLR');

		accountDao()->increaseCoins($account->id, 1);
		$account->coins++;

		return webResponse([
			'node' => cleanRecord(nodeDao()->insert([
				'location' => $parentNode->location . $nodeLR,
				'accounts_id' => $account->id,
				'guid' => uniqid(),
			])),
			'account' => cleanRecord($account),
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
