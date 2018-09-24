<?php

/**
* pull out ids and convert data to json
*
* @param object $record the record to be cleaned (by address so parameter is changed)
* @return object the cleaned record (for chaining)
*/
function cleanRecord(&$record)
{
	unset($record->id);
	$record->data = json_decode($record->data);
	return $record;
}
