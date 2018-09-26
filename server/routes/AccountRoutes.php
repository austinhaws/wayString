<?php

require_once('WebResponse.php');
require_once('dao/AccountDao.php');
require_once('dao/NodeDao.php');

$router->group(['prefix' => 'account'], function () use ($router) {

	$router->get('new', function () {
		return webResponse(cleanRecord(accountDao()->insert()));
	});

	$router->get('get/{phrase}', function ($phrase) {
		$account = accountDao()->selectByPhrase($phrase);
		if (!$account) {
			$account = accountDao()->insert();
		}
		$account->nodes = cleanRecord(nodeDao()->selectByAccountId($account->id));
		return webResponse(cleanRecord($account));
	});
});
