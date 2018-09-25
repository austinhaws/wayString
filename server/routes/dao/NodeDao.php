<?php

class NodeDao {

	public function selectByLocation($location) {
		return DB::table('nodes')->where('location', '=' , $location)->first();
	}
}

function nodeDao() {
	return new NodeDao();
}
