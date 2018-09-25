<?php

/**
* pull out ids and convert data to json
*
* @param object $record the record to be cleaned (by address so parameter is changed)
* @return object the cleaned record (for chaining)
*/
function cleanRecord($record)
{
	if ($record) {
		unset($record->id);
	}
	return $record;
}
