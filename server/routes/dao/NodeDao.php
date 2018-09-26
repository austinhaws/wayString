<?php

class NodeDao
{
	/**
	 * @return \Illuminate\Database\Query\Builder
	 */
	private function baseSelect()
	{
		return DB::table('nodes')
			->join('accounts', 'accounts.id', '=', 'nodes.accounts_id', 'left')
			->select([
				'nodes.*',
				'accounts.phrase',
			]);
	}

	public function selectByLocation(string $location)
	{
		return $this->baseSelect()->where('nodes.location', '=', $location)->first();
	}

	public function selectByGuid(string $guid)
	{
		return $this->baseSelect()->where('nodes.guid', '=', $guid)->first();
	}

	public function selectById(int $id)
	{
		return $this->baseSelect()->where('nodes.id', '=', $id)->first();
	}

	public function insert($node)
	{
		return $this->selectById(DB::table('nodes')->insertGetId($node));
	}

	public function selectByAccountId($id)
	{
		return DB::table('nodes')
			->where('accounts_id', '=', $id)
			->orWhere('guid', '=', '•')
			->orderBy(DB::raw('LENGTH(location)'), 'ASC')
			->get();
	}
}

function nodeDao()
{
	return new NodeDao();
}
