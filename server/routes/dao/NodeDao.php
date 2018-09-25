<?php

class NodeDao {

	public function selectByLocation(string $location) {
		return DB::table('nodes')->where('location', '=' , $location)->first();
	}

	public function selectByGuid(string $guid)
	{
		return DB::table('nodes')->where('guid', '=' , $guid)->first();
	}
}

function nodeDao() {
	return new NodeDao();
}
