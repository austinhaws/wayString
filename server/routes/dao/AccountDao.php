<?php

class AccountDao {

	public function selectByGuid(string $guid)
	{
		return DB::table('accounts')->where('guid', '=' , $guid)->first();
	}
}

function accountDao() {
	return new AccountDao();
}
